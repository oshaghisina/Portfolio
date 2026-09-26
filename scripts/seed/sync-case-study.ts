/**
 * Copy one case study from the local DB to another (production over the SSH tunnel in
 * `Docs/Deploy.md`): the project doc, its latest version and every media doc it references, by id.
 * Study media (`<slug>--*`) the copied doc no longer references are deleted from the target.
 *
 * Use it after re-seeding a published study with S3 storage on: replaced uploads are stored as
 * `…-1.png` and the adapter deletes the old objects from the shared bucket, so production's docs
 * point at files that no longer exist until they are replaced with the local ones. Raw copy on
 * purpose — re-running the seed against production would upload and rename again.
 *
 *   TARGET_DATABASE_URL='mongodb://…@127.0.0.1:27027/portfolio-cms?authSource=admin' \
 *     pnpm exec tsx scripts/seed/sync-case-study.ts khodro45-dealer-app [--apply]
 *
 * Dry run unless `--apply`. The source is DATABASE_URL (local `.env`). Writes bypass Payload's
 * revalidate hooks: recreate the production app container afterwards.
 */
import 'dotenv/config'

import { createRequire } from 'node:module'

type Doc = Record<string, unknown> & { _id: ObjectIdLike }
type ObjectIdLike = { _bsontype: 'ObjectId'; equals: (other: unknown) => boolean; toHexString: () => string }

// The driver is not a direct dependency; borrow the one Payload's Mongo adapter ships with.
const mongoose = createRequire(import.meta.resolve('@payloadcms/db-mongodb'))('mongoose')
const { MongoClient } = mongoose.mongo

const apply = process.argv.includes('--apply')
const slug = process.argv.slice(2).find((arg) => !arg.startsWith('--'))
const sourceUrl = process.env.DATABASE_URL
const targetUrl = process.env.TARGET_DATABASE_URL

if (!slug || !/^[a-z0-9-]+$/.test(slug) || !sourceUrl || !targetUrl) {
  console.error('Usage: TARGET_DATABASE_URL=… tsx scripts/seed/sync-case-study.ts <slug> [--apply]')
  process.exit(1)
}

// Host and database only, so credentials never reach the terminal.
const where = (url: string) => {
  const { host, pathname } = new URL(url)
  return `${host}${pathname}`
}

if (where(sourceUrl) === where(targetUrl)) {
  console.error(`Source and target are the same database (${where(sourceUrl)}).`)
  process.exit(1)
}

const isObjectId = (value: unknown): value is ObjectIdLike =>
  typeof value === 'object' && value !== null && (value as ObjectIdLike)._bsontype === 'ObjectId'

function collectIds(value: unknown, out: Map<string, ObjectIdLike>) {
  if (isObjectId(value)) out.set(value.toHexString(), value)
  else if (Array.isArray(value)) value.forEach((item) => collectIds(item, out))
  else if (typeof value === 'object' && value !== null && !(value instanceof Date))
    Object.values(value).forEach((item) => collectIds(item, out))
}

const source = await MongoClient.connect(sourceUrl)
const target = await MongoClient.connect(targetUrl)

try {
  const src = source.db()
  const dst = target.db()
  console.log(`${where(sourceUrl)} → ${where(targetUrl)}${apply ? '' : ' (dry run)'}`)

  const project: Doc | null = await src.collection('projects').findOne({ slug })
  if (!project) throw new Error(`No project "${slug}" in the source.`)
  const version: Doc | null = await src
    .collection('_projects_versions')
    .findOne({ parent: project._id, latest: true })

  const refs = new Map<string, ObjectIdLike>()
  collectIds(project, refs)
  refs.delete(project._id.toHexString())
  const media: Doc[] = await src
    .collection('media')
    .find({ _id: { $in: [...refs.values()] } })
    .toArray()

  // Keep production's id if the slug exists there under another one: other docs link to it.
  const existing: Doc | null = await dst.collection('projects').findOne({ slug }, { projection: { _id: 1 } })
  const projectId = existing?._id ?? project._id
  console.log(`project: ${existing ? 'replace' : 'insert'} ${projectId.toHexString()}`)

  const counts = { new: 0, renamed: 0, sameName: 0 }
  for (const doc of media) {
    const current: Doc | null = await dst.collection('media').findOne({ _id: doc._id })
    if (!current) counts.new++
    else if (current.filename !== doc.filename) counts.renamed++
    else counts.sameName++
  }
  console.log(
    `media: ${media.length} referenced (${counts.new} new, ${counts.renamed} renamed, ${counts.sameName} same name)`,
  )

  // Study media the copied doc drops. Keep any that another doc on the target still uses; this
  // study's own version history may keep pointing at them.
  const kept = new Set(media.map((doc) => doc._id.toHexString()))
  const candidates: Doc[] = (
    await dst
      .collection('media')
      .find({ filename: { $regex: `^${slug}--` } })
      .toArray()
  ).filter((doc: Doc) => !kept.has(doc._id.toHexString()))
  const usedIn = new Map<string, string>()
  const collections: string[] = (await dst.listCollections({}, { nameOnly: true }).toArray())
    .map((info: { name: string }) => info.name)
    .filter((name: string) => name !== 'media' && !name.startsWith('_') && !name.startsWith('payload-'))
  for (const name of collections) {
    const filter = name === 'projects' ? { _id: { $ne: projectId } } : {}
    for await (const doc of dst.collection(name).find(filter)) {
      const ids = new Map<string, ObjectIdLike>()
      collectIds(doc, ids)
      for (const candidate of candidates)
        if (ids.has(candidate._id.toHexString())) usedIn.set(candidate._id.toHexString(), name)
    }
  }
  const orphans = candidates.filter((doc) => !usedIn.has(doc._id.toHexString()))
  candidates
    .filter((doc) => usedIn.has(doc._id.toHexString()))
    .forEach((doc) => console.log(`keep, still used in ${usedIn.get(doc._id.toHexString())}: ${doc.filename}`))
  console.log(`delete on target: ${orphans.length}`)
  orphans.forEach((doc) => console.log(`  ${doc.filename}`))

  // `filename` is unique: a copied doc cannot land while another target doc holds its name.
  const dropping = new Set(orphans.map((doc) => doc._id.toHexString()))
  for (const doc of media) {
    const clash: Doc | null = await dst
      .collection('media')
      .findOne({ filename: doc.filename, _id: { $ne: doc._id } })
    if (clash && !dropping.has(clash._id.toHexString()))
      throw new Error(`Target media ${clash._id.toHexString()} already holds "${clash.filename}".`)
  }

  if (!apply) {
    console.log('Dry run: nothing written. Re-run with --apply.')
  } else {
    if (orphans.length) await dst.collection('media').deleteMany({ _id: { $in: orphans.map((doc) => doc._id) } })
    for (const doc of media) await dst.collection('media').replaceOne({ _id: doc._id }, doc, { upsert: true })
    await dst.collection('projects').replaceOne({ _id: projectId }, { ...project, _id: projectId }, { upsert: true })
    if (version) {
      // Payload marks only the newest version `latest`; the admin opens that one.
      await dst.collection('_projects_versions').updateMany({ parent: projectId, latest: true }, { $unset: { latest: '' } })
      await dst
        .collection('_projects_versions')
        .replaceOne({ _id: version._id }, { ...version, parent: projectId }, { upsert: true })
    }
    console.log('Written. Recreate the app container so cached pages drop.')
  }
} finally {
  await source.close()
  await target.close()
}

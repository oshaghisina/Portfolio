/**
 * Move the existing /experience evidence block before the matrix without reseeding copy, projects,
 * navigation, or Home. Dry run by default; pass --apply after reviewing the reported locales.
 * Every stored block object is reused, including its nested row ids and project relationships.
 */
import 'dotenv/config'

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { isDeepStrictEqual } from 'node:util'

import { getPayload } from 'payload'

import { orderExperienceLayout } from '../../src/endpoints/seed/experience-page-content'
import { LOCALES } from '../../src/utilities/locale'
import config from '../../src/payload.config'

const payload = await getPayload({ config })
const { docs } = await payload.find({
  collection: 'pages',
  depth: 0,
  draft: false,
  limit: 1,
  locale: 'en',
  pagination: false,
  where: { slug: { equals: 'experience' } },
})

const pageId = docs[0]?.id
if (!pageId) throw new Error('No published /experience page exists.')

const snapshots = await Promise.all(
  LOCALES.map(async (locale) => {
    const page = await payload.findByID({
      collection: 'pages',
      id: pageId,
      depth: 0,
      draft: false,
      locale,
    })
    const layout = page.layout ?? []
    const types = layout.map((block) => block.blockType)
    if (types.filter((type) => type === 'capabilityEvidence').length !== 1 ||
        types.filter((type) => type === 'capabilityMatrix').length !== 1) {
      throw new Error(`${locale}: expected exactly one evidence and one matrix block.`)
    }
    return { locale, layout, ordered: orderExperienceLayout(layout)!, status: page._status }
  }),
)

const report = snapshots.map(({ locale, layout, ordered, status }) => ({
  locale,
  status,
  changed: ordered !== layout,
  before: layout.map((block) => block.blockType),
  after: ordered.map((block) => block.blockType),
}))
console.log(JSON.stringify(report, null, 2))

const verifyPath = process.argv.find((arg) => arg.startsWith('--verify-backup='))?.slice('--verify-backup='.length)
if (verifyPath) {
  const backup = JSON.parse(await readFile(verifyPath, 'utf8')) as Array<{
    locale: string
    layout: (typeof snapshots)[number]['layout']
  }>
  for (const { locale, layout } of backup) {
    const current = snapshots.find((row) => row.locale === locale)
    if (!current || !isDeepStrictEqual(current.layout, orderExperienceLayout(layout))) {
      throw new Error(`${locale}: stored layout differs from the pre-change layout beyond order.`)
    }
  }
  console.log(`Verified all ${backup.length} locales against ${verifyPath}`)
}

if (process.argv.includes('--apply')) {
  const backupPath = path.join('/tmp', `experience-layout-${Date.now()}.json`)
  await writeFile(
    backupPath,
    JSON.stringify(snapshots.map(({ locale, layout, status }) => ({ locale, layout, status })), null, 2),
  )
  console.log(`Saved pre-change layouts to ${backupPath}`)

  for (const { locale, layout, ordered, status } of snapshots) {
    if (ordered === layout) continue
    await payload.update({
      collection: 'pages',
      id: pageId,
      context: { disableRevalidate: true },
      data: { layout: ordered, _status: status },
      depth: 0,
      draft: false,
      locale,
    })
  }
  console.log('Stored /experience layouts reordered.')
}

process.exit(0)

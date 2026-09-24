/**
 * One-shot: rewrite stored media URLs to Arvan Object Storage public URLs after a disk→bucket sync.
 *
 * Prerequisites:
 *   1. Bucket exists, public-read, S3_* + S3_PUBLIC_URL in .env
 *   2. Files synced preserving Payload filenames (including size variants):
 *
 *      aws --endpoint-url "$S3_ENDPOINT" s3 sync public/media/ "s3://$S3_BUCKET/"
 *      # prod host:
 *      # aws --endpoint-url "$S3_ENDPOINT" s3 sync /srv/portfolio/media/ "s3://$S3_BUCKET/"
 *
 *      # or rclone with an Arvan-configured remote:
 *      # rclone sync /srv/portfolio/media arvan:$S3_BUCKET
 *
 *   3. Confirm a sample object opens at $S3_PUBLIC_URL/<filename>
 *
 * Then:
 *   pnpm migrate:media-urls           # write
 *   pnpm migrate:media-urls --dry-run # report only
 *
 * Does not re-upload via Payload (avoids regenerating sizes / changing ids). Run against the
 * database whose media docs still point at /api/media/file/... — usually production after sync,
 * or local if you synced public/media into the same bucket.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import type { Media } from '../src/payload-types'
import config from '../src/payload.config'

const dryRun = process.argv.includes('--dry-run')
const publicBase = (process.env.S3_PUBLIC_URL || '').replace(/\/$/, '')

if (!publicBase) {
  console.error('S3_PUBLIC_URL is required (no trailing slash).')
  process.exit(1)
}

function objectUrl(filename: string | null | undefined): string | null {
  if (!filename) return null
  return `${publicBase}/${filename}`
}

function rewriteDoc(doc: Media): { data: Partial<Media>; changed: boolean } {
  const data: Partial<Media> = {}
  let changed = false

  const nextUrl = objectUrl(doc.filename)
  if (nextUrl && doc.url !== nextUrl) {
    data.url = nextUrl
    changed = true
  }

  const thumbFile = doc.sizes?.thumbnail?.filename ?? null
  const nextThumb = objectUrl(thumbFile) ?? (thumbFile ? null : objectUrl(doc.filename))
  if (nextThumb && doc.thumbnailURL !== nextThumb) {
    data.thumbnailURL = nextThumb
    changed = true
  }

  if (doc.sizes) {
    const sizes = { ...doc.sizes }
    let sizesChanged = false

    for (const key of Object.keys(sizes) as (keyof NonNullable<Media['sizes']>)[]) {
      const size = sizes[key]
      if (!size || typeof size !== 'object') continue
      const next = objectUrl(size.filename)
      if (next && size.url !== next) {
        sizes[key] = { ...size, url: next }
        sizesChanged = true
      }
    }

    if (sizesChanged) {
      data.sizes = sizes
      changed = true
    }
  }

  return { data, changed }
}

const payload = await getPayload({ config })

let page = 1
let updated = 0
let skipped = 0
let examined = 0

for (;;) {
  const result = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 50,
    page,
    overrideAccess: true,
  })

  for (const doc of result.docs) {
    examined += 1
    const { data, changed } = rewriteDoc(doc)
    if (!changed) {
      skipped += 1
      continue
    }

    if (dryRun) {
      console.log(`[dry-run] ${doc.filename ?? doc.id}`, data.url ?? '(sizes/thumb only)')
    } else {
      await payload.update({
        collection: 'media',
        id: doc.id,
        depth: 0,
        data,
        overrideAccess: true,
        // URL-only write — do not touch files on disk or S3
        context: { skipMediaUrlHooks: true },
      })
      console.log(`updated ${doc.filename ?? doc.id}`)
    }
    updated += 1
  }

  if (!result.hasNextPage) break
  page += 1
}

console.log(
  JSON.stringify(
    {
      dryRun,
      publicBase,
      examined,
      updated,
      skipped,
    },
    null,
    2,
  ),
)

process.exit(0)

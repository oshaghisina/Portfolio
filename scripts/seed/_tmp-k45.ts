/**
 * Temporary: seed only the Khodro45 dealer-app case study (other sessions have unfinished studies
 * registered, which the full `seed:case-studies` would also write). Delete after use.
 *   pnpm exec cross-env NODE_OPTIONS=--no-deprecation tsx scripts/seed/_tmp-k45.ts [--dry]
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import {
  K45_ASSETS,
  K45_COVER_KEY,
  K45_LOCALES,
  K45_MEDIA,
  K45_SHARED_FIELDS,
  K45_SLUG,
  k45LocalizedFields,
} from '../../src/endpoints/seed/case-studies/khodro45-dealer-app'
import { assertNoUnseededLocales, seedCaseStudy } from '../../src/endpoints/seed/case-studies/seed-case-study'
import config from '../../src/payload.config'

const dry = process.argv.includes('--dry')
const payload = await getPayload({ config })
// Mirrors the registry entry in `case-studies/index.ts`, which cannot be imported while another
// session's study is missing its copy files.
const k45 = {
  label: 'Khodro45 dealer app',
  slug: K45_SLUG,
  assetsDir: K45_ASSETS,
  media: K45_MEDIA,
  seedLocales: K45_LOCALES,
  createFields: { kind: ['product', 'systems'] as ('product' | 'systems')[], order: 4, featured: true, coverMediaKey: K45_COVER_KEY },
  sharedFields: K45_SHARED_FIELDS,
  localizedFields: k45LocalizedFields,
}

// The uncropped order page (personal data) lives under this stored name; record every file the
// storage adapter holds for it, so the replacement can be checked against the bucket afterwards.
const { docs } = await payload.find({
  collection: 'media',
  depth: 0,
  limit: 1,
  pagination: false,
  where: { filename: { equals: 'khodro45-dealer-app--order-details.png' } },
})
const before = docs[0]
const files = (doc: typeof before) =>
  doc
    ? [doc.url, ...Object.values(doc.sizes ?? {}).map((size) => (size as { url?: string | null })?.url)].filter(Boolean)
    : []
console.log(JSON.stringify({ orderDetailsBefore: { id: before?.id, filesize: before?.filesize, urls: files(before) } }, null, 2))

if (!dry) {
  await assertNoUnseededLocales(payload, k45)
  const result = await seedCaseStudy(payload, k45)
  const after = await payload.findByID({ collection: 'media', id: result.media.orderDetails as string, depth: 0 })
  console.log(
    JSON.stringify(
      {
        projectId: result.projectId,
        created: result.created,
        media: Object.keys(result.media).length,
        orderDetailsAfter: { id: after.id, filesize: after.filesize, urls: files(after) },
      },
      null,
      2,
    ),
  )
}
process.exit(0)

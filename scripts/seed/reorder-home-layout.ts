/**
 * Move the stored homepage sections into `HOME_BLOCK_ORDER` without reseeding copy, projects,
 * navigation or any other page. Dry run by default; pass --apply after reviewing the reported
 * locales. Every stored block object is reused, including its nested row ids and relationships.
 *   pnpm exec tsx scripts/seed/reorder-home-layout.ts [--apply]
 */
import 'dotenv/config'

import { writeFile } from 'node:fs/promises'
import path from 'node:path'

import { getPayload } from 'payload'

import { orderHomeLayout } from '../../src/endpoints/seed/home-content'
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
  where: { slug: { equals: 'home' } },
})

const pageId = docs[0]?.id
if (!pageId) throw new Error('No published home page exists.')

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
    return { locale, layout, ordered: orderHomeLayout(layout), status: page._status }
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

if (process.argv.includes('--apply')) {
  const backupPath = path.join('/tmp', `home-layout-${Date.now()}.json`)
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
  console.log('Stored home layouts reordered.')
}

process.exit(0)

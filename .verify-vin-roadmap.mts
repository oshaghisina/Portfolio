/**
 * One-off (delete after use): read the seeded VIN case study back in every locale and compare it
 * with what the seed module builds — flags any stored text the seed did not write (a leaf merged
 * into the wrong row) and any seeded text that did not land. Also checks the two workbook uploads.
 *   pnpm exec tsx .verify-vin-roadmap.mts
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { VIN_MEDIA, VIN_SLUG, vinLocalizedFields } from './src/endpoints/seed/case-studies/vin-app'
import config from './src/payload.config'
import { LOCALES } from './src/utilities/locale'

const payload = await getPayload({ config })

const ids: Record<string, string> = {}
for (const [key, spec] of Object.entries(VIN_MEDIA)) {
  const { docs } = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1,
    pagination: false,
    where: { filename: { equals: spec.name } },
  })
  if (docs[0]) ids[key] = docs[0].id
  if (spec.name.endsWith('.xlsx'))
    console.log('media', docs[0]?.filename, docs[0]?.mimeType, docs[0]?.filesize, docs[0]?.url)
}

/** Every string leaf by path, skipping ids and Lexical bookkeeping. */
function leaves(value: unknown, at: string, out: Map<string, string>) {
  if (typeof value === 'string') {
    if (value.trim()) out.set(at, value)
  } else if (Array.isArray(value)) {
    value.forEach((item, i) => leaves(item, `${at}[${i}]`, out))
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (['id', 'blockName', 'createdAt', 'updatedAt'].includes(key)) continue
      if (['type', 'format', 'direction', 'version', 'mode', 'style', 'textFormat', 'textStyle', 'indent', 'detail'].includes(key) && at.includes('body')) continue
      leaves(child, `${at}.${key}`, out)
    }
  }
}

let problems = 0
for (const locale of LOCALES) {
  const doc = await payload.find({
    collection: 'projects',
    depth: 0,
    draft: false,
    fallbackLocale: false,
    limit: 1,
    locale,
    pagination: false,
    where: { slug: { equals: VIN_SLUG } },
  })
  const stored = doc.docs[0]?.sections ?? []
  const expected = vinLocalizedFields(locale, ids).sections
  const s = new Map<string, string>()
  const e = new Map<string, string>()
  stored.forEach((block, i) => leaves(block, `${i}:${block.id}`, s))
  expected.forEach((block, i) => leaves(block, `${i}:${block.id}`, e))
  const extra = [...s].filter(([path, text]) => e.get(path) !== text && !e.has(path))
  const wrong = [...e].filter(([path, text]) => s.get(path) !== text)
  // Shared selects the seed leaves to their defaults (markers, treatment) are not stale text.
  const stale = extra.filter(([path]) => !/\.(markers|treatment)$/.test(path))
  console.log(
    `${locale}: ${stored.length} rows (expected ${expected.length}), ${e.size} leaves, ${stale.length} unexpected, ${wrong.length} missing/different`,
  )
  for (const [path, text] of [...stale, ...wrong].slice(0, 12)) console.log(`   ${path}: ${text.slice(0, 90)}`)
  problems += stale.length + wrong.length + (stored.length === expected.length ? 0 : 1)
  if (locale === 'en')
    console.log('   order:', stored.map((block) => `${block.id}/${block.blockType}`).slice(5, 11).join(' '))
}
console.log(problems ? `${problems} problem(s)` : 'all locales match the seed')
process.exit(problems ? 1 : 0)

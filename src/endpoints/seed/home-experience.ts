import type { Payload } from 'payload'

import { DEFAULT_LOCALE } from '@/utilities/locale'

import { EXPERIENCE_COMPANY_KEYS } from './home-content'
import { homeCopy } from './home-copy'
import { seedHomeTranslations } from './translations/home'

const EXPERIENCE_INDEXES = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'] as const

/**
 * Patch `companyKey` onto the homepage `experienceCatalogue` rows without touching anything
 * else — additive and idempotent, so it can run against a live database instead of the
 * destructive full seed.
 *
 * Rows are matched by `index` (A1–A10). Every existing row `id` is kept; only `companyKey` is
 * written on those. Any missing index (e.g. a DB that still has nine employers) is appended
 * from English `homeCopy`, and only then are the other locales re-applied so localized leaves
 * land on the new row ids.
 *
 * No `next/cache` import anywhere under this directory — the module also runs outside Next, via
 * `pnpm seed:home-experience`, where that import would throw.
 */
export async function seedHomeExperience({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'pages',
    depth: 0,
    draft: true,
    limit: 1,
    locale: DEFAULT_LOCALE,
    pagination: false,
    where: { slug: { equals: 'home' } },
  })

  const page = docs[0]
  if (!page) throw new Error('No `home` page in this database — run the full seed first.')

  const existing = (page.layout ?? []).find((block) => block.blockType === 'experienceCatalogue')
  if (!existing || existing.blockType !== 'experienceCatalogue') {
    throw new Error('The `home` layout has no `experienceCatalogue` block to patch.')
  }

  const keyByIndex = new Map(
    EXPERIENCE_INDEXES.map((index, i) => [index, EXPERIENCE_COMPANY_KEYS[i]!] as const),
  )
  const copyByIndex = new Map(
    EXPERIENCE_INDEXES.map((index, i) => [index, homeCopy[DEFAULT_LOCALE].experience.items[i]!] as const),
  )

  const items = (existing.items ?? []).map((row) => {
    const companyKey = keyByIndex.get(row.index as (typeof EXPERIENCE_INDEXES)[number])
    return companyKey ? { ...row, companyKey } : row
  })

  const present = new Set(items.map((row) => row.index))
  let appended = 0
  for (const index of EXPERIENCE_INDEXES) {
    if (present.has(index)) continue
    const copy = copyByIndex.get(index)!
    items.push({
      index,
      companyKey: keyByIndex.get(index)!,
      name: copy.name,
      role: copy.role,
      blurb: copy.blurb,
    })
    appended += 1
  }

  const layout = (page.layout ?? []).map((block) =>
    block.blockType === 'experienceCatalogue' ? { ...block, items } : block,
  )

  await payload.update({
    collection: 'pages',
    id: page.id,
    context: { disableRevalidate: true },
    data: { _status: 'published', layout },
    depth: 0,
    locale: DEFAULT_LOCALE,
  })

  const patched = items.filter((row) => Boolean(row.companyKey)).length
  payload.logger.info(
    `— Homepage experienceCatalogue companyKeys patched (page ${page.id}, ${patched} rows, ${appended} appended)`,
  )

  // New row ids need locale leaves; a pure companyKey patch does not.
  let locales: string[] | undefined
  if (appended > 0) {
    const translations = await seedHomeTranslations({ payload })
    locales = translations.locales
  }

  return { appended, blockId: existing.id, locales, pageId: page.id, patched }
}

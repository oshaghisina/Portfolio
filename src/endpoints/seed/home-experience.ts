import type { Payload } from 'payload'

import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/utilities/locale'

import { EXPERIENCE_COMPANY_KEYS } from './home-content'
import { homeCopy } from './home-copy'
import { seedHomeTranslations } from './translations/home'

const EXPERIENCE_INDEXES = [
  'A1',
  'A2',
  'A3',
  'A4',
  'A5',
  'A6',
  'A7',
  'A8',
  'A9',
  'A10',
  'A11',
] as const

/**
 * Rebuild the homepage `experienceCatalogue` from canonical seed copy.
 *
 * Replaces the previous companyKey-only patcher so a local DB that still has the combined
 * `Carsparency & Khodro45` row (A3) can split into Carsparency + Khodro45 and reindex A1–A11
 * without a destructive full seed. English layout is written first; then every locale overlay
 * re-applies localized name/role/blurb onto the new row ids.
 *
 * No `next/cache` import — this module also runs outside Next via `pnpm seed:home-experience`.
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

  const enItems = homeCopy[DEFAULT_LOCALE].experience.items
  if (enItems.length !== EXPERIENCE_INDEXES.length) {
    throw new Error(
      `home experience catalogue length mismatch: copy has ${enItems.length}, indexes have ${EXPERIENCE_INDEXES.length}`,
    )
  }
  if (EXPERIENCE_COMPANY_KEYS.length !== EXPERIENCE_INDEXES.length) {
    throw new Error(
      `home experience companyKey length mismatch: keys have ${EXPERIENCE_COMPANY_KEYS.length}, indexes have ${EXPERIENCE_INDEXES.length}`,
    )
  }

  const items = EXPERIENCE_INDEXES.map((index, i) => {
    const copy = enItems[i]!
    return {
      index,
      companyKey: EXPERIENCE_COMPANY_KEYS[i]!,
      name: copy.name,
      role: copy.role,
      blurb: copy.blurb,
    }
  })

  const layout = (page.layout ?? []).map((block) =>
    block.blockType === 'experienceCatalogue'
      ? { ...block, items, sectionHeader: homeCopy[DEFAULT_LOCALE].experience.header }
      : block,
  )

  await payload.update({
    collection: 'pages',
    id: page.id,
    context: { disableRevalidate: true },
    data: { _status: 'published', layout },
    depth: 0,
    locale: DEFAULT_LOCALE,
  })

  // Locale leaves need the new row ids (11 cells after the Carsparency/Khodro45 split).
  const translations = await seedHomeTranslations({ payload })

  // Also refresh experience catalogue leaves for every locale from homeCopy (translation helper
  // overlays by index; assert counts match so a missing locale item fails loudly).
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    const copy = homeCopy[locale as Locale]
    if (copy.experience.items.length !== EXPERIENCE_INDEXES.length) {
      throw new Error(
        `home experience catalogue (${locale}) has ${copy.experience.items.length} items; expected ${EXPERIENCE_INDEXES.length}`,
      )
    }
  }

  payload.logger.info(
    `— Homepage experienceCatalogue rebuilt (page ${page.id}, ${items.length} rows: Carsparency + Khodro45 split)`,
  )

  return {
    blockId: existing.id,
    locales: translations.locales,
    pageId: page.id,
    rows: items.length,
  }
}

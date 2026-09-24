import type { Payload } from 'payload'

import {
  DG_ASSETS,
  DG_LOCALES,
  DG_MEDIA,
  DG_SHARED_FIELDS,
  DG_SLUG,
  dgLocalizedFields,
} from './digital-gold'
import {
  FAY_ASSETS,
  FAY_LOCALES,
  FAY_MEDIA,
  FAY_SHARED_FIELDS,
  FAY_SLUG,
  fayLocalizedFields,
} from './faymen'
import {
  K45_ASSETS,
  K45_LOCALES,
  K45_MEDIA,
  K45_SHARED_FIELDS,
  K45_SLUG,
  k45LocalizedFields,
} from './khodro45-dealer-app'
import {
  ND_ASSETS,
  ND_LOCALES,
  ND_MEDIA,
  ND_SHARED_FIELDS,
  ND_SLUG,
  ndLocalizedFields,
} from './nim-dang'
import {
  RP1_ASSETS,
  RP1_MEDIA,
  RP1_SHARED_FIELDS,
  RP1_SLUG,
  rp1LocalizedFields,
  SEED_LOCALES,
} from './rp1-arena'
import type { CaseStudySeedConfig, CaseStudySeedResult } from './seed-case-study'
import { assertNoUnseededLocales, seedCaseStudy } from './seed-case-study'
import { VIN_ASSETS, VIN_MEDIA, VIN_SHARED_FIELDS, VIN_SLUG, vinLocalizedFields } from './vin-app'

/**
 * Every project with a full case study. Add one `CaseStudySeedConfig` entry per project — see
 * `rp1-arena.ts` for a worked example of building the media manifest, the localized fields and
 * the deterministic block-row ids.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CASE_STUDIES: CaseStudySeedConfig<any, any>[] = [
  {
    label: 'RP1',
    slug: RP1_SLUG,
    assetsDir: RP1_ASSETS,
    media: RP1_MEDIA,
    seedLocales: SEED_LOCALES,
    createFields: { kind: ['product'], order: 2, featured: true, coverMediaKey: 'duelMain' },
    sharedFields: RP1_SHARED_FIELDS,
    localizedFields: rp1LocalizedFields,
  },
  {
    label: 'VIN',
    slug: VIN_SLUG,
    assetsDir: VIN_ASSETS,
    media: VIN_MEDIA,
    seedLocales: SEED_LOCALES,
    createFields: { kind: ['product'], order: 1, featured: true, coverMediaKey: 'heroGoalChips' },
    sharedFields: VIN_SHARED_FIELDS,
    localizedFields: vinLocalizedFields,
  },
  {
    label: 'Digital Gold',
    slug: DG_SLUG,
    assetsDir: DG_ASSETS,
    media: DG_MEDIA,
    // All seven: its archive row was already published in es/fr/ja, so a four-locale case study
    // would have left those three linking to empty chapters.
    seedLocales: DG_LOCALES,
    createFields: {
      kind: ['product', 'growth', 'data'],
      order: 3,
      featured: true,
      coverMediaKey: 'cover',
    },
    // The archive seed uploaded a 5.2:1 banner as the cover and never replaces a cover it set.
    replaceCover: true,
    sharedFields: DG_SHARED_FIELDS,
    localizedFields: dgLocalizedFields,
  },
  {
    label: 'Khodro45 Dealer App',
    slug: K45_SLUG,
    assetsDir: K45_ASSETS,
    media: K45_MEDIA,
    seedLocales: K45_LOCALES,
    createFields: {
      kind: ['product', 'systems'],
      order: 4,
      featured: true,
      coverMediaKey: 'carListLive',
    },
    sharedFields: K45_SHARED_FIELDS,
    localizedFields: k45LocalizedFields,
  },
  {
    label: 'Fayman',
    slug: FAY_SLUG,
    assetsDir: FAY_ASSETS,
    media: FAY_MEDIA,
    seedLocales: FAY_LOCALES,
    createFields: { kind: ['product'], order: 5, featured: true, coverMediaKey: 'cover' },
    // The archive cover was the home page, which carries a live coupon and a sales number.
    replaceCover: true,
    sharedFields: FAY_SHARED_FIELDS,
    localizedFields: fayLocalizedFields,
  },
  {
    label: 'Nim Dang',
    slug: ND_SLUG,
    assetsDir: ND_ASSETS,
    media: ND_MEDIA,
    seedLocales: ND_LOCALES,
    createFields: {
      kind: ['product', 'systems'],
      order: 6,
      featured: true,
      coverMediaKey: 'cover',
    },
    // The archive cover was the desktop detail, whose footer carries an address and a phone number.
    replaceCover: true,
    sharedFields: ND_SHARED_FIELDS,
    localizedFields: ndLocalizedFields,
  },
]

export interface SeedCaseStudiesResult {
  results: CaseStudySeedResult[]
}

/**
 * Seeds every case study in `CASE_STUDIES`, in order — each is independently additive/idempotent.
 * Every config's locale guard runs first, so a failure can't land after earlier ones were written.
 */
export async function seedCaseStudies({
  payload,
  rootDir = process.cwd(),
}: {
  payload: Payload
  /** Repo root — `Docs/` is resolved from here (dev only; `Docs/` is not deployed). */
  rootDir?: string
}): Promise<SeedCaseStudiesResult> {
  for (const config of CASE_STUDIES) await assertNoUnseededLocales(payload, config)

  const results: CaseStudySeedResult[] = []
  for (const config of CASE_STUDIES) {
    results.push(await seedCaseStudy(payload, config, rootDir))
  }
  return { results }
}

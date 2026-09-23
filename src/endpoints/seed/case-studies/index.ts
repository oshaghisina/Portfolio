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

import type { Payload } from 'payload'

import { LOCALES } from '@/utilities/locale'

import {
  ARR_ASSETS,
  ARR_LOCALES,
  ARR_MEDIA,
  ARR_SHARED_FIELDS,
  ARR_SLUG,
  arrLocalizedFields,
} from './arash-rezvani'
import {
  BIO_ASSETS,
  BIO_LOCALES,
  BIO_MEDIA,
  BIO_SHARED_FIELDS,
  BIO_SLUG,
  bioLocalizedFields,
} from './biomaze-website-education-panel'
import {
  CBO_ASSETS,
  CBO_COVER_KEY,
  CBO_MEDIA,
  CBO_SLUG,
  cboLocalizedFields,
} from './carsparency/back-office'
import {
  CDS_ASSETS,
  CDS_COVER_KEY,
  CDS_MEDIA,
  CDS_SLUG,
  cdsLocalizedFields,
} from './carsparency/design-system'
import {
  CINS_ASSETS,
  CINS_COVER_KEY,
  CINS_MEDIA,
  CINS_SLUG,
  cinsLocalizedFields,
} from './carsparency/inspection'
import {
  CPRO_ASSETS,
  CPRO_COVER_KEY,
  CPRO_MEDIA,
  CPRO_SLUG,
  cproLocalizedFields,
} from './carsparency/pro'
import { CSP_SHARED_FIELDS } from './carsparency/shared'
import {
  CWEB_ASSETS,
  CWEB_COVER_KEY,
  CWEB_MEDIA,
  CWEB_SLUG,
  cwebLocalizedFields,
} from './carsparency/web'
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
  MQV_ASSETS,
  MQV_LOCALES,
  MQV_MEDIA,
  MQV_SHARED_FIELDS,
  MQV_SLUG,
  mqvLocalizedFields,
} from './marqevon'
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
import {
  YAR_ASSETS,
  YAR_LOCALES,
  YAR_MEDIA,
  YAR_SHARED_FIELDS,
  YAR_SLUG,
  yarLocalizedFields,
} from './yaravan'

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
  {
    label: 'Arash Rezvani',
    slug: ARR_SLUG,
    assetsDir: ARR_ASSETS,
    media: ARR_MEDIA,
    seedLocales: ARR_LOCALES,
    createFields: { kind: ['product'], order: 100, coverMediaKey: 'cover' },
    // The archive row had no cover; a case study needs one for its card and share image.
    replaceCover: true,
    sharedFields: ARR_SHARED_FIELDS,
    localizedFields: arrLocalizedFields,
  },
  {
    label: 'Marqevon',
    slug: MQV_SLUG,
    assetsDir: MQV_ASSETS,
    media: MQV_MEDIA,
    seedLocales: MQV_LOCALES,
    createFields: { kind: ['product'], order: 101, coverMediaKey: 'cover' },
    // The archive row had no cover; the case study's is a type-only crop of the procedure page.
    replaceCover: true,
    sharedFields: MQV_SHARED_FIELDS,
    localizedFields: mqvLocalizedFields,
  },
  {
    label: 'Yaravan',
    slug: YAR_SLUG,
    assetsDir: YAR_ASSETS,
    media: YAR_MEDIA,
    seedLocales: YAR_LOCALES,
    createFields: { kind: ['product', 'systems', 'research'], order: 104, coverMediaKey: 'cover' },
    // Same stored name as the archive cover: the badge-free crop replaces its bytes in place.
    replaceCover: true,
    sharedFields: YAR_SHARED_FIELDS,
    localizedFields: yarLocalizedFields,
  },
  {
    label: 'Biomaze',
    slug: BIO_SLUG,
    assetsDir: BIO_ASSETS,
    media: BIO_MEDIA,
    seedLocales: BIO_LOCALES,
    createFields: {
      kind: ['product', 'systems'],
      order: 70,
      coverMediaKey: 'cover',
    },
    sharedFields: BIO_SHARED_FIELDS,
    localizedFields: bioLocalizedFields,
  },
  // Carsparency: five studies, one per Figma file, sharing one chapter grammar
  // (`carsparency/shared.ts`). Archive orders 20–24 are unchanged; the cover keys reuse each
  // archive cover's stored name, so the sharper export replaces the file in place.
  {
    label: 'Carsparency Pro',
    slug: CPRO_SLUG,
    assetsDir: CPRO_ASSETS,
    media: CPRO_MEDIA,
    seedLocales: LOCALES,
    createFields: { kind: ['product'], order: 20, coverMediaKey: CPRO_COVER_KEY },
    sharedFields: CSP_SHARED_FIELDS,
    localizedFields: cproLocalizedFields,
  },
  {
    label: 'Carsparency Back Office',
    slug: CBO_SLUG,
    assetsDir: CBO_ASSETS,
    media: CBO_MEDIA,
    seedLocales: LOCALES,
    createFields: { kind: ['product', 'data'], order: 21, coverMediaKey: CBO_COVER_KEY },
    sharedFields: CSP_SHARED_FIELDS,
    localizedFields: cboLocalizedFields,
  },
  {
    label: 'Carsparency Inspection',
    slug: CINS_SLUG,
    assetsDir: CINS_ASSETS,
    media: CINS_MEDIA,
    seedLocales: LOCALES,
    createFields: { kind: ['product'], order: 22, coverMediaKey: CINS_COVER_KEY },
    sharedFields: CSP_SHARED_FIELDS,
    localizedFields: cinsLocalizedFields,
  },
  {
    label: 'Carsparency Web',
    slug: CWEB_SLUG,
    assetsDir: CWEB_ASSETS,
    media: CWEB_MEDIA,
    seedLocales: LOCALES,
    createFields: { kind: ['product', 'growth'], order: 23, coverMediaKey: CWEB_COVER_KEY },
    sharedFields: CSP_SHARED_FIELDS,
    localizedFields: cwebLocalizedFields,
  },
  {
    label: 'Carsparency Design System',
    slug: CDS_SLUG,
    assetsDir: CDS_ASSETS,
    media: CDS_MEDIA,
    seedLocales: LOCALES,
    createFields: { kind: ['systems'], order: 24, coverMediaKey: CDS_COVER_KEY },
    sharedFields: CSP_SHARED_FIELDS,
    localizedFields: cdsLocalizedFields,
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

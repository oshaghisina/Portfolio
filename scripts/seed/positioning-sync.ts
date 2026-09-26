/**
 * Apply the positioning copy (D-043) to an existing database without wiping anything:
 *   pnpm exec tsx scripts/seed/positioning-sync.ts                  # local
 *   DATABASE_URL=… pnpm exec tsx scripts/seed/positioning-sync.ts   # prod, from the laptop (D-037)
 *
 * Writes, in order:
 *   1. Home — the Skills block (was Tools / Stack), then every locale's hero, meta and layout
 *      (`seedHomeTools`, which re-runs the home translation pass itself).
 *   2. Footer — description and Approach line in every locale.
 *   3. About — ar/es/de/fr/ja from `aboutCopy`; English's Digikala career stage, the only English
 *      About leaf this pass changed; the `about` global's headline and short bio in en and fa.
 *
 * Additive and idempotent. Deploy the code first: the Skills block's fields only exist in the new
 * schema, so writing them to a server still running the old build leaves the section empty there.
 * Runs with no Next server, so nothing is revalidated — hard-refresh, or restart the app.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { aboutGlobalEn, aboutGlobalFa } from '../../src/endpoints/seed/about-global'
import { careerNarrativesEn, careerStageOrder } from '../../src/endpoints/seed/about-page-content'
import { seedHomeTools } from '../../src/endpoints/seed/home-tools'
import { paragraph, richText } from '../../src/endpoints/seed/lexical-helpers'
import { seedAboutTranslations } from '../../src/endpoints/seed/translations/about'
import { seedNavTranslations } from '../../src/endpoints/seed/translations/nav'
import { DEFAULT_LOCALE } from '../../src/utilities/locale'
import config from '../../src/payload.config'

const payload = await getPayload({ config })

const home = await seedHomeTools({ payload })
const nav = await seedNavTranslations({ payload })
const about = await seedAboutTranslations({ payload })

// English About: overlay the Digikala stage's narrative onto the stored rows, so every id, every
// `experience` relationship and every other stage stays exactly as it is.
const DIGIKALA_ORDER = 1
const digikalaIndex = careerStageOrder.indexOf(DIGIKALA_ORDER)
const { docs } = await payload.find({
  collection: 'pages',
  depth: 0,
  draft: true,
  limit: 1,
  locale: DEFAULT_LOCALE,
  pagination: false,
  where: { slug: { equals: 'about' } },
})
const aboutPage = docs[0]
if (!aboutPage?.layout?.length) throw new Error('No `about` page with a layout — run the full seed first.')

const layout = aboutPage.layout.map((block) =>
  block.blockType === 'careerJourney'
    ? {
        ...block,
        stages: (block.stages ?? []).map((stage, i) =>
          i === digikalaIndex
            ? { ...stage, narrative: richText(paragraph(careerNarrativesEn[DIGIKALA_ORDER]!)) }
            : stage,
        ),
      }
    : block,
)

await payload.update({
  collection: 'pages',
  id: aboutPage.id,
  // Explicit: on a drafts-enabled collection, omitting this leaves a draft the public page
  // never reads.
  context: { disableRevalidate: true },
  data: { _status: 'published', layout },
  depth: 0,
  locale: DEFAULT_LOCALE,
})

// `updateGlobal` merges the fields it is not given, so only these two change. The global has
// per-locale drafts (`localizeStatus`), hence the explicit publish.
for (const [locale, data] of [
  ['en', { headline: aboutGlobalEn.headline, bioShort: aboutGlobalEn.bioShort }],
  ['fa', { headline: aboutGlobalFa.headline, bioShort: aboutGlobalFa.bioShort }],
] as const) {
  await payload.updateGlobal({
    slug: 'about',
    context: { disableRevalidate: true },
    data: { _status: 'published', ...data },
    depth: 0,
    locale,
  })
}

console.log(
  JSON.stringify(
    { home, nav, about, aboutEnglishStage: digikalaIndex, aboutGlobal: ['en', 'fa'] },
    null,
    2,
  ),
)

process.exit(0)

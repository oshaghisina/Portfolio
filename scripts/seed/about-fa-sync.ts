/**
 * Additive FA (and About-global) refresh for an existing local DB — no wipe:
 *   pnpm exec tsx scripts/seed/about-fa-sync.ts
 *
 * Also re-applies work + experience page locale overlays from current seed copy tables
 * so uncommitted FA polish lands before a selective mongodump of pages/globals.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import {
  aboutHeroRichTextFa,
  aboutMetaDescriptionFa,
  aboutMetaTitleFa,
} from '../../src/endpoints/seed/about-page-content'
import { aboutGlobalFa } from '../../src/endpoints/seed/about-global'
import { localizeAboutLayoutFa } from '../../src/endpoints/seed/about-page'
import { buildWorkLayout, WORK_SLUG, workCopy } from '../../src/endpoints/seed/work-content'
import { experiencePageCopy } from '../../src/endpoints/seed/experience-page-copy'
import {
  buildExperienceHero,
  EXPERIENCE_SLUG,
  localizeExperienceLayout,
} from '../../src/endpoints/seed/experience-page-content'
import { DEFAULT_LOCALE, LOCALES } from '../../src/utilities/locale'
import config from '../../src/payload.config'

const payload = await getPayload({ config })

const aboutDocs = await payload.find({
  collection: 'pages',
  depth: 0,
  draft: true,
  limit: 1,
  locale: DEFAULT_LOCALE,
  pagination: false,
  where: { slug: { equals: 'about' } },
})
const aboutPage = aboutDocs.docs[0]
if (!aboutPage) throw new Error('No about page')

await payload.update({
  collection: 'pages',
  id: aboutPage.id,
  locale: 'fa',
  depth: 0,
  context: { disableRevalidate: true },
  data: {
    _status: 'published',
    title: 'درباره',
    hero: { type: 'aboutImpact', richText: aboutHeroRichTextFa },
    layout: localizeAboutLayoutFa(aboutPage.layout),
    meta: {
      description: aboutMetaDescriptionFa,
      title: aboutMetaTitleFa,
      ...(aboutPage.meta?.image ? { image: aboutPage.meta.image } : {}),
    },
  },
})

await payload.updateGlobal({
  slug: 'about',
  locale: 'fa',
  context: { disableRevalidate: true },
  data: aboutGlobalFa,
})

const workDocs = await payload.find({
  collection: 'pages',
  depth: 0,
  draft: true,
  limit: 1,
  locale: DEFAULT_LOCALE,
  pagination: false,
  where: { slug: { equals: WORK_SLUG } },
})
const workPage = workDocs.docs[0]
if (!workPage) throw new Error('No work page')
const [archiveRow, ctaRow] = workPage.layout ?? []

for (const locale of LOCALES) {
  if (locale === DEFAULT_LOCALE) continue
  const copy = workCopy[locale]
  await payload.update({
    collection: 'pages',
    id: workPage.id,
    locale,
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      _status: 'published',
      title: copy.title,
      layout: buildWorkLayout(copy, {
        archive: archiveRow?.id ?? undefined,
        cta: ctaRow?.id ?? undefined,
      }),
      meta: copy.meta,
    },
  })
}

const experienceDocs = await payload.find({
  collection: 'pages',
  depth: 0,
  draft: true,
  limit: 1,
  locale: DEFAULT_LOCALE,
  pagination: false,
  where: { slug: { equals: EXPERIENCE_SLUG } },
})
const experiencePage = experienceDocs.docs[0]
if (!experiencePage) throw new Error('No experience page')

for (const locale of LOCALES) {
  if (locale === DEFAULT_LOCALE) continue
  const copy = experiencePageCopy[locale]
  await payload.update({
    collection: 'pages',
    id: experiencePage.id,
    locale,
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      _status: 'published',
      title: copy.title,
      hero: buildExperienceHero(copy, locale),
      layout: localizeExperienceLayout(locale, experiencePage.layout),
      meta: {
        ...experiencePage.meta,
        description: copy.meta.description,
        title: copy.meta.title,
      },
    },
  })
}

console.log(
  JSON.stringify(
    {
      aboutPageId: aboutPage.id,
      workPageId: workPage.id,
      experiencePageId: experiencePage.id,
      aboutGlobalFa: true,
    },
    null,
    2,
  ),
)

process.exit(0)

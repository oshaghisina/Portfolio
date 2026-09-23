import type { Payload } from 'payload'

import { DEFAULT_LOCALE, LOCALES } from '@/utilities/locale'

import { experiencePageCopy } from '../experience-page-copy'
import {
  buildExperienceHero,
  EXPERIENCE_SLUG,
  localizeExperienceLayout,
} from '../experience-page-content'

/**
 * Write `/experience` in every site locale, additively.
 *
 * Two rules, the same ones the homepage surface follows:
 *
 * **1. Overlay, never rebuild.** The English document is read at `depth: 0` and every row is
 * spread, so block row ids survive at every depth — including the nested skill and evidence rows.
 * The blocks array is shared across locales, so a row sent without its id counts as a *new* row
 * and would grow the English page a duplicate section carrying text in one language. Depth 0 also
 * keeps `evidence[].project` and `meta.image` as ids; a populated document written back would be
 * reshaped into an object Payload then rejects.
 *
 * **2. Leaves and `_status` in the same call.** Publishing a locale before its text lands turns a
 * 404 into a 200 with blank headings, which `contentReady` then advertises in hreflang.
 *
 * Sequential `for…of`, never `Promise.all`: seven writes to *one* document on a drafts-enabled
 * collection, and concurrent read-modify-write would interleave.
 */
export async function seedExperiencePageTranslations({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'pages',
    depth: 0,
    draft: true,
    limit: 1,
    locale: DEFAULT_LOCALE,
    pagination: false,
    where: { slug: { equals: EXPERIENCE_SLUG } },
  })

  const page = docs[0]
  if (!page) throw new Error('No `experience` page in this database — run the full seed first.')
  if (!page.layout?.length) {
    throw new Error('The `experience` page has an empty layout — run the full seed first.')
  }

  const written: string[] = []

  for (const locale of LOCALES) {
    const copy = experiencePageCopy[locale]

    await payload.update({
      collection: 'pages',
      id: page.id,
      context: { disableRevalidate: true },
      data: {
        _status: 'published',
        hero: buildExperienceHero(copy, locale),
        layout: localizeExperienceLayout(locale, page.layout),
        // Spread rather than replace: `meta.image` is not localized and must survive.
        meta: { ...page.meta, description: copy.meta.description, title: copy.meta.title },
        title: copy.title,
        // English is the source this copy was written from; every other locale is drafted and
        // stays unticked until a native speaker reviews it (D-022).
        translationReviewed: locale === DEFAULT_LOCALE,
      },
      depth: 0,
      locale,
    })

    written.push(locale)
  }

  payload.logger.info(`— Experience page written in ${written.join(', ')} (page ${page.id})`)

  return { pageId: page.id, locales: written }
}

import type { Payload } from 'payload'

import { DEFAULT_LOCALE, LOCALES } from '@/utilities/locale'

import { localizeHomeHero, localizeHomeLayout } from '../home-content'
import { homeCopy } from '../home-copy'

/**
 * Write the homepage in every locale. This is the change that stops `/fa`, `/ar`, `/es`, `/de`,
 * `/fr` and `/ja` from 404ing: `localization.fallback` is `false` and `_status` is per-locale,
 * so a locale with no copy is not "English by default", it is not published at all.
 *
 * Additive and idempotent — the page is matched by slug, nothing is created, and each locale is
 * a deterministic overlay of the same English document.
 *
 * Two rules this function exists to enforce:
 *
 * 1. **Overlay, never rebuild.** Every write starts from the English document Payload returned,
 *    so every block row and nested array row keeps its generated `id`. A row sent without its id
 *    is a *new* row, and because the blocks array is shared across locales, rebuilding here
 *    would silently grow the English page a duplicate section carrying text in one language.
 * 2. **Leaves and `_status` in the same call.** Publishing a locale before its text lands turns
 *    a 404 into a 200 with blank headings — which `contentReady` then advertises in hreflang and
 *    offers in the locale switcher. Strictly worse than the 404 it replaces.
 *
 * Sequential `for…of`, never `Promise.all`: these are six writes to *one* document on a
 * drafts-enabled collection with autosave, and concurrent read-modify-write would interleave.
 */
export async function seedHomeTranslations({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'pages',
    // depth 0 keeps `selectedWork.project` and `meta.image` as ids; a populated document written
    // back would be reshaped into an object Payload then rejects.
    depth: 0,
    draft: true,
    limit: 1,
    locale: DEFAULT_LOCALE,
    pagination: false,
    where: { slug: { equals: 'home' } },
  })

  const page = docs[0]
  if (!page) throw new Error('No `home` page in this database — run the full seed first.')
  if (!page.layout?.length) throw new Error('The `home` page has an empty layout — run the full seed first.')

  const written: string[] = []

  for (const locale of LOCALES) {
    const copy = homeCopy[locale]

    await payload.update({
      collection: 'pages',
      id: page.id,
      context: { disableRevalidate: true },
      data: {
        _status: 'published',
        hero: localizeHomeHero(locale, page.hero),
        layout: localizeHomeLayout(locale, page.layout),
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

  payload.logger.info(`— Homepage written in ${written.join(', ')} (page ${page.id})`)

  return { pageId: page.id, locales: written }
}

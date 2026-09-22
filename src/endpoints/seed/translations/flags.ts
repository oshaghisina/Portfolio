import type { Payload } from 'payload'

import { DEFAULT_LOCALE, LOCALES } from '@/utilities/locale'

/**
 * Set `translationReviewed` on every page, in every locale, to what is actually true:
 * `true` for English — the locale all of this copy was written from — and `false` everywhere
 * else until a native speaker ticks it in the admin (D-022).
 *
 * Its own surface rather than a line inside each seeder, because the claim it encodes is the
 * one thing here a reader is entitled to trust. Pages seeded before the field existed default
 * to `false` in English too, which reads as "nobody has checked the English either" — not what
 * is meant, and exactly what the audit flagged.
 *
 * Reads each locale and writes its `layout` straight back alongside the flag. A flag-only
 * update looks safer but is not: Payload validates the merged document, and a partial write
 * that omits a blocks array does not reliably carry its nested rows through validation — the
 * `work` page's CTA link label, which is `required` and present in every locale, was rejected
 * as missing. Sending the layout back unchanged is both provably a no-op and the same
 * read-then-write shape every other surface here uses.
 */
export async function seedReviewFlags({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'pages',
    depth: 0,
    draft: true,
    limit: 200,
    locale: DEFAULT_LOCALE,
    overrideAccess: true,
    pagination: false,
    select: { slug: true },
  })

  let writes = 0

  for (const page of docs) {
    for (const locale of LOCALES) {
      const current = await payload.findByID({
        collection: 'pages',
        id: page.id,
        depth: 0,
        draft: true,
        fallbackLocale: false,
        locale,
        overrideAccess: true,
      })

      await payload.update({
        collection: 'pages',
        id: page.id,
        context: { disableRevalidate: true },
        data: {
          hero: current.hero,
          layout: current.layout,
          translationReviewed: locale === DEFAULT_LOCALE,
        },
        depth: 0,
        locale,
      })
      writes += 1
    }
  }

  payload.logger.info(`— Review flags set on ${docs.length} pages × ${LOCALES.length} locales`)

  return { pages: docs.length, writes }
}

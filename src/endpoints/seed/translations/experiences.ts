import type { Payload } from 'payload'

import { DEFAULT_LOCALE } from '@/utilities/locale'

import type { ExperienceLocale } from '../experience-copy'
import { experienceCopy } from '../experience-copy'

/**
 * Write the `experiences` collection in `ar`, `es`, `de`, `fr` and `ja`.
 *
 * `experiences` is reference data behind the About page's career journey, so an untranslated
 * locale does not 404 — it renders a stage with an empty company and role, which is worse. The
 * collection has no drafts, so there is no `_status` to set and nothing to publish.
 *
 * Matched by `order`, the collection's own stable sort key, never by row position. Only
 * localized leaves are sent: `employment`, `order` and `period.present` / `period.approx` are
 * shared, and `period` is sent as a partial group carrying just `durationLabel` — exactly what
 * `experienceFaData` established, and the reason a partial write here cannot clobber the dates.
 */
export async function seedExperienceTranslations({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'experiences',
    depth: 0,
    limit: 200,
    locale: DEFAULT_LOCALE,
    overrideAccess: true,
    pagination: false,
  })

  if (!docs.length) throw new Error('No experiences in this database — run the full seed first.')

  const locales = Object.keys(experienceCopy) as ExperienceLocale[]
  const missing: number[] = []
  let writes = 0

  for (const doc of docs) {
    for (const locale of locales) {
      const copy = experienceCopy[locale][doc.order]
      if (!copy) {
        if (locale === locales[0]) missing.push(doc.order)
        continue
      }

      await payload.update({
        collection: 'experiences',
        id: doc.id,
        data: {
          company: copy.company,
          domain: copy.domain,
          // Partial group: only the localized leaf. Rebuilding `period` would wipe
          // `present`/`approx`/`start`/`end`, none of which are localized.
          period: { durationLabel: copy.durationLabel },
          product: copy.product,
          role: copy.role,
          summary: copy.summary,
          title: copy.title,
          translationReviewed: false,
        },
        depth: 0,
        locale,
      })
      writes += 1
    }
  }

  if (missing.length) {
    payload.logger.warn(`— No translation copy for experience order(s): ${missing.join(', ')}`)
  }

  payload.logger.info(`— ${writes} experience locale rows written across ${docs.length} experiences`)

  return { experiences: docs.length, locales, untranslated: missing, writes }
}

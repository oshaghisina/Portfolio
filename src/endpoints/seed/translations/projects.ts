import type { Payload } from 'payload'

import { DEFAULT_LOCALE, LOCALES } from '@/utilities/locale'

import type { ProjectLocale } from '../project-copy'
import { projectCompanyCopy, projectRoleCopy, projectTextCopy } from '../project-copy'

/**
 * Write the `projects` archive in the six non-English locales.
 *
 * This is what fills `/xx/work`. The archive block queries projects with `fallbackLocale: false`
 * and `overrideAccess: false`, so an untranslated, unpublished locale contributes nothing:
 * before this ran the archive listed 28 projects in English, 2 in Persian and 0 in Spanish,
 * French and Japanese.
 *
 * Three things this is careful about:
 *
 * 1. **`_status` mirrors English per row.** A few rows are deliberately `draft` in `PROJECT_SEED`
 *    (the facts are not confirmed yet). Publishing them in another locale would expose in
 *    Japanese what is hidden in English.
 * 2. **Projects carrying a case study are skipped entirely.** Two reasons, and either alone is
 *    enough. Their `title`/`summary` come from `case-studies/*.ts` in en/fa/ar/de, so writing
 *    them here would make the result depend on which script ran last. And in es/fr/ja a write
 *    would simply fail: `sections` is a shared blocks array whose leaves are localized and
 *    several are `required`, so Payload validates an untranslated locale's empty chapter titles
 *    and rejects the update. Those three locales land with the case-study translation itself,
 *    not before — which is correct anyway, since an archive row must not advertise a case study
 *    that does not exist in that language.
 * 3. **`company` and `role` are looked up by their English value**, so a row whose company string
 *    changes fails loudly here rather than silently shipping an untranslated company name.
 */
export async function seedProjectTranslations({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'projects',
    depth: 0,
    draft: true,
    limit: 500,
    locale: DEFAULT_LOCALE,
    overrideAccess: true,
    pagination: false,
    select: { slug: true, _status: true, company: true, role: true, sections: true },
  })

  if (!docs.length) throw new Error('No projects in this database — run the full seed first.')

  const localesToWrite = LOCALES.filter((l) => l !== DEFAULT_LOCALE) as ProjectLocale[]
  const missingCopy: string[] = []
  const caseStudyOwned: string[] = []
  const missingLookups: string[] = []
  let writes = 0

  for (const doc of docs) {
    const text = projectTextCopy[doc.slug!]
    if (!text) {
      missingCopy.push(doc.slug!)
      continue
    }

    // Structural, not a hardcoded list: any project that grows a case study is covered the day
    // it does, without this file having to be told about it.
    if (doc.sections?.length) {
      caseStudyOwned.push(doc.slug!)
      continue
    }

    for (const locale of localesToWrite) {
      const company = doc.company ? projectCompanyCopy[locale][doc.company] : undefined
      const role = doc.role ? projectRoleCopy[locale][doc.role] : undefined
      if (doc.company && !company) missingLookups.push(`${locale}: company "${doc.company}"`)
      if (doc.role && !role) missingLookups.push(`${locale}: role "${doc.role}"`)

      await payload.update({
        collection: 'projects',
        id: doc.id,
        context: { disableRevalidate: true },
        data: {
          // Mirror English rather than assuming published — see note 1.
          _status: doc._status ?? 'draft',
          ...(company ? { company } : {}),
          ...(role ? { role } : {}),
          summary: text[locale].summary,
          title: text[locale].title,
          translationReviewed: false,
        },
        depth: 0,
        locale,
      })
      writes += 1
    }
  }

  if (missingCopy.length) {
    payload.logger.warn(`— No translation copy for project(s): ${missingCopy.join(', ')}`)
  }
  if (missingLookups.length) {
    throw new Error(`Untranslated company/role values: ${[...new Set(missingLookups)].join('; ')}`)
  }

  if (caseStudyOwned.length) {
    payload.logger.info(`— Skipped (case-study seed owns their copy): ${caseStudyOwned.join(', ')}`)
  }

  payload.logger.info(`— ${writes} project locale rows written across ${docs.length} projects`)

  return { caseStudyOwned, projects: docs.length, untranslated: missingCopy, writes }
}

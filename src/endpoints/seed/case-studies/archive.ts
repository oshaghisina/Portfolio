import { LOCALES, type Locale } from '@/utilities/locale'

import {
  projectCompanyCopy,
  projectRoleCopy,
  projectTextCopy,
  type ProjectLocale,
} from '../project-copy'
import { PROJECT_SEED, type ProjectSeedRow } from '../projects'

export interface ArchiveText {
  title: string
  summary: string
  company: string
  role: string
}

/**
 * The archive row is the English source of truth for the fields the archive owns (title, summary,
 * company, role, cover); `project-copy.ts` holds their six translations. A case study reads both
 * through this helper so the archive and the case study cannot disagree. Throws at import time
 * when the row, its cover or any translation is missing.
 */
export function archiveIdentity(slug: string): {
  row: ProjectSeedRow & { cover: NonNullable<ProjectSeedRow['cover']> }
  text: (locale: Locale) => ArchiveText
} {
  const row = PROJECT_SEED.find((candidate) => candidate.slug === slug)
  if (!row?.cover) throw new Error(`${slug} case study: no archive row with a cover`)

  const text = (locale: Locale): ArchiveText => {
    if (locale === 'en') {
      return { title: row.title, summary: row.summary, company: row.company, role: row.role }
    }
    const other = locale as ProjectLocale
    const copy = projectTextCopy[slug]?.[other]
    const company = projectCompanyCopy[other][row.company]
    const role = projectRoleCopy[other][row.role]
    if (!copy || !company || !role)
      throw new Error(`${slug} case study: no archive copy in ${locale}`)
    return { title: copy.title, summary: copy.summary, company, role }
  }

  // Resolve every locale now, so a missing translation fails the import, not the seed.
  for (const locale of LOCALES) text(locale)

  return { row: row as ProjectSeedRow & { cover: NonNullable<ProjectSeedRow['cover']> }, text }
}

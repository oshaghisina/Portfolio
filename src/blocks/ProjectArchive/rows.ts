import type { Media, Project } from '@/payload-types'

import { kindLabel, isProjectKind, type ProjectKind } from '@/collections/Projects/kinds'
import { hasPublicCaseStudy, projectUrl } from '@/i18n/routes'
import type { Locale } from '@/utilities/locale'

export interface ProjectLink {
  href: string
  external: boolean
}

/**
 * Where a project row may lead: its published case study first, a live/external URL second,
 * nowhere otherwise — an informational row must not pretend to be interactive.
 */
export function projectLink(
  project: Pick<Project, 'slug' | 'caseStudyStatus' | 'liveUrl'>,
  locale: Locale,
): ProjectLink | null {
  if (hasPublicCaseStudy(project)) return { href: projectUrl(project, locale), external: false }
  if (project.liveUrl) return { href: project.liveUrl, external: true }
  return null
}

/** `2025`, `2023–2025` or `2023–` (ongoing); null while no dates are confirmed. */
export function projectYear(
  period: Project['period'] | null | undefined,
  locale: Locale = 'en',
): string | null {
  const start = period?.start ? new Date(period.start).getUTCFullYear() : null
  if (!start || Number.isNaN(start)) return null
  const end = period?.end ? new Date(period.end).getUTCFullYear() : null
  const number = (value: number) =>
    locale === 'fa'
      ? new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(value)
      : String(value)
  if (period?.present) return `${number(start)}–`
  return end && end !== start ? `${number(start)}–${number(end)}` : number(start)
}

export interface IndexRow {
  id: string
  /** Archive position, zero-padded: "01". Stays fixed when the list is filtered. */
  index: string
  title: string
  slug: string
  summary: string
  cover: Media | null
  kinds: { value: ProjectKind; label: string }[]
  role: string | null
  company: string
  year: string | null
  href: string | null
  external: boolean
}

export const padIndex = (i: number): string => String(i + 1).padStart(2, '0')

type ArchiveProject = Pick<
  Project,
  | 'id'
  | 'title'
  | 'slug'
  | 'summary'
  | 'cover'
  | 'hero'
  | 'kind'
  | 'role'
  | 'company'
  | 'period'
  | 'liveUrl'
  | 'caseStudyStatus'
>

/** Only card data crosses into the browser, never the case-study narrative. */
export function toIndexRows(docs: ArchiveProject[], locale: Locale): IndexRow[] {
  return docs.map((project, i) => {
    const link = projectLink(project, locale)
    return {
      id: project.id,
      index: padIndex(i),
      title: project.title,
      slug: project.slug,
      summary: project.summary,
      cover: archiveCover(project),
      kinds: (project.kind ?? [])
        .filter(isProjectKind)
        .map((value) => ({ value, label: kindLabel(value, locale) })),
      role: project.role ?? null,
      company: project.company,
      year: projectYear(project.period, locale),
      href: link?.href ?? null,
      external: link?.external ?? false,
    }
  })
}

/** Use actual project evidence; a missing cover can still have a usable case-study hero. */
export function archiveCover(project: Pick<Project, 'cover' | 'hero'>): Media | null {
  const candidates = [project.cover, ...(project.hero?.items?.map((item) => item.media) ?? [])]
  return (
    candidates.find((media): media is Media => typeof media === 'object' && !!media?.url) ?? null
  )
}

/** Persian and Arabic keyboard variants should find the same project. */
export const normalizeSearch = (value: string): string =>
  value
    .normalize('NFKC')
    .toLocaleLowerCase()
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[\u064B-\u065F\u0670\u200C\u200D]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

export const companyKey = (company: string): string => normalizeSearch(company)

export function matchesProject(
  row: IndexRow,
  query: string,
  kind: ProjectKind | 'all',
  company: string,
): boolean {
  if (kind !== 'all' && !row.kinds.some((item) => item.value === kind)) return false
  if (company && companyKey(row.company) !== company) return false
  const haystack = normalizeSearch(
    [
      row.title,
      row.slug,
      row.company,
      row.summary,
      row.role,
      ...row.kinds.map((item) => item.label),
    ].join(' '),
  )
  return normalizeSearch(query)
    .split(' ')
    .every((term) => haystack.includes(term))
}

/** Distinct organisations, case/whitespace-insensitive — `company` is free text for now (D-021). */
export const countCompanies = (docs: Pick<Project, 'company'>[]): number =>
  new Set(docs.map((d) => d.company.trim().toLowerCase()).filter(Boolean)).size

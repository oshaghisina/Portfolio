import type { Media, Project } from '@/payload-types'

import { kindLabel, isProjectKind, type ProjectKind } from '@/collections/Projects/kinds'
import { coverPair } from '@/components/ProjectArt/pair'
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

/** Stable element id of a project's row on /work, so search results and Back can land on it. */
export function workRowId(slug: string): string {
  return `work-${slug}`
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
  /** The second screen behind the cover — see `coverPair`. */
  companion: Media | null
  kinds: { value: ProjectKind; label: string }[]
  role: string | null
  company: string
  /** URL-safe company id from the default-locale name, so `?company=` is the same in every locale. */
  companyKey: string
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
  | 'coverCompanion'
  | 'hero'
  | 'kind'
  | 'role'
  | 'company'
  | 'period'
  | 'liveUrl'
  | 'caseStudyStatus'
>

/**
 * Only card data crosses into the browser, never the case-study narrative. `companyNames` maps a
 * project id to its default-locale company, which keys the company filter; without it (or for a
 * project with no default-locale copy) the row's own company is the key.
 */
export function toIndexRows(
  docs: ArchiveProject[],
  locale: Locale,
  companyNames?: ReadonlyMap<string, string>,
): IndexRow[] {
  return docs.map((project, i) => {
    const link = projectLink(project, locale)
    const { lead, companion } = coverPair(project)
    return {
      id: project.id,
      index: padIndex(i),
      title: project.title,
      slug: project.slug,
      summary: project.summary,
      cover: lead,
      companion,
      kinds: (project.kind ?? [])
        .filter(isProjectKind)
        .map((value) => ({ value, label: kindLabel(value, locale) })),
      role: project.role ?? null,
      company: project.company,
      companyKey: companyKey(companyNames?.get(project.id) ?? '') || companyKey(project.company),
      year: projectYear(project.period, locale),
      href: link?.href ?? null,
      external: link?.external ?? false,
    }
  })
}

/** Use actual project evidence; a missing cover can still have a usable case-study hero. */
export function archiveCover(project: Pick<Project, 'cover' | 'hero'>): Media | null {
  return coverPair(project).lead
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

/**
 * Stable, URL-safe company id: `Hadish Mall` → `hadish-mall`. `company` is free text for now
 * (D-021), so the key comes from the default-locale name and never from a translation.
 */
export const companyKey = (company: string): string =>
  normalizeSearch(company)
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')

/** `company` is a `companyKey`; an empty value means every company. */
export function matchesProject(
  row: IndexRow,
  query: string,
  kind: ProjectKind | 'all',
  company: string,
): boolean {
  if (kind !== 'all' && !row.kinds.some((item) => item.value === kind)) return false
  if (company && row.companyKey !== company) return false
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

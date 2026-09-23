import type { Project } from '@/payload-types'

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
export function projectYear(period: Project['period'] | null | undefined, locale: Locale = 'en'): string | null {
  const start = period?.start ? new Date(period.start).getUTCFullYear() : null
  if (!start || Number.isNaN(start)) return null
  const end = period?.end ? new Date(period.end).getUTCFullYear() : null
  const number = (value: number) => locale === 'fa' ? new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(value) : String(value)
  if (period?.present) return `${number(start)}–`
  return end && end !== start ? `${number(start)}–${number(end)}` : number(start)
}

export interface IndexRow {
  id: string
  /** Archive position, zero-padded: "01". Stays fixed when the list is filtered. */
  index: string
  title: string
  kinds: { value: ProjectKind; label: string }[]
  role: string | null
  company: string
  year: string | null
  href: string | null
  external: boolean
}

export const padIndex = (i: number): string => String(i + 1).padStart(2, '0')

/** Serialisable rows for the client-side index — no Payload types cross into the client bundle. */
export function toIndexRows(docs: Project[], locale: Locale): IndexRow[] {
  return docs.map((project, i) => {
    const link = projectLink(project, locale)
    return {
      id: project.id,
      index: padIndex(i),
      title: project.title,
      kinds: (project.kind ?? []).filter(isProjectKind).map((value) => ({ value, label: kindLabel(value, locale) })),
      role: project.role ?? null,
      company: project.company,
      year: projectYear(project.period, locale),
      href: link?.href ?? null,
      external: link?.external ?? false,
    }
  })
}

/** Distinct organisations, case/whitespace-insensitive — `company` is free text for now (D-021). */
export const countCompanies = (docs: Pick<Project, 'company'>[]): number =>
  new Set(docs.map((d) => d.company.trim().toLowerCase()).filter(Boolean)).size

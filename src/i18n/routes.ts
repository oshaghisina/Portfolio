import type { Project } from '@/payload-types'

import { localePath } from './navigation'
import type { Locale } from '@/utilities/locale'

/**
 * The one place that knows which URL prefix a collection lives under. `hrefFromLink`,
 * admin preview paths, redirects and locale readiness all read this table, so a project is
 * `/work/<slug>` (and `/fa/work/<slug>`) everywhere without any component spelling it out.
 */
export const COLLECTION_PATH_PREFIX = {
  pages: '',
  posts: '/lab',
  projects: '/work',
} as const

export type RoutedCollection = keyof typeof COLLECTION_PATH_PREFIX

/** Logical (unprefixed) path of the `/work` archive page — a CMS page with slug `work`. */
export const WORK_PATH = COLLECTION_PATH_PREFIX.projects

export const isRoutedCollection = (v: unknown): v is RoutedCollection =>
  typeof v === 'string' && v in COLLECTION_PATH_PREFIX

/** Logical path for a document of a routed collection. Pages sit at the root. */
export function docPath(relationTo: RoutedCollection, slug: string): string {
  return `${COLLECTION_PATH_PREFIX[relationTo]}/${slug}`
}

export function projectPath(project: Pick<Project, 'slug'>): string {
  return docPath('projects', project.slug)
}

/** Public, locale-prefixed URL of a project's case study — `getProjectUrl(project, locale)`. */
export function projectUrl(project: Pick<Project, 'slug'>, locale: Locale): string {
  return localePath(locale, projectPath(project))
}

/**
 * Whether a project may link to `/work/<slug>`. Publication (`_status`) makes a project visible
 * in the archive; only a *published case study* earns a detail link. Every surface (archive row,
 * homepage feature, the future detail route's 404 rule) asks this one predicate.
 */
export function hasPublicCaseStudy(project: Pick<Project, 'caseStudyStatus'> | null | undefined): boolean {
  return project?.caseStudyStatus === 'published'
}

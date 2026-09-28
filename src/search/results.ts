import type { Post, Project } from '@/payload-types'

import { normalizeSearch, workRowId } from '@/blocks/ProjectArchive/rows'
import { kindLabels } from '@/collections/Projects/kinds'
import { isLocaleReady } from '@/i18n/contentReady'
import { localePath } from '@/i18n/navigation'
import { docPath, hasPublicCaseStudy, projectUrl, WORK_PATH } from '@/i18n/routes'
import type { Locale } from '@/utilities/locale'

/**
 * `/search` results (R08). Projects and posts are read straight from their collections in the
 * visitor's locale, with the same gates every other public surface uses, and matched here with
 * the Work archive's `normalizeSearch` — so ی/ي and ک/ك find the same project in any language.
 * No search index is involved: nothing to backfill, and nothing indexed in one locale can leak
 * into another.
 */
export type SearchResultType = 'caseStudy' | 'project' | 'post'

export interface SearchResult {
  id: string
  type: SearchResultType
  title: string
  /** The organisation for a project; null for a post. */
  context: string | null
  summary: string | null
  href: string
}

export interface SearchField {
  text: string | null | undefined
  /** How much a hit here counts against a hit elsewhere: title over organisation over summary. */
  weight: number
}

export interface SearchCandidate {
  result: SearchResult
  fields: SearchField[]
}

const LETTER_OR_NUMBER = /[\p{L}\p{N}]/u

/** Whether `term` occurs in `text` at the start of a word (so "vin" ranks VIN above "saving"). */
function startsWord(text: string, term: string): boolean {
  for (let at = text.indexOf(term); at >= 0; at = text.indexOf(term, at + 1)) {
    if (at === 0 || !LETTER_OR_NUMBER.test(text.charAt(at - 1))) return true
  }
  return false
}

/**
 * Every term of the query must appear somewhere (substring match, like the archive, so Arabic
 * `ال…` and unspaced Japanese still match). 0 means no match; a larger score ranks higher.
 */
export function matchScore(query: string, fields: SearchField[]): number {
  const terms = normalizeSearch(query).split(' ').filter(Boolean)
  if (!terms.length) return 0
  const texts = fields.map(({ text, weight }) => ({ text: normalizeSearch(text ?? ''), weight }))
  let score = 0
  for (const term of terms) {
    let best = 0
    for (const { text, weight } of texts) {
      if (!text.includes(term)) continue
      best = Math.max(best, weight * (startsWord(text, term) ? 2 : 1))
    }
    if (!best) return 0
    score += best
  }
  return score
}

export type SearchProject = Pick<
  Project,
  'id' | 'title' | 'slug' | 'summary' | 'company' | 'role' | 'kind' | 'caseStudyStatus' | '_status'
>

/**
 * A project in `locale`, or null when it must not appear there: not published in this locale,
 * no title in this locale, or an archive entry while the locale's Work page isn't ready. A public
 * case study links to `/work/<slug>`; any other project links to its row on the Work page.
 */
export function projectCandidate(
  project: SearchProject,
  locale: Locale,
  workReady: boolean,
): SearchCandidate | null {
  const title = project.title?.trim()
  if (!isLocaleReady(project) || !title || !project.slug) return null
  const caseStudy = hasPublicCaseStudy(project)
  if (!caseStudy && !workReady) return null
  return {
    result: {
      id: `projects:${project.id}`,
      type: caseStudy ? 'caseStudy' : 'project',
      title,
      context: project.company?.trim() || null,
      summary: project.summary?.trim() || null,
      href: caseStudy
        ? projectUrl(project, locale)
        : `${localePath(locale, WORK_PATH)}#${workRowId(project.slug)}`,
    },
    fields: [
      { text: title, weight: 4 },
      { text: project.company, weight: 3 },
      { text: project.slug, weight: 2 },
      { text: kindLabels(project.kind, locale).join(' '), weight: 2 },
      { text: project.role, weight: 1 },
      { text: project.summary, weight: 1 },
    ],
  }
}

export type SearchPost = Pick<Post, 'id' | 'title' | 'slug' | 'meta' | '_status'>

/** A Lab post in `locale`, or null when it isn't published there. */
export function postCandidate(post: SearchPost, locale: Locale): SearchCandidate | null {
  const title = post.title?.trim()
  if (!isLocaleReady(post) || !title || !post.slug) return null
  return {
    result: {
      id: `posts:${post.id}`,
      type: 'post',
      title,
      context: null,
      summary: post.meta?.description?.trim() || null,
      href: localePath(locale, docPath('posts', post.slug)),
    },
    fields: [
      { text: title, weight: 4 },
      { text: post.meta?.title, weight: 3 },
      { text: post.slug, weight: 2 },
      { text: post.meta?.description, weight: 1 },
    ],
  }
}

/** Matching results, best first; ties keep the given order (projects in archive order, then posts). */
export function rankResults(query: string, candidates: (SearchCandidate | null)[]): SearchResult[] {
  return candidates
    .flatMap((candidate, index) => {
      if (!candidate) return []
      const score = matchScore(query, candidate.fields)
      return score ? [{ result: candidate.result, score, index }] : []
    })
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ result }) => result)
}

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { isLogicalPathReady } from '@/i18n/contentReady'
import { WORK_PATH } from '@/i18n/routes'
import type { Locale } from '@/utilities/locale'

import {
  postCandidate,
  projectCandidate,
  rankResults,
  type SearchPost,
  type SearchProject,
  type SearchResult,
} from './results'

/**
 * One code path for every locale: the public (access-gated, per-locale published, no fallback)
 * projects and posts of `locale`, matched in memory. The whole catalogue is a few dozen records,
 * the same set the Work archive already sends to the browser, so reading it beats a `like` query
 * that can't fold ی/ي or ک/ك.
 */
export async function searchSite({
  locale,
  query,
}: {
  locale: Locale
  query: string
}): Promise<SearchResult[]> {
  const payload = await getPayload({ config: configPromise })
  const common = {
    depth: 0,
    draft: false,
    fallbackLocale: false as const,
    limit: 0,
    locale,
    overrideAccess: false,
    pagination: false,
  }

  const [projects, posts, workReady] = await Promise.all([
    payload.find({
      ...common,
      collection: 'projects',
      sort: ['order', 'title'],
      select: {
        title: true,
        slug: true,
        summary: true,
        company: true,
        role: true,
        kind: true,
        caseStudyStatus: true,
        _status: true,
      },
    }),
    payload.find({
      ...common,
      collection: 'posts',
      sort: '-publishedAt',
      select: { title: true, slug: true, meta: { title: true, description: true }, _status: true },
    }),
    // An archive-only project opens its row on /work, so it is only a result where /work is.
    isLogicalPathReady(WORK_PATH, locale),
  ])

  return rankResults(query, [
    ...(projects.docs as SearchProject[]).map((doc) => projectCandidate(doc, locale, workReady)),
    ...(posts.docs as SearchPost[]).map((doc) => postCandidate(doc, locale)),
  ])
}

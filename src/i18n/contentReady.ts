import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { COLLECTION_PATH_PREFIX, hasPublicCaseStudy } from '@/i18n/routes'
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/utilities/locale'

/** True when a nav href is the Lab archive root (`/lab`) — used to hide Lab when the locale has no posts. */
export function isLabArchiveHref(href: string | null | undefined): boolean {
  return href === COLLECTION_PATH_PREFIX.posts
}

/**
 * Centralized "is this locale's copy of a document publicly ready" check (D-009 follow-up).
 * Every public query already runs with `{ locale, fallbackLocale: false }`, so a document that
 * doesn't exist in the requested locale, or exists but isn't published *for that locale* (once
 * `versions.drafts.localizeStatus` is enabled — see `payload.config.ts`), must never be treated
 * as ready. Missing leaf fields within an otherwise-published doc are left empty by
 * `fallbackLocale: false` rather than silently filled from English — that's intentional, not a
 * bug this function needs to catch.
 */
export interface LocaleReadinessDoc {
  _status?: string | null
  /** Projects only: a published archive entry is not a page until its case study is public too. */
  caseStudyStatus?: 'none' | 'draft' | 'published' | null
}

export function isLocaleReady(doc: LocaleReadinessDoc | null | undefined): boolean {
  return doc?._status === 'published'
}

function collectionForLogicalPath(logicalPath: string): {
  collection: 'pages' | 'posts' | 'projects'
  slug: string
} {
  // The bare archive root (e.g. `/lab`) and its pagination (`/lab/page/2`) have no `pages`
  // document behind them — judged by whether the locale has any published post.
  if (
    logicalPath === COLLECTION_PATH_PREFIX.posts ||
    logicalPath.startsWith(`${COLLECTION_PATH_PREFIX.posts}/page/`)
  ) {
    return { collection: 'posts', slug: '' }
  }
  // `/work` itself is the `work` page; only `/work/<slug>` is a project document.
  for (const collection of ['posts', 'projects'] as const) {
    const prefix = `${COLLECTION_PATH_PREFIX[collection]}/`
    if (logicalPath.startsWith(prefix)) {
      return { collection, slug: logicalPath.slice(prefix.length) }
    }
  }
  return { collection: 'pages', slug: logicalPath === '/' ? 'home' : logicalPath.slice(1) }
}

/** English is always ready; every other locale is checked against its own published status. */
export async function isLogicalPathReady(logicalPath: string, locale: Locale): Promise<boolean> {
  if (locale === DEFAULT_LOCALE) return true

  const { collection, slug } = collectionForLogicalPath(logicalPath)
  const payload = await getPayload({ config: configPromise })

  // The archive root isn't a single document — ready when the locale has at least one
  // published post, the same access-gated where-clause every other check relies on.
  if (collection === 'posts' && slug === '') {
    const { totalDocs } = await payload.count({ collection: 'posts', locale, overrideAccess: false })
    return totalDocs > 0
  }

  const query = {
    depth: 0,
    limit: 1,
    locale,
    fallbackLocale: false as const,
    overrideAccess: false,
    pagination: false,
    where: { slug: { equals: slug } },
  }

  // `/work/<slug>` is only a page when the case study itself is published — an archive-only
  // project must never be advertised as a hreflang alternate or a switcher target.
  if (collection === 'projects') {
    const result = await payload.find({
      ...query,
      collection,
      select: { _status: true, caseStudyStatus: true },
    })
    const doc = result.docs[0]
    return isLocaleReady(doc) && hasPublicCaseStudy(doc)
  }

  const result = await payload.find({ ...query, collection, select: { _status: true } })
  return isLocaleReady(result.docs[0])
}

/** A `{ locale: ready }` map for every site locale, for the switcher and hreflang generation. */
export async function getLocaleReadinessMap(logicalPath: string): Promise<Record<Locale, boolean>> {
  const entries = await Promise.all(
    LOCALES.map(async (locale) => [locale, await isLogicalPathReady(logicalPath, locale)] as const),
  )
  return Object.fromEntries(entries) as Record<Locale, boolean>
}

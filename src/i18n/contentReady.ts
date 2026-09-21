import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { COLLECTION_PATH_PREFIX } from '@/i18n/routes'
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/utilities/locale'

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
}

export function isLocaleReady(doc: LocaleReadinessDoc | null | undefined): boolean {
  return doc?._status === 'published'
}

function collectionForLogicalPath(logicalPath: string): {
  collection: 'pages' | 'posts' | 'projects'
  slug: string
} {
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
  const result = await payload.find({
    collection,
    depth: 0,
    limit: 1,
    locale,
    fallbackLocale: false,
    overrideAccess: false,
    pagination: false,
    select: { _status: true },
    where: { slug: { equals: slug } },
  })

  return isLocaleReady(result.docs[0])
}

/** A `{ locale: ready }` map for every site locale, for the switcher and hreflang generation. */
export async function getLocaleReadinessMap(logicalPath: string): Promise<Record<Locale, boolean>> {
  const entries = await Promise.all(LOCALES.map(async (locale) => [locale, await isLogicalPathReady(logicalPath, locale)] as const))
  return Object.fromEntries(entries) as Record<Locale, boolean>
}

import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { DEFAULT_LOCALE, type Locale } from './locale'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(slug: T, locale: Locale, depth = 0): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    draft: false,
    fallbackLocale: false,
    locale,
    overrideAccess: false,
  })

  return global
}

/**
 * Returns an unstable_cache function keyed by slug *and locale* — Header/Footer nav labels are
 * localized (D-009), so caching by slug alone would serve whichever locale populated the cache
 * first to every visitor.
 */
export const getCachedGlobal = <T extends Global>(slug: T, locale: Locale = DEFAULT_LOCALE, depth = 0) =>
  unstable_cache(async () => getGlobal<T>(slug, locale, depth), [slug, locale], {
    tags: [`global_${slug}_${locale}`],
  })

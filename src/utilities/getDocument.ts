import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import type { Locale } from './locale'

type Collection = keyof Config['collections']

async function getDocument(collection: Collection, slug: string, locale: Locale, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection,
    depth,
    fallbackLocale: false,
    locale,
    overrideAccess: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return page.docs[0]
}

/**
 * Returns an unstable_cache function mapped with the cache tag for the slug *and locale* — a
 * redirect target is locale-scoped just like Header/Footer (see `getGlobals.ts`), so caching by
 * slug alone would serve whichever locale populated the cache first to every visitor.
 */
export const getCachedDocument = (collection: Collection, slug: string, locale: Locale) =>
  unstable_cache(async () => getDocument(collection, slug, locale), [collection, slug, locale], {
    tags: [`${collection}_${slug}_${locale}`],
  })

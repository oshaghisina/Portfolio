import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { localePath } from '@/i18n/navigation'
import { LOCALES } from '@/utilities/locale'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const dateFallback = new Date().toISOString()

    // Only `pages` documents. The Lab archive (`/lab`) is left out for now: it has no published
    // posts (R18, 2026-09-27). `/search` is intentionally omitted — it is noindex and must not
    // inflate the sitemap with query-result permutations.

    // One query per locale (D-009) — `_status` is per-locale now, so a locale only contributes a
    // URL when its own copy of the page is actually published, never English's.
    const perLocale = await Promise.all(
      LOCALES.map(async (locale) => {
        const results = await payload.find({
          collection: 'pages',
          overrideAccess: false,
          draft: false,
          depth: 0,
          fallbackLocale: false,
          limit: 1000,
          locale,
          pagination: false,
          where: {
            _status: {
              equals: 'published',
            },
          },
          select: {
            slug: true,
            updatedAt: true,
          },
        })

        return results.docs
          .filter((page) => Boolean(page?.slug))
          .map((page) => ({
            loc: `${SITE_URL}${localePath(locale, page?.slug === 'home' ? '/' : `/${page?.slug}`)}`,
            lastmod: page.updatedAt || dateFallback,
          }))
      }),
    )

    return perLocale.flat()
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}

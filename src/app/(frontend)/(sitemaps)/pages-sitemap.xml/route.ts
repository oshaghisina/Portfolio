import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { localePath } from '@/i18n/navigation'
import { COLLECTION_PATH_PREFIX } from '@/i18n/routes'
import { LOCALES } from '@/utilities/locale'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const dateFallback = new Date().toISOString()

    // The two routes with no `pages` document behind them. `/posts` used to be listed here —
    // it is the retired path the proxy 308s to `/lab`, so it was advertising a redirect. Both
    // are emitted per locale, like everything else on a seven-locale site.
    const defaultSitemap = LOCALES.flatMap((locale) =>
      [COLLECTION_PATH_PREFIX.posts, '/search'].map((path) => ({
        loc: `${SITE_URL}${localePath(locale, path)}`,
        lastmod: dateFallback,
      })),
    )

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

    return [...defaultSitemap, ...perLocale.flat()]
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

import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { localePath } from '@/i18n/navigation'
import { projectPath } from '@/i18n/routes'
import { LOCALES } from '@/utilities/locale'

const getProjectsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const dateFallback = new Date().toISOString()

    // One query per locale (D-009): a locale contributes a URL only when its own copy of the
    // project is published *and* the case study is public — an archive-only entry has no page.
    const perLocale = await Promise.all(
      LOCALES.map(async (locale) => {
        const results = await payload.find({
          collection: 'projects',
          overrideAccess: false,
          draft: false,
          depth: 0,
          fallbackLocale: false,
          limit: 1000,
          locale,
          pagination: false,
          where: {
            and: [{ _status: { equals: 'published' } }, { caseStudyStatus: { equals: 'published' } }],
          },
          select: { slug: true, updatedAt: true },
        })

        return results.docs
          .filter((project) => Boolean(project?.slug))
          .map((project) => ({
            loc: `${SITE_URL}${localePath(locale, projectPath(project))}`,
            lastmod: project.updatedAt || dateFallback,
          }))
      }),
    )

    return perLocale.flat()
  },
  ['projects-sitemap'],
  {
    tags: ['projects-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getProjectsSitemap()

  return getServerSideSitemap(sitemap)
}

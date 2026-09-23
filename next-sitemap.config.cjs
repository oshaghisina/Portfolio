/**
 * Production builds must set `NEXT_PUBLIC_SERVER_URL` (see README + Docs/Deploy-Prompt.md).
 * Without it, postbuild writes `example.com` (or a stale localhost artifact from a prior local
 * run) into gitignored `public/robots.txt` and `public/sitemap*.xml` — never commit those files;
 * dynamic sitemaps under `src/app/(frontend)/(sitemaps)/` are the real pages/posts/projects maps.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/projects-sitemap.xml', '/*', '/lab/*', '/work/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/posts-sitemap.xml`,
      `${SITE_URL}/projects-sitemap.xml`,
    ],
  },
}

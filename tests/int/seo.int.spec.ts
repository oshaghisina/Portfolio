import { readFileSync } from 'node:fs'
import path from 'node:path'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { RETIRED_PROJECT_SLUGS } from '@/endpoints/seed/projects'
import { CARSPARENCY_NEXT_CHAIN } from '@/endpoints/seed/sync-carsparency-next'
import { buildBreadcrumbJsonLd } from '@/utilities/breadcrumbSchema'
import { OG_LOCALE, generateMeta } from '@/utilities/generateMeta'
import { withSiteName } from '@/utilities/site'
import { buildWebSiteJsonLd } from '@/utilities/websiteSchema'

vi.mock('@/i18n/contentReady', () => ({
  getLocaleReadinessMap: vi.fn(async () => ({
    en: true,
    fa: true,
    ar: false,
    es: false,
    de: false,
    fr: false,
    ja: false,
  })),
}))

vi.mock('@/utilities/getURL', () => ({
  getServerSideURL: () => 'https://sinaoshaghi.com',
}))

describe('SEO helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('withSiteName suffixes without doubling the brand', () => {
    expect(withSiteName('Work')).toBe('Work | Sina Oshaghi')
    expect(withSiteName('Sina Oshaghi — Product Designer')).toBe(
      'Sina Oshaghi — Product Designer',
    )
    expect(withSiteName(null)).toBe('Sina Oshaghi')
  })

  it('generateMeta falls back to doc.title / project.summary and gates hreflang', async () => {
    const meta = await generateMeta({
      doc: {
        title: 'Digital Gold',
        summary: 'A product case study about Digikala gold.',
      },
      locale: 'en',
      logicalPath: '/work/digital-gold',
    })

    expect(meta.title).toBe('Digital Gold | Sina Oshaghi')
    expect(meta.description).toBe('A product case study about Digikala gold.')
    expect(meta.alternates?.canonical).toBe('https://sinaoshaghi.com/work/digital-gold')
    expect(meta.alternates?.languages).toMatchObject({
      'x-default': 'https://sinaoshaghi.com/work/digital-gold',
      en: 'https://sinaoshaghi.com/work/digital-gold',
      fa: 'https://sinaoshaghi.com/fa/work/digital-gold',
    })
    expect(meta.alternates?.languages).not.toHaveProperty('ar')
    expect(meta.openGraph?.locale).toBe(OG_LOCALE.en)
    expect(meta.twitter).toMatchObject({
      card: 'summary_large_image',
      title: 'Digital Gold | Sina Oshaghi',
    })
    expect(meta.robots).toBeUndefined()
  })

  it('generateMeta sets noindex when draft is true', async () => {
    const meta = await generateMeta({
      doc: { meta: { title: 'Preview', description: 'Draft' } },
      draft: true,
      locale: 'fa',
      logicalPath: '/about',
    })

    expect(meta.robots).toEqual({ index: false, follow: false })
    expect(meta.alternates?.canonical).toBe('https://sinaoshaghi.com/fa/about')
    expect(meta.openGraph?.locale).toBe('fa_IR')
  })

  it('buildWebSiteJsonLd is factual site identity', () => {
    expect(buildWebSiteJsonLd({ locale: 'en', serverUrl: 'https://sinaoshaghi.com' })).toEqual({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Sina Oshaghi',
      url: 'https://sinaoshaghi.com',
      inLanguage: 'en',
    })
  })

  it('buildBreadcrumbJsonLd requires at least two crumbs', () => {
    expect(buildBreadcrumbJsonLd({ items: [{ name: 'Work', url: 'https://x/work' }] })).toBeNull()
    expect(
      buildBreadcrumbJsonLd({
        items: [
          { name: 'All work', url: 'https://sinaoshaghi.com/work' },
          { name: 'Digital Gold', url: 'https://sinaoshaghi.com/work/digital-gold' },
        ],
      }),
    ).toMatchObject({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { position: 1, name: 'All work' },
        { position: 2, name: 'Digital Gold' },
      ],
    })
  })

  it('pages sitemap source no longer advertises /search', () => {
    const source = readFileSync(
      path.join(process.cwd(), 'src/app/(frontend)/(sitemaps)/pages-sitemap.xml/route.ts'),
      'utf8',
    )
    expect(source).not.toMatch(/['"]\/search['"]/)
    expect(source).toContain('COLLECTION_PATH_PREFIX.posts')
  })

  it('robots config disallows admin, api, next, and design', () => {
    const source = readFileSync(path.join(process.cwd(), 'next-sitemap.config.cjs'), 'utf8')
    expect(source).toContain("'/admin/*'")
    expect(source).toContain("'/api/*'")
    expect(source).toContain("'/next/*'")
    expect(source).toContain("'/design'")
  })

  it('retired project slugs redirect targets stay archive-only', () => {
    expect(RETIRED_PROJECT_SLUGS.length).toBeGreaterThan(0)
    expect(RETIRED_PROJECT_SLUGS).toContain('uae-car-marketplace')
  })

  it('Carsparency next chain is a closed loop through every surface', () => {
    const sources = CARSPARENCY_NEXT_CHAIN.map((e) => e.slug)
    const targets = CARSPARENCY_NEXT_CHAIN.map((e) => e.nextSlug)
    expect(new Set(sources).size).toBe(sources.length)
    expect(new Set(targets).size).toBe(targets.length)
    expect(sources.sort()).toEqual(targets.sort())
  })
})

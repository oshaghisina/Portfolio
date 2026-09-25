import type { Metadata } from 'next'

import { PageFrame } from '@/components/PageFrame'
import { ExperienceMotion } from '@/components/ExperienceVisuals/Motion.client'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'
import { workStatic } from '@/endpoints/seed/work-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getLocale } from '@/utilities/getLocale'
import { getServerSideURL } from '@/utilities/getURL'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { buildPersonJsonLd } from '@/utilities/personSchema'
import { buildWebSiteJsonLd } from '@/utilities/websiteSchema'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

/**
 * Static fallback content for an empty database — English only (D-009), never surfaced under
 * another locale's URL, since that would silently mix English into an unready locale.
 */
const STATIC_PAGES: Record<string, RequiredDataFromCollectionSlug<'pages'>> = {
  home: homeStatic,
  work: workStatic,
}

const staticFallback = (slug: string, locale: Locale) =>
  locale === DEFAULT_LOCALE ? (STATIC_PAGES[slug] ?? null) : null

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const locale = await getLocale()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    locale,
    slug: decodedSlug,
  })

  if (!page) {
    page = staticFallback(decodedSlug, locale)
  }

  if (!page) {
    return <PayloadRedirects locale={locale} url={url} />
  }

  const { hero, layout } = page
  const isAbout = page.slug === 'about'
  const isHome = page.slug === 'home'
  const serverUrl = getServerSideURL()

  // Person JSON-LD is About-only — no need to fetch the `about` global on every page.
  const personJsonLd = isAbout
    ? buildPersonJsonLd({ about: await getCachedGlobal('about', locale, 1)(), serverUrl })
    : null
  const webSiteJsonLd = isHome ? buildWebSiteJsonLd({ locale, serverUrl }) : null

  // Every page opens flush against the header: the sheet and the header are both `.canvas`, so
  // with no gap between them the hairline rails run unbroken through the header's bottom border.
  // The opener carries its own top padding, so the headline still breathes.
  return (
    <>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound locale={locale} url={url} />

      {draft && <LivePreviewListener />}
      {personJsonLd && (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
          type="application/ld+json"
        />
      )}
      {webSiteJsonLd && (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd).replace(/</g, '\\u003c') }}
          type="application/ld+json"
        />
      )}

      <PageFrame>
        {page.slug === 'experience' ? (
          <ExperienceMotion>
            <RenderHero {...hero} locale={locale} />
            <RenderBlocks blocks={layout} locale={locale} />
          </ExperienceMotion>
        ) : (
          <>
            <RenderHero {...hero} locale={locale} />
            <RenderBlocks blocks={layout} locale={locale} />
          </>
        )}
      </PageFrame>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const locale = await getLocale()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page =
    (await queryPageBySlug({
      locale,
      slug: decodedSlug,
    })) ?? staticFallback(decodedSlug, locale)
  const logicalPath = decodedSlug === 'home' ? '/' : `/${decodedSlug}`

  return generateMeta({ doc: page, draft, locale, logicalPath })
}

const queryPageBySlug = cache(async ({ locale, slug }: { locale: Locale; slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    fallbackLocale: false,
    limit: 1,
    locale,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { cn } from '@/utilities/ui'
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
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const isHome = page.slug === 'home'
  const isAbout = page.slug === 'about'

  // Person JSON-LD is About-only — no need to fetch the `about` global on every page.
  const personJsonLd = isAbout
    ? buildPersonJsonLd({ about: await getCachedGlobal('about', locale, 1)(), serverUrl: getServerSideURL() })
    : null

  return (
    <article className={cn('pt-6 pb-16 md:pt-16 md:pb-24', isHome && 'home-ruled-paper')}>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}
      {personJsonLd && (
        <script dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} type="application/ld+json" />
      )}

      {/* Homepage-only narrow canvas: every hero/block section relies on this one ancestor for width;
          everywhere else each block renders its own `.container`. */}
      <div className={cn(isHome && 'canvas')}>
        <RenderHero {...hero} />
        <RenderBlocks blocks={layout} disableInnerContainer={isHome} locale={locale} />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
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

  return generateMeta({ doc: page, locale, logicalPath })
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

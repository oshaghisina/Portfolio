import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageFrame } from '@/components/PageFrame'
import { PageOpener } from '@/components/PageOpener'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'
import { getLocale } from '@/utilities/getLocale'
import { uiCopy } from '@/utilities/uiCopy'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })
  const locale = await getLocale()

  // The search index is shared across locales. Query the source collection for Persian so an
  // English-only indexed post cannot appear as a Persian result with English title/excerpt.
  const posts = await payload.find({
    collection: locale === 'fa' ? 'posts' : 'search',
    depth: 1,
    fallbackLocale: false,
    limit: 12,
    locale,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <PageFrame>
      <PageClient />
      <PageOpener
        actions={
          <div className="basis-full max-w-[34rem]">
            <Search locale={locale} />
          </div>
        }
        title={uiCopy[locale].search}
      />

      <div className="mt-12 md:mt-16">
        {posts.totalDocs > 0 ? (
          <CollectionArchive locale={locale} posts={posts.docs as CardPostData[]} />
        ) : (
          <p className="text-body text-ink-2">{uiCopy[locale].searchNoResults}</p>
        )}
      </div>
    </PageFrame>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return {
    title: uiCopy[locale].search,
  }
}

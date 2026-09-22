import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
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

  const posts = await payload.find({
    collection: 'search',
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
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">{uiCopy[locale].search}</h1>

          <div className="max-w-[50rem] mx-auto">
            <Search locale={locale} />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive locale={locale} posts={posts.docs as CardPostData[]} />
      ) : (
        <div className="container">{uiCopy[locale].searchNoResults}</div>
      )}
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return {
    title: uiCopy[locale].search,
  }
}

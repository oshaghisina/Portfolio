import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { docPath } from '@/i18n/routes'
import { getLocale } from '@/utilities/getLocale'
import { uiCopy } from '@/utilities/uiCopy'

// No `revalidate` export: reading the locale requires `headers()`, a dynamic API, so this route
// is rendered per-request rather than time-based ISR'd — a fixed revalidate window would let one
// locale's fetch silently populate the shared cache for every other locale.
export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const locale = await getLocale()

  const posts = await payload.find({
    collection: 'posts',
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
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{uiCopy[locale].labArchiveTitle}</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange currentPage={posts.page} limit={12} locale={locale} totalDocs={posts.totalDocs} />
      </div>

      <CollectionArchive locale={locale} posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination basePath={docPath('posts', 'page')} locale={locale} page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return {
    title: uiCopy[locale].labArchiveTitle,
  }
}

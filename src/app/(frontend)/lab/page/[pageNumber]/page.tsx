import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { docPath } from '@/i18n/routes'
import { getLocale } from '@/utilities/getLocale'
import { uiCopy } from '@/utilities/uiCopy'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const locale = await getLocale()

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    fallbackLocale: false,
    limit: 12,
    locale,
    overrideAccess: false,
    page: sanitizedPageNumber,
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
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination basePath={docPath('posts', 'page')} locale={locale} page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  const locale = await getLocale()
  return {
    title: `${uiCopy[locale].labArchiveTitle} ${pageNumber || ''}`.trim(),
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}

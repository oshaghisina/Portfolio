import type { Metadata } from 'next/types'

import { PageFrame } from '@/components/PageFrame'
import { PageOpener } from '@/components/PageOpener'
import React from 'react'
import { Search } from '@/search/Component'
import { SearchResults } from '@/search/SearchResults'
import type { SearchResult } from '@/search/results'
import { searchSite } from '@/search/searchSite'
import { readSearchQuery } from '@/search/url'
import PageClient from './page.client'
import { getLocale } from '@/utilities/getLocale'
import { withSiteName } from '@/utilities/site'
import { uiCopy } from '@/utilities/uiCopy'

type Args = {
  searchParams: Promise<{
    q?: string | string[]
  }>
}

/**
 * `/search` — projects and Lab posts in the visitor's locale, read from their collections with
 * the public gates (see `searchSite`). The query lives in `?q=`, so a result list can be shared,
 * refreshed and returned to with Back.
 */
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const query = readSearchQuery((await searchParamsPromise).q)
  const locale = await getLocale()

  let results: SearchResult[] = []
  let failed = false
  if (query) {
    try {
      results = await searchSite({ locale, query })
    } catch (error) {
      console.error('Search failed', error)
      failed = true
    }
  }

  return (
    <PageFrame>
      <PageClient />
      <PageOpener
        actions={
          <div className="basis-full max-w-[34rem]">
            <Search locale={locale} query={query} />
          </div>
        }
        title={uiCopy[locale].search}
      />

      <SearchResults
        className="mt-12 md:mt-16"
        failed={failed}
        locale={locale}
        query={query}
        results={results}
      />
    </PageFrame>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return {
    robots: { index: false, follow: true },
    title: withSiteName(uiCopy[locale].search),
  }
}

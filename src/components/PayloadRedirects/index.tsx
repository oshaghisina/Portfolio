import type React from 'react'
import type { Page, Post, Project } from '@/payload-types'

import { docPath, isRoutedCollection } from '@/i18n/routes'
import { localePath, localizeInternalHref } from '@/i18n/navigation'
import { getCachedDocument } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import type { Locale } from '@/utilities/locale'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  locale: Locale
  url: string
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, locale, url }) => {
  const redirects = await getCachedRedirects()()

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(localizeInternalHref(locale, redirectItem.to.url))
    }

    const reference = redirectItem.to?.reference
    const collection = reference?.relationTo

    if (reference && isRoutedCollection(collection)) {
      let slug: string | undefined

      if (typeof reference.value === 'string') {
        const document = (await getCachedDocument(
          collection,
          reference.value,
          locale,
        )()) as Page | Post | Project | null
        slug = document?.slug
      } else if (typeof reference.value === 'object') {
        slug = reference.value?.slug
      }

      // Keep the visitor in their language: `docPath` returns the logical path, so a redirect
      // followed under `/fa/…` would otherwise land on the English URL.
      if (slug) redirect(localePath(locale, docPath(collection, slug)))
    }
  }

  if (disableNotFound) return null

  notFound()
}

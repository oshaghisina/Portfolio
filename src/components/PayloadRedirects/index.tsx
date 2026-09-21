import type React from 'react'
import type { Page, Post, Project } from '@/payload-types'

import { docPath, isRoutedCollection } from '@/i18n/routes'
import { getCachedDocument } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const redirects = await getCachedRedirects()()

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    const reference = redirectItem.to?.reference
    const collection = reference?.relationTo

    if (reference && isRoutedCollection(collection)) {
      let slug: string | undefined

      if (typeof reference.value === 'string') {
        const document = (await getCachedDocument(collection, reference.value)()) as Page | Post | Project | null
        slug = document?.slug
      } else if (typeof reference.value === 'object') {
        slug = reference.value?.slug
      }

      if (slug) redirect(docPath(collection, slug))
    }
  }

  if (disableNotFound) return null

  notFound()
}

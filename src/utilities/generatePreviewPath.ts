import { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { PayloadRequest } from 'payload'

import { localePath } from '@/i18n/navigation'
import { docPath, type RoutedCollection } from '@/i18n/routes'
import { DEFAULT_LOCALE, isLocale } from '@/utilities/locale'

type Props = {
  collection: RoutedCollection
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, req, slug }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  // Encode to support slugs with special characters
  const encodedSlug = encodeURIComponent(slug)
  const logicalPath = docPath(collection, encodedSlug)
  // A Persian admin preview resolves to `/fa/...`, Arabic to `/ar/...`, etc. (D-009) — never
  // shows a non-English locale's draft under the English/unprefixed URL.
  const locale = isLocale(req.locale) ? req.locale : DEFAULT_LOCALE

  const encodedParams = new URLSearchParams({
    path: localePath(locale, logicalPath),
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}

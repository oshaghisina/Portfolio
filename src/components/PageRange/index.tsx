import React from 'react'

import { pluralCopy, uiCopy } from '@/utilities/uiCopy'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'

export const PageRange: React.FC<{
  className?: string
  currentPage?: number
  limit?: number
  locale?: Locale
  totalDocs?: number
}> = (props) => {
  const { className, currentPage, limit, locale = DEFAULT_LOCALE, totalDocs } = props
  const copy = uiCopy[locale]

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const range = indexStart > 0 ? `${indexStart}–${indexEnd}` : String(indexEnd)

  return (
    <div className={[className, 'font-semibold'].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && copy.archiveNoResults}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        copy.archiveRange
          .replace('{range}', range)
          .replace('{total}', pluralCopy(locale, copy.docsLabel, totalDocs))}
    </div>
  )
}

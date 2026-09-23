import React from 'react'

import { PageFrame } from '@/components/PageFrame'
import { getLocale } from '@/utilities/getLocale'
import { uiCopy } from '@/utilities/uiCopy'

/**
 * Instant Suspense fallback for frontend navigations. Keeps the shared header/footer interactive
 * while the route segment streams — a single ruled pulse, not a full skeleton of every layout.
 */
export default async function Loading() {
  const locale = await getLocale()
  const label = uiCopy[locale].loadingLabel

  return (
    <PageFrame>
      <div
        aria-busy="true"
        aria-live="polite"
        className="flex min-h-[40vh] flex-col justify-center gap-4 py-16"
        role="status"
      >
        <span className="sr-only">{label}</span>
        <div className="h-px w-24 animate-pulse bg-line" />
        <div className="h-10 max-w-md animate-pulse bg-panel" />
        <div className="h-4 max-w-sm animate-pulse bg-panel" />
      </div>
    </PageFrame>
  )
}

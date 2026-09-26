import React from 'react'

import { PageFrame } from '@/components/PageFrame'
import { SignatureLoader } from '@/components/Signature/SignatureLoader'
import { getLocale } from '@/utilities/getLocale'
import { uiCopy } from '@/utilities/uiCopy'

/**
 * Instant Suspense fallback for frontend navigations: Sina's signature being written, centred on an
 * empty sheet one viewport tall, so the header stays interactive and the footer stays below the
 * fold while the route segment streams. Once it is up it stays until the name is written, even if
 * the page is ready sooner (`Signature/loader.ts`).
 *
 * Next puts this boundary around the segment directly below this folder, so it only fires when
 * that first segment changes (`/about` → `/work/x`). `work/`, `lab/` and `lab/page/` re-export
 * this file to cover `/work/a` → `/work/b` and the Lab's post and pagination hops.
 */
export default async function Loading() {
  const locale = await getLocale()

  return (
    <PageFrame fillViewport>
      <div
        aria-busy="true"
        aria-live="polite"
        className="grid flex-1 place-items-center"
        data-reveal-skip=""
        role="status"
      >
        <span className="sr-only">{uiCopy[locale].loadingLabel}</span>
        <SignatureLoader className="text-ink" />
      </div>
    </PageFrame>
  )
}

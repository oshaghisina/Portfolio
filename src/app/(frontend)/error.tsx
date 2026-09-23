'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import { PageFrame } from '@/components/PageFrame'
import { PageOpener } from '@/components/PageOpener'
import { Button } from '@/components/ui/button'
import { localePath, parseLocalePath } from '@/i18n/navigation'
import { uiCopy } from '@/utilities/uiCopy'

/**
 * Route-segment error boundary. Locale comes from the URL so a failure under `/fa/…` still
 * recovers in Persian (same idea as `not-found.tsx`).
 */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  const pathname = usePathname()
  const { locale } = parseLocalePath(pathname ?? '/')
  const copy = uiCopy[locale]

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <PageFrame>
      <PageOpener
        actions={
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => retry()} type="button" variant="default">
              {copy.tryAgain}
            </Button>
            <Button asChild variant="outline">
              <Link href={localePath(locale, '/')}>{copy.goHome}</Link>
            </Button>
          </div>
        }
        lede={copy.errorLede}
        title={copy.errorTitle}
      />
    </PageFrame>
  )
}

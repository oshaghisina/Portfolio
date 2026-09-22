import Link from 'next/link'
import React from 'react'

import { PageFrame } from '@/components/PageFrame'
import { PageOpener } from '@/components/PageOpener'
import { Button } from '@/components/ui/button'
import { localePath } from '@/i18n/navigation'
import { getLocale } from '@/utilities/getLocale'
import { uiCopy } from '@/utilities/uiCopy'

/**
 * Async so it can read the visitor's locale: a 404 under `/fa/…` is still a Persian page, and
 * its way out has to be `/fa`, not `/`. Sending someone who took a wrong turn in Japanese to the
 * English homepage is the kind of small thing that makes a site feel monolingual.
 *
 * "404" is a numeral, not copy — it stays Latin in every locale (DS-10).
 */
export default async function NotFound() {
  const locale = await getLocale()
  const copy = uiCopy[locale]

  return (
    <PageFrame>
      <PageOpener
        actions={
          <Button asChild variant="default">
            <Link href={localePath(locale, '/')}>{copy.goHome}</Link>
          </Button>
        }
        lede={copy.notFoundLede}
        title="404"
      />
    </PageFrame>
  )
}

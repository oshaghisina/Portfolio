'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'
import { Signature } from '@/components/Signature'
import { localePath } from '@/i18n/navigation'
import type { Locale } from '@/utilities/locale'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  locale: Locale
  logicalPath: string
  readiness: Partial<Record<Locale, boolean>>
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale, logicalPath, readiness }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    // Mirror `headerTheme` exactly, including back to `null` — a stale-truthy guard here would
    // leave the header pinned to a hero's forced theme after navigating to a page with no hero.
    setTheme(headerTheme ?? null)
  }, [headerTheme])

  return (
    <header
      // `.canvas` on every route: the header is the top of the same sheet the page sits in, so
      // its rails and bottom border line up with the frame below it.
      className={cn('canvas', 'sticky top-0 z-20 bg-background border-b border-line')}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="flex min-h-12 items-center justify-between gap-6 py-1 md:min-h-14 md:py-3">
        {/* Signature wordmark: `currentColor`, so `text-foreground` carries it through light, dark
            and a hero-forced `data-theme`. Negative margin lets the flourish overhang the bar
            without growing the header. The name stays as text for screen readers. */}
        <Link
          className="-my-1.5 shrink-0 text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          href={localePath(locale, '/')}
        >
          <Signature className="h-10 md:h-11" />
          <span className="sr-only">Sina Oshaghi</span>
        </Link>
        <HeaderNav data={data} locale={locale} logicalPath={logicalPath} readiness={readiness} />
      </div>
    </header>
  )
}

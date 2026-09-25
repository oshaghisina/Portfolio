'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'
import { Signature } from '@/components/Signature'
import { localePath, parseLocalePath } from '@/i18n/navigation'
import type { Locale } from '@/utilities/locale'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  locale: Locale
  logicalPath: string
  readiness: Partial<Record<Locale, boolean>>
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale, readiness }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  // Live path so desktop active state (and locale destinations) update on client navigations.
  // Server `logicalPath` would stay frozen after the first paint.
  const logicalPath = parseLocalePath(pathname).logicalPath

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
      <div className="flex h-14 items-center justify-between gap-4 xl:h-16 xl:gap-6">
        {/* The cropped SVG is sized by its ink, so it sits optically with the technical controls. */}
        <Link
          className="shrink-0 text-foreground transition-opacity duration-(--duration-fast) ease-standard hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          href={localePath(locale, '/')}
        >
          <Signature className="h-9 xl:h-10" />
          <span className="sr-only">Sina Oshaghi</span>
        </Link>
        <HeaderNav data={data} locale={locale} logicalPath={logicalPath} readiness={readiness} />
      </div>
    </header>
  )
}

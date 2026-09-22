'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'
import { localePath, parseLocalePath } from '@/i18n/navigation'
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

  const isHome = parseLocalePath(pathname).logicalPath === '/'

  return (
    <header
      className={cn(isHome ? 'canvas' : 'container', 'sticky top-0 z-20 bg-background border-b border-line')}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="flex min-h-12 items-center justify-between gap-6 py-1 md:min-h-14 md:py-3">
        {/* Wordmark until a real mark exists — text keeps it bilingual for free. */}
        <Link
          className="text-small font-medium text-foreground"
          href={localePath(locale, '/')}
        >
          Sina Oshaghi
        </Link>
        <HeaderNav data={data} locale={locale} logicalPath={logicalPath} readiness={readiness} />
      </div>
    </header>
  )
}

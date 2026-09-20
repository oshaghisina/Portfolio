'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  locale: Locale
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const isHome = pathname === '/'

  return (
    <header className={cn(isHome ? 'canvas' : 'container', 'relative z-20')} {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-6 flex items-center justify-between gap-6">
        {/* Wordmark until a real mark exists — text keeps it bilingual for free. */}
        <Link className="text-h3 font-medium tracking-h3 text-foreground" href="/">
          Sina Oshaghi
        </Link>
        <HeaderNav data={data} locale={locale} />
      </div>
    </header>
  )
}

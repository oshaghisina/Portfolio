'use client'

import React from 'react'

import { cn } from '@/utilities/ui'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink, hrefFromLink } from '@/components/Link'
import { InlineLocaleList } from '@/components/LocaleSwitcher'
import { ThemeToggle } from '@/providers/Theme/ThemeToggle'
import { isActivePath, localePath } from '@/i18n/navigation'
import type { Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

import { MobileNav } from './MobileNav'
import { HeaderLocaleMenu } from './HeaderLocaleMenu'

interface HeaderNavProps {
  data: HeaderType
  locale: Locale
  logicalPath: string
  readiness: Partial<Record<Locale, boolean>>
}

/** Identity is owned by HeaderClient; this is one end-aligned navigation and utility cluster. */
export const HeaderNav: React.FC<HeaderNavProps> = ({ data, locale, logicalPath, readiness }) => {
  const navItems = data?.navItems || []

  return (
    <div className="flex min-w-0 items-center gap-6">
      <nav className="hidden items-center gap-4 xl:flex">
        {navItems.map(({ link }, i) => {
          const active = isActivePath(logicalPath, hrefFromLink(link))
          return (
            <CMSLink
              appearance="inline"
              aria-current={active ? 'page' : undefined}
              className={cn(
                'eyebrow whitespace-nowrap border-b pb-1 transition-[color,border-color] duration-(--duration-fast) ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                active ? 'border-brand text-foreground' : 'border-transparent text-ink-2 hover:border-line hover:text-foreground',
              )}
              key={i}
              locale={locale}
              {...link}
            />
          )
        })}
      </nav>
      <div className="flex shrink-0 items-center gap-1 xl:gap-2">
        <ThemeToggle className="hover:translate-y-0" locale={locale} />
        <HeaderLocaleMenu className="hidden md:block" locale={locale} logicalPath={logicalPath} readiness={readiness} />
        <Link
          className="inline-flex size-(--size-control-height-sm) items-center justify-center rounded-control text-foreground transition-colors duration-(--duration-fast) ease-standard hover:bg-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          href={localePath(locale, '/search')}
          title={uiCopy[locale].search}
        >
          <span className="sr-only">{uiCopy[locale].search}</span>
          <SearchIcon aria-hidden className="size-[1.0625rem]" />
        </Link>
        <MobileNav
          data={data}
          foot={
            <InlineLocaleList locale={locale} logicalPath={logicalPath} readiness={readiness} />
          }
          locale={locale}
        />
      </div>
    </div>
  )
}

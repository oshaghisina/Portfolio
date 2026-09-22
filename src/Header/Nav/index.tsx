'use client'

import React from 'react'

import { cn } from '@/utilities/ui'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink, hrefFromLink } from '@/components/Link'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { ThemeToggle } from '@/providers/Theme/ThemeToggle'
import { isActivePath, localePath, parseLocalePath } from '@/i18n/navigation'
import type { Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

import { MobileNav } from './MobileNav'

interface HeaderNavProps {
  data: HeaderType
  locale: Locale
  logicalPath: string
  readiness: Partial<Record<Locale, boolean>>
}

/**
 * Restrained but complete nav/theme/locale/contact row: mono links, theme + language toggles
 * (in an always-visible controls cluster, not nested inside the desktop-only nav — so they
 * still work below `md`), the last CMS item as a contact affordance. Search only earns its
 * presence off the homepage, so it's hidden on `/`. On phones the language switch moves out of
 * the bar into the drawer's foot so the top bar is just theme + menu. The current destination
 * (and anything beneath it, e.g. `/work/<slug>` under Work) is marked with `aria-current` and a
 * hairline — ink, not a tab.
 */
export const HeaderNav: React.FC<HeaderNavProps> = ({ data, locale, logicalPath, readiness }) => {
  const navItems = data?.navItems || []
  const isHome = parseLocalePath(usePathname()).logicalPath === '/'

  return (
    <div className="flex items-center gap-6">
      <nav className="hidden items-center gap-4 md:flex">
        {navItems.map(({ link }, i) => {
          const active = isActivePath(logicalPath, hrefFromLink(link))
          return (
            <CMSLink
              appearance="link"
              aria-current={active ? 'page' : undefined}
              className={cn(
                'eyebrow border-b pb-0.5 transition-colors duration-(--duration-fast) hover:text-foreground',
                active ? 'border-brand text-foreground' : 'border-transparent text-ink-2',
              )}
              key={i}
              locale={locale}
              {...link}
            />
          )
        })}
      </nav>
      <div className="flex items-center gap-2">
        <ThemeToggle locale={locale} />
        <LocaleSwitcher className="hidden md:block" locale={locale} logicalPath={logicalPath} readiness={readiness} />
        {!isHome ? (
          <Link
            className="text-foreground hover:text-brand transition-colors duration-(--duration-fast)"
            href={localePath(locale, '/search')}
          >
            <span className="sr-only">{uiCopy[locale].search}</span>
            <SearchIcon className="size-5" />
          </Link>
        ) : null}
        {/* Below md the top bar is theme + menu only; the language switch lives in the drawer foot. */}
        <MobileNav
          data={data}
          foot={
            <>
              <span className="text-ink-3">{uiCopy[locale].language}</span>
              <LocaleSwitcher locale={locale} logicalPath={logicalPath} placement="above" readiness={readiness} />
            </>
          }
          locale={locale}
        />
      </div>
    </div>
  )
}

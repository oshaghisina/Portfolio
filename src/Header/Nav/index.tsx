'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { LocaleToggle } from '@/components/LocaleToggle'
import { ThemeToggle } from '@/providers/Theme/ThemeToggle'
import type { Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

import { MobileNav } from './MobileNav'

/**
 * Restrained but complete nav/theme/locale/contact row: mono links, theme + language toggles
 * (in an always-visible controls cluster, not nested inside the desktop-only nav — so they
 * still work below `md`), the last CMS item as a contact affordance. Search only earns its
 * presence off the homepage, so it's hidden on `/`.
 */
export const HeaderNav: React.FC<{ data: HeaderType; locale: Locale }> = ({ data, locale }) => {
  const navItems = data?.navItems || []
  const lastIndex = navItems.length - 1
  const isHome = usePathname() === '/'

  const pickLabel = (link: { label?: string | null } | null | undefined, labelFa?: string | null) =>
    locale === 'fa' && labelFa ? labelFa : link?.label

  return (
    <>
      <nav className="hidden items-center gap-6 md:flex">
        {navItems.map(({ link, labelFa }, i) =>
          i === lastIndex ? (
            <CMSLink appearance="outline" key={i} {...link} label={pickLabel(link, labelFa)} />
          ) : (
            <CMSLink
              className="eyebrow text-ink-2 transition-colors duration-(--duration-fast) hover:text-foreground"
              key={i}
              {...link}
              appearance="link"
              label={pickLabel(link, labelFa)}
            />
          ),
        )}
      </nav>
      <div className="flex items-center gap-2">
        <ThemeToggle locale={locale} />
        <LocaleToggle locale={locale} />
        {!isHome ? (
          <Link className="text-foreground hover:text-brand transition-colors duration-(--duration-fast)" href="/search">
            <span className="sr-only">{uiCopy[locale].search}</span>
            <SearchIcon className="size-5" />
          </Link>
        ) : null}
      </div>
      <MobileNav data={data} locale={locale} />
    </>
  )
}

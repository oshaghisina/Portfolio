'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

import { MobileNav } from './MobileNav'

/**
 * Restrained but complete nav/theme/contact row: mono links, one theme toggle, the last item as
 * a contact affordance. Search only earns its presence off the homepage, so it's hidden on `/`.
 */
export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const lastIndex = navItems.length - 1
  const isHome = usePathname() === '/'

  return (
    <>
      <nav className="hidden items-center gap-6 md:flex">
        {navItems.map(({ link }, i) =>
          i === lastIndex ? (
            <CMSLink appearance="outline" key={i} {...link} />
          ) : (
            <CMSLink
              className="eyebrow text-ink-2 transition-colors duration-(--duration-fast) hover:text-foreground"
              key={i}
              {...link}
              appearance="link"
            />
          ),
        )}
        <ThemeSelector />
        {!isHome ? (
          <Link className="text-foreground hover:text-brand transition-colors duration-(--duration-fast)" href="/search">
            <span className="sr-only">Search</span>
            <SearchIcon className="size-5" />
          </Link>
        ) : null}
      </nav>
      <MobileNav data={data} />
    </>
  )
}

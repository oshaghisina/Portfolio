import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post, Project } from '@/payload-types'

import { localizeInternalHref } from '@/i18n/navigation'
import { docPath, type RoutedCollection } from '@/i18n/routes'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  /** Marks the current page in navigation (the nav decides, via `isActivePath`). */
  'aria-current'?: 'page'
  /** Trailing ↗ on button appearances (DS-16). */
  arrow?: boolean
  children?: React.ReactNode
  className?: string
  label?: string | null
  /** Current locale — internal hrefs get this locale's prefix (D-009). Defaults to English/unprefixed. */
  locale?: Locale
  newTab?: boolean | null
  reference?: {
    relationTo: RoutedCollection
    value: Page | Post | Project | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

/** Resolve a Payload `link` group to an href — shared with the header nav for active-state matching. */
export function hrefFromLink(
  link: Pick<CMSLinkType, 'type' | 'reference' | 'url'> | null | undefined,
): string | null | undefined {
  if (!link) return null
  const { type, reference, url } = link
  return type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
    ? docPath(reference.relationTo, reference.value.slug)
    : url
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    'aria-current': ariaCurrent,
    arrow = false,
    children,
    className,
    label,
    locale = DEFAULT_LOCALE,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const resolvedHref = hrefFromLink({ type, reference, url })
  const href = resolvedHref ? localizeInternalHref(locale, resolvedHref) : resolvedHref

  // No destination, or nothing to show (an untranslated locale leaves `label` empty and there's
  // no `children` fallback) — render nothing rather than a visible, empty, clickable anchor.
  if (!href || (!label && !children)) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link aria-current={ariaCurrent} className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button arrow={arrow} asChild className={className} size={size} variant={appearance}>
      <Link aria-current={ariaCurrent} className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}

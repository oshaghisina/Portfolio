'use client'

import Link from 'next/link'
import React, { useSyncExternalStore } from 'react'

import { localePath } from '@/i18n/navigation'
import { WORK_PATH } from '@/i18n/routes'
import type { Locale } from '@/utilities/locale'

import { readWorkReturn, workReturnHref } from './workView'

const subscribe = () => () => {}

/**
 * A study's "All work": plain `/work` on the server, then — when the visitor opened this study
 * from the archive in this tab — the same filtered view, landing on the row they left from.
 */
export function WorkReturnLink({
  children,
  className,
  locale,
  slug,
}: {
  children: React.ReactNode
  className?: string
  locale: Locale
  slug: string
}) {
  const archive = localePath(locale, WORK_PATH)
  const href = useSyncExternalStore(
    subscribe,
    () => workReturnHref(readWorkReturn(), slug, locale) ?? archive,
    () => archive,
  )
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  )
}

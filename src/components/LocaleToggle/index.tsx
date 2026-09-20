'use client'

import { Globe } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/button'
import type { Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'

import { setLocaleAction } from './actions'

const oppositeLocale: Record<Locale, Locale> = { en: 'fa', fa: 'en' }

export const LocaleToggle: React.FC<{ locale: Locale }> = ({ locale }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const next = oppositeLocale[locale]
  const query = searchParams.toString()
  const path = query ? `${pathname}?${query}` : pathname

  const label = locale === 'fa' ? uiCopy[locale].switchToEnglish : uiCopy[locale].switchToPersian

  return (
    <Button
      aria-label={label}
      onClick={() => setLocaleAction(next, path)}
      size="icon-sm"
      title={label}
      type="button"
      variant="ghost"
    >
      <Globe className="size-4" />
    </Button>
  )
}

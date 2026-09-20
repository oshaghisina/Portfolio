'use client'

import { Moon, Sun } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import type { Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'

import { useTheme } from '..'

export const ThemeToggle: React.FC<{ locale?: Locale }> = ({ locale = 'en' }) => {
  const { setTheme, theme } = useTheme()

  const toggle = () => {
    const current = theme ?? document.documentElement.getAttribute('data-theme')
    setTheme(current === 'dark' ? 'light' : 'dark')
  }

  const label = uiCopy[locale].theme

  return (
    <Button aria-label={label} onClick={toggle} size="icon-sm" title={label} type="button" variant="ghost">
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </Button>
  )
}

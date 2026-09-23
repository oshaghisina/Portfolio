'use client'

import { Moon, Sun } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import type { Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'
import { uiCopy } from '@/utilities/uiCopy'

import { useTheme } from '..'

export const ThemeToggle: React.FC<{ className?: string; locale?: Locale }> = ({ className, locale = 'en' }) => {
  const { setTheme, theme } = useTheme()

  const toggle = () => {
    const current = theme ?? document.documentElement.getAttribute('data-theme')
    setTheme(current === 'dark' ? 'light' : 'dark')
  }

  const label = theme === 'dark'
    ? uiCopy[locale].switchToLightMode
    : theme === 'light'
      ? uiCopy[locale].switchToDarkMode
      : uiCopy[locale].theme

  return (
    <Button aria-label={label} className={cn(className)} onClick={toggle} size="icon-sm" title={label} type="button" variant="ghost">
      <Moon className="size-[1.0625rem] dark:hidden" />
      <Sun className="hidden size-[1.0625rem] dark:block" />
    </Button>
  )
}

'use client'

import type { Theme } from '@/providers/Theme/types'

import React, { createContext, useCallback, use, useState } from 'react'

export interface ContextType {
  headerTheme?: Theme | null
  setHeaderTheme: (theme: Theme | null) => void
}

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // `headerTheme` is only a hero-requested *contrast override* (e.g. light text over a dark
  // hero image) — it must never default to the ambient site theme. Seeding it from
  // `document.documentElement`'s `data-theme` at mount (the old behaviour) captured whatever
  // theme happened to be active at page load and pinned the header to it forever, since nothing
  // re-reads the ambient theme afterwards — so toggling light/dark later left the header stuck
  // showing the stale theme while the rest of the page updated correctly.
  const [headerTheme, setThemeState] = useState<Theme | undefined | null>(undefined)

  const setHeaderTheme = useCallback((themeToSet: Theme | null) => {
    setThemeState(themeToSet)
  }, [])

  return <HeaderThemeContext value={{ headerTheme, setHeaderTheme }}>{children}</HeaderThemeContext>
}

export const useHeaderTheme = (): ContextType => use(HeaderThemeContext)

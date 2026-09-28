import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '../ThemeToggle/types'

/**
 * Sets `data-theme` on <html> before the first paint; globals.css keeps the page transparent until
 * it has (anti-flash). A plain inline script, like `SignatureIntroScript`: `next/script`'s
 * `beforeInteractive` is queued in the App Router and runs only once Next's client runtime has
 * loaded, which left every page white until the bundle ran.
 */
export const InitTheme: React.FC = () => {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
  (function () {
    function getImplicitPreference() {
      var mediaQuery = '(prefers-color-scheme: dark)'
      var mql = window.matchMedia(mediaQuery)
      var hasImplicitPreference = typeof mql.matches === 'boolean'

      if (hasImplicitPreference) {
        return mql.matches ? 'dark' : 'light'
      }

      return null
    }

    function themeIsValid(theme) {
      return theme === 'light' || theme === 'dark'
    }

    var themeToSet = '${defaultTheme}'
    var preference = null
    try {
      preference = window.localStorage.getItem('${themeLocalStorageKey}')
    } catch (error) {
      // Blocked storage must not leave the page transparent.
    }

    if (themeIsValid(preference)) {
      themeToSet = preference
    } else {
      var implicitPreference = getImplicitPreference()

      if (implicitPreference) {
        themeToSet = implicitPreference
      }
    }

    document.documentElement.setAttribute('data-theme', themeToSet)
  })();
  `,
        }}
        id="theme-script"
      />
      {/* Without JavaScript nothing sets data-theme, and the anti-flash rule in globals.css would
          keep the whole page transparent. The page shows in the default (light) theme instead. */}
      <noscript>
        <style>{'html{opacity:1!important}'}</style>
      </noscript>
    </>
  )
}

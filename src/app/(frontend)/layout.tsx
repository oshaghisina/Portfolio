import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Noto_Sans_JP } from 'next/font/google'
import localFont from 'next/font/local'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { getLocale } from '@/utilities/getLocale'
import { getPathname } from '@/utilities/getPathname'
import { getLocaleReadinessMap } from '@/i18n/contentReady'
import { parseLocalePath } from '@/i18n/navigation'
import { langAttrs } from '@/utilities/locale'

// Persian/Arabic partner face (DS-04, D-025): Peyda 4 Pro, self-hosted and licensed — see
// src/fonts/peyda/README.md. One variable file covers the 400/500/600 the site renders.
//
// `unicode-range` pins it to the Arabic script, so Latin words and Western digits inside a Persian
// page keep rendering in Geist Sans rather than in Peyda's Latin. The four blocks are the ones
// Peyda actually covers (Arabic Supplement and Ext-A hold one codepoint each); ZWNJ/ZWJ is in the
// range because Persian is written with نیم‌فاصله, and the guillemets because Persian sets
// quotations in «…» and Peyda draws its own.
//
// `adjustFontFallback: false` is load-bearing, not tidying: next/font would otherwise emit a second,
// metric-adjusted Arial face and append it to --font-peyda. `declarations` only reaches the real
// @font-face, so that fallback would carry no unicode-range and would swallow the Latin before
// Geist Sans ever saw it.
//
// Not preloaded: English pages never use it; a lang="fa" or lang="ar" subtree pulls it in through
// --font-sans-fa.
const peyda = localFont({
  src: '../../fonts/peyda/PeydaWebVF.woff2',
  variable: '--font-peyda',
  weight: '100 1000',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  declarations: [
    {
      prop: 'unicode-range',
      value: 'U+0600-06FF, U+200C-200D, U+FB50-FDFF, U+FE70-FEFF, U+00AB, U+00BB',
    },
  ],
})

// Japanese partner face. Also not preloaded; a lang="ja" subtree pulls it in through
// --font-sans-ja (CJK glyphs arrive as unicode-range slices, so no subset is declared).
const notoSansJp = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  display: 'swap',
  preload: false,
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const locale = await getLocale()
  const pathname = await getPathname()
  const { logicalPath } = parseLocalePath(pathname)
  const readiness = await getLocaleReadinessMap(logicalPath)

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, peyda.variable, notoSansJp.variable)}
      {...langAttrs(locale)}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header locale={locale} logicalPath={logicalPath} readiness={readiness} />
          {children}
          <Footer locale={locale} logicalPath={logicalPath} readiness={readiness} />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}

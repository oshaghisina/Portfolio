import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Noto_Sans_JP, Vazirmatn } from 'next/font/google'
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

// Persian partner face (DS-04, D-016). Not preloaded: English pages never use it; a
// lang="fa" subtree pulls it in through --font-sans-fa.
const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
  display: 'swap',
  preload: false,
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
      className={cn(GeistSans.variable, GeistMono.variable, vazirmatn.variable, notoSansJp.variable)}
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
    creator: '@payloadcms',
  },
}

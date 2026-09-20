import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { DEFAULT_LOCALE, LOCALES, isLocale, langAttrs } from '@/utilities/locale'

import { Colour } from './sections/Colour'
import { Controls } from './sections/Controls'
import { Foundations } from './sections/Foundations'
import { Patterns } from './sections/Patterns'
import { Type } from './sections/Type'
import { loadTokens } from './tokens'

export const metadata: Metadata = {
  title: 'Design system',
  robots: { index: false, follow: false },
}

type Args = { searchParams: Promise<{ lang?: string }> }

/**
 * Living style guide: tokens read from Docs/Design-System/tokens/sina.tokens.json,
 * components rendered live. `?lang=fa` roots a Persian subtree to check the RTL mirror
 * and the :lang(fa) type overrides; the theme toggle sits in the footer.
 */
export default async function DesignPage({ searchParams }: Args) {
  const { lang } = await searchParams
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE
  const json = loadTokens()

  return (
    <main className="container flex flex-col gap-section py-section-sm" {...langAttrs(locale)}>
      <header className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="eyebrow">Design system · pleurat.com-derived · v0</p>
          <div className="flex items-center gap-4">
            <nav aria-label="Preview language" className="flex items-center gap-1 index-code">
              {LOCALES.map((l, i) => (
                <React.Fragment key={l}>
                  {i ? <span aria-hidden>·</span> : null}
                  <Link
                    aria-current={l === locale ? 'page' : undefined}
                    className={cn('px-1 hover:text-foreground', l === locale && 'text-brand')}
                    href={l === DEFAULT_LOCALE ? '/design' : `/design?lang=${l}`}
                  >
                    {l.toUpperCase()}
                  </Link>
                </React.Fragment>
              ))}
            </nav>
            <ThemeSelector />
          </div>
        </div>
        <h1 className="text-display font-medium text-balance">
          {locale === 'fa' ? 'یک سیستم طراحی،' : 'One design system,'}{' '}
          <span className="text-ink-3">{locale === 'fa' ? 'دو زبان، دو تم.' : 'two scripts, two themes.'}</span>
        </h1>
        <p className="text-lede text-ink-2 max-w-measure">
          {locale === 'fa'
            ? 'همهٴ مقادیر از یک فایل توکن می‌آیند؛ این صفحه همان چیزی را نشان می‌دهد که theme.css از آن ساخته شده است.'
            : 'Every value here comes from one tokens file; this page renders exactly what theme.css was built from.'}
        </p>
        <nav aria-label="Sections" className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            ['#colour', '01 Colour'],
            ['#type', '02 Type'],
            ['#foundations', '03 Foundations'],
            ['#controls', '04 Controls'],
            ['#patterns', '05 Patterns'],
          ].map(([href, label]) => (
            <Link className="eyebrow hover:text-foreground" href={href!} key={href}>
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <Colour json={json} />
      <Type json={json} />
      <Foundations json={json} />
      <Controls locale={locale} />
      <Patterns locale={locale} />
    </main>
  )
}

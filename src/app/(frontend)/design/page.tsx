import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import { PageFrame } from '@/components/PageFrame'
import { PageOpener } from '@/components/PageOpener'
import { ThemeToggle } from '@/providers/Theme/ThemeToggle'
import { langAttrs } from '@/utilities/locale'

import { isPreviewLocale, PREVIEW_LOCALES } from './samples'
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
  const locale = isPreviewLocale(lang) ? lang : 'en'
  const json = loadTokens()

  return (
    <PageFrame>
      <div className="flex flex-col gap-section" {...langAttrs(locale)}>
        <PageOpener
          actions={
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
          }
          aside={
            <div className="flex items-center gap-4 lg:shrink-0">
              <nav aria-label="Preview language" className="flex items-center gap-1 index-code">
                {PREVIEW_LOCALES.map((l, i) => (
                  <React.Fragment key={l}>
                    {i ? <span aria-hidden>·</span> : null}
                    <Link
                      aria-current={l === locale ? 'page' : undefined}
                      className={cn('px-1 hover:text-foreground', l === locale && 'text-brand')}
                      href={l === 'en' ? '/design' : `/design?lang=${l}`}
                    >
                      {l.toUpperCase()}
                    </Link>
                  </React.Fragment>
                ))}
              </nav>
              <ThemeToggle locale={locale} />
            </div>
          }
          eyebrow="Design system · pleurat.com-derived · v0"
          lede={
            locale === 'fa'
              ? 'همهٴ مقادیر از یک فایل توکن می‌آیند؛ این صفحه همان چیزی را نشان می‌دهد که theme.css از آن ساخته شده است.'
              : 'Every value here comes from one tokens file; this page renders exactly what theme.css was built from.'
          }
          titleSlot={
            <h1 className="mt-4 text-display font-medium text-balance">
              {locale === 'fa' ? 'یک سیستم طراحی،' : 'One design system,'}{' '}
              <span className="text-ink-3">{locale === 'fa' ? 'دو زبان، دو تم.' : 'two scripts, two themes.'}</span>
            </h1>
          }
        />

        <Colour json={json} />
        <Type json={json} />
        <Foundations json={json} />
        <Controls locale={locale} />
        <Patterns locale={locale} />
      </div>
    </PageFrame>
  )
}

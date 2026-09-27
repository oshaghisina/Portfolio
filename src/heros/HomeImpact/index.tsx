import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { PageOpener } from '@/components/PageOpener'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'

import { HeroWrittenRichText } from '../HeroWrittenRichText'
import { ThoughtFigure } from './ThoughtFigure'

/**
 * The homepage's opener pairs the introduction with one continuous visual thought:
 * evidence → a working product → learning. The CMS still owns the heading and actions.
 */
/**
 * The two-digit codes are ornament and stay Latin in every locale (DS-10); the labels beside
 * them are chrome, so they come from `uiCopy` rather than the CMS.
 */
const WORKSPACE_CODES = ['01', '02', '03', '04'] as const

export const HomeImpactHero: React.FC<Page['hero'] & { locale?: Locale }> = ({
  links,
  locale,
  richText,
}) => {
  const resolvedLocale = locale ?? DEFAULT_LOCALE
  const copy = uiCopy[resolvedLocale]
  const workspaceIndex = WORKSPACE_CODES.map((code, i) => ({
    code,
    label: copy.heroDisciplines[i]!,
  }))

  return (
    <PageOpener
      className="home-opener"
      actions={
        links?.length
          ? // Phones: one dominant full-width primary, the secondary reduced to a quiet text line
            // on the same node (no duplicate DOM); from `sm` the CMS appearances return.
            links.map(({ link }, i) => (
              <CMSLink
                arrow={i === 0}
                className={
                  i === 0
                    ? 'w-full sm:w-auto'
                    : 'max-sm:h-auto max-sm:justify-start max-sm:border-0 max-sm:bg-transparent max-sm:px-0 max-sm:text-small max-sm:text-ink-2 max-sm:hover:translate-y-0 max-sm:hover:bg-transparent max-sm:hover:text-foreground'
                }
                key={i}
                locale={locale}
                {...link}
              />
            ))
          : null
      }
      aside={<ThoughtFigure locale={resolvedLocale} />}
      eyebrow="Sina Oshaghi"
      locale={resolvedLocale}
      railLabels={workspaceIndex.map((row) => `${row.code} · ${row.label}`)}
      titleSlot={
        richText ? (
          <HeroWrittenRichText data={richText} headingClassName="mt-4" locale={resolvedLocale} />
        ) : null
      }
      written
    />
  )
}

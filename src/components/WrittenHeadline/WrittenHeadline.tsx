'use client'

import React, { useEffect, useMemo } from 'react'

import type { Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

import { fullTextFromTones, unitsFromTones, type WrittenTone } from './segment'
import { WRITE_START_DELAY_MS, writeDurationMs } from './timing'

export type WrittenHeadlineProps = {
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  id?: string
  locale: Locale
  /** Plain headline. Ignored when `tones` is provided. */
  text?: string
  /** Multi-tone headline (e.g. Work lead + muted tail). Reveal runs across tones as one thought. */
  tones?: WrittenTone[]
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Page-opener title write: accessible full H1 immediately; visual units reveal by opacity with
 * geometry reserved. Progressive enhancement only — reduced motion / no-JS keep the final title.
 *
 * SSR renders the final title. After mount, an effect arms `[data-hero-writing]` when motion is
 * allowed; CSS owns the per-unit reveal. Supporting copy / CTAs / About diagram sequence off the
 * same entrance attributes.
 */
export const WrittenHeadline: React.FC<WrittenHeadlineProps> = ({
  as = 'h1',
  className,
  id,
  locale,
  text = '',
  tones,
}) => {
  const resolvedTones = useMemo<WrittenTone[]>(
    () => tones ?? [{ text }],
    [text, tones],
  )
  const units = useMemo(() => unitsFromTones(resolvedTones, locale), [locale, resolvedTones])
  const fullText = useMemo(() => fullTextFromTones(resolvedTones), [resolvedTones])
  const durationMs = writeDurationMs(units.length)

  useEffect(() => {
    // Query the live DOM rather than a ref — more reliable across RSC boundaries / tooling wrappers.
    const node = document.querySelector(
      '[data-hero-entrance] .hero-written-title',
    ) as HTMLElement | null
    if (!node) return

    const entrance = node.closest('[data-hero-entrance]') as HTMLElement | null
    if (!entrance) return

    const reduce = window.matchMedia(REDUCED_MOTION_QUERY).matches

    if (reduce || units.length === 0) {
      entrance.removeAttribute('data-hero-writing')
      entrance.setAttribute('data-hero-write-complete', '')
      return
    }

    entrance.style.setProperty('--hero-write-duration', `${durationMs}ms`)
    entrance.style.setProperty('--hero-write-units', String(Math.max(units.length, 1)))
    entrance.removeAttribute('data-hero-write-complete')
    entrance.setAttribute('data-hero-writing', '')

    const timer = window.setTimeout(() => {
      entrance.removeAttribute('data-hero-writing')
      entrance.setAttribute('data-hero-write-complete', '')
    }, WRITE_START_DELAY_MS + durationMs + 40)

    return () => {
      window.clearTimeout(timer)
    }
  }, [durationMs, units.length])

  const headingClassName = cn('hero-written-title', className)
  const headingStyle = {
    '--hero-write-duration': `${durationMs}ms`,
    '--hero-write-units': String(Math.max(units.length, 1)),
  } as React.CSSProperties

  const body = (
    <span aria-hidden="true" className="relative">
      {units.map((unit, i) => (
        <span
          className={cn('hero-write-unit', unit.className)}
          key={`${i}-${unit.text}`}
          style={{ '--hero-write-i': i } as React.CSSProperties}
        >
          {unit.text}
        </span>
      ))}
      <span className="hero-write-caret" />
    </span>
  )

  if (as === 'h2') {
    return (
      <h2 aria-label={fullText} className={headingClassName} id={id} style={headingStyle}>
        {body}
      </h2>
    )
  }
  if (as === 'h3') {
    return (
      <h3 aria-label={fullText} className={headingClassName} id={id} style={headingStyle}>
        {body}
      </h3>
    )
  }
  return (
    <h1 aria-label={fullText} className={headingClassName} id={id} style={headingStyle}>
      {body}
    </h1>
  )
}

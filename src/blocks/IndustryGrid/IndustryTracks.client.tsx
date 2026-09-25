'use client'

import React, { useEffect, useRef, useState } from 'react'
import { dirFor, type Locale } from '@/utilities/locale'
import type { IndustryKey } from './catalogue'
import { industryLabels } from './catalogue'
import { IndustryIllustration } from './Illustrations'

/** Hairline between sets — must match `.industry-track { gap }` and `--industry-shift`. */
const TRACK_GAP_PX = 1

export type IndustryTrackRow = { key: IndustryKey; id?: string | null }

function IndustrySet({
  items,
  locale,
  cloneIndex,
}: {
  items: IndustryTrackRow[]
  locale: Locale
  /** When set, this is a visual-only duplicate (aria-hidden). */
  cloneIndex?: number
}) {
  const clone = cloneIndex !== undefined
  const labelDir = dirFor(locale)
  const tiles = items.map(({ key, id }) => (
    <li
      className="industry-window"
      data-industry={key}
      key={clone ? `clone-${cloneIndex}-${id ?? key}` : (id ?? key)}
    >
      <span className="industry-icon">
        <IndustryIllustration industry={key} />
      </span>
      {clone ? (
        <span className="industry-name" dir={labelDir}>
          {industryLabels[locale][key]}
        </span>
      ) : (
        <h3 className="industry-name" dir={labelDir}>
          {industryLabels[locale][key]}
        </h3>
      )}
    </li>
  ))

  if (clone) {
    return (
      <ul aria-hidden="true" className="industry-set industry-set--clone">
        {tiles}
      </ul>
    )
  }

  return <ul className="industry-set">{tiles}</ul>
}

/**
 * One compact horizontal track. Auto-marquee only when the row overflows
 * and the visitor allows motion; clones stay aria-hidden for a seamless loop.
 */
export function IndustryTracks({
  locale,
  rows,
}: {
  locale: Locale
  rows: IndustryTrackRow[]
}) {
  const stripRef = useRef<HTMLDivElement>(null)
  const rowSignature = rows.map((row) => row.key).join(',')
  /** Total sequences on the track (canonical + clones). At least 2 when marquee can run. */
  const [setCount, setSetCount] = useState(2)

  useEffect(() => {
    const strip = stripRef.current
    if (!strip || typeof window.matchMedia !== 'function') return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let overflowing = false
    let observer: IntersectionObserver | undefined
    let resizeObserver: ResizeObserver | undefined
    let raf = 0

    const isInView = () => {
      const rect = strip.getBoundingClientRect()
      return rect.bottom > 0 && rect.top < window.innerHeight
    }

    const sync = () => {
      const canMarquee = !preference.matches && overflowing
      strip.dataset.marquee = canMarquee ? 'on' : 'off'

      // Pause offscreen / hidden tab without tearing down clones (keeps loop position).
      if (canMarquee && (document.hidden || !isInView())) {
        strip.dataset.idle = ''
      } else {
        delete strip.dataset.idle
      }
    }

    const measure = () => {
      const row = strip.querySelector<HTMLElement>('.industry-row')
      const set = row?.querySelector<HTMLElement>('.industry-set:not([aria-hidden])')
      if (!row || !set) {
        overflowing = false
        sync()
        return
      }

      const sequenceWidth = set.offsetWidth
      overflowing = sequenceWidth > row.clientWidth + 1
      const canMarquee = !preference.matches && overflowing

      if (canMarquee && sequenceWidth > 0) {
        const needed = Math.max(2, Math.ceil(row.clientWidth / sequenceWidth) + 1)
        setSetCount((prev) => (prev === needed ? prev : needed))
        strip.style.setProperty('--industry-shift', `${sequenceWidth + TRACK_GAP_PX}px`)
      } else {
        strip.style.removeProperty('--industry-shift')
      }

      sync()
    }

    const scheduleMeasure = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(measure)
      })
    }

    const onPointerDown = () => {
      strip.dataset.paused = ''
    }
    const onPointerUp = () => {
      delete strip.dataset.paused
    }

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(scheduleMeasure, {
        threshold: 0,
        rootMargin: '64px 0px',
      })
      observer.observe(strip)
    }

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(scheduleMeasure)
      resizeObserver.observe(strip)
      const row = strip.querySelector('.industry-row')
      if (row) resizeObserver.observe(row)
    }

    preference.addEventListener('change', scheduleMeasure)
    document.addEventListener('visibilitychange', sync)
    window.addEventListener('scroll', scheduleMeasure, { passive: true })
    strip.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
    scheduleMeasure()

    return () => {
      cancelAnimationFrame(raf)
      observer?.disconnect()
      resizeObserver?.disconnect()
      preference.removeEventListener('change', scheduleMeasure)
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('scroll', scheduleMeasure)
      strip.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      strip.style.removeProperty('--industry-shift')
      delete strip.dataset.marquee
      delete strip.dataset.paused
      delete strip.dataset.idle
    }
  }, [rowSignature])

  if (!rows.length) return null

  const cloneCount = Math.max(0, setCount - 1)

  return (
    <div className="industry-strip" data-marquee="on" data-reveal-group="" ref={stripRef}>
      {/* LTR overflow origin — page RTL must not flip marquee geometry. Labels keep dirFor(locale). */}
      <div className="industry-row" dir="ltr">
        <div className="industry-track" dir="ltr">
          <IndustrySet items={rows} locale={locale} />
          {Array.from({ length: cloneCount }, (_, index) => (
            <IndustrySet
              items={rows}
              locale={locale}
              cloneIndex={index}
              key={`industry-clone-${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

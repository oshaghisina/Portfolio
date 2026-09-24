'use client'

import React, { useEffect, useRef } from 'react'
import type { Locale } from '@/utilities/locale'
import type { IndustryKey } from './catalogue'
import { industryLabels } from './catalogue'
import { IndustryIllustration } from './Illustrations'

export type IndustryTrackRow = { key: IndustryKey; id?: string | null }

function IndustrySet({
  items,
  locale,
  clone = false,
}: {
  items: IndustryTrackRow[]
  locale: Locale
  clone?: boolean
}) {
  const tiles = items.map(({ key, id }) => (
    <li
      className="industry-window"
      data-industry={key}
      key={clone ? `clone-${id ?? key}` : (id ?? key)}
    >
      <span className="industry-icon">
        <IndustryIllustration industry={key} />
      </span>
      {clone ? (
        <span className="industry-name">{industryLabels[locale][key]}</span>
      ) : (
        <h3 className="industry-name">{industryLabels[locale][key]}</h3>
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
      const play =
        !preference.matches && !document.hidden && overflowing && isInView()
      strip.dataset.marquee = play ? 'on' : 'off'
    }

    const measure = () => {
      const row = strip.querySelector<HTMLElement>('.industry-row')
      const set = row?.querySelector<HTMLElement>('.industry-set:not([aria-hidden])')
      overflowing = Boolean(row && set && set.scrollWidth > row.clientWidth + 1)
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
      delete strip.dataset.marquee
      delete strip.dataset.paused
    }
  }, [rowSignature])

  if (!rows.length) return null

  return (
    <div className="industry-strip" data-marquee="on" data-reveal-group="" ref={stripRef}>
      <div className="industry-row">
        <div className="industry-track">
          <IndustrySet items={rows} locale={locale} />
          <IndustrySet items={rows} locale={locale} clone />
        </div>
      </div>
    </div>
  )
}

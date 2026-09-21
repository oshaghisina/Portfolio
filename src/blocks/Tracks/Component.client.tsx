'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

import type { TracksBlock as TracksBlockProps } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { DEFAULT_LOCALE } from '@/utilities/locale'
import { cn } from '@/utilities/ui'
import { uiCopy } from '@/utilities/uiCopy'

import { TrackIllustration, type TrackKey } from './Illustrations'

const ORDER: TrackKey[] = ['productDesign', 'aiWorkflow', 'designSystems']

export type TracksProps = Pick<TracksBlockProps, 'sectionHeader' | 'tracks'> & {
  className?: string
  disableInnerContainer?: boolean
  locale?: Locale
}

/**
 * Tracks: a fixed, non-looping three-state viewer replacing the old single-focus Capabilities
 * block. Canonical order (Product Design → AI Workflow → Design Systems) is hardcoded here, not
 * read from admin row order — `key` only selects content and illustration.
 */
export const TracksBlock: React.FC<TracksProps> = ({
  className,
  disableInnerContainer,
  locale = DEFAULT_LOCALE,
  sectionHeader,
  tracks,
}) => {
  const ordered = ORDER.map((key) => (tracks ?? []).find((t) => t.key === key)).filter(
    (t): t is NonNullable<typeof t> => Boolean(t),
  )
  const [index, setIndex] = useState(0)

  if (ordered.length === 0) return null

  const current = ordered[Math.min(index, ordered.length - 1)]
  const atStart = index === 0
  const atEnd = index === ordered.length - 1
  const copy = uiCopy[locale]

  const goPrev = () => {
    if (!atStart) setIndex((i) => i - 1)
  }
  const goNext = () => {
    if (!atEnd) setIndex((i) => i + 1)
  }

  return (
    <section
      className={cn(
        !disableInnerContainer && 'container',
        'tracks-ruled-paper relative isolate overflow-hidden border border-line-soft lg:min-h-[670px]',
        className,
      )}
    >
      {sectionHeader?.tag ? (
        <span className="eyebrow absolute start-0 top-0 z-10 flex h-7 w-[78px] items-center justify-center bg-track-accent text-foreground">
          {sectionHeader.tag}
        </span>
      ) : null}

      {/* Construction L-marks — physical, not logical: drafting marks stay put under RTL. */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-e border-t border-track-accent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-e border-b border-track-accent"
      />

      {/* Accent segment — logical: tied to reading flow, mirrors under RTL. */}
      <span aria-hidden className="pointer-events-none absolute bottom-0 start-0 h-0.5 w-[140px] bg-track-accent" />

      <div className="relative px-4 py-20 sm:px-8 lg:px-12 lg:py-20">
        <header className="mx-auto max-w-[640px] text-center">
          <h2 className="text-h2 font-medium text-balance text-foreground">
            {sectionHeader?.lead}
            {sectionHeader?.tail ? <span className="text-ink-3"> {sectionHeader.tail}</span> : null}
          </h2>
          {sectionHeader?.lede ? (
            <p className="mx-auto mt-4 max-w-[520px] text-lede text-ink-2">{sectionHeader.lede}</p>
          ) : null}
        </header>

        <div className="mt-20 grid items-center gap-12 sm:mt-24 lg:mt-24 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
          <div className="order-1 mx-auto flex w-full max-w-[380px] justify-center lg:rtl:order-2">
            <div className="aspect-[380/230] w-full" key={current.key}>
              <TrackIllustration
                className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-(--duration-fast) h-full w-full"
                trackKey={current.key}
              />
            </div>
          </div>

          <div className="order-2 flex min-w-0 flex-col items-start gap-8 lg:rtl:order-1">
            <div
              className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-(--duration-fast) flex flex-col items-start gap-4"
              key={current.key}
            >
              <h3 className="text-track-title font-medium text-balance text-foreground">{current.title}</h3>
              <p aria-hidden={!current.experience} className="eyebrow min-h-[1em] text-ink-3">
                {current.experience || ' '}
              </p>
              <p className="max-w-measure text-body text-ink-2">{current.description}</p>
            </div>

            <div className="flex items-center gap-[10px]">
              <button
                disabled={atStart}
                aria-label={copy.previous}
                className={cn(
                  'flex size-12 shrink-0 items-center justify-center rounded-none border border-line text-foreground transition-colors duration-(--duration-fast)',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  atStart ? 'cursor-not-allowed opacity-40' : 'hover:bg-panel',
                )}
                onClick={goPrev}
                title={copy.previous}
                type="button"
              >
                <ChevronLeft aria-hidden className="size-4 rtl:rotate-180" />
              </button>
              <button
                disabled={atEnd}
                aria-label={copy.next}
                className={cn(
                  'flex size-12 shrink-0 items-center justify-center rounded-none border border-line text-foreground transition-colors duration-(--duration-fast)',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  atEnd ? 'cursor-not-allowed opacity-40' : 'hover:bg-panel',
                )}
                onClick={goNext}
                title={copy.next}
                type="button"
              >
                <ChevronRight aria-hidden className="size-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import React, { useRef, useState } from 'react'

import type { TracksBlock as TracksBlockProps } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { SectionHeader } from '@/components/SectionHeader'
import { TechnicalFrameMarks } from '@/components/TechnicalFrameMarks'
import { DEFAULT_LOCALE, isRtl } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

import { TrackIllustration, type TrackKey } from './Illustrations'

const ORDER: TrackKey[] = ['productDesign', 'aiWorkflow', 'designSystems']

/** `SectionHeader` puts this on the `<h2>`; the title block borrows it with `aria-labelledby`. */
const HEADING_ID = 'tracks-heading'

export type TracksProps = Pick<TracksBlockProps, 'sectionHeader' | 'tracks'> & {
  className?: string
  locale?: Locale
}

/**
 * Tracks: a fixed, non-looping three-state viewer on the site's one inverted surface — the dark
 * `.tracks-blueprint` plate. Canonical order (Product Design → AI Workflow → Design Systems) is
 * hardcoded here, not read from admin row order; `key` only selects content and illustration.
 *
 * The plate is read as a drafting sheet, so navigation lives in a **title block** ruled across its
 * foot rather than in a pair of chevrons. That one strip does three jobs at once: it names all
 * three tracks (so a reader who never interacts still gets the whole claim), it shows which one is
 * open, and it switches them. The orange rule on the active cell is the only progress signal on
 * the plate — the decorative `segments` bar this block used to draw looked like one and never
 * moved, so it is gone. `TechnicalFrameMarks` keeps the prop for the Footer, which uses it the way
 * it was meant to be used: a symmetric pair of short rules, not one long bar.
 *
 * Both swapping regions are 1×1 grid stacks: every track is mounted, all three sit on the same
 * grid cell and only the active one is opaque. The box is therefore always as tall as the tallest
 * of the three, which is what lets the section drop its `min-h` — the old magic height existed to
 * stop the plate resizing on switch, and would have broken in fa/de where the same copy runs
 * longer. It also means the nodes never unmount, so the swap is a real cross-fade rather than
 * `animate-in fade-in`, which only replays on mount.
 */
export const TracksBlock: React.FC<TracksProps> = ({
  className,
  locale = DEFAULT_LOCALE,
  sectionHeader,
  tracks,
}) => {
  const ordered = ORDER.map((key) => (tracks ?? []).find((t) => t.key === key)).filter(
    (t): t is NonNullable<typeof t> => Boolean(t),
  )
  const [index, setIndex] = useState(0)
  const cellsRef = useRef<(HTMLButtonElement | null)[]>([])

  if (ordered.length === 0) return null

  const active = Math.min(index, ordered.length - 1)
  const last = ordered.length - 1

  // Selection and focus move together, so the strip behaves like one control rather than three
  // tab stops. Left/Right follow reading order; Up/Down are for the stacked single-column layout.
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const rtl = isRtl(locale)
    let next: null | number = null

    switch (event.key) {
      case 'ArrowDown':
        next = active + 1
        break
      case 'ArrowLeft':
        next = rtl ? active + 1 : active - 1
        break
      case 'ArrowRight':
        next = rtl ? active - 1 : active + 1
        break
      case 'ArrowUp':
        next = active - 1
        break
      case 'End':
        next = last
        break
      case 'Home':
        next = 0
        break
      default:
        return
    }

    if (next < 0 || next > last) return
    event.preventDefault()
    setIndex(next)
    cellsRef.current[next]?.focus()
  }

  return (
    <section
      className={cn(
        'tracks-blueprint relative isolate flex flex-col overflow-hidden border border-line-soft',
        className,
      )}
    >
      {/* The plate's tag. `SectionHeader` below is deliberately given no `tag` — this chip is it,
          and passing both would print the word twice. */}
      {sectionHeader?.tag ? (
        <span className="eyebrow absolute start-0 top-0 z-10 flex h-7 w-[78px] items-center justify-center bg-track-accent text-foreground">
          {sectionHeader.tag}
        </span>
      ) : null}

      {/* Construction L-marks stay physical — drafting marks stay put under RTL. */}
      <TechnicalFrameMarks corners={['top-right', 'bottom-right']} />

      <div className="relative flex-1 px-4 pt-16 pb-12 sm:px-8 sm:pt-20 lg:px-12 lg:pb-16">
        {/* The plate owns its own vertical rhythm, so the opener's `pt-section-sm` has to go.
            A plain `pt-0` does not do it: tailwind-merge does not recognise `section-sm` as a
            spacing value, so it never groups the two and both classes survive — with
            `pt-section-sm` winning on source order. `[&]:pt-0` raises specificity instead, which
            it cannot lose. (Every other call site passes a *variant* like `max-md:pt-0`, which
            lands in its own media query and so never hits this.)

            Every colour role in here resolves against `.tracks-blueprint`'s local
            redeclarations, so the shared header needs no dark-surface variant. */}
        <SectionHeader
          className="[&]:pt-0"
          id={HEADING_ID}
          lead={sectionHeader?.lead}
          lede={sectionHeader?.lede}
          tail={sectionHeader?.tail}
        />

        <div className="mt-8 grid items-center gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-x-16">
          <div className="order-1 mx-auto grid w-full max-w-[420px] lg:col-span-7 lg:max-w-none lg:rtl:order-2">
            {ordered.map((track, i) => (
              <TrackIllustration
                className={cn(
                  // `aspect-[5/3]` matches the 0 0 400 240 viewBox exactly.
                  'col-start-1 row-start-1 aspect-[5/3] w-full transition-opacity duration-(--duration-fast) ease-standard motion-reduce:transition-none',
                  i === active ? 'opacity-100' : 'opacity-0',
                )}
                key={track.key}
                trackKey={track.key}
              />
            ))}
          </div>

          <div
            aria-live="polite"
            className="order-2 grid min-w-0 lg:col-span-5 lg:rtl:order-1"
          >
            {ordered.map((track, i) => (
              <div
                aria-hidden={i !== active}
                className={cn(
                  'col-start-1 row-start-1 flex flex-col items-start transition-opacity duration-(--duration-fast) ease-standard motion-reduce:transition-none',
                  i === active ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
                key={track.key}
              >
                <div aria-hidden className="flex items-baseline gap-2 eyebrow text-ink-3">
                  <span className="index-code" dir="ltr">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>/ Track</span>
                </div>
                <h3 className="mt-3 text-track-title font-medium text-balance text-foreground">
                  {track.title}
                </h3>
                <span className="index-code mt-4" dir="ltr">
                  {track.experience || '\u00A0'}
                </span>
                <p className="mt-6 max-w-measure text-body text-ink-2">{track.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Title block. Ruled-matrix idiom (see WorkflowStages): the wrapper owns the single outer
          rule and paints the internal hairlines via `gap-px` over `bg-line`; cells carry a
          background and nothing else. */}
      <div
        aria-labelledby={HEADING_ID}
        className="relative grid gap-px border-t border-line bg-line sm:grid-cols-3"
        onKeyDown={onKeyDown}
        role="group"
      >
        {ordered.map((track, i) => {
          const isActive = i === active

          return (
            <button
              aria-pressed={isActive}
              className={cn(
                'group relative flex min-w-0 items-baseline gap-3 px-4 py-4 text-start transition-colors duration-(--duration-fast) sm:px-5 sm:py-5',
                // Negative offset on purpose: the section is `overflow-hidden` and these cells are
                // flush to its edges, so the house `outline-offset-2` would be clipped.
                'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
                isActive ? 'bg-panel' : 'bg-paper hover:bg-panel/40',
              )}
              key={track.key}
              onClick={() => setIndex(i)}
              ref={(el) => {
                cellsRef.current[i] = el
              }}
              type="button"
            >
              {/* An absolute span, not `border-t-2`: a real border would shift this cell's
                  contents two pixels out of line with its neighbours. */}
              {isActive ? (
                <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-track-accent" />
              ) : null}

              {/* `eyebrow` and `index-code` carry their own `color`, so the tone has to go on each
                  span — a text colour on the button would never reach them. */}
              <span
                className={cn('index-code', isActive ? 'text-foreground' : 'group-hover:text-ink-2')}
                dir="ltr"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'eyebrow min-w-0',
                  isActive ? 'text-foreground' : 'text-ink-3 group-hover:text-foreground',
                )}
              >
                {track.title}
              </span>
              {track.experience ? (
                <span
                  className={cn(
                    'index-code ms-auto shrink-0 ps-3',
                    isActive ? 'text-ink-2' : 'text-ink-3',
                  )}
                  dir="ltr"
                >
                  {track.experience}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </section>
  )
}

import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * Registration marks — the accent L-corners and edge rules that frame a technical surface.
 * Purely decorative and non-interactive: absolutely positioned, so the caller owns the box
 * (`relative isolate`) and the marks land on its padding edge, flush inside any rails it draws.
 *
 * Lifted verbatim out of the Tracks block, which is still the reference for the language.
 */

/**
 * `*-right` is physical: Tracks' drafting marks stay in the same screen corner under RTL.
 * `*-start`/`*-end` follow reading direction and are meant to be used as a pair, which renders
 * identically either way round — framing shouldn't flip with the locale.
 */
export type FrameCorner = 'bottom-end' | 'bottom-right' | 'bottom-start' | 'top-right'

const CORNER_CLASS: Record<FrameCorner, string> = {
  'bottom-end': 'bottom-0 end-0 border-b border-e',
  'bottom-right': 'right-0 bottom-0 border-b border-e',
  'bottom-start': 'bottom-0 start-0 border-b border-s',
  'top-right': 'top-0 right-0 border-t border-e',
}

export interface FrameSegment {
  /** The inline edge the rule runs inward from. */
  side: 'end' | 'start'
  /** Its weight and length, e.g. `h-0.5 w-[140px]`. Kept at the call site so Tailwind can see it. */
  className: string
}

export interface TechnicalFrameMarksProps {
  corners?: FrameCorner[]
  /** Accent rules along the bottom edge. */
  segments?: FrameSegment[]
}

export const TechnicalFrameMarks: React.FC<TechnicalFrameMarksProps> = ({ corners = [], segments = [] }) => (
  <>
    {corners.map((corner) => (
      <span
        aria-hidden
        className={cn('pointer-events-none absolute h-3 w-3 border-track-accent', CORNER_CLASS[corner])}
        key={corner}
      />
    ))}
    {segments.map(({ className, side }) => (
      <span
        aria-hidden
        className={cn('pointer-events-none absolute bottom-0 bg-track-accent', side === 'start' ? 'start-0' : 'end-0', className)}
        key={side}
      />
    ))}
  </>
)

import React from 'react'

import { SystemLandscape } from '@/components/SystemLandscape'
import { cn } from '@/utilities/ui'

/**
 * The loading state every route shows while its segment streams in: `PageOpener`'s opening
 * gesture drawn as placeholders (eyebrow, two-line headline, lede, actions, a facts column from
 * `lg`), the real hairline rail, then a cover plate that grows into whatever height is left.
 * Inside `<PageFrame fillViewport>` that makes the sheet one viewport tall, so the footer stays
 * below the fold until the page arrives instead of jumping up and back down.
 *
 * Paddings and measures copy the default (non-compact) `PageOpener`, and each placeholder line is
 * `1lh` tall under the matching type role, so the bars follow the same clamps and the Persian
 * line-heights the real text does — the swap to the page moves as little as possible.
 */
export interface PageSkeletonProps {
  /** Announced to assistive tech; the placeholders themselves are hidden from it. */
  label: string
}

const Bar: React.FC<{ className?: string }> = ({ className }) => (
  <span className={cn('block rounded-sm bg-panel', className)} />
)

/** One line of text at the enclosing type role: a `1lh` box with a bar at roughly x-height. */
const Line: React.FC<{ className?: string; height: string }> = ({ className, height }) => (
  <span className="flex h-[1lh] items-center">
    <Bar className={cn(height, className)} />
  </span>
)

const FACT_WIDTHS = ['w-44', 'w-36', 'w-40', 'w-28']

export const PageSkeleton: React.FC<PageSkeletonProps> = ({ label }) => (
  <div
    aria-busy="true"
    aria-live="polite"
    className="flex flex-1 flex-col"
    data-reveal-skip=""
    role="status"
  >
    <span className="sr-only">{label}</span>

    <div
      aria-hidden
      className="flex flex-col gap-10 pt-6 pb-12 motion-safe:animate-pulse md:gap-12 md:pt-16 md:pb-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:pt-24 lg:pb-20"
    >
      <div className="w-full max-w-[42rem]">
        <span className="eyebrow block">
          <Line className="w-28" height="h-[0.75em]" />
        </span>
        <span className="mt-4 block text-display">
          <Line className="w-[92%]" height="h-[0.8em]" />
          <Line className="w-3/5" height="h-[0.8em]" />
        </span>
        <span className="mt-6 block max-w-[34ch] text-lede md:max-w-[34rem]">
          <Line className="w-full" height="h-[0.6em]" />
          <Line className="w-4/5" height="h-[0.6em]" />
        </span>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Bar className="h-(--size-control-height) w-full rounded-control sm:w-40" />
          <Bar className="h-(--size-control-height) w-full rounded-control sm:w-32" />
        </div>
      </div>

      <div className="hidden w-[20rem] shrink-0 divide-y divide-line-soft lg:block">
        {FACT_WIDTHS.map((width) => (
          <div className="py-4" key={width}>
            <Bar className="h-2.5 w-16" />
            <Bar className={cn('mt-2.5 h-4', width)} />
          </div>
        ))}
      </div>
    </div>

    <SystemLandscape />

    <div
      aria-hidden
      className="mt-12 min-h-48 flex-1 rounded-media bg-panel motion-safe:animate-pulse md:mt-16"
    />
  </div>
)

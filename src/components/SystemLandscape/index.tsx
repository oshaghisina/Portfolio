import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * Decorative "technical landscape" strip bridging Hero → Workbench and CTA → Footer — a thin
 * baseline, tick marks and a few mono labels. Purely presentational: no data, no interaction.
 * The system's second (and last) signature motif alongside the Workbench. Below `sm` the labels
 * go (four of them never fit a phone) and the strip clips inside its own box — baseline, ticks
 * and the accent point stay.
 */
export interface SystemLandscapeProps {
  labels?: string[]
  className?: string
}

const TICK_COUNT = 24

export const SystemLandscape: React.FC<SystemLandscapeProps> = ({ className, labels = [] }) => (
  <div aria-hidden className={cn('relative flex h-14 items-end overflow-hidden sm:h-24', className)}>
    <div className="absolute inset-x-0 bottom-6 flex items-end gap-[3px]">
      {Array.from({ length: TICK_COUNT }).map((_, i) => (
        <span
          className={cn('w-px bg-line', i % 6 === 0 ? 'h-3' : 'h-1.5')}
          key={i}
        />
      ))}
      <span aria-hidden className="ms-2 mb-[-3px] size-1.5 shrink-0 rounded-full bg-brand" />
    </div>
    <div className="absolute inset-x-0 bottom-0 border-t border-line" />
    {labels.length ? (
      <div className="absolute inset-x-0 bottom-8 hidden justify-between sm:flex">
        {labels.map((label) => (
          <span className="eyebrow text-ink-3" key={label}>
            {label}
          </span>
        ))}
      </div>
    ) : null}
  </div>
)

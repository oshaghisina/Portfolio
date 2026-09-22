import React from 'react'

import type { CaseStudyProcessBlock } from '@/payload-types'

import { cn } from '@/utilities/ui'

import type { CaseStudyBlockContext } from '../types'

export type ProcessBlockProps = CaseStudyProcessBlock & CaseStudyBlockContext

/**
 * The project's own sequence as nodes and hairlines — mono codes in small circles, labels, a
 * technical note under each. A horizontal rail from `md`, a vertical one on phones (same nodes,
 * same connectors). `loop` closes the last step back to the first with a dashed return line.
 * Connectors use logical `start`/`end`, so the map mirrors under RTL while codes stay Latin.
 */
export const ProcessBlock: React.FC<ProcessBlockProps> = ({ copy, heading, kind, steps }) => {
  const rows = steps ?? []
  if (!rows.length) return null
  const first = rows[0]!

  return (
    <div>
      {heading ? (
        <h3 className="text-h3 font-medium text-balance text-foreground">{heading}</h3>
      ) : null}
      <ol className={cn('flex flex-col gap-8 md:flex-row md:gap-0', heading && 'mt-8')}>
        {rows.map((step, i) => {
          const last = i === rows.length - 1
          return (
            <li
              className="relative flex gap-4 md:flex-1 md:flex-col md:gap-3 md:pe-6"
              key={step.id ?? i}
            >
              {!last ? (
                <>
                  <span
                    aria-hidden
                    className="absolute start-[1.125rem] top-9 -bottom-8 w-px bg-line md:hidden"
                  />
                  <span
                    aria-hidden
                    className="absolute top-[1.125rem] start-9 end-0 hidden h-px bg-line md:block"
                  />
                </>
              ) : null}
              <span className="index-code relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-background text-ink-2">
                {step.code}
              </span>
              <div className="flex flex-col gap-1 pt-1.5 md:pt-0">
                <span className="text-small font-medium text-foreground">{step.label}</span>
                {step.note ? <span className="text-caption text-ink-3">{step.note}</span> : null}
              </div>
            </li>
          )
        })}
      </ol>
      {kind === 'loop' ? (
        <p className="mt-6 flex items-center gap-3 eyebrow text-ink-3">
          <span aria-hidden className="h-px w-10 border-t border-dashed border-line md:flex-1" />
          <span>
            <span aria-hidden className="me-1 inline-block rtl:-scale-x-100">
              ↻
            </span>
            {copy.loopsTo} <span className="index-code text-ink-3">{first.code}</span> ·{' '}
            {first.label}
          </span>
        </p>
      ) : null}
    </div>
  )
}

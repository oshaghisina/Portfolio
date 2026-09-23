import React from 'react'

import type { CapabilityModelBlock as CapabilityModelBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'

export type CapabilityModelProps = Pick<
  CapabilityModelBlockProps,
  'disciplines' | 'output' | 'outputLabel' | 'sectionHeader'
> & {
  className?: string
}

/**
 * The capability model, drawn in layout: six disciplines connect from both sides to a shared
 * operating spine, which resolves into one output. Labels remain HTML and may wrap in any locale.
 *
 * Paired rows and logical flow mirror cleanly under RTL, and an odd editable count still has a
 * valid final connection. The one accent is the convergence point.
 */
export const CapabilityModelBlock: React.FC<CapabilityModelProps> = ({
  className,
  disciplines,
  output,
  outputLabel,
  sectionHeader,
}) => {
  const rows = (disciplines ?? []).filter((row) => row.label)
  if (!rows.length || !output) return null

  return (
    <section className={cn(className)} id="capability-model">
      <SectionHeader {...sectionHeader} className="mb-10 max-md:mb-8" tagTone="mono" />
      <div className="border-y border-line py-7 sm:py-9">
        <div className="relative mx-auto max-w-[52rem]">
          <span aria-hidden className="pointer-events-none absolute inset-y-0 start-1/2 w-px bg-ink-3" />
          <ol className="grid grid-cols-2 gap-y-1">
            {rows.map((row, i) => (
              <li
                className={cn(
                  'flex min-w-0 items-center gap-2 py-3 sm:gap-4 sm:py-4',
                  i % 2 === 0 ? 'justify-end' : 'justify-start',
                )}
                key={row.id ?? i}
              >
                {i % 2 !== 0 ? <span aria-hidden className="h-px w-4 shrink-0 bg-ink-3 sm:w-12" /> : null}
                <span className="index-code shrink-0 text-ink-3" dir="ltr">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-small font-medium text-ink-2 text-balance">{row.label}</span>
                {i % 2 === 0 ? <span aria-hidden className="h-px w-4 shrink-0 bg-ink-3 sm:w-12" /> : null}
              </li>
            ))}
          </ol>
        </div>
        <div aria-hidden className="mx-auto flex h-10 flex-col items-center">
          <span className="h-4 w-px bg-ink-3" />
          <span className="size-2 rotate-45 bg-track-accent" />
          <span className="h-4 w-px bg-ink-3" />
        </div>
        <div className="text-center">
          <span className="eyebrow text-ink-3">{outputLabel}</span>
          <p className="mt-2 text-h3 tracking-h3 font-medium text-foreground text-balance">
            {output}
          </p>
        </div>
      </div>
    </section>
  )
}

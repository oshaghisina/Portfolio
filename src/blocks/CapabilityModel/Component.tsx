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
 * The capability model, drawn in layout rather than SVG: a ruled field of disciplines, one
 * hairline convergence, one result.
 *
 * Per-cell hairlines rather than the `gap-px` ruled-matrix idiom, because the number of
 * disciplines is editable — at seven rows a `gap-px` grid would leave an unfilled cell that
 * paints as a solid `--line` block (WorkMosaic/Component.tsx:29-35). Each cell owning its top and
 * inline-start rule survives any count.
 *
 * Logical properties throughout, so the whole thing mirrors cleanly under RTL. The one accent is
 * the convergence point, matching the rule the illustrations follow.
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
      <ol className="grid grid-cols-2 border-b border-e border-line sm:grid-cols-3">
        {rows.map((row, i) => (
          <li
            className="flex min-w-0 items-baseline gap-2 border-t border-s border-line p-5 lg:p-6"
            key={row.id ?? i}
          >
            <span className="index-code text-ink-3" dir="ltr">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="eyebrow text-ink-2">{row.label}</span>
          </li>
        ))}
      </ol>
      <div aria-hidden className="flex flex-col items-center">
        <span className="h-6 w-px bg-line sm:h-8" />
        <span className="size-2 rounded-full bg-track-accent" />
        <span className="h-6 w-px bg-line sm:h-8" />
      </div>
      <div className="border-y border-line py-7 text-center">
        <span className="eyebrow text-ink-3">{outputLabel}</span>
        <p className="mt-2 text-h3 tracking-h3 font-medium text-foreground text-balance">
          {output}
        </p>
      </div>
    </section>
  )
}

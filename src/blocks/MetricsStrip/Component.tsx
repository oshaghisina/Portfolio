import { cn } from '@/utilities/ui'
import React from 'react'

import type { MetricsStripBlock as MetricsStripBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'

export type MetricsStripProps = Pick<MetricsStripBlockProps, 'metrics' | 'sectionHeader'> & {
  className?: string
  disableInnerContainer?: boolean
}

/**
 * Decorative bar weight per row — purely editorial rhythm, breaking up equal columns. Not a
 * proportional chart: "10 yrs", "9 companies" and "7 industries" are different units, so a
 * literal comparative bar length would misrepresent the data rather than illustrate it.
 */
const BAR_WEIGHT = ['100%', '70%', '46%', '30%']

/** Metrics as a stacked editorial transition, not an equal-column stats row. */
export const MetricsStripBlock: React.FC<MetricsStripProps> = ({ className, disableInnerContainer, metrics, sectionHeader }) => {
  const rows = (metrics ?? []).slice(0, 4)
  if (!rows.length) return null

  return (
    <section className={cn(!disableInnerContainer && 'container', 'pb-[28vh] lg:pb-[34vh]', className)}>
      <SectionHeader {...sectionHeader} className="mb-4" tagTone="mono" />
      <dl className="divide-y divide-line border-t border-line">
        {rows.map((m, i) => (
          <div
            className="flex flex-col gap-4 py-8 sm:flex-row sm:items-baseline sm:gap-10 lg:py-10"
            key={m.id ?? i}
          >
            <dd className="text-num tracking-num font-medium text-brand tabular-nums" dir="ltr">
              {m.value}
            </dd>
            <div className="relative h-px flex-1 self-center bg-line">
              <span
                aria-hidden
                className="absolute inset-y-0 start-0 bg-brand"
                style={{ width: BAR_WEIGHT[i] ?? '30%' }}
              />
            </div>
            <div className="flex flex-col gap-1 sm:items-end sm:text-end">
              <dt className="eyebrow">{m.caption}</dt>
              {m.source ? <dd className="text-caption text-ink-3">{m.source}</dd> : null}
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}

import { cn } from '@/utilities/ui'
import React from 'react'

import type { MetricsStripBlock as MetricsStripBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'

// Literal strings per count so the scanner sees them.
const COLS: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

export type MetricsStripProps = Pick<MetricsStripBlockProps, 'metrics' | 'sectionHeader'> & {
  className?: string
  disableInnerContainer?: boolean
}

/**
 * DS-18 metrics strip. Values sit in the numeral track in brand (the accent's "live data"
 * job); captions are eyebrows; the source line keeps every number honest.
 */
export const MetricsStripBlock: React.FC<MetricsStripProps> = ({ className, disableInnerContainer, metrics, sectionHeader }) => {
  const rows = (metrics ?? []).slice(0, 4)
  if (!rows.length) return null

  return (
    <section className={cn(!disableInnerContainer && 'container', className)}>
      <SectionHeader {...sectionHeader} className="mb-10" />
      <dl className={cn('grid grid-cols-1 gap-x-6 gap-y-8 border-t border-line pt-10', COLS[rows.length])}>
        {rows.map((m, i) => (
          // DOM keeps dt before dd (valid <dl>); CSS order shows value → caption → source.
          <div className="flex flex-col gap-2" key={m.id ?? i}>
            <dt className="order-2 eyebrow">{m.caption}</dt>
            <dd className="order-1 text-num font-medium text-brand tabular-nums" dir="ltr">
              {m.value}
            </dd>
            {m.source ? <dd className="order-3 text-caption text-ink-3">{m.source}</dd> : null}
          </div>
        ))}
      </dl>
    </section>
  )
}

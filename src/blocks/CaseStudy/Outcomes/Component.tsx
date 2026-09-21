import React from 'react'

import type { CaseStudyOutcomesBlock } from '@/payload-types'

import { ShippedList } from '@/components/ShippedList'
import { cn } from '@/utilities/ui'

import type { CaseStudyBlockContext } from '../types'

export type OutcomesBlockProps = CaseStudyOutcomesBlock & CaseStudyBlockContext & { headingId?: string }

/**
 * Outcomes in the homepage's editorial-data language — a large number with a small explanation
 * when a credible value exists, a typographic statement when it doesn't. Every item names its
 * kind (measured vs. delivered) and its provenance, so an output is never dressed up as impact.
 */
export const OutcomesBlock: React.FC<OutcomesBlockProps> = ({ copy, heading, headingId, intro, items, locale, shipped }) => {
  const rows = items ?? []
  const delivered = (shipped ?? []).filter(Boolean)
  if (!rows.length && !delivered.length) return null

  return (
    <div>
      <h2 className="text-h2 font-medium text-balance text-foreground" id={headingId}>
        {heading || copy.sectionLabels.outcomes}
      </h2>
      {intro ? <p className="mt-4 max-w-measure text-lede text-ink-2">{intro}</p> : null}
      {rows.length ? (
        <dl className="mt-12 grid gap-x-12 gap-y-12 border-t border-line pt-10 sm:grid-cols-2">
          {rows.map((item, i) => {
            const value = item.value?.trim()
            const provenance = [copy.outcomeKind[item.kind ?? 'delivered'], item.source?.trim()].filter(Boolean).join(' · ')
            return (
              <div className="flex flex-col gap-3" key={item.id ?? i}>
                <dt className={cn(value ? 'eyebrow text-foreground' : 'text-h3 font-medium text-balance text-foreground')}>{item.label}</dt>
                {value ? (
                  <dd className="order-first text-num tracking-num font-medium tabular-nums text-brand" dir="ltr">
                    {value}
                  </dd>
                ) : null}
                {item.context ? <dd className="max-w-measure text-small text-ink-2">{item.context}</dd> : null}
                <dd className="text-caption text-ink-3">{provenance}</dd>
              </div>
            )
          })}
        </dl>
      ) : null}
      {delivered.length ? <ShippedList className="mt-16" items={delivered} label={copy.delivered} locale={locale} /> : null}
    </div>
  )
}

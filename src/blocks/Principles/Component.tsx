import { cn } from '@/utilities/ui'
import React from 'react'

import type { PrinciplesBlock as PrinciplesBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'

export type PrinciplesProps = Pick<PrinciplesBlockProps, 'items' | 'sectionHeader'> & {
  className?: string
  disableInnerContainer?: boolean
}

/** Numbered (01, 02…) full-width stacked entries — no cards, mirrors WorkflowStages' restraint. */
export const PrinciplesBlock: React.FC<PrinciplesProps> = ({ className, disableInnerContainer, items, sectionHeader }) => {
  const rows = items ?? []
  if (!rows.length) return null

  return (
    <section className={cn(!disableInnerContainer && 'container', className)}>
      <SectionHeader {...sectionHeader} className="mb-10 max-md:mb-8 max-md:border-t-0 max-md:pt-0" tagTone="mono" />
      <ol className="flex flex-col divide-y divide-line border-y border-line">
        {rows.map((item, i) => (
          <li className="grid gap-3 py-10 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-x-16" key={item.id ?? i}>
            <span className="index-code lg:col-span-2">{String(i + 1).padStart(2, '0')}</span>
            <div className="flex flex-col gap-3 lg:col-span-10">
              <h3 className="text-h3 tracking-h3 font-medium text-foreground max-w-measure">{item.title}</h3>
              <p className="text-body text-ink-2 max-w-measure">{item.description}</p>
              {item.evidenceLabel ? <span className="eyebrow text-ink-3">{item.evidenceLabel}</span> : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

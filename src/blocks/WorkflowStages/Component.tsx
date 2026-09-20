import { cn } from '@/utilities/ui'
import { ArrowRight } from 'lucide-react'
import React from 'react'

import type { WorkflowStagesBlock as WorkflowStagesBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'
import { TagList } from '@/components/Tag'

export type WorkflowStagesProps = Pick<WorkflowStagesBlockProps, 'sectionHeader' | 'stages'> & {
  className?: string
  disableInnerContainer?: boolean
}

/** Tools grouped by workflow stage and connected in sequence, instead of four flat lists. */
export const WorkflowStagesBlock: React.FC<WorkflowStagesProps> = ({
  className,
  disableInnerContainer,
  sectionHeader,
  stages,
}) => {
  const rows = stages ?? []
  if (!rows.length) return null

  return (
    <section className={cn(!disableInnerContainer && 'container', className)}>
      <SectionHeader {...sectionHeader} className="mb-10" />
      <ol className="grid grid-cols-1 border-t border-s border-line sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((stage, i) => (
          <li className="relative flex flex-col gap-3 border-b border-e border-line p-6" key={stage.id ?? i}>
            <span className="index-code text-ink-3">{stage.code}</span>
            <h3 className="text-h3 font-medium text-foreground">{stage.label}</h3>
            <TagList
              items={stage.tools.split(',').map((tool) => tool.trim()).filter(Boolean)}
              tone="soft"
            />
            {i < rows.length - 1 ? (
              <ArrowRight
                aria-hidden
                className="absolute end-0 top-6 hidden size-4 -translate-y-1/2 translate-x-1/2 text-ink-3 rtl:-scale-x-100 lg:block"
              />
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  )
}

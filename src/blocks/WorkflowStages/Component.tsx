import { cn } from '@/utilities/ui'
import React from 'react'

import type { WorkflowStagesBlock as WorkflowStagesBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'

export type WorkflowStagesProps = Pick<WorkflowStagesBlockProps, 'sectionHeader' | 'stages'> & {
  className?: string
  disableInnerContainer?: boolean
}

/** AI / daily tooling: one editorial heading plus a single compact row of tools — no categories. */
export const WorkflowStagesBlock: React.FC<WorkflowStagesProps> = ({
  className,
  disableInnerContainer,
  sectionHeader,
  stages,
}) => {
  const tools = Array.from(
    new Set(
      (stages ?? []).flatMap((stage) =>
        stage.tools.split(',').map((tool) => tool.trim()).filter(Boolean),
      ),
    ),
  )
  if (!tools.length) return null

  return (
    <section className={cn(!disableInnerContainer && 'container', className)}>
      <SectionHeader {...sectionHeader} className="mb-10" tagTone="mono" />
      <ul className="flex flex-wrap gap-3">
        {tools.map((tool) => (
          <li key={tool}>
            <span className="inline-flex h-11 items-center rounded-control border border-line px-4 eyebrow text-ink-2">
              {tool}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

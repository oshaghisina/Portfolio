import { cn } from '@/utilities/ui'
import React from 'react'

import type { WorkflowStagesBlock as WorkflowStagesBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'

import { ToolGlyph } from './ToolGlyph'

export type WorkflowStagesProps = Pick<WorkflowStagesBlockProps, 'sectionHeader' | 'stages'> & {
  className?: string
  disableInnerContainer?: boolean
}

/**
 * AI / daily tooling: one editorial heading plus a single compact row of tools — no categories.
 * The tools remain visual objects at every viewport rather than turning into a software-list row.
 */
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
      <SectionHeader
        {...sectionHeader}
        className="mb-6 max-md:mb-6 max-md:border-t-0 max-md:pt-0 max-md:[&_h2]:max-w-[11ch]"
        tagTone="mono"
      />
      <ul className="grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-4 lg:grid-cols-7">
        {tools.map((tool) => (
          <li className="min-w-0 bg-paper max-sm:[&:last-child:nth-child(2n+1)]:col-span-2" key={tool}>
            <span className="flex flex-col items-center justify-center gap-2 px-3 py-5 text-center eyebrow text-ink-2">
              <ToolGlyph className="size-6" name={tool} />
              {tool}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

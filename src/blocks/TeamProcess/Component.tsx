import { cn } from '@/utilities/ui'
import React from 'react'

import type { TeamProcessBlock as TeamProcessBlockProps } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import RichText from '@/components/RichText'
import { SectionHeader } from '@/components/SectionHeader'
import { FORK_FLOW_SHAPE, ProcessDiagram, toRows, type ProcessDiagramNode } from '@/components/ProcessDiagram'
import { DEFAULT_LOCALE } from '@/utilities/locale'

export type TeamProcessProps = Pick<TeamProcessBlockProps, 'intro' | 'nodes' | 'sectionHeader' | 'statements'> & {
  className?: string
  locale?: Locale
}

export const TeamProcessBlock: React.FC<TeamProcessProps> = ({
  className,
  intro,
  locale = DEFAULT_LOCALE,
  nodes,
  sectionHeader,
  statements,
}) => {
  const nodeRows = nodes ?? []
  const statementRows = statements ?? []
  if (!nodeRows.length) return null

  // Fixed order (config.ts locks six rows): Business Context → Product Decision →
  // {Design ∥ Engineering} → Validation → Learning.
  const diagramNodes: ProcessDiagramNode[] = nodeRows.slice(0, 6).map((node, i) => ({
    active: i === 1,
    annotation: node.annotation ?? undefined,
    index: String(i + 1).padStart(2, '0'),
    label: node.label,
  }))

  return (
    <section className={cn(className)}>
      <SectionHeader {...sectionHeader} className="mb-10 max-md:mb-8 max-md:border-t-0 max-md:pt-0" tagTone="mono" />
      {intro ? (
        <RichText
          className="mb-10 text-body text-ink-2 max-w-measure"
          data={intro}
          enableGutter={false}
          enableProse={false}
          locale={locale}
        />
      ) : null}
      {/* The return rail is the point of this diagram: node 06 says learning feeds the next
          Business Context, and until now nothing drew that edge. ThinkingMap makes no such claim
          and stays open-ended, which also keeps the two diagrams from reading as one picture twice. */}
      <ProcessDiagram className="mx-auto max-w-2xl" loopBack rows={toRows(diagramNodes, FORK_FLOW_SHAPE)} />
      {statementRows.length ? (
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16">
          {statementRows.map((s, i) => (
            <li className="flex flex-col gap-2" key={s.id ?? i}>
              <h3 className="text-small font-medium text-foreground">{s.title}</h3>
              <p className="text-small text-ink-2">{s.description}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

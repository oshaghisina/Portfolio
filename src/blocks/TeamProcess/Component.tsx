import { cn } from '@/utilities/ui'
import React from 'react'

import type { TeamProcessBlock as TeamProcessBlockProps } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import RichText from '@/components/RichText'
import { SectionHeader } from '@/components/SectionHeader'
import { ProcessDiagram, type ProcessDiagramNode } from '@/components/ProcessDiagram'
import { DEFAULT_LOCALE } from '@/utilities/locale'

export type TeamProcessProps = Pick<TeamProcessBlockProps, 'intro' | 'nodes' | 'sectionHeader' | 'statements'> & {
  className?: string
  disableInnerContainer?: boolean
  locale?: Locale
}

// Fixed order: Business Context → Product Decision → Design / Engineering → Validation → Learning.
const POSITIONS: { x: number; y: number }[] = [
  { x: 50, y: 6 },
  { x: 50, y: 30 },
  { x: 22, y: 56 },
  { x: 78, y: 56 },
  { x: 50, y: 80 },
  { x: 50, y: 98 },
]
const CONNECTIONS: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [4, 5],
]

export const TeamProcessBlock: React.FC<TeamProcessProps> = ({
  className,
  disableInnerContainer,
  intro,
  locale = DEFAULT_LOCALE,
  nodes,
  sectionHeader,
  statements,
}) => {
  const nodeRows = nodes ?? []
  const statementRows = statements ?? []
  if (!nodeRows.length) return null

  const diagramNodes: ProcessDiagramNode[] = nodeRows.slice(0, POSITIONS.length).map((node, i) => ({
    ...POSITIONS[i],
    label: node.label,
    annotation: node.annotation ?? undefined,
    active: i === 1,
  }))

  return (
    <section className={cn(!disableInnerContainer && 'container', className)}>
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
      <ProcessDiagram className="mx-auto max-w-2xl" connections={CONNECTIONS} nodes={diagramNodes} />
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

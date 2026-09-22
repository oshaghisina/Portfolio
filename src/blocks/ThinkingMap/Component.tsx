import { cn } from '@/utilities/ui'
import React from 'react'

import type { ThinkingMapBlock as ThinkingMapBlockProps } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import RichText from '@/components/RichText'
import { SectionHeader } from '@/components/SectionHeader'
import { ProcessDiagram, type ProcessDiagramNode } from '@/components/ProcessDiagram'
import { DEFAULT_LOCALE } from '@/utilities/locale'

export type ThinkingMapProps = Pick<ThinkingMapBlockProps, 'intro' | 'nodes' | 'sectionHeader'> & {
  className?: string
  locale?: Locale
}

// Fixed order: Business → Product → User → System → Execution → Learning.
const POSITIONS: { x: number; y: number }[] = [
  { x: 50, y: 8 },
  { x: 50, y: 34 },
  { x: 18, y: 58 },
  { x: 82, y: 58 },
  { x: 50, y: 80 },
  { x: 50, y: 96 },
]
const CONNECTIONS: [number, number][] = [
  [0, 1],
  [2, 1],
  [1, 3],
  [2, 4],
  [3, 4],
  [4, 5],
]

export const ThinkingMapBlock: React.FC<ThinkingMapProps> = ({
  className,
  intro,
  locale = DEFAULT_LOCALE,
  nodes,
  sectionHeader,
}) => {
  const rows = nodes ?? []
  if (!rows.length) return null

  const diagramNodes: ProcessDiagramNode[] = rows.slice(0, POSITIONS.length).map((node, i) => ({
    ...POSITIONS[i],
    label: node.label,
    annotation: node.annotation ?? undefined,
    active: i === 1,
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
      <ProcessDiagram className="mx-auto max-w-2xl" connections={CONNECTIONS} nodes={diagramNodes} />
    </section>
  )
}

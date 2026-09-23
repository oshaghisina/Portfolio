import { cn } from '@/utilities/ui'
import React from 'react'

import type { ThinkingMapBlock as ThinkingMapBlockProps } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import RichText from '@/components/RichText'
import { SectionHeader } from '@/components/SectionHeader'
import { FORK_FLOW_SHAPE, ProcessDiagram, toRows, type ProcessDiagramNode } from '@/components/ProcessDiagram'
import { DEFAULT_LOCALE } from '@/utilities/locale'

export type ThinkingMapProps = Pick<ThinkingMapBlockProps, 'intro' | 'nodes' | 'sectionHeader'> & {
  className?: string
  locale?: Locale
}

export const ThinkingMapBlock: React.FC<ThinkingMapProps> = ({
  className,
  intro,
  locale = DEFAULT_LOCALE,
  nodes,
  sectionHeader,
}) => {
  const rows = nodes ?? []
  if (!rows.length) return null

  // Fixed order (config.ts locks six rows): Business → Product → {User ∥ System} → Execution → Learning.
  const diagramNodes: ProcessDiagramNode[] = rows.slice(0, 6).map((node, i) => ({
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
      <ProcessDiagram className="mx-auto max-w-2xl" rows={toRows(diagramNodes, FORK_FLOW_SHAPE)} />
    </section>
  )
}

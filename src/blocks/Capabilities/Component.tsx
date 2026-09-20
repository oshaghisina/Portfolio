import { cn } from '@/utilities/ui'
import React from 'react'

import type { CapabilitiesBlock as CapabilitiesBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'

export type CapabilitiesProps = Pick<CapabilitiesBlockProps, 'groups' | 'sectionHeader'> & {
  className?: string
  disableInnerContainer?: boolean
}

const NODES = [
  { x: 12, y: 62, label: 'Insight' },
  { x: 50, y: 18, label: 'System', active: true },
  { x: 88, y: 46, label: 'Outcome' },
]

/** Primary Focus: one calm statement plus a small abstract systems diagram, not a catalogue. */
export const CapabilitiesBlock: React.FC<CapabilitiesProps> = ({
  className,
  disableInnerContainer,
  groups,
  sectionHeader,
}) => {
  const focus = (groups ?? [])[0]
  if (!focus) return null

  return (
    <section className={cn(!disableInnerContainer && 'container', className)}>
      <SectionHeader {...sectionHeader} className="mb-10" tagTone="mono" />
      <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-3">
          <span className="index-code text-ink-3">{focus.index}</span>
          <h3 className="mt-3 text-display tracking-display font-medium text-balance text-foreground">
            {focus.title}
          </h3>
          <p className="mt-6 max-w-measure text-lede text-ink-2">{focus.description}</p>
        </div>

        <div aria-hidden className="relative mx-auto aspect-[4/3] w-full max-w-xs lg:col-span-2">
          <svg className="absolute inset-0 h-full w-full" fill="none" viewBox="0 0 100 75">
            <path d="M12 62 L50 18 L88 46" stroke="var(--line)" strokeWidth="0.75" />
          </svg>
          {NODES.map((node) => (
            <div
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
              key={node.label}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <span
                className={cn(
                  'size-2.5 rounded-full',
                  node.active ? 'bg-brand' : 'border border-line bg-background',
                )}
              />
              <span className="eyebrow whitespace-nowrap text-ink-3">{node.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

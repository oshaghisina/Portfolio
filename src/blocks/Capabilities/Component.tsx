import { cn } from '@/utilities/ui'
import React from 'react'

import type { CapabilitiesBlock as CapabilitiesBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'

export type CapabilitiesProps = Pick<CapabilitiesBlockProps, 'groups' | 'sectionHeader'> & {
  className?: string
  disableInnerContainer?: boolean
}

/** Indexed capability catalogue — a matrix of rows, not a grid of equal cards. */
export const CapabilitiesBlock: React.FC<CapabilitiesProps> = ({
  className,
  disableInnerContainer,
  groups,
  sectionHeader,
}) => {
  const rows = groups ?? []
  if (!rows.length) return null

  return (
    <section className={cn(!disableInnerContainer && 'container', className)}>
      <SectionHeader {...sectionHeader} className="mb-10" />
      <ol className="grid grid-cols-1 border-t border-s border-line md:grid-cols-2">
        {rows.map((group, i) => (
          <li className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-e border-line p-6" key={group.id ?? i}>
            <span className="index-code text-ink-3">{group.index}</span>
            <div className="flex flex-col gap-2">
              <h3 className="text-h3 font-medium text-foreground">{group.title}</h3>
              <p className="text-small text-ink-2">{group.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

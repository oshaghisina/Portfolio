import { cn } from '@/utilities/ui'
import { ArrowRight } from 'lucide-react'
import React from 'react'

import type { WorkspaceBlock as WorkspaceBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'

export type WorkspaceProps = Pick<WorkspaceBlockProps, 'sectionHeader' | 'tracks'> & {
  className?: string
  disableInnerContainer?: boolean
}

/** Renders "How I work" as a connected rail of tracks rather than a heading + bullet list. */
export const WorkspaceBlock: React.FC<WorkspaceProps> = ({ className, disableInnerContainer, sectionHeader, tracks }) => {
  const rows = tracks ?? []
  if (!rows.length) return null

  return (
    <section className={cn(!disableInnerContainer && 'container', className)}>
      <SectionHeader {...sectionHeader} className="mb-10" />
      <ol className="grid grid-cols-1 border-t border-s border-line sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((track, i) => (
          <li className="relative flex flex-col gap-3 border-b border-e border-line p-6" key={track.id ?? i}>
            <span className="index-code text-ink-3">{track.code}</span>
            <h3 className="text-h3 font-medium text-foreground">{track.label}</h3>
            <p className="text-small text-ink-2">{track.description}</p>
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

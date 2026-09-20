import { cn } from '@/utilities/ui'
import React from 'react'

import type { ExperienceCatalogueBlock as ExperienceCatalogueBlockProps } from '@/payload-types'

import { ExperienceGrid } from '@/components/ExperienceGrid'
import { SectionHeader } from '@/components/SectionHeader'

export type ExperienceCatalogueProps = Pick<ExperienceCatalogueBlockProps, 'items' | 'sectionHeader'> & {
  className?: string
  disableInnerContainer?: boolean
}

/** Typographic employer catalogue — no CV bullet list. */
export const ExperienceCatalogueBlock: React.FC<ExperienceCatalogueProps> = ({
  className,
  disableInnerContainer,
  items,
  sectionHeader,
}) => {
  const rows = items ?? []
  if (!rows.length) return null

  return (
    <section className={cn(!disableInnerContainer && 'container', className)}>
      <SectionHeader {...sectionHeader} className="mb-10" tagTone="mono" />
      <ExperienceGrid
        items={rows.map((item) => ({
          index: item.index,
          name: item.name,
          role: item.role,
          blurb: item.blurb,
        }))}
      />
    </section>
  )
}

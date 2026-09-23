import { cn } from '@/utilities/ui'
import React from 'react'

import type { ExperienceCatalogueBlock as ExperienceCatalogueBlockProps } from '@/payload-types'

import { ExperienceGrid } from '@/components/ExperienceGrid'
import { SectionHeader } from '@/components/SectionHeader'

import { CompanyLogo } from './CompanyLogo'

export type ExperienceCatalogueProps = Pick<
  ExperienceCatalogueBlockProps,
  'items' | 'sectionHeader'
> & {
  className?: string
}

/** Employer catalogue — names primary; optional mono logos as secondary markers. */
export const ExperienceCatalogueBlock: React.FC<ExperienceCatalogueProps> = ({
  className,
  items,
  sectionHeader,
}) => {
  const rows = items ?? []
  if (!rows.length) return null

  return (
    <section className={cn(className)}>
      <SectionHeader {...sectionHeader} className="mb-6 max-md:mb-6 max-md:border-t-0 max-md:pt-0" tagTone="mono" />
      <ExperienceGrid
        items={rows.map((item) => ({
          index: item.index,
          name: item.name,
          role: item.role,
          blurb: item.blurb,
          logo: item.companyKey ? <CompanyLogo companyKey={item.companyKey} /> : undefined,
        }))}
      />
    </section>
  )
}

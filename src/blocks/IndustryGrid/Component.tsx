import React from 'react'
import type { IndustryGridBlock } from '@/payload-types'
import { SectionHeader } from '@/components/SectionHeader'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'
import { industryHeaders, industryLabels, isIndustryKey } from './catalogue'
import { IndustryIllustration } from './Illustrations'

export function IndustryGridBlock({
  className,
  industries,
  locale = DEFAULT_LOCALE,
  sectionHeader,
}: IndustryGridBlock & { className?: string; locale?: Locale }) {
  const rows = (industries ?? [])
    .filter((row) => isIndustryKey(row.key))
    .filter((row, index, all) => all.findIndex((other) => other.key === row.key) === index)
  if (!rows.length) return null
  const header = { ...industryHeaders[locale], ...sectionHeader }
  return (
    <section
      className={cn('industry-section', className)}
      aria-label={`${header.lead} ${header.tail}`}
    >
      <SectionHeader lead={header.lead} tail={header.tail} className="mb-8" />
      <ul className="industry-grid" data-reveal-group="">
        {rows.map(({ key, id }) => (
          <li className="industry-window" key={id ?? key}>
            <IndustryIllustration industry={key} />
            <h3 className="industry-name">{industryLabels[locale][key]}</h3>
          </li>
        ))}
      </ul>
    </section>
  )
}

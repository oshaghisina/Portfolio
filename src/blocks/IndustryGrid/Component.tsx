import React from 'react'
import type { IndustryGridBlock } from '@/payload-types'
import { SectionHeader } from '@/components/SectionHeader'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'
import { industryHeaders, isIndustryKey, type IndustryKey } from './catalogue'
import { IndustryTracks } from './IndustryTracks.client'

export function IndustryGridBlock({
  className,
  industries,
  locale = DEFAULT_LOCALE,
  sectionHeader,
}: IndustryGridBlock & { className?: string; locale?: Locale }) {
  const rows = (industries ?? [])
    .filter((row): row is { key: IndustryKey; id?: string | null } => isIndustryKey(row.key))
    .filter((row, index, all) => all.findIndex((other) => other.key === row.key) === index)
    .map(({ key, id }) => ({ key, id }))

  if (!rows.length) return null
  const header = { ...industryHeaders[locale], ...sectionHeader }

  return (
    <section
      className={cn('industry-section', className)}
      aria-label={`${header.lead} ${header.tail}`}
    >
      <SectionHeader lead={header.lead} tail={header.tail} className="mb-8" />
      <IndustryTracks locale={locale} rows={rows} />
    </section>
  )
}

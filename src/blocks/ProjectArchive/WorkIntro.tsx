import React from 'react'

import type { SectionHeaderField } from '@/payload-types'

import { PageOpener } from '@/components/PageOpener'
import { TwoTone } from '@/components/TwoTone'
import type { Locale } from '@/utilities/locale'
import { pluralCopy, uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

export interface WorkIntroProps {
  sectionHeader?: SectionHeaderField | null
  projectCount: number
  companyCount: number
  locale: Locale
  className?: string
}

/**
 * The archive's page opener: the shared opening gesture, with one factual count line computed
 * from what is actually published in this locale (never a hand-typed number) standing in for the
 * homepage's console panel.
 */
export const WorkIntro: React.FC<WorkIntroProps> = ({
  className,
  companyCount,
  locale,
  projectCount,
  sectionHeader,
}) => {
  const copy = uiCopy[locale]
  const { lead, lede, tag, tail } = sectionHeader ?? {}

  return (
    <PageOpener
      compact
      aside={
        projectCount > 0 ? (
          <p className="index-code flex flex-wrap items-baseline gap-x-3 gap-y-1 lg:flex-col lg:items-end lg:gap-y-2">
            <span>{pluralCopy(locale, copy.workProjects, projectCount)}</span>
            {companyCount > 0 ? (
              <>
                <span aria-hidden className="lg:hidden">
                  ·
                </span>
                <span>{pluralCopy(locale, copy.workCompanies, companyCount)}</span>
              </>
            ) : null}
          </p>
        ) : null
      }
      asideAlign="end"
      className={className}
      eyebrow={tag}
      lede={lede}
      titleSlot={
        lead ? (
          <TwoTone as="h1" className={cn(tag && 'mt-4')} lead={lead} size="display" tail={tail} />
        ) : null
      }
    />
  )
}

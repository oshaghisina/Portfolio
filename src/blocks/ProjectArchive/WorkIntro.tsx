import React from 'react'

import type { SectionHeaderField } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'
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
 * The page opener — an internal page, not another landing hero: roughly half a viewport, the
 * statement pushed to the bottom of that space, and one factual count line computed from what is
 * actually published in this locale (never a hand-typed number).
 */
export const WorkIntro: React.FC<WorkIntroProps> = ({ className, companyCount, locale, projectCount, sectionHeader }) => {
  const copy = uiCopy[locale]

  return (
    <header className={cn('flex min-h-[40svh] flex-col justify-end lg:min-h-[48vh]', className)}>
      <SectionHeader {...sectionHeader} as="h1" tagTone="mono" />
      {projectCount > 0 ? (
        <p className="index-code mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span>{pluralCopy(locale, copy.workProjects, projectCount)}</span>
          {companyCount > 0 ? (
            <>
              <span aria-hidden>·</span>
              <span>{pluralCopy(locale, copy.workCompanies, companyCount)}</span>
            </>
          ) : null}
        </p>
      ) : null}
    </header>
  )
}

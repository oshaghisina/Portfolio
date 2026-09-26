import React from 'react'

import type { SectionHeaderField } from '@/payload-types'
import { WrittenHeadline } from '@/components/WrittenHeadline'
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

/** A compact opening puts the complete collection within reach of the first viewport. */
export function WorkIntro({
  className,
  companyCount,
  locale,
  projectCount,
  sectionHeader,
}: WorkIntroProps) {
  const copy = uiCopy[locale]
  const { lead, lede, tag, tail } = sectionHeader ?? {}
  return (
    <header className={cn('work-intro', className)} data-hero-entrance="" data-reveal-skip="">
      <div>
        <p className="eyebrow text-ink-3" data-hero-eyebrow="">
          {tag || copy.workArchiveTag}
        </p>
        <WrittenHeadline
          className="work-intro-title font-medium text-foreground"
          locale={locale}
          tones={[
            { text: lead || copy.workIndexTitle },
            ...(tail ? [{ text: tail, className: 'text-ink-3' }] : []),
          ]}
        />
      </div>
      <div className="work-intro-support" data-hero-supporting="">
        {lede ? <p className="text-body text-ink-2">{lede}</p> : null}
        {projectCount > 0 ? (
          <p className="work-intro-counts text-caption">
            <span>{pluralCopy(locale, copy.workProjects, projectCount)}</span>
            {companyCount > 0 ? (
              <span>{pluralCopy(locale, copy.workCompanies, companyCount)}</span>
            ) : null}
          </p>
        ) : null}
      </div>
    </header>
  )
}

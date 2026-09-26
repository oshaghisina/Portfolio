import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Project } from '@/payload-types'

import type { CaseStudyCopy } from '@/components/CaseStudy/copy'
import { projectUrl } from '@/i18n/routes'
import type { Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

export type MoreFromDoc = Pick<Project, 'id' | 'slug' | 'title' | 'summary'> &
  Partial<Pick<Project, 'statement'>>

export interface MoreFromProps {
  company: string
  /** The other published case studies from the same company, in archive order. */
  projects: MoreFromDoc[]
  locale: Locale
  copy: CaseStudyCopy
  className?: string
}

/** Below this many siblings the Next-project card already says everything. */
export const MORE_FROM_MIN = 2

/**
 * The company's other case studies as a short hairline ledger — the same grammar as the /work
 * index (index code, title carrying the weight, one quiet line) — so a body of work from one
 * employer reads as a set rather than as unrelated pages. Renders nothing for a lone study.
 */
export const MoreFrom: React.FC<MoreFromProps> = ({ className, company, copy, locale, projects }) => {
  if (projects.length < MORE_FROM_MIN) return null
  const heading = copy.moreFrom.replace('{company}', company)

  return (
    <nav aria-label={heading} className={cn('flex flex-col', className)}>
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
        <h2 className="eyebrow text-foreground">{heading}</h2>
        <span className="index-code text-ink-3">{projects.length}</span>
      </div>
      <ol>
        {projects.map((project, index) => (
          <li className="border-b border-line" key={project.id}>
            <Link
              className="group grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-4 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:py-5"
              href={projectUrl(project, locale)}
            >
              <span className="index-code text-ink-3">{String(index + 1).padStart(2, '0')}</span>
              <span className="flex flex-col gap-1">
                <span className="font-medium text-foreground transition-colors duration-(--duration-fast) group-hover:text-brand">
                  {project.title}
                </span>
                <span className="max-w-measure text-ink-2">{project.statement || project.summary}</span>
              </span>
              <ArrowRight
                aria-hidden
                className="size-3.5 self-center text-ink-3 transition-colors duration-(--duration-fast) group-hover:text-foreground rtl:-scale-x-100"
              />
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

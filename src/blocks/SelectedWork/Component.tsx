import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { SelectedWorkBlock as SelectedWorkBlockProps } from '@/payload-types'

import { kindLabels } from '@/collections/Projects/kinds'
import { ProjectCover } from '@/components/ProjectCover'
import { SectionHeader } from '@/components/SectionHeader'
import { localePath } from '@/i18n/navigation'
import { hasPublicCaseStudy, projectUrl, WORK_PATH } from '@/i18n/routes'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

export type SelectedWorkProps = Pick<SelectedWorkBlockProps, 'project' | 'sectionHeader'> & {
  className?: string
  disableInnerContainer?: boolean
  locale?: Locale
}

/**
 * Featured Project: one large full-canvas visual event, not a multi-project grid. On phones the
 * media runs at 4/3 and the block owns the page's second long silence through its bottom padding.
 *
 * The whole composition is one link: into the case study when one is published, otherwise into
 * the `/work` archive — the homepage feature always leads to the evidence layer.
 */
export const SelectedWorkBlock: React.FC<SelectedWorkProps> = ({
  className,
  disableInnerContainer,
  locale = DEFAULT_LOCALE,
  project,
  sectionHeader,
}) => {
  // An unpopulated id means the project isn't published in this locale (access control leaves
  // the relationship as a bare id) — render nothing rather than an English fallback.
  if (!project || typeof project !== 'object') return null

  const copy = uiCopy[locale]
  const kinds = kindLabels(project.kind, locale)
  const caseStudy = hasPublicCaseStudy(project)
  const href = caseStudy ? projectUrl(project, locale) : localePath(locale, WORK_PATH)
  const meta = [project.company, project.role, ...kinds].filter(Boolean)

  return (
    <section
      className={cn(!disableInnerContainer && 'container', 'pb-[110svh] md:pb-[64vh] lg:pb-[76vh]', className)}
      id="selected-work"
    >
      <SectionHeader {...sectionHeader} className="mb-10" tagTone="brand" />
      <Link className="group flex flex-col gap-8 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring" href={href}>
        <ProjectCover
          aspect="wide"
          figure="Figure 01"
          kinds={kinds}
          pendingLabel={copy.workMediaPending}
          resource={project.cover}
          size="(min-width: 1024px) 78vw, 100vw"
        />
        <div className="flex flex-col gap-3">
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
            <span className="index-code text-ink-3">01</span>
            <h3 className="text-h3 font-medium text-foreground transition-colors duration-(--duration-fast) group-hover:text-brand md:text-h2">
              {project.title}
            </h3>
          </div>
          {meta.length ? (
            <p className="eyebrow flex flex-wrap gap-x-3 gap-y-1 text-ink-3">
              {meta.map((item, i) => (
                <span key={i}>
                  {item}
                  {i < meta.length - 1 ? <span aria-hidden> ·</span> : null}
                </span>
              ))}
            </p>
          ) : null}
        </div>
        <p className="max-w-measure text-body text-ink-2">{project.summary}</p>
        <span className="eyebrow inline-flex items-center gap-2 text-foreground transition-colors duration-(--duration-fast) group-hover:text-brand">
          {caseStudy ? copy.workCaseStudy : copy.workIndexTitle}
          <ArrowRight aria-hidden className="size-3.5 rtl:-scale-x-100" />
        </span>
      </Link>
    </section>
  )
}

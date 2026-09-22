import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Project } from '@/payload-types'

import { projectYear } from '@/blocks/ProjectArchive/rows'
import { kindLabels } from '@/collections/Projects/kinds'
import { ProjectMeta, type ProjectMetaKey, type ProjectMetaValue } from '@/components/ProjectMeta'
import { localePath } from '@/i18n/navigation'
import { WORK_PATH } from '@/i18n/routes'
import type { Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

import type { CaseStudyCopy } from './copy'

export interface CaseStudyHeaderProps {
  project: Project
  locale: Locale
  copy: CaseStudyCopy
  className?: string
}

/** The header's compact fact list — fixed order (DS-17), empty facts skipped, nothing fabricated. */
export function headerMeta(
  project: Project,
  locale: Locale,
  copy: CaseStudyCopy,
): Partial<Record<ProjectMetaKey, ProjectMetaValue>> {
  const kinds = kindLabels(project.kind, locale)
  let link: ProjectMetaValue = null
  if (project.liveUrl) {
    try {
      link = {
        href: project.liveUrl,
        label: new URL(project.liveUrl).hostname.replace(/^www\./, ''),
      }
    } catch {
      link = { href: project.liveUrl, label: project.liveUrl }
    }
  }
  return {
    company: project.company,
    role: project.role,
    period: projectYear(project.period),
    type: kinds.length ? kinds.join(' · ') : null,
    industry: project.industry,
    team: project.team,
    status: project.projectStatus ? copy.status[project.projectStatus] : null,
    tools: project.tools ?? [],
    link,
  }
}

/**
 * Opening composition: a quiet way back, the editorial title with its one-line positioning
 * statement on the left, and the structured project facts on the right — set as hairline rows,
 * not a card. On phones everything stacks in the same order with the facts in two columns.
 */
export const CaseStudyHeader: React.FC<CaseStudyHeaderProps> = ({
  className,
  copy,
  locale,
  project,
}) => (
  <header className={cn('grid gap-10 lg:grid-cols-12 lg:gap-x-16', className)}>
    <div className="flex flex-col gap-6 lg:col-span-7">
      <Link
        className="eyebrow inline-flex items-center gap-2 self-start text-ink-3 transition-colors duration-(--duration-fast) hover:text-foreground"
        href={localePath(locale, WORK_PATH)}
      >
        <ArrowLeft aria-hidden className="size-3.5 rtl:-scale-x-100" />
        {copy.allWork}
      </Link>
      <h1 className="text-display font-medium text-balance text-foreground">{project.title}</h1>
      <p className="max-w-measure text-lede text-ink-2">{project.statement || project.summary}</p>
    </div>
    <ProjectMeta
      className="lg:col-span-4 lg:col-start-9 lg:self-end"
      locale={locale}
      values={headerMeta(project, locale, copy)}
      variant="compact"
    />
  </header>
)

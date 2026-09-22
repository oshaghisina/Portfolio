import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Project } from '@/payload-types'

import { projectYear } from '@/blocks/ProjectArchive/rows'
import { kindLabels } from '@/collections/Projects/kinds'
import { PageOpener } from '@/components/PageOpener'
import { ProjectMeta, type ProjectMetaKey, type ProjectMetaValue } from '@/components/ProjectMeta'
import { localePath } from '@/i18n/navigation'
import { WORK_PATH } from '@/i18n/routes'
import type { Locale } from '@/utilities/locale'

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
 * Opening composition: the shared page opener, with a quiet way back above the eyebrow and the
 * structured project facts standing in for the homepage's console — set as hairline rows, not a
 * card. On phones everything stacks in the same order with the facts in two columns.
 */
export const CaseStudyHeader: React.FC<CaseStudyHeaderProps> = ({
  className,
  copy,
  locale,
  project,
}) => (
  <PageOpener
    aside={
      <ProjectMeta
        className="w-full shrink-0 lg:w-[20rem]"
        locale={locale}
        values={headerMeta(project, locale, copy)}
        variant="compact"
      />
    }
    asideAlign="start"
    before={
      <Link
        className="eyebrow mb-6 inline-flex items-center gap-2 text-ink-3 transition-colors duration-(--duration-fast) hover:text-foreground"
        href={localePath(locale, WORK_PATH)}
      >
        <ArrowLeft aria-hidden className="size-3.5 rtl:-scale-x-100" />
        {copy.allWork}
      </Link>
    }
    className={className}
    lede={project.statement || project.summary}
    title={project.title}
  />
)

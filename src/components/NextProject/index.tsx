import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Project } from '@/payload-types'

import { kindLabels } from '@/collections/Projects/kinds'
import type { CaseStudyCopy } from '@/components/CaseStudy/copy'
import { ProjectCover } from '@/components/ProjectCover'
import { projectMedia } from '@/components/ProjectCover/media'
import { localePath } from '@/i18n/navigation'
import { projectUrl, WORK_PATH } from '@/i18n/routes'
import type { Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

export type NextProjectDoc = Pick<Project, 'slug' | 'title' | 'summary' | 'kind'> &
  Partial<Pick<Project, 'statement' | 'cover' | 'hero'>>

export interface NextProjectProps {
  /** The project to hand over to; `null` renders only the way back to the archive. */
  project: NextProjectDoc | null
  locale: Locale
  copy: CaseStudyCopy
  /** Localised "Project media pending" for the cover plate (from `uiCopy`). */
  pendingLabel: string
  className?: string
}

/**
 * DS-28 next-case card: the case study hands the reader straight into another argument —
 * NEXT PROJECT, title, positioning line, "read" cue and the project's cover — one link, hairline
 * frame, no hover theatre. A quiet "All work" line underneath is the way back to the archive.
 */
export const NextProject: React.FC<NextProjectProps> = ({
  className,
  copy,
  locale,
  pendingLabel,
  project,
}) => (
  <aside aria-label={copy.nextProject} className={cn('flex flex-col gap-8', className)}>
    {project ? (
      <Link
        className="group grid gap-8 border border-line p-6 outline-none transition-colors duration-(--duration-fast) hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:grid-cols-12 md:gap-x-12 md:p-10"
        href={projectUrl(project, locale)}
      >
        <div className="flex flex-col gap-4 md:col-span-7">
          <span className="eyebrow text-ink-3">{copy.nextProject}</span>
          <h2 className="text-h2 font-medium text-balance text-foreground transition-colors duration-(--duration-fast) group-hover:text-brand">
            {project.title}
          </h2>
          <p className="max-w-measure text-lede text-ink-2">
            {project.statement || project.summary}
          </p>
          <span className="mt-auto inline-flex items-center gap-2 pt-4 eyebrow text-foreground">
            {copy.explore}
            <ArrowRight aria-hidden className="size-3.5 rtl:-scale-x-100" />
          </span>
        </div>
        <ProjectCover
          aspect="tall"
          className="md:col-span-5"
          kinds={kindLabels(project.kind, locale)}
          pendingLabel={pendingLabel}
          resource={projectMedia(project)}
          size="(min-width: 768px) 39vw, 100vw"
        />
      </Link>
    ) : null}
    <Link
      className={cn(
        'eyebrow inline-flex items-center gap-2 self-start text-ink-3 transition-colors duration-(--duration-fast) hover:text-foreground',
        !project && 'w-full border-t border-line pt-8',
      )}
      href={localePath(locale, WORK_PATH)}
    >
      <ArrowLeft aria-hidden className="size-3.5 rtl:-scale-x-100" />
      {copy.allWork}
    </Link>
  </aside>
)

import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Project, WorkMosaicBlock } from '@/payload-types'

import { kindLabels } from '@/collections/Projects/kinds'
import { ProjectCover } from '@/components/ProjectCover'
import { projectMedia } from '@/components/ProjectCover/media'
import { projectLink, type ProjectLink } from '@/blocks/ProjectArchive/rows'
import type { Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

import { MOSAIC, type MosaicSize } from './sizes'

export type MosaicItem = NonNullable<WorkMosaicBlock['items']>[number]

export interface MosaicTileProps {
  project: Project
  size: MosaicSize
  mediaOverride?: MosaicItem['mediaOverride']
  /** Position in the mosaic, zero-padded: "01". Latin ornament (DS-10). */
  index: string
  locale: Locale
  className?: string
}

/**
 * What this tile shows: an explicit override, else the project's own lead visual. Never the
 * media's aspect ratio — the slot's geometry comes from the size alone.
 */
const tileMedia = (project: Project, override: MosaicItem['mediaOverride']) =>
  override && typeof override === 'object' ? override : projectMedia(project)

/** One link around the whole cell when the project leads somewhere; a plain article otherwise. */
const Shell: React.FC<{
  link: ProjectLink | null
  className: string
  label: string
  children: React.ReactNode
}> = ({ children, className, label, link }) => {
  if (!link) return <article className={className}>{children}</article>
  const focus =
    'outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring'
  return link.external ? (
    <a className={cn(className, focus)} href={link.href} rel="noopener noreferrer" target="_blank">
      {children}
      <span className="sr-only">{label}</span>
    </a>
  ) : (
    <Link className={cn(className, focus)} href={link.href}>
      {children}
    </Link>
  )
}

/**
 * A cell in the mosaic, not a card. The parent grid rules every edge, so the tile carries only
 * the two hairlines it owns — its top and its inline-start — and no background, radius or shadow
 * of its own. Media runs to the cell's edges and meets those rules directly; only the text is
 * inset. Everything that varies by size comes from the `MOSAIC` table.
 */
export const MosaicTile: React.FC<MosaicTileProps> = ({
  className,
  index,
  locale,
  mediaOverride,
  project,
  size,
}) => {
  const copy = uiCopy[locale]
  const geometry = MOSAIC[size]
  const kinds = kindLabels(project.kind, locale)
  const link = projectLink(project, locale)

  const meta = [
    project.company,
    geometry.showRole ? project.role : null,
    ...(geometry.showKinds ? kinds : []),
  ].filter(Boolean) as string[]

  const Arrow = link?.external ? ArrowUpRight : ArrowRight

  return (
    <Shell
      className={cn(
        'group relative flex min-w-0 flex-col border-t border-s border-line',
        geometry.span,
        className,
      )}
      label={copy.opensInNewTab}
      link={link}
    >
      <ProjectCover
        aspect={geometry.aspect}
        bordered={false}
        figure={geometry.plateDetail ? `Figure ${index}` : null}
        kinds={geometry.plateDetail ? kinds : []}
        pendingLabel={copy.workMediaPending}
        resource={tileMedia(project, mediaOverride)}
        size={geometry.imageSizes}
      />
      <div className={cn('flex min-w-0 flex-1 flex-col', geometry.pad, geometry.gap)}>
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
          <span className="index-code text-ink-3" dir="ltr">
            {index}
          </span>
          <h3
            className={cn(
              'font-medium text-foreground transition-colors duration-(--duration-fast) group-hover:text-brand motion-reduce:transition-none',
              geometry.title,
            )}
          >
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
        {geometry.summary ? <p className={geometry.summary}>{project.summary}</p> : null}
        {link ? (
          <span
            className={cn(
              'eyebrow mt-auto inline-flex items-center gap-2 pt-2 text-foreground transition-colors duration-(--duration-fast) group-hover:text-brand motion-reduce:transition-none',
              !geometry.showCtaLabel && 'ms-auto',
            )}
          >
            {geometry.showCtaLabel ? (link.external ? copy.workLive : copy.workCaseStudy) : null}
            <Arrow aria-hidden className="size-3.5 rtl:-scale-x-100" />
          </span>
        ) : null}
      </div>
    </Shell>
  )
}

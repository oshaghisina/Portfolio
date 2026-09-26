import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import type { Project, WorkMosaicBlock } from '@/payload-types'
import { kindLabels } from '@/collections/Projects/kinds'
import { projectLink, projectYear, type ProjectLink } from '@/blocks/ProjectArchive/rows'
import type { Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'
import { MosaicCover } from './Cover'
import { isFeaturedSize, type MosaicSize } from './sizes'

export type MosaicItem = NonNullable<WorkMosaicBlock['items']>[number]
export interface MosaicTileProps {
  project: Project
  size: MosaicSize
  mediaOverride?: MosaicItem['mediaOverride']
  index: string
  locale: Locale
  className?: string
}

/** One focus stop per project, and no dead links for unpublished studies. */
const Shell: React.FC<{
  link: ProjectLink | null
  className: string
  label: string
  size: MosaicSize
  slug: string
  children: React.ReactNode
}> = ({ children, className, label, link, size, slug }) => {
  const props = { className, 'data-size': size, 'data-project': slug, 'data-reveal-unit': '' }
  if (!link) return <article {...props}>{children}</article>
  return link.external ? (
    <a {...props} href={link.href} rel="noopener noreferrer" target="_blank">
      {children}
      <span className="sr-only">{label}</span>
    </a>
  ) : (
    <Link {...props} href={link.href}>
      {children}
    </Link>
  )
}

export const MosaicTile: React.FC<MosaicTileProps> = ({
  className,
  index,
  locale,
  mediaOverride,
  project,
  size,
}) => {
  const copy = uiCopy[locale]
  const featured = isFeaturedSize(size)
  const kinds = kindLabels(project.kind, locale)
  const link = projectLink(project, locale)
  const year = projectYear(project.period, locale)
  const Arrow = link?.external ? ArrowUpRight : ArrowRight
  return (
    <Shell
      className={cn('work-story', featured ? 'work-story-featured' : 'work-story-note', className)}
      label={copy.opensInNewTab}
      link={link}
      size={size}
      slug={project.slug}
    >
      <MosaicCover project={project} override={mediaOverride} featured={featured} />
      <div className="work-story-copy">
        <div className="work-story-meta">
          <span className="index-code" dir="ltr">
            {index}
          </span>
          <span>{project.company}</span>
          {year ? (
            <span className="work-story-year" dir="auto">
              {year}
            </span>
          ) : null}
        </div>
        <h3 className="work-story-title">{project.title}</h3>
        {kinds.length ? <p className="work-story-kinds">{kinds.join(' / ')}</p> : null}
        {/* Notes without a public destination need enough context to stand on their own. */}
        {featured || size === 'medium' || !link ? (
          <p className="work-story-summary">{project.summary}</p>
        ) : null}
        {featured && project.role ? <p className="work-story-role">{project.role}</p> : null}
        {link ? (
          <span className="work-story-cta">
            <span>{link.external ? copy.workLive : copy.workCaseStudy}</span>
            <Arrow aria-hidden className="size-4 rtl:-scale-x-100" />
          </span>
        ) : null}
      </div>
    </Shell>
  )
}

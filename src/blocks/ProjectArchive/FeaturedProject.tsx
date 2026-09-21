import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Project } from '@/payload-types'

import { kindLabels } from '@/collections/Projects/kinds'
import { ProjectCover } from '@/components/ProjectCover'
import type { Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

import { projectLink, projectYear, type ProjectLink } from './rows'

export type FeaturedVariant = 'primary' | 'split' | 'split-reverse'

export interface FeaturedProjectProps {
  project: Project
  /** Position among the featured projects, e.g. "01". */
  index: string
  variant: FeaturedVariant
  locale: Locale
  className?: string
}

/** One link element around the whole chapter when the project leads somewhere; a plain article otherwise. */
const Shell: React.FC<{ link: ProjectLink | null; className: string; children: React.ReactNode; label: string }> = ({
  children,
  className,
  label,
  link,
}) => {
  if (!link) return <article className={className}>{children}</article>
  const focus = 'group outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring'
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
 * A project chapter, not a card: media as evidence, then index code, title, tiny metadata and a
 * short summary. `primary` runs the cover across the whole canvas; the two `split` variants put
 * a tall cover beside the text and mirror each other so the page reads large → medium → medium.
 * Column starts are logical, so RTL mirrors without any `rtl:` overrides.
 */
export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ className, index, locale, project, variant }) => {
  const copy = uiCopy[locale]
  const kinds = kindLabels(project.kind, locale)
  const link = projectLink(project, locale)
  const year = projectYear(project.period)
  const meta = [project.company, year, project.role, ...kinds].filter(Boolean) as string[]
  const primary = variant === 'primary'

  const cover = (
    <ProjectCover
      aspect={primary ? 'wide' : 'tall'}
      className={cn(!primary && 'lg:col-span-6', variant === 'split-reverse' && 'lg:col-start-7')}
      figure={`Figure ${index}`}
      kinds={kinds}
      pendingLabel={copy.workMediaPending}
      priority={primary}
      resource={project.cover}
      size={primary ? '(min-width: 1024px) 80vw, 100vw' : '(min-width: 1024px) 40vw, 100vw'}
    />
  )

  const text = (
    <div
      className={cn(
        'flex flex-col gap-4',
        !primary && 'lg:col-span-5 lg:self-end',
        variant === 'split' && 'lg:col-start-8',
        variant === 'split-reverse' && 'lg:col-start-1 lg:row-start-1',
      )}
    >
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
        <span className="index-code text-ink-3">{index}</span>
        <h2
          className={cn(
            'font-medium text-balance text-foreground transition-colors duration-(--duration-fast)',
            primary ? 'text-h2 tracking-h2 md:text-h1 md:tracking-h1' : 'text-h3 tracking-h3 md:text-h2 md:tracking-h2',
            link && 'group-hover:text-brand',
          )}
        >
          {project.title}
        </h2>
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
      <p className="max-w-measure text-body text-ink-2">{project.summary}</p>
      {link ? (
        <span className="eyebrow inline-flex items-center gap-2 text-foreground transition-colors duration-(--duration-fast) group-hover:text-brand">
          {link.external ? copy.workLive : copy.workCaseStudy}
          {link.external ? (
            <ArrowUpRight aria-hidden className="size-3.5 rtl:-scale-x-100" />
          ) : (
            <ArrowRight aria-hidden className="size-3.5 rtl:-scale-x-100" />
          )}
        </span>
      ) : null}
    </div>
  )

  return (
    <Shell
      className={cn(primary ? 'flex flex-col gap-8' : 'grid gap-8 lg:grid-cols-12 lg:gap-x-16', className)}
      label={copy.opensInNewTab}
      link={link}
    >
      {cover}
      {text}
    </Shell>
  )
}

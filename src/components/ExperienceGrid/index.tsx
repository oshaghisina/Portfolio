import { cn } from '@/utilities/ui'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

/**
 * DS-20 typographic employer grid: names set in type, no logos — the answer to the
 * `logoWall` candidate. Presentational; the `experienceGrid` block arrives with the
 * `experiences` collection. Compact 5-up matrix on desktop — whitespace, not a ruled
 * grid, does the separating; on phones each employer is one editorial entry (no index, a soft
 * hairline between entries).
 */
export interface ExperienceGridItem {
  index: string
  name: string
  role: string
  blurb?: string | null
  href?: string | null
  /** e.g. "3 projects" — rendered as the link label */
  linkLabel?: string | null
}

export interface ExperienceGridProps {
  items: ExperienceGridItem[]
  className?: string
}

export const ExperienceGrid: React.FC<ExperienceGridProps> = ({ className, items }) => {
  if (!items.length) return null

  return (
    <ol
      className={cn(
        'grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5',
        className,
      )}
    >
      {items.map((item) => (
        <li className="flex min-w-0 flex-col gap-2" key={item.index + item.name}>
          <span className="index-code hidden sm:inline">{item.index}</span>
          <h3 className="text-h3 tracking-h3 font-medium text-foreground">
            {item.href ? (
              <Link className="hover:text-brand transition-colors duration-(--duration-fast)" href={item.href}>
                {item.name}
              </Link>
            ) : (
              item.name
            )}
          </h3>
          <span className="eyebrow">{item.role}</span>
          {item.blurb ? <p className="text-small text-ink-2">{item.blurb}</p> : null}
          {item.href && item.linkLabel ? (
            <Link className="mt-auto inline-flex items-center gap-1 text-small text-foreground hover:text-brand" href={item.href}>
              {item.linkLabel}
              <ArrowUpRight aria-hidden className="size-3.5 rtl:-scale-x-100" />
            </Link>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

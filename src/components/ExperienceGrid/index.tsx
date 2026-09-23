import { cn } from '@/utilities/ui'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

/**
 * DS-20 typographic employer grid: names remain primary; optional mono logos are secondary
 * markers (D-032). Presentational — the `experienceCatalogue` block (and the `/design` demo)
 * supply the rows. A continuous ruled matrix at every breakpoint — the parent grid paints every
 * separator (`gap-px` on a `bg-line` surface), cells never carry their own border/background.
 *
 * Columns are 1 → 2 → 4 (base / sm / lg). At `lg`, leftover last-row cells span so `bg-line`
 * never paints as a solid empty block.
 */
export interface ExperienceGridItem {
  index: string
  name: string
  role: string
  blurb?: string | null
  href?: string | null
  /** e.g. "3 projects" — rendered as the link label */
  linkLabel?: string | null
  /** Optional brand mark slot — keep presentational; callers pass the node. */
  logo?: React.ReactNode
}

export interface ExperienceGridProps {
  items: ExperienceGridItem[]
  className?: string
}

const CELL_SPAN =
  'sm:[&:last-child:nth-child(2n+1)]:col-span-2 lg:[&:last-child:nth-child(4n+1)]:col-span-4 lg:[&:nth-last-child(2):nth-child(4n+1)]:col-span-2 lg:[&:last-child:nth-child(4n+2)]:col-span-2 lg:[&:last-child:nth-child(4n+3)]:col-span-2'

export const ExperienceGrid: React.FC<ExperienceGridProps> = ({ className, items }) => {
  if (!items.length) return null

  return (
    <ol
      className={cn(
        'grid grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {items.map((item) => (
        <li
          className={cn(
            'group flex min-w-0 flex-col gap-2 bg-paper p-6 lg:p-8',
            CELL_SPAN,
          )}
          key={item.index + item.name}
        >
          <div className="flex min-h-8 items-center justify-between gap-4">
            <span className="index-code">{item.index}</span>
            {item.logo ?? null}
          </div>
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

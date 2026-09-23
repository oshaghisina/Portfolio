import { cn } from '@/utilities/ui'
import React from 'react'

import { TwoTone } from '@/components/TwoTone'

/**
 * DS-12 section opener: a hairline rule, a brand tag sitting on it (a real element — it
 * is localised and read aloud, unlike pleurat's ::before), a two-tone heading and a lede.
 * Logical `start-*` so the tag mirrors in RTL.
 *
 * `tagTone="mono"` renders the same tag text as a plain inline eyebrow kicker instead of the
 * filled brand pill — used to keep the solid chip reserved for one flagship section instead of
 * repeating it down every section on a page.
 */
export interface SectionHeaderProps {
  /**
   * Optional trailing element — a link, usually — placed under the lede in the same column, so a
   * section can offer a way onward without inventing its own header layout. Rendered as a sibling
   * of the lede rather than a wrapper around it: with `action` undefined the markup is unchanged
   * for every other caller.
   */
  action?: React.ReactNode
  tag?: string | null
  lead?: string | null
  tail?: string | null
  lede?: string | null
  /** Optional index code before the tag, e.g. "02" */
  index?: string | null
  as?: 'h1' | 'h2'
  id?: string
  className?: string
  tagTone?: 'brand' | 'mono'
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  action,
  as = 'h2',
  className,
  id,
  index,
  lead,
  lede,
  tag,
  tagTone = 'brand',
  tail,
}) => {
  if (!lead && !tag && !lede && !action) return null

  return (
    <header className={cn('relative pt-section-sm', className)}>
      {tag && tagTone === 'brand' ? (
        <span className="mb-6 inline-flex items-center gap-2 rounded-none bg-brand px-3 py-1.5 eyebrow text-brand-foreground">
          {index ? <span className="index-code text-brand-foreground/70">{index}</span> : null}
          {tag}
        </span>
      ) : null}
      {tag && tagTone === 'mono' ? (
        <span className="mb-4 flex items-center gap-2 eyebrow text-ink-3">
          {index ? <span className="index-code text-ink-3">{index}</span> : null}
          {tag}
        </span>
      ) : null}
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-16">
        {lead ? <TwoTone as={as} className="lg:col-span-7" id={id} lead={lead} tail={tail} /> : null}
        {lede ? (
          <p className={cn('text-lede text-ink-2 max-w-measure', lead ? 'lg:col-span-5' : 'lg:col-span-7')}>{lede}</p>
        ) : null}
        {action ? (
          <div className={cn('lg:col-span-5 lg:col-start-8', lede && 'max-lg:-mt-2 lg:-mt-3')}>{action}</div>
        ) : null}
      </div>
    </header>
  )
}

'use client'

import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

import { kindLabel, PROJECT_KINDS, type ProjectKind } from '@/collections/Projects/kinds'
import { SectionHeader } from '@/components/SectionHeader'
import type { Locale } from '@/utilities/locale'
import { pluralCopy, uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

import type { IndexRow } from './rows'

export interface ProjectIndexProps {
  rows: IndexRow[]
  locale: Locale
  className?: string
}

/** Desktop ledger: a narrow index column, the title carrying the weight, three metadata columns. */
const LEDGER_GRID = 'lg:grid-cols-[2.75rem_minmax(0,5fr)_minmax(0,2fr)_minmax(0,2fr)_minmax(0,2fr)]'

type Filter = ProjectKind | 'all'

const RowShell: React.FC<{ row: IndexRow; children: React.ReactNode; newTabLabel: string }> = ({
  children,
  newTabLabel,
  row,
}) => {
  const className = 'block outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
  if (!row.href) return <div>{children}</div>
  return row.external ? (
    <a className={className} href={row.href} rel="noopener noreferrer" target="_blank">
      {children}
      <span className="sr-only">{newTabLabel}</span>
    </a>
  ) : (
    <Link className={className} href={row.href}>
      {children}
    </Link>
  )
}

/**
 * The complete archive as an editorial index, not a data table: hairline-separated rows, the
 * title carrying the weight, everything else tiny mono metadata. One single-select kind filter
 * (client state only — no URL, no search, no sort); filtered rows are hidden and keep their
 * numbers so the archive stays a fixed ledger. Rows link only where there is somewhere to go.
 */
export const ProjectIndex: React.FC<ProjectIndexProps> = ({ className, locale, rows }) => {
  const copy = uiCopy[locale]
  const [active, setActive] = useState<Filter>('all')

  const filters = useMemo(() => {
    const counts = new Map<ProjectKind, number>()
    for (const row of rows) for (const kind of row.kinds) counts.set(kind.value, (counts.get(kind.value) ?? 0) + 1)
    return PROJECT_KINDS.filter((kind) => counts.has(kind)).map((kind) => ({
      value: kind as Filter,
      label: kindLabel(kind, locale),
      count: counts.get(kind) ?? 0,
    }))
  }, [locale, rows])

  const visible = active === 'all' ? rows.length : rows.filter((r) => r.kinds.some((k) => k.value === active)).length
  const showFilter = filters.length > 1

  return (
    <section aria-labelledby="project-index" className={cn('flex flex-col', className)}>
      <SectionHeader
        as="h2"
        className="mb-8"
        id="project-index"
        lead={copy.workIndexTitle}
        tag={copy.workArchiveTag}
        tagTone="mono"
      />

      {showFilter ? (
        <div aria-label={copy.workFilterLabel} className="flex flex-wrap gap-x-5 gap-y-3 pb-4" role="group">
          {[{ value: 'all' as Filter, label: copy.workFilterAll, count: rows.length }, ...filters].map((f) => {
            const pressed = active === f.value
            return (
              <button
                aria-pressed={pressed}
                className={cn(
                  'eyebrow inline-flex items-baseline gap-1.5 border-b pb-1 transition-colors duration-(--duration-fast)',
                  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  pressed ? 'border-brand text-foreground' : 'border-transparent text-ink-3 hover:text-foreground',
                )}
                key={f.value}
                onClick={() => setActive(f.value)}
                type="button"
              >
                {f.label}
                <span className="index-code">{f.count}</span>
              </button>
            )
          })}
        </div>
      ) : null}

      <ol aria-live="polite" className="border-t border-line">
        {rows.map((row) => {
          const hidden = active !== 'all' && !row.kinds.some((k) => k.value === active)
          const interactive = Boolean(row.href)
          const where = [row.company, row.year].filter(Boolean).join(' · ')
          const nature = [row.kinds.map((k) => k.label).join(' · '), row.role].filter(Boolean).join(' — ')

          return (
            <li className={cn('group border-b border-line', hidden && 'hidden')} key={row.id}>
              <RowShell newTabLabel={copy.opensInNewTab} row={row}>
                <div className={cn('grid gap-y-2 py-5 lg:items-baseline lg:gap-x-6 lg:py-6', LEDGER_GRID)}>
                  {/* Phone line 1 · desktop column 1 */}
                  <div className="flex items-baseline gap-3">
                    <span className="index-code">{row.index}</span>
                    {where ? <span className="eyebrow text-ink-3 lg:hidden">{where}</span> : null}
                  </div>

                  <h3
                    className={cn(
                      'text-h3 font-medium text-foreground transition-colors duration-(--duration-fast)',
                      interactive && 'group-hover:text-brand',
                    )}
                  >
                    {row.title}
                  </h3>

                  {/* Phone line 3 · desktop columns 3–4 */}
                  <span className="eyebrow text-ink-3 lg:hidden">{nature}</span>
                  <span className="eyebrow hidden text-ink-3 lg:block">{row.kinds.map((k) => k.label).join(' · ')}</span>
                  <span className="eyebrow hidden text-ink-3 lg:block">{row.role}</span>

                  {/* Desktop column 5: organisation (+ year) and the destination marker */}
                  <span className="hidden lg:flex lg:items-baseline lg:justify-between lg:gap-3">
                    <span className="eyebrow text-ink-3">{where}</span>
                    {interactive ? (
                      <span
                        aria-hidden
                        className="text-ink-3 transition-[color,translate] duration-(--duration-fast) group-hover:text-brand group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                      >
                        {row.external ? (
                          <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
                        ) : (
                          <ArrowRight className="size-3.5 rtl:-scale-x-100" />
                        )}
                      </span>
                    ) : null}
                  </span>
                  {interactive ? (
                    <span className="eyebrow inline-flex items-center gap-1.5 text-foreground lg:hidden">
                      {row.external ? copy.workLive : copy.workCaseStudy}
                      {row.external ? (
                        <ArrowUpRight aria-hidden className="size-3 rtl:-scale-x-100" />
                      ) : (
                        <ArrowRight aria-hidden className="size-3 rtl:-scale-x-100" />
                      )}
                    </span>
                  ) : null}
                </div>
              </RowShell>
            </li>
          )
        })}
      </ol>
      <p className="sr-only">{pluralCopy(locale, copy.workProjects, visible)}</p>
    </section>
  )
}

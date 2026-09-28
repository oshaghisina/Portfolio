'use client'

import { ArrowRight, ArrowUpRight, LayoutGrid, List, Search, X } from 'lucide-react'
import Link from 'next/link'
import React, { useId, useMemo, useRef } from 'react'

import { kindLabel, PROJECT_KINDS } from '@/collections/Projects/kinds'
import type { Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

import { ArchivePreview } from './ArchivePreview'
import { archiveCopy } from './copy'
import { matchesProject, workRowId, type IndexRow } from './rows'
import { useWorkView } from './useWorkView'
import { DEFAULT_WORK_VIEW, MAX_QUERY_LENGTH } from './workView'

export interface ProjectIndexProps {
  rows: IndexRow[]
  locale: Locale
  className?: string
}

function CardShell({
  row,
  children,
  newTabLabel,
  onOpen,
}: {
  row: IndexRow
  children: React.ReactNode
  newTabLabel: string
  onOpen: (event: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  if (!row.href) return <article className="archive-card">{children}</article>
  if (row.external)
    return (
      <a className="archive-card" href={row.href} rel="noopener noreferrer" target="_blank">
        {children}
        <span className="sr-only">{newTabLabel}</span>
      </a>
    )
  return (
    <Link className="archive-card" href={row.href} onClick={onOpen} prefetch={false}>
      {children}
    </Link>
  )
}

/**
 * One DOM entry per project in either view; all published work is visible by default. The view
 * lives in the URL (`useWorkView`), so a filtered archive can be shared, refreshed and returned to.
 */
export function ProjectIndex({ className, locale, rows }: ProjectIndexProps) {
  const copy = uiCopy[locale]
  const labels = archiveCopy[locale]
  const id = useId()
  const searchRef = useRef<HTMLInputElement>(null)
  const number = (value: number) =>
    new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : locale).format(value)

  const companies = useMemo(() => {
    const groups = new Map<string, { name: string; count: number }>()
    for (const row of rows) {
      if (!row.companyKey) continue
      const group = groups.get(row.companyKey)
      groups.set(row.companyKey, {
        name: group?.name ?? row.company.trim(),
        count: (group?.count ?? 0) + 1,
      })
    }
    return [...groups].sort((a, b) => a[1].name.localeCompare(b[1].name, locale))
  }, [locale, rows])

  const filters = useMemo(
    () =>
      PROJECT_KINDS.filter((value) =>
        rows.some((row) => row.kinds.some((item) => item.value === value)),
      ),
    [rows],
  )
  const options = useMemo(
    () => ({ kinds: filters, companies: companies.map(([key]) => key) }),
    [companies, filters],
  )
  const { view: current, update, leave } = useWorkView(options)
  const { q: query, kind, company, view } = current

  const visibleRows = rows.filter((row) => matchesProject(row, query, kind, company))
  const filtered = kind !== 'all' || Boolean(company) || Boolean(query.trim())
  // The clear buttons disappear once used, so focus moves to the search field instead of <body>.
  const reset = () => {
    update(
      { q: DEFAULT_WORK_VIEW.q, kind: DEFAULT_WORK_VIEW.kind, company: DEFAULT_WORK_VIEW.company },
      'push',
    )
    searchRef.current?.focus()
  }

  return (
    <section aria-labelledby={`${id}-title`} className={cn('work-archive', className)}>
      <div className="archive-heading" data-reveal-skip="">
        <h2 className="text-h3 font-medium" id={`${id}-title`}>
          {copy.workIndexTitle}
        </h2>
        <div aria-label={labels.view} className="archive-view-switch" role="group">
          {(
            [
              { key: 'grid', label: labels.grid, Icon: LayoutGrid },
              { key: 'list', label: labels.list, Icon: List },
            ] as const
          ).map(({ key, label, Icon }) => (
            <button
              aria-label={label}
              aria-pressed={view === key}
              key={key}
              onClick={() => update({ view: key }, 'push')}
              title={label}
              type="button"
            >
              <Icon aria-hidden="true" size={17} />
            </button>
          ))}
        </div>
      </div>

      <div className="archive-controls" data-reveal-skip="">
        <div className="archive-search">
          <Search aria-hidden="true" size={17} />
          <label className="sr-only" htmlFor={`${id}-search`}>
            {labels.search}
          </label>
          <input
            autoComplete="off"
            id={`${id}-search`}
            maxLength={MAX_QUERY_LENGTH}
            onChange={(event) => update({ q: event.target.value }, 'replace')}
            placeholder={labels.search}
            ref={searchRef}
            type="search"
            value={query}
          />
        </div>
        <label className="archive-company">
          <span className="sr-only">{labels.company}</span>
          <select
            onChange={(event) => update({ company: event.target.value }, 'push')}
            value={company}
          >
            <option value="">{labels.allCompanies}</option>
            {companies.map(([key, group]) => (
              <option key={key} value={key}>
                {group.name} ({number(group.count)})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="archive-filter-row" data-reveal-skip="">
        <div aria-label={copy.workFilterLabel} className="archive-filters" role="group">
          {(['all', ...filters] as const).map((value) => (
            <button
              aria-pressed={kind === value}
              key={value}
              onClick={() => update({ kind: value }, 'push')}
              type="button"
            >
              {value === 'all' ? copy.workFilterAll : kindLabel(value, locale)}
              <span className="index-code">
                {number(rows.filter((row) => matchesProject(row, query, value, company)).length)}
              </span>
            </button>
          ))}
        </div>
        <div className="archive-results">
          <p aria-live="polite" aria-atomic="true" className="text-caption text-ink-3">
            {labels.results
              .replace('{shown}', number(visibleRows.length))
              .replace('{total}', number(rows.length))}
          </p>
          {filtered ? (
            <button className="archive-reset text-caption" onClick={reset} type="button">
              <X aria-hidden="true" size={14} />
              {labels.clear}
            </button>
          ) : null}
        </div>
      </div>

      <ol className="archive-projects" data-view={view}>
        {visibleRows.map((row) => (
          <li
            data-project-slug={row.slug}
            data-reveal-unit=""
            id={workRowId(row.slug)}
            key={row.id}
          >
            <CardShell
              newTabLabel={copy.opensInNewTab}
              onOpen={(event) => leave(row.slug, event.currentTarget.closest('li'))}
              row={row}
            >
              <ArchivePreview row={row} />
              <div className="archive-card-copy">
                <div className="archive-card-meta text-caption text-ink-3">
                  <span className="archive-row-index index-code">{row.index}</span>
                  <bdi>{row.company}</bdi>
                  {row.year ? (
                    <span className="archive-year" dir="ltr">
                      {row.year}
                    </span>
                  ) : null}
                </div>
                <h3 className="archive-card-title">{row.title}</h3>
                <p className="archive-card-summary">{row.summary}</p>
                <div className="archive-card-footer">
                  <span className="archive-card-kinds text-caption text-ink-3">
                    {row.kinds.map((item) => item.label).join(' / ')}
                  </span>
                  <span
                    className={cn(
                      'archive-card-destination text-caption',
                      !row.href && 'text-ink-3',
                    )}
                  >
                    {row.href
                      ? row.external
                        ? copy.workLive
                        : copy.workCaseStudy
                      : labels.archiveEntry}
                    {row.href ? (
                      row.external ? (
                        <ArrowUpRight aria-hidden="true" size={15} className="rtl:-scale-x-100" />
                      ) : (
                        <ArrowRight aria-hidden="true" size={15} className="rtl:-scale-x-100" />
                      )
                    ) : null}
                  </span>
                </div>
              </div>
            </CardShell>
          </li>
        ))}
      </ol>
      {!visibleRows.length ? (
        <div className="archive-empty" data-reveal-skip="">
          <Search aria-hidden="true" size={28} />
          <p>{labels.noResults}</p>
          <button className="archive-reset" onClick={reset} type="button">
            {labels.clear}
            <ArrowRight aria-hidden="true" size={16} className="rtl:-scale-x-100" />
          </button>
        </div>
      ) : null}
    </section>
  )
}

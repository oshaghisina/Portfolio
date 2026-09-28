import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/utilities/locale'
import { pluralCopy, uiCopy } from '@/utilities/uiCopy'
import { cn } from '@/utilities/ui'

import type { SearchResult, SearchResultType } from './results'

export interface SearchResultsProps {
  /** The query already failed; show the error line instead of results. */
  failed?: boolean
  locale: Locale
  query: string
  results: SearchResult[]
  className?: string
}

/**
 * The `/search` ledger — the same hairline grammar as "More from …": type and organisation on a
 * quiet line, the title carrying the weight, one line of summary. The status line stays mounted
 * across queries so screen readers announce the prompt, the count, no results or the error.
 */
export const SearchResults: React.FC<SearchResultsProps> = ({
  className,
  failed = false,
  locale,
  query,
  results,
}) => {
  const copy = uiCopy[locale]
  const typeLabel: Record<SearchResultType, string> = {
    caseStudy: copy.workCaseStudy,
    project: copy.searchTypeProject,
    post: copy.searchTypePost,
  }
  const status = failed
    ? copy.searchError
    : !query
      ? copy.searchPrompt
      : results.length
        ? pluralCopy(locale, copy.searchResults, results.length)
        : copy.searchNoResults

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <p
        aria-atomic="true"
        aria-live="polite"
        className="text-caption text-ink-3"
        data-reveal-skip=""
        role="status"
      >
        {status}
      </p>
      {!failed && results.length ? (
        <ol className="border-t border-line">
          {results.map((result) => (
            <li className="border-b border-line" data-search-type={result.type} key={result.id}>
              <Link
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 py-4 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:py-5"
                href={result.href}
                prefetch={false}
              >
                <span className="flex flex-col gap-1">
                  <span className="eyebrow text-ink-3">
                    {typeLabel[result.type]}
                    {result.context ? (
                      <>
                        {' · '}
                        <bdi>{result.context}</bdi>
                      </>
                    ) : null}
                  </span>
                  <span className="font-medium text-foreground transition-colors duration-(--duration-fast) group-hover:text-brand">
                    {result.title}
                  </span>
                  {result.summary ? (
                    <span className="max-w-measure text-ink-2">{result.summary}</span>
                  ) : null}
                </span>
                <ArrowRight
                  aria-hidden
                  className="size-3.5 self-center text-ink-3 transition-colors duration-(--duration-fast) group-hover:text-foreground rtl:-scale-x-100"
                />
              </Link>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  )
}

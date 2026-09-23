import { Globe } from 'lucide-react'
import React from 'react'

import { cn } from '@/utilities/ui'
import { type Locale } from '@/utilities/locale'
import { uiCopy } from '@/utilities/uiCopy'

import { localeDestinations } from './destinations'

export interface LocaleSwitcherProps {
  locale: Locale
  /** The current page's logical (unprefixed) path, e.g. `/about` or `/`. */
  logicalPath: string
  /** Which locales have a publicly ready copy of the current logical page. */
  readiness: Partial<Record<Locale, boolean>>
  className?: string
  /** `above` opens the list upward — for triggers near the bottom of a container (drawer foot). */
  placement?: 'above' | 'below'
}

/**
 * A native `<details>` disclosure — no extra JS state, free click-to-toggle and Escape-adjacent
 * dismissal on blur — listing every other site locale. Preserves the current logical route when
 * that locale's copy is ready; falls back to that locale's homepage otherwise, so the switcher
 * never sends a visitor straight into a not-found page (D-009).
 *
 * Deliberately not `'use client'` and deliberately not using the `<Button>` component (which
 * renders a real `<button>` — invalid nested inside `<summary>`, itself already an interactive
 * disclosure trigger). The trigger's classes are inlined rather than pulled from
 * `buttonVariants()`, since that helper lives in a `'use client'` module and this component must
 * stay server-renderable (it's now rendered directly from server components — Header and Footer
 * alike — not just from inside a client subtree).
 */
export const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({
  className,
  locale,
  logicalPath,
  placement = 'below',
  readiness,
}) => {
  const label = uiCopy[locale].language

  return (
    <details className={cn('relative', className)}>
      <summary
        aria-label={label}
        className="inline-flex size-(--size-control-height-sm) list-none items-center justify-center rounded-control text-foreground transition-colors duration-(--duration-fast) hover:bg-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden"
        title={label}
      >
        <Globe aria-hidden className="size-4" />
      </summary>
      <ul
        className={cn(
          'absolute end-0 z-30 flex min-w-40 flex-col gap-1 rounded-panel border border-line bg-background p-2 shadow-md',
          placement === 'above' ? 'bottom-full mb-2' : 'mt-2',
        )}
      >
        {localeDestinations(locale, logicalPath, readiness).filter((option) => !option.current).map((option) => {
          return (
            <li key={option.locale}>
              {/* A plain `<a>`, deliberately — not `next/link`. `proxy.ts` rewrites `/fa/about`
                  onto the same physical route as `/about`, so a client-side navigation between
                  locales presents the router with an identical segment tree and it patches
                  nothing: the URL changes and the page stays in the old language until a reload.
                  A locale switch also has to re-render the root layout — it owns `<html lang>`,
                  `dir`, the font stack, the header and the footer — and App Router root layouts
                  never re-render on client navigation. A full document load is the only thing
                  that gets all of it, and it re-runs the proxy so `x-locale` is right. Losing
                  prefetch is a gain here: prefetching a rewrite target would warm the cache with
                  the wrong locale. */}
              <a
                aria-label={option.switchLabel}
                className="block rounded-control px-2 py-1.5 text-small text-foreground hover:bg-panel"
                href={option.href}
                hrefLang={option.locale}
                title={option.switchLabel}
              >
                {option.label}
              </a>
            </li>
          )
        })}
      </ul>
    </details>
  )
}

/** Full mobile-menu language list; plain anchors reload the locale-owned root layout. */
export const InlineLocaleList: React.FC<Omit<LocaleSwitcherProps, 'className' | 'placement'>> = ({
  locale,
  logicalPath,
  readiness,
}) => (
  <div className="w-full">
    <h2 className="eyebrow mb-3 text-ink-3">{uiCopy[locale].language}</h2>
    <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
      {localeDestinations(locale, logicalPath, readiness).map((option) => (
        <li key={option.locale}>
          {option.current ? (
            <span aria-current="true" className="block border-s border-brand py-1.5 ps-2 text-small font-medium text-foreground" lang={option.locale}>
              {option.label}
            </span>
          ) : (
            <a
              aria-label={option.switchLabel}
              className="block border-s border-transparent py-1.5 ps-2 text-small text-ink-2 hover:border-line hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              href={option.href}
              hrefLang={option.locale}
              lang={option.locale}
            >
              {option.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
)

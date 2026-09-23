import React from 'react'

import { SystemLandscape } from '@/components/SystemLandscape'
import { cn } from '@/utilities/ui'

/**
 * The one opening gesture every page uses: eyebrow → display headline → lede → actions, with an
 * optional column beside the copy from `lg` up, closed by the `SystemLandscape` hairline. Lifted
 * out of the homepage hero, which is now just one caller of it.
 *
 * The `aside` renders verbatim — its own responsive behaviour belongs to the caller, because the
 * homepage's console panel hides below `lg` while a case study's meta block stacks and stays.
 */
export interface PageOpenerProps {
  /** A row above the eyebrow — e.g. a case study's "All work" back link. */
  before?: React.ReactNode
  eyebrow?: React.ReactNode
  /** Index code before the eyebrow, e.g. "02". */
  index?: string | null
  /** Wrapped in the page's one `h1`. */
  title?: React.ReactNode
  /** Used verbatim instead of `title`, for CMS rich text that carries its own `h1` and lede. */
  titleSlot?: React.ReactNode
  lede?: React.ReactNode
  actions?: React.ReactNode
  aside?: React.ReactNode
  /** Where the aside sits against the headline: centred (default), bottom, or top. */
  asideAlign?: 'center' | 'end' | 'start'
  /** The closing hairline strip. `false` for a page that opens straight into its content. */
  rail?: boolean
  railLabels?: string[]
  /** A shorter opening rhythm for pages that need evidence in the first viewport. */
  compact?: boolean
  className?: string
}

const ASIDE_ALIGN: Record<NonNullable<PageOpenerProps['asideAlign']>, string> = {
  center: 'lg:items-center',
  end: 'lg:items-end',
  start: 'lg:items-start',
}

export const PageOpener: React.FC<PageOpenerProps> = ({
  actions,
  aside,
  asideAlign = 'center',
  before,
  className,
  compact = false,
  eyebrow,
  index,
  lede,
  rail = true,
  railLabels,
  title,
  titleSlot,
}) => {
  const hasKicker = Boolean(before || eyebrow || index)

  return (
    <section className={cn('flex flex-col', className)}>
      <div
        className={cn(
          'flex flex-col lg:flex-row lg:justify-between',
          compact
            ? 'gap-8 pt-6 pb-8 md:gap-10 md:pt-12 md:pb-10 lg:gap-12 lg:pt-12 lg:pb-8'
            : 'gap-10 pt-6 pb-12 md:gap-12 md:pt-16 md:pb-16 lg:gap-16 lg:pt-24 lg:pb-20',
          ASIDE_ALIGN[asideAlign],
        )}
      >
        <div className="max-w-[42rem]">
          {before}
          {index ? (
            <span className="flex items-center gap-2 eyebrow text-ink-3">
              <span className="index-code text-ink-3">{index}</span>
              {eyebrow}
            </span>
          ) : eyebrow ? (
            <span className="eyebrow text-ink-3">{eyebrow}</span>
          ) : null}
          {titleSlot ??
            (title ? (
              <h1
                className={cn(
                  'text-display tracking-display font-medium text-balance text-foreground',
                  hasKicker && 'mt-4',
                )}
              >
                {title}
              </h1>
            ) : null)}
          {lede ? (
            <p className="mt-6 max-w-[34ch] text-lede text-ink-2 md:max-w-[34rem]">{lede}</p>
          ) : null}
          {actions ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              {actions}
            </div>
          ) : null}
        </div>
        {aside}
      </div>
      {rail ? <SystemLandscape className={compact ? 'sm:h-16' : undefined} labels={railLabels} /> : null}
    </section>
  )
}

import React from 'react'

import { SystemLandscape } from '@/components/SystemLandscape'
import { WrittenHeadline } from '@/components/WrittenHeadline'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

/**
 * The one opening gesture every page uses: eyebrow → display headline → lede → actions, with an
 * optional column beside the copy from `lg` up, closed by the `SystemLandscape` hairline. Lifted
 * out of the homepage hero, which is now just one caller of it.
 *
 * The `aside` renders verbatim — its own responsive behaviour belongs to the caller.
 *
 * When `written` is set, the opener hosts the shared title-write entrance: `WrittenHeadline` owns
 * the H1 motion; eyebrow / lede / actions / aside follow via `[data-hero-entrance]` CSS.
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
  /**
   * Progressive title-write on this opener's H1. Pass `locale` when `title` is a plain string so
   * segmentation can stay script-aware; `titleSlot` callers wire `WrittenHeadline` themselves.
   */
  written?: boolean
  locale?: Locale
  /** Fade the aside with supporting copy (Contact narrative column). */
  asideSupports?: boolean
}

const ASIDE_ALIGN: Record<NonNullable<PageOpenerProps['asideAlign']>, string> = {
  center: 'lg:items-center',
  end: 'lg:items-end',
  start: 'lg:items-start',
}

const TITLE_CLASS = 'text-display tracking-display font-medium text-balance text-foreground'

export const PageOpener: React.FC<PageOpenerProps> = ({
  actions,
  aside,
  asideAlign = 'center',
  asideSupports = false,
  before,
  className,
  compact = false,
  eyebrow,
  index,
  lede,
  locale = DEFAULT_LOCALE,
  rail = true,
  railLabels,
  title,
  titleSlot,
  written = false,
}) => {
  const hasKicker = Boolean(before || eyebrow || index)

  const heading =
    titleSlot ??
    (title ? (
      written && typeof title === 'string' ? (
        <WrittenHeadline
          className={cn(TITLE_CLASS, hasKicker && 'mt-4')}
          locale={locale}
          text={title}
        />
      ) : (
        <h1 className={cn(TITLE_CLASS, hasKicker && 'mt-4')}>{title}</h1>
      )
    ) : null)

  const eyebrowNode = index ? (
    <span
      className="flex items-center gap-2 eyebrow text-ink-3"
      {...(written ? { 'data-hero-eyebrow': '' } : {})}
    >
      <span className="index-code text-ink-3">{index}</span>
      {eyebrow}
    </span>
  ) : eyebrow ? (
    <span className="eyebrow text-ink-3" {...(written ? { 'data-hero-eyebrow': '' } : {})}>
      {eyebrow}
    </span>
  ) : null

  return (
    <section
      className={cn('flex flex-col', className)}
      data-reveal-skip=""
      {...(written ? { 'data-hero-entrance': '' } : {})}
    >
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
          {eyebrowNode}
          {heading}
          {lede ? (
            <p
              className="mt-6 max-w-[34ch] text-lede text-ink-2 md:max-w-[34rem]"
              {...(written ? { 'data-hero-supporting': '' } : {})}
            >
              {lede}
            </p>
          ) : null}
          {actions ? (
            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
              {...(written ? { 'data-hero-actions': '' } : {})}
            >
              {actions}
            </div>
          ) : null}
        </div>
        {aside ? (
          written && asideSupports ? <div data-hero-supporting="">{aside}</div> : aside
        ) : null}
      </div>
      {rail ? <SystemLandscape className={compact ? 'sm:h-16' : undefined} labels={railLabels} /> : null}
    </section>
  )
}

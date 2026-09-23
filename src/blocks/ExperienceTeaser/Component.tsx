import React from 'react'

import type { ExperienceTeaserBlock as ExperienceTeaserBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { SectionHeader } from '@/components/SectionHeader'
import { DEFAULT_LOCALE, type Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

import { SpotlightMark } from '../CapabilityIcons'
import { isSpotlightKey, type SpotlightKey } from '../CapabilityIcons/keys'

export type ExperienceTeaserProps = Pick<
  ExperienceTeaserBlockProps,
  'capabilities' | 'links' | 'metrics' | 'sectionHeader'
> & {
  className?: string
  locale?: Locale
}

/**
 * The homepage's Experience section: capability preview, then proof, then the way onward. The
 * order is the argument — four ways of operating first, ten years of evidence second. Reversed,
 * the section says only "Sina has been doing this a while", which is what it used to say.
 *
 * Two stacked ruled grids, no cards: `gap-px` over `bg-line` so every separator is the same
 * hairline that rules the rest of the site. Safe in both grids specifically because the row
 * counts fill their columns exactly — four capabilities across 2 and 1 columns, three metrics
 * across 3 and 1. An unfilled cell would paint as a solid `--line` block; see
 * WorkMosaic/Component.tsx:29-35 for when to use per-cell hairlines instead.
 *
 * The capability grid closes with `border-t` only and the metric strip carries `border-y`, so the
 * boundary between them is drawn once and two 1px rules never stack into a 2px line.
 */
export const ExperienceTeaserBlock: React.FC<ExperienceTeaserProps> = ({
  capabilities,
  className,
  links,
  locale = DEFAULT_LOCALE,
  metrics,
  sectionHeader,
}) => {
  const cells = (capabilities ?? []).filter((item) => isSpotlightKey(item.key))
  const rows = (metrics ?? []).slice(0, 4)
  const action = (Array.isArray(links) ? links : [])[0]?.link

  return (
    <section className={cn(className)} id="experience">
      <SectionHeader
        {...sectionHeader}
        action={
          action ? <CMSLink {...action} appearance="link" arrow locale={locale} /> : undefined
        }
        className="mb-10 max-md:mb-8"
        tagTone="mono"
      />
      {cells.length ? (
        <ol className="grid grid-cols-1 gap-px border-t border-line bg-line sm:grid-cols-2">
          {cells.map((item, i) => (
            <li className="flex min-w-0 flex-col bg-paper p-6 lg:p-8" key={item.id ?? item.key}>
              {/* Index and mark share a baseline row: the cell stays short and the mark can never
                  outweigh the title, which is the thing a visitor is here to read. */}
              <div className="flex items-start justify-between gap-4">
                <span className="index-code text-ink-3" dir="ltr">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <SpotlightMark
                  className="size-12 shrink-0"
                  spotlightKey={item.key as SpotlightKey}
                />
              </div>
              <h3 className="mt-5 text-h3 tracking-h3 font-medium text-foreground text-balance">
                {item.title}
              </h3>
              <p className="mt-2 text-small text-ink-3">{item.principle}</p>
            </li>
          ))}
        </ol>
      ) : null}
      {rows.length ? (
        <dl className="grid grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-3">
          {rows.map((metric, i) => (
            // `flex-col-reverse` puts the value above its caption on screen while keeping the
            // `<dt>` before its `<dd>` in the DOM, which is the order a description list requires.
            <div
              className="flex min-w-0 flex-col-reverse bg-paper px-5 py-5 lg:px-6"
              key={metric.id ?? i}
            >
              <dt className="eyebrow mt-2 text-ink-3">{metric.caption}</dt>
              <dd
                className={cn(
                  'text-h2 tracking-num font-medium tabular-nums',
                  i === 0 ? 'text-brand' : 'text-foreground',
                )}
                dir="ltr"
              >
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  )
}

import { cn } from '@/utilities/ui'
import React from 'react'

import type { MetricsStripBlock as MetricsStripBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'

export type MetricsStripProps = Pick<MetricsStripBlockProps, 'metrics' | 'sectionHeader'> & {
  className?: string
}

/**
 * Decorative bar weight per row — purely editorial rhythm, breaking up equal columns. Not a
 * proportional chart: a duration, a headcount and a percentage are different units, so a literal
 * comparative bar length would misrepresent the data rather than illustrate it.
 */
const BAR_WEIGHT = ['100%', '70%', '46%', '30%']

/** Phone-only graphic per row: one accent fill, then hatch / outline / neutral fill. */
const PhoneBar: React.FC<{ index: number }> = ({ index }) => {
  const width = BAR_WEIGHT[index] ?? '30%'
  if (index === 0) return <span aria-hidden className="mx-auto block h-2 bg-brand sm:hidden" style={{ width }} />
  if (index === 1) {
    return (
      <span
        aria-hidden
        className="mx-auto block h-2 border border-line sm:hidden"
        style={{
          width,
          backgroundImage: 'repeating-linear-gradient(135deg, var(--line) 0 1px, transparent 1px 5px)',
        }}
      />
    )
  }
  if (index === 2) return <span aria-hidden className="mx-auto block h-2 border border-line sm:hidden" style={{ width }} />
  return <span aria-hidden className="mx-auto block h-2 bg-line sm:hidden" style={{ width }} />
}

/**
 * Metrics as a stacked editorial transition, not an equal-column stats row. On phones the ruled
 * rows become a centered vertical data composition (value, small graphic, tiny label) and the
 * block owns a long silence after itself through its bottom padding.
 *
 * Home no longer uses this block: its three numbers became the proof strip inside the Experience
 * section (`blocks/ExperienceTeaser`), where they support the capabilities rather than being the
 * whole argument, and where half a viewport of deliberate silence would read as a dead section
 * rather than a pause. Kept registered for pages that want a standalone stats row, and sampled
 * on `/design`.
 */
export const MetricsStripBlock: React.FC<MetricsStripProps> = ({ className, metrics, sectionHeader }) => {
  const rows = (metrics ?? []).slice(0, 4)
  if (!rows.length) return null

  return (
    <section className={cn('pb-[70svh] sm:pb-[44vh] lg:pb-[52vh]', className)}>
      <SectionHeader
        {...sectionHeader}
        className="mb-4 max-sm:mb-10 max-sm:border-t-0 max-sm:pt-0 max-sm:text-center max-sm:[&>span]:justify-center max-sm:[&_p]:mx-auto"
        tagTone="mono"
      />
      <dl className="flex flex-col gap-12 sm:grid sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14 lg:grid-cols-4">
        {rows.map((m, i) => (
          <div
            className="flex min-w-0 flex-col gap-3 text-start max-sm:items-center max-sm:text-center"
            key={m.id ?? i}
          >
            <dd
              className={cn(
                'text-num tracking-num font-medium tabular-nums',
                i === 0 ? 'text-brand' : 'text-foreground',
              )}
            >
              <bdi dir="ltr">{m.value}</bdi>
            </dd>
            <div className="relative mt-2 h-3 w-full overflow-hidden border border-line max-sm:hidden">
              <span
                aria-hidden
                className={cn(
                  'absolute inset-y-0 start-0',
                  i === 0 && 'bg-brand',
                  i === 1 &&
                    '[background-image:repeating-linear-gradient(135deg,var(--line)_0_1px,transparent_1px_5px)]',
                  i === 2 && 'border-e border-line bg-line-soft',
                  i === 3 && 'bg-line',
                )}
                style={{ width: BAR_WEIGHT[i] ?? '30%' }}
              />
            </div>
            <PhoneBar index={i} />
            <div className="flex flex-col gap-1 max-sm:items-center">
              <dt className="eyebrow">{m.caption}</dt>
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}

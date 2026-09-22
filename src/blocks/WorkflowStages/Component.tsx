import { cn } from '@/utilities/ui'
import React from 'react'

import type { WorkflowStagesBlock as WorkflowStagesBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'

import { ToolLogo } from './ToolLogo'
import { CATEGORY_KEYS, isToolKey, TOOL_LOGOS } from './toolLogos'

export type WorkflowStagesProps = Pick<WorkflowStagesBlockProps, 'categories' | 'sectionHeader'> & {
  className?: string
}

/**
 * TOOLS / STACK — the working stack as one section-owned paper surface: six categories, each a
 * tiny index code, a label and a single continuous ruled matrix of real brand marks.
 *
 * Ruled-matrix idiom (see ExperienceGrid): the grid parent paints every separator via `gap-px`
 * over a `bg-line` surface and every cell is `bg-paper`. Cells never carry a border, background,
 * radius or shadow of their own — there are no cards here and no gaps between cells.
 *
 * Separator ownership is split so a hairline can only ever be painted once:
 *   · the section wrapper owns the outer top and bottom rules, and nothing else;
 *   · each category but the first owns the single rule above it;
 *   · the matrices carry no `border-y` at all, only internal `gap-px` hairlines.
 * That last point is what lets six stacked grids read as one surface: a `gap-px` grid of
 * `bg-paper` cells has invisible outer edges, so a category's bottom edge can never double up
 * with the next one's top edge.
 *
 * At `lg` the category label is a cell in a leading gutter column rather than a band above the
 * matrix, so a category costs one row instead of two — that alone is most of the section's
 * height. The gutter is an inline-start column, so it mirrors under RTL along with reading flow;
 * only the marks themselves stay physical (see ToolLogo.tsx). Below `lg` there is no room for a
 * gutter, so the label falls back to a full-width cell in the same one-column grid.
 *
 * Columns are per-category at `lg`, passed as a CSS custom property so the Tailwind class stays a
 * static string the scanner can see — no dynamic `grid-cols-N` and so no safelist entry. The
 * category sizes (3, 8, 6, 7, 3, 5) share no common divisor, so any single fixed count would
 * leave a hole or a stretched cell; with one column per tool each category is exactly one row of
 * identical cells.
 *
 * Below `lg` the counts are fixed (4 / 3) and the `nth-child` guards absorb a trailing orphan —
 * load-bearing, not cosmetic, since `--line` is 16%-alpha ink and an unfilled grid area renders
 * as a solid tinted block. Those guards are bounded with `max-lg` on purpose: a min-width variant
 * keeps applying at every larger breakpoint, so an unbounded `sm:` guard would still fire at `lg`,
 * where columns already equal items. A five-tool category is the case that breaks — its last cell
 * is `nth-child(4n+1)`, so it would claim four of five columns, wrap, and open a grey band.
 */
export const WorkflowStagesBlock: React.FC<WorkflowStagesProps> = ({
  categories,
  className,
  sectionHeader,
}) => {
  // Canonical order by key rather than admin row order, so the 01–06 index codes can never be
  // scrambled by a drag in the CMS. Categories with no resolvable tool are dropped so a matrix
  // is never empty.
  const rows = (categories ?? [])
    .filter((category) => (category.tools ?? []).some((tool) => isToolKey(tool.toolKey)))
    .slice()
    .sort((a, b) => CATEGORY_KEYS.indexOf(a.key) - CATEGORY_KEYS.indexOf(b.key))

  if (!rows.length) return null

  return (
    <section className={cn(className)} id="tools">
      <SectionHeader
        {...sectionHeader}
        className="mb-6 max-md:mb-5 max-md:border-t-0 max-md:pt-0"
        tagTone="mono"
      />

      {/* The one section-owned surface: the only outer rules in the whole block. */}
      <div className="border-y border-line bg-paper">
        {rows.map((category, index) => {
          const tools = (category.tools ?? []).filter((tool) => isToolKey(tool.toolKey))

          return (
            <div
              className={cn(
                'grid gap-px bg-line lg:grid-cols-[11rem_minmax(0,1fr)]',
                index > 0 && 'border-t border-line',
              )}
              key={category.id ?? category.key}
            >
              {/* Top-aligned rather than centred so the label's baseline sits with the first row
                  of marks, the way a row header does on a drawing sheet. */}
              <div className="flex items-baseline gap-3 bg-paper px-3 py-3 lg:px-4 lg:py-5">
                <span className="index-code" dir="ltr">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="eyebrow text-ink-2">{category.title}</h3>
              </div>

              <ul
                className="grid grid-cols-3 gap-px bg-line sm:grid-cols-4 lg:grid-cols-[repeat(var(--tool-cols),minmax(0,1fr))]"
                style={{ '--tool-cols': Math.min(tools.length, 8) } as React.CSSProperties}
              >
                {tools.map((tool) => (
                  <li
                    className="flex min-w-0 flex-col items-center justify-start gap-2 bg-paper px-2 py-4 text-center sm:px-3 max-sm:[&:last-child:nth-child(3n+1)]:col-span-3 max-sm:[&:last-child:nth-child(3n+2)]:col-span-2 sm:max-lg:[&:last-child:nth-child(4n+1)]:col-span-4 sm:max-lg:[&:last-child:nth-child(4n+2)]:col-span-3 sm:max-lg:[&:last-child:nth-child(4n+3)]:col-span-2"
                    key={tool.id ?? tool.toolKey}
                  >
                    <ToolLogo toolKey={tool.toolKey} />
                    {/* `text-caption`, never `eyebrow` — the latter uppercases, and brand names
                        keep their canonical casing ("Next.js", not "NEXT.JS"). `dir="ltr"` keeps
                        the punctuation and digits intact inside an RTL paragraph. */}
                    <span className="min-w-0 break-words text-caption text-ink-2" dir="ltr">
                      {TOOL_LOGOS[tool.toolKey].name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}

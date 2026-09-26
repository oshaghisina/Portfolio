import { cn } from '@/utilities/ui'
import React from 'react'

import type { WorkflowStagesBlock as WorkflowStagesBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'

import { ToolLogo } from './ToolLogo'
import { CATEGORY_KEYS, isToolKey, TOOL_LOGOS } from './toolLogos'

export type WorkflowStagesProps = Pick<WorkflowStagesBlockProps, 'categories' | 'sectionHeader'> & {
  className?: string
}

/** Widest a matrix may get before it wraps instead of shrinking its cells. */
const MAX_TOOL_COLS = 7
/** Narrowest a matrix may get, so a one-tool category is a cell rather than a banner. */
const MIN_TOOL_COLS = 3

/**
 * A balanced block rather than a single line: as close to square as the count allows, bounded on
 * both sides. Eleven tools become two rows of six, not seven and a stranded four. Because
 * `cols = ceil(count / rows)`, the last row is ever short by at most `rows - 1` cells.
 */
const lgToolCols = (count: number) =>
  Math.max(Math.ceil(count / Math.ceil(count / MAX_TOOL_COLS)), MIN_TOOL_COLS)

/** Columns left over on the last row. 0 means the rows come out full and no filler is drawn. */
const fillSpan = (count: number, cols: number) => (cols - (count % cols)) % cols

/**
 * TOOLS / STACK — the working stack as one section-owned paper surface: seven categories, each a
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
 * That last point is what lets the stacked grids read as one surface: a `gap-px` grid of
 * `bg-paper` cells has invisible outer edges, so a category's bottom edge can never double up
 * with the next one's top edge.
 *
 * At `lg` the category label is a cell in a leading gutter column rather than a band above the
 * matrix, so a category costs one grid row instead of two — that alone is most of the section's
 * height. Because the label is a single grid item sitting beside the matrix as a whole, a
 * category that needs several rows of marks gets a label spanning all of them for free, and the
 * label is never repeated. The gutter is an inline-start column, so it mirrors under RTL along
 * with reading flow; only the marks themselves stay physical (see ToolLogo.tsx). Below `lg` there
 * is no room for a gutter, so the label falls back to a full-width cell in the same grid.
 *
 * Columns are per-category and balanced rather than one line per category — see `lgToolCols`.
 * The count is passed as a CSS custom property so the Tailwind class stays a static string the
 * scanner can see: no dynamic `grid-cols-N`, and so no safelist entry.
 *
 * A short last row is absorbed by the grid's own `::after`, never by stretching a cell, so every
 * mark in a category keeps the same width and the markup keeps exactly one element per tool. A
 * pseudo-element of a grid container is itself a grid item, so this costs no DOM and raises no
 * question about list semantics. It is `bg-paper` for the reason every cell is: `--line` is
 * 16%-alpha ink, so an *unfilled* grid area paints as a solid tinted block. `span 0` is invalid
 * CSS — with a custom property it falls back to `auto`, which claims a whole cell and opens
 * exactly the band the filler exists to close — so a breakpoint whose rows come out full hides
 * the filler instead. Those hide classes are range-bounded (`max-sm:`, `sm:max-lg:`, `lg:`)
 * because a min-width variant keeps applying at every larger breakpoint: an unbounded
 * `after:hidden` would go on to hide a filler that `lg` still needs.
 */
export const WorkflowStagesBlock: React.FC<WorkflowStagesProps> = ({
  categories,
  className,
  sectionHeader,
}) => {
  // Canonical order by key rather than admin row order, so the 01–07 index codes can never be
  // scrambled by a drag in the CMS. Categories with no resolvable tool are dropped so a matrix
  // is never empty.
  const rows = (categories ?? [])
    .filter((category) => (category.tools ?? []).some((tool) => isToolKey(tool.toolKey)))
    .slice()
    .sort((a, b) => CATEGORY_KEYS.indexOf(a.key) - CATEGORY_KEYS.indexOf(b.key))

  if (!rows.length) return null

  return (
    <section className={cn('scroll-mt-28', className)} id="tools">
      <SectionHeader
        {...sectionHeader}
        className="mb-6 max-md:mb-5 max-md:border-t-0 max-md:pt-0"
        tagTone="mono"
      />

      {/* The one section-owned surface: the only outer rules in the whole block. */}
      <div className="border-y border-line bg-paper" data-reveal-group="">
        {rows.map((category, index) => {
          const tools = (category.tools ?? []).filter((tool) => isToolKey(tool.toolKey))

          const count = tools.length
          const cols = lgToolCols(count)
          const fillBase = fillSpan(count, 3)
          const fillSm = fillSpan(count, 4)
          const fillLg = fillSpan(count, cols)

          return (
            <div
              data-reveal-group=""
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
                data-reveal-group=""
                className={cn(
                  'grid grid-cols-3 gap-px bg-line sm:grid-cols-4 lg:grid-cols-[repeat(var(--tool-cols),minmax(0,1fr))]',
                  (fillBase || fillSm || fillLg) && [
                    'after:bg-paper',
                    fillBase
                      ? 'after:[grid-column:span_var(--fill-base)]'
                      : 'max-sm:after:hidden',
                    fillSm
                      ? 'sm:after:[grid-column:span_var(--fill-sm)]'
                      : 'sm:max-lg:after:hidden',
                    fillLg ? 'lg:after:[grid-column:span_var(--fill-lg)]' : 'lg:after:hidden',
                  ],
                )}
                style={
                  {
                    '--fill-base': fillBase,
                    '--fill-lg': fillLg,
                    '--fill-sm': fillSm,
                    '--tool-cols': cols,
                  } as React.CSSProperties
                }
              >
                {tools.map((tool) => {
                  const entry = TOOL_LOGOS[tool.toolKey]
                  return (
                    <li className="min-w-0 bg-paper" key={tool.id ?? tool.toolKey}>
                      {/* Full-cell external link: one hit target for logo + name. Grid cell stays
                          paper with no card chrome; focus inset matches WorkMosaic tiles. */}
                      <a
                        className={cn(
                          'group flex h-full min-w-0 flex-col items-center justify-start gap-2 px-2 py-4 text-center sm:px-3',
                          'outline-none transition-colors duration-(--duration-fast) ease-standard',
                          'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring',
                        )}
                        href={entry.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <ToolLogo toolKey={tool.toolKey} />
                        {/* `text-caption`, never `eyebrow` — the latter uppercases, and brand names
                            keep their canonical casing ("Next.js", not "NEXT.JS"). `dir="ltr"`
                            keeps the punctuation and digits intact inside an RTL paragraph. */}
                        <span
                          className="min-w-0 break-words text-caption text-ink-2 transition-colors duration-(--duration-fast) ease-standard group-hover:text-foreground group-focus-visible:text-foreground"
                          dir="ltr"
                        >
                          {entry.name}
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}

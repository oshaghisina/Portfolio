import { cn } from '@/utilities/ui'
import React from 'react'

export interface ProcessDiagramNode {
  label: string
  annotation?: string
  active?: boolean
  /** Latin ornament ("01", "02" …), DS-10 — decorative, never translated. */
  index?: string
}

export interface ProcessDiagramProps {
  className?: string
  /** Draw a return rail from the last band up the inline-end gutter back into the first. */
  loopBack?: boolean
  /** One entry per band of the flow. 1 node = a full-width step, 2 = a fork. Extras are dropped. */
  rows: ProcessDiagramNode[][]
}

/** Both callers' topology: a linear flow with one 2-way fork in the middle. */
export const FORK_FLOW_SHAPE = [1, 1, 2, 1, 1] as const

/** Slice a flat, ordered node list into bands. A short list just yields fewer bands. */
export function toRows(nodes: ProcessDiagramNode[], shape: readonly number[]): ProcessDiagramNode[][] {
  const out: ProcessDiagramNode[][] = []
  let at = 0
  for (const size of shape) {
    const band = nodes.slice(at, at + size)
    if (!band.length) break
    out.push(band)
    at += size
  }
  return out
}

type Band =
  | { kind: 'head' }
  | { kind: 'link' }
  | { kind: 'merge' }
  | { kind: 'nodes'; nodes: ProcessDiagramNode[] }
  | { kind: 'parallel' }
  | { kind: 'split' }
  | { kind: 'tail' }

function buildBands(rows: ProcessDiagramNode[][], loop: boolean): Band[] {
  const bands: Band[] = []
  if (loop) bands.push({ kind: 'head' })
  rows.forEach((row, i) => {
    if (i > 0) {
      const from = Math.min(rows[i - 1]!.length, 2)
      const to = Math.min(row.length, 2)
      bands.push({
        kind:
          from === 1 && to === 2
            ? 'split'
            : from === 2 && to === 1
              ? 'merge'
              : from === 2
                ? 'parallel'
                : 'link',
      })
    }
    bands.push({ kind: 'nodes', nodes: row.slice(0, 2) })
  })
  if (loop) bands.push({ kind: 'tail' })
  return bands
}

/** 32/40px of connector — one string, so every band reads at the same rhythm. */
const RUN = 'h-8 sm:h-10'
/** Nested template for the rail's head/tail bands: lines land at the content centre and the rail centre. */
const RAIL_BAND = 'grid-cols-[minmax(0,1fr)_minmax(0,1fr)_var(--pd-rail-half)_var(--pd-rail-half)]'

/**
 * Shared hairline flow diagram — the same `var(--line)` vocabulary as CaseStudy/Process and
 * Tracks/Illustrations.tsx's DimensionLine (orthogonal runs, perpendicular ticks, no arrowheads).
 *
 * Layout is content-sized, not coordinate-based: one grid row per band, every band `auto`, so a
 * band is exactly as tall as its own longest label+annotation stack, and the return rail owns a
 * column no node is ever placed in. No painted element shares a track with text, so overlap is not
 * merely unlikely — it is unrepresentable. This is why the previous x/y-percentage model had to go:
 * there, stack height was content-derived and unbounded while the box was a fixed aspect ratio, so
 * a two-line annotation in any locale collided with its neighbour.
 *
 * This is NOT the `gap-px bg-line` ruled-matrix idiom (WorkflowStages, ExperienceGrid): that paints
 * a rule between *every* adjacent track, including between the two fork cells and down both
 * gutters. Here each hairline is an individual `bg-line` item placed on a grid line.
 *
 * Deliberately inexpressible, because no caller needs it and layout was never CMS-driven: skip
 * edges, cross edges inside a fork, forks wider than two, asymmetric fork depth. A third caller
 * that needs one of those wants a different component, not a prop.
 *
 * These are conceptual flow diagrams (Business → Product → …), not literal drafting art like
 * Workspace's canvas (which is explicitly documented as *not* mirrored under RTL) — their reading
 * order is semantic, so the whole diagram mirrors under `dir="rtl"`. Columns and rows are logical,
 * so that happens natively: no `-scale-x-100` on the box, and therefore no counter-scale on each
 * label. Only the Latin index ornaments need `dir="ltr"`.
 */
export const ProcessDiagram: React.FC<ProcessDiagramProps> = ({ className, loopBack = false, rows }) => {
  const clean = rows.filter((row) => row.length > 0)
  const bands = buildBands(clean, loopBack && clean.length > 1)

  if (!bands.length) return null

  const loop = bands[0]?.kind === 'head'
  const c0 = loop ? 2 : 1 // first content column
  const content = `${c0} / span 2`

  return (
    <div
      className={cn(
        'grid w-full [--pd-rail:1.5rem] [--pd-rail-half:0.75rem] sm:[--pd-rail:2.5rem] sm:[--pd-rail-half:1.25rem]',
        loop
          ? 'grid-cols-[var(--pd-rail)_minmax(0,1fr)_minmax(0,1fr)_var(--pd-rail)]'
          : 'grid-cols-[minmax(0,1fr)_minmax(0,1fr)]',
        className,
      )}
      // Load-bearing, not redundant: the rail's `gridRow: '1 / -1'` resolves `-1` against the
      // *explicit* grid only. Without this the rows would be implicit and the rail would span one.
      style={{ gridTemplateRows: `repeat(${bands.length}, auto)` }}
    >
      {loop ? (
        <span aria-hidden className="w-px justify-self-center bg-line" style={{ gridColumn: 4, gridRow: '1 / -1' }} />
      ) : null}

      {bands.map((band, b) => {
        const row = b + 1

        if (band.kind === 'nodes') {
          return band.nodes.map((node, i) => (
            <div
              className="flex min-w-0 flex-col items-center gap-1.5 px-1 text-center sm:px-3"
              key={`n-${b}-${i}`}
              style={{ gridColumn: band.nodes.length === 1 ? content : c0 + i, gridRow: row }}
            >
              <span
                aria-hidden
                className={cn(
                  'size-2 shrink-0 rounded-full',
                  node.active ? 'bg-brand' : 'border border-line bg-background',
                )}
              />
              {node.index ? (
                <span className="index-code" dir="ltr">
                  {node.index}
                </span>
              ) : null}
              {/* `eyebrow` sets its own colour, so an active label has to spell the tone out. */}
              <span className={cn('eyebrow max-w-full text-balance break-words', node.active && 'text-foreground')}>
                {node.label}
              </span>
              {node.annotation ? (
                <span className="max-w-full hyphens-auto text-caption text-ink-2">{node.annotation}</span>
              ) : null}
            </div>
          ))
        }

        if (band.kind === 'link') {
          return (
            <span
              aria-hidden
              className={cn(RUN, 'w-px justify-self-center bg-line')}
              key={`l-${b}`}
              style={{ gridColumn: content, gridRow: row }}
            />
          )
        }

        if (band.kind === 'parallel') {
          return [0, 1].map((i) => (
            <span
              aria-hidden
              className={cn(RUN, 'w-px justify-self-center bg-line')}
              key={`p-${b}-${i}`}
              style={{ gridColumn: c0 + i, gridRow: row }}
            />
          ))
        }

        // Split/merge brackets: a nested 4×2 grid puts vertical lines at 0/25/50/75/100% and a
        // horizontal one at the band's midpoint, so every segment is just a stretched grid item.
        // `col-start-N col-end-M` throughout, never `col-span-N` — the span utility emits the
        // `grid-column` shorthand, which resets `grid-column-start` depending on emitted sort order.
        if (band.kind === 'split') {
          return (
            <div
              aria-hidden
              className={cn(RUN, 'grid grid-cols-4 grid-rows-2')}
              key={`s-${b}`}
              style={{ gridColumn: content, gridRow: row }}
            >
              <span className="col-start-2 col-end-4 row-start-1 w-px justify-self-center bg-line" />
              <span className="col-start-2 col-end-4 row-start-1 h-px self-end bg-line" />
              <span className="col-start-1 col-end-3 row-start-2 w-px justify-self-center bg-line" />
              <span className="col-start-3 col-end-5 row-start-2 w-px justify-self-center bg-line" />
            </div>
          )
        }

        if (band.kind === 'merge') {
          return (
            <div
              aria-hidden
              className={cn(RUN, 'grid grid-cols-4 grid-rows-2')}
              key={`m-${b}`}
              style={{ gridColumn: content, gridRow: row }}
            >
              <span className="col-start-1 col-end-3 row-start-1 w-px justify-self-center bg-line" />
              <span className="col-start-3 col-end-5 row-start-1 w-px justify-self-center bg-line" />
              <span className="col-start-2 col-end-4 row-start-2 h-px self-start bg-line" />
              <span className="col-start-2 col-end-4 row-start-2 w-px justify-self-center bg-line" />
            </div>
          )
        }

        if (band.kind === 'head') {
          return (
            <div
              aria-hidden
              className={cn('grid h-6 sm:h-8', RAIL_BAND)}
              key={`h-${b}`}
              style={{ gridColumn: `${c0} / span 3`, gridRow: row }}
            >
              {/* rail centre → content centre, flush with the grid's top edge */}
              <span className="col-start-2 col-end-4 row-start-1 h-px self-start bg-line" />
              {/* down into the first node */}
              <span className="col-start-1 col-end-3 row-start-1 w-px justify-self-center bg-line" />
              {/* arrival tick — perpendicular, no arrowhead, so it needs no RTL handling */}
              <span className="col-start-1 col-end-3 row-start-1 h-px w-2 self-end justify-self-center bg-line" />
            </div>
          )
        }

        return (
          <div
            aria-hidden
            className={cn('grid h-6 sm:h-8', RAIL_BAND)}
            key={`t-${b}`}
            style={{ gridColumn: `${c0} / span 3`, gridRow: row }}
          >
            <span className="col-start-1 col-end-3 row-start-1 w-px justify-self-center bg-line" />
            <span className="col-start-2 col-end-4 row-start-1 h-px self-end bg-line" />
          </div>
        )
      })}
    </div>
  )
}

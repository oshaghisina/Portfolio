import React from 'react'

import type { CaseStudyProcessBlock } from '@/payload-types'

import { cn } from '@/utilities/ui'

import type { CaseStudyBlockContext } from '../types'

export type ProcessBlockProps = CaseStudyProcessBlock & CaseStudyBlockContext

type Step = NonNullable<CaseStudyProcessBlock['steps']>[number]

/**
 * Columns per row: one row up to `oneRowMax` steps, then balanced rows of at most `rowMax`. From
 * `lg` that is 5 / 4 (6 → 3 + 3, 7 → 4 + 3, 8 → 4 + 4); on the ~560–660px tablet rail 3 / 3
 * (4 → 2 + 2, 5 → 3 + 2). A loop never wraps — its return arc spans a single row.
 */
export function processColumns(
  count: number,
  kind: CaseStudyProcessBlock['kind'],
  { oneRowMax, rowMax }: { oneRowMax: number; rowMax: number } = { oneRowMax: 5, rowMax: 4 },
): number {
  if (kind === 'loop' || count <= oneRowMax) return count
  return Math.ceil(count / Math.ceil(count / rowMax))
}

const TABLET = { oneRowMax: 3, rowMax: 3 }

/** What a node shows: its position (01, 02 …) unless the block opts into its own codes. */
export function stepMarker(
  step: Step,
  index: number,
  markers: CaseStudyProcessBlock['markers'],
): string {
  return markers === 'code' && step.code ? step.code : String(index + 1).padStart(2, '0')
}

/** A 10×6 open chevron pointing down; rotate it for the other directions. */
const Arrowhead: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    aria-hidden
    className={cn('absolute h-1.5 w-2.5 text-ink-3', className)}
    fill="none"
    viewBox="0 0 10 6"
  >
    <path d="M1 .5 5 5 9 .5" stroke="currentColor" />
  </svg>
)

const Marker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="index-code relative z-10 flex h-9 min-w-9 items-center justify-center rounded-full border border-ink-3/60 bg-background px-2 text-ink-2">
    {/* cancel the trailing letter-spacing so the marker sits optically centred */}
    <span className="-me-(--text-eyebrow--letter-spacing)">{children}</span>
  </span>
)

/**
 * A map has no order to draw: one ruled row per area — marker, name and note on the start side,
 * its parts in a small grid on the end side (under the name on phones). No connectors, because
 * nothing here happens in sequence.
 */
const ProcessMap: React.FC<{
  heading?: string | null
  markers: CaseStudyProcessBlock['markers']
  rows: Step[]
}> = ({ heading, markers, rows }) => (
  <div>
    {heading ? (
      <h3 className="text-h3 font-medium text-balance text-foreground">{heading}</h3>
    ) : null}
    <ol className={cn('border-t border-line', heading && 'mt-8')}>
      {rows.map((step, i) => {
        const parts = (step.parts ?? []).filter(Boolean)
        return (
          <li
            className="grid gap-3 border-b border-line py-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10"
            key={step.id ?? i}
          >
            <div className="flex gap-4">
              <Marker>{stepMarker(step, i, markers)}</Marker>
              <div className="flex flex-col gap-1 pt-1.5">
                <span className="text-small font-medium text-foreground">{step.label}</span>
                {step.note ? <span className="text-caption text-ink-3">{step.note}</span> : null}
              </div>
            </div>
            {parts.length ? (
              // Every part opens with its own hairline, so a wrapped row never ends on a stray rule.
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3 ps-13 md:ps-0 md:pt-1.5 lg:grid-cols-3">
                {parts.map((part, j) => (
                  <li className="border-s border-line ps-3 text-small text-ink-2" key={j}>
                    {part}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        )
      })}
    </ol>
  </div>
)

/**
 * The project's own sequence as nodes and hairlines — mono markers in small rings, labels, a
 * technical note under each. A horizontal rail from `md` (wrapping past five steps, numbers keep
 * the order), a vertical one on phones; each connector ends in an arrowhead short of the next node.
 * The line runs behind the node, so a wider code pill never breaks it. `loop` draws a dashed
 * return arc over the rail from the last node into the first (a dashed terminal row on phones).
 * Connectors use logical `start`/`end`, so the map mirrors under RTL while markers stay Latin.
 */
export const ProcessBlock: React.FC<ProcessBlockProps> = ({
  copy,
  heading,
  kind,
  markers,
  steps,
}) => {
  const rows = steps ?? []
  if (!rows.length) return null
  if (kind === 'map') return <ProcessMap heading={heading} markers={markers} rows={rows} />
  const loop = kind === 'loop'
  const cols = processColumns(rows.length, kind)
  const colsMd = processColumns(rows.length, kind, TABLET)
  const returnsTo = (
    <>
      {copy.loopsTo}{' '}
      <span className="index-code text-ink-2">{stepMarker(rows[0]!, 0, markers)}</span> ·{' '}
      {rows[0]!.label}
    </>
  )

  return (
    <div>
      {heading ? (
        <h3 className="text-h3 font-medium text-balance text-foreground">{heading}</h3>
      ) : null}
      <div
        className={cn('relative', heading && 'mt-8', loop && 'md:pt-12')}
        style={{ '--process-cols': cols, '--process-cols-md': colsMd } as React.CSSProperties}
      >
        <ol className="flex flex-col gap-8 md:grid md:grid-cols-[repeat(var(--process-cols-md),minmax(0,1fr))] md:gap-x-0 md:gap-y-12 lg:grid-cols-[repeat(var(--process-cols),minmax(0,1fr))]">
          {rows.map((step, i) => {
            const last = i === rows.length - 1
            // A row's last node gets no rail; the numbers carry the order onto the next row.
            const rail = cn(
              'hidden',
              !last && (i + 1) % colsMd !== 0 && 'md:block',
              last || (i + 1) % cols === 0 ? 'lg:hidden' : 'lg:block',
            )
            return (
              <li className="relative flex gap-4 md:flex-col md:gap-3 md:pe-6" key={step.id ?? i}>
                <span
                  aria-hidden
                  className={cn('absolute start-0 end-2 top-[1.125rem] h-px bg-line', rail)}
                />
                <Arrowhead
                  className={cn(
                    'end-[5px] top-[calc(1.125rem_-_3px)] -rotate-90 rtl:rotate-90',
                    rail,
                  )}
                />
                <div className="relative flex shrink-0 flex-col items-center md:items-start">
                  {!last || loop ? (
                    <>
                      <span
                        aria-hidden
                        className={cn(
                          'absolute inset-x-0 top-9 -bottom-6 mx-auto md:hidden',
                          last ? 'w-0 border-s border-dashed border-ink-3/60' : 'w-px bg-line',
                        )}
                      />
                      <Arrowhead className="inset-x-0 -bottom-6 mx-auto md:hidden" />
                    </>
                  ) : null}
                  <Marker>{stepMarker(step, i, markers)}</Marker>
                </div>
                <div className="flex flex-col gap-1 pt-1.5 md:pt-0">
                  <span className="text-small font-medium text-foreground">{step.label}</span>
                  {step.note ? <span className="text-caption text-ink-3">{step.note}</span> : null}
                </div>
              </li>
            )
          })}
        </ol>
        {loop ? (
          // The return arc: leaves the last node, runs back over the rail and drops into the first.
          // Its ends sit on the node centres (1.125rem into the first and last columns).
          <p className="absolute start-[1.125rem] end-[calc(100%_/_var(--process-cols)_-_1.125rem)] top-4 hidden h-8 justify-center rounded-t-lg border-x border-t border-dashed border-ink-3/60 md:flex">
            {/* centred on the dashed top edge by margin, not translate — the reveal animates translate */}
            <span className="-mt-[0.5lh] self-start bg-background px-3 eyebrow text-ink-3">
              {returnsTo}
            </span>
            <Arrowhead className="-start-[4.5px] bottom-0" />
          </p>
        ) : null}
      </div>
      {loop ? (
        <p className="mt-8 flex items-center gap-4 md:hidden">
          <span
            aria-hidden
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-dashed border-ink-3/60 text-ink-3"
          >
            <span className="rtl:-scale-x-100">↺</span>
          </span>
          <span className="eyebrow text-ink-3">{returnsTo}</span>
        </p>
      ) : null}
    </div>
  )
}

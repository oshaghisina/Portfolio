import { cn } from '@/utilities/ui'
import React from 'react'

import type { WorkspaceBlock as WorkspaceBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'

export type WorkspaceProps = Pick<WorkspaceBlockProps, 'sectionHeader' | 'tracks'> & {
  className?: string
  disableInnerContainer?: boolean
}

// Phone-only canvas nodes (one per track, up to the schema's six): fixed percentages in the lower
// half of the square canvas so they never collide with the active card. Drafting art — physical
// positions, not mirrored under RTL.
const NODE_POSITIONS = [
  { x: 16, y: 70 },
  { x: 40, y: 84 },
  { x: 62, y: 66 },
  { x: 86, y: 80 },
  { x: 74, y: 44 },
  { x: 92, y: 56 },
]

/**
 * The Workbench: the page's single largest visual artifact. A left rail of tracks, an open
 * canvas surfacing the active track's detail, an optional side note for what's next, and a
 * dark activity strip — an "operating system" for how Sina works, not a ruled table of cells.
 *
 * Below `lg` the rail would only overflow-scroll, so it goes: the toolbar carries the active
 * track, the canvas becomes a square working surface with the remaining tracks drawn as nodes,
 * and the terminal strip logs them. Same data, phone-specific internal layout.
 */
export const WorkspaceBlock: React.FC<WorkspaceProps> = ({
  className,
  disableInnerContainer,
  sectionHeader,
  tracks,
}) => {
  const rows = tracks ?? []
  if (!rows.length) return null

  const active = rows[0]
  const next = rows[1]
  const nodes = rows.slice(0, NODE_POSITIONS.length).map((track, i) => ({ track, ...NODE_POSITIONS[i] }))

  return (
    <section className={cn(!disableInnerContainer && 'container', className)}>
      <SectionHeader {...sectionHeader} className="mb-10 max-md:mb-8 max-md:border-t-0 max-md:pt-0" tagTone="mono" />

      <div className="overflow-hidden border border-line bg-panel/30">
        <div aria-hidden className="h-px bg-brand" />

        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span aria-hidden className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-ink-3/30" />
            <span className="size-2 rounded-full bg-ink-3/30" />
            <span className="size-2 rounded-full bg-ink-3/30" />
          </span>
          <span className="eyebrow truncate text-ink-3">
            sina / workbench
          </span>
          <span className="ms-auto flex shrink-0 items-center gap-1.5 whitespace-nowrap eyebrow text-ink-3">
            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
            <span className="lg:hidden">
              {active.code} · {active.label}
            </span>
            <span className="hidden lg:inline">{rows.length} / 04</span>
          </span>
        </div>

        <div className="flex flex-col lg:min-h-[30rem] lg:flex-row">
          <ol className="hidden shrink-0 border-b border-line lg:flex lg:w-56 lg:flex-col lg:border-b-0 lg:border-e">
            {rows.map((track, i) => (
              <li className="shrink-0 border-line lg:border-b" key={track.id ?? i}>
                <div
                  className={cn(
                    'flex items-center gap-2 whitespace-nowrap px-4 py-3',
                    i === 0 && 'bg-panel/70',
                  )}
                >
                  <span
                    aria-hidden
                    className={cn('size-1.5 rounded-full', i === 0 ? 'bg-brand' : 'bg-ink-3/30')}
                  />
                  <span className="index-code text-ink-3">{track.code}</span>
                  <span className={cn('eyebrow', i === 0 ? 'text-foreground' : 'text-ink-3')}>
                    {track.label}
                  </span>
                </div>
              </li>
            ))}
          </ol>

          <div
            className="relative flex min-w-0 flex-1 items-start p-6 sm:p-10 max-lg:aspect-square max-lg:min-h-[18rem]"
            style={{
              backgroundImage: 'radial-gradient(var(--line) 1px, transparent 1px)',
              backgroundSize: '1.5rem 1.5rem',
            }}
          >
            <div className="max-w-sm border border-line bg-background/90 p-5 max-lg:relative max-lg:z-10 max-lg:max-w-[14rem]">
              <span className="index-code text-ink-3">{active.code}</span>
              <h3 className="mt-2 text-h3 tracking-h3 font-medium text-foreground">{active.label}</h3>
              <p className="mt-2 text-small text-ink-2">{active.description}</p>
            </div>

            <div aria-hidden className="absolute inset-0 lg:hidden">
              <svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <polyline
                  points={nodes.map((n) => `${n.x},${n.y}`).join(' ')}
                  stroke="var(--line)"
                  strokeWidth={0.6}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {nodes.map(({ track, x, y }, i) => (
                <div
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                  key={track.id ?? i}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span
                    className={cn(
                      'size-2 rounded-full',
                      i === 0 ? 'bg-brand' : 'border border-line bg-background',
                    )}
                  />
                  <span className="index-code whitespace-nowrap text-ink-3">{track.code}</span>
                </div>
              ))}
            </div>
          </div>

          {next ? (
            <div className="hidden border-line p-6 lg:flex lg:w-52 lg:flex-col lg:border-s">
              <span className="eyebrow text-ink-3">{next.code}</span>
              <h4 className="mt-3 text-small font-medium text-foreground">{next.label}</h4>
              <p className="mt-2 text-caption text-ink-3">{next.description}</p>
            </div>
          ) : null}
        </div>

        <div
          className="flex flex-col gap-1 border-t border-line bg-panel px-4 py-2.5 lg:flex-row lg:items-center lg:gap-2"
          data-theme="dark"
        >
          <span className="flex items-center gap-2">
            <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-brand" />
            <span className="eyebrow text-ink-2">01 / {rows.length} — {active.label}</span>
          </span>
          {rows.slice(1, 4).map((track, i) => (
            <span className="eyebrow text-ink-3 lg:hidden" key={track.id ?? i}>
              › {track.code} · {track.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

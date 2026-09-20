import { cn } from '@/utilities/ui'
import React from 'react'

import type { WorkspaceBlock as WorkspaceBlockProps } from '@/payload-types'

import { SectionHeader } from '@/components/SectionHeader'

export type WorkspaceProps = Pick<WorkspaceBlockProps, 'sectionHeader' | 'tracks'> & {
  className?: string
  disableInnerContainer?: boolean
}

/**
 * The Workbench: the page's single largest visual artifact. A left rail of tracks, an open
 * canvas surfacing the active track's detail, an optional side note for what's next, and a
 * dark activity strip — an "operating system" for how Sina works, not a ruled table of cells.
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

  return (
    <section className={cn(!disableInnerContainer && 'container', className)}>
      <SectionHeader {...sectionHeader} className="mb-10" tagTone="mono" />

      <div className="overflow-hidden rounded-panel border border-line bg-panel/40">
        <div aria-hidden className="h-1 bg-brand" />

        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span aria-hidden className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-ink-3/30" />
            <span className="size-2 rounded-full bg-ink-3/30" />
            <span className="size-2 rounded-full bg-ink-3/30" />
          </span>
          <span className="eyebrow text-ink-3">sina / workbench / active</span>
          <span className="ms-auto flex items-center gap-1.5 eyebrow text-ink-3">
            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
            {rows.length} tracks
          </span>
        </div>

        <div className="flex flex-col lg:min-h-[30rem] lg:flex-row">
          <ol className="flex shrink-0 overflow-x-auto border-b border-line lg:w-56 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-e">
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
            className="relative flex flex-1 items-start p-6 sm:p-10"
            style={{
              backgroundImage: 'radial-gradient(var(--line) 1px, transparent 1px)',
              backgroundSize: '1.5rem 1.5rem',
            }}
          >
            <div className="max-w-sm rounded-panel border border-line bg-background/90 p-5">
              <span className="index-code text-ink-3">{active.code}</span>
              <h3 className="mt-2 text-h3 tracking-h3 font-medium text-foreground">{active.label}</h3>
              <p className="mt-2 text-small text-ink-2">{active.description}</p>
            </div>
          </div>

          {next ? (
            <div className="hidden border-line p-6 lg:flex lg:w-52 lg:flex-col lg:border-s">
              <span className="eyebrow text-ink-3">Next</span>
              <span className="mt-3 index-code text-ink-3">{next.code}</span>
              <h4 className="mt-1 text-small font-medium text-foreground">{next.label}</h4>
              <p className="mt-2 text-caption text-ink-3">{next.description}</p>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2 border-t border-line bg-panel px-4 py-2.5" data-theme="dark">
          <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-brand" />
          <span className="eyebrow text-ink-2">workbench live — {rows.length} tracks running</span>
        </div>
      </div>
    </section>
  )
}

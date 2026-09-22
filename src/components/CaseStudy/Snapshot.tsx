import React from 'react'

import type { Project } from '@/payload-types'

import { cn } from '@/utilities/ui'

import type { CaseStudyCopy } from './copy'

const KEYS = ['problem', 'role', 'result'] as const

export interface SnapshotProps {
  snapshot: Project['snapshot'] | null | undefined
  copy: CaseStudyCopy
  className?: string
}

/**
 * THE PROBLEM · THE ROLE · THE RESULT — one sentence each, set as three typographic columns on a
 * hairline. A recruiter gets the whole case here; the chapters below are the evidence. Renders
 * nothing while the snapshot is empty, so a half-written case study never shows empty labels.
 */
export const Snapshot: React.FC<SnapshotProps> = ({ className, copy, snapshot }) => {
  const rows = KEYS.map((key) => ({ key, value: snapshot?.[key]?.trim() })).filter(
    (row) => row.value,
  )
  if (!rows.length) return null

  return (
    <dl className={cn('grid gap-8 border-t border-line pt-8 md:grid-cols-3 md:gap-12', className)}>
      {rows.map(({ key, value }) => (
        <div className="flex flex-col gap-3" key={key}>
          <dt className="eyebrow text-ink-3">{copy.snapshot[key]}</dt>
          <dd className="text-lede text-foreground text-balance">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

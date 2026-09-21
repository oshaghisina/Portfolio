import React from 'react'

import type { CaseStudyFindingBlock } from '@/payload-types'

import type { CaseStudyBlockContext } from '../types'

export type FindingBlockProps = CaseStudyFindingBlock & CaseStudyBlockContext

/**
 * Research evidence at reading measure: a verbatim quote on a brand rule with its attribution, or
 * a synthesised finding set as a statement with its source and method in the caption line.
 */
export const FindingBlock: React.FC<FindingBlockProps> = ({ attribution, copy, kind, method, text }) => {
  const meta = [attribution?.trim(), method?.trim()].filter(Boolean).join(' · ')

  if (kind === 'quote') {
    return (
      <blockquote className="max-w-measure border-s-2 border-brand ps-6">
        <p className="text-lede text-balance text-foreground">{text}</p>
        {meta ? <footer className="mt-4 text-caption text-ink-3">— {meta}</footer> : null}
      </blockquote>
    )
  }

  return (
    <aside className="max-w-measure border-t border-line pt-6">
      <p className="eyebrow text-ink-3">{copy.sectionLabels.research}</p>
      <p className="mt-3 text-h3 font-medium text-balance text-foreground">{text}</p>
      {meta ? <p className="mt-3 text-caption text-ink-3">{meta}</p> : null}
    </aside>
  )
}

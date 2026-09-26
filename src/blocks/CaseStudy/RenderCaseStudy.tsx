import React from 'react'

import type { Project } from '@/payload-types'

import type { CaseStudyCopy } from '@/components/CaseStudy/copy'
import type { Locale } from '@/utilities/locale'
import { cn } from '@/utilities/ui'

import { buildChapters, type CaseStudySection, type Chapter, figureNumbers } from './chapters'
import { DecisionsBlock } from './Decisions/Component'
import { DownloadsBlock } from './Downloads/Component'
import { FigureBlock } from './Figure/Component'
import { FindingBlock } from './Finding/Component'
import { LessonsBlock } from './Lessons/Component'
import { NarrativeBlock } from './Narrative/Component'
import { OutcomesBlock } from './Outcomes/Component'
import { OwnershipBlock } from './Ownership/Component'
import { ProcessBlock } from './Process/Component'
import type { CaseStudyBlockContext } from './types'

export interface RenderCaseStudyProps {
  sections: Project['sections'] | null | undefined
  locale: Locale
  copy: CaseStudyCopy
  /** First figure number for the section figures — 2 when the hero already is Figure 01. */
  firstFigure?: number
  className?: string
}

/** Chapters that open the page's two big transitions: decisions → evidence, outcome → learning. */
const BIG_TRANSITION = new Set<Chapter['key']>(['decisions', 'outcomes'])

function renderBlock(
  block: CaseStudySection,
  ctx: CaseStudyBlockContext,
  chapter?: Chapter,
  figure?: string,
): React.ReactNode {
  const headingId = chapter ? `${chapter.id}-heading` : undefined
  switch (block.blockType) {
    case 'csNarrative':
      return <NarrativeBlock {...block} {...ctx} headingId={headingId} />
    case 'csFigure':
      return <FigureBlock {...block} {...ctx} number={figure ?? '01'} />
    case 'csFinding':
      return <FindingBlock {...block} {...ctx} />
    case 'csProcess':
      return <ProcessBlock {...block} {...ctx} />
    case 'csDownloads':
      return <DownloadsBlock {...block} {...ctx} />
    case 'csOwnership':
      return <OwnershipBlock {...block} {...ctx} headingId={headingId} />
    case 'csDecisions':
      return <DecisionsBlock {...block} {...ctx} headingId={headingId} />
    case 'csOutcomes':
      return <OutcomesBlock {...block} {...ctx} headingId={headingId} />
    case 'csLessons':
      return <LessonsBlock {...block} {...ctx} headingId={headingId} />
    default:
      return null
  }
}

/**
 * The narrative: chapter-opening blocks become numbered `<section>`s with a tiny technical
 * kicker ("01 CONTEXT"); evidence blocks (figures, process maps, findings, downloads) follow
 * inside the chapter above them. Typed on `Project['sections']`, so an unknown block is a compile error.
 */
export const RenderCaseStudy: React.FC<RenderCaseStudyProps> = ({
  className,
  copy,
  firstFigure = 1,
  locale,
  sections,
}) => {
  const blocks = sections ?? []
  if (!blocks.length) return null
  const chapters = buildChapters(blocks, copy)
  const byIndex = new Map(chapters.map((chapter) => [chapter.blockIndex, chapter]))
  const figures = figureNumbers(blocks, firstFigure)
  const ctx: CaseStudyBlockContext = { copy, locale }

  return (
    <div className={cn('flex flex-col', className)}>
      {blocks.map((block, index) => {
        const chapter = byIndex.get(index)
        const content = renderBlock(block, ctx, chapter, figures.get(index))
        if (!content) return null
        const key = block.id ?? `${block.blockType}-${index}`
        if (!chapter) {
          // A finding is prose evidence, so it sits in the chapter's reading column (DS-13);
          // figures and process maps take the whole canvas.
          const reading = block.blockType === 'csFinding'
          return (
            <div
              className={cn('mt-block', reading && 'lg:grid lg:grid-cols-12 lg:gap-x-16')}
              key={key}
            >
              {reading ? <div className="lg:col-span-7 lg:col-start-6">{content}</div> : content}
            </div>
          )
        }
        return (
          <section
            aria-labelledby={`${chapter.id}-heading`}
            className={cn(
              'scroll-mt-28 pt-section',
              BIG_TRANSITION.has(chapter.key) && 'mt-section border-t border-line',
            )}
            id={chapter.id}
            key={key}
          >
            <p className="mb-6 flex items-center gap-3 eyebrow text-ink-3">
              <span className="index-code">{chapter.number}</span>
              {chapter.label}
            </p>
            {content}
          </section>
        )
      })}
    </div>
  )
}

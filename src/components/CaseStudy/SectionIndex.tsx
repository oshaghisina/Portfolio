'use client'

import React from 'react'

import type { Chapter } from '@/blocks/CaseStudy/chapters'

import { cn } from '@/utilities/ui'

import { useActiveChapter, useChapterJump } from './chapterNav'

export interface SectionIndexProps {
  chapters: Chapter[]
  /** Accessible name of the navigation, e.g. "Contents". */
  label: string
  className?: string
}

/** A short case study doesn't need a table of contents; a long one benefits from a quiet one. */
export const SECTION_INDEX_MIN_CHAPTERS = 4

/**
 * DS-14 sticky margin section index: chapter numbers and labels in the inline-start rail on wide
 * viewports only (`xl` and up). Plain anchors, so it is keyboard-navigable as-is; the active
 * chapter is tracked with an IntersectionObserver and announced via `aria-current`. Below `xl`
 * the rail is not rendered — tablets and phones get the same links in `ContentsMenu` instead.
 */
export const SectionIndex: React.FC<SectionIndexProps> = ({ chapters, className, label }) => {
  const active = useActiveChapter(chapters)
  const jump = useChapterJump()

  if (chapters.length < SECTION_INDEX_MIN_CHAPTERS) return null

  return (
    <nav aria-label={label} className={cn('hidden xl:block', className)} data-reveal-skip="">
      <ol className="sticky top-32 flex flex-col gap-3">
        {chapters.map((chapter) => {
          const current = active === chapter.id
          return (
            <li key={chapter.id}>
              <a
                aria-current={current ? 'location' : undefined}
                className={cn(
                  'flex items-baseline gap-2 eyebrow leading-tight transition-colors duration-(--duration-fast) [overflow-wrap:anywhere]',
                  current ? 'text-foreground' : 'text-ink-3 hover:text-foreground',
                )}
                href={`#${chapter.id}`}
                onClick={(event) => jump(event, chapter.id)}
              >
                <span className={cn('index-code shrink-0', current && 'text-brand')}>
                  {chapter.number}
                </span>{' '}
                <span>{chapter.label}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

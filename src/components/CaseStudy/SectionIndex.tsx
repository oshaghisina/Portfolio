'use client'

import React, { useEffect, useState } from 'react'

import type { Chapter } from '@/blocks/CaseStudy/chapters'

import { cn } from '@/utilities/ui'

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
 * the rail is not rendered — content stays the priority on tablets and phones.
 */
export const SectionIndex: React.FC<SectionIndexProps> = ({ chapters, className, label }) => {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const targets = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((el): el is HTMLElement => el instanceof HTMLElement)
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -55% 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [chapters])

  if (chapters.length < SECTION_INDEX_MIN_CHAPTERS) return null

  return (
    <nav aria-label={label} className={cn('hidden xl:block', className)}>
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
              >
                <span className={cn('index-code shrink-0', current && 'text-brand')}>{chapter.number}</span>
                <span>{chapter.label}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

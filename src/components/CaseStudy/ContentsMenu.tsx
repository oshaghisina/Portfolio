'use client'

import { ChevronDown } from 'lucide-react'
import React, { useEffect, useId, useRef, useState } from 'react'

import type { Chapter } from '@/blocks/CaseStudy/chapters'

import { cn } from '@/utilities/ui'

import { useActiveChapter, useChapterJump } from './chapterNav'
import { SECTION_INDEX_MIN_CHAPTERS } from './SectionIndex'

export interface ContentsMenuProps {
  chapters: Chapter[]
  /** The button's word and the list's accessible name, e.g. "Contents". */
  label: string
  className?: string
}

/** Full bleed inside the page sheet: the sheet's own inline padding, cancelled and given back. */
const BLEED = '-mx-3 md:-mx-gutter'
const INSET = 'px-3 md:px-gutter'

/**
 * The section index below `xl`, where the margin rail (`SectionIndex`) has no room: one hairline
 * row that sticks under the site header (`h-14`; its top rule tucks under the header's border)
 * and names the chapter being read. It opens a list of the same chapters with the same anchors.
 *
 * A disclosure, not a dialog: focus stays on the button, Tab walks the list, Escape closes and
 * hands focus back, and a tap outside or focus leaving closes it. Choosing a chapter closes it,
 * glides there (or jumps, under reduced motion) and moves focus into the chapter. The list
 * scrolls on its own when it outgrows the screen — `data-lenis-prevent`, since root-mode Lenis
 * would otherwise swallow the wheel. Hidden from `xl` up; renders nothing for a short study.
 */
export const ContentsMenu: React.FC<ContentsMenuProps> = ({ chapters, className, label }) => {
  const [open, setOpen] = useState(false)
  const active = useActiveChapter(chapters)
  const jump = useChapterJump()
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  if (chapters.length < SECTION_INDEX_MIN_CHAPTERS) return null

  const current = chapters.find((chapter) => chapter.id === active)

  return (
    <div
      className={cn(
        'sticky top-[calc(3.5rem-1px)] z-10 border-y border-line bg-paper xl:hidden',
        BLEED,
        className,
      )}
      data-phone-contents=""
      data-reveal-skip=""
      onBlur={(event) => {
        if (open && !rootRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || !open) return
        event.preventDefault()
        setOpen(false)
        buttonRef.current?.focus()
      }}
      ref={rootRef}
    >
      <button
        aria-controls={listId}
        aria-expanded={open}
        className={cn(
          'flex h-11 w-full items-center gap-3 text-start',
          'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
          INSET,
        )}
        onClick={() => setOpen((was) => !was)}
        ref={buttonRef}
        type="button"
      >
        {/* The spaces between the spans are for the accessible name ("Contents 03 Research");
            flex layout drops them. */}
        <span className="eyebrow shrink-0 text-ink-3">{label}</span>{' '}
        {current ? (
          <>
            <span aria-hidden className="h-3.5 w-px shrink-0 bg-line" />
            <span className="flex min-w-0 items-baseline gap-2 eyebrow text-foreground">
              <span className="index-code shrink-0 text-brand">{current.number}</span>{' '}
              <span className="truncate">{current.label}</span>
            </span>
          </>
        ) : null}
        <ChevronDown
          aria-hidden
          className={cn(
            'ms-auto size-4 shrink-0 text-ink-3 motion-safe:transition-transform motion-safe:duration-(--duration-fast)',
            open && 'rotate-180',
          )}
        />
      </button>
      <nav
        aria-label={label}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain border-b border-line bg-paper"
        data-lenis-prevent=""
        hidden={!open}
        id={listId}
      >
        <ol className="py-2">
          {chapters.map((chapter) => {
            const here = chapter.id === active
            return (
              <li key={chapter.id}>
                <a
                  aria-current={here ? 'location' : undefined}
                  className={cn(
                    'flex min-h-11 items-center gap-3 py-2 eyebrow leading-tight [overflow-wrap:anywhere]',
                    'transition-colors duration-(--duration-fast) ease-standard hover:bg-panel',
                    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
                    here ? 'text-foreground' : 'text-ink-2 hover:text-foreground',
                    INSET,
                  )}
                  href={`#${chapter.id}`}
                  onClick={(event) => {
                    setOpen(false)
                    jump(event, chapter.id)
                  }}
                >
                  <span className={cn('index-code shrink-0', here && 'text-brand')}>
                    {chapter.number}
                  </span>{' '}
                  <span>{chapter.label}</span>
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}

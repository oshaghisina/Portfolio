import type { Project } from '@/payload-types'

import type { CaseStudyCopy, ChapterKey } from '@/components/CaseStudy/copy'
import { pad } from '@/components/CaseStudy/plate'

export type CaseStudySection = NonNullable<Project['sections']>[number]

export interface Chapter {
  /** Anchor id — built from the number and key, so it is the same in every locale. */
  id: string
  /** Zero-padded ordinal: "01". */
  number: string
  key: ChapterKey
  /** Rendered label in the page language ("Context", "زمینه"). */
  label: string
  /** Index into `sections`. */
  blockIndex: number
}

/**
 * Which blocks open a numbered chapter. Figures, process maps and findings are evidence that
 * belongs to the chapter above them, so they never take a number of their own.
 */
export function chapterKey(block: CaseStudySection): ChapterKey | null {
  switch (block.blockType) {
    case 'csNarrative':
      return block.label
    case 'csOwnership':
      return 'ownership'
    case 'csDecisions':
      return 'decisions'
    case 'csOutcomes':
      return 'outcomes'
    case 'csLessons':
      return 'lessons'
    default:
      return null
  }
}

/** The chapter list of a case study — feeds the kickers ("01 CONTEXT") and the section index. */
export function buildChapters(
  sections: Project['sections'] | null | undefined,
  copy: CaseStudyCopy,
): Chapter[] {
  const chapters: Chapter[] = []
  ;(sections ?? []).forEach((block, blockIndex) => {
    const key = chapterKey(block)
    if (!key) return
    const number = pad(chapters.length + 1)
    const custom =
      block.blockType === 'csNarrative' && key === 'custom' ? block.customLabel?.trim() : undefined
    chapters.push({
      id: `s${number}-${key}`,
      number,
      key,
      label: custom || copy.sectionLabels[key],
      blockIndex,
    })
  })
  return chapters
}

/** Figure numbers by block index — the hero (when it has media) is Figure 01, so figures start after it. */
export function figureNumbers(
  sections: Project['sections'] | null | undefined,
  startAt = 1,
): Map<number, string> {
  const numbers = new Map<number, string>()
  let n = startAt
  ;(sections ?? []).forEach((block, blockIndex) => {
    if (block.blockType !== 'csFigure') return
    numbers.set(blockIndex, pad(n))
    n += 1
  })
  return numbers
}

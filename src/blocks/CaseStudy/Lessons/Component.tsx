import React from 'react'

import type { CaseStudyLessonsBlock } from '@/payload-types'

import { EditorialGrid } from '@/blocks/Content/EditorialGrid'
import { pad } from '@/components/CaseStudy/plate'

import type { CaseStudyBlockContext } from '../types'

export type LessonsBlockProps = CaseStudyLessonsBlock &
  CaseStudyBlockContext & { headingId?: string }

/** What I learned — a numbered list of concrete lessons at reading measure; the intellectual close. */
export const LessonsBlock: React.FC<LessonsBlockProps> = ({ copy, heading, headingId, items }) => {
  const rows = items ?? []
  if (!rows.length) return null

  return (
    <EditorialGrid>
      <h2 className="text-h2 font-medium text-balance text-foreground" id={headingId}>
        {heading || copy.sectionLabels.lessons}
      </h2>
      <ol className="flex flex-col gap-10">
        {rows.map((lesson, i) => (
          <li className="flex gap-5" key={lesson.id ?? i}>
            <span className="index-code shrink-0 pt-1.5 text-ink-3">{pad(i + 1)}</span>
            <div>
              <h3 className="text-h3 font-medium text-balance text-foreground">{lesson.title}</h3>
              {lesson.body ? <p className="mt-3 text-body text-ink-2">{lesson.body}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </EditorialGrid>
  )
}

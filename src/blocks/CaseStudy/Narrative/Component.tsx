import React from 'react'

import type { CaseStudyNarrativeBlock } from '@/payload-types'

import { EditorialGrid } from '@/blocks/Content/EditorialGrid'
import RichText from '@/components/RichText'

import type { CaseStudyBlockContext } from '../types'

export type NarrativeBlockProps = CaseStudyNarrativeBlock &
  CaseStudyBlockContext & {
    /** Id of the chapter heading, referenced by the wrapping section's `aria-labelledby`. */
    headingId?: string
  }

/**
 * A chapter's prose in the DS-13 editorial grid: the verdict heading on the start side, the body
 * on the end side at reading measure, and an optional pull line — the one sentence to remember.
 */
export const NarrativeBlock: React.FC<NarrativeBlockProps> = ({
  body,
  heading,
  headingId,
  insight,
  locale,
}) => (
  <EditorialGrid>
    <h2 className="text-h2 font-medium text-balance text-foreground" id={headingId}>
      {heading}
    </h2>
    <div className="flex flex-col gap-8">
      {body ? <RichText data={body} enableGutter={false} locale={locale} /> : null}
      {insight ? (
        <p className="border-s-2 border-brand ps-6 text-lede font-medium text-balance text-foreground">
          {insight}
        </p>
      ) : null}
    </div>
  </EditorialGrid>
)

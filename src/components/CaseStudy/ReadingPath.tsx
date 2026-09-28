import React from 'react'

import type { Project } from '@/payload-types'

import type { Chapter } from '@/blocks/CaseStudy/chapters'
import { RenderCaseStudy } from '@/blocks/CaseStudy/RenderCaseStudy'
import type { Locale } from '@/utilities/locale'

import { CaseStudyHero, hasHeroMedia } from './CaseStudyHero'
import { ContentsMenu } from './ContentsMenu'
import type { CaseStudyCopy } from './copy'
import { SectionIndex } from './SectionIndex'
import { Snapshot } from './Snapshot'

export interface CaseStudyReadingPathProps {
  project: Pick<Project, 'hero' | 'sections' | 'snapshot'>
  chapters: Chapter[]
  copy: CaseStudyCopy
  locale: Locale
}

/**
 * Everything between the header and the hand-over, in reading order. The quick path comes
 * first: the snapshot's problem, role and result sit straight under the header, so a quick
 * reader has the whole case before the hero's gallery (R06). Then the evidence: the hero and the
 * numbered chapters, with the section index beside them from `xl` and the contents row above
 * them below `xl` — it sticks under the header from the hero to the last chapter.
 */
export const CaseStudyReadingPath: React.FC<CaseStudyReadingPathProps> = ({
  chapters,
  copy,
  locale,
  project,
}) => (
  <>
    <Snapshot className="mt-12 md:mt-16" copy={copy} snapshot={project.snapshot} />
    <div className="mt-12 md:mt-20">
      <ContentsMenu chapters={chapters} className="mb-8 md:mb-10" label={copy.contents} />
      <CaseStudyHero copy={copy} hero={project.hero} />
      {/* Wide viewports get the DS-14 margin index in an inline-start rail; below `xl` the narrative takes the full width. */}
      <div className="xl:grid xl:grid-cols-[9rem_minmax(0,1fr)] xl:gap-x-10">
        <SectionIndex chapters={chapters} className="xl:pt-section" label={copy.contents} />
        <RenderCaseStudy
          copy={copy}
          firstFigure={hasHeroMedia(project.hero) ? 2 : 1}
          locale={locale}
          sections={project.sections}
        />
      </div>
    </div>
  </>
)

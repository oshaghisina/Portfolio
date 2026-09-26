import type { Block } from 'payload'

import { CaseStudyDecisions } from './Decisions/config'
import { CaseStudyDownloads } from './Downloads/config'
import { CaseStudyFigure } from './Figure/config'
import { CaseStudyFinding } from './Finding/config'
import { CaseStudyLessons } from './Lessons/config'
import { CaseStudyNarrative } from './Narrative/config'
import { CaseStudyOutcomes } from './Outcomes/config'
import { CaseStudyOwnership } from './Ownership/config'
import { CaseStudyProcess } from './Process/config'

/**
 * The controlled case-study vocabulary (D-022, downloads D-047): nine semantic blocks, in the
 * order an editor is most likely to reach for them. Narrative, ownership, decisions, outcomes and
 * lessons open numbered chapters; figures, process maps, findings and downloads are evidence
 * inside the current chapter.
 */
export const caseStudyBlocks: Block[] = [
  CaseStudyNarrative,
  CaseStudyFigure,
  CaseStudyFinding,
  CaseStudyProcess,
  CaseStudyDownloads,
  CaseStudyOwnership,
  CaseStudyDecisions,
  CaseStudyOutcomes,
  CaseStudyLessons,
]

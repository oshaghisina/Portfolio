import type { Project } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { archiveIdentity } from '../archive'
import { assertCopyShape, type CspCopy, type CspStudy, cspLocalizedFields, cspMedia } from '../carsparency/shared'
import ar from './copy/oteacher-product-roadmap.ar.json'
import de from './copy/oteacher-product-roadmap.de.json'
import en from './copy/oteacher-product-roadmap.en.json'
import es from './copy/oteacher-product-roadmap.es.json'
import fa from './copy/oteacher-product-roadmap.fa.json'
import fr from './copy/oteacher-product-roadmap.fr.json'
import ja from './copy/oteacher-product-roadmap.ja.json'

/**
 * OTeacher product strategy (`/work/oteacher-product-roadmap`) — the four-week strategy process
 * behind a redesign request, from the "OTeacher | Strategy - Docs" Figma file (scanned 2026-09-26,
 * recorded in `Docs/Experience/OTeacher/product-roadmap-and-strategy/SCAN.md`). Sina asked for the
 * file's Questions page to be covered in full — the presentation and every department's question
 * list — and for frame 102's photographs to show the deep interviews with teachers.
 *
 * The four `pages` figures are the four rows of the Questions page (plan, surveys, market
 * research, strategy draft), so each board can be opened and read. Slides are padded to the
 * index's 16:10 tile so no title is cropped.
 *
 * Publication gates (held here and in `tests/int/case-study-seeds.int.spec.ts`):
 * - Only `study/` is uploaded. Never the market-size slide (company revenue estimates), the SWOT
 *   slide (an unfinished template about another company), the teacher-interview spreadsheet slide
 *   (teachers' personal details), the persona boards (interviewees' names; AI portraits), or the
 *   team, board and timeline slides (names and photographs of staff and investors), or the
 *   sticky-note draft of the roadmap (the product manager's stickies, each signed with their name).
 * - No person is named: not the product manager, not a persona, not an investor.
 * - No outcome after the strategy file: the file records the plan, not what happened next.
 */
const SLUG = 'oteacher-product-roadmap'
const ARCHIVE = archiveIdentity(SLUG)
const COPY: Record<Locale, CspCopy> = { en, fa, ar, es, de, fr, ja }
assertCopyShape(SLUG, COPY)

const N = 'oteacher-strategy--'

const FILES = {
  cover: { file: 'study/full/hero-title.png', name: ARCHIVE.row.cover.name },
  concerns: { file: 'study/full/concerns.png', name: `${N}concerns.png` },

  plan01: { file: 'study/plan/01-title.png', name: `${N}plan-01-title.png` },
  plan02: { file: 'study/plan/02-concerns.png', name: `${N}plan-02-concerns.png` },
  plan03: { file: 'study/plan/03-calendar.png', name: `${N}plan-03-calendar.png` },
  plan04: { file: 'study/plan/04-week-1.png', name: `${N}plan-04-week-1.png` },
  plan05: { file: 'study/plan/05-week-2.png', name: `${N}plan-05-week-2.png` },
  plan06: { file: 'study/plan/06-week-3.png', name: `${N}plan-06-week-3.png` },
  plan07: { file: 'study/plan/07-week-4a.png', name: `${N}plan-07-week-4a.png` },
  plan08: { file: 'study/plan/08-week-4b.png', name: `${N}plan-08-week-4b.png` },
  plan09: { file: 'study/plan/09-market-doc.png', name: `${N}plan-09-market-doc.png` },
  plan10: { file: 'study/plan/10-market-steps-1.png', name: `${N}plan-10-market-steps-1.png` },
  plan11: { file: 'study/plan/11-market-steps-2.png', name: `${N}plan-11-market-steps-2.png` },

  survey1: { file: 'study/surveys/1-product.png', name: `${N}survey-1-product.png` },
  survey2: { file: 'study/surveys/2-marketing.png', name: `${N}survey-2-marketing.png` },
  survey3: { file: 'study/surveys/3-education.png', name: `${N}survey-3-education.png` },
  survey4: { file: 'study/surveys/4-support.png', name: `${N}survey-4-support.png` },
  survey5: { file: 'study/surveys/5-technical.png', name: `${N}survey-5-technical.png` },
  survey6: { file: 'study/surveys/6-finance.png', name: `${N}survey-6-finance.png` },
  survey7: { file: 'study/surveys/7-management.png', name: `${N}survey-7-management.png` },
  survey8: { file: 'study/surveys/8-operations.png', name: `${N}survey-8-operations.png` },

  market01: { file: 'study/market/01-title.png', name: `${N}market-01-title.png` },
  market02: { file: 'study/market/02-culture.png', name: `${N}market-02-culture.png` },
  market03: { file: 'study/market/03-approach.png', name: `${N}market-03-approach.png` },
  market04: { file: 'study/market/04-value.png', name: `${N}market-04-value.png` },
  market05: { file: 'study/market/05-stakeholders.png', name: `${N}market-05-stakeholders.png` },
  market06: { file: 'study/market/06-unrealized-profit.png', name: `${N}market-06-unrealized-profit.png` },
  market07: { file: 'study/market/07-operating-profit.png', name: `${N}market-07-operating-profit.png` },
  market08: { file: 'study/market/08-scenarios.png', name: `${N}market-08-scenarios.png` },
  market09: { file: 'study/market/09-decision.png', name: `${N}market-09-decision.png` },

  interviews: { file: 'study/full/interviews.jpg', name: `${N}teacher-interviews.jpg` },
  teacherConclusions: { file: 'study/full/teacher-conclusions.png', name: `${N}teacher-conclusions.png` },
  learnerConclusions: { file: 'study/full/learner-conclusions.png', name: `${N}learner-conclusions.png` },

  brandPosition: { file: 'study/full/brand-position.png', name: `${N}brand-position.png` },
  roadmap: { file: 'study/full/roadmap.png', name: `${N}roadmap.png` },
  fall: { file: 'study/full/fall-1402.png', name: `${N}roadmap-fall-1402.png` },
  winter: { file: 'study/full/winter-1402.png', name: `${N}roadmap-winter-1402.png` },
  future: { file: 'study/full/future.png', name: `${N}roadmap-future.png` },

  draft01: { file: 'study/draft/01-title.png', name: `${N}draft-01-title.png` },
  draft02: { file: 'study/draft/02-culture.png', name: `${N}draft-02-culture.png` },
  draft03: { file: 'study/draft/03-mission.png', name: `${N}draft-03-mission.png` },
  draft04: { file: 'study/draft/04-unrealized-profit.png', name: `${N}draft-04-unrealized-profit.png` },
  draft05: { file: 'study/draft/05-brand-position.png', name: `${N}draft-05-brand-position.png` },
  draft06: { file: 'study/draft/06-goals.png', name: `${N}draft-06-goals.png` },
  draft07: { file: 'study/draft/07-operating-profit.png', name: `${N}draft-07-operating-profit.png` },
  draft08: { file: 'study/draft/08-personas.png', name: `${N}draft-08-personas.png` },
  draft09: { file: 'study/draft/09-stakeholder-value.png', name: `${N}draft-09-stakeholder-value.png` },
  draft10: { file: 'study/draft/10-teacher-conclusions.png', name: `${N}draft-10-teacher-conclusions.png` },
  draft11: { file: 'study/draft/11-learner-conclusions.png', name: `${N}draft-11-learner-conclusions.png` },

  educationUnit: { file: 'study/full/education-unit.png', name: `${N}education-unit.png` },
} as const

type Key = keyof typeof FILES

const STUDY: CspStudy<Key> = {
  slug: SLUG,
  prefix: 'ote',
  assetsDir: 'Docs/Experience/OTeacher/product-roadmap-and-strategy/assets',
  files: FILES,
  hero: ['cover'],
  cover: 'cover',
  copy: COPY,
  plan: [
    { type: 'narrative', key: 'context', label: 'context' },
    { type: 'narrative', key: 'problem', label: 'problem' },
    { type: 'figure', key: 'concerns', layout: 'full', treatment: 'plain', media: ['concerns'] },
    { type: 'process', codes: ['W1', 'W2', 'W3', 'W4A', 'W4B'] },
    {
      type: 'figure',
      key: 'plan',
      layout: 'pages',
      treatment: 'plain',
      media: ['plan01', 'plan02', 'plan03', 'plan04', 'plan05', 'plan06', 'plan07', 'plan08', 'plan09', 'plan10', 'plan11'],
    },
    { type: 'narrative', key: 'surveys', label: 'approach' },
    {
      type: 'figure',
      key: 'surveys',
      layout: 'pages',
      treatment: 'plain',
      media: ['survey1', 'survey2', 'survey3', 'survey4', 'survey5', 'survey6', 'survey7', 'survey8'],
    },
    { type: 'narrative', key: 'market', label: 'custom' },
    {
      type: 'figure',
      key: 'market',
      layout: 'pages',
      treatment: 'plain',
      media: ['market01', 'market02', 'market03', 'market04', 'market05', 'market06', 'market07', 'market08', 'market09'],
    },
    { type: 'narrative', key: 'interviews', label: 'research' },
    { type: 'figure', key: 'interviews', layout: 'full', treatment: 'plain', media: ['interviews'] },
    { type: 'narrative', key: 'personas', label: 'custom' },
    {
      type: 'figure',
      key: 'conclusions',
      layout: 'split',
      treatment: 'plain',
      media: ['teacherConclusions', 'learnerConclusions'],
    },
    { type: 'narrative', key: 'strategy', label: 'solution' },
    { type: 'figure', key: 'position', layout: 'full', treatment: 'plain', media: ['brandPosition'] },
    { type: 'figure', key: 'roadmap', layout: 'full', treatment: 'plain', media: ['roadmap'] },
    { type: 'figure', key: 'horizons', layout: 'sequence', treatment: 'plain', media: ['fall', 'winter', 'future'] },
    {
      type: 'figure',
      key: 'draft',
      layout: 'pages',
      treatment: 'plain',
      media: [
        'draft01',
        'draft02',
        'draft03',
        'draft04',
        'draft05',
        'draft06',
        'draft07',
        'draft08',
        'draft09',
        'draft10',
        'draft11',
      ],
    },
    { type: 'narrative', key: 'education', label: 'custom' },
    { type: 'figure', key: 'education', layout: 'full', treatment: 'plain', media: ['educationUnit'] },
    { type: 'decisions' },
    { type: 'ownership' },
    { type: 'outcomes', values: ['8', '9', '16'] },
    { type: 'lessons' },
  ],
}

export const OTE_SLUG = SLUG
export const OTE_ASSETS = STUDY.assetsDir
export const OTE_MEDIA = cspMedia(STUDY)
export const OTE_COVER_KEY: Key = STUDY.cover
export const oteLocalizedFields = cspLocalizedFields(STUDY)

// No `projectStatus` or `period`: Sina's OTeacher dates are still open (README Q2); the plan's own
// dates (from 6 Shahrivar 1402) are told in the copy.
export const OTE_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  tools: ['Figma'],
}

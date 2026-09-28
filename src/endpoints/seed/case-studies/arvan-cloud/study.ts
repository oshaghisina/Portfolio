import type { Project } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { archiveIdentity } from '../archive'
import { assertCopyShape, type CspCopy, type CspStudy, cspLocalizedFields, cspMedia } from '../carsparency/shared'
import ar from './copy/arvan-cloud.ar.json'
import de from './copy/arvan-cloud.de.json'
import en from './copy/arvan-cloud.en.json'
import es from './copy/arvan-cloud.es.json'
import fa from './copy/arvan-cloud.fa.json'
import fr from './copy/arvan-cloud.fr.json'
import ja from './copy/arvan-cloud.ja.json'

/**
 * Arvan Cloud's console redesign (`/work/arvan-cloud-platform-redesign`), from two sources Sina named
 * on 2026-09-27, both recorded in `Docs/Experience/Arvan-Cloud/platform-redesign/README.md`:
 * - three Dribbble shots — "Improving the UX for Buying Cloud VPS" (a write-up and five research
 *   images), "Server detail" and "File manager in cloud storage";
 * - the IAAS Figma file: the research page (a moderated usability test, the Heap requirements and
 *   presentation, a tracking plan for every wizard step, panel-side metrics) and the Final design
 *   frames that carry Sina's name in the header (the server list, the wizard's last step, a licence
 *   notice).
 * The chapter grammar is the Carsparency one (`../carsparency/shared.ts`), used unchanged.
 *
 * Publication gates (held here and in `tests/int/case-study-seeds.int.spec.ts`):
 * - Only `study/` is uploaded: the research images scaled, the group-analysis table with its user
 *   counts blurred (as Sina blurred them in the funnel shot), the two panel screens cropped out of
 *   their Dribbble frames, and Figma exports of Sina-named frames and Sina's research boards. Never
 *   the Dribbble title card (a 3D hand-and-tablet mock-up), the usability board with the
 *   participant's details, boards that show the pre-redesign console, or frames whose header carries
 *   another account name: a second designer worked on the console with Sina (Sina, 2026-09-27), so
 *   those frames are that designer's (README Q7). The copy says so without naming them.
 * - The usability test is told in words, without the participant's name, age or city.
 * - The size comparison was a real A/B test (Sina, 2026-09-27, README Q2), but the write-up's
 *   "100.00% vs 87.74%" is not repeated as a win: it is the share of each group that reached the size
 *   step, 100% by construction for anyone who used the sliders. The copy gives the end-to-end rates
 *   beside it (README, "Reading the group analysis").
 * - No company superlatives, NPS or satisfaction claim, sanctions context, prices, or absolute user
 *   and event counts. Shipped: yes (Sina, 2026-09-27, README Q3). Not claimed: dates beyond the
 *   research boards' own (Q1).
 */
const SLUG = 'arvan-cloud-platform-redesign'
const ARCHIVE = archiveIdentity(SLUG)
const COPY: Record<Locale, CspCopy> = { en, fa, ar, es, de, fr, ja }
assertCopyShape(SLUG, COPY)

const N = `${SLUG}--`

const FILES = {
  cover: { file: 'study/panel/server-detail.jpg', name: ARCHIVE.row.cover.name },
  fileManager: { file: 'study/panel/file-manager.jpg', name: `${N}file-manager.jpg` },
  serverList: { file: 'study/panel/server-list.jpg', name: `${N}server-list.jpg` },
  createResult: { file: 'study/panel/create-result.jpg', name: `${N}create-result.jpg` },
  windowsNotice: { file: 'study/panel/windows-notice.jpg', name: `${N}windows-notice.jpg` },
  siteToPanel: { file: 'study/research/site-to-panel.jpg', name: `${N}site-to-panel.jpg` },
  heapRequirements: { file: 'study/research/heap-requirements.jpg', name: `${N}heap-requirements.jpg` },
  metricsKpi: { file: 'study/research/metrics-kpi.jpg', name: `${N}metrics-kpi.jpg` },
  wizardFunnel: { file: 'study/research/wizard-funnel.jpg', name: `${N}wizard-funnel.jpg` },
  effort: { file: 'study/research/effort-analysis.jpg', name: `${N}effort-analysis.jpg` },
  sizeOptions: { file: 'study/wizard/size-options.jpg', name: `${N}size-options.jpg` },
  groups: { file: 'study/research/group-analysis.jpg', name: `${N}group-analysis.jpg` },
} as const

type Key = keyof typeof FILES

const STUDY: CspStudy<Key> = {
  slug: SLUG,
  prefix: 'arv',
  assetsDir: 'Docs/Experience/Arvan-Cloud/platform-redesign/assets',
  files: FILES,
  // The server page is the hero only; the console chapter points back to it rather than repeating it.
  hero: ['cover'],
  cover: 'cover',
  copy: COPY,
  plan: [
    { type: 'narrative', key: 'context', label: 'context' },
    { type: 'narrative', key: 'problem', label: 'problem' },
    { type: 'figure', key: 'siteToPanel', layout: 'full', treatment: 'plain', media: ['siteToPanel'] },
    { type: 'narrative', key: 'research', label: 'research' },
    // Two tall Persian text boards: a grid of first screens, each opening whole.
    { type: 'figure', key: 'boards', layout: 'pages', treatment: 'plain', media: ['heapRequirements', 'metricsKpi'] },
    { type: 'process', codes: ['VOC', 'TOOL', 'PLAN', 'FNL', 'OPT', 'CMP'] },
    { type: 'figure', key: 'wizardFunnel', layout: 'full', treatment: 'plain', media: ['wizardFunnel'] },
    { type: 'figure', key: 'effort', layout: 'full', treatment: 'plain', media: ['effort'] },
    { type: 'narrative', key: 'solution', label: 'solution' },
    { type: 'figure', key: 'sizeOptions', layout: 'full', treatment: 'plain', media: ['sizeOptions'] },
    { type: 'narrative', key: 'comparison', label: 'custom' },
    { type: 'figure', key: 'groups', layout: 'full', treatment: 'plain', media: ['groups'] },
    { type: 'narrative', key: 'handoff', label: 'custom' },
    { type: 'figure', key: 'createResult', layout: 'full', treatment: 'plain', media: ['createResult'] },
    { type: 'narrative', key: 'console', label: 'custom' },
    { type: 'figure', key: 'serverList', layout: 'full', treatment: 'plain', media: ['serverList'] },
    { type: 'figure', key: 'fileManager', layout: 'full', treatment: 'plain', media: ['fileManager'] },
    { type: 'decisions', media: { 5: 'windowsNotice' } },
    { type: 'ownership' },
    { type: 'outcomes', values: ['5', '7', '2', '4'] },
    { type: 'lessons' },
  ],
}

export const ARV_SLUG = SLUG
export const ARV_ASSETS = STUDY.assetsDir
export const ARV_MEDIA = cspMedia(STUDY)
export const ARV_COVER_KEY: Key = STUDY.cover
export const arvLocalizedFields = cspLocalizedFields(STUDY)

// Sina confirmed on 2026-09-27 that the designs shipped (README Q3). No `period`: the dates are still
// open (Q1 — the write-up says January 2020 to December 2022, the resume two years; the research
// boards are dated September and October 2021).
export const ARV_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'shipped',
  tools: ['Figma', 'Heap', 'Google Analytics', 'Google Tag Manager'],
}

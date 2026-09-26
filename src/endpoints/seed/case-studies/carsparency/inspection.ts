import type { Locale } from '@/utilities/locale'

import { archiveIdentity } from '../archive'
import ar from './copy/inspection.ar.json'
import de from './copy/inspection.de.json'
import en from './copy/inspection.en.json'
import es from './copy/inspection.es.json'
import fa from './copy/inspection.fa.json'
import fr from './copy/inspection.fr.json'
import ja from './copy/inspection.ja.json'
import { assertCopyShape, type CspCopy, type CspStudy, cspLocalizedFields, cspMedia } from './shared'

/**
 * Carsparency Inspection — the inspector’s field app: queue, car-details wizard, ten survey areas, defects with photos.
 * Evidence and node ids: `Docs/Experience/Carsparency-Khodro45/CARSPARENCY-AUDIT.md`.
 */
const SLUG = 'carsparency-inspection'
const ARCHIVE = archiveIdentity(SLUG)
const COPY: Record<Locale, CspCopy> = { en, fa, ar, es, de, fr, ja }
assertCopyShape(SLUG, COPY)

const FILES = {
  pictures: { file: '2x/car-picture-cover.png', name: ARCHIVE.row.cover.name },
  dashboard: { file: '2x/dashboard.png', name: 'carsparency-inspection--dashboard.png' },
  list: { file: '2x/inspection-list.png', name: 'carsparency-inspection--queue.png' },
  tireBody: { file: '2x/inspection-detail.png', name: 'carsparency-inspection--tyre-body.png' },
  wizard1: { file: '2x/wizard-step-1.png', name: 'carsparency-inspection--wizard-1.png' },
  wizard2: { file: '2x/wizard-step-2.png', name: 'carsparency-inspection--wizard-2.png' },
  takePicture: { file: '2x/take-picture.png', name: 'carsparency-inspection--take-picture.png' },
  reportDefects: { file: 'site/report-defects.png', name: 'carsparency-inspection--report-defects.png' },
} as const

type Key = keyof typeof FILES

const STUDY: CspStudy<Key> = {
  slug: SLUG,
  prefix: 'cins',
  assetsDir: 'Docs/Experience/Carsparency-Khodro45/carsparency-inspection/assets',
  files: FILES,
  hero: ['dashboard', 'list', 'tireBody'],
  cover: 'pictures',
  copy: COPY,
  plan: [
    { type: 'narrative', key: 'context', label: 'context' },
    { type: 'narrative', key: 'problem', label: 'problem' },
    { type: 'narrative', key: 'flow', label: 'custom' },
    { type: 'process', codes: ['LIST', 'CAR', 'AREA', 'PHOT', 'DONE'] },
    { type: 'figure', key: 'wizard', layout: 'split', treatment: 'screen', media: ['wizard1', 'wizard2'] },
    { type: 'figure', key: 'checklist', layout: 'annotated', treatment: 'screen', media: ['tireBody'] },
    { type: 'decisions' },
    { type: 'narrative', key: 'solution', label: 'solution' },
    { type: 'figure', key: 'photos', layout: 'split', treatment: 'screen', media: ['pictures', 'takePicture'] },
    { type: 'narrative', key: 'ecosystem', label: 'custom' },
    { type: 'figure', key: 'report', layout: 'full', treatment: 'plain', media: ['reportDefects'] },
    { type: 'ownership' },
    { type: 'outcomes', values: ['27', '10', '6'] },
    { type: 'lessons' },
  ],
}

export const CINS_SLUG = SLUG
export const CINS_ASSETS = STUDY.assetsDir
export const CINS_MEDIA = cspMedia(STUDY)
export const CINS_COVER_KEY: Key = STUDY.cover
export const cinsLocalizedFields = cspLocalizedFields(STUDY)

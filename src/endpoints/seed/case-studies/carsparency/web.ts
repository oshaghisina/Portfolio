import type { Locale } from '@/utilities/locale'

import { archiveIdentity } from '../archive'
import ar from './copy/web.ar.json'
import de from './copy/web.de.json'
import en from './copy/web.en.json'
import es from './copy/web.es.json'
import fa from './copy/web.fa.json'
import fr from './copy/web.fr.json'
import ja from './copy/web.ja.json'
import { assertCopyShape, type CspCopy, type CspStudy, cspLocalizedFields, cspMedia } from './shared'

/**
 * Carsparency Web — the private seller’s journey: valuation entry, three-step wizard, estimates, guided self-inspection.
 * Evidence and node ids: `Docs/Experience/Carsparency-Khodro45/CARSPARENCY-AUDIT.md`.
 */
const SLUG = 'carsparency-web'
const ARCHIVE = archiveIdentity(SLUG)
const COPY: Record<Locale, CspCopy> = { en, fa, ar, es, de, fr, ja }
assertCopyShape(SLUG, COPY)

const FILES = {
  homeFold: { file: 'site/home-fold.png', name: ARCHIVE.row.cover.name },
  brand: { file: 'wizard/select-brand.png', name: 'carsparency-web--wizard-brand.png' },
  before: { file: 'wizard/estimate-before.png', name: 'carsparency-web--estimate-before.png' },
  after: { file: 'wizard/estimate-after.png', name: 'carsparency-web--estimate-after.png' },
  finance: { file: 'wizard/finance.png', name: 'carsparency-web--finance.png' },
  welcome: { file: 'self-inspection/welcome.png', name: 'carsparency-web--self-inspection-welcome.png' },
  position: { file: 'self-inspection/position-car.png', name: 'carsparency-web--self-inspection-position.png' },
  review: { file: 'self-inspection/review-photos.png', name: 'carsparency-web--photo-review.png' },
  checklist: { file: 'self-inspection/condition-checklist.png', name: 'carsparency-web--condition-checklist.png' },
  damage: { file: 'self-inspection/damage-size.png', name: 'carsparency-web--damage-locator.png' },
} as const

type Key = keyof typeof FILES

const STUDY: CspStudy<Key> = {
  slug: SLUG,
  prefix: 'cweb',
  assetsDir: 'Docs/Experience/Carsparency-Khodro45/carsparency-web/assets',
  files: FILES,
  hero: ['brand', 'before', 'welcome'],
  cover: 'homeFold',
  copy: COPY,
  plan: [
    { type: 'narrative', key: 'context', label: 'context' },
    { type: 'figure', key: 'home', layout: 'full', treatment: 'plain', media: ['homeFold'] },
    { type: 'narrative', key: 'problem', label: 'problem' },
    { type: 'narrative', key: 'flow', label: 'custom' },
    { type: 'process', codes: ['INFO', 'EST1', 'DETL', 'EST2', 'SELF'] },
    { type: 'figure', key: 'estimates', layout: 'split', treatment: 'screen', media: ['before', 'after'] },
    { type: 'decisions' },
    { type: 'narrative', key: 'solution', label: 'solution' },
    { type: 'figure', key: 'guidance', layout: 'split', treatment: 'screen', media: ['finance', 'position'] },
    { type: 'figure', key: 'review', layout: 'annotated', treatment: 'plain', media: ['review'] },
    { type: 'figure', key: 'damage', layout: 'split', treatment: 'plain', media: ['checklist', 'damage'] },
    { type: 'narrative', key: 'ecosystem', label: 'custom' },
    { type: 'ownership' },
    { type: 'outcomes', values: ['114', '112', '16'] },
    { type: 'lessons' },
  ],
}

export const CWEB_SLUG = SLUG
export const CWEB_ASSETS = STUDY.assetsDir
export const CWEB_MEDIA = cspMedia(STUDY)
export const CWEB_COVER_KEY: Key = STUDY.cover
export const cwebLocalizedFields = cspLocalizedFields(STUDY)

import type { Locale } from '@/utilities/locale'

import { archiveIdentity } from '../archive'
import ar from './copy/back-office.ar.json'
import de from './copy/back-office.de.json'
import en from './copy/back-office.en.json'
import es from './copy/back-office.es.json'
import fa from './copy/back-office.fa.json'
import fr from './copy/back-office.fr.json'
import ja from './copy/back-office.ja.json'
import { assertCopyShape, type CspCopy, type CspStudy, cspLocalizedFields, cspMedia } from './shared'

/**
 * Carsparency Back Office — the operator console and the printable inspection report. Built on the only Back Office file available (its name ends "(Copy)"); see the audit.
 * Evidence and node ids: `Docs/Experience/Carsparency-Khodro45/CARSPARENCY-AUDIT.md`.
 */
const SLUG = 'carsparency-back-office'
const ARCHIVE = archiveIdentity(SLUG)
const COPY: Record<Locale, CspCopy> = { en, fa, ar, es, de, fr, ja }
assertCopyShape(SLUG, COPY)

const FILES = {
  list: { file: 'back-office-list.png', name: ARCHIVE.row.cover.name },
  quickView: { file: 'console/requests-quick-view-editing.png', name: 'carsparency-back-office--quick-view.png' },
  quickCrop: { file: 'site/quick-view.png', name: 'carsparency-back-office--quick-view-detail.png' },
  auctions: { file: 'site/auctions-prices.png', name: 'carsparency-back-office--auctions.png' },
  suggested: { file: 'site/suggested-dealer.png', name: 'carsparency-back-office--suggested-dealer.png' },
  columns: { file: 'site/column-manager.png', name: 'carsparency-back-office--column-manager.png' },
  employees: { file: 'site/employees.png', name: 'carsparency-back-office--employees.png' },
  dealer: { file: 'site/dealer-profile.png', name: 'carsparency-back-office--dealer-profile.png' },
  report2: { file: 'car-report/page-2.png', name: 'carsparency-back-office--report-page-2.png' },
  report3: { file: 'car-report/page-3.png', name: 'carsparency-back-office--report-page-3.png' },
  report4: { file: 'car-report/page-4.png', name: 'carsparency-back-office--report-page-4.png' },
} as const

type Key = keyof typeof FILES

const STUDY: CspStudy<Key> = {
  slug: SLUG,
  prefix: 'cbo',
  assetsDir: 'Docs/Experience/Carsparency-Khodro45/carsparency-back-office/assets',
  files: FILES,
  hero: ['quickView'],
  cover: 'list',
  copy: COPY,
  plan: [
    { type: 'narrative', key: 'context', label: 'context' },
    { type: 'figure', key: 'list', layout: 'annotated', treatment: 'plain', media: ['list'] },
    { type: 'narrative', key: 'problem', label: 'problem' },
    { type: 'narrative', key: 'flow', label: 'custom' },
    { type: 'process', codes: ['REQ', 'INSP', 'PRCE', 'AUCT', 'PAY'] },
    { type: 'figure', key: 'quick', layout: 'full', treatment: 'plain', media: ['quickCrop'] },
    { type: 'decisions' },
    { type: 'narrative', key: 'solution', label: 'solution' },
    { type: 'figure', key: 'auctions', layout: 'full', treatment: 'plain', media: ['auctions'] },
    { type: 'figure', key: 'tools', layout: 'split', treatment: 'plain', media: ['suggested', 'columns'] },
    { type: 'figure', key: 'users', layout: 'split', treatment: 'plain', media: ['employees', 'dealer'] },
    { type: 'narrative', key: 'ecosystem', label: 'custom' },
    { type: 'figure', key: 'report', layout: 'sequence', treatment: 'plain', media: ['report2', 'report3', 'report4'] },
    { type: 'ownership' },
    { type: 'outcomes', values: ['68', '7', '4'] },
    { type: 'lessons' },
  ],
}

export const CBO_SLUG = SLUG
export const CBO_ASSETS = STUDY.assetsDir
export const CBO_MEDIA = cspMedia(STUDY)
export const CBO_COVER_KEY: Key = STUDY.cover
export const cboLocalizedFields = cspLocalizedFields(STUDY)

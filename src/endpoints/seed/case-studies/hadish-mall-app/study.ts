import type { Project } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { archiveIdentity } from '../archive'
import { assertCopyShape, type CspCopy, type CspStudy, cspLocalizedFields, cspMedia } from '../carsparency/shared'
import ar from './copy/hadish-mall-app.ar.json'
import de from './copy/hadish-mall-app.de.json'
import en from './copy/hadish-mall-app.en.json'
import es from './copy/hadish-mall-app.es.json'
import fa from './copy/hadish-mall-app.fa.json'
import fr from './copy/hadish-mall-app.fr.json'
import ja from './copy/hadish-mall-app.ja.json'

/**
 * Hadish Mall's mall-management app (`/work/mall-management-app-concept`) — a concept Sina proposed
 * while working there as a marketer: tenant screens, a manager panel and the decks that pitched it.
 * Hadish Mall branding only (Sina, 2026-09-26): the file's later Home Plus and Hamila Center
 * rebrands are left out, so every slide comes from the Hadish-branded deck (v2, `175:20008`). Every sentence comes from the Hadish Mall
 * Figma file, scanned 2026-09-26 into `Docs/Experience/Hadish-Mall/mall-app/README.md`; the chapter
 * grammar is the Carsparency one (`../carsparency/shared.ts`), used unchanged.
 *
 * Publication gates (held here and in `tests/int/case-study-seeds.int.spec.ts`):
 * - Only the files below are uploaded. The panel exports, and the deck covers and panel slide before
 *   redaction, carry Sina's email and a mobile number as sample data; the uploaded versions in
 *   `crops/` have them blurred (the panel, three-services and transparency slides).
 * - No prices (README Q3): the tiers are described in words only.
 * - No claim that it was built, sold or pitched to anyone but Hadish Mall (README Q1, Q2), and nothing from
 *   the unrelated clinic-booking product that shares the pitch page.
 */
const SLUG = 'mall-management-app-concept'
const ARCHIVE = archiveIdentity(SLUG)
const COPY: Record<Locale, CspCopy> = { en, fa, ar, es, de, fr, ja }
assertCopyShape(SLUG, COPY)

const FILES = {
  cover: { file: 'crops/cover-hadish.png', name: ARCHIVE.row.cover.name },
  home: { file: 'customers-app/home.png', name: 'mall-app--tenant-home.png' },
  services: { file: 'crops/services-fit.png', name: 'mall-app--services.png' },
  wallet: { file: 'customers-app/wallet.png', name: 'mall-app--wallet.png' },
  receipt: { file: 'crops/receipt-upload-fit.png', name: 'mall-app--receipt-upload.png' },
  walletError: { file: 'crops/payment-error-fit.png', name: 'mall-app--low-balance.png' },
  threeServices: { file: 'crops/three-services-hadish.png', name: 'mall-app--three-services.png' },
  rentCharge: { file: 'hadish-deck/v2-03-rent-and-charge.png', name: 'mall-app--rent-and-charge.png' },
  cutoff: { file: 'hadish-deck/v2-09-service-cutoff.png', name: 'mall-app--service-cutoff.png' },
  managerPanel: { file: 'crops/manager-panel-hadish.png', name: 'mall-app--manager-panel.png' },
  staff: { file: 'hadish-deck/v2-07-staff-monitoring.png', name: 'mall-app--staff-monitoring.png' },
  transparency: { file: 'crops/transparency-hadish.png', name: 'mall-app--transparency.png' },
  roadmap: { file: 'hadish-deck/v2-17-roadmap.png', name: 'mall-app--roadmap.png' },
} as const

type Key = keyof typeof FILES

const STUDY: CspStudy<Key> = {
  slug: SLUG,
  prefix: 'hma',
  assetsDir: 'Docs/Experience/Hadish-Mall/mall-app/assets',
  files: FILES,
  hero: ['home', 'services', 'wallet'],
  cover: 'cover',
  copy: COPY,
  plan: [
    { type: 'narrative', key: 'context', label: 'context' },
    { type: 'figure', key: 'services3', layout: 'full', treatment: 'plain', media: ['threeServices'] },
    { type: 'narrative', key: 'problem', label: 'problem' },
    { type: 'figure', key: 'serviceList', layout: 'annotated', treatment: 'screen', media: ['services'] },
    { type: 'narrative', key: 'approach', label: 'approach' },
    { type: 'process', codes: ['APP', 'PNL', 'V1', 'V2'] },
    { type: 'narrative', key: 'solution', label: 'solution' },
    { type: 'figure', key: 'pay', layout: 'sequence', treatment: 'screen', media: ['wallet', 'receipt', 'walletError'] },
    { type: 'figure', key: 'rules', layout: 'split', treatment: 'plain', media: ['rentCharge', 'cutoff'] },
    { type: 'narrative', key: 'operations', label: 'custom' },
    { type: 'figure', key: 'panel', layout: 'full', treatment: 'plain', media: ['managerPanel'] },
    { type: 'figure', key: 'staff', layout: 'split', treatment: 'plain', media: ['staff', 'transparency'] },
    { type: 'narrative', key: 'product', label: 'custom' },
    { type: 'figure', key: 'roadmap', layout: 'full', treatment: 'plain', media: ['roadmap'] },
    { type: 'decisions' },
    { type: 'ownership' },
    { type: 'narrative', key: 'critique', label: 'custom' },
    { type: 'outcomes', values: ['6', '17', '12'] },
    { type: 'lessons' },
  ],
}

export const HMA_SLUG = SLUG
export const HMA_ASSETS = STUDY.assetsDir
export const HMA_MEDIA = cspMedia(STUDY)
export const HMA_COVER_KEY: Key = STUDY.cover
export const hmaLocalizedFields = cspLocalizedFields(STUDY)

// No `projectStatus` or `period`: the file records neither a build nor dates beyond sample data.
export const HMA_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  tools: ['Figma'],
}

import type { Project } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { archiveIdentity } from '../archive'
import { assertCopyShape, type CspCopy, type CspStudy, cspLocalizedFields, cspMedia } from '../carsparency/shared'
import ar from './copy/merikh-baft.ar.json'
import de from './copy/merikh-baft.de.json'
import en from './copy/merikh-baft.en.json'
import es from './copy/merikh-baft.es.json'
import fa from './copy/merikh-baft.fa.json'
import fr from './copy/merikh-baft.fr.json'
import ja from './copy/merikh-baft.ja.json'

/**
 * Merikh Baft (`/work/merikh-baft`) — brand, website, back office and a role-based task app for an
 * Iranian spacer-fabric mill, from one Figma file. Every claim comes from
 * `Docs/Experience/Projects/merikh-baft/SCAN.md` (scanned 2026-09-26) and the screens exported for
 * this study; Sina confirmed on 2026-09-26 that they designed it. The chapter grammar is the Carsparency
 * one (`../carsparency/shared.ts`), used unchanged.
 *
 * Publication gates (held here and in `tests/int/case-study-seeds.int.spec.ts`):
 * - Only `crops/` is uploaded. The request and customer screens have a real person's name (used as
 *   placeholder data) painted out; the persona is cropped to its text, without the photograph.
 * - Never the investor deck or the company-profile decks (executives, capital, valuation, capacity),
 *   the business cards (names, address, phone), or the group that owns the mill.
 * - Never a page pasted from another project: the "Customer Panel" page (OTeacher and IranicaCard),
 *   the car, wallet and pill-reminder screens on the App page, the Pierre Cardin workshop kit, the
 *   Decathlon palette, or the website footer (another client's phone numbers and copyright).
 * - No launch claim, dates or live link: the file records none.
 */
const SLUG = 'merikh-baft'
const ARCHIVE = archiveIdentity(SLUG)
const COPY: Record<Locale, CspCopy> = { en, fa, ar, es, de, fr, ja }
assertCopyShape(SLUG, COPY)

const FILES = {
  cover: { file: 'crops/cover.png', name: ARCHIVE.row.cover.name },
  dyeing: { file: 'crops/task-detail-dyeing.png', name: 'merikh-baft--task-dyeing.png' },
  driver: { file: 'crops/task-detail-driver.png', name: 'merikh-baft--task-driver.png' },
  customer: { file: 'crops/task-detail-customer.png', name: 'merikh-baft--task-customer.png' },
  homeMobile: { file: 'crops/home-mobile-top.png', name: 'merikh-baft--home-mobile.png' },
  homeFold: { file: 'crops/home-desktop-fold.png', name: 'merikh-baft--home-desktop.png' },
  taskList: { file: 'crops/task-list-inventory.png', name: 'merikh-baft--task-list.png' },
  settingsWarehouse: { file: 'crops/settings-warehouse-locations.png', name: 'merikh-baft--settings-warehouse.png' },
  settingsDyeing: { file: 'crops/settings-dyeing-machine.png', name: 'merikh-baft--settings-dyeing.png' },
  settingsRoute: { file: 'crops/settings-route.png', name: 'merikh-baft--settings-driver.png' },
  settingsCustomer: { file: 'crops/settings-customer-orders.png', name: 'merikh-baft--settings-customer.png' },
  requestDetail: { file: 'crops/request-detail.png', name: 'merikh-baft--request-detail.png' },
  warehouseQc: { file: 'crops/warehouse-qc.png', name: 'merikh-baft--warehouse.png' },
  customerDetail: { file: 'crops/customer-detail.png', name: 'merikh-baft--customer-detail.png' },
  consultation: { file: 'crops/consultation-form.png', name: 'merikh-baft--consultation-form.png' },
  productPage: { file: 'crops/product-page.png', name: 'merikh-baft--product-page.png' },
  persona: { file: 'crops/persona-text.png', name: 'merikh-baft--persona.png' },
  logo: { file: 'crops/logo-lockup.png', name: 'merikh-baft--logo.png' },
  tone: { file: 'crops/tone-of-voice.png', name: 'merikh-baft--tone-of-voice.png' },
  sidebars: { file: 'crops/sidebars.png', name: 'merikh-baft--sidebars.png' },
  color: { file: 'crops/color-blue-gray.png', name: 'merikh-baft--design-system-color.png' },
} as const

type Key = keyof typeof FILES

const STUDY: CspStudy<Key> = {
  slug: SLUG,
  prefix: 'mkb',
  assetsDir: 'Docs/Experience/Projects/merikh-baft/assets',
  files: FILES,
  hero: ['cover', 'driver', 'homeMobile'],
  cover: 'cover',
  copy: COPY,
  plan: [
    { type: 'narrative', key: 'context', label: 'context' },
    { type: 'figure', key: 'fold', layout: 'full', treatment: 'plain', media: ['homeFold'] },
    { type: 'narrative', key: 'problem', label: 'problem' },
    { type: 'process', codes: ['INV', 'DYE', 'MGR', 'DRV', 'CUS'] },
    { type: 'narrative', key: 'approach', label: 'approach' },
    { type: 'figure', key: 'chain', layout: 'sequence', treatment: 'screen', media: ['cover', 'dyeing', 'driver', 'customer'] },
    { type: 'figure', key: 'taskList', layout: 'annotated', treatment: 'screen', media: ['taskList'] },
    { type: 'narrative', key: 'solution', label: 'solution' },
    { type: 'figure', key: 'settings', layout: 'sequence', treatment: 'screen', media: ['settingsWarehouse', 'settingsDyeing', 'settingsRoute', 'settingsCustomer'] },
    { type: 'narrative', key: 'office', label: 'custom' },
    { type: 'figure', key: 'request', layout: 'full', treatment: 'plain', media: ['requestDetail'] },
    { type: 'figure', key: 'office', layout: 'split', treatment: 'plain', media: ['warehouseQc', 'customerDetail'] },
    { type: 'narrative', key: 'website', label: 'custom' },
    { type: 'figure', key: 'web', layout: 'split', treatment: 'plain', media: ['consultation', 'productPage'] },
    { type: 'narrative', key: 'brand', label: 'custom' },
    { type: 'figure', key: 'persona', layout: 'full', treatment: 'plain', media: ['persona'] },
    { type: 'figure', key: 'identity', layout: 'split', treatment: 'plain', media: ['logo', 'tone'] },
    { type: 'decisions' },
    { type: 'ownership' },
    { type: 'narrative', key: 'critique', label: 'custom' },
    { type: 'figure', key: 'sidebars', layout: 'full', treatment: 'plain', media: ['sidebars'] },
    { type: 'narrative', key: 'system', label: 'custom' },
    { type: 'figure', key: 'color', layout: 'full', treatment: 'diagram', media: ['color'] },
    { type: 'outcomes', values: ['128', '5', '334'] },
    { type: 'lessons' },
  ],
}

export const MKB_SLUG = SLUG
export const MKB_ASSETS = STUDY.assetsDir
export const MKB_MEDIA = cspMedia(STUDY)
export const MKB_COVER_KEY: Key = STUDY.cover
export const mkbLocalizedFields = cspLocalizedFields(STUDY)

// No `projectStatus` or `period`: the file records neither a launch nor dates (SCAN.md Q3, Q4).
export const MKB_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  tools: ['Figma'],
}

import type { Project } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { archiveIdentity } from '../archive'
import { assertCopyShape, type CspCopy, type CspStudy, cspLocalizedFields, cspMedia } from '../carsparency/shared'
import ar from './copy/cproperty.ar.json'
import de from './copy/cproperty.de.json'
import en from './copy/cproperty.en.json'
import es from './copy/cproperty.es.json'
import fa from './copy/cproperty.fa.json'
import fr from './copy/cproperty.fr.json'
import ja from './copy/cproperty.ja.json'

/**
 * CProperty (`/work/cproperty`) — a buyer-facing presale-homes marketplace for Metro Vancouver, from
 * one Figma file. Every sentence comes from `Docs/Experience/Projects/cproperty/README.md` (scanned
 * 2026-09-26) and the recounts done for this study; the chapter grammar is the Carsparency one
 * (`../carsparency/shared.ts`), used unchanged: a plan of blocks plus one JSON copy file per locale.
 *
 * Publication gates (held here and in `tests/int/case-study-seeds.int.spec.ts`):
 * - Only derived exports are uploaded (`crops/`, `2x/components/`, the colour board). Never the home
 *   page (press logos, sample-sale cards, borrowed marketing copy and Sina's own portrait as a
 *   placeholder realtor), the developer page (portrait, email, a placeholder phone number), the
 *   sign-in states that show email addresses, the blog (another product's placeholder copy) or any
 *   desktop footer (copy carried over from a benchmark).
 * - No design-system lineage, and no benchmark or placeholder leftover repeated as fact.
 * - No launch claim, client, people, dates or live link: the file records none, and the domain no
 *   longer serves the product.
 * - The earlier version archived in the file (its "Wear House" page) is not Sina's work (Sina,
 *   2026-09-26, README Q4). It is described in words for context and never shown: no frame of it,
 *   or crop of one, is uploaded, and the process does not list it as a step.
 */
const SLUG = 'cproperty'
const ARCHIVE = archiveIdentity(SLUG)
const COPY: Record<Locale, CspCopy> = { en, fa, ar, es, de, fr, ja }
assertCopyShape(SLUG, COPY)

const FILES = {
  cover: { file: 'crops/cover.png', name: ARCHIVE.row.cover.name },
  unitTop: { file: 'crops/unit-details-top.png', name: 'cproperty--unit-details.png' },
  compareTop: { file: 'crops/compare-mobile-top.png', name: 'cproperty--compare-mobile.png' },
  propertyFold: { file: 'crops/property-desktop-fold.png', name: 'cproperty--property-desktop.png' },
  checklist: { file: 'crops/property-mobile-annotated.png', name: 'cproperty--property-annotated.png' },
  compareDesktop: { file: 'crops/compare-desktop.png', name: 'cproperty--compare-desktop.png' },
  filterAdvanced: { file: 'crops/filter-bar-advanced.png', name: 'cproperty--filter-advanced.png' },
  priceExpenses: { file: '2x/components/price-and-expenses.png', name: 'cproperty--price-and-expenses.png' },
  unitsTable: { file: 'crops/units-table-desktop.png', name: 'cproperty--units-table.png' },
  unitRating: { file: 'crops/unit-details-rating.png', name: 'cproperty--unit-rating.png' },
  exclusiveMobile: { file: 'crops/exclusive-info-mobile.png', name: 'cproperty--exclusive-info.png' },
  statGrid: { file: 'crops/stat-grid.png', name: 'cproperty--header-figures.png' },
  depositStructure: { file: '2x/components/deposit-structure.png', name: 'cproperty--deposit-structure.png' },
  locationPanel: { file: 'crops/filter-location-panel.png', name: 'cproperty--location-filter.png' },
  colorBoard: { file: 'design-system/color.png', name: 'cproperty--design-system-color.png' },
} as const

type Key = keyof typeof FILES

const STUDY: CspStudy<Key> = {
  slug: SLUG,
  prefix: 'cprop',
  assetsDir: 'Docs/Experience/Projects/cproperty/assets',
  files: FILES,
  hero: ['cover', 'unitTop', 'compareTop'],
  cover: 'cover',
  copy: COPY,
  plan: [
    { type: 'narrative', key: 'context', label: 'context' },
    { type: 'figure', key: 'fold', layout: 'full', treatment: 'plain', media: ['propertyFold'] },
    { type: 'narrative', key: 'problem', label: 'problem' },
    { type: 'figure', key: 'checklist', layout: 'annotated', treatment: 'screen', media: ['checklist'] },
    { type: 'narrative', key: 'pivot', label: 'custom' },
    { type: 'figure', key: 'comparePage', layout: 'full', treatment: 'plain', media: ['compareDesktop'] },
    { type: 'narrative', key: 'approach', label: 'approach' },
    { type: 'process', codes: ['SYS', 'HOME', 'PROP', 'LIST', 'AUTH', 'DEV', 'UNIT'] },
    { type: 'narrative', key: 'solution', label: 'solution' },
    { type: 'figure', key: 'filters', layout: 'full', treatment: 'plain', media: ['filterAdvanced'] },
    { type: 'figure', key: 'price', layout: 'full', treatment: 'plain', media: ['priceExpenses'] },
    { type: 'narrative', key: 'compare', label: 'custom' },
    { type: 'figure', key: 'units', layout: 'full', treatment: 'plain', media: ['unitsTable'] },
    { type: 'figure', key: 'leads', layout: 'split', treatment: 'screen', media: ['unitRating', 'exclusiveMobile'] },
    { type: 'decisions' },
    { type: 'ownership' },
    { type: 'narrative', key: 'critique', label: 'custom' },
    { type: 'figure', key: 'deposits', layout: 'split', treatment: 'plain', media: ['statGrid', 'depositStructure'] },
    { type: 'figure', key: 'cities', layout: 'full', treatment: 'plain', media: ['locationPanel'] },
    { type: 'narrative', key: 'system', label: 'custom' },
    { type: 'figure', key: 'color', layout: 'full', treatment: 'diagram', media: ['colorBoard'] },
    { type: 'outcomes', values: ['76', '261', '6'] },
    { type: 'lessons' },
  ],
}

export const CPROP_SLUG = SLUG
export const CPROP_ASSETS = STUDY.assetsDir
export const CPROP_MEDIA = cspMedia(STUDY)
export const CPROP_COVER_KEY: Key = STUDY.cover
export const cpropLocalizedFields = cspLocalizedFields(STUDY)

// No `projectStatus` or `period`: nothing in the file says whether or when it shipped (README Q2, Q6).
export const CPROP_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  tools: ['Figma'],
}

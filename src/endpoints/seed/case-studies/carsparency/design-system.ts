import type { Locale } from '@/utilities/locale'

import { archiveIdentity } from '../archive'
import ar from './copy/design-system.ar.json'
import de from './copy/design-system.de.json'
import en from './copy/design-system.en.json'
import es from './copy/design-system.es.json'
import fa from './copy/design-system.fa.json'
import fr from './copy/design-system.fr.json'
import ja from './copy/design-system.ja.json'
import { assertCopyShape, type CspCopy, type CspStudy, cspLocalizedFields, cspMedia } from './shared'

/**
 * Carsparency Design System — the shared library, and the evidence that the four product files consume it.
 * Evidence and node ids: `Docs/Experience/Carsparency-Khodro45/CARSPARENCY-AUDIT.md`.
 */
const SLUG = 'carsparency-design-system'
const ARCHIVE = archiveIdentity(SLUG)
const COPY: Record<Locale, CspCopy> = { en, fa, ar, es, de, fr, ja }
assertCopyShape(SLUG, COPY)

const FILES = {
  colors: { file: 'site/color-ramps.png', name: ARCHIVE.row.cover.name },
  formFields: { file: 'form-fields.png', name: 'carsparency-design-system--form-fields.png' },
  buttons: { file: 'site/buttons.png', name: 'carsparency-design-system--buttons.png' },
  fonts: { file: 'fonts.png', name: 'carsparency-design-system--type.png' },
  dark: { file: '../../carsparency-inspection/assets/2x/inspection-detail.png', name: 'carsparency-design-system--theme-dark.png' },
  light: { file: '../../carsparency-web/assets/wizard/finance.png', name: 'carsparency-design-system--theme-light.png' },
} as const

type Key = keyof typeof FILES

const STUDY: CspStudy<Key> = {
  slug: SLUG,
  prefix: 'cds',
  assetsDir: 'Docs/Experience/Carsparency-Khodro45/carsparency-design-system/assets',
  files: FILES,
  hero: ['formFields'],
  cover: 'colors',
  copy: COPY,
  plan: [
    { type: 'narrative', key: 'context', label: 'context' },
    { type: 'figure', key: 'colors', layout: 'full', treatment: 'diagram', media: ['colors'] },
    { type: 'narrative', key: 'problem', label: 'problem' },
    { type: 'narrative', key: 'structure', label: 'custom' },
    { type: 'process', codes: ['COLR', 'TYPE', 'CTRL', 'PATT', 'PROD'] },
    { type: 'figure', key: 'buttons', layout: 'full', treatment: 'diagram', media: ['buttons'] },
    { type: 'figure', key: 'fonts', layout: 'full', treatment: 'diagram', media: ['fonts'] },
    { type: 'decisions' },
    { type: 'narrative', key: 'solution', label: 'solution' },
    { type: 'figure', key: 'themes', layout: 'split', treatment: 'screen', media: ['dark', 'light'] },
    { type: 'narrative', key: 'ecosystem', label: 'custom' },
    { type: 'ownership' },
    { type: 'outcomes', values: ['265', '12', '4'] },
    { type: 'lessons' },
  ],
}

export const CDS_SLUG = SLUG
export const CDS_ASSETS = STUDY.assetsDir
export const CDS_MEDIA = cspMedia(STUDY)
export const CDS_COVER_KEY: Key = STUDY.cover
export const cdsLocalizedFields = cspLocalizedFields(STUDY)

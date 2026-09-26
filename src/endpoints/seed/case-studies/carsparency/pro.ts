import type { Locale } from '@/utilities/locale'

import { archiveIdentity } from '../archive'
import ar from './copy/pro.ar.json'
import de from './copy/pro.de.json'
import en from './copy/pro.en.json'
import es from './copy/pro.es.json'
import fa from './copy/pro.fa.json'
import fr from './copy/pro.fr.json'
import ja from './copy/pro.ja.json'
import { assertCopyShape, type CspCopy, type CspStudy, cspLocalizedFields, cspMedia } from './shared'

/**
 * Carsparency Pro — the dealer platform (app + desktop web), from the auction list to title transfer.
 * Evidence and node ids: `Docs/Experience/Carsparency-Khodro45/CARSPARENCY-AUDIT.md`.
 */
const SLUG = 'carsparency-pro'
const ARCHIVE = archiveIdentity(SLUG)
const COPY: Record<Locale, CspCopy> = { en, fa, ar, es, de, fr, ja }
assertCopyShape(SLUG, COPY)

const FILES = {
  listApp: { file: 'app/auction-list-cover.png', name: ARCHIVE.row.cover.name },
  bidApp: { file: 'app/submit-bid.png', name: 'carsparency-pro--app-submit-bid.png' },
  ordersApp: { file: 'app/orders-pending.png', name: 'carsparency-pro--app-orders-pending.png' },
  losing: { file: 'app/status-losing.png', name: 'carsparency-pro--app-losing.png' },
  winning: { file: 'app/status-winning.png', name: 'carsparency-pro--app-winning.png' },
  proxy: { file: 'app/proxy-bid.png', name: 'carsparency-pro--app-proxy-bid.png' },
  auctionsWeb: { file: 'site/auctions-desktop.png', name: 'carsparency-pro--web-auctions.png' },
  detailWeb: { file: 'site/detail-winning.png', name: 'carsparency-pro--web-detail.png' },
  ordersWeb: { file: 'site/orders-pending-desktop.png', name: 'carsparency-pro--web-orders.png' },
  bandNegotiation: { file: 'site/status-negotiation.png', name: 'carsparency-pro--web-status-negotiation.png' },
  bandDelivery: { file: 'site/status-delivery.png', name: 'carsparency-pro--web-status-delivery.png' },
  prepayment: { file: 'site/prepayment.png', name: 'carsparency-pro--web-prepayment.png' },
  breakdown: { file: 'site/price-breakdown.png', name: 'carsparency-pro--web-price-breakdown.png' },
  carMap: { file: 'web/car-map-trim.png', name: 'carsparency-pro--car-map.png' },
} as const

type Key = keyof typeof FILES

const STUDY: CspStudy<Key> = {
  slug: SLUG,
  prefix: 'cpro',
  assetsDir: 'Docs/Experience/Carsparency-Khodro45/carsparency-pro/assets',
  files: FILES,
  hero: ['listApp', 'bidApp', 'ordersApp'],
  cover: 'listApp',
  copy: COPY,
  plan: [
    { type: 'narrative', key: 'context', label: 'context' },
    { type: 'figure', key: 'auctions', layout: 'full', treatment: 'plain', media: ['auctionsWeb'] },
    { type: 'narrative', key: 'problem', label: 'problem' },
    { type: 'narrative', key: 'flow', label: 'custom' },
    { type: 'process', codes: ['BID', 'NEGO', 'PAY', 'SETL', 'TITL'] },
    { type: 'figure', key: 'bidStates', layout: 'sequence', treatment: 'screen', media: ['losing', 'winning', 'proxy'] },
    { type: 'figure', key: 'orders', layout: 'full', treatment: 'plain', media: ['ordersWeb'] },
    { type: 'decisions' },
    { type: 'narrative', key: 'solution', label: 'solution' },
    { type: 'figure', key: 'detail', layout: 'full', treatment: 'plain', media: ['detailWeb'] },
    { type: 'figure', key: 'bands', layout: 'split', treatment: 'plain', media: ['bandNegotiation', 'bandDelivery'] },
    { type: 'figure', key: 'payments', layout: 'split', treatment: 'plain', media: ['prepayment', 'breakdown'] },
    { type: 'figure', key: 'carMap', layout: 'full', treatment: 'diagram', media: ['carMap'] },
    { type: 'narrative', key: 'ecosystem', label: 'custom' },
    { type: 'ownership' },
    { type: 'outcomes', values: ['129', '167', '5'] },
    { type: 'lessons' },
  ],
}

export const CPRO_SLUG = SLUG
export const CPRO_ASSETS = STUDY.assetsDir
export const CPRO_MEDIA = cspMedia(STUDY)
export const CPRO_COVER_KEY: Key = STUDY.cover
export const cproLocalizedFields = cspLocalizedFields(STUDY)

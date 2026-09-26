import type { Project } from '@/payload-types'
import { LOCALES, type Locale } from '@/utilities/locale'

import { archiveIdentity } from './archive'
import {
  assertCopyShape,
  type CspCopy,
  type CspStudy,
  cspLocalizedFields,
  cspMedia,
} from './carsparency/shared'
import ar from './khodro45/copy/dealer-app.ar.json'
import de from './khodro45/copy/dealer-app.de.json'
import en from './khodro45/copy/dealer-app.en.json'
import es from './khodro45/copy/dealer-app.es.json'
import fa from './khodro45/copy/dealer-app.fa.json'
import fr from './khodro45/copy/dealer-app.fr.json'
import ja from './khodro45/copy/dealer-app.ja.json'

/**
 * Khodro45 dealer app — the trade side of an Iranian used-car marketplace, read from its design
 * file (re-scanned 2026-09-26). Built on the chapter-study builder the Carsparency studies use
 * (`carsparency/shared.ts`); Khodro45 is a separate employer, and nothing here links the two.
 *
 * Every claim comes from the file's own text and screens; the Docs README records the node ids.
 * Publication gates, held here and in `tests/int/case-study-seeds.int.spec.ts`:
 * - no Figma URL or file name, no Carsparency lineage;
 * - no usage, conversion or transaction figure, team size, date or launch claim beyond the splash
 *   screen's version number;
 * - never uploaded: the order page below its financial block (a seller's name, national ID, card
 *   number and IBAN, and a delivery address), profile and bank-account screens (IDs and card
 *   numbers), the login screens (a phone number), and the photographic avatar, which is blanked in
 *   the loyalty and services-hub crops;
 * - every asset is a 2× crop cut to the phone viewport (780 × 1688), except the price blocks and the
 *   prototype board.
 */
const SLUG = 'khodro45-dealer-app'
const ARCHIVE = archiveIdentity(SLUG)
const COPY: Record<Locale, CspCopy> = { en, fa, ar, es, de, fr, ja }
assertCopyShape(SLUG, COPY)

const name = (key: string) => `${SLUG}--${key}.png`

const FILES = {
  // The archive cover and the four names below existed before the 2026-09-26 rebuild: the seed
  // replaces their bytes in place, so the order page's uncropped export is overwritten, not orphaned.
  liveList: { file: 'car-list/car-list-live.png', name: ARCHIVE.row.cover.name },
  detailTop: { file: 'car-detail/car-detail-live.png', name: name('car-detail-live') },
  bidSheet: { file: 'bid/bid-sheet.png', name: name('bid-sheet') },
  notSettled1: { file: 'orders/orders-not-settled.png', name: name('orders-not-settled') },
  orderDetails: { file: 'orders/order-details.png', name: name('order-details') },
  tiers: { file: 'membership/subscription-tiers.png', name: name('subscription-tiers') },
  loyalty: { file: 'membership/loyalty-ladder.png', name: name('loyalty-ladder') },
  playground: { file: 'prototype/design-playground.png', name: name('design-playground') },
  addCar: { file: 'add-car/add-car-form.png', name: name('add-car-form') },
  superDark: { file: 'super-app/super-app-dark.png', name: name('super-app-dark') },

  marketList: { file: 'car-list/car-list-market.png', name: name('car-list-market') },
  bazaarList: { file: 'car-list/car-list-bazaar.png', name: name('car-list-bazaar') },
  reportFacts: { file: 'car-detail/report-facts.png', name: name('report-facts') },
  reportBody: { file: 'car-detail/report-body.png', name: name('report-body') },
  priceLive: { file: 'car-detail/price-live.png', name: name('price-live') },
  priceMarket: { file: 'car-detail/price-market.png', name: name('price-market') },
  listingStatus: { file: 'car-detail/listing-status.png', name: name('listing-status') },
  myCars: { file: 'car-detail/my-cars.png', name: name('my-cars') },
  autoBid: { file: 'bid/auto-bid.png', name: name('auto-bid') },
  guarantee: { file: 'bid/guarantee.png', name: name('guarantee') },
  addedFees: { file: 'bid/added-fees.png', name: name('added-fees') },
  ordersAll1: { file: 'orders/orders-all.png', name: name('orders-all') },
  ordersAll2: { file: 'orders/orders-all-2.png', name: name('orders-all-2') },
  ordersAll3: { file: 'orders/orders-all-3.png', name: name('orders-all-3') },
  notSettled2: { file: 'orders/orders-not-settled-2.png', name: name('orders-not-settled-2') },
  choosePrice: { file: 'prototype/choose-price.png', name: name('choose-price') },
  priceLadder: { file: 'prototype/price-ladder.png', name: name('price-ladder') },
  questions: { file: 'add-car/questions.png', name: name('add-car-questions') },
  photoGuide: { file: 'add-car/photo-guide.png', name: name('photo-guide') },
  bodyParts: { file: 'add-car/inspection-entry.png', name: name('add-car-body-parts') },
  summary: { file: 'add-car/summary.png', name: name('add-car-summary') },
  identity: { file: 'auth/identity.png', name: name('sign-up-activity') },
  score: { file: 'membership/dealer-score.png', name: name('dealer-score') },
  superLight: { file: 'super-app/super-app-light.png', name: name('super-app-light') },
} as const

type Key = keyof typeof FILES

const STUDY: CspStudy<Key> = {
  slug: SLUG,
  prefix: 'k45',
  assetsDir: 'Docs/Experience/Carsparency-Khodro45/khodro45-dealer-app/assets',
  files: FILES,
  hero: ['detailTop', 'bidSheet', 'notSettled1'],
  cover: 'liveList',
  copy: COPY,
  plan: [
    { type: 'narrative', key: 'context', label: 'context' },
    { type: 'figure', key: 'entry', layout: 'sequence', treatment: 'screen', media: ['identity', 'superLight', 'superDark'] },
    { type: 'narrative', key: 'problem', label: 'problem' },
    { type: 'narrative', key: 'markets', label: 'custom' },
    { type: 'figure', key: 'markets', layout: 'sequence', treatment: 'screen', media: ['liveList', 'marketList', 'bazaarList'] },
    { type: 'figure', key: 'price', layout: 'split', treatment: 'plain', media: ['priceLive', 'priceMarket'] },
    { type: 'decisions' },
    { type: 'narrative', key: 'solution', label: 'solution' },
    { type: 'figure', key: 'report', layout: 'split', treatment: 'screen', media: ['reportFacts', 'reportBody'] },
    { type: 'figure', key: 'bidding', layout: 'sequence', treatment: 'screen', media: ['autoBid', 'guarantee', 'addedFees'] },
    { type: 'narrative', key: 'settlement', label: 'custom' },
    { type: 'process', codes: ['DOCS', 'DEP', 'PAY', 'CONF', 'HAND', 'PLAT'] },
    { type: 'figure', key: 'negotiation', layout: 'split', treatment: 'screen', media: ['choosePrice', 'priceLadder'] },
    { type: 'figure', key: 'states', layout: 'sequence', treatment: 'screen', media: ['ordersAll1', 'ordersAll2', 'ordersAll3'] },
    { type: 'figure', key: 'stages', layout: 'split', treatment: 'screen', media: ['notSettled2', 'orderDetails'] },
    { type: 'narrative', key: 'selling', label: 'custom' },
    { type: 'figure', key: 'listing', layout: 'sequence', treatment: 'screen', media: ['addCar', 'questions', 'photoGuide', 'bodyParts'] },
    { type: 'figure', key: 'published', layout: 'sequence', treatment: 'screen', media: ['summary', 'myCars', 'listingStatus'] },
    { type: 'narrative', key: 'business', label: 'custom' },
    { type: 'figure', key: 'membership', layout: 'split', treatment: 'screen', media: ['tiers', 'loyalty'] },
    { type: 'figure', key: 'score', layout: 'annotated', treatment: 'screen', media: ['score'] },
    { type: 'narrative', key: 'method', label: 'custom' },
    { type: 'figure', key: 'playground', layout: 'full', treatment: 'plain', media: ['playground'] },
    { type: 'ownership' },
    { type: 'outcomes', values: ['241', '43', '24'] },
    { type: 'lessons' },
  ],
}

export const K45_SLUG = SLUG
export const K45_ASSETS = STUDY.assetsDir
export const K45_LOCALES = LOCALES
export const K45_MEDIA = cspMedia(STUDY)
export const K45_COVER_KEY: Key = STUDY.cover
export const k45LocalizedFields = cspLocalizedFields(STUDY)

/** `period` stays unset: the file carries no dates. `shipped` rests on the splash screen's V.3.1. */
export const K45_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'shipped',
  tools: ['Figma'],
}

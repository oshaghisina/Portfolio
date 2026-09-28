import type { Project } from '@/payload-types'
import { dirFor, LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../media'
import { archiveIdentity } from './archive'
import ar from './faymen/ar.json'
import de from './faymen/de.json'
import en from './faymen/en.json'
import es from './faymen/es.json'
import fa from './faymen/fa.json'
import fr from './faymen/fr.json'
import ja from './faymen/ja.json'
import { bullets, paragraph, prose } from './lexical'

/**
 * Fayman (`/work/faymen`) — a live Persian menswear store, from the shop to the customer account
 * and the admin it runs on. Rebuilt 2026-09-27 from a full product audit recorded in
 * `Docs/Experience/Projects/faymen/CASE-STUDY-COVERAGE.md`: the Fayman repository (491 commits,
 * 2026-06-23 → 2026-09-15), the live site's public pages, and a local build of the production
 * code for the screens behind sign-in.
 *
 * Publication gates (held here and in `tests/int/case-study-seeds.int.spec.ts`):
 * - Live captures are public pages only. Never the 2026-09-22 captures of home, search, cart,
 *   checkout, contact, find-order, create-account, about, lookbook or made-to-measure (a live
 *   coupon, a sales number, phones, the showroom address, imagery of unconfirmed origin).
 * - Cart, checkout, account and admin screens come from a local build of the production code
 *   (`0b38264`) with invented data only, and every phone number in them is masked. They are
 *   captioned as such. The Payment and SMS settings screens are never captured.
 * - No commercial figures; no security finding, patch or endpoint detail.
 * - Nothing added to the live store after 2026-09-15 is claimed as Sina's: the live rails of
 *   discounted sets and single sizes are named only as uses of the Product Section block.
 * - In Persian the brand is فیمن.
 *
 * The plan below holds every shared field (layouts, treatments, media, codes, values); each
 * locale's JSON holds every localized leaf, and `assertSameShape` fails at import when a locale
 * drifts from English. Optional localized leaves are always written (empty when unused): the
 * update path merges localized leaves by row position, so a leaf left out keeps old text.
 */
export const FAY_SLUG = 'faymen'
export const FAY_ASSETS = 'Docs/Experience/Projects/faymen/assets'
export const FAY_LOCALES = LOCALES

const ARCHIVE = archiveIdentity(FAY_SLUG)
const N = 'faymen--'

/** Earlier captures (2026-09-23) keep their names and bytes, so the live page's files never move. */
const OLD = 'capture-2026-09'
const NEW = 'study-2026-09-27'

const MEDIA_FILES = {
  cover: { file: `${OLD}/mobile/waistcoats.png`, name: ARCHIVE.row.cover.name },
  shop: { file: `${OLD}/mobile/shop.png`, name: `${N}mobile-shop.png` },
  shoesProduct: { file: `${OLD}/mobile/shoes-product.png`, name: `${N}mobile-shoes-product.png` },
  login: { file: `${OLD}/mobile/login.png`, name: `${N}mobile-login.png` },
  shipping: { file: `${OLD}/mobile/shipping.png`, name: `${N}mobile-shipping.png` },
  faq: { file: `${OLD}/mobile/faq.png`, name: `${N}mobile-faq.png` },
  waistcoatsDesk: { file: `${OLD}/desktop/waistcoats-crop.png`, name: `${N}desktop-waistcoats.png` },
  sizeGuideDesk: { file: `${OLD}/desktop/size-guide-crop.png`, name: `${N}desktop-size-guide.png` },
  fabricGuideDesk: { file: `${OLD}/desktop/fabric-guide-crop.png`, name: `${N}desktop-fabric-guide.png` },

  // Live, public pages (2026-09-27, GET requests only).
  productSections: { file: `${NEW}/live/product-carousel.webp`, name: `${N}product-sections.webp` },
  filterSheet: { file: `${NEW}/live/shop-filter-sheet-mob.webp`, name: `${N}mobile-filter-sheet.webp` },
  occasionFilter: { file: `${NEW}/live/shop-wedding-mob.webp`, name: `${N}mobile-occasion-filter.webp` },
  searchResults: { file: `${NEW}/live/search-mob.webp`, name: `${N}mobile-search.webp` },

  // Local build of the production code, invented data, phone numbers masked.
  productSizes: { file: `${NEW}/phone/pdp-size-selected.webp`, name: `${N}local-product-sizes.webp` },
  // One clean two-item cart through all four checkout frames (retaken 2026-09-27 under new names).
  cart: { file: `${NEW}/checkout/cart.webp`, name: `${N}local-checkout-cart.webp` },
  checkoutSignIn: { file: `${NEW}/checkout/signed-out.webp`, name: `${N}local-checkout-signed-out.webp` },
  checkoutCode: { file: `${NEW}/checkout/code.webp`, name: `${N}local-checkout-otp.webp` },
  checkoutPay: { file: `${NEW}/checkout/signed-in.webp`, name: `${N}local-checkout-signed-in.webp` },

  accDashboard: { file: `${NEW}/phone/dashboard-after.webp`, name: `${N}account-dashboard.webp` },
  accDashboardWhole: { file: `${NEW}/phone-whole/dashboard-after.jpg`, name: `${N}account-dashboard-whole.jpg` },
  accWallet: { file: `${NEW}/phone/wallet.webp`, name: `${N}account-wallet.webp` },
  accWalletWhole: { file: `${NEW}/phone-whole/wallet.jpg`, name: `${N}account-wallet-whole.jpg` },
  accAddresses: { file: `${NEW}/phone/addresses.webp`, name: `${N}account-addresses.webp` },
  accAddressesWhole: { file: `${NEW}/phone-whole/addresses.jpg`, name: `${N}account-addresses-whole.jpg` },
  accWishlist: { file: `${NEW}/phone/wishlist.webp`, name: `${N}account-wishlist.webp` },
  accWishlistWhole: { file: `${NEW}/phone-whole/wishlist.jpg`, name: `${N}account-wishlist-whole.jpg` },
  accSettings: { file: `${NEW}/phone/settings.webp`, name: `${N}account-settings.webp` },
  accSettingsWhole: { file: `${NEW}/phone-whole/settings.jpg`, name: `${N}account-settings-whole.jpg` },
  accNotifications: { file: `${NEW}/phone/notifications.webp`, name: `${N}account-notifications.webp` },
  accNotificationsWhole: { file: `${NEW}/phone-whole/notifications.jpg`, name: `${N}account-notifications-whole.jpg` },
  accOrders: { file: `${NEW}/phone/orders.webp`, name: `${N}account-orders.webp` },
  accOrdersWhole: { file: `${NEW}/phone-whole/orders.jpg`, name: `${N}account-orders-whole.jpg` },
  accOrder: { file: `${NEW}/phone/order-completed.webp`, name: `${N}account-order.webp` },
  accOrderWhole: { file: `${NEW}/phone-whole/order-completed.jpg`, name: `${N}account-order-whole.jpg` },
  accWalletOrder: { file: `${NEW}/phone/order-wallet.webp`, name: `${N}account-wallet-order.webp` },
  accWalletOrderWhole: { file: `${NEW}/phone-whole/order-wallet.jpg`, name: `${N}account-wallet-order-whole.jpg` },
  accReturnForm: { file: `${NEW}/phone/return-form-filled.webp`, name: `${N}account-return-form.webp` },
  accReturnFormWhole: { file: `${NEW}/phone-whole/return-form-filled.jpg`, name: `${N}account-return-form-whole.jpg` },
  accReturnSent: { file: `${NEW}/phone/return-success.webp`, name: `${N}account-return-sent.webp` },
  accReturns: { file: `${NEW}/phone/returns.webp`, name: `${N}account-returns.webp` },
  accReturnsWhole: { file: `${NEW}/phone-whole/returns.jpg`, name: `${N}account-returns-whole.jpg` },
  deskDashboard: { file: `${NEW}/desktop/dashboard-after.webp`, name: `${N}account-desktop-dashboard.webp` },
  deskWallet: { file: `${NEW}/desktop/wallet.webp`, name: `${N}account-desktop-wallet.webp` },

  adminDiscounts: { file: `${NEW}/admin/admin-discount-console.webp`, name: `${N}admin-discount-console.webp` },
  adminDashboard: { file: `${NEW}/admin/admin-dashboard.webp`, name: `${N}admin-dashboard.webp` },
  adminDashboardWhole: { file: `${NEW}/admin-whole/admin-dashboard.jpg`, name: `${N}admin-dashboard-whole.jpg` },
  adminOrders: { file: `${NEW}/admin/admin-orders.webp`, name: `${N}admin-orders.webp` },
  adminOrder: { file: `${NEW}/admin/admin-order.webp`, name: `${N}admin-order.webp` },
  adminOrderWhole: { file: `${NEW}/admin-whole/admin-order.jpg`, name: `${N}admin-order-whole.jpg` },
  adminSizeStock: { file: `${NEW}/admin/admin-size-inventory.webp`, name: `${N}admin-size-stock.webp` },
  adminSizeStockWhole: { file: `${NEW}/admin-whole/admin-size-inventory.jpg`, name: `${N}admin-size-stock-whole.jpg` },
  adminWalletCredit: { file: `${NEW}/admin/admin-wallet-credit.webp`, name: `${N}admin-wallet-credit.webp` },
} as const

export type FayMediaKey = keyof typeof MEDIA_FILES
type FayMediaIds = Partial<Record<FayMediaKey, string>>
type Sections = NonNullable<Project['sections']>

type ChapterKey =
  | 'context'
  | 'problem'
  | 'system'
  | 'discovery'
  | 'product'
  | 'checkout'
  | 'account'
  | 'rules'
  | 'operations'
  | 'iran'
  | 'reliability'
type FigureKey =
  | 'catalogue'
  | 'productSections'
  | 'filters'
  | 'productPage'
  | 'guides'
  | 'support'
  | 'checkout'
  | 'accountScreens'
  | 'accountDesktop'
  | 'discounts'
  | 'admin'
type StepsKey = 'timeline' | 'workLoop' | 'systemMap' | 'journey' | 'accountMap' | 'slugFix'
type FindingKey = 'currencyTrap' | 'slugFix'

interface FayChapter {
  /** Only for `custom` chapters: the kicker, e.g. "05 DISCOVERY". */
  customLabel?: string
  heading: string
  body: string[]
  bullets?: string[]
  insight?: string
}

export interface FayCopy {
  statement: string
  industry: string
  team: string
  heroCaption: string
  snapshot: { problem: string; role: string; result: string }
  alt: Record<FayMediaKey, string>
  chapters: Record<ChapterKey, FayChapter>
  /** `items`: one caption per visual, in plan order. `groups`: pages figures only, one per row. */
  figures: Record<FigureKey, { caption: string; items?: string[]; groups?: string[] }>
  steps: Record<StepsKey, { heading: string; steps: { label: string; note: string; parts?: string[] }[] }>
  findings: Record<FindingKey, { text: string; attribution: string; method: string }>
  decisions: {
    heading: string
    lede: string
    items: { title: string; why: string; alternatives: string; tradeoff: string; evidence?: string }[]
  }
  ownership: { heading: string; intro: string; own: string[]; collaborate: string[]; note: string }
  outcomes: {
    heading: string
    intro: string
    items: { label: string; context: string; source?: string }[]
    shipped: string[]
  }
  lessons: { heading: string; items: { title: string; body: string }[] }
}

const COPY: Record<Locale, FayCopy> = { en, fa, ar, es, de, fr, ja }

/** Fails at import when a locale's copy is missing a key, or an array has a different length, than English. */
function assertSameShape(copy: Record<Locale, FayCopy>): void {
  const shape = (value: unknown): unknown =>
    Array.isArray(value)
      ? value.map(shape)
      : value && typeof value === 'object'
        ? Object.fromEntries(
            Object.keys(value)
              .sort()
              .map((k) => [k, shape((value as Record<string, unknown>)[k])]),
          )
        : typeof value
  const english = JSON.stringify(shape(copy.en))
  for (const locale of LOCALES) {
    if (JSON.stringify(shape(copy[locale])) !== english)
      throw new Error(`faymen: the ${locale} copy does not have the same shape as English`)
  }
}
assertSameShape(COPY)

type NarrativeLabel = 'context' | 'problem' | 'custom'
type FigureItem = { media: FayMediaKey; mobileFull?: FayMediaKey; full?: FayMediaKey }
type Entry =
  | { type: 'narrative'; key: ChapterKey; label: NarrativeLabel }
  | {
      type: 'figure'
      key: FigureKey
      layout: 'full' | 'split' | 'sequence' | 'pages'
      treatment: 'screen' | 'plain'
      items: FigureItem[]
    }
  | { type: 'process'; key: StepsKey; kind: 'process' | 'loop' | 'map'; codes: string[] }
  | { type: 'finding'; key: FindingKey }
  | { type: 'decisions'; media: Partial<Record<number, FayMediaKey>> }
  | { type: 'ownership' }
  | { type: 'outcomes'; values: (string | undefined)[]; kinds: ('measured' | 'delivered')[] }
  | { type: 'lessons' }

const one = (media: FayMediaKey): FigureItem => ({ media })

const PLAN: Entry[] = [
  { type: 'narrative', key: 'context', label: 'context' },
  { type: 'figure', key: 'catalogue', layout: 'full', treatment: 'plain', items: [one('waistcoatsDesk')] },
  { type: 'process', key: 'timeline', kind: 'process', codes: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'] },
  { type: 'narrative', key: 'problem', label: 'problem' },
  { type: 'ownership' },
  { type: 'process', key: 'workLoop', kind: 'loop', codes: ['W1', 'W2', 'W3', 'W4', 'W5'] },

  { type: 'narrative', key: 'system', label: 'custom' },
  { type: 'process', key: 'systemMap', kind: 'map', codes: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'] },
  { type: 'process', key: 'journey', kind: 'process', codes: ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8'] },

  { type: 'narrative', key: 'discovery', label: 'custom' },
  { type: 'figure', key: 'productSections', layout: 'full', treatment: 'plain', items: [one('productSections')] },
  {
    type: 'figure',
    key: 'filters',
    layout: 'sequence',
    treatment: 'screen',
    items: [one('filterSheet'), one('occasionFilter'), one('searchResults')],
  },

  { type: 'narrative', key: 'product', label: 'custom' },
  { type: 'figure', key: 'productPage', layout: 'split', treatment: 'screen', items: [one('productSizes'), one('shoesProduct')] },
  { type: 'figure', key: 'guides', layout: 'split', treatment: 'plain', items: [one('sizeGuideDesk'), one('fabricGuideDesk')] },
  { type: 'figure', key: 'support', layout: 'split', treatment: 'screen', items: [one('shipping'), one('faq')] },

  { type: 'narrative', key: 'checkout', label: 'custom' },
  {
    type: 'figure',
    key: 'checkout',
    layout: 'sequence',
    treatment: 'screen',
    items: [one('cart'), one('checkoutSignIn'), one('checkoutCode'), one('checkoutPay')],
  },
  { type: 'decisions', media: { 1: 'login' } },

  { type: 'narrative', key: 'account', label: 'custom' },
  { type: 'process', key: 'accountMap', kind: 'map', codes: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'] },
  {
    type: 'figure',
    key: 'accountScreens',
    layout: 'pages',
    treatment: 'screen',
    items: [
      { media: 'accDashboard', mobileFull: 'accDashboardWhole' },
      { media: 'accWallet', mobileFull: 'accWalletWhole' },
      { media: 'accAddresses', mobileFull: 'accAddressesWhole' },
      { media: 'accWishlist', mobileFull: 'accWishlistWhole' },
      { media: 'accSettings', mobileFull: 'accSettingsWhole' },
      { media: 'accNotifications', mobileFull: 'accNotificationsWhole' },
      { media: 'accOrders', mobileFull: 'accOrdersWhole' },
      { media: 'accOrder', mobileFull: 'accOrderWhole' },
      { media: 'accWalletOrder', mobileFull: 'accWalletOrderWhole' },
      { media: 'accReturnForm', mobileFull: 'accReturnFormWhole' },
      { media: 'accReturnSent' },
      { media: 'accReturns', mobileFull: 'accReturnsWhole' },
    ],
  },
  { type: 'figure', key: 'accountDesktop', layout: 'split', treatment: 'plain', items: [one('deskDashboard'), one('deskWallet')] },

  { type: 'narrative', key: 'rules', label: 'custom' },
  { type: 'figure', key: 'discounts', layout: 'full', treatment: 'plain', items: [one('adminDiscounts')] },

  { type: 'narrative', key: 'operations', label: 'custom' },
  {
    type: 'figure',
    key: 'admin',
    layout: 'pages',
    treatment: 'plain',
    items: [
      { media: 'adminDashboard', full: 'adminDashboardWhole' },
      { media: 'adminOrders' },
      { media: 'adminOrder', full: 'adminOrderWhole' },
      { media: 'adminSizeStock', full: 'adminSizeStockWhole' },
      { media: 'adminWalletCredit' },
    ],
  },

  { type: 'narrative', key: 'iran', label: 'custom' },
  { type: 'finding', key: 'currencyTrap' },

  { type: 'narrative', key: 'reliability', label: 'custom' },
  { type: 'process', key: 'slugFix', kind: 'process', codes: ['F1', 'F2', 'F3', 'F4', 'F5'] },
  { type: 'finding', key: 'slugFix' },

  {
    type: 'outcomes',
    values: ['113 / 166', '23 / 25', '4 / 15', undefined],
    kinds: ['measured', 'measured', 'measured', 'delivered'],
  },
  { type: 'lessons' },
]

export const FAY_MEDIA = Object.fromEntries(
  (Object.keys(MEDIA_FILES) as FayMediaKey[]).map((key) => [
    key,
    {
      ...MEDIA_FILES[key],
      alt: Object.fromEntries(LOCALES.map((locale) => [locale, COPY[locale].alt[key]])),
    },
  ]),
) as Record<FayMediaKey, MediaSpec>

const pad = (n: number) => String(n).padStart(2, '0')

export function faySections(locale: Locale, media: FayMediaIds): Sections {
  const c = COPY[locale]
  const dir = dirFor(locale)
  const need = <T>(value: T | undefined, what: string): T => {
    if (value === undefined) throw new Error(`faymen (${locale}): missing ${what}`)
    return value
  }

  return PLAN.map((entry, index) => {
    const n = pad(index + 1)
    const id = `fay-s${n}`
    switch (entry.type) {
      case 'narrative': {
        const ch = need(c.chapters[entry.key], `chapter ${entry.key}`)
        return {
          id,
          blockType: 'csNarrative' as const,
          label: entry.label,
          customLabel: entry.label === 'custom' ? need(ch.customLabel, `${entry.key}.customLabel`) : '',
          heading: ch.heading,
          body: prose(
            dir,
            ...ch.body.map((value) => paragraph(value, dir)),
            ...(ch.bullets?.length ? [bullets(ch.bullets, dir)] : []),
          ),
          insight: ch.insight ?? '',
        }
      }
      case 'figure': {
        const fig = need(c.figures[entry.key], `figure ${entry.key}`)
        const pages = entry.layout === 'pages'
        return {
          id,
          blockType: 'csFigure' as const,
          layout: entry.layout,
          treatment: entry.treatment,
          items: entry.items.flatMap((item, i) =>
            media[item.media]
              ? [
                  {
                    id: `fay-f${n}-${i + 1}`,
                    media: media[item.media]!,
                    ...(pages
                      ? {
                          mobile: null,
                          full: (item.full && media[item.full]) || null,
                          mobileFull: (item.mobileFull && media[item.mobileFull]) || null,
                        }
                      : {}),
                    caption: fig.items?.[i] ?? '',
                    group: fig.groups?.[i] ?? '',
                  },
                ]
              : [],
          ),
          annotations: [],
          caption: fig.caption,
        }
      }
      case 'process': {
        const block = need(c.steps[entry.key], `steps ${entry.key}`)
        return {
          id,
          blockType: 'csProcess' as const,
          kind: entry.kind,
          markers: 'number' as const,
          heading: block.heading,
          steps: block.steps.map((step, i) => ({
            id: `fay-p${n}-${i + 1}`,
            code: need(entry.codes[i], `${entry.key} code ${i}`),
            label: step.label,
            note: step.note,
            parts: entry.kind === 'map' ? (step.parts ?? []) : [],
          })),
        }
      }
      case 'finding': {
        const f = need(c.findings[entry.key], `finding ${entry.key}`)
        return {
          id,
          blockType: 'csFinding' as const,
          kind: 'quote' as const,
          text: f.text,
          attribution: f.attribution,
          method: f.method,
        }
      }
      case 'decisions':
        return {
          id,
          blockType: 'csDecisions' as const,
          heading: c.decisions.heading,
          lede: c.decisions.lede,
          items: c.decisions.items.map((item, i) => {
            const key = entry.media[i]
            return {
              id: `fay-d${pad(i + 1)}`,
              title: item.title,
              why: item.why,
              alternatives: item.alternatives,
              tradeoff: item.tradeoff,
              evidence: item.evidence ?? '',
              media: (key && media[key]) || null,
            }
          }),
        }
      case 'ownership':
        return {
          id,
          blockType: 'csOwnership' as const,
          heading: c.ownership.heading,
          intro: c.ownership.intro,
          own: c.ownership.own,
          coOwn: [],
          collaborate: c.ownership.collaborate,
          note: c.ownership.note,
        }
      case 'outcomes':
        return {
          id,
          blockType: 'csOutcomes' as const,
          heading: c.outcomes.heading,
          intro: c.outcomes.intro,
          items: c.outcomes.items.map((item, i) => ({
            id: `fay-o${pad(i + 1)}`,
            kind: need(entry.kinds[i], `outcome kind ${i}`),
            ...(entry.values[i] ? { value: entry.values[i] } : {}),
            label: item.label,
            context: item.context,
            source: item.source ?? '',
          })),
          shipped: c.outcomes.shipped,
        }
      case 'lessons':
        return {
          id,
          blockType: 'csLessons' as const,
          heading: c.lessons.heading,
          items: c.lessons.items.map((lesson, i) => ({
            id: `fay-l${pad(i + 1)}`,
            title: lesson.title,
            body: lesson.body,
          })),
        }
    }
  }) as Sections
}

const HERO: FayMediaKey[] = ['shop', 'shoesProduct', 'accDashboard']

export function fayLocalizedFields(locale: Locale, media: FayMediaIds) {
  const c = COPY[locale]
  const identity = ARCHIVE.text(locale)
  return {
    ...identity,
    statement: c.statement,
    industry: c.industry,
    team: c.team,
    hero: {
      items: HERO.filter((key) => media[key]).map((key, index) => ({
        id: `fay-h${pad(index + 1)}`,
        media: media[key]!,
      })),
      caption: c.heroCaption,
    },
    snapshot: c.snapshot,
    sections: faySections(locale, media),
    meta: {
      title: identity.title,
      description: identity.summary,
      ...(media.cover ? { image: media.cover } : {}),
    },
  }
}

export const FAY_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'shipped',
  tools: [
    'Payload',
    'Next.js',
    'MongoDB',
    'Tailwind CSS',
    'ArvanCloud',
    'Coolify',
    'Gitea',
    'Playwright',
    'Vitest',
  ],
  period: { start: '2026-06-01T00:00:00.000Z', present: true },
}

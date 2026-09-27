import type { Project } from '@/payload-types'
import { LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../../media'
import { paragraph, prose, type TextDirection } from '../lexical'

import ar from './pro-screens/ar.json'
import de from './pro-screens/de.json'
import en from './pro-screens/en.json'
import es from './pro-screens/es.json'
import fa from './pro-screens/fa.json'
import fr from './pro-screens/fr.json'
import ja from './pro-screens/ja.json'

/**
 * Every screen of Carsparency Pro, asked for by Sina on 2026-09-27: one `pages` figure for the app
 * (Screen treatment, D-051) and one for the desktop web product, both grouped by flow. Scanned from
 * every page of the Pro Figma file; `Docs/Experience/Carsparency-Khodro45/carsparency-pro/assets/
 * figma-2026-09-27/manifest.json` records each frame's node and why a frame is left out.
 *
 * Left out: frames that repeat another pixel for pixel; the web pages' phone frames, which are the
 * app's (the app index shows them once); the two onboarding rows marked "Old Version", whose
 * authorship is unconfirmed; the Dealer Landing page (UK benchmark copy and press logos); the KH45
 * page (Khodro45, its own study); the car-map drawings (the study's own figure); and the Updates!
 * frames that belong to the other Carsparency products (the seller site, the inspection report).
 *
 * `gallery/app/first/` holds each app screen's first 844 pt as WebP and `gallery/app/whole/` each
 * frame that runs longer, as JPEG; `gallery/web/first/` each desktop page's first 900 px as WebP and
 * `gallery/web/full/` the whole page, as JPEG. Placeholder personal data is masked before upload
 * (see `Mask`); `raw/` is never uploaded. Copy is one JSON file per locale in `pro-screens/`;
 * English is the source and the other six are machine-drafted.
 */

export const CPRO_APP_GROUPS = [
  'sign-in',
  'auctions',
  'car',
  'my-cars',
  'negotiation',
  'pending',
  'settlement',
  'procured',
  'account',
  'bank',
  'wallet',
  'help',
  'mobile-web',
  'redesign',
  'app-store',
] as const
type AppGroup = (typeof CPRO_APP_GROUPS)[number]

export const CPRO_WEB_GROUPS = [
  'sign-in',
  'auctions',
  'car',
  'my-cars',
  'negotiation',
  'pending',
  'settlement',
  'procured',
  'account',
  'bank',
  'wallet',
  'help',
  'explorations',
  'redesign',
] as const
type WebGroup = (typeof CPRO_WEB_GROUPS)[number]

/**
 * What the upload hides: the sample account's email and phone number (`contact`); those and the
 * portrait used as its profile photo (`profile`); or the bank-transfer screenshot used as a sample
 * proof of payment (`document`).
 */
export type CproMask = 'contact' | 'profile' | 'document'

interface CproScreen<G> {
  slug: string
  group: G
  /** The Figma frame, for re-exports. */
  node: string
  /** Longer than its first screen: the whole frame is a second upload, opened on click. */
  whole?: true
  mask?: CproMask
}

/** In the order a dealer meets them, flow by flow; each flow in the order of its canvas. */
export const CPRO_APP_SCREENS: readonly CproScreen<AppGroup>[] = [
  { slug: 'splash', group: 'sign-in', node: '1:2912' },
  { slug: 'onboarding-1', group: 'sign-in', node: '1:3614' },
  { slug: 'onboarding-2', group: 'sign-in', node: '1:3121' },
  { slug: 'onboarding-3', group: 'sign-in', node: '1:3934' },
  { slug: 'onboarding-alt-1', group: 'sign-in', node: '1:3657' },
  { slug: 'onboarding-alt-2', group: 'sign-in', node: '1:3191' },
  { slug: 'log-in', group: 'sign-in', node: '1:3700', mask: 'contact' },
  { slug: 'forgot-password', group: 'sign-in', node: '1:3726', mask: 'contact' },
  { slug: 'enter-code', group: 'sign-in', node: '1:3747', mask: 'contact' },
  { slug: 'send-code-again', group: 'sign-in', node: '1:3774' },
  { slug: 'sign-up', group: 'sign-in', node: '1:3261', mask: 'contact' },
  { slug: 'your-details', group: 'sign-in', node: '1:3808' },
  { slug: 'your-details-open', group: 'sign-in', node: '1:3839' },
  { slug: 'live', group: 'auctions', node: '1:1941', whole: true },
  { slug: 'live-filtered', group: 'auctions', node: '1:2148', whole: true },
  { slug: 'filter', group: 'auctions', node: '1:2357', whole: true },
  { slug: 'filter-make', group: 'auctions', node: '1:2456', whole: true },
  { slug: 'filter-empty', group: 'auctions', node: '1:2580', whole: true },
  { slug: 'sort', group: 'auctions', node: '1:2681', whole: true },
  { slug: 'upcoming', group: 'auctions', node: '1:2708', whole: true },
  { slug: 'inventory', group: 'auctions', node: '1:2837', whole: true },
  { slug: 'live-car', group: 'car', node: '1:7731' },
  { slug: 'live-car-losing', group: 'car', node: '1:7836' },
  { slug: 'live-car-winning', group: 'car', node: '1:7676' },
  { slug: 'full-detail', group: 'car', node: '1:5714', whole: true },
  { slug: 'full-detail-more', group: 'car', node: '1:7027', whole: true },
  { slug: 'full-detail-losing', group: 'car', node: '1:7892', whole: true },
  { slug: 'full-detail-winning', group: 'car', node: '1:8551', whole: true },
  { slug: 'full-detail-scrolled', group: 'car', node: '1:9210', whole: true },
  { slug: 'all-pictures', group: 'car', node: '1:10894', whole: true },
  { slug: 'picture', group: 'car', node: '1:11038' },
  { slug: 'picture-zoom', group: 'car', node: '1:11087' },
  { slug: 'submit-bid', group: 'car', node: '1:10369' },
  { slug: 'proxy-bid', group: 'car', node: '1:9857' },
  { slug: 'bid-warning', group: 'car', node: '1:10123' },
  { slug: 'bid-toast', group: 'car', node: '1:7812' },
  { slug: 'auto-bid', group: 'car', node: '1:7786' },
  { slug: 'inventory-car', group: 'car', node: '1:6374', whole: true },
  { slug: 'buy-it-now', group: 'car', node: '1:10636' },
  { slug: 'my-cars', group: 'my-cars', node: '1:14731', whole: true },
  { slug: 'my-cars-detail', group: 'my-cars', node: '1:23671', whole: true },
  { slug: 'favorites', group: 'my-cars', node: '1:14860', whole: true },
  { slug: 'my-auctions', group: 'my-cars', node: '1:14986', whole: true },
  { slug: 'my-auctions-detail', group: 'my-cars', node: '1:15064', whole: true },
  { slug: 'negotiation', group: 'negotiation', node: '1:12809', whole: true },
  { slug: 'negotiating', group: 'negotiation', node: '1:15732', whole: true },
  { slug: 'price-declined', group: 'negotiation', node: '1:17732', whole: true },
  { slug: 'increase-price', group: 'negotiation', node: '1:24331' },
  { slug: 'new-offer', group: 'negotiation', node: '1:18399', whole: true },
  { slug: 'price-accepted', group: 'negotiation', node: '1:19061', whole: true },
  { slug: 'pending', group: 'pending', node: '1:13081', whole: true },
  { slug: 'pending-1', group: 'pending', node: '1:19726', whole: true },
  { slug: 'pending-2', group: 'pending', node: '1:20383', whole: true },
  { slug: 'pending-3', group: 'pending', node: '1:21043', whole: true },
  { slug: 'pending-4', group: 'pending', node: '1:21703', whole: true },
  { slug: 'pending-5', group: 'pending', node: '1:22357', whole: true },
  { slug: 'prepay-no-funds', group: 'pending', node: '1:13220', whole: true },
  { slug: 'prepay-short', group: 'pending', node: '1:13784', whole: true },
  { slug: 'prepay-wallet', group: 'pending', node: '1:13495', whole: true },
  { slug: 'prepay-funds', group: 'pending', node: '1:14074', whole: true },
  { slug: 'prepay-covered', group: 'pending', node: '1:14362', whole: true },
  { slug: 'pay-online', group: 'pending', node: '1:11234', mask: 'contact' },
  { slug: 'prepay-done', group: 'pending', node: '1:11237' },
  { slug: 'prepay-failed', group: 'pending', node: '1:11768' },
  { slug: 'settlement', group: 'settlement', node: '1:11776', whole: true, mask: 'document' },
  { slug: 'proof-photo', group: 'settlement', node: '1:11974', whole: true },
  { slug: 'proof-amount', group: 'settlement', node: '1:12070', whole: true, mask: 'document' },
  {
    slug: 'proof-amount-keypad',
    group: 'settlement',
    node: '1:12181',
    whole: true,
    mask: 'document',
  },
  { slug: 'proof-zoom', group: 'settlement', node: '1:11063', mask: 'document' },
  { slug: 'proof-confirm', group: 'settlement', node: '1:12415', whole: true },
  { slug: 'proof-error', group: 'settlement', node: '1:12293', whole: true, mask: 'document' },
  { slug: 'affidavit', group: 'settlement', node: '1:12714', whole: true, mask: 'document' },
  { slug: 'proof-delete', group: 'settlement', node: '1:12613', whole: true, mask: 'document' },
  { slug: 'total-payment', group: 'settlement', node: '1:11876', whole: true, mask: 'document' },
  { slug: 'payment-approved', group: 'settlement', node: '1:12514', whole: true },
  { slug: 'procured', group: 'procured', node: '1:12948', whole: true },
  { slug: 'title-transfer', group: 'procured', node: '1:11245', whole: true, mask: 'document' },
  { slug: 'title-photo', group: 'procured', node: '1:11510', whole: true, mask: 'document' },
  { slug: 'title-uploaded', group: 'procured', node: '1:11378', whole: true, mask: 'document' },
  { slug: 'price-breakdown', group: 'procured', node: '1:11631', whole: true, mask: 'document' },
  { slug: 'delivery', group: 'procured', node: '1:17067', whole: true },
  { slug: 'waiting-title', group: 'procured', node: '1:16394', whole: true },
  { slug: 'procured-empty', group: 'procured', node: '1:17059', whole: true },
  { slug: 'account', group: 'account', node: '1:4123', whole: true, mask: 'profile' },
  { slug: 'log-out', group: 'account', node: '1:4196', mask: 'profile' },
  { slug: 'manage-profile', group: 'account', node: '1:4273' },
  { slug: 'personal-info', group: 'account', node: '1:5635', whole: true, mask: 'profile' },
  { slug: 'change-password', group: 'account', node: '1:5521' },
  { slug: 'documents', group: 'account', node: '1:5482' },
  { slug: 'upload-document', group: 'account', node: '1:5406', whole: true },
  { slug: 'document-checked', group: 'account', node: '1:5439' },
  { slug: 'document-edit', group: 'account', node: '1:5426' },
  { slug: 'document-review', group: 'account', node: '1:5453' },
  { slug: 'document-rejected', group: 'account', node: '1:5467' },
  { slug: 'bank-empty', group: 'bank', node: '1:5555' },
  { slug: 'bank-add', group: 'bank', node: '1:5609' },
  { slug: 'bank-pending', group: 'bank', node: '1:5579' },
  { slug: 'bank-confirmed', group: 'bank', node: '1:5596' },
  { slug: 'bank-rejected', group: 'bank', node: '1:5562' },
  { slug: 'bank-edit', group: 'bank', node: '1:5614' },
  { slug: 'bank-all', group: 'bank', node: '1:5528' },
  { slug: 'wallet', group: 'wallet', node: '1:4300', whole: true },
  { slug: 'wallet-empty', group: 'wallet', node: '83:51919', whole: true },
  { slug: 'add-balance', group: 'wallet', node: '1:4682' },
  { slug: 'deposit-proof', group: 'wallet', node: '1:5165' },
  { slug: 'deposit-done', group: 'wallet', node: '1:5190' },
  { slug: 'deposit-failed', group: 'wallet', node: '1:5221' },
  { slug: 'history-empty', group: 'wallet', node: '1:4658' },
  { slug: 'history', group: 'wallet', node: '1:4534', whole: true },
  { slug: 'history-in', group: 'wallet', node: '1:4708', whole: true },
  { slug: 'history-out', group: 'wallet', node: '1:4831', whole: true },
  { slug: 'withdraw-no-bank', group: 'wallet', node: '1:5367' },
  { slug: 'withdraw', group: 'wallet', node: '1:5382' },
  { slug: 'withdraw-confirm', group: 'wallet', node: '1:5196' },
  { slug: 'withdraw-done', group: 'wallet', node: '1:5228' },
  { slug: 'notifications', group: 'help', node: '1:4428' },
  { slug: 'notifications-auctions', group: 'help', node: '1:4953' },
  { slug: 'notifications-finance', group: 'help', node: '1:5059' },
  { slug: 'privacy', group: 'help', node: '1:5237' },
  { slug: 'faq', group: 'help', node: '1:5289' },
  { slug: 'about', group: 'help', node: '1:5317' },
  { slug: 'help', group: 'help', node: '1:5342' },
  { slug: 'mw-log-in', group: 'mobile-web', node: '20:121590', mask: 'contact' },
  { slug: 'mw-enter-code', group: 'mobile-web', node: '20:121637', mask: 'contact' },
  { slug: 'mw-your-details', group: 'mobile-web', node: '20:122072', mask: 'contact' },
  { slug: 'mw-upcoming', group: 'mobile-web', node: '20:124124', whole: true },
  { slug: 'mw-sort', group: 'mobile-web', node: '20:124088', whole: true },
  { slug: 'mw-live-car', group: 'mobile-web', node: '20:124774' },
  { slug: 'mw-share', group: 'mobile-web', node: '20:124572' },
  { slug: 'mw-car-details', group: 'mobile-web', node: '1:52697', whole: true },
  { slug: 'mw-empty-all', group: 'mobile-web', node: '1:40222' },
  { slug: 'mw-empty-favorites', group: 'mobile-web', node: '1:40426' },
  { slug: 'mw-empty-auctions', group: 'mobile-web', node: '1:40345' },
  { slug: 'mw-negotiation', group: 'mobile-web', node: '1:38097', whole: true },
  { slug: 'mw-negotiating', group: 'mobile-web', node: '1:41384', whole: true },
  { slug: 'mw-settlement', group: 'mobile-web', node: '1:36884', whole: true, mask: 'document' },
  { slug: 'mw-proof-amount', group: 'mobile-web', node: '1:37507', whole: true, mask: 'document' },
  { slug: 'mw-procured', group: 'mobile-web', node: '1:38236', whole: true },
  { slug: 'mw-page-empty', group: 'mobile-web', node: '1:42669', whole: true },
  { slug: 'mw-account', group: 'mobile-web', node: '20:74374', whole: true, mask: 'profile' },
  { slug: 'mw-account-2', group: 'mobile-web', node: '20:74291', whole: true, mask: 'profile' },
  { slug: 'mw-log-out', group: 'mobile-web', node: '20:74459', mask: 'profile' },
  { slug: 'mw-manage-profile', group: 'mobile-web', node: '20:74550' },
  { slug: 'mw-documents', group: 'mobile-web', node: '20:74692' },
  { slug: 'mw-bank-empty', group: 'mobile-web', node: '20:76073' },
  { slug: 'mw-bank-add', group: 'mobile-web', node: '20:76150' },
  { slug: 'mw-bank-confirmed', group: 'mobile-web', node: '20:76132' },
  { slug: 'mw-bank-rejected', group: 'mobile-web', node: '20:76088' },
  { slug: 'mw-bank-edit', group: 'mobile-web', node: '20:76169' },
  { slug: 'mw-bank-all', group: 'mobile-web', node: '20:76038' },
  { slug: 'mw-wallet', group: 'mobile-web', node: '20:74796', whole: true },
  { slug: 'mw-add-balance', group: 'mobile-web', node: '20:75202' },
  { slug: 'mw-history', group: 'mobile-web', node: '20:75056', whole: true },
  { slug: 'mw-history-in', group: 'mobile-web', node: '20:75236', whole: true },
  { slug: 'mw-history-out', group: 'mobile-web', node: '20:75358', whole: true },
  { slug: 'mw-deposit-proof', group: 'mobile-web', node: '20:75737' },
  { slug: 'mw-withdraw-no-bank', group: 'mobile-web', node: '20:75950' },
  { slug: 'mw-withdraw', group: 'mobile-web', node: '20:75973' },
  { slug: 'mw-withdraw-confirm', group: 'mobile-web', node: '20:75797' },
  { slug: 'mw-withdraw-done', group: 'mobile-web', node: '20:75845' },
  { slug: 'mw-privacy', group: 'mobile-web', node: '20:75861', whole: true },
  { slug: 'mw-privacy-short', group: 'mobile-web', node: '20:75889', whole: true },
  { slug: 'mw-about', group: 'mobile-web', node: '20:76885', whole: true },
  { slug: 'mw-help', group: 'mobile-web', node: '20:76406', whole: true },
  { slug: 'rd-log-in-phone', group: 'redesign', node: '20:113220', mask: 'contact' },
  { slug: 'rd-log-in-language', group: 'redesign', node: '20:113253', mask: 'contact' },
  { slug: 'rd-log-in-country', group: 'redesign', node: '20:113295', mask: 'contact' },
  { slug: 'rd-enter-code', group: 'redesign', node: '20:113379', mask: 'contact' },
  { slug: 'rd-enter-code-resend', group: 'redesign', node: '20:113409', mask: 'contact' },
  { slug: 'rd-enter-code-wrong', group: 'redesign', node: '20:113439', mask: 'contact' },
  { slug: 'rd-onboarding', group: 'redesign', node: '20:111987' },
  { slug: 'rd-account', group: 'redesign', node: '20:111906', whole: true, mask: 'profile' },
  { slug: 'rd-account-version', group: 'redesign', node: '20:111825', mask: 'profile' },
  { slug: 'rd-manage-profile', group: 'redesign', node: '20:113481' },
  { slug: 'rd-manage-profile-language', group: 'redesign', node: '20:113524' },
  { slug: 'rd-live', group: 'redesign', node: '20:112933' },
  { slug: 'rd-inventory', group: 'redesign', node: '20:88163', whole: true },
  { slug: 'rd-inventory-list', group: 'redesign', node: '20:87221', whole: true },
  { slug: 'rd-inventory-no-photo', group: 'redesign', node: '20:111322', whole: true },
  { slug: 'rd-inventory-loading', group: 'redesign', node: '20:88593', whole: true },
  { slug: 'rd-my-cars', group: 'redesign', node: '20:112048' },
  { slug: 'rd-my-auctions', group: 'redesign', node: '20:87132', whole: true },
  { slug: 'rd-my-auctions-logos', group: 'redesign', node: '20:87643', whole: true },
  { slug: 'rd-my-auctions-no-photo', group: 'redesign', node: '20:87795', whole: true },
  { slug: 'rd-my-auctions-loading', group: 'redesign', node: '20:87940', whole: true },
  { slug: 'rd-list-loading', group: 'redesign', node: '20:87347', whole: true },
  { slug: 'rd-car-details', group: 'redesign', node: '20:112263' },
  { slug: 'rd-car-info-sections', group: 'redesign', node: '20:88801', whole: true },
  { slug: 'rd-car-info', group: 'redesign', node: '20:89564', whole: true },
  { slug: 'rd-car-info-tabs-pinned', group: 'redesign', node: '20:91731', whole: true },
  { slug: 'rd-car-info-header-pinned', group: 'redesign', node: '20:92397', whole: true },
  { slug: 'rd-car-info-tabs-wheels', group: 'redesign', node: '20:93069', whole: true },
  { slug: 'rd-car-info-header-pinned-2', group: 'redesign', node: '20:93735', whole: true },
  { slug: 'rd-car-info-defects', group: 'redesign', node: '20:108497', whole: true },
  { slug: 'rd-car-info-defects-large', group: 'redesign', node: '20:109296', whole: true },
  { slug: 'rd-car-info-no-defects', group: 'redesign', node: '20:110087', whole: true },
  { slug: 'rd-car-info-no-photo', group: 'redesign', node: '20:90236', whole: true },
  { slug: 'rd-car-info-loading', group: 'redesign', node: '20:90930', whole: true },
  { slug: 'rd-defects', group: 'redesign', node: '20:108331', whole: true },
  { slug: 'rd-defects-2', group: 'redesign', node: '20:108166', whole: true },
  { slug: 'rd-defects-view', group: 'redesign', node: '20:107692' },
  { slug: 'rd-photo', group: 'redesign', node: '20:107594' },
  { slug: 'rd-photo-clean', group: 'redesign', node: '20:107831' },
  { slug: 'rd-photo-sideways', group: 'redesign', node: '20:107863' },
  { slug: 'rd-photo-landscape', group: 'redesign', node: '20:107961' },
  { slug: 'rd-photo-no-photo', group: 'redesign', node: '20:107628' },
  { slug: 'rd-photo-landscape-no-photo', group: 'redesign', node: '20:107897' },
  { slug: 'rd-photo-defect', group: 'redesign', node: '579:13457' },
  { slug: 'store-account', group: 'app-store', node: '421:7477', mask: 'profile' },
  { slug: 'store-onboarding', group: 'app-store', node: '421:7558' },
  { slug: 'store-my-cars', group: 'app-store', node: '421:7619' },
  { slug: 'store-car', group: 'app-store', node: '421:7834' },
  { slug: 'store-live', group: 'app-store', node: '421:8504' },
  { slug: 'store-account-small', group: 'app-store', node: '429:12411', mask: 'profile' },
  { slug: 'store-my-cars-small', group: 'app-store', node: '429:12672' },
  { slug: 'store-car-small', group: 'app-store', node: '429:12943' },
]

/** The desktop web product, in the app's order; each page at 1,440 px. */
export const CPRO_WEB_PAGES: readonly CproScreen<WebGroup>[] = [
  { slug: 'loading', group: 'sign-in', node: '1:36214', whole: true },
  { slug: 'splash', group: 'sign-in', node: '20:122140', whole: true },
  { slug: 'onboarding-1', group: 'sign-in', node: '20:122163', whole: true },
  { slug: 'onboarding-2', group: 'sign-in', node: '20:122270', whole: true },
  { slug: 'onboarding-3', group: 'sign-in', node: '20:122213', whole: true },
  { slug: 'log-in', group: 'sign-in', node: '20:121879', whole: true, mask: 'contact' },
  { slug: 'forgot-password', group: 'sign-in', node: '20:121909', whole: true, mask: 'contact' },
  { slug: 'enter-code', group: 'sign-in', node: '20:121917', whole: true, mask: 'contact' },
  { slug: 'send-code-again', group: 'sign-in', node: '20:122050', whole: true },
  { slug: 'sign-up', group: 'sign-in', node: '20:121852', whole: true, mask: 'contact' },
  { slug: 'your-details', group: 'sign-in', node: '20:121955', whole: true },
  { slug: 'your-details-open', group: 'sign-in', node: '20:121999', whole: true },
  { slug: 'live', group: 'auctions', node: '20:144893', whole: true },
  { slug: 'live-filtered', group: 'auctions', node: '20:142046', whole: true },
  { slug: 'filter', group: 'auctions', node: '20:142572', whole: true },
  { slug: 'filter-make', group: 'auctions', node: '20:143097', whole: true },
  { slug: 'upcoming', group: 'auctions', node: '20:148844', whole: true },
  { slug: 'inventory', group: 'auctions', node: '20:144173', whole: true },
  { slug: 'live-grid', group: 'auctions', node: '20:149100', whole: true },
  { slug: 'live-grid-filtered', group: 'auctions', node: '20:145385', whole: true },
  { slug: 'grid-filter-make', group: 'auctions', node: '20:146761', whole: true },
  { slug: 'upcoming-grid', group: 'auctions', node: '20:144529', whole: true },
  { slug: 'inventory-grid', group: 'auctions', node: '20:148163', whole: true },
  { slug: 'live-car', group: 'car', node: '20:135990', whole: true },
  { slug: 'live-car-losing', group: 'car', node: '20:137411', whole: true },
  { slug: 'live-car-winning', group: 'car', node: '20:138834', whole: true },
  { slug: 'full-detail', group: 'car', node: '20:130272', whole: true },
  { slug: 'full-detail-more', group: 'car', node: '20:139545', whole: true },
  { slug: 'full-detail-losing', group: 'car', node: '20:136699', whole: true },
  { slug: 'full-detail-winning', group: 'car', node: '20:138122', whole: true },
  { slug: 'full-detail-scrolled', group: 'car', node: '20:140148', whole: true },
  { slug: 'all-pictures', group: 'car', node: '20:150902', whole: true },
  { slug: 'picture', group: 'car', node: '20:151069', whole: true },
  { slug: 'picture-zoom', group: 'car', node: '20:151244', whole: true },
  { slug: 'submit-bid', group: 'car', node: '20:133822', whole: true },
  { slug: 'submit-bid-dialog', group: 'car', node: '20:140763', whole: true },
  { slug: 'submit-bid-scrolled', group: 'car', node: '20:141406', whole: true },
  { slug: 'proxy-bid', group: 'car', node: '20:134532', whole: true },
  { slug: 'proxy-bid-short', group: 'car', node: '20:135261', whole: true },
  { slug: 'information', group: 'car', node: '20:151415', whole: true },
  { slug: 'bid-toast', group: 'car', node: '20:130981', whole: true },
  { slug: 'auto-bid', group: 'car', node: '20:131704', whole: true },
  { slug: 'vehicle-details', group: 'car', node: '1:62538', whole: true },
  { slug: 'full-detail-checked', group: 'car', node: '1:60624', whole: true },
  { slug: 'inventory-car', group: 'car', node: '20:132415', whole: true },
  { slug: 'buy-it-now', group: 'car', node: '20:133121', whole: true },
  { slug: 'my-cars', group: 'my-cars', node: '1:53697', whole: true },
  { slug: 'my-cars-detail', group: 'my-cars', node: '1:61829', whole: true },
  { slug: 'favorites', group: 'my-cars', node: '1:63510', whole: true },
  { slug: 'favorites-detail', group: 'my-cars', node: '1:64015', whole: true },
  { slug: 'my-auctions', group: 'my-cars', node: '1:64724', whole: true },
  { slug: 'my-auctions-detail', group: 'my-cars', node: '1:64989', whole: true },
  { slug: 'my-cars-more', group: 'my-cars', node: '1:53821', whole: true },
  { slug: 'my-cars-grid-4', group: 'my-cars', node: '1:79072', whole: true },
  { slug: 'my-cars-grid-2', group: 'my-cars', node: '1:54074', whole: true },
  { slug: 'my-cars-two', group: 'my-cars', node: '1:56146', whole: true },
  { slug: 'favorites-more', group: 'my-cars', node: '1:63762', whole: true },
  { slug: 'favorites-grid-4', group: 'my-cars', node: '1:56796', whole: true },
  { slug: 'favorites-grid-2', group: 'my-cars', node: '1:54585', whole: true },
  { slug: 'my-auctions-grid-4', group: 'my-cars', node: '1:57454', whole: true },
  { slug: 'my-auctions-grid-2', group: 'my-cars', node: '1:55097', whole: true },
  { slug: 'my-auctions-grid-2b', group: 'my-cars', node: '1:56268', whole: true },
  { slug: 'negotiation', group: 'negotiation', node: '1:58975', whole: true },
  { slug: 'negotiation-grid-4', group: 'negotiation', node: '1:58116', whole: true },
  { slug: 'negotiation-grid-2', group: 'negotiation', node: '1:55613', whole: true },
  { slug: 'negotiation-empty', group: 'negotiation', node: '1:56056', whole: true },
  { slug: 'negotiating', group: 'negotiation', node: '1:65698', whole: true },
  { slug: 'price-declined', group: 'negotiation', node: '1:70607', whole: true },
  { slug: 'increase-price', group: 'negotiation', node: '1:72022', whole: true },
  { slug: 'new-offer', group: 'negotiation', node: '1:71318', whole: true },
  { slug: 'price-accepted', group: 'negotiation', node: '1:66398', whole: true },
  { slug: 'pending', group: 'pending', node: '1:77556', whole: true },
  { slug: 'pending-grid-4', group: 'pending', node: '1:76853', whole: true },
  { slug: 'pending-grid-2', group: 'pending', node: '1:76458', whole: true },
  { slug: 'pending-1', group: 'pending', node: '1:67107', whole: true },
  { slug: 'pending-2', group: 'pending', node: '1:67807', whole: true },
  { slug: 'pending-3', group: 'pending', node: '1:68507', whole: true },
  { slug: 'pending-4', group: 'pending', node: '1:69207', whole: true },
  { slug: 'pending-5', group: 'pending', node: '1:69907', whole: true },
  { slug: 'prepay-no-funds', group: 'pending', node: '1:59156', whole: true },
  { slug: 'prepay-short', group: 'pending', node: '1:59440', whole: true },
  { slug: 'prepay-wallet', group: 'pending', node: '1:59736', whole: true },
  { slug: 'prepay-funds', group: 'pending', node: '1:60032', whole: true },
  { slug: 'prepay-covered', group: 'pending', node: '1:60328', whole: true },
  { slug: 'pay-online', group: 'pending', node: '1:61567', whole: true, mask: 'contact' },
  { slug: 'settlement', group: 'settlement', node: '1:72751', whole: true, mask: 'document' },
  { slug: 'proof-photo', group: 'settlement', node: '1:73722', whole: true, mask: 'document' },
  { slug: 'proof-amount', group: 'settlement', node: '1:73854', whole: true, mask: 'document' },
  {
    slug: 'proof-amount-balance',
    group: 'settlement',
    node: '1:74832',
    whole: true,
    mask: 'document',
  },
  { slug: 'proof-zoom', group: 'settlement', node: '1:74165', whole: true, mask: 'document' },
  { slug: 'proof-confirm', group: 'settlement', node: '1:74294', whole: true, mask: 'document' },
  { slug: 'proof-error', group: 'settlement', node: '1:74004', whole: true, mask: 'document' },
  { slug: 'affidavit', group: 'settlement', node: '1:74566', whole: true, mask: 'document' },
  { slug: 'proof-delete', group: 'settlement', node: '1:74699', whole: true, mask: 'document' },
  { slug: 'total-payment', group: 'settlement', node: '1:72868', whole: true, mask: 'document' },
  { slug: 'payment-approved', group: 'settlement', node: '1:74430', whole: true, mask: 'document' },
  { slug: 'procured', group: 'procured', node: '1:78867', whole: true },
  { slug: 'procured-grid-4', group: 'procured', node: '1:78164', whole: true },
  { slug: 'procured-grid-2', group: 'procured', node: '1:77769', whole: true },
  { slug: 'title-transfer', group: 'procured', node: '1:72991', whole: true, mask: 'document' },
  { slug: 'title-photo', group: 'procured', node: '1:73573', whole: true, mask: 'document' },
  { slug: 'title-uploaded', group: 'procured', node: '1:73125', whole: true, mask: 'document' },
  { slug: 'documents-view', group: 'procured', node: '1:73260', whole: true, mask: 'document' },
  { slug: 'price-breakdown', group: 'procured', node: '1:73407', whole: true, mask: 'document' },
  { slug: 'delivery', group: 'procured', node: '1:74983', whole: true },
  { slug: 'waiting-title', group: 'procured', node: '1:75695', whole: true },
  { slug: 'procured-empty', group: 'procured', node: '1:76407', whole: true },
  { slug: 'account', group: 'account', node: '20:78218', whole: true, mask: 'contact' },
  { slug: 'account-coming-soon', group: 'account', node: '20:78343', whole: true, mask: 'contact' },
  { slug: 'account-settings', group: 'account', node: '20:78466', whole: true, mask: 'contact' },
  { slug: 'account-settings-2', group: 'account', node: '20:78590', whole: true, mask: 'contact' },
  { slug: 'log-out', group: 'account', node: '20:78990', whole: true },
  { slug: 'manage-profile', group: 'account', node: '20:76925', whole: true },
  { slug: 'personal-info', group: 'account', node: '20:78715', whole: true, mask: 'profile' },
  { slug: 'personal-info-full', group: 'account', node: '20:78847', whole: true, mask: 'profile' },
  { slug: 'change-password', group: 'account', node: '20:77408', whole: true },
  { slug: 'documents', group: 'account', node: '20:76991' },
  { slug: 'upload-document', group: 'account', node: '20:77077' },
  { slug: 'document-checked', group: 'account', node: '20:77146' },
  { slug: 'document-edit', group: 'account', node: '20:77208' },
  { slug: 'document-review', group: 'account', node: '20:77271' },
  { slug: 'document-rejected', group: 'account', node: '20:77339' },
  { slug: 'bank-empty', group: 'bank', node: '20:77476', whole: true },
  { slug: 'bank-add', group: 'bank', node: '20:77526', whole: true },
  { slug: 'bank-pending', group: 'bank', node: '20:77582', whole: true },
  { slug: 'bank-confirmed', group: 'bank', node: '20:77646', whole: true },
  { slug: 'bank-rejected', group: 'bank', node: '20:77706', whole: true },
  { slug: 'bank-edit', group: 'bank', node: '20:77770', whole: true },
  { slug: 'bank-all', group: 'bank', node: '20:77826', whole: true },
  { slug: 'wallet', group: 'wallet', node: '20:77896', whole: true },
  { slug: 'deposit', group: 'wallet', node: '20:79942', whole: true },
  { slug: 'deposit-done', group: 'wallet', node: '20:79589', whole: true },
  { slug: 'deposit-failed', group: 'wallet', node: '20:79642', whole: true },
  { slug: 'history-empty', group: 'wallet', node: '20:78125', whole: true },
  { slug: 'history', group: 'wallet', node: '20:80433', whole: true },
  { slug: 'history-in', group: 'wallet', node: '20:80242', whole: true },
  { slug: 'history-out', group: 'wallet', node: '20:80031', whole: true },
  { slug: 'withdraw-no-bank', group: 'wallet', node: '20:79694', whole: true },
  { slug: 'withdraw', group: 'wallet', node: '20:79755', whole: true },
  { slug: 'withdraw-confirm', group: 'wallet', node: '20:79825', whole: true },
  { slug: 'withdraw-done', group: 'wallet', node: '20:79888', whole: true },
  { slug: 'notifications', group: 'help', node: '20:79431', whole: true },
  { slug: 'notifications-auctions', group: 'help', node: '20:79273', whole: true },
  { slug: 'notifications-finance', group: 'help', node: '20:79115', whole: true },
  { slug: 'privacy', group: 'help', node: '20:76657', whole: true },
  { slug: 'privacy-short', group: 'help', node: '20:76720' },
  { slug: 'faq', group: 'help', node: '20:79047', whole: true },
  { slug: 'about', group: 'help', node: '20:76783', whole: true },
  { slug: 'help', group: 'help', node: '20:76457' },
  { slug: 'help-contact', group: 'help', node: '20:76546', whole: true },
  { slug: 'test-live', group: 'explorations', node: '75:21557', whole: true },
  { slug: 'test-upcoming', group: 'explorations', node: '75:22377', whole: true },
  { slug: 'test-my-cars', group: 'explorations', node: '75:22836', whole: true },
  { slug: 'test-2', group: 'explorations', node: '83:48431', whole: true },
  { slug: 'test-3', group: 'explorations', node: '83:43304', whole: true },
  { slug: 'test-3-live', group: 'explorations', node: '83:49396', whole: true },
  { slug: 'test-4', group: 'explorations', node: '83:50296', whole: true },
  { slug: 'test-5-live', group: 'explorations', node: '83:44827', whole: true },
  { slug: 'test-5', group: 'explorations', node: '83:47655', whole: true },
  { slug: 'test-6', group: 'explorations', node: '83:44432', whole: true },
  { slug: 'test-7', group: 'explorations', node: '83:45546', whole: true },
  { slug: 'warehouse-test', group: 'explorations', node: '69:15325', whole: true },
  { slug: 'rd-car-negotiation', group: 'redesign', node: '20:99628', whole: true },
  { slug: 'rd-car-negotiation-services', group: 'redesign', node: '20:100474', whole: true },
  { slug: 'rd-car-negotiation-defects', group: 'redesign', node: '20:101328', whole: true },
  { slug: 'rd-defects-dialog', group: 'redesign', node: '20:105733', whole: true },
  { slug: 'rd-defects-dialog-2', group: 'redesign', node: '20:104726', whole: true },
  { slug: 'rd-defects-map', group: 'redesign', node: '20:108020', whole: true },
  { slug: 'rd-video-dark', group: 'redesign', node: '699:10312', whole: true },
  { slug: 'rd-video-light', group: 'redesign', node: '734:8332', whole: true },
]

interface ScreensCopy {
  appGroups: Record<AppGroup, string>
  webGroups: Record<WebGroup, string>
  appLabels: Record<string, string>
  webLabels: Record<string, string>
  chapter: {
    label: string
    heading: string
    body: string[]
    appCaption: string
    webCaption: string
  }
  alt: { app: string; appWhole: string; web: string; webFull: string }
  /** Appended to the alt of a masked screen. */
  masked: Record<CproMask, string>
}

export const CPRO_SCREEN_COPY: Record<Locale, ScreensCopy> = { en, fa, ar, de, es, fr, ja }

// A missing name ships an empty tab or caption on a `fallback: false` site — fail at import instead.
for (const locale of LOCALES) {
  const copy = CPRO_SCREEN_COPY[locale]
  const missing = [
    ...CPRO_APP_GROUPS.filter((group) => !copy.appGroups[group]?.trim()),
    ...CPRO_WEB_GROUPS.filter((group) => !copy.webGroups[group]?.trim()),
    ...CPRO_APP_SCREENS.filter((screen) => !copy.appLabels[screen.slug]?.trim()).map(
      (screen) => `app ${screen.slug}`,
    ),
    ...CPRO_WEB_PAGES.filter((page) => !copy.webLabels[page.slug]?.trim()).map(
      (page) => `web ${page.slug}`,
    ),
    ...(['label', 'heading', 'appCaption', 'webCaption'] as const).filter(
      (key) => !copy.chapter[key]?.trim(),
    ),
  ]
  if (missing.length || copy.chapter.body.length !== 2) {
    throw new Error(
      `carsparency-pro screens: ${locale} copy is missing ${missing.join(', ') || 'a paragraph'}`,
    )
  }
}

export type CproScreenMediaKey = `app:${string}` | `web:${string}`
const appKey = (slug: string, whole = false): CproScreenMediaKey =>
  `app:${slug}${whole ? ':whole' : ''}`
const webKey = (slug: string, full = false): CproScreenMediaKey =>
  `web:${slug}${full ? ':full' : ''}`

type AltVariant = keyof ScreensCopy['alt']

const alt = (
  surface: 'app' | 'web',
  screen: CproScreen<AppGroup> | CproScreen<WebGroup>,
  variant: AltVariant,
) =>
  Object.fromEntries(
    LOCALES.map((locale) => {
      const copy = CPRO_SCREEN_COPY[locale]
      const group =
        surface === 'app'
          ? copy.appGroups[screen.group as AppGroup]
          : copy.webGroups[screen.group as WebGroup]
      const label = (surface === 'app' ? copy.appLabels : copy.webLabels)[screen.slug]!
      const text = copy.alt[variant].replace('{group}', group).replace('{label}', label)
      return [locale, screen.mask ? `${text}${copy.masked[screen.mask]}` : text]
    }),
  )

const spec = (file: string, name: string, text: MediaSpec['alt']): MediaSpec => ({
  file,
  name,
  alt: text,
})

export const CPRO_SCREEN_MEDIA: Record<CproScreenMediaKey, MediaSpec> = Object.fromEntries([
  ...CPRO_APP_SCREENS.flatMap((screen) => [
    [
      appKey(screen.slug),
      spec(
        `gallery/app/first/${screen.slug}.webp`,
        `carsparency-pro--screen-${screen.slug}.webp`,
        alt('app', screen, 'app'),
      ),
    ],
    ...(screen.whole
      ? [
          [
            appKey(screen.slug, true),
            spec(
              `gallery/app/whole/${screen.slug}.jpg`,
              `carsparency-pro--screen-${screen.slug}--whole.jpg`,
              alt('app', screen, 'appWhole'),
            ),
          ],
        ]
      : []),
  ]),
  ...CPRO_WEB_PAGES.flatMap((page) => [
    [
      webKey(page.slug),
      spec(
        `gallery/web/first/${page.slug}.webp`,
        `carsparency-pro--page-${page.slug}.webp`,
        alt('web', page, 'web'),
      ),
    ],
    ...(page.whole
      ? [
          [
            webKey(page.slug, true),
            spec(
              `gallery/web/full/${page.slug}.jpg`,
              `carsparency-pro--page-${page.slug}--full.jpg`,
              alt('web', page, 'webFull'),
            ),
          ],
        ]
      : []),
  ]),
]) as Record<CproScreenMediaKey, MediaSpec>

type Sections = NonNullable<Project['sections']>

/**
 * The chapter and its two indexes, after the solution figures. Every optional leaf is written,
 * empty if need be: a localized leaf merges by row position, and these rows take positions the
 * ecosystem, ownership and outcomes rows held.
 */
export function cproScreenSections(
  locale: Locale,
  direction: TextDirection,
  media: Partial<Record<CproScreenMediaKey, string>>,
): Sections {
  const copy = CPRO_SCREEN_COPY[locale]
  const row = (index: number) => String(index + 1).padStart(3, '0')
  return [
    {
      id: 'cpro-s13a',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: copy.chapter.label,
      heading: copy.chapter.heading,
      body: prose(direction, ...copy.chapter.body.map((value) => paragraph(value, direction))),
      insight: '',
    },
    {
      id: 'cpro-s13b',
      blockType: 'csFigure',
      layout: 'pages',
      treatment: 'screen',
      items: CPRO_APP_SCREENS.flatMap((screen, index) => {
        const first = media[appKey(screen.slug)]
        if (!first) return []
        return [
          {
            id: `cpro-g${row(index)}`,
            media: first,
            mobile: null,
            full: null,
            mobileFull: (screen.whole && media[appKey(screen.slug, true)]) || null,
            caption: copy.appLabels[screen.slug],
            group: copy.appGroups[screen.group],
          },
        ]
      }),
      annotations: [],
      caption: copy.chapter.appCaption,
    },
    {
      id: 'cpro-s13c',
      blockType: 'csFigure',
      layout: 'pages',
      treatment: 'plain',
      items: CPRO_WEB_PAGES.flatMap((page, index) => {
        const first = media[webKey(page.slug)]
        if (!first) return []
        return [
          {
            id: `cpro-w${row(index)}`,
            media: first,
            mobile: null,
            full: (page.whole && media[webKey(page.slug, true)]) || null,
            mobileFull: null,
            caption: copy.webLabels[page.slug],
            group: copy.webGroups[page.group],
          },
        ]
      }),
      annotations: [],
      caption: copy.chapter.webCaption,
    },
  ]
}

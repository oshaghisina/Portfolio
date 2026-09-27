import type { Project } from '@/payload-types'
import type { Locale } from '@/utilities/locale'

import { archiveIdentity } from '../archive'
import { assertCopyShape, type CspCopy, type CspStudy, cspLocalizedFields, cspMedia } from '../carsparency/shared'
import ar from './copy/taha-gasht-platform.ar.json'
import de from './copy/taha-gasht-platform.de.json'
import en from './copy/taha-gasht-platform.en.json'
import es from './copy/taha-gasht-platform.es.json'
import fa from './copy/taha-gasht-platform.fa.json'
import fr from './copy/taha-gasht-platform.fr.json'
import ja from './copy/taha-gasht-platform.ja.json'

/**
 * Taha Gasht booking-site redesign (`/work/taha-gasht-platform`), from the "Tahagasht-B2C" Figma
 * file (22 pages) and four FigJam boards — information architecture for flights and hotels, the
 * Japan tour page map, opportunity trees and the social strategy — scanned 2026-09-27 and recorded
 * in `Docs/Experience/Taha-Gasht/platform-redesign/README.md`. Sina, 2026-09-27: the redesign was
 * fully built (it is live on tahagasht.com); the Travel Planner & Social screens are Sina's; from
 * the Opportunity board only the Ticket and Hotel trees are used.
 *
 * Publication gates (held here and in `tests/int/case-study-seeds.int.spec.ts`):
 * - Only `study/` is uploaded: Sina's own frames and boards, and the live site as captured.
 * - Never a benchmark capture, UI kit, community template or the bought icon set; never a frame
 *   pasted in from another project (an online school's class booking and footer, a digital-gold buy
 *   box, a car marketplace's account menu, a software vendor's header); never the Opportunity
 *   board's journey map (another project, a colleague's stickies); never the Ware House or Logo
 *   pages (authorship unconfirmed).
 * - Exports are masked for personal data: Sina's email, phone-like numbers, passport, IBAN and
 *   national-code samples, and every real person's name except Sina's own. The profile photo, the
 *   ID-card image and a sample author's photo are blurred, as are the two screenshots pasted onto
 *   the information-architecture board (the old site, a competitor's map). A price-of-goods line
 *   left over from another project is cleared from the checkout.
 * - Phone screens are cropped to the first screen the page shows, so nothing below it is uploaded.
 * - No colleague, reviewer or vendor is named. No traffic or sales figure: the file has none.
 */
const SLUG = 'taha-gasht-platform'
const ARCHIVE = archiveIdentity(SLUG)
const COPY: Record<Locale, CspCopy> = { en, fa, ar, es, de, fr, ja }
assertCopyShape(SLUG, COPY)

const N = 'taha-gasht--'

const FILES = {
  cover: { file: 'study/home/home-desktop.png', name: ARCHIVE.row.cover.name },
  homeMobile: { file: 'study/home/home-mobile.png', name: `${N}home-mobile.png` },
  stories: { file: 'study/home/stories.png', name: `${N}home-stories.png` },

  iaMap: { file: 'study/boards/information-architecture.png', name: `${N}information-architecture.png` },
  opportunity: { file: 'study/boards/opportunity-trees.png', name: `${N}opportunity-trees.png` },
  tourMap: { file: 'study/boards/tour-page-map.png', name: `${N}tour-page-map.png` },

  ticket1: { file: 'study/language/iteration-1.png', name: `${N}ticket-iteration-1.png` },
  ticket3: { file: 'study/language/final-versions.png', name: `${N}ticket-final-versions.png` },

  flightList: { file: 'study/flights/results-desktop.png', name: `${N}flight-results.png` },
  flightDetail: { file: 'study/flights/ticket-result.png', name: `${N}flight-ticket-result.png` },
  flightPrice: { file: 'study/flights/price-details.png', name: `${N}flight-price-details.png` },

  hotelList: { file: 'study/hotels/list.png', name: `${N}hotel-list.png` },
  hotelMap: { file: 'study/hotels/map.png', name: `${N}hotel-map.png` },
  hotelDetail: { file: 'study/hotels/detail.png', name: `${N}hotel-detail.png` },

  tourList: { file: 'study/tours/list.png', name: `${N}tour-list.png` },
  tourPage: { file: 'study/tours/japan-tour.png', name: `${N}tour-japan.png` },
  tourPackage: { file: 'study/tours/package.png', name: `${N}tour-package.png` },

  checkout: { file: 'study/account/checkout.png', name: `${N}checkout.png` },
  travels: { file: 'study/account/travels.png', name: `${N}account-travels.png` },
  passengers: { file: 'study/account/passengers.png', name: `${N}account-passengers.png` },
  wallet: { file: 'study/account/wallet.png', name: `${N}account-wallet.png` },
  bookmarks: { file: 'study/account/bookmarks.png', name: `${N}account-bookmarks.png` },
  profile: { file: 'study/account/profile.png', name: `${N}account-profile.png` },
  notifications: { file: 'study/account/notifications.png', name: `${N}account-notifications.png` },
  support: { file: 'study/account/support.png', name: `${N}account-support.png` },
  signOut: { file: 'study/account/sign-out.png', name: `${N}account-sign-out.png` },

  maker1: { file: 'study/next/travel-maker-1.png', name: `${N}travel-maker-1.png` },
  maker2: { file: 'study/next/travel-maker-2.png', name: `${N}travel-maker-2.png` },
  maker3: { file: 'study/next/travel-maker-3.png', name: `${N}travel-maker-3.png` },
  maker4: { file: 'study/next/travel-maker-4.png', name: `${N}travel-maker-4.png` },
  socialFeed: { file: 'study/next/social-feed.png', name: `${N}social-feed.png` },
  socialExperience: { file: 'study/next/social-experience.png', name: `${N}social-experience.png` },
  socialGoals: { file: 'study/boards/social-goals.png', name: `${N}social-goals.png` },
  socialMap: { file: 'study/boards/social-system-map.png', name: `${N}social-system-map.png` },

  liveHome: { file: 'study/live/home.jpg', name: `${N}live-home.jpg` },
  liveFlights: { file: 'study/live/flight-results.jpg', name: `${N}live-flight-results.jpg` },
  liveHotels: { file: 'study/live/hotels.jpg', name: `${N}live-hotels.jpg` },
  liveTours: { file: 'study/live/tours.jpg', name: `${N}live-tours.jpg` },
  liveJapan: { file: 'study/live/japan-tour.jpg', name: `${N}live-japan-tour.jpg` },
} as const

type Key = keyof typeof FILES

const STUDY: CspStudy<Key> = {
  slug: SLUG,
  prefix: 'tah',
  assetsDir: 'Docs/Experience/Taha-Gasht/platform-redesign/assets',
  files: FILES,
  hero: ['cover'],
  cover: 'cover',
  copy: COPY,
  plan: [
    { type: 'narrative', key: 'context', label: 'context' },
    { type: 'narrative', key: 'problem', label: 'problem' },
    { type: 'narrative', key: 'benchmark', label: 'research' },
    { type: 'process', codes: ['BM', 'IA', 'DL', 'UI', 'ACC', 'NEXT'] },

    { type: 'narrative', key: 'ia', label: 'approach' },
    { type: 'figure', key: 'iaMap', layout: 'full', treatment: 'diagram', media: ['iaMap'] },
    { type: 'narrative', key: 'suggestions', label: 'custom' },
    { type: 'figure', key: 'opportunity', layout: 'full', treatment: 'diagram', media: ['opportunity'] },
    { type: 'figure', key: 'tourMap', layout: 'full', treatment: 'diagram', media: ['tourMap'] },

    { type: 'narrative', key: 'language', label: 'custom' },
    // Desktop pages are `plain`: `screen` frames a phone viewport. Whole pages go in `pages`
    // (first screen, full page on click); one-screen frames sit side by side or alone.
    { type: 'figure', key: 'language', layout: 'pages', treatment: 'plain', media: ['ticket1', 'ticket3'] },

    { type: 'narrative', key: 'flights', label: 'solution' },
    { type: 'figure', key: 'flightList', layout: 'annotated', treatment: 'plain', media: ['flightList'] },
    { type: 'figure', key: 'flightPages', layout: 'split', treatment: 'plain', media: ['flightDetail', 'flightPrice'] },

    { type: 'narrative', key: 'hotels', label: 'custom' },
    { type: 'figure', key: 'hotelViews', layout: 'pages', treatment: 'plain', media: ['hotelList', 'hotelMap', 'hotelDetail'] },

    { type: 'narrative', key: 'tours', label: 'custom' },
    { type: 'figure', key: 'tourParts', layout: 'pages', treatment: 'plain', media: ['tourList', 'tourPage', 'tourPackage'] },

    { type: 'narrative', key: 'home', label: 'custom' },
    { type: 'figure', key: 'homeMobile', layout: 'split', treatment: 'screen', media: ['homeMobile', 'stories'] },

    { type: 'narrative', key: 'account', label: 'custom' },
    { type: 'figure', key: 'checkout', layout: 'full', treatment: 'plain', media: ['checkout'] },
    {
      type: 'figure',
      key: 'account',
      layout: 'pages',
      treatment: 'plain',
      media: ['travels', 'passengers', 'wallet', 'bookmarks', 'profile', 'notifications', 'support', 'signOut'],
    },

    { type: 'narrative', key: 'next', label: 'custom' },
    { type: 'figure', key: 'maker', layout: 'sequence', treatment: 'screen', media: ['maker1', 'maker2', 'maker3', 'maker4'] },
    { type: 'figure', key: 'social', layout: 'split', treatment: 'screen', media: ['socialFeed', 'socialExperience'] },
    { type: 'figure', key: 'strategy', layout: 'split', treatment: 'diagram', media: ['socialGoals', 'socialMap'] },

    { type: 'narrative', key: 'shipped', label: 'outcome' },
    {
      type: 'figure',
      key: 'live',
      layout: 'pages',
      treatment: 'plain',
      media: ['liveHome', 'liveFlights', 'liveHotels', 'liveTours', 'liveJapan'],
    },

    { type: 'decisions' },
    { type: 'ownership' },
    { type: 'outcomes', values: ['12', '8', '4', '7'] },
    { type: 'lessons' },
  ],
}

export const TAH_SLUG = SLUG
export const TAH_ASSETS = STUDY.assetsDir
export const TAH_MEDIA = cspMedia(STUDY)
export const TAH_COVER_KEY: Key = STUDY.cover
export const tahLocalizedFields = cspLocalizedFields(STUDY)

// No `projectStatus` or `period`: Sina's months are still open (README Q1); the file's own dates
// run from July to November 2024.
export const TAH_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  tools: ['Figma', 'FigJam'],
}

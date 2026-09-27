import type { Project } from '@/payload-types'
import { LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../media'
import { paragraph, prose, type TextDirection } from './lexical'

import ar from './vin-app-screens/ar.json'
import de from './vin-app-screens/de.json'
import en from './vin-app-screens/en.json'
import es from './vin-app-screens/es.json'
import fa from './vin-app-screens/fa.json'
import fr from './vin-app-screens/fr.json'
import ja from './vin-app-screens/ja.json'

/**
 * Every screen of the VIN app, as one `pages` figure with the Screen treatment (D-051): section
 * tabs, sheets of twelve phones, the whole screen on click. The Figma `App` page (`11909:187`)
 * holds 138 phone frames in eleven sections; twelve are exact copies (the venue section repeats
 * the meetup wizard step for step, and "Edit meetup" sits twice), so the index shows 126, in ten
 * flows — the Create and Wizard sections are one flow here.
 *
 * `assets/gallery/raw/` holds the exports: 2× through `download_assets`, except ten frames rendered
 * alone at 1× (six the file dims to 10%, four under a canvas overlay). `screens/` has each first
 * screen at 780×1688 (a short frame padded with its last row) and `whole/` each screen taller than
 * 900 px. Placeholder personal data is masked before upload: the sign-in email is pixelated on
 * three screens and the 92 px "Profile Sina Oshaghi" photo is blurred on eleven. `raw/` is never
 * uploaded. Copy is one JSON file per locale in `vin-app-screens/`.
 */

export const VIN_SCREEN_GROUPS = [
  'onboarding',
  'sign-in',
  'home',
  'meetup',
  'tickets',
  'create',
  'chat',
  'activity',
  'profile',
  'business',
] as const
type ScreenGroup = (typeof VIN_SCREEN_GROUPS)[number]

interface VinScreen {
  slug: string
  group: ScreenGroup
  /** The Figma frame, for re-exports. */
  node: string
  /** Taller than 900 px: the whole screen is a second upload, opened on click. */
  whole?: true
}

/** In the order a person meets them, flow by flow. */
export const VIN_SCREENS: readonly VinScreen[] = [
  { slug: 'onboarding-movement', group: 'onboarding', node: '22074:28179' },
  { slug: 'onboarding-goals', group: 'onboarding', node: '22074:28205' },
  { slug: 'onboarding-active', group: 'onboarding', node: '22074:28233' },
  { slug: 'onboarding-network', group: 'onboarding', node: '22074:28259' },
  { slug: 'sign-in-start', group: 'sign-in', node: '22074:28316' },
  { slug: 'sign-in-email', group: 'sign-in', node: '22487:9650' },
  { slug: 'sign-in-code', group: 'sign-in', node: '22464:12907' },
  { slug: 'sign-in-code-wrong', group: 'sign-in', node: '23257:9579' },
  { slug: 'sign-in-welcome', group: 'sign-in', node: '22074:28368' },
  { slug: 'home-feed', group: 'home', node: '22074:26790', whole: true },
  { slug: 'home-search', group: 'home', node: '22438:9889', whole: true },
  { slug: 'home-category', group: 'home', node: '22439:8670', whole: true },
  { slug: 'home-gallery', group: 'home', node: '22439:9088', whole: true },
  { slug: 'home-map', group: 'home', node: '23296:11689' },
  { slug: 'home-map-list', group: 'home', node: '23298:10320' },
  { slug: 'home-offline', group: 'home', node: '23296:11578' },
  { slug: 'meetup-draft', group: 'meetup', node: '21933:3974', whole: true },
  { slug: 'meetup-host-upcoming', group: 'meetup', node: '21963:11253', whole: true },
  { slug: 'meetup-edit', group: 'meetup', node: '22493:12113', whole: true },
  { slug: 'meetup-edit-date', group: 'meetup', node: '22516:9723' },
  { slug: 'meetup-edit-start', group: 'meetup', node: '22516:9876' },
  { slug: 'meetup-edit-capacity', group: 'meetup', node: '22516:10029' },
  { slug: 'meetup-edit-end', group: 'meetup', node: '22516:10182' },
  { slug: 'meetup-edit-location', group: 'meetup', node: '22517:11278' },
  { slug: 'meetup-host-cancel', group: 'meetup', node: '22393:31671' },
  { slug: 'meetup-host-cancel-reason', group: 'meetup', node: '22493:11863', whole: true },
  { slug: 'meetup-requests', group: 'meetup', node: '22431:8569', whole: true },
  { slug: 'meetup-attendees', group: 'meetup', node: '22398:10689', whole: true },
  { slug: 'meetup-host-past', group: 'meetup', node: '22373:9607', whole: true },
  { slug: 'meetup-gallery', group: 'meetup', node: '22393:31349', whole: true },
  { slug: 'meetup-gallery-photo', group: 'meetup', node: '22393:33716' },
  { slug: 'meetup-gallery-remove', group: 'meetup', node: '22394:33885' },
  { slug: 'meetup-join-profile', group: 'meetup', node: '22463:9632' },
  { slug: 'meetup-join-party', group: 'meetup', node: '22464:11417' },
  { slug: 'meetup-photo-profile', group: 'meetup', node: '22550:9227' },
  { slug: 'meetup-photo-cover', group: 'meetup', node: '22550:9637' },
  { slug: 'meetup-photo-crop', group: 'meetup', node: '22550:9439' },
  { slug: 'meetup-confirm-paid', group: 'meetup', node: '22401:10857' },
  { slug: 'meetup-confirm-free', group: 'meetup', node: '23459:10633' },
  { slug: 'meetup-joined-paid', group: 'meetup', node: '23454:10149', whole: true },
  { slug: 'meetup-joined-free', group: 'meetup', node: '23454:10212', whole: true },
  { slug: 'meetup-guest-upcoming', group: 'meetup', node: '22373:9904', whole: true },
  { slug: 'meetup-guest-past', group: 'meetup', node: '22373:10201', whole: true },
  { slug: 'meetup-leave-paid', group: 'meetup', node: '22393:32600' },
  { slug: 'meetup-leave-late', group: 'meetup', node: '22393:33264' },
  { slug: 'meetup-leave-free', group: 'meetup', node: '22393:32946' },
  { slug: 'meetup-invite', group: 'meetup', node: '22373:10498' },
  { slug: 'meetup-share', group: 'meetup', node: '21936:2820' },
  { slug: 'meetup-story', group: 'meetup', node: '21936:1285' },
  { slug: 'tickets-upcoming', group: 'tickets', node: '22074:44604', whole: true },
  { slug: 'tickets-past', group: 'tickets', node: '22439:12787', whole: true },
  { slug: 'tickets-empty', group: 'tickets', node: '22529:14495' },
  { slug: 'create-chat', group: 'create', node: '21929:22443' },
  { slug: 'create-interest', group: 'create', node: '21902:4315' },
  { slug: 'create-discovery', group: 'create', node: '21915:46357', whole: true },
  { slug: 'create-recent', group: 'create', node: '21915:46541', whole: true },
  { slug: 'create-step-activity', group: 'create', node: '22028:5481' },
  { slug: 'create-step-side', group: 'create', node: '22028:8642' },
  { slug: 'create-step-location', group: 'create', node: '22527:12635' },
  { slug: 'create-step-date', group: 'create', node: '22527:12227', whole: true },
  { slug: 'create-step-start', group: 'create', node: '22527:11796', whole: true },
  { slug: 'create-step-end', group: 'create', node: '22527:11342', whole: true },
  { slug: 'create-step-cover', group: 'create', node: '22028:7065', whole: true },
  { slug: 'create-map', group: 'create', node: '22552:11210' },
  { slug: 'create-preview', group: 'create', node: '22521:15356', whole: true },
  { slug: 'create-spot', group: 'create', node: '23259:9839' },
  { slug: 'create-spot-empty', group: 'create', node: '23259:10177' },
  { slug: 'chat-people', group: 'chat', node: '22074:26281', whole: true },
  { slug: 'chat-groups', group: 'chat', node: '23249:11358' },
  { slug: 'chat-meetups', group: 'chat', node: '23249:11601' },
  { slug: 'chat-empty', group: 'chat', node: '23254:12929', whole: true },
  { slug: 'chat-single', group: 'chat', node: '22074:101890', whole: true },
  { slug: 'chat-attach', group: 'chat', node: '23219:10358' },
  { slug: 'chat-share-meetup', group: 'chat', node: '22393:20101', whole: true },
  { slug: 'chat-more', group: 'chat', node: '23254:13104' },
  { slug: 'chat-group', group: 'chat', node: '23217:10233', whole: true },
  { slug: 'chat-group-info', group: 'chat', node: '23214:9958' },
  { slug: 'chat-group-new', group: 'chat', node: '23230:10696' },
  { slug: 'chat-group-edit', group: 'chat', node: '23254:12597' },
  { slug: 'chat-group-remove', group: 'chat', node: '23254:13829' },
  { slug: 'chat-meetup', group: 'chat', node: '23254:13512', whole: true },
  { slug: 'chat-meetup-info', group: 'chat', node: '23254:13659' },
  { slug: 'activity-meets', group: 'activity', node: '22074:44690', whole: true },
  { slug: 'activity-people', group: 'activity', node: '22394:34049', whole: true },
  { slug: 'activity-system', group: 'activity', node: '22394:34325', whole: true },
  { slug: 'activity-empty', group: 'activity', node: '22519:13352', whole: true },
  { slug: 'profile-feeds', group: 'profile', node: '21938:13822', whole: true },
  { slug: 'profile-links', group: 'profile', node: '22269:11070', whole: true },
  { slug: 'profile-new', group: 'profile', node: '23233:8781', whole: true },
  { slug: 'profile-new-others', group: 'profile', node: '23241:11021', whole: true },
  { slug: 'profile-gallery', group: 'profile', node: '22190:14916', whole: true },
  { slug: 'profile-mutual', group: 'profile', node: '22398:10088', whole: true },
  { slug: 'profile-followers', group: 'profile', node: '22398:10353', whole: true },
  { slug: 'profile-following', group: 'profile', node: '22398:10520', whole: true },
  { slug: 'profile-edit', group: 'profile', node: '22184:6632' },
  { slug: 'profile-details', group: 'profile', node: '22190:13820' },
  { slug: 'profile-location', group: 'profile', node: '22283:8488' },
  { slug: 'profile-picture', group: 'profile', node: '22190:13945' },
  { slug: 'profile-privacy', group: 'profile', node: '22190:14070' },
  { slug: 'profile-apps', group: 'profile', node: '22190:14320' },
  { slug: 'profile-link', group: 'profile', node: '22264:9796' },
  { slug: 'profile-link-instagram', group: 'profile', node: '22283:7890' },
  { slug: 'profile-more', group: 'profile', node: '22190:8652' },
  { slug: 'profile-logout', group: 'profile', node: '22190:9182' },
  { slug: 'profile-settings', group: 'profile', node: '22190:10555' },
  { slug: 'profile-notifications', group: 'profile', node: '22205:17232' },
  { slug: 'profile-about', group: 'profile', node: '22205:17356' },
  { slug: 'profile-share', group: 'profile', node: '22267:10202' },
  { slug: 'profile-blocked', group: 'profile', node: '22205:17480' },
  { slug: 'profile-bank', group: 'profile', node: '22205:17604' },
  { slug: 'profile-currency', group: 'profile', node: '22205:17728' },
  { slug: 'profile-password', group: 'profile', node: '22359:8087' },
  { slug: 'profile-close', group: 'profile', node: '22208:6157' },
  { slug: 'profile-other', group: 'profile', node: '22190:9631', whole: true },
  { slug: 'profile-block', group: 'profile', node: '22210:6782' },
  { slug: 'profile-invite', group: 'profile', node: '22210:7248' },
  { slug: 'profile-invite-sent', group: 'profile', node: '22210:7780' },
  { slug: 'profile-invite-sent-card', group: 'profile', node: '22213:8334' },
  { slug: 'business-website', group: 'business', node: '23693:10388', whole: true },
  { slug: 'business-offer', group: 'business', node: '24030:13380' },
  { slug: 'business-home', group: 'business', node: '24030:11334', whole: true },
  { slug: 'business-venues', group: 'business', node: '24030:11860', whole: true },
  { slug: 'business-venue', group: 'business', node: '24040:11824', whole: true },
  { slug: 'business-sponsor', group: 'business', node: '24041:12712' },
  { slug: 'business-meetup', group: 'business', node: '24030:12962', whole: true },
  { slug: 'business-pick-venue', group: 'business', node: '24059:16950', whole: true },
]

interface ScreensCopy {
  groups: Record<ScreenGroup, string>
  labels: Record<string, string>
  chapter: { label: string; heading: string; body: string[]; figureCaption: string }
  alt: { first: string; whole: string }
}

const COPY: Record<Locale, ScreensCopy> = { en, fa, ar, de, es, fr, ja }

// A missing name ships an empty tab or caption on a `fallback: false` site — fail at import instead.
for (const locale of LOCALES) {
  const copy = COPY[locale]
  const missing = [
    ...VIN_SCREEN_GROUPS.filter((group) => !copy.groups[group]?.trim()),
    ...VIN_SCREENS.filter((screen) => !copy.labels[screen.slug]?.trim()).map(
      (screen) => screen.slug,
    ),
    ...(['label', 'heading', 'figureCaption'] as const).filter((key) => !copy.chapter[key]?.trim()),
  ]
  if (missing.length || copy.chapter.body.length !== 2) {
    throw new Error(
      `vin-app screens: ${locale} copy is missing ${missing.join(', ') || 'a paragraph'}`,
    )
  }
}

export type VinScreenMediaKey = `screen:${string}`
const firstKey = (slug: string): VinScreenMediaKey => `screen:${slug}`
const wholeKey = (slug: string): VinScreenMediaKey => `screen:${slug}:whole`

const alt = (screen: VinScreen, variant: 'first' | 'whole') =>
  Object.fromEntries(
    LOCALES.map((locale) => {
      const copy = COPY[locale]
      return [
        locale,
        copy.alt[variant]
          .replace('{group}', copy.groups[screen.group])
          .replace('{label}', copy.labels[screen.slug]!),
      ]
    }),
  )

export const VIN_SCREEN_MEDIA: Record<VinScreenMediaKey, MediaSpec> = Object.fromEntries(
  VIN_SCREENS.flatMap((screen) => [
    [
      firstKey(screen.slug),
      {
        file: `gallery/screens/${screen.slug}.webp`,
        name: `vin-app--screen-${screen.slug}.webp`,
        alt: alt(screen, 'first'),
      },
    ],
    ...(screen.whole
      ? [
          [
            wholeKey(screen.slug),
            {
              file: `gallery/whole/${screen.slug}.webp`,
              name: `vin-app--screen-${screen.slug}--whole.webp`,
              alt: alt(screen, 'whole'),
            },
          ],
        ]
      : []),
  ]),
) as Record<VinScreenMediaKey, MediaSpec>

type Sections = NonNullable<Project['sections']>

/**
 * The chapter and its index. Every optional leaf is written, empty if need be: a localized leaf
 * merges by row position, and these rows take the positions the outcomes and lessons held.
 */
export function vinScreenSections(
  locale: Locale,
  direction: TextDirection,
  media: Partial<Record<VinScreenMediaKey, string>>,
): Sections {
  const copy = COPY[locale]
  return [
    {
      id: 'vin-s15a',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: copy.chapter.label,
      heading: copy.chapter.heading,
      body: prose(direction, ...copy.chapter.body.map((value) => paragraph(value, direction))),
      insight: '',
    },
    {
      id: 'vin-s15b',
      blockType: 'csFigure',
      layout: 'pages',
      treatment: 'screen',
      items: VIN_SCREENS.flatMap((screen, index) => {
        const first = media[firstKey(screen.slug)]
        if (!first) return []
        return [
          {
            id: `vin-g${String(index + 1).padStart(3, '0')}`,
            media: first,
            mobile: null,
            full: null,
            mobileFull: (screen.whole && media[wholeKey(screen.slug)]) || null,
            caption: copy.labels[screen.slug],
            group: copy.groups[screen.group],
          },
        ]
      }),
      annotations: [],
      caption: copy.chapter.figureCaption,
    },
  ]
}

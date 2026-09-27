import type { Project } from '@/payload-types'
import { LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../media'
import { paragraph, prose, type TextDirection } from './lexical'

import ar from './rp1-arena-screens/ar.json'
import de from './rp1-arena-screens/de.json'
import en from './rp1-arena-screens/en.json'
import es from './rp1-arena-screens/es.json'
import fa from './rp1-arena-screens/fa.json'
import fr from './rp1-arena-screens/fr.json'
import ja from './rp1-arena-screens/ja.json'

/**
 * Every screen of the RP1 app, as one `pages` figure with the Screen treatment (D-051), asked for
 * by Sina on 2026-09-26. The Figma `App` page of the Game-Design file (`11909:187`) holds 189 phone
 * frames in sixteen sections; 29 repeat others, so the index shows 160, in fourteen flows — the
 * three animation sections are one flow here, and the file's "1st Enter" is Sign-in.
 *
 * Left out as repeats: 21 Team Battle frames that are the duel's (20 pixel for pixel, one with
 * 15 pt more padding), so Team Battle keeps the five that are its own; a second "Show your QR
 * code", "Share Link variant" and "Not Yet Played"; two animation keyframes that repeat the profile
 * at rest and the 53; and the three loose frames beside the Profile section.
 *
 * `assets/figma-2026-09-26/raw/` holds the 2× exports and `manifest.json` (each frame's node, and
 * why a frame is left out). `gallery/first/` has each screen's first 852 pt as WebP and
 * `gallery/whole/` each frame that runs longer, as JPEG. Placeholder data is masked before upload:
 * the sample account's email is pixelated on three sign-in screens, and a sample QR code, which
 * decodes to a stranger's payment details, on two. `raw/` is never uploaded. Copy is one JSON file
 * per locale in `rp1-arena-screens/`; English is the source and the other six are machine-drafted.
 */

export const RP1_SCREEN_GROUPS = [
  'sign-in',
  'games',
  'solo',
  'duel',
  'team',
  'tournaments',
  'spotlight',
  'legend',
  'chat',
  'notifications',
  'wallet',
  'profile',
  'settings',
  'animations',
] as const
type ScreenGroup = (typeof RP1_SCREEN_GROUPS)[number]

type Mask = 'qr' | 'email'

interface Rp1Screen {
  slug: string
  group: ScreenGroup
  /** The Figma frame, for re-exports. */
  node: string
  /** Longer than one screen (852 pt): the whole frame is a second upload, opened on click. */
  whole?: true
  /** What the upload pixelates: a sample QR code, or the sample account's email. */
  mask?: Mask
}

/** In the order a player meets them, flow by flow; each flow in the order of its canvas. */
export const RP1_SCREENS: readonly Rp1Screen[] = [
  { slug: 'sign-in-start', group: 'sign-in', node: '22074:28316' },
  { slug: 'sign-in-email', group: 'sign-in', node: '22487:9650', mask: 'email' },
  { slug: 'sign-in-code', group: 'sign-in', node: '22464:12907', mask: 'email' },
  { slug: 'sign-in-code-wrong', group: 'sign-in', node: '23257:9579', mask: 'email' },
  { slug: 'sign-in-welcome', group: 'sign-in', node: '22074:28368' },
  { slug: 'games-discover', group: 'games', node: '24930:1198', whole: true },
  { slug: 'games-challengers', group: 'games', node: '25518:6626', whole: true },
  { slug: 'games-filter', group: 'games', node: '25544:22676' },
  { slug: 'games-join-duel', group: 'games', node: '25549:32830' },
  { slug: 'games-join-team', group: 'games', node: '25552:33295' },
  { slug: 'games-in-play', group: 'games', node: '25518:7435', whole: true },
  { slug: 'games-challenged-friend', group: 'games', node: '25458:7722' },
  { slug: 'games-challenged-link', group: 'games', node: '25501:9688' },
  { slug: 'games-team-invite', group: 'games', node: '25458:9224' },
  { slug: 'games-team-challenge', group: 'games', node: '25458:10298' },
  { slug: 'solo-not-played', group: 'solo', node: '25619:8698' },
  { slug: 'solo-played', group: 'solo', node: '25580:49764' },
  { slug: 'solo-guide', group: 'solo', node: '25580:50349' },
  { slug: 'solo-ticket', group: 'solo', node: '25580:50061' },
  { slug: 'solo-watch-ad', group: 'solo', node: '25583:8698' },
  { slug: 'solo-deposit', group: 'solo', node: '25583:8785' },
  { slug: 'solo-paid-beaten', group: 'solo', node: '25583:8406' },
  { slug: 'solo-paid-missed', group: 'solo', node: '25583:8588' },
  { slug: 'solo-free-beaten', group: 'solo', node: '25623:8793' },
  { slug: 'solo-free-missed', group: 'solo', node: '25623:8826' },
  { slug: 'duel-opponent', group: 'duel', node: '25432:7101' },
  { slug: 'duel-guide', group: 'duel', node: '25434:10841' },
  { slug: 'duel-friend-player', group: 'duel', node: '25433:10201' },
  { slug: 'duel-friend-stake', group: 'duel', node: '25433:10052' },
  { slug: 'duel-friend-short', group: 'duel', node: '25507:12970' },
  { slug: 'duel-friend-time-1', group: 'duel', node: '25432:7989' },
  { slug: 'duel-friend-time-2', group: 'duel', node: '25490:5665', whole: true },
  { slug: 'duel-friend-time-3', group: 'duel', node: '25490:6038', whole: true },
  { slug: 'duel-friend-race-1', group: 'duel', node: '25490:5855' },
  { slug: 'duel-friend-race-2', group: 'duel', node: '25432:9072', whole: true },
  { slug: 'duel-friend-race-3', group: 'duel', node: '25490:6400', whole: true },
  { slug: 'duel-random-stake', group: 'duel', node: '25490:7429' },
  { slug: 'duel-random-win', group: 'duel', node: '25493:6208' },
  { slug: 'duel-random-time-1', group: 'duel', node: '25490:7621' },
  { slug: 'duel-random-time-2', group: 'duel', node: '25493:6331' },
  { slug: 'duel-random-race-1', group: 'duel', node: '25493:5726' },
  { slug: 'duel-random-race-2', group: 'duel', node: '25493:5829' },
  { slug: 'duel-sent', group: 'duel', node: '25490:7374' },
  { slug: 'duel-open', group: 'duel', node: '25500:8509' },
  { slug: 'duel-cancel', group: 'duel', node: '25500:8619' },
  { slug: 'duel-link', group: 'duel', node: '25490:7378' },
  { slug: 'duel-find', group: 'duel', node: '25500:8737' },
  { slug: 'duel-link-cancel', group: 'duel', node: '25500:8847' },
  { slug: 'duel-searching', group: 'duel', node: '25496:7425' },
  { slug: 'duel-search-cancel', group: 'duel', node: '25500:8957' },
  { slug: 'duel-link-expired', group: 'duel', node: '25496:7463' },
  { slug: 'duel-won', group: 'duel', node: '25947:15266' },
  { slug: 'duel-lost', group: 'duel', node: '25947:15335' },
  { slug: 'team-start', group: 'team', node: '25518:8336' },
  { slug: 'team-guide', group: 'team', node: '25518:9199' },
  { slug: 'team-players', group: 'team', node: '25518:9138' },
  { slug: 'team-stake', group: 'team', node: '25518:8265' },
  { slug: 'team-short', group: 'team', node: '25518:9063' },
  { slug: 'tour-open', group: 'tournaments', node: '25595:13176', whole: true },
  { slug: 'tour-full', group: 'tournaments', node: '25595:13584', whole: true },
  { slug: 'tour-open-joined', group: 'tournaments', node: '25583:10107', whole: true },
  { slug: 'tour-full-joined', group: 'tournaments', node: '25595:12922', whole: true },
  { slug: 'tour-guide', group: 'tournaments', node: '25583:11429' },
  { slug: 'tour-ticket', group: 'tournaments', node: '25583:10296' },
  { slug: 'tour-watch-ad', group: 'tournaments', node: '25627:9526' },
  { slug: 'tour-deposit', group: 'tournaments', node: '25627:9728' },
  { slug: 'tour-game-over', group: 'tournaments', node: '25627:10022' },
  { slug: 'tour-ticket-over', group: 'tournaments', node: '25627:10129' },
  { slug: 'tour-ended', group: 'tournaments', node: '25627:10175' },
  { slug: 'tour-on-top', group: 'tournaments', node: '25627:10078' },
  { slug: 'tour-results', group: 'tournaments', node: '25935:9936', whole: true },
  { slug: 'spot-not-played', group: 'spotlight', node: '25371:4558', whole: true },
  { slug: 'spot-played', group: 'spotlight', node: '25376:11773', whole: true },
  { slug: 'spot-played-bundle', group: 'spotlight', node: '25641:34684', whole: true },
  { slug: 'spot-finished', group: 'spotlight', node: '25376:12074', whole: true },
  { slug: 'spot-guide', group: 'spotlight', node: '25391:2752' },
  { slug: 'spot-ticket', group: 'spotlight', node: '25382:2372' },
  { slug: 'spot-watch-ad', group: 'spotlight', node: '25382:2675' },
  { slug: 'spot-deposit', group: 'spotlight', node: '25382:4752' },
  { slug: 'spot-playing', group: 'spotlight', node: '25382:5164' },
  { slug: 'spot-game-over', group: 'spotlight', node: '25382:5555' },
  { slug: 'spot-ticket-over', group: 'spotlight', node: '25382:5681' },
  { slug: 'spot-ended', group: 'spotlight', node: '25382:5776' },
  { slug: 'spot-on-top', group: 'spotlight', node: '25382:5861' },
  { slug: 'legend-not-joined', group: 'legend', node: '25371:5542', whole: true },
  { slug: 'legend-joined', group: 'legend', node: '25397:6363', whole: true },
  { slug: 'legend-played', group: 'legend', node: '25397:6626', whole: true },
  { slug: 'legend-finished', group: 'legend', node: '25397:6938', whole: true },
  { slug: 'legend-ranking', group: 'legend', node: '25371:5814', whole: true },
  { slug: 'legend-guide', group: 'legend', node: '25394:3489' },
  { slug: 'legend-ticket', group: 'legend', node: '25395:4817' },
  { slug: 'legend-watch-ad', group: 'legend', node: '25395:5195' },
  { slug: 'legend-deposit', group: 'legend', node: '25395:5529' },
  { slug: 'legend-playing', group: 'legend', node: '25395:5959' },
  { slug: 'legend-game-over', group: 'legend', node: '25395:5971' },
  { slug: 'legend-session-over', group: 'legend', node: '25395:6058' },
  { slug: 'legend-ended', group: 'legend', node: '25395:6104' },
  { slug: 'legend-on-top', group: 'legend', node: '25395:6017' },
  { slug: 'chat-list', group: 'chat', node: '24923:2961', whole: true },
  { slug: 'chat-thread', group: 'chat', node: '24923:3334', whole: true },
  { slug: 'notif-games', group: 'notifications', node: '24923:5486', whole: true },
  { slug: 'notif-friends', group: 'notifications', node: '24923:6372', whole: true },
  { slug: 'notif-payments', group: 'notifications', node: '25403:7520', whole: true },
  { slug: 'notif-empty', group: 'notifications', node: '24923:6683', whole: true },
  { slug: 'wallet-balance', group: 'wallet', node: '24960:3967', whole: true },
  { slug: 'wallet-earnings', group: 'wallet', node: '25003:6686', whole: true },
  { slug: 'wallet-transactions', group: 'wallet', node: '24961:4131', whole: true },
  { slug: 'wallet-ads', group: 'wallet', node: '24991:5970' },
  { slug: 'wallet-referral', group: 'wallet', node: '24993:6113' },
  { slug: 'wallet-battle', group: 'wallet', node: '24993:6272' },
  { slug: 'wallet-deposit', group: 'wallet', node: '25018:5061', mask: 'qr' },
  { slug: 'wallet-deposit-done', group: 'wallet', node: '25018:4931' },
  { slug: 'wallet-withdraw', group: 'wallet', node: '24993:6927' },
  { slug: 'wallet-withdraw-address', group: 'wallet', node: '24993:7118' },
  { slug: 'wallet-withdraw-done', group: 'wallet', node: '25003:6371' },
  { slug: 'wallet-save', group: 'wallet', node: '25025:5791' },
  { slug: 'wallet-saved', group: 'wallet', node: '25025:5480' },
  { slug: 'wallet-bundles', group: 'wallet', node: '25633:24888', whole: true },
  { slug: 'wallet-bundles-bought', group: 'wallet', node: '25637:33605', whole: true },
  { slug: 'wallet-bundle', group: 'wallet', node: '25633:25945', whole: true },
  { slug: 'wallet-bundle-bought', group: 'wallet', node: '25637:33953', whole: true },
  { slug: 'wallet-bundle-buy', group: 'wallet', node: '25634:32242' },
  { slug: 'profile-achievements', group: 'profile', node: '24917:232', whole: true },
  { slug: 'profile-friends', group: 'profile', node: '25409:2914', whole: true },
  { slug: 'profile-roadmap', group: 'profile', node: '25409:2969', whole: true },
  { slug: 'profile-add', group: 'profile', node: '25888:9105' },
  { slug: 'profile-username', group: 'profile', node: '25888:9927' },
  { slug: 'profile-nearby', group: 'profile', node: '25888:10643' },
  { slug: 'profile-nearby-map', group: 'profile', node: '25918:9512' },
  { slug: 'profile-my-code', group: 'profile', node: '25888:11817', mask: 'qr' },
  { slug: 'profile-scan', group: 'profile', node: '25889:12616' },
  { slug: 'profile-player', group: 'profile', node: '25411:4166', whole: true },
  { slug: 'profile-player-following', group: 'profile', node: '25411:4193', whole: true },
  { slug: 'profile-player-requested', group: 'profile', node: '25975:10442', whole: true },
  { slug: 'settings-main', group: 'settings', node: '25409:3026' },
  { slug: 'settings-profile', group: 'settings', node: '25421:3506' },
  { slug: 'settings-notifications', group: 'settings', node: '25421:3716' },
  { slug: 'settings-privacy', group: 'settings', node: '25422:4040' },
  { slug: 'settings-support', group: 'settings', node: '25422:4112' },
  { slug: 'settings-history', group: 'settings', node: '25939:11030' },
  { slug: 'settings-danger', group: 'settings', node: '25422:4184' },
  { slug: 'settings-log-out', group: 'settings', node: '25427:3476' },
  { slug: 'settings-delete', group: 'settings', node: '25427:3525' },
  { slug: 'anim-entry-card', group: 'animations', node: '25416:5864' },
  { slug: 'anim-entry-level', group: 'animations', node: '25416:6341' },
  { slug: 'anim-rest', group: 'animations', node: '25433:9891' },
  { slug: 'anim-level-52', group: 'animations', node: '25433:9732' },
  { slug: 'anim-level-53', group: 'animations', node: '25434:11318' },
  { slug: 'anim-level-confetti', group: 'animations', node: '25434:11481' },
  { slug: 'anim-level-avatar', group: 'animations', node: '25435:11872' },
  { slug: 'anim-hello', group: 'animations', node: '25438:12890' },
  { slug: 'anim-legend', group: 'animations', node: '25438:13190' },
  { slug: 'anim-birthday', group: 'animations', node: '25441:13358' },
  { slug: 'anim-surprise', group: 'animations', node: '25441:13683' },
  { slug: 'anim-duel-winner', group: 'animations', node: '25441:13843' },
  { slug: 'anim-anniversary-fireworks', group: 'animations', node: '25441:14006' },
  { slug: 'anim-anniversary-bunting', group: 'animations', node: '25441:14173' },
  { slug: 'anim-legend-party', group: 'animations', node: '25441:14530' },
  { slug: 'anim-anniversary-mask', group: 'animations', node: '25441:14339' },
  { slug: 'anim-anniversary-hat', group: 'animations', node: '25458:6289' },
]

interface ScreensCopy {
  groups: Record<ScreenGroup, string>
  labels: Record<string, string>
  chapter: { label: string; heading: string; body: string[]; figureCaption: string }
  alt: { first: string; whole: string }
  /** Appended to the alt of a masked screen. */
  masked: Record<Mask, string>
}

export const RP1_SCREEN_COPY: Record<Locale, ScreensCopy> = { en, fa, ar, de, es, fr, ja }

// A missing name ships an empty tab or caption on a `fallback: false` site — fail at import instead.
for (const locale of LOCALES) {
  const copy = RP1_SCREEN_COPY[locale]
  const missing = [
    ...RP1_SCREEN_GROUPS.filter((group) => !copy.groups[group]?.trim()),
    ...RP1_SCREENS.filter((screen) => !copy.labels[screen.slug]?.trim()).map(
      (screen) => screen.slug,
    ),
    ...(['label', 'heading', 'figureCaption'] as const).filter((key) => !copy.chapter[key]?.trim()),
  ]
  if (missing.length || copy.chapter.body.length !== 2) {
    throw new Error(
      `rp1-arena screens: ${locale} copy is missing ${missing.join(', ') || 'a paragraph'}`,
    )
  }
}

export type Rp1ScreenMediaKey = `screen:${string}`
const firstKey = (slug: string): Rp1ScreenMediaKey => `screen:${slug}`
const wholeKey = (slug: string): Rp1ScreenMediaKey => `screen:${slug}:whole`

const alt = (screen: Rp1Screen, variant: 'first' | 'whole') =>
  Object.fromEntries(
    LOCALES.map((locale) => {
      const copy = RP1_SCREEN_COPY[locale]
      const text = copy.alt[variant]
        .replace('{group}', copy.groups[screen.group])
        .replace('{label}', copy.labels[screen.slug]!)
      return [locale, screen.mask ? `${text}${copy.masked[screen.mask]}` : text]
    }),
  )

export const RP1_SCREEN_MEDIA: Record<Rp1ScreenMediaKey, MediaSpec> = Object.fromEntries(
  RP1_SCREENS.flatMap((screen) => [
    [
      firstKey(screen.slug),
      {
        file: `gallery/first/${screen.slug}.webp`,
        name: `rp1-arena--screen-${screen.slug}.webp`,
        alt: alt(screen, 'first'),
      },
    ],
    ...(screen.whole
      ? [
          [
            wholeKey(screen.slug),
            {
              file: `gallery/whole/${screen.slug}.jpg`,
              name: `rp1-arena--screen-${screen.slug}--whole.jpg`,
              alt: alt(screen, 'whole'),
            },
          ],
        ]
      : []),
  ]),
) as Record<Rp1ScreenMediaKey, MediaSpec>

type Sections = NonNullable<Project['sections']>

/**
 * The chapter and its index, after the solution figures. Every optional leaf is written, empty if
 * need be: a localized leaf merges by row position, and these rows take the positions the outcomes
 * and lessons held.
 */
export function rp1ScreenSections(
  locale: Locale,
  direction: TextDirection,
  media: Partial<Record<Rp1ScreenMediaKey, string>>,
): Sections {
  const copy = RP1_SCREEN_COPY[locale]
  return [
    {
      id: 'rp1-s16a',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: copy.chapter.label,
      heading: copy.chapter.heading,
      body: prose(direction, ...copy.chapter.body.map((value) => paragraph(value, direction))),
      insight: '',
    },
    {
      id: 'rp1-s16b',
      blockType: 'csFigure',
      layout: 'pages',
      treatment: 'screen',
      items: RP1_SCREENS.flatMap((screen, index) => {
        const first = media[firstKey(screen.slug)]
        if (!first) return []
        return [
          {
            id: `rp1-g${String(index + 1).padStart(3, '0')}`,
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

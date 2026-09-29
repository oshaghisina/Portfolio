import type { Project } from '@/payload-types'
import { dirFor, LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../../media'
import { archiveIdentity } from '../archive'
import { bullets, paragraph, prose } from '../lexical'
import ar from './copy/narian-summer-passport.ar.json'
import de from './copy/narian-summer-passport.de.json'
import en from './copy/narian-summer-passport.en.json'
import es from './copy/narian-summer-passport.es.json'
import fa from './copy/narian-summer-passport.fa.json'
import fr from './copy/narian-summer-passport.fr.json'
import ja from './copy/narian-summer-passport.ja.json'

/**
 * Narian Summer Passport (`/work/narian-summer-passport`, PRJ-11) — a summer retail campaign for an
 * Iranian womenswear brand, designed in full in June 2026 and never launched. Every claim comes from
 * the campaign's own notes (an Obsidian vault in `~/Downloads/Projects/Marketing/Narian/`), recorded in
 * `Docs/Experience/Projects/narian-summer-passport/README.md`. Sina, 2026-09-28: publish it from those
 * files and their `Assets/`, with the real store photos as before/after pairs and the persona portraits.
 *
 * Publication gates (held here and in `tests/int/case-study-seeds.int.spec.ts`):
 * - Only `study/` is uploaded. Concept renders are AI images from Sina's briefs and are captioned so;
 *   the ones made from the early brief still show the cut 24-hour voucher, and the captions say that.
 * - Of the eleven store photos, only the storefront, the counter and the central platform, each
 *   beside the render made from it. They are Narian's store, never presented as Sina's design.
 * - Never the generated client deck (it drifted from the canon: an invented budget and branch count,
 *   a discount wheel, five winners) or the off-canon digital-passport mock-up (city stamps).
 * - No outcome, KPI or budget figure: the campaign never ran. No one at Narian is named.
 * - The prototype is captured with the clock set to launch morning (20 Tir 1405), so its countdown
 *   shows the campaign's 31 days; its sign-up number is a placeholder.
 *
 * The plan below holds every shared field (layouts, treatments, media, codes, values); each locale's
 * JSON holds every localized leaf, and `assertSameShape` fails at import when a locale drifts from
 * English. Optional localized leaves are always written (empty when unused): the update path merges
 * localized leaves by row position, so a leaf left out keeps old text.
 */
export const NSP_SLUG = 'narian-summer-passport'
export const NSP_ASSETS = 'Docs/Experience/Projects/narian-summer-passport/assets'

const ARCHIVE = archiveIdentity(NSP_SLUG)
const N = 'narian-summer-passport--'

const MEDIA_FILES = {
  // The prototype's first screen on a phone doubles as the archive cover (the card's lead).
  v2Mobile: { file: 'study/pages/mobile/v2.webp', name: ARCHIVE.row.cover.name },

  storefront: { file: 'study/journey/storefront.webp', name: `${N}storefront.webp` },
  storefrontFirst: { file: 'study/journey/storefront-first.webp', name: `${N}storefront-first.webp` },
  checkIn: { file: 'study/journey/check-in.webp', name: `${N}check-in.webp` },
  handoff: { file: 'study/journey/handoff.webp', name: `${N}handoff.webp` },
  gate: { file: 'study/journey/gate.webp', name: `${N}gate.webp` },
  reward: { file: 'study/journey/reward-voucher.webp', name: `${N}reward-voucher.webp` },
  terminal: { file: 'study/journey/terminal.webp', name: `${N}terminal.webp` },
  finale: { file: 'study/journey/finale.webp', name: `${N}finale.webp` },
  kit: { file: 'study/journey/kit.webp', name: `${N}kit.webp` },
  branchFlagship: { file: 'study/journey/branch-flagship.webp', name: `${N}branch-flagship.webp` },
  branchInterior: { file: 'study/journey/branch-interior.webp', name: `${N}branch-interior.webp` },
  branchOpening: { file: 'study/journey/branch-opening.webp', name: `${N}branch-opening.webp` },

  // Narian's own store, photographed before the campaign (re-encoded without metadata).
  photoFront: { file: 'study/store/storefront.jpg', name: `${N}photo-storefront.jpg` },
  photoCounter: { file: 'study/store/counter.jpg', name: `${N}photo-counter.jpg` },
  photoPlatform: { file: 'study/store/platform.jpg', name: `${N}photo-platform.jpg` },

  roz: { file: 'study/personas/roz.webp', name: `${N}persona-roz.webp` },
  nara: { file: 'study/personas/nara.webp', name: `${N}persona-nara.webp` },
  sara: { file: 'study/personas/sara.webp', name: `${N}persona-sara.webp` },

  // The script's opaque PNGs, multiplied onto the passport's cream paper (#F4ECE0).
  stampOcean: { file: 'study/stamps/ocean.webp', name: `${N}stamp-ocean.webp` },
  stampDesert: { file: 'study/stamps/desert.webp', name: `${N}stamp-desert.webp` },
  stampCoast: { file: 'study/stamps/coast.webp', name: `${N}stamp-coast.webp` },
  stampSunshine: { file: 'study/stamps/sunshine.webp', name: `${N}stamp-sunshine.webp` },
  stampPalm: { file: 'study/stamps/palm.webp', name: `${N}stamp-palm.webp` },
  stampSunset: { file: 'study/stamps/sunset.webp', name: `${N}stamp-sunset.webp` },
  stampLuckyDay: { file: 'study/stamps/luckyday.webp', name: `${N}stamp-lucky-day.webp` },
  stampUpgrade: { file: 'study/stamps/upgrade.webp', name: `${N}stamp-upgrade.webp` },
  stampBoarding: { file: 'study/stamps/boarding.webp', name: `${N}stamp-boarding.webp` },

  // Both generations of the traveller's page. First screens are WebP; whole pages are JPEG, since
  // a phone page passes WebP's 16,383 px limit.
  v1Desktop: { file: 'study/pages/desktop/v1.webp', name: `${N}page-v1-desktop.webp` },
  v1Mobile: { file: 'study/pages/mobile/v1.webp', name: `${N}page-v1-mobile.webp` },
  v1DesktopFull: { file: 'study/pages/desktop-full/v1.jpg', name: `${N}page-v1-desktop-full.jpg` },
  v1MobileFull: { file: 'study/pages/mobile-full/v1.jpg', name: `${N}page-v1-mobile-full.jpg` },
  v2Desktop: { file: 'study/pages/desktop/v2.webp', name: `${N}page-v2-desktop.webp` },
  v2DesktopFull: { file: 'study/pages/desktop-full/v2.jpg', name: `${N}page-v2-desktop-full.jpg` },
  v2MobileFull: { file: 'study/pages/mobile-full/v2.jpg', name: `${N}page-v2-mobile-full.jpg` },

  v2Classes: { file: 'study/phone/v2-classes.webp', name: `${N}phone-classes.webp` },
  v2StampOpen: { file: 'study/phone/v2-stamp-open.webp', name: `${N}phone-stamp-open.webp` },
  v2Prize: { file: 'study/phone/v2-prize.webp', name: `${N}phone-prize.webp` },
  v2SignupDone: { file: 'study/phone/v2-signup-done.webp', name: `${N}phone-passport-created.webp` },
  v2Rules: { file: 'study/phone/v2-rules.webp', name: `${N}phone-draw-rules.webp` },

  v1PrizeCrop: { file: 'study/crops/v1-prize.webp', name: `${N}page-v1-prizes.webp` },
  v2PrizeCrop: { file: 'study/crops/v2-prize.webp', name: `${N}page-v2-prize.webp` },
} as const

export type NspMediaKey = keyof typeof MEDIA_FILES
type NspMediaIds = Partial<Record<NspMediaKey, string>>
type Sections = NonNullable<Project['sections']>

type ChapterKey =
  | 'context'
  | 'problem'
  | 'research'
  | 'approach'
  | 'mechanic'
  | 'cut'
  | 'collection'
  | 'canon'
  | 'kit'
  | 'online'
  | 'result'
type FigureKey =
  | 'personas'
  | 'counter'
  | 'storefront'
  | 'journeyEnds'
  | 'gate'
  | 'prize'
  | 'stamps'
  | 'kit'
  | 'branches'
  | 'phone'
  | 'pages'
type StepsKey = 'storeMap' | 'journey' | 'classes' | 'crew'
type FindingKey = 'guardrail' | 'canonRule'

interface NspChapter {
  /** Only for `custom` chapters: the kicker, e.g. "05 MECHANIC". */
  customLabel?: string
  heading: string
  body: string[]
  bullets?: string[]
  insight?: string
}

export interface NspCopy {
  statement: string
  industry: string
  team: string
  heroCaption: string
  snapshot: { problem: string; role: string; result: string }
  alt: Record<NspMediaKey, string>
  chapters: Record<ChapterKey, NspChapter>
  /** `items`: one caption per visual, in plan order. */
  figures: Record<FigureKey, { caption: string; items?: string[] }>
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

const COPY: Record<Locale, NspCopy> = { en, fa, ar, es, de, fr, ja }

/** Fails at import when a locale's copy is missing a key, or an array has a different length, than English. */
function assertSameShape(copy: Record<Locale, NspCopy>): void {
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
      throw new Error(`${NSP_SLUG}: the ${locale} copy does not have the same shape as English`)
  }
}
assertSameShape(COPY)

type NarrativeLabel = 'context' | 'problem' | 'research' | 'approach' | 'outcome' | 'custom'
type FigureItem = { media: NspMediaKey; mobile?: NspMediaKey; full?: NspMediaKey; mobileFull?: NspMediaKey }
type Entry =
  | { type: 'narrative'; key: ChapterKey; label: NarrativeLabel }
  | {
      type: 'figure'
      key: FigureKey
      layout: 'split' | 'sequence' | 'compare' | 'gallery' | 'pages'
      treatment: 'screen' | 'plain'
      items: FigureItem[]
    }
  | { type: 'process'; key: StepsKey; kind: 'process' | 'map'; codes: string[] }
  | { type: 'finding'; key: FindingKey }
  | { type: 'decisions'; media: Partial<Record<number, NspMediaKey>> }
  | { type: 'ownership' }
  | { type: 'outcomes'; values: string[] }
  | { type: 'lessons' }

const one = (media: NspMediaKey): FigureItem => ({ media })

const PLAN: Entry[] = [
  { type: 'narrative', key: 'context', label: 'context' },
  { type: 'narrative', key: 'problem', label: 'problem' },
  { type: 'finding', key: 'guardrail' },

  { type: 'narrative', key: 'research', label: 'research' },
  { type: 'figure', key: 'personas', layout: 'gallery', treatment: 'plain', items: [one('roz'), one('nara'), one('sara')] },
  { type: 'process', key: 'storeMap', kind: 'map', codes: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'] },
  { type: 'figure', key: 'counter', layout: 'compare', treatment: 'plain', items: [one('photoCounter'), one('checkIn')] },

  { type: 'narrative', key: 'approach', label: 'approach' },
  {
    type: 'figure',
    key: 'storefront',
    layout: 'sequence',
    treatment: 'plain',
    items: [one('photoFront'), one('storefrontFirst'), one('storefront')],
  },
  { type: 'process', key: 'journey', kind: 'process', codes: ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8'] },
  { type: 'figure', key: 'journeyEnds', layout: 'split', treatment: 'plain', items: [one('terminal'), one('finale')] },

  { type: 'narrative', key: 'mechanic', label: 'custom' },
  { type: 'process', key: 'classes', kind: 'process', codes: ['EC', 'BU', 'FC'] },
  { type: 'figure', key: 'gate', layout: 'compare', treatment: 'plain', items: [one('photoPlatform'), one('gate')] },

  { type: 'narrative', key: 'cut', label: 'custom' },
  { type: 'figure', key: 'prize', layout: 'compare', treatment: 'plain', items: [one('v1PrizeCrop'), one('v2PrizeCrop')] },

  { type: 'narrative', key: 'collection', label: 'custom' },
  {
    type: 'figure',
    key: 'stamps',
    layout: 'gallery',
    treatment: 'plain',
    items: [
      one('stampOcean'),
      one('stampDesert'),
      one('stampCoast'),
      one('stampSunshine'),
      one('stampPalm'),
      one('stampSunset'),
      one('stampLuckyDay'),
      one('stampUpgrade'),
      one('stampBoarding'),
    ],
  },

  { type: 'narrative', key: 'canon', label: 'custom' },
  { type: 'finding', key: 'canonRule' },
  { type: 'process', key: 'crew', kind: 'process', codes: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'] },

  { type: 'narrative', key: 'kit', label: 'custom' },
  { type: 'figure', key: 'kit', layout: 'split', treatment: 'plain', items: [one('handoff'), one('kit')] },
  {
    type: 'figure',
    key: 'branches',
    layout: 'gallery',
    treatment: 'plain',
    items: [one('branchFlagship'), one('branchInterior'), one('branchOpening')],
  },

  { type: 'narrative', key: 'online', label: 'custom' },
  {
    type: 'figure',
    key: 'phone',
    layout: 'sequence',
    treatment: 'screen',
    items: [one('v2Classes'), one('v2StampOpen'), one('v2Prize'), one('v2SignupDone')],
  },
  {
    type: 'figure',
    key: 'pages',
    layout: 'pages',
    treatment: 'plain',
    items: [
      { media: 'v1Desktop', mobile: 'v1Mobile', full: 'v1DesktopFull', mobileFull: 'v1MobileFull' },
      { media: 'v2Desktop', mobile: 'v2Mobile', full: 'v2DesktopFull', mobileFull: 'v2MobileFull' },
    ],
  },

  { type: 'narrative', key: 'result', label: 'outcome' },
  { type: 'decisions', media: { 0: 'reward', 3: 'v2Rules' } },
  { type: 'ownership' },
  // Delivered outputs only: nothing ran, so nothing was measured.
  { type: 'outcomes', values: ['3', '9', '7', '0'] },
  { type: 'lessons' },
]

export const NSP_MEDIA = Object.fromEntries(
  (Object.keys(MEDIA_FILES) as NspMediaKey[]).map((key) => [
    key,
    {
      ...MEDIA_FILES[key],
      alt: Object.fromEntries(LOCALES.map((locale) => [locale, COPY[locale].alt[key]])),
    },
  ]),
) as Record<NspMediaKey, MediaSpec>

const pad = (n: number) => String(n).padStart(2, '0')

export function nspSections(locale: Locale, media: NspMediaIds): Sections {
  const c = COPY[locale]
  const dir = dirFor(locale)
  const need = <T>(value: T | undefined, what: string): T => {
    if (value === undefined) throw new Error(`${NSP_SLUG} (${locale}): missing ${what}`)
    return value
  }

  return PLAN.map((entry, index) => {
    const n = pad(index + 1)
    const id = `nsp-s${n}`
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
                    id: `nsp-f${n}-${i + 1}`,
                    media: media[item.media]!,
                    ...(pages
                      ? {
                          mobile: (item.mobile && media[item.mobile]) || null,
                          full: (item.full && media[item.full]) || null,
                          mobileFull: (item.mobileFull && media[item.mobileFull]) || null,
                        }
                      : {}),
                    caption: fig.items?.[i] ?? '',
                    group: '',
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
            id: `nsp-p${n}-${i + 1}`,
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
              id: `nsp-d${pad(i + 1)}`,
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
            id: `nsp-o${pad(i + 1)}`,
            kind: 'delivered' as const,
            value: need(entry.values[i], `outcome value ${i}`),
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
            id: `nsp-l${pad(i + 1)}`,
            title: lesson.title,
            body: lesson.body,
          })),
        }
    }
  }) as Sections
}

const HERO: NspMediaKey[] = ['storefront']

export function nspLocalizedFields(locale: Locale, media: NspMediaIds) {
  const c = COPY[locale]
  const identity = ARCHIVE.text(locale)
  return {
    ...identity,
    statement: c.statement,
    industry: c.industry,
    team: c.team,
    hero: {
      items: HERO.filter((key) => media[key]).map((key, index) => ({
        id: `nsp-h${pad(index + 1)}`,
        media: media[key]!,
      })),
      caption: c.heroCaption,
    },
    snapshot: c.snapshot,
    sections: nspSections(locale, media),
    meta: {
      title: identity.title,
      description: identity.summary,
      // The landscape storefront render shares better than the phone capture on the card.
      ...(media.storefront ? { image: media.storefront } : {}),
    },
  }
}

// No `period`: the archive row keeps its June 2026 start; the prototype and deck exports are dated
// September, and whether any work happened then is still open (README Q2).
export const NSP_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'concept',
  tools: ['Obsidian', 'Claude', 'Node.js'],
}

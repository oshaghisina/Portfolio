import type { Project } from '@/payload-types'
import { dirFor, LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../media'
import { archiveIdentity } from './archive'
import { paragraph, prose } from './lexical'

/**
 * Marqevon (`/work/marqevon`) — a seven-locale corporate site for a physical petroleum trading
 * principal, deployed but not launched. Every sentence comes from
 * `Docs/Experience/Projects/marqevon/README.md`, corrected 2026-09-24 against the source repository.
 *
 * Publication gates (held here and in `tests/int/case-study-seeds.int.spec.ts`):
 * - Product name only: no real identity, registration, licence or regulatory position, and no
 *   competitor names.
 * - No market prices or price-feed names: every home-page figure is cropped above the market
 *   snapshot, and the price-feed integration is not described.
 * - No server address, domain or launch claim; the site is presented as not launched.
 * - Client feedback is paraphrased, never quoted.
 * - Evidence is crops of the 2026-09-22 captures, type only: no stock photography, no empty frames.
 *
 * Copy lives in one `Copy` object per locale; the sections builder is a pure template over it, so
 * a missing string or a wrong tuple length is a type error. Shared fields (codes, values, media,
 * layout, treatment) live in the builder and are identical in every locale.
 */
export const MQV_SLUG = 'marqevon'
export const MQV_ASSETS = 'Docs/Experience/Projects/marqevon/assets'
export const MQV_LOCALES = LOCALES

const ARCHIVE = archiveIdentity(MQV_SLUG)

const MEDIA_FILES = {
  cover: { file: 'crops/cover.png', name: ARCHIVE.row.cover.name },
  home: { file: 'crops/hero.png', name: 'marqevon--desktop-home.png' },
  faq: { file: 'crops/faq.png', name: 'marqevon--desktop-faq.png' },
  procedure: { file: 'crops/procedure.png', name: 'marqevon--desktop-procedure.png' },
  manifest: { file: 'crops/manifest.png', name: 'marqevon--desktop-governance-manifest.png' },
  products: { file: 'crops/products.png', name: 'marqevon--desktop-products.png' },
  trackRecord: { file: 'crops/track.png', name: 'marqevon--desktop-track-record.png' },
  team: { file: 'crops/team.png', name: 'marqevon--desktop-team.png' },
  homeFa: { file: 'crops/home-fa.png', name: 'marqevon--desktop-home-fa.png' },
  homeAr: { file: 'crops/home-ar.png', name: 'marqevon--desktop-home-ar.png' },
} as const

export type MqvMediaKey = keyof typeof MEDIA_FILES
type MqvMediaIds = Partial<Record<MqvMediaKey, string>>
type Sections = NonNullable<Project['sections']>

type Two<T = string> = [T, T]
type Three<T = string> = [T, T, T]
type Four<T = string> = [T, T, T, T]
type Five<T = string> = [T, T, T, T, T]
type Six<T = string> = [T, T, T, T, T, T]

export interface MqvCopy {
  statement: string
  industry: string
  team: string
  heroCaption: string
  snapshot: { problem: string; role: string; result: string }
  alt: Record<MqvMediaKey, string>
  context: { heading: string; body: Two }
  problem: { heading: string; body: Two }
  question: { text: string; attribution: string; method: string }
  research: { heading: string; body: Two; figureCaption: string }
  approach: {
    heading: string
    body: Two
    insight: string
    processHeading: string
    steps: Four<{ label: string; note: string }>
    figureCaption: string
  }
  solution: {
    heading: string
    body: Three
    annotations: Four
    manifestCaption: string
    figureItems: Two
    figureCaption: string
  }
  decisions: {
    heading: string
    lede: string
    items: Five<{ title: string; why: string; alternatives: string; tradeoff: string }>
    teamEvidence: string
  }
  locales: { label: string; heading: string; body: Two; figureItems: Two; figureCaption: string }
  outcomes: {
    heading: string
    intro: string
    measured: Two<{ label: string; context: string; source: string }>
    delivered: Two<{ label: string; context: string }>
    shipped: Six
  }
  lessons: { heading: string; items: Four<{ title: string; body: string }> }
}

const EN: MqvCopy = {
  statement:
    'A seven-locale site for a petroleum trading principal, built to answer one question in the first screen: is this firm real and checkable?',
  industry: 'Energy · physical commodity trading',
  team: 'Sole designer and developer',
  heroCaption:
    'The English home page: the product scope in one sentence, and the legal name still marked to be supplied.',
  snapshot: {
    problem:
      'Fraudulent brokers share a dialect, and a real firm that echoes it reads as one of them.',
    role: 'Designer and builder: benchmark, information architecture, design system, seven-locale content model, build and CI guards.',
    result:
      'Deployed but not launched: seven locales in exact key parity and two CI guards, with identity facts still placeholders.',
  },
  alt: {
    cover: ARCHIVE.row.cover.alt,
    home: 'Marqevon on desktop — the English home page, “We source, ship, finance, and deliver specified petroleum products”, over a map of shipping lanes',
    faq: 'Marqevon on desktop — the FAQ list, closing on a “What we don’t do” group about leased bank instruments and below-market discounts',
    procedure:
      'Marqevon on desktop — seven numbered steps shared by every delivery mode, from qualification to reconciliation',
    manifest:
      'Marqevon on desktop — the governance manifest, a monospace table of identity facts with registry and LEI chips and values still to be supplied',
    products:
      'Marqevon on desktop — three products listed by specification: EN 590 diesel, Jet A-1 and naphtha',
    trackRecord:
      'Marqevon on desktop — the rule for publishing a track record: only after commercial and legal validation, without counterparty names',
    team: 'Marqevon on desktop — a note in place of a team: named people are published only after business and legal validation',
    homeFa: 'Marqevon on desktop — the Persian home page, mirrored right to left with the navigation reversed',
    homeAr: 'Marqevon on desktop — the Arabic home page, mirrored right to left',
  },
  context: {
    heading: 'A principal, not a broker',
    body: [
      'Marqevon is a physical petroleum trading principal: it buys from producers and refiners and delivers to refiners, distributors, airlines, utilities and industrial users. Its site speaks to counterparties first, then banks and trade-finance partners, then candidates, then press and regulators.',
      'The work was spec-driven from the start. A 46 KB specification fixed the information architecture, the design system and all 15 pages before the build, and it opens by rejecting the usual brief: in this industry a website’s job is not marketing, it is projecting verifiable legitimacy.',
    ],
  },
  problem: {
    heading: 'The fraud channel has a dialect',
    body: [
      'Physical commodity trading has a fraud problem, and the fraud has a vocabulary: informal brokers announce themselves with a recognisable set of instrument acronyms and mandate titles — TTT, TTV, DTA, ATB. A legitimate mid-size principal that uses any of it reads as one of them.',
      'So the whole site had to answer one question, in seven languages, two of them written right to left.',
    ],
  },
  question: {
    text: '“Is this entity real and checkable, or is it another broker-chain front? Design so the answer is obvious within the first screen.”',
    attribution: 'The information-architecture and design specification',
    method: 'Written before the build, as the test for every page',
  },
  research: {
    heading: 'Whitespace the majors don’t market',
    body: [
      'A competitive benchmark scored the intended design against the largest trading houses and a set of mid-size peers. The gap it found was worth owning: none of the majors explicitly markets an anti-fraud position, or says what it will not do.',
      'That finding became structure rather than a slogan: a “What we don’t do” group in the FAQ, an open welcome to independent verification, and a list of terms the copy must never use.',
    ],
    figureCaption:
      'The FAQ ends on what the firm will not do: leased bank instruments, off-market set-asides, guaranteed below-market discounts.',
  },
  approach: {
    heading: 'A precision instrument for a market built on trust',
    body: [
      'The specification fixed the direction in one line — “Precision instrument for a market built on trust” — somewhere between an institutional energy desk and a verified inspection document, and named what to avoid: cream with a serif and terracotta, black with acid green, and hairlines as the whole aesthetic.',
      'The work ran benchmark, specification, build, then one round of client feedback, and the feedback was audited against the code before any of it was applied.',
    ],
    insight:
      'Of roughly 67 instructions in the client’s feedback, 33 survived the audit as cards; 8 needed a correction first, 22 were blocked on open decisions, and 4 were questions.',
    processHeading: 'Four passes, each one written down',
    steps: [
      { label: 'Benchmark', note: 'The majors and mid-size peers, scored against the intended design' },
      { label: 'Specification', note: 'Information architecture, design system and 15 pages' },
      { label: 'Build', note: 'Payload and Next.js in seven locales, with two CI guards' },
      { label: 'Feedback', note: 'A Persian feedback document turned into audited cards' },
    ],
    figureCaption:
      'One shared sequence for every delivery mode: independently verifiable evidence comes before any financial commitment.',
  },
  solution: {
    heading: 'The Ledger Reference System',
    body: [
      'The specification says where to spend: “Spend the boldness here; keep everything else quiet.” The signature has three parts — reference chips attached to credibility claims, data manifests set as hairline-ruled monospace inspection certificates, and a monospace identity bar at the foot of every page.',
      'The palette is built for it: an abyssal petroleum ground, maritime steel, document paper, brass as the one accent, a verified teal kept well away from acid green, and rust for red flags only. IBM Plex Mono carries every number, reference and chip.',
      'Underneath: Payload 3.85 and Next.js 16.2 with next-intl on MongoDB — 10 collections and 4 globals — served through nginx, with a buyer-qualification intake that scores each enquiry and flags it for the desk.',
    ],
    annotations: [
      'Each identity fact is a row with a named basis, not a sentence of reassurance.',
      'Unconfirmed values stay visibly unconfirmed: “to be supplied”.',
      'Reference chips mark what a counterparty can check: a company registry, the global LEI index.',
      'Set in IBM Plex Mono, like an inspection certificate.',
    ],
    manifestCaption:
      'The governance manifest: the firm’s identity as a checkable table, every unconfirmed value left as a placeholder.',
    figureItems: [
      'Products: three grades, each defined by its specification.',
      'Track record: published only after commercial and legal validation, never with counterparty names.',
    ],
    figureCaption: 'Claims the firm can stand behind, and rules for the ones it cannot yet.',
  },
  decisions: {
    heading: 'Five decisions about trust',
    lede: 'Most of them are about what the site refuses to say.',
    items: [
      {
        title: 'Spend the boldness in one place',
        why: 'A trading firm that looks designed reads as marketing. The signature system carries all the visual confidence and every other surface stays quiet, so the manifests are what a reader remembers.',
        alternatives: 'A bold brand across every surface',
        tradeoff: 'The site looks sparse to anyone expecting a campaign.',
      },
      {
        title: 'Make the rules fail the build',
        why: 'Two guards run in CI. One fails on the fraud channel’s vocabulary and on American spelling in the site’s copy; the other on physical-direction layout utilities, hard-coded fonts and untranslated strings. The second has already caught a real miss: an accessible label that escaped translation.',
        alternatives: 'A written style guide',
        tradeoff: 'A guard protects only the files it reads.',
      },
      {
        title: 'Escalate legal exposure instead of deciding it',
        why: 'Questions that carried legal exposure were not the designer’s to settle. They went to the client in a written memo, and one recommended wording was declined there in favour of contract-qualified, non-promissory language.',
        alternatives: 'Settle the wording in the copy',
        tradeoff: 'Pages wait on answers the build cannot supply.',
      },
      {
        title: 'Audit client feedback before applying it',
        why: 'A four-page Persian feedback document became a board of cards, each quoting the request with a translation and checked against the real code first. Requests that rested on a wrong premise were corrected before anyone built them.',
        alternatives: 'Apply the feedback as written',
        tradeoff: 'A slower first response, and fewer changes to undo.',
      },
      {
        title: 'Leave placeholders rather than invent identity',
        why: 'A legal name, registrations and the people behind a firm are facts, not design. Each stays visibly “to be supplied” until the firm confirms it, and the team page says in plain words that only real people will be published.',
        alternatives: 'Plausible sample names and numbers',
        tradeoff: 'The site cannot launch until the firm supplies them.',
      },
    ],
    teamEvidence: 'The team page, in place of a team: publish real people only.',
  },
  locales: {
    label: 'Seven locales',
    heading: 'Seven locales, two right to left',
    body: [
      'English, French, Arabic, Spanish, Japanese, Chinese and Persian carry every message key in exact parity — 222 keys in each file at the last commit. Arabic and Persian run on CSS logical properties, so the layout mirrors instead of being rebuilt.',
      'Two details only showed up in use. A per-language font swap written inside a cascade layer was silently overridden, so it now sits outside the layers; and the manifests use tabular numerals, so monospace columns still align under right-to-left and CJK text.',
    ],
    figureItems: ['Persian: the same hero, mirrored.', 'Arabic: the same hero, mirrored.'],
    figureCaption:
      'Both right-to-left locales, navigation included, from the same components as the English.',
  },
  outcomes: {
    heading: 'Deployed, not launched',
    intro:
      'The site is deployed and serving, but not launched: it has no domain, stays out of search on purpose, and its identity facts are still placeholders. The applied feedback sits in an unpushed commit, not on the server. There is no analytics, only container health checks.',
    measured: [
      {
        label: 'Integration tests passing',
        context: 'Beside lint, both guards and a production build, on the feedback branch.',
        source: 'Design-feedback board, 7 September 2026',
      },
      {
        label: 'Feedback cards applied in code',
        context: 'One held on an open decision; none yet verified on a running app.',
        source: 'Design-feedback roadmap',
      },
    ],
    delivered: [
      {
        label: 'Restore-verified backups',
        context:
          'Nightly, each one restored to prove it works, plus a recovery package before any release that migrates content.',
      },
      {
        label: 'An immutable-image deploy path',
        context: 'Releases ship as fixed images; the mutable latest tag and polled updates are retired.',
      },
    ],
    shipped: [
      'Seven locales in parity',
      'Two CI guards',
      'Governance manifest',
      'Buyer-qualification intake',
      'Reference chips',
      'Right-to-left layouts',
    ],
  },
  lessons: {
    heading: 'The trust device that didn’t do anything',
    items: [
      {
        title: 'The most useful output was a lint rule',
        body: 'Encoding “don’t speak the fraud channel’s dialect” as a guard moved it from an intention someone has to remember into a property of the repository.',
      },
      {
        title: 'A guard protects only what it reads',
        body: 'The content guard scans copy and message files, not the form’s option lists, so the buyer-qualification form still offers two of the banned terms as delivery options. On the one page where the firm screens others, it speaks the dialect it forbids.',
      },
      {
        title: 'A trust device has to do something',
        body: 'The reference chips name a registry or the LEI index but link to neither. Until they point at a real record, the signature device only looks like verification — the exact failure the project set out to avoid.',
      },
      {
        title: 'Confirm structural decisions in writing first',
        body: 'Seven locales shipped weeks before a client governance document called the language question undecided. Keeping them was right, since deleting finished, guarded work is the costlier mistake, but the decision belonged in writing before the keys existed.',
      },
    ],
  },
}

// Locale packs beyond EN land here when translated; until then every locale reads EN so tsc
// and the seven-locale seed stay green.
const COPY: Record<Locale, MqvCopy> = { en: EN, fa: EN, ar: EN, es: EN, de: EN, fr: EN, ja: EN }

export const MQV_MEDIA = Object.fromEntries(
  (Object.keys(MEDIA_FILES) as MqvMediaKey[]).map((key) => [
    key,
    {
      ...MEDIA_FILES[key],
      alt: Object.fromEntries(LOCALES.map((locale) => [locale, COPY[locale].alt[key]])),
    },
  ]),
) as Record<MqvMediaKey, MediaSpec>

const PROCESS_CODES: Four = ['BNCH', 'SPEC', 'BLD', 'FDBK']
const MEASURED_VALUES: Two = ['142', '32 / 33']

export function mqvSections(locale: Locale, media: MqvMediaIds): Sections {
  const c = COPY[locale]
  const dir = dirFor(locale)
  const item = (key: MqvMediaKey, id: string, caption?: string) =>
    media[key] ? [{ id, media: media[key]!, ...(caption ? { caption } : {}) }] : []
  const pad = (n: number) => String(n).padStart(2, '0')

  return [
    {
      id: 'mqv-s01',
      blockType: 'csNarrative',
      label: 'context',
      heading: c.context.heading,
      body: prose(dir, ...c.context.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'mqv-s02',
      blockType: 'csNarrative',
      label: 'problem',
      heading: c.problem.heading,
      body: prose(dir, ...c.problem.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'mqv-s03',
      blockType: 'csFinding',
      kind: 'quote',
      text: c.question.text,
      attribution: c.question.attribution,
      method: c.question.method,
    },
    {
      id: 'mqv-s04',
      blockType: 'csNarrative',
      label: 'research',
      heading: c.research.heading,
      body: prose(dir, ...c.research.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'mqv-s05',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: item('faq', 'mqv-f05-1'),
      caption: c.research.figureCaption,
    },
    {
      id: 'mqv-s06',
      blockType: 'csNarrative',
      label: 'approach',
      heading: c.approach.heading,
      body: prose(dir, ...c.approach.body.map((value) => paragraph(value, dir))),
      insight: c.approach.insight,
    },
    {
      id: 'mqv-s07',
      blockType: 'csProcess',
      kind: 'process',
      heading: c.approach.processHeading,
      steps: c.approach.steps.map((step, index) => ({
        id: `mqv-p${pad(index + 1)}`,
        code: PROCESS_CODES[index],
        label: step.label,
        note: step.note,
      })),
    },
    {
      id: 'mqv-s08',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: item('procedure', 'mqv-f08-1'),
      caption: c.approach.figureCaption,
    },
    {
      id: 'mqv-s09',
      blockType: 'csNarrative',
      label: 'solution',
      heading: c.solution.heading,
      body: prose(dir, ...c.solution.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'mqv-s10',
      blockType: 'csFigure',
      layout: 'annotated',
      treatment: 'plain',
      items: item('manifest', 'mqv-f10-1'),
      annotations: c.solution.annotations.map((text, index) => ({
        id: `mqv-a${pad(index + 1)}`,
        text,
      })),
      caption: c.solution.manifestCaption,
    },
    {
      id: 'mqv-s11',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'plain',
      items: [
        ...item('products', 'mqv-f11-1', c.solution.figureItems[0]),
        ...item('trackRecord', 'mqv-f11-2', c.solution.figureItems[1]),
      ],
      caption: c.solution.figureCaption,
    },
    {
      id: 'mqv-s12',
      blockType: 'csDecisions',
      heading: c.decisions.heading,
      lede: c.decisions.lede,
      items: c.decisions.items.map((decision, index) => ({
        id: `mqv-d${pad(index + 1)}`,
        title: decision.title,
        why: decision.why,
        alternatives: decision.alternatives,
        tradeoff: decision.tradeoff,
        ...(index === 4
          ? { evidence: c.decisions.teamEvidence, ...(media.team ? { media: media.team } : {}) }
          : {}),
      })),
    },
    {
      id: 'mqv-s13',
      blockType: 'csNarrative',
      label: 'custom',
      customLabel: c.locales.label,
      heading: c.locales.heading,
      body: prose(dir, ...c.locales.body.map((value) => paragraph(value, dir))),
    },
    {
      id: 'mqv-s14',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'plain',
      items: [
        ...item('homeFa', 'mqv-f14-1', c.locales.figureItems[0]),
        ...item('homeAr', 'mqv-f14-2', c.locales.figureItems[1]),
      ],
      caption: c.locales.figureCaption,
    },
    {
      id: 'mqv-s15',
      blockType: 'csOutcomes',
      heading: c.outcomes.heading,
      intro: c.outcomes.intro,
      items: [
        ...c.outcomes.measured.map((outcome, index) => ({
          id: `mqv-o${pad(index + 1)}`,
          kind: 'measured' as const,
          value: MEASURED_VALUES[index],
          label: outcome.label,
          context: outcome.context,
          source: outcome.source,
        })),
        ...c.outcomes.delivered.map((outcome, index) => ({
          id: `mqv-o${pad(index + 3)}`,
          kind: 'delivered' as const,
          label: outcome.label,
          context: outcome.context,
        })),
      ],
      shipped: c.outcomes.shipped,
    },
    {
      id: 'mqv-s16',
      blockType: 'csLessons',
      heading: c.lessons.heading,
      items: c.lessons.items.map((lesson, index) => ({
        id: `mqv-l${pad(index + 1)}`,
        title: lesson.title,
        body: lesson.body,
      })),
    },
  ]
}

export function mqvLocalizedFields(locale: Locale, media: MqvMediaIds) {
  const c = COPY[locale]
  const identity = ARCHIVE.text(locale)
  return {
    ...identity,
    statement: c.statement,
    industry: c.industry,
    team: c.team,
    hero: {
      items: media.home ? [{ id: 'mqv-h01', media: media.home }] : [],
      caption: c.heroCaption,
    },
    snapshot: c.snapshot,
    sections: mqvSections(locale, media),
    meta: {
      title: identity.title,
      description: identity.summary,
      ...(media.cover ? { image: media.cover } : {}),
    },
  }
}

export const MQV_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'pre-launch',
  tools: [
    'Payload',
    'Next.js',
    'next-intl',
    'MongoDB',
    'Tailwind CSS',
    'Docker',
    'nginx',
    'GitHub Actions',
  ],
  period: { start: '2026-06-01T00:00:00.000Z', end: '2026-09-01T00:00:00.000Z' },
}

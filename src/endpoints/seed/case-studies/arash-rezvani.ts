import type { Project } from '@/payload-types'
import { dirFor, LOCALES, type Locale } from '@/utilities/locale'

import type { MediaSpec } from '../media'
import { archiveIdentity } from './archive'
import ar from './arash-rezvani-copy/ar.json'
import de from './arash-rezvani-copy/de.json'
import en from './arash-rezvani-copy/en.json'
import es from './arash-rezvani-copy/es.json'
import fa from './arash-rezvani-copy/fa.json'
import fr from './arash-rezvani-copy/fr.json'
import ja from './arash-rezvani-copy/ja.json'
import {
  ARR_LIVE_DESKTOP_HERO,
  ARR_LIVE_DIR,
  ARR_LIVE_LOWER,
  ARR_LIVE_PHONE,
  ARR_LIVE_WAYS,
  ARR_SITE_IMAGES,
  ARR_STUDIES,
  ARR_TURNAROUNDS,
} from './arash-rezvani-imagery'
import { paragraph, prose } from './lexical'

/**
 * Arash Rezvani (`/work/arash-rezvani`) — a live Persian-first site for a writer, poet and
 * teacher. Rewritten 2026-09-27 from a full audit of the product, recorded in
 * `Docs/Experience/Projects/arash-rezvani/CASE-STUDY-COVERAGE.md`: the site's repository at
 * `gitea/main` (cfb1c40), its docs (the biography, the design language, the deployment and
 * content-operations logs), the live site in both languages, and the image workspace.
 *
 * Chapters: context, problem, constraints, role, sources, structure, design language, imagery,
 * publishing, decisions, reading to asking (search, contact, booking), operations, outcomes,
 * lessons. The copy is one JSON file per locale in `arash-rezvani-copy/`, checked against
 * English's shape at import; the builder below is a pure template over it.
 *
 * Publication gates (held here and in `tests/int/case-study-seeds.int.spec.ts`):
 * - Screenshots are type only. His photographs, book covers and video stills are never captured:
 *   no about, music, teach, road or looking page, nothing below the books page's opening screen,
 *   nothing below the contact calendar but the booking band, and the home page only in its hero,
 *   six-ways, map and notes sections (`live-2026-09-26/`, his family name hidden).
 * - The imagery chapter shows only images Sina generated (`arash-rezvani-imagery.ts`), never a
 *   crop of Arash's own photographs and never a book cover.
 * - No birth year or place, family origin or family members, and no contact address or handle.
 * - Every number about him is one the biography's sourced-numbers table states; every number about
 *   the build is traced in the coverage file.
 * - Known defects of the live site (journal bylines and dates, search localization, the contact
 *   form's missing notification, unlabeled generated images) are stated as open, never described
 *   as working.
 * - His English biography has not been reviewed by him, so he is paraphrased, never quoted.
 */
export const ARR_SLUG = 'arash-rezvani'
export const ARR_ASSETS = 'Docs/Experience/Projects/arash-rezvani/assets'
export const ARR_LOCALES = LOCALES

const ARCHIVE = archiveIdentity(ARR_SLUG)

/** Captures and diagrams, by key; paths are under `ARR_ASSETS`. */
const MEDIA_FILES = {
  cover: { file: 'capture-2026-09/mobile/experience-fa.png', name: ARCHIVE.row.cover.name },
  practicesMobile: {
    file: 'capture-2026-09/mobile/experience-fa-practices.png',
    name: 'arash-rezvani--mobile-practices.png',
  },
  poetryMobile: { file: 'capture-2026-09/mobile/poetry-fa.png', name: 'arash-rezvani--mobile-poetry.png' },
  calendarMobile: {
    file: 'capture-2026-09/mobile/contact-fa-calendar.png',
    name: 'arash-rezvani--mobile-calendar.png',
  },
  experienceEn: {
    file: 'capture-2026-09/desktop/experience-en-fold.png',
    name: 'arash-rezvani--desktop-experience-en.png',
  },
  experienceFa: {
    file: 'capture-2026-09/desktop/experience-fa-fold.png',
    name: 'arash-rezvani--desktop-experience-fa.png',
  },
  booksFa: { file: 'capture-2026-09/desktop/books-fa-fold.png', name: 'arash-rezvani--desktop-books.png' },
  lattice: {
    file: 'capture-2026-09/desktop/experience-fa-lattice.png',
    name: 'arash-rezvani--desktop-lattice.png',
  },
  hoursEn: {
    file: 'capture-2026-09/desktop/contact-en-hours-crop.png',
    name: 'arash-rezvani--desktop-hours.png',
  },
  postsFa: { file: 'capture-2026-09/desktop/posts-fa-fold.png', name: 'arash-rezvani--desktop-journal.png' },
  postsEn: {
    file: 'capture-2026-09/desktop/posts-en-fold.png',
    name: 'arash-rezvani--desktop-journal-en.png',
  },
  hoursMobile: {
    file: 'capture-2026-09/mobile/contact-fa-hours.png',
    name: 'arash-rezvani--mobile-hours.png',
  },
  bookingDetails: {
    file: 'capture-2026-09-27/mobile/booking-fa-details.png',
    name: 'arash-rezvani--mobile-booking-details.png',
  },
  poetryEmpty: {
    file: 'capture-2026-09-27/desktop/poetry-fa-poems.png',
    name: 'arash-rezvani--desktop-poetry-empty.png',
  },
  workEmpty: {
    file: 'capture-2026-09-27/desktop/work-en-notyet.png',
    name: 'arash-rezvani--desktop-work-empty.png',
  },
  searchFa: { file: 'capture-2026-09-27/mobile/search-fa.png', name: 'arash-rezvani--mobile-search-fa.png' },
  searchEn: { file: 'capture-2026-09-27/mobile/search-en.png', name: 'arash-rezvani--mobile-search-en.png' },
  // Drawn from the routes and the code, not screenshots: see the coverage file.
  structure: { file: 'diagrams/site-structure.png', name: 'arash-rezvani--diagram-structure.png' },
  bookReach: { file: 'diagrams/record-reach.png', name: 'arash-rezvani--diagram-record-reach.png' },
} as const

type CaptureKey = keyof typeof MEDIA_FILES
/** Imagery is keyed by its path under `assets/imagery/`, without the extension. */
type ImageryKey = `${'turnarounds' | 'site' | 'studies'}/${string}`
/** Live home-page captures are keyed `live/<path under assets/live-…/>`, without the extension. */
type LiveKey = `live/${string}`
export type ArrMediaKey = CaptureKey | ImageryKey | LiveKey
type ArrMediaIds = Partial<Record<ArrMediaKey, string>>
type Sections = NonNullable<Project['sections']>

interface Step {
  label: string
  note: string
}
interface Chapter {
  heading: string
  body: string[]
}

/** The shape of `arash-rezvani-copy/<locale>.json`. Array lengths are checked at import. */
export interface ArrCopy {
  statement: string
  industry: string
  team: string
  heroCaption: string
  snapshot: { problem: string; role: string; result: string }
  alt: Record<CaptureKey, string>
  context: Chapter & { figureItems: string[]; figureCaption: string }
  problem: Chapter
  constraints: Chapter
  ownership: { heading: string; intro: string; own: string[]; collaborate: string[]; note: string }
  sources: Chapter & {
    label: string
    insight: string
    rule: { text: string; attribution: string; method: string }
    booksCaption: string
    emptyItems: string[]
    emptyCaption: string
  }
  structure: Chapter & {
    label: string
    insight: string
    mapKey: string[]
    mapCaption: string
    homeCaption: string
  }
  approach: Chapter & {
    insight: string
    processHeading: string
    steps: Step[]
    annotations: string[]
    figureCaption: string
  }
  imagery: Chapter & {
    label: string
    insight: string
    heroCaption: string
    waysCaption: string
    phoneCaption: string
    turnaroundsCaption: string
    siteCaption: string
    studiesCaption: string
    own: string
  }
  publishing: Chapter & {
    label: string
    insight: string
    bookKey: string[]
    bookCaption: string
    journalItems: string[]
    journalCaption: string
  }
  decisions: {
    heading: string
    lede: string
    items: { title: string; why: string; alternatives: string; tradeoff: string }[]
    hoursEvidence: string
  }
  solution: Chapter & {
    insight: string
    bookingHeading: string
    bookingSteps: Step[]
    bookingCaption: string
    searchItems: string[]
    searchCaption: string
  }
  operations: Chapter & { label: string; insight: string; processHeading: string; steps: Step[] }
  outcomes: {
    heading: string
    intro: string
    measured: { label: string; context: string; source: string }[]
    delivered: { label: string; context: string }[]
    shipped: string[]
  }
  lessons: { heading: string; items: { title: string; body: string }[] }
}

const COPY: Record<Locale, ArrCopy> = { en, fa, ar, es, de, fr, ja }

/** Every array the builder indexes, with the length it relies on. */
const LENGTHS: [string, (c: ArrCopy) => unknown[], number][] = [
  ['context.body', (c) => c.context.body, 2],
  ['context.figureItems', (c) => c.context.figureItems, 2],
  ['problem.body', (c) => c.problem.body, 3],
  ['constraints.body', (c) => c.constraints.body, 2],
  ['sources.body', (c) => c.sources.body, 3],
  ['sources.emptyItems', (c) => c.sources.emptyItems, 2],
  ['structure.body', (c) => c.structure.body, 3],
  ['structure.mapKey', (c) => c.structure.mapKey, 8],
  ['approach.body', (c) => c.approach.body, 3],
  ['approach.steps', (c) => c.approach.steps, 7],
  ['approach.annotations', (c) => c.approach.annotations, 4],
  ['imagery.body', (c) => c.imagery.body, 2],
  ['publishing.body', (c) => c.publishing.body, 3],
  ['publishing.bookKey', (c) => c.publishing.bookKey, 6],
  ['publishing.journalItems', (c) => c.publishing.journalItems, 2],
  ['decisions.items', (c) => c.decisions.items, 6],
  ['solution.body', (c) => c.solution.body, 3],
  ['solution.bookingSteps', (c) => c.solution.bookingSteps, 5],
  ['solution.searchItems', (c) => c.solution.searchItems, 2],
  ['operations.body', (c) => c.operations.body, 3],
  ['operations.steps', (c) => c.operations.steps, 5],
  ['outcomes.measured', (c) => c.outcomes.measured, 2],
  ['outcomes.delivered', (c) => c.outcomes.delivered, 2],
  ['lessons.items', (c) => c.lessons.items, 4],
]

/** Throws at import if a locale's copy differs from English in shape, or an array is short. */
function assertCopy(copy: Record<Locale, ArrCopy>): void {
  const shape = (value: unknown): unknown =>
    Array.isArray(value)
      ? value.map(shape)
      : value && typeof value === 'object'
        ? Object.fromEntries(
            Object.keys(value)
              .sort()
              .map((key) => [key, shape((value as Record<string, unknown>)[key])]),
          )
        : typeof value
  const english = JSON.stringify(shape(copy.en))
  for (const locale of LOCALES) {
    if (JSON.stringify(shape(copy[locale])) !== english)
      throw new Error(`${ARR_SLUG}: ${locale} copy does not have the same shape as English`)
  }
  for (const [path, get, length] of LENGTHS) {
    if (get(copy.en).length !== length)
      throw new Error(`${ARR_SLUG}: ${path} has ${get(copy.en).length} rows, expected ${length}`)
  }
}
assertCopy(COPY)

const imageryKey = (file: string) => file.replace(/\.jpg$/, '') as ImageryKey
const liveKey = (file: string) => `live/${file.replace(/\.(jpg|png)$/, '')}` as LiveKey
const LIVE_SPECS = [...ARR_LIVE_DESKTOP_HERO, ARR_LIVE_WAYS, ...ARR_LIVE_PHONE, ...ARR_LIVE_LOWER]

export const ARR_MEDIA = {
  ...Object.fromEntries(
    (Object.keys(MEDIA_FILES) as CaptureKey[]).map((key) => [
      key,
      {
        file: MEDIA_FILES[key].file,
        name: MEDIA_FILES[key].name,
        alt: Object.fromEntries(LOCALES.map((locale) => [locale, COPY[locale].alt[key]])),
      },
    ]),
  ),
  ...Object.fromEntries(
    [...ARR_TURNAROUNDS, ...ARR_SITE_IMAGES, ...ARR_STUDIES].map((spec) => [
      imageryKey(spec.file),
      {
        file: `imagery/${spec.file}`,
        name: `arash-rezvani--${imageryKey(spec.file).replace('/', '-')}.jpg`,
        alt: spec.alt,
      },
    ]),
  ),
  ...Object.fromEntries(
    LIVE_SPECS.map((spec) => [
      liveKey(spec.file),
      {
        file: `${ARR_LIVE_DIR}/${spec.file}`,
        name: `arash-rezvani--live-${spec.file.replace('/', '-')}`,
        alt: spec.alt,
      },
    ]),
  ),
} as Record<ArrMediaKey, MediaSpec>

// Codes are stored for the process maps but not rendered (they show numbers).
const TIMELINE_CODES = ['BLD', 'BRND', 'SRC', 'STMT', 'URL', 'BOOK', 'MUS']
const BOOKING_CODES = ['DAY', 'TIME', 'DET', 'REV', 'DONE']
const OPERATION_CODES = ['CLS', 'BAK', 'WRT', 'READ', 'LOG']
const MEASURED_VALUES = ['14', '307']

export function arrSections(locale: Locale, media: ArrMediaIds): Sections {
  const c = COPY[locale]
  const dir = dirFor(locale)
  const body = (paragraphs: string[]) => prose(dir, ...paragraphs.map((value) => paragraph(value, dir)))
  // Every optional localized leaf is written, even empty: rows moved in this rewrite, and Payload
  // merges a locale's leaves into whatever row now sits at that position.
  const item = (key: ArrMediaKey, id: string, caption = '') =>
    media[key] ? [{ id, media: media[key]!, caption }] : []
  const gallery = (specs: { file: string }[], prefix: string) =>
    specs.flatMap((spec, index) =>
      item(imageryKey(spec.file), `${prefix}-${String(index + 1).padStart(2, '0')}`),
    )
  const liveItems = (specs: { file: string }[], prefix: string) =>
    specs.flatMap((spec, index) => item(liveKey(spec.file), `${prefix}-${index + 1}`))
  const key = (texts: string[], prefix: string) =>
    texts.map((text, index) => ({ id: `${prefix}-${String(index + 1).padStart(2, '0')}`, text }))
  const steps = (rows: Step[], codes: string[], prefix: string) =>
    rows.map((step, index) => ({
      id: `${prefix}${String(index + 1).padStart(2, '0')}`,
      code: codes[index],
      label: step.label,
      note: step.note,
    }))
  const narrative = (
    id: string,
    label: 'context' | 'problem' | 'constraints' | 'approach' | 'solution' | 'custom',
    chapter: Chapter,
    insight = '',
    customLabel = '',
  ) => ({ id, blockType: 'csNarrative' as const, label, customLabel, heading: chapter.heading, body: body(chapter.body), insight })

  return [
    // 01 Context
    narrative('arr-s01', 'context', c.context),
    {
      id: 'arr-s02',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'plain',
      items: [
        ...item('experienceEn', 'arr-f02-1', c.context.figureItems[0]),
        ...item('experienceFa', 'arr-f02-2', c.context.figureItems[1]),
      ],
      annotations: [],
      caption: c.context.figureCaption,
    },
    // 02 Problem · 03 Constraints · 04 Role
    narrative('arr-s03', 'problem', c.problem),
    narrative('arr-s28', 'constraints', c.constraints),
    {
      id: 'arr-s06',
      blockType: 'csOwnership',
      heading: c.ownership.heading,
      intro: c.ownership.intro,
      own: [...c.ownership.own, c.imagery.own],
      collaborate: c.ownership.collaborate,
      note: c.ownership.note,
    },
    // 05 Sources: the biography as the source of truth, and gaps stated rather than filled
    narrative('arr-s29', 'custom', c.sources, c.sources.insight, c.sources.label),
    {
      id: 'arr-s04',
      blockType: 'csFinding',
      kind: 'quote',
      text: c.sources.rule.text,
      attribution: c.sources.rule.attribution,
      method: c.sources.rule.method,
    },
    {
      id: 'arr-s05',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: item('booksFa', 'arr-f05-1'),
      annotations: [],
      caption: c.sources.booksCaption,
    },
    {
      id: 'arr-s30',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'plain',
      items: [
        ...item('poetryEmpty', 'arr-f30-1', c.sources.emptyItems[0]),
        ...item('workEmpty', 'arr-f30-2', c.sources.emptyItems[1]),
      ],
      annotations: [],
      caption: c.sources.emptyCaption,
    },
    // 06 Structure: one page per job, one home per fact
    narrative('arr-s31', 'custom', c.structure, c.structure.insight, c.structure.label),
    {
      id: 'arr-s32',
      blockType: 'csFigure',
      layout: 'annotated',
      treatment: 'diagram',
      items: item('structure', 'arr-f32-1'),
      annotations: key(c.structure.mapKey, 'arr-a32'),
      caption: c.structure.mapCaption,
    },
    {
      id: 'arr-s27',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'plain',
      items: liveItems(ARR_LIVE_LOWER, 'arr-f27'),
      annotations: [],
      caption: c.structure.homeCaption,
    },
    // 07 Design language
    narrative('arr-s07', 'approach', c.approach, c.approach.insight),
    {
      id: 'arr-s08',
      blockType: 'csProcess',
      kind: 'process',
      heading: c.approach.processHeading,
      steps: steps(c.approach.steps, TIMELINE_CODES, 'arr-p'),
    },
    {
      id: 'arr-s09',
      blockType: 'csFigure',
      layout: 'annotated',
      treatment: 'plain',
      items: item('lattice', 'arr-f09-1'),
      annotations: key(c.approach.annotations, 'arr-a'),
      caption: c.approach.figureCaption,
    },
    // 08 Imagery
    narrative('arr-s20', 'custom', c.imagery, c.imagery.insight, c.imagery.label),
    {
      id: 'arr-s24',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'plain',
      items: liveItems(ARR_LIVE_DESKTOP_HERO, 'arr-f24'),
      annotations: [],
      caption: c.imagery.heroCaption,
    },
    {
      id: 'arr-s25',
      blockType: 'csFigure',
      layout: 'full',
      treatment: 'plain',
      items: liveItems([ARR_LIVE_WAYS], 'arr-f25'),
      annotations: [],
      caption: c.imagery.waysCaption,
    },
    {
      id: 'arr-s26',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'screen',
      items: liveItems(ARR_LIVE_PHONE, 'arr-f26'),
      annotations: [],
      caption: c.imagery.phoneCaption,
    },
    {
      id: 'arr-s21',
      blockType: 'csFigure',
      layout: 'gallery',
      treatment: 'plain',
      items: gallery(ARR_TURNAROUNDS, 'arr-f21'),
      annotations: [],
      caption: c.imagery.turnaroundsCaption,
    },
    {
      id: 'arr-s22',
      blockType: 'csFigure',
      layout: 'gallery',
      treatment: 'plain',
      items: gallery(ARR_SITE_IMAGES, 'arr-f22'),
      annotations: [],
      caption: c.imagery.siteCaption,
    },
    {
      id: 'arr-s23',
      blockType: 'csFigure',
      layout: 'gallery',
      treatment: 'plain',
      items: gallery(ARR_STUDIES, 'arr-f23'),
      annotations: [],
      caption: c.imagery.studiesCaption,
    },
    // 09 Publishing: records and their reach
    narrative('arr-s33', 'custom', c.publishing, c.publishing.insight, c.publishing.label),
    {
      id: 'arr-s34',
      blockType: 'csFigure',
      layout: 'annotated',
      treatment: 'diagram',
      items: item('bookReach', 'arr-f34-1'),
      annotations: key(c.publishing.bookKey, 'arr-a34'),
      caption: c.publishing.bookCaption,
    },
    {
      id: 'arr-s12',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'plain',
      items: [
        ...item('postsFa', 'arr-f12-1', c.publishing.journalItems[0]),
        ...item('postsEn', 'arr-f12-2', c.publishing.journalItems[1]),
      ],
      annotations: [],
      caption: c.publishing.journalCaption,
    },
    // 10 Decisions
    {
      id: 'arr-s10',
      blockType: 'csDecisions',
      heading: c.decisions.heading,
      lede: c.decisions.lede,
      items: c.decisions.items.map((decision, index) => ({
        id: `arr-d${String(index + 1).padStart(2, '0')}`,
        title: decision.title,
        why: decision.why,
        alternatives: decision.alternatives,
        tradeoff: decision.tradeoff,
        evidence: index === 1 ? c.decisions.hoursEvidence : '',
        ...(index === 1 && media.hoursEn ? { media: media.hoursEn } : {}),
      })),
    },
    // 11 From reading to asking: search, contact, booking
    narrative('arr-s11', 'solution', c.solution, c.solution.insight),
    {
      id: 'arr-s37',
      blockType: 'csFigure',
      layout: 'split',
      treatment: 'screen',
      items: [
        ...item('searchFa', 'arr-f37-1', c.solution.searchItems[0]),
        ...item('searchEn', 'arr-f37-2', c.solution.searchItems[1]),
      ],
      annotations: [],
      caption: c.solution.searchCaption,
    },
    {
      id: 'arr-s35',
      blockType: 'csProcess',
      kind: 'process',
      heading: c.solution.bookingHeading,
      steps: steps(c.solution.bookingSteps, BOOKING_CODES, 'arr-b'),
    },
    {
      id: 'arr-s36',
      blockType: 'csFigure',
      layout: 'sequence',
      treatment: 'screen',
      items: [...item('hoursMobile', 'arr-f36-1'), ...item('bookingDetails', 'arr-f36-2')],
      annotations: [],
      caption: c.solution.bookingCaption,
    },
    // 12 Operations
    narrative('arr-s38', 'custom', c.operations, c.operations.insight, c.operations.label),
    {
      id: 'arr-s39',
      blockType: 'csProcess',
      kind: 'process',
      heading: c.operations.processHeading,
      steps: steps(c.operations.steps, OPERATION_CODES, 'arr-q'),
    },
    // 13 Outcomes · 14 Lessons
    {
      id: 'arr-s13',
      blockType: 'csOutcomes',
      heading: c.outcomes.heading,
      intro: c.outcomes.intro,
      items: [
        ...c.outcomes.measured.map((outcome, index) => ({
          id: `arr-o${String(index + 1).padStart(2, '0')}`,
          kind: 'measured' as const,
          value: MEASURED_VALUES[index],
          label: outcome.label,
          context: outcome.context,
          source: outcome.source,
        })),
        ...c.outcomes.delivered.map((outcome, index) => ({
          id: `arr-o${String(index + 3).padStart(2, '0')}`,
          kind: 'delivered' as const,
          label: outcome.label,
          context: outcome.context,
          source: '',
        })),
      ],
      shipped: c.outcomes.shipped,
    },
    {
      id: 'arr-s14',
      blockType: 'csLessons',
      heading: c.lessons.heading,
      items: c.lessons.items.map((lesson, index) => ({
        id: `arr-l${String(index + 1).padStart(2, '0')}`,
        title: lesson.title,
        body: lesson.body,
      })),
    },
  ] as Sections
}

export function arrLocalizedFields(locale: Locale, media: ArrMediaIds) {
  const c = COPY[locale]
  const identity = ARCHIVE.text(locale)
  return {
    ...identity,
    statement: c.statement,
    industry: c.industry,
    team: c.team,
    hero: {
      items: (['practicesMobile', 'poetryMobile', 'calendarMobile'] as const)
        .filter((mediaKey) => media[mediaKey])
        .map((mediaKey, index) => ({
          id: `arr-h${String(index + 1).padStart(2, '0')}`,
          media: media[mediaKey]!,
        })),
      caption: c.heroCaption,
    },
    snapshot: c.snapshot,
    sections: arrSections(locale, media),
    meta: {
      title: identity.title,
      description: identity.summary,
      ...(media.cover ? { image: media.cover } : {}),
    },
  }
}

export const ARR_SHARED_FIELDS: Pick<Project, 'projectStatus' | 'tools' | 'period'> = {
  projectStatus: 'shipped',
  tools: ['Payload', 'Next.js', 'MongoDB', 'Tailwind CSS', 'ArvanCloud', 'Coolify', 'Gitea', 'Docker'],
  period: { start: '2026-08-01T00:00:00.000Z', present: true },
}

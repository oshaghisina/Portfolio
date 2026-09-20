/**
 * Single source of truth for Docs frontmatter rules.
 * Mirrors Docs/Benchmarks/Rubric.md (criteria) and Docs/README.md (conventions).
 */

export const STATUS = ['draft', 'review', 'ready'] as const
export type Status = (typeof STATUS)[number]

export const EMPLOYMENT = ['full-time', 'part-time', 'freelance', 'contract'] as const
export const SITE_KIND = ['personal-portfolio', 'studio', 'agency', 'product', 'other'] as const
export const BENCHMARK_TYPES = ['content', 'design'] as const
export type BenchmarkType = (typeof BENCHMARK_TYPES)[number]

export const SCORES: Record<BenchmarkType, readonly string[]> = {
  content: ['ia', 'depth', 'proof', 'personality'],
  design: ['distinctiveness', 'typography', 'motion', 'brand', 'mobile'],
}

export const REQUIRED = {
  benchmark: ['title', 'url', 'slug', 'type', 'date_added', 'relevance', 'scores', 'status'],
  experience: ['slug', 'resume_order', 'company', 'role', 'period', 'employment', 'status'],
  project: ['title', 'slug', 'company', 'role', 'period', 'employment', 'status'],
  meta: ['title', 'doc_type', 'status', 'updated'],
  dsitem: [
    'id',
    'title',
    'slug',
    'category',
    'take',
    'priority',
    'adoption',
    'sources',
    'target',
    'rtl',
    'localization',
    'date_added',
    'updated',
    'status',
  ],
} as const

export const KNOWN_KEYS = {
  benchmark: [
    ...REQUIRED.benchmark,
    'owner',
    'owner_role',
    'site_kind',
    'lang',
    'generator',
    'summary',
    'tags',
    'screenshots',
  ],
  experience: [...REQUIRED.experience, 'product', 'domain', 'summary', 'summary_fa'],
  project: [
    ...REQUIRED.project,
    'title_fa',
    'inventory_id',
    'product',
    'domain',
    'team',
    'summary',
    'summary_fa',
    'tools',
    'skills',
    'figma',
    'links',
    'metrics',
    'featured',
  ],
  dsitem: [
    ...REQUIRED.dsitem,
    'superseded_by',
    'tokens',
    'evidence',
    'related',
    'open_questions',
  ],
} as const

/** Keys that must be non-empty before a doc can be `ready`. */
export const READY_NONEMPTY = {
  benchmark: ['summary', 'owner', 'site_kind'],
  experience: ['summary'],
  project: ['summary', 'inventory_id'],
  dsitem: ['sources', 'evidence'],
} as const

/** `_fa` twins expected on ready project docs (warn only). */
export const READY_FA = { project: ['title_fa', 'summary_fa'] } as const

export const YEAR_MONTH = /^\d{4}-(0[1-9]|1[0-2])$/
export const ISO_DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
export const INVENTORY_ID = /^[A-Z0-9]{3}-\d{2}$/
export const QUESTION_MARK = '❓'

export const MARKER_START = '<!-- index:start -->'
export const MARKER_END = '<!-- index:end -->'

/** Benchmarks not yet folded into Synthesis.md before validate warns. */
export const SYNTHESIS_LAG = 3
/** Warn when relevance and the criteria average disagree by more than this. */
export const RELEVANCE_AVG_TOLERANCE = 1.5

export const SCREENSHOT_NAMES = ['desktop.png', 'mobile.png', 'desktop-fold.png'] as const
export const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
} as const

// ---------------------------------------------------------------------------
// Design-System items (Docs/Design-System/DS-NN-<slug>.md) — see Docs/README.md

export const DS_CATEGORY = ['foundation', 'type-device', 'layout', 'component', 'motion', 'signature'] as const
export type DsCategory = (typeof DS_CATEGORY)[number]
export const DS_TAKE = ['borrow', 'adapt', 'avoid'] as const
export const DS_ADOPTION = ['candidate', 'adopted', 'rejected', 'superseded'] as const
export const DS_TARGET_KIND = [
  'token',
  'utility',
  'component',
  'block',
  'hero',
  'global',
  'layout',
  'page',
  'asset',
] as const
export const DS_RTL = ['mirrors', 'neutral', 'needs-redesign'] as const
export const DS_LOCALIZATION = ['none', 'labels', 'copy', 'typeface'] as const
export const DS_PRIORITY_MAX = 3

export const DS_ID = /^DS-\d{2}$/
/** `DS-07-control-tokens.md` → [ , 'DS-07', 'control-tokens' ] */
export const DS_FILE = /^(DS-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/
/** Token path inside a tokens file: at least two dot-separated segments, e.g. `color.brand`. */
export const TOKEN_PATH = /^[a-z][a-zA-Z0-9]*(\.[a-z0-9][a-zA-Z0-9-]*)+$/
/** DTCG `$extensions` namespace used for provenance. */
export const TOKEN_EXT_NS = 'com.sinaoshaghi.docs'
/** Top-level groups of a tokens file, in emit order (1:1 with Tailwind v4 `@theme` namespaces). */
export const TOKEN_GROUPS = ['color', 'font', 'size', 'space', 'radius', 'motion', 'breakpoint'] as const
/** Stem of the house tokens file (`tokens/sina.tokens.json`) — Sina's own values, input of `pnpm tokens:build`. */
export const OWN_TOKENS = 'sina'
/** `<benchmark>:<token path>` — provenance of a house token. */
export const DERIVED_FROM = /^([a-z0-9]+(?:-[a-z0-9]+)*):([a-z][a-zA-Z0-9]*(?:\.[a-z0-9][a-zA-Z0-9-]*)+)$/

export const DS_CAPTURE_KINDS = ['element@2x', 'bbox+computed', 'frames', 'video', 'viewport', 'states'] as const
export type DsCaptureKind = (typeof DS_CAPTURE_KINDS)[number]
export const DS_VIDEO_MAX_MS = 8000

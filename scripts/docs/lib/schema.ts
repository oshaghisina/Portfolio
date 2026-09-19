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
} as const

/** Keys that must be non-empty before a doc can be `ready`. */
export const READY_NONEMPTY = {
  benchmark: ['summary', 'owner', 'site_kind'],
  experience: ['summary'],
  project: ['summary', 'inventory_id'],
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

import { isProjectKind, type ProjectKind } from '@/collections/Projects/kinds'
import { localePath, parseLocalePath } from '@/i18n/navigation'
import { WORK_PATH } from '@/i18n/routes'
import type { Locale } from '@/utilities/locale'

import { workRowId } from './rows'

/**
 * The /work view as a shareable URL: `/work?q=gold&kind=product&company=digikala&view=list`.
 * Defaults are left out, so the plain archive stays `/work`, and a value the page can't honour
 * (unknown kind, a company with no projects, a mangled view) quietly reads as "all".
 */
export type WorkLayout = 'grid' | 'list'

export interface WorkView {
  q: string
  kind: ProjectKind | 'all'
  /** A `companyKey`, never the translated display name. */
  company: string
  view: WorkLayout
}

export const DEFAULT_WORK_VIEW: WorkView = { q: '', kind: 'all', company: '', view: 'grid' }
export const WORK_VIEW_PARAMS = ['q', 'kind', 'company', 'view'] as const
export const MAX_QUERY_LENGTH = 120

const COMPANY_KEY = /^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const cleanQuery = (value: string): string =>
  value.replace(/\s+/g, ' ').trim().slice(0, MAX_QUERY_LENGTH).trim()

export interface WorkViewOptions {
  /** Kinds that have a filter button; any other kind reads as "all". */
  kinds?: readonly string[]
  /** Company keys present in the archive; any other key reads as "all companies". */
  companies?: readonly string[]
}

export function parseWorkView(
  params: { get(name: string): string | null } | null | undefined,
  options: WorkViewOptions = {},
): WorkView {
  const kind = params?.get('kind') ?? null
  const company = params?.get('company') ?? ''
  return {
    q: cleanQuery(params?.get('q') ?? ''),
    kind: isProjectKind(kind) && (!options.kinds || options.kinds.includes(kind)) ? kind : 'all',
    company:
      company.length <= 80 &&
      COMPANY_KEY.test(company) &&
      (!options.companies || options.companies.includes(company))
        ? company
        : '',
    view: params?.get('view') === 'list' ? 'list' : 'grid',
  }
}

/**
 * Query string without `?`. Unrelated parameters in `base`, such as campaign tags, survive, and a
 * view parameter already there keeps its place.
 */
export function serializeWorkView(view: WorkView, base: string | URLSearchParams = ''): string {
  const params = new URLSearchParams(base)
  const values: Record<(typeof WORK_VIEW_PARAMS)[number], string> = {
    q: cleanQuery(view.q),
    kind: view.kind === 'all' ? '' : view.kind,
    company: view.company,
    view: view.view === 'grid' ? '' : view.view,
  }
  for (const key of WORK_VIEW_PARAMS) {
    if (values[key]) params.set(key, values[key])
    else params.delete(key)
  }
  return params.toString()
}

/**
 * Accepts only a same-site Work URL (`/work` or a localized `/xx/work`) and rebuilds it for
 * `locale` with nothing but the view parameters. Another path, another origin, `//host`,
 * `javascript:` and the like are null, so a stored value can never become an open redirect.
 */
export function safeWorkReturn(href: unknown, locale: Locale): string | null {
  if (typeof href !== 'string' || !href.startsWith('/') || href.startsWith('//')) return null
  const origin = 'https://work.invalid'
  let url: URL
  try {
    url = new URL(href, origin)
  } catch {
    return null
  }
  if (url.origin !== origin || parseLocalePath(url.pathname).logicalPath !== WORK_PATH) return null
  const search = serializeWorkView(parseWorkView(url.searchParams))
  return `${localePath(locale, WORK_PATH)}${search ? `?${search}` : ''}`
}

/** The row a visitor opened a study from, and how far down the viewport it sat. */
export interface WorkReturnMark {
  slug: string
  top: number | null
}

/** What a study's "All work" link needs: the view and row it was opened from, and when. */
export interface WorkReturn {
  path: string
  slug: string
  at: number
}

const RETURN_KEY = 'work-return'
/** A remembered view older than this is a different visit; "All work" then opens the archive. */
export const WORK_RETURN_TTL = 30 * 60 * 1000

const isSlug = (value: unknown): value is string => typeof value === 'string' && SLUG.test(value)

export const isWorkReturnMark = (value: unknown): value is WorkReturnMark => {
  const mark = value as Partial<WorkReturnMark> | null
  return (
    isSlug(mark?.slug) &&
    (mark.top === null || (typeof mark.top === 'number' && Number.isFinite(mark.top)))
  )
}

export function rememberWorkReturn(record: Omit<WorkReturn, 'at'>): void {
  try {
    window.sessionStorage.setItem(RETURN_KEY, JSON.stringify({ ...record, at: Date.now() }))
  } catch {
    // Storage can be off (private mode, blocked site data); "All work" then opens the archive.
  }
}

export function readWorkReturn(): WorkReturn | null {
  try {
    const record = JSON.parse(
      window.sessionStorage.getItem(RETURN_KEY) ?? 'null',
    ) as Partial<WorkReturn> | null
    return isSlug(record?.slug) && typeof record.path === 'string' && typeof record.at === 'number'
      ? { path: record.path, slug: record.slug, at: record.at }
      : null
  } catch {
    return null
  }
}

/** Where a study's "All work" link leads: the remembered view and row, when it was this study. */
export function workReturnHref(
  record: WorkReturn | null,
  slug: string,
  locale: Locale,
  now = Date.now(),
): string | null {
  if (!record || record.slug !== slug || now < record.at || now - record.at > WORK_RETURN_TTL)
    return null
  const path = safeWorkReturn(record.path, locale)
  return path ? `${path}#${workRowId(slug)}` : null
}

/**
 * The row to land on when /work mounts. A `#work-<slug>` link (a study's "All work", a search
 * result) wins and sets the row just under the header; Back carries the row and its old offset in
 * the history entry instead.
 */
export function workReturnTarget(historyState: unknown, hash: string): WorkReturnMark | null {
  const prefix = `#${workRowId('')}`
  if (hash.startsWith(prefix)) {
    let slug: string
    try {
      slug = decodeURIComponent(hash.slice(prefix.length))
    } catch {
      return null
    }
    return isSlug(slug) ? { slug, top: null } : null
  }
  const mark = (historyState as { workReturn?: unknown } | null)?.workReturn
  return isWorkReturnMark(mark) ? mark : null
}

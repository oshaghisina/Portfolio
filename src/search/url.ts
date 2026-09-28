import { localePath } from '@/i18n/navigation'
import type { Locale } from '@/utilities/locale'

/** Logical (unprefixed) path of the site search page. */
export const SEARCH_PATH = '/search'

/** Longer input is cut, so a pasted essay can't turn into a giant URL or a slow match. */
export const MAX_SEARCH_LENGTH = 120

/** The query as the URL keeps it: whitespace collapsed, trimmed, capped. */
export const cleanSearchQuery = (value: string): string =>
  value.replace(/\s+/g, ' ').trim().slice(0, MAX_SEARCH_LENGTH).trim()

/** `?q=` as Next hands it to the page: missing, one value, or repeated (the first one wins). */
export function readSearchQuery(q: string | string[] | undefined): string {
  return cleanSearchQuery((Array.isArray(q) ? q[0] : q) ?? '')
}

/** `/search?q=…` in a locale, encoded by `URLSearchParams`; an empty query is the bare page. */
export function searchHref(locale: Locale, query: string): string {
  const q = cleanSearchQuery(query)
  const path = localePath(locale, SEARCH_PATH)
  return q ? `${path}?${new URLSearchParams({ q })}` : path
}

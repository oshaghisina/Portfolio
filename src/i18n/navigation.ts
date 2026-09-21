import { DEFAULT_LOCALE, isLocale, type Locale } from '@/utilities/locale'

/** Paths that are never locale-prefixed even though they're root-relative. */
const ASSET_PATH_PREFIXES = ['/media/', '/api/', '/admin', '/_next/', '/next/preview']

function isAssetPath(pathname: string): boolean {
  if (ASSET_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true
  const lastSegment = pathname.split('/').pop() ?? ''
  return lastSegment.includes('.')
}

/** Splits a pathname like `/fa/about` into its locale and logical (unprefixed) path. */
export function parseLocalePath(pathname: string | null | undefined): { locale: Locale; logicalPath: string } {
  const [, maybeSegment, ...rest] = (pathname || '/').split('/')
  if (isLocale(maybeSegment)) {
    return { locale: maybeSegment, logicalPath: `/${rest.join('/')}` || '/' }
  }
  return { locale: DEFAULT_LOCALE, logicalPath: pathname || '/' }
}

/** Builds the public URL for a locale + logical path: unprefixed for `en`, `/xx` otherwise. */
export function localePath(locale: Locale, logicalPath: string): string {
  const normalized = logicalPath === '/' ? '' : logicalPath
  return locale === DEFAULT_LOCALE ? normalized || '/' : `/${locale}${normalized}`
}

/** True for root-relative hrefs — as opposed to external URLs, `mailto:`/`tel:`, or hash-only links. */
export function isInternalHref(href: string | null | undefined): href is string {
  if (!href) return false
  return href.startsWith('/') && !href.startsWith('//')
}

/**
 * Rewrites an internal href to carry the given locale's prefix. External URLs, `mailto:`/`tel:`/
 * hash-only links, and asset paths (media, API, admin, static) pass through unchanged. Any href
 * that already carries a locale prefix is first reduced to its logical path, so this never
 * double-prefixes an already-localized link.
 */
export function localizeInternalHref(locale: Locale, href: string | null | undefined): string {
  if (!isInternalHref(href)) return href ?? ''

  const splitAt = Math.min(...[href.indexOf('#'), href.indexOf('?')].filter((i) => i >= 0), href.length)
  const path = href.slice(0, splitAt)
  const suffix = href.slice(splitAt)

  if (isAssetPath(path)) return href

  const { logicalPath } = parseLocalePath(path)
  return `${localePath(locale, logicalPath)}${suffix}`
}

/**
 * Whether a nav href points at the current logical path (or a page beneath it): `/` only matches
 * itself, `/work` also matches `/work/rp1-arena` but not `/workshop`. Hash-only, query-only and
 * external hrefs are never "active" — a `#section` link shouldn't light up on every page.
 */
export function isActivePath(currentLogicalPath: string, href: string | null | undefined): boolean {
  if (!isInternalHref(href) || href.includes('#')) return false
  const { logicalPath: target } = parseLocalePath(href.split('?')[0])
  if (target === '/') return currentLogicalPath === '/'
  return currentLogicalPath === target || currentLogicalPath.startsWith(`${target}/`)
}

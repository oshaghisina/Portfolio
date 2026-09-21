/**
 * Locale plumbing for the frontend (D-009). `<html lang dir>` is derived from a request header
 * set by `src/proxy.ts` (see `getLocale.ts`), not a cookie — English is unprefixed at the root,
 * every other locale is routed under its own `/xx` prefix (e.g. `/fa/about`).
 */
export const LOCALES = ['en', 'fa', 'ar', 'es', 'de', 'fr', 'ja'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'
/** Header `src/proxy.ts` sets from the URL prefix; `getLocale()` reads it back. */
export const LOCALE_HEADER = 'x-locale'
/** Header `src/proxy.ts` sets to the original request path; `getPathname()` reads it back. */
export const PATHNAME_HEADER = 'x-pathname'

const RTL: readonly Locale[] = ['fa', 'ar']

/** Native display name — used by the locale switcher and admin-facing labels. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  fa: 'فارسی',
  ar: 'العربية',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  ja: '日本語',
}

export const isLocale = (v: unknown): v is Locale => typeof v === 'string' && (LOCALES as readonly string[]).includes(v)
export const isRtl = (locale: Locale) => RTL.includes(locale)
export const dirFor = (locale: Locale): 'ltr' | 'rtl' => (isRtl(locale) ? 'rtl' : 'ltr')
/** Attributes for the element that roots a locale (`<html lang dir>`). */
export const langAttrs = (locale: Locale) => ({ lang: locale, dir: dirFor(locale) }) as const

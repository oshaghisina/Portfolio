/**
 * Locale plumbing for the frontend (D-009). `<html lang dir>` is derived from a cookie-backed
 * preference (see `getLocale.ts`), not a URL segment — there's no Payload `localization` or
 * `/fa` routing, since no page/post content has a Farsi translation yet.
 */
export const LOCALES = ['en', 'fa'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'
export const LOCALE_COOKIE = 'payload-locale'
const RTL: readonly Locale[] = ['fa']

export const isLocale = (v: unknown): v is Locale => typeof v === 'string' && (LOCALES as readonly string[]).includes(v)
export const isRtl = (locale: Locale) => RTL.includes(locale)
export const dirFor = (locale: Locale): 'ltr' | 'rtl' => (isRtl(locale) ? 'rtl' : 'ltr')
/** Attributes for the element that roots a locale (`<html>` today, a route segment later). */
export const langAttrs = (locale: Locale) => ({ lang: locale, dir: dirFor(locale) }) as const

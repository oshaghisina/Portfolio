/**
 * Locale plumbing for the frontend (D-009). Until Payload `localization` and `/fa` routing
 * land, this is the single place `<html lang dir>` is derived from.
 */
export const LOCALES = ['en', 'fa'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'
const RTL: readonly Locale[] = ['fa']

export const isLocale = (v: unknown): v is Locale => typeof v === 'string' && (LOCALES as readonly string[]).includes(v)
export const isRtl = (locale: Locale) => RTL.includes(locale)
export const dirFor = (locale: Locale): 'ltr' | 'rtl' => (isRtl(locale) ? 'rtl' : 'ltr')
/** Attributes for the element that roots a locale (`<html>` today, a route segment later). */
export const langAttrs = (locale: Locale) => ({ lang: locale, dir: dirFor(locale) }) as const

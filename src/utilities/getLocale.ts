import { headers } from 'next/headers'

import { DEFAULT_LOCALE, isLocale, LOCALE_HEADER, type Locale } from './locale'

/** Server-only: resolves the visitor's locale from the `x-locale` header `src/proxy.ts` sets. */
export async function getLocale(): Promise<Locale> {
  const value = (await headers()).get(LOCALE_HEADER)
  return isLocale(value) ? value : DEFAULT_LOCALE
}

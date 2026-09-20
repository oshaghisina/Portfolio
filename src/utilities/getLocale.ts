import { cookies } from 'next/headers'

import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Locale } from './locale'

/** Server-only: resolves the visitor's locale preference from the `payload-locale` cookie. */
export async function getLocale(): Promise<Locale> {
  const store = await cookies()
  const value = store.get(LOCALE_COOKIE)?.value
  return isLocale(value) ? value : DEFAULT_LOCALE
}

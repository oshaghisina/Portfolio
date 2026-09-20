'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { LOCALE_COOKIE, type Locale } from '@/utilities/locale'

/** Sets the locale cookie and forces a real navigation so `<html lang dir>` and the
 *  server-fetched Header/Footer globals actually re-render — a soft nav would leave them stale. */
export async function setLocaleAction(next: Locale, pathname: string) {
  const store = await cookies()
  store.set(LOCALE_COOKIE, next, { maxAge: 60 * 60 * 24 * 365, path: '/' })
  redirect(pathname)
}

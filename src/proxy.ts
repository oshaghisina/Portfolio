import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { DEFAULT_LOCALE, LOCALE_HEADER, LOCALES, PATHNAME_HEADER, type Locale } from '@/utilities/locale'

function isLocaleSegment(segment: string): segment is Locale {
  return (LOCALES as readonly string[]).includes(segment)
}

/**
 * Locale routing (D-009 follow-up). English is unprefixed at the root; every other locale is
 * routed under its own `/xx` prefix, rewritten internally to the same physical route with the
 * resolved locale carried on the `x-locale` request header (see `getLocale.ts`). `/en/...` is a
 * permanent redirect to the unprefixed equivalent — there's exactly one canonical URL per page.
 *
 * `/posts` was renamed to `/lab` (the `posts` Payload collection slug is unchanged, only the
 * public path moved — see `src/i18n/routes.ts`). A leading `posts` logical segment is rewritten
 * to `lab` here too, so an old `/posts...` or `/xx/posts...` link resolves with one redirect
 * instead of bouncing through the retired route first.
 *
 * Runs Node.js-only (Next 16's `proxy.ts` convention has no Edge runtime option), so this can
 * grow beyond string/URL manipulation without hitting Edge-runtime API limits.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const [, first, ...rest] = pathname.split('/')

  const isExplicitEnglish = first === DEFAULT_LOCALE
  const hasLocalePrefix = isLocaleSegment(first)
  // English is never a URL prefix, even though it's a member of `LOCALES` for other purposes.
  const localeSegment = hasLocalePrefix && !isExplicitEnglish ? first : null
  const logicalSegments = isExplicitEnglish || hasLocalePrefix ? rest : [first, ...rest]

  const renamed = logicalSegments[0] === 'posts'
  if (renamed) logicalSegments[0] = 'lab'

  if (isExplicitEnglish || renamed) {
    const targetPrefix = localeSegment ? `/${localeSegment}` : ''
    const target = `${targetPrefix}/${logicalSegments.join('/')}${search}`
    return NextResponse.redirect(new URL(target || '/', request.url), 308)
  }

  const requestHeaders = new Headers(request.headers)
  // The locale switcher needs the original prefixed path to preserve the logical route; see
  // `getPathname.ts` / `src/i18n/contentReady.ts`.
  requestHeaders.set(PATHNAME_HEADER, pathname)

  if (hasLocalePrefix) {
    requestHeaders.set(LOCALE_HEADER, first)
    const logicalPath = `/${logicalSegments.join('/')}` || '/'
    return NextResponse.rewrite(new URL(`${logicalPath}${search}`, request.url), {
      request: { headers: requestHeaders },
    })
  }

  requestHeaders.set(LOCALE_HEADER, DEFAULT_LOCALE)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  // Skip /admin, /api, /_next, the live-preview endpoint, and any path with a file extension
  // (static assets) — everything else is a locale-routable page.
  matcher: ['/((?!admin|api|_next|next/preview|.*\\..*).*)'],
}

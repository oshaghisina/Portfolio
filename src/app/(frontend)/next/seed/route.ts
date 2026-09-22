import { createLocalReq, getPayload } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'
import { headers } from 'next/headers'

import { LOCALES } from '@/utilities/locale'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

/**
 * The seed writes everything with `disableRevalidate` (the per-document hooks would otherwise
 * fire hundreds of times), but it runs *inside* the live app, whose route and `unstable_cache`
 * entries are very much alive — so bust them once here. Also on failure: a half-finished seed
 * leaves the DB partly cleared, and a stale nav hiding that is worse than showing the true state.
 * (Lives here rather than in `seed()` because that module also runs outside Next, e.g.
 * `pnpm seed:case-studies`, where `next/cache` would throw.)
 */
function revalidateAfterSeed() {
  for (const global of ['header', 'footer', 'about'] as const) {
    for (const locale of LOCALES) revalidateTag(`global_${global}_${locale}`, 'max')
  }
  for (const tag of ['pages-sitemap', 'posts-sitemap', 'projects-sitemap', 'redirects']) {
    revalidateTag(tag, 'max')
  }
  revalidatePath('/', 'layout')
}

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    // At this point you should pass in a user, locale, and any other context you need for the Local API
    const payloadReq = await createLocalReq({ user }, payload)

    await seed({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding data' })
    return new Response('Error seeding data.', { status: 500 })
  } finally {
    revalidateAfterSeed()
  }
}

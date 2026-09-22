/**
 * Locale readiness gate (real Payload, Mongo from `.env`): a document unpublished in a locale
 * must never read as ready, and the `/lab` archive root — which has no `pages` document behind
 * it — must be judged by whether the locale has any published post, not by a stale slug lookup.
 * Every write passes `disableRevalidate`, so no `revalidatePath` runs outside Next.
 */
import type { Payload } from 'payload'

import config from '@/payload.config'
import { getPayload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { isLogicalPathReady } from '@/i18n/contentReady'
import { docPath } from '@/i18n/routes'

let payload: Payload
let id: string | undefined

const slug = `it-post-${Date.now()}`
const context = { disableRevalidate: true }

const richText = (text: string) => ({
  root: {
    type: 'root' as const,
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

describe('contentReady — locale readiness gate', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
  })

  afterAll(async () => {
    if (id) await payload.delete({ collection: 'posts', id, context })
  })

  it('an English-only post is not ready in another locale, and a draft is invisible to public queries', async () => {
    const doc = await payload.create({
      collection: 'posts',
      context,
      data: {
        title: 'Integration post',
        slug,
        generateSlug: false,
        content: richText('English body.'),
        _status: 'published',
      },
    })
    id = doc.id

    expect(await isLogicalPathReady(docPath('posts', slug), 'fa')).toBe(false)

    // The mechanism `getDocument.ts` relies on: a doc unpublished in the requested locale must
    // be excluded by access control, not merely left with empty leaf fields.
    const draftLocaleView = await payload.find({
      collection: 'posts',
      draft: false,
      overrideAccess: false,
      locale: 'fa',
      fallbackLocale: false,
      where: { slug: { equals: slug } },
    })
    expect(draftLocaleView.totalDocs).toBe(0)
  })

  it('publishing the Persian copy makes it ready in fa only', async () => {
    await payload.update({
      collection: 'posts',
      id: id!,
      context,
      locale: 'fa',
      data: {
        title: 'پست آزمایشی',
        content: richText('متن فارسی.'),
        _status: 'published',
      },
    })

    expect(await isLogicalPathReady(docPath('posts', slug), 'fa')).toBe(true)
    expect(await isLogicalPathReady(docPath('posts', slug), 'de')).toBe(false)
  })

  it('the /lab archive root is ready in a locale once it has a published post there, not by a stale pages-slug lookup', async () => {
    // No page named `posts`/`lab` exists — a pre-fix `contentReady` would misread this as a
    // missing `pages` doc and always report `false`, even with real published fa posts (like
    // the one this suite just published above).
    expect(await isLogicalPathReady('/lab', 'fa')).toBe(true)
    // No seed or fixture in this repo publishes a post in German — a real empty-locale case.
    expect(await isLogicalPathReady('/lab', 'de')).toBe(false)
  })
})

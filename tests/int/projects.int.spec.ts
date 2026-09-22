/**
 * Projects + case studies (real Payload, Mongo from `.env`): the publication rules the route
 * relies on — a draft stays private, an archive entry is not a case study, a case study cannot be
 * published empty, per-locale publishing merges translated copy into the same block rows, and
 * the admin preview path is locale-aware. Every write passes `disableRevalidate`, so no
 * `revalidatePath` runs outside Next.
 */
import type { Payload, PayloadRequest } from 'payload'

import config from '@/payload.config'
import { getPayload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { isLogicalPathReady } from '@/i18n/contentReady'
import { hasPublicCaseStudy, projectPath } from '@/i18n/routes'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

let payload: Payload
let id: string | undefined

const slug = `it-case-study-${Date.now()}`
const context = { disableRevalidate: true }

const narrative = (heading: string) => ({
  id: 'it-s01',
  blockType: 'csNarrative' as const,
  label: 'context' as const,
  heading,
})

describe('Projects — case-study publication rules', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
  })

  afterAll(async () => {
    if (id) await payload.delete({ collection: 'projects', id, context })
  })

  it('keeps a draft invisible to public queries and unready in every locale', async () => {
    const doc = await payload.create({
      collection: 'projects',
      context,
      draft: true,
      data: {
        title: 'Integration case study',
        slug,
        generateSlug: false,
        company: 'Test',
        summary: 'A project that exists only for this test run.',
        order: 999,
        caseStudyStatus: 'none',
        _status: 'draft',
      },
    })
    id = doc.id

    const visible = await payload.find({
      collection: 'projects',
      draft: false,
      overrideAccess: false,
      where: { slug: { equals: slug } },
    })
    expect(visible.totalDocs).toBe(0)
    expect(await isLogicalPathReady(projectPath({ slug }), 'fa')).toBe(false)
  })

  it('publishing the archive entry does not make it a case study', async () => {
    await payload.update({
      collection: 'projects',
      id: id!,
      context,
      data: { _status: 'published' },
    })

    const visible = await payload.find({
      collection: 'projects',
      draft: false,
      overrideAccess: false,
      where: { slug: { equals: slug } },
    })
    expect(visible.totalDocs).toBe(1)
    expect(hasPublicCaseStudy(visible.docs[0])).toBe(false)
  })

  it('refuses to publish a case study without a single section', async () => {
    await expect(
      payload.update({
        collection: 'projects',
        id: id!,
        context,
        data: { caseStudyStatus: 'published', sections: [] },
      }),
    ).rejects.toThrow()
  })

  it('publishes the English case study without advertising other locales', async () => {
    await payload.update({
      collection: 'projects',
      id: id!,
      context,
      locale: 'en',
      data: { caseStudyStatus: 'published', sections: [narrative('English heading')] },
    })

    const doc = await payload.findByID({
      collection: 'projects',
      id: id!,
      locale: 'en',
      fallbackLocale: false,
    })
    expect(hasPublicCaseStudy(doc)).toBe(true)
    expect(await isLogicalPathReady(projectPath({ slug }), 'fa')).toBe(false)
  })

  it('merges a Persian copy into the same block rows and publishes only fa', async () => {
    await payload.update({
      collection: 'projects',
      id: id!,
      context,
      locale: 'fa',
      data: {
        title: 'مطالعهٔ موردی آزمایشی',
        company: 'آزمایش',
        summary: 'خلاصهٔ آزمایشی',
        sections: [narrative('عنوان فارسی')],
        _status: 'published',
      },
    })

    expect(await isLogicalPathReady(projectPath({ slug }), 'fa')).toBe(true)
    expect(await isLogicalPathReady(projectPath({ slug }), 'de')).toBe(false)

    const en = await payload.findByID({
      collection: 'projects',
      id: id!,
      locale: 'en',
      fallbackLocale: false,
    })
    const fa = await payload.findByID({
      collection: 'projects',
      id: id!,
      locale: 'fa',
      fallbackLocale: false,
    })
    expect(en.sections).toHaveLength(1)
    expect(en.sections?.[0]).toMatchObject({ id: 'it-s01', heading: 'English heading' })
    expect(fa.sections?.[0]).toMatchObject({ id: 'it-s01', heading: 'عنوان فارسی' })
  })

  it('builds a locale-aware admin preview path for projects', () => {
    const url = generatePreviewPath({
      collection: 'projects',
      slug,
      req: { locale: 'fa' } as PayloadRequest,
    })
    expect(url).toContain(`path=${encodeURIComponent(`/fa/work/${slug}`)}`)
  })
})

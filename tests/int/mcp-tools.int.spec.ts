import { beforeEach, describe, expect, it, vi } from 'vitest'

const { revalidatePath, revalidateTag } = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}))
vi.mock('next/cache', () => ({ revalidatePath, revalidateTag }))

import { mcpTools, revalidateSite, setProjectVisibility } from '@/plugins/mcpTools'

const text = (r: { content: Array<{ text: string }> }) => r.content[0].text

function fakeReq({
  copy = { title: 'Title' } as Record<string, unknown>,
  found = [{ id: 'p1' }] as unknown[],
  failOn = '',
}: { copy?: Record<string, unknown>; found?: unknown[]; failOn?: string } = {}) {
  const payload = {
    find: vi.fn(async () => ({ docs: found })),
    findByID: vi.fn(async ({ locale }: { locale: string }) =>
      locale === 'ja' ? { title: '' } : copy,
    ),
    update: vi.fn(async ({ locale }: { locale: string }) => {
      if (locale === failOn) throw new Error('not allowed')
      return {}
    }),
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { payload, req: { payload, user: { id: 'u1' } } as any }
}

describe('MCP custom tools', () => {
  beforeEach(() => {
    revalidateTag.mockClear()
    revalidatePath.mockClear()
  })

  it('registers both tools by name', () => {
    expect(mcpTools.map((t) => t.name)).toEqual(['revalidateSite', 'setProjectVisibility'])
  })

  describe('revalidateSite', () => {
    it('refreshes the three sitemaps by default', async () => {
      await revalidateSite({})
      expect(revalidateTag.mock.calls.map((c) => c[0])).toEqual([
        'projects-sitemap',
        'pages-sitemap',
        'posts-sitemap',
      ])
    })

    it('refreshes a global in every language and only what was asked for', async () => {
      await revalidateSite({ globals: ['footer'], paths: ['/de/work/faymen'] })
      const tags = revalidateTag.mock.calls.map((c) => c[0])
      expect(tags).toHaveLength(7)
      expect(tags).toContain('global_footer_de')
      expect(tags).not.toContain('projects-sitemap')
      expect(revalidatePath).toHaveBeenCalledWith('/de/work/faymen')
    })

    it('rejects a tag it does not know and a path that climbs out', async () => {
      expect(text(await revalidateSite({ tags: ['everything'] }))).toMatch(/^Error/)
      expect(text(await revalidateSite({ paths: ['/a/../b'] }))).toMatch(/\.\./)
      expect(text(await revalidateSite({ paths: ['work'] }))).toMatch(/^Error/)
      expect(revalidateTag).not.toHaveBeenCalled()
      expect(revalidatePath).not.toHaveBeenCalled()
    })
  })

  describe('setProjectVisibility', () => {
    it('hides a project in all seven languages with access control on', async () => {
      const { payload, req } = fakeReq()
      const out = text(await setProjectVisibility({ slug: 'demo', visible: false }, req))
      expect(payload.update).toHaveBeenCalledTimes(7)
      const first = payload.update.mock.calls[0][0] as Record<string, unknown>
      expect(first).toMatchObject({
        collection: 'projects',
        data: { _status: 'draft' },
        id: 'p1',
        overrideAccess: false,
      })
      expect(out).toContain('- de: hidden')
      expect(payload.findByID).not.toHaveBeenCalled()
    })

    it('publishes only the languages that have their own copy', async () => {
      const { payload, req } = fakeReq()
      const out = text(await setProjectVisibility({ slug: 'demo', visible: true }, req))
      expect(payload.update).toHaveBeenCalledTimes(6)
      expect(out).toContain('- ja: skipped, no copy in this language')
      expect(out).toContain('- en: published')
    })

    it('writes nothing on a dry run', async () => {
      const { payload, req } = fakeReq()
      const out = text(
        await setProjectVisibility({ slug: 'demo', visible: false, dryRun: true }, req),
      )
      expect(payload.update).not.toHaveBeenCalled()
      expect(out).toContain('- fa: would hide')
    })

    it('limits the change to the languages asked for', async () => {
      const { payload, req } = fakeReq()
      await setProjectVisibility({ slug: 'demo', visible: false, locales: ['de', 'fr'] }, req)
      expect(payload.update.mock.calls.map((c) => (c[0] as { locale: string }).locale)).toEqual([
        'de',
        'fr',
      ])
    })

    it('reports a failed language and keeps going', async () => {
      const { payload, req } = fakeReq({ failOn: 'es' })
      const out = text(await setProjectVisibility({ slug: 'demo', visible: false }, req))
      expect(out).toContain('- es: failed, not allowed')
      expect(payload.update).toHaveBeenCalledTimes(7)
    })

    it('says so when the slug is unknown', async () => {
      const { payload, req } = fakeReq({ found: [] })
      const out = text(await setProjectVisibility({ slug: 'nope', visible: false }, req))
      expect(out).toMatch(/no project with slug "nope"/)
      expect(payload.update).not.toHaveBeenCalled()
    })
  })
})

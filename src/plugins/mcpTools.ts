import { revalidatePath, revalidateTag } from 'next/cache'
import type { PayloadRequest } from 'payload'
import { z } from 'zod'

import { LOCALES } from '@/utilities/locale'

/**
 * Two custom tools for the Payload MCP endpoint (Docs/Production-Update-Policy.md, D-052).
 *
 * `revalidateSite` — a raw copy into Mongo (scripts/seed/sync-case-study.ts) skips every Payload
 * hook, so the cached sitemaps and globals stay stale until the container restarts. This tool
 * runs the same `revalidateTag` / `revalidatePath` calls the hooks do, with no restart.
 *
 * `setProjectVisibility` — the generic `updateProjects` tool changes one locale per call, so
 * hiding or restoring a project took seven calls. This one does all locales in a single call, and
 * only publishes a locale that has its own copy. Both go through `payload.update` with access
 * control on, so a key that may not edit projects cannot use it.
 */

type ToolReply = { content: Array<{ text: string; type: 'text' }> }

const reply = (lines: string[]): ToolReply => ({
  content: [{ type: 'text', text: lines.join('\n') }],
})

const SITEMAP_TAGS = ['projects-sitemap', 'pages-sitemap', 'posts-sitemap', 'redirects'] as const
const GLOBALS = ['header', 'footer', 'about'] as const

const revalidateShape = {
  tags: z
    .array(z.enum(SITEMAP_TAGS))
    .optional()
    .describe('Cached lists to refresh. Default: the three sitemaps.'),
  globals: z
    .array(z.enum(GLOBALS))
    .optional()
    .describe('Header, footer or about: refreshed for every language.'),
  paths: z
    .array(z.string().startsWith('/').max(200))
    .max(20)
    .optional()
    .describe('Page paths to refresh, for example /work/faymen or /de/work/faymen.'),
}

export const revalidateSite = async (
  args: Record<string, unknown>,
  _req?: PayloadRequest,
): Promise<ToolReply> => {
  const parsed = z.object(revalidateShape).safeParse(args)
  if (!parsed.success) return reply([`Error: ${parsed.error.issues[0]?.message ?? 'bad input'}`])

  const { globals = [], paths = [] } = parsed.data
  const tags = parsed.data.tags ?? (globals.length || paths.length ? [] : SITEMAP_TAGS.slice(0, 3))
  if (paths.some((p) => p.includes('..'))) return reply(['Error: paths cannot contain ".."'])

  for (const tag of tags) revalidateTag(tag, 'max')
  for (const name of globals) {
    for (const locale of LOCALES) revalidateTag(`global_${name}_${locale}`, 'max')
  }
  for (const path of paths) revalidatePath(path)

  return reply([
    'Refreshed:',
    ...tags.map((t) => `- ${t}`),
    ...globals.map((g) => `- ${g} (${LOCALES.length} languages)`),
    ...paths.map((p) => `- ${p}`),
  ])
}

const visibilityShape = {
  slug: z.string().min(1).describe('The project slug, for example arvan-cloud-platform-redesign.'),
  visible: z.boolean().describe('true publishes the project, false hides it (back to draft).'),
  locales: z
    .array(z.enum(LOCALES))
    .optional()
    .describe('Languages to change. Default: all seven.'),
  dryRun: z.boolean().optional().describe('true only reports the plan and writes nothing.'),
}

export const setProjectVisibility = async (
  args: Record<string, unknown>,
  req: PayloadRequest,
): Promise<ToolReply> => {
  const parsed = z.object(visibilityShape).safeParse(args)
  if (!parsed.success) return reply([`Error: ${parsed.error.issues[0]?.message ?? 'bad input'}`])

  const { slug, visible, dryRun = false } = parsed.data
  const locales = parsed.data.locales ?? [...LOCALES]
  const { payload } = req
  const access = { overrideAccess: false, req, user: req.user } as const

  const found = await payload.find({
    collection: 'projects',
    depth: 0,
    draft: true,
    fallbackLocale: false,
    limit: 1,
    locale: 'en',
    where: { slug: { equals: slug } },
    ...access,
  })
  const project = found.docs[0]
  if (!project) {
    return reply([`Error: no project with slug "${slug}" (or this key cannot read projects).`])
  }

  const lines = [`${dryRun ? 'Plan for' : 'Result for'} "${slug}": ${visible ? 'publish' : 'hide'}`]
  for (const locale of locales) {
    if (visible) {
      // Publishing takes the latest saved draft live, so a language with no copy stays hidden.
      const copy = await payload.findByID({
        collection: 'projects',
        depth: 0,
        draft: true,
        fallbackLocale: false,
        id: project.id,
        locale,
        ...access,
      })
      if (!copy?.title) {
        lines.push(`- ${locale}: skipped, no copy in this language`)
        continue
      }
    }
    if (dryRun) {
      lines.push(`- ${locale}: would ${visible ? 'publish' : 'hide'}`)
      continue
    }
    try {
      await payload.update({
        collection: 'projects',
        data: { _status: visible ? 'published' : 'draft' },
        depth: 0,
        id: project.id,
        locale,
        overrideLock: true,
        ...access,
      })
      lines.push(`- ${locale}: ${visible ? 'published' : 'hidden'}`)
    } catch (error) {
      lines.push(`- ${locale}: failed, ${error instanceof Error ? error.message : 'unknown error'}`)
    }
  }
  return reply(lines)
}

export const mcpTools = [
  {
    name: 'revalidateSite',
    description:
      'Refresh cached site data without a restart: the sitemaps (default), the header, footer or about, or specific page paths. Use after a change that skipped the normal save hooks, such as a case-study sync.',
    parameters: revalidateShape,
    handler: (args: Record<string, unknown>, req: PayloadRequest) => revalidateSite(args, req),
  },
  {
    name: 'setProjectVisibility',
    description:
      'Publish or hide one project in every language in a single call. Publishing puts the latest saved draft live and skips languages without their own copy. Use dryRun to preview.',
    parameters: visibilityShape,
    handler: (args: Record<string, unknown>, req: PayloadRequest) =>
      setProjectVisibility(args, req),
  },
]

/**
 * Production: remove Lab from Header/Footer via Payload MCP, then relabel locales.
 * Uses PAYLOAD_MCP_URL + PAYLOAD_API_KEY from .env (currently pointed at prod).
 *
 *   pnpm exec tsx scripts/seed/disable-lab-nav-prod.ts
 */
import 'dotenv/config'

import { navCopy } from '../../src/endpoints/seed/nav-copy'
import { LOCALES, type Locale } from '../../src/utilities/locale'

const mcpUrl = process.env.PAYLOAD_MCP_URL
const key = process.env.PAYLOAD_API_KEY

if (!mcpUrl || !key) {
  console.error('Missing PAYLOAD_MCP_URL or PAYLOAD_API_KEY')
  process.exit(1)
}

if (/127\.0\.0\.1|localhost/.test(mcpUrl)) {
  console.error('PAYLOAD_MCP_URL looks local — refuse to run prod script against localhost')
  process.exit(1)
}

function parseSse(text: string) {
  const lines = text.split('\n').filter((l) => l.startsWith('data: '))
  if (!lines.length) throw new Error(`No SSE data: ${text.slice(0, 500)}`)
  return JSON.parse(lines[lines.length - 1]!.slice(6)) as {
    result?: { content?: { type: string; text?: string }[]; isError?: boolean }
    error?: unknown
  }
}

async function rpc(method: string, params: Record<string, unknown> = {}) {
  const res = await fetch(mcpUrl!, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
    },
    body: JSON.stringify({ jsonrpc: '2.0', id: String(Date.now()), method, params }),
  })
  if (!res.ok) throw new Error(`MCP HTTP ${res.status}: ${(await res.text()).slice(0, 500)}`)
  return parseSse(await res.text())
}

async function callTool(name: string, args: Record<string, unknown>) {
  const data = await rpc('tools/call', { name, arguments: args })
  if (data.error) throw new Error(`${name} rpc error: ${JSON.stringify(data.error)}`)
  if (data.result?.isError) throw new Error(`${name} tool error: ${JSON.stringify(data.result)}`)
  return data
}

function extractJson<T>(toolResult: Awaited<ReturnType<typeof callTool>>): T {
  const text = toolResult.result?.content?.find((c) => c.type === 'text')?.text ?? ''
  const match = text.match(/```json\n([\s\S]*?)\n```/)
  if (!match?.[1]) throw new Error(`Could not parse JSON from tool result: ${text.slice(0, 400)}`)
  return JSON.parse(match[1]) as T
}

type NavLink = {
  type?: string | null
  url?: string | null
  label?: string | null
  newTab?: boolean | null
  reference?: { relationTo?: string; value?: string } | null
}

type NavRow = { id?: string; link?: NavLink }

type HeaderDoc = { navItems?: NavRow[]; _status?: string }
type FooterDoc = {
  navItems?: NavRow[]
  _status?: string
  description?: string | null
  pagesTitle?: string | null
  navLabel?: string | null
  about?: Record<string, unknown>
  contact?: Record<string, unknown>
  copyright?: string | null
  social?: { kind: string; href: string; ariaLabel: string; id?: string }[]
}

function isLabRow(row: NavRow): boolean {
  const url = row.link?.url
  return url === '/lab' || url === '/posts'
}

function serializeLink(link: NavLink | undefined, label: string) {
  if (!link) throw new Error('Missing link')
  const out: Record<string, unknown> = {
    type: link.type,
    label,
  }
  if (link.newTab != null) out.newTab = link.newTab
  if (link.type === 'custom') out.url = link.url
  if (link.type === 'reference' && link.reference) {
    out.reference = {
      relationTo: link.reference.relationTo,
      value: String(link.reference.value),
    }
  }
  return out
}

function serializeRows(rows: NavRow[], labels: string[]) {
  if (rows.length !== labels.length) {
    throw new Error(`Row/label length mismatch: ${rows.length} vs ${labels.length}`)
  }
  return rows.map((row, i) => ({
    link: serializeLink(row.link, labels[i]!),
  }))
}

const headerEn = extractJson<HeaderDoc>(
  await callTool('findHeader', { depth: 0, locale: 'en', fallbackLocale: 'false' }),
)
const footerEn = extractJson<FooterDoc>(
  await callTool('findFooter', { depth: 0, locale: 'en', fallbackLocale: 'false' }),
)

const headerRows = (headerEn.navItems ?? []).filter((row) => !isLabRow(row))
const footerRows = (footerEn.navItems ?? []).filter((row) => !isLabRow(row))

if (headerRows.length !== 4) {
  throw new Error(`Expected 4 header rows after Lab removal, got ${headerRows.length}`)
}
if (footerRows.length !== 3) {
  throw new Error(`Expected 3 footer rows after Lab removal, got ${footerRows.length}`)
}

// Shape change once on English — do not loop filter-per-locale (collapses shared arrays).
await callTool('updateHeader', {
  locale: 'en',
  _status: 'published',
  depth: 0,
  navItems: serializeRows(headerRows, [
    navCopy.en.header.work,
    navCopy.en.header.about,
    navCopy.en.header.experience,
    navCopy.en.header.contact,
  ]),
})

await callTool('updateFooter', {
  locale: 'en',
  _status: 'published',
  depth: 0,
  navItems: serializeRows(footerRows, [
    navCopy.en.header.work,
    navCopy.en.header.about,
    navCopy.en.header.experience,
  ]),
})

const results: Record<string, unknown> = { en: { header: 4, footer: 3 } }

for (const locale of LOCALES.filter((l): l is Locale => l !== 'en')) {
  const copy = navCopy[locale]
  await callTool('updateHeader', {
    locale,
    _status: 'published',
    depth: 0,
    navItems: serializeRows(headerRows, [
      copy.header.work,
      copy.header.about,
      copy.header.experience,
      copy.header.contact,
    ]),
  })

  await callTool('updateFooter', {
    locale,
    _status: 'published',
    depth: 0,
    navItems: serializeRows(footerRows, [copy.header.work, copy.header.about, copy.header.experience]),
    description: copy.footer.description,
    pagesTitle: copy.footer.pagesTitle,
    navLabel: copy.footer.navLabel,
  })

  results[locale] = { header: 4, footer: 3 }
}

const verifyH = extractJson<HeaderDoc>(
  await callTool('findHeader', { depth: 0, locale: 'en', fallbackLocale: 'false' }),
)
const verifyF = extractJson<FooterDoc>(
  await callTool('findFooter', { depth: 0, locale: 'en', fallbackLocale: 'false' }),
)

console.log(
  JSON.stringify(
    {
      ok: true,
      mcpHost: mcpUrl.replace(/^(https?:\/\/[^/]+).*/, '$1'),
      results,
      header: (verifyH.navItems ?? []).map((r) => ({ label: r.link?.label, url: r.link?.url, type: r.link?.type })),
      footer: (verifyF.navItems ?? []).map((r) => ({ label: r.link?.label, url: r.link?.url, type: r.link?.type })),
    },
    null,
    2,
  ),
)

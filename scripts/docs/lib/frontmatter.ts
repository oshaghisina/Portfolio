import fs from 'node:fs'

import YAML from 'yaml'

export interface Parsed {
  /** Raw YAML between the fences, without the fences; null if no frontmatter */
  fm: string | null
  data: Record<string, unknown>
  body: string
}

const FENCE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

/** Split a markdown string into frontmatter YAML and body. */
export function splitFrontmatter(raw: string): { fm: string | null; body: string } {
  const m = raw.match(FENCE)
  if (!m) return { fm: null, body: raw }
  return { fm: m[1] ?? '', body: raw.slice(m[0].length) }
}

export function parseFrontmatter(raw: string): Parsed {
  const { fm, body } = splitFrontmatter(raw)
  if (fm === null) return { fm, data: {}, body }
  const parsed = YAML.parse(fm)
  const data = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  return { fm, data: data as Record<string, unknown>, body }
}

export function readDoc(file: string): Parsed & { file: string; raw: string } {
  const raw = fs.readFileSync(file, 'utf8')
  return { file, raw, ...parseFrontmatter(raw) }
}

/** Render a scalar or flat array as inline YAML. Strings are always double-quoted. */
export function formatValue(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(formatValue).join(', ')}]`
  if (typeof value === 'string') return JSON.stringify(value)
  if (value === null || value === undefined) return '""'
  return String(value)
}

/**
 * Set top-level frontmatter keys by editing lines in place, so comments, ordering and
 * quoting of everything else are untouched. Keys that don't exist are appended before the
 * closing fence. Values must be scalars or flat arrays; use `replaceBlock` for maps.
 */
export function setFields(raw: string, fields: Record<string, unknown>): string {
  const m = raw.match(FENCE)
  if (!m) throw new Error('setFields: document has no frontmatter')
  const lines = (m[1] ?? '').split('\n')
  const remaining = new Map(Object.entries(fields))

  const out = lines.map((line) => {
    const km = line.match(/^([A-Za-z0-9_]+):(\s*)(.*)$/)
    if (!km) return line
    const key = km[1] as string
    if (!remaining.has(key)) return line
    const rest = km[3] ?? ''
    // keep a trailing "  # comment" if present, but not a '#' inside a quoted value
    const cm = rest.match(/^(.*?)(\s+#.*)$/)
    const comment = cm && !isInsideQuotes(cm[1] ?? '') ? (cm[2] ?? '') : ''
    const value = formatValue(remaining.get(key))
    remaining.delete(key)
    return `${key}:${km[2] || ' '}${value}${comment}`
  })
  for (const [key, value] of remaining) out.push(`${key}: ${formatValue(value)}`)

  return `---\n${out.join('\n')}\n---\n${raw.slice(m[0].length)}`
}

/**
 * Replace a top-level key and all of its indented continuation lines with a new block
 * (e.g. a `period:` map). `block` is full YAML text for the key, without trailing newline.
 */
export function replaceBlock(raw: string, key: string, block: string): string {
  const m = raw.match(FENCE)
  if (!m) throw new Error('replaceBlock: document has no frontmatter')
  const lines = (m[1] ?? '').split('\n')
  const start = lines.findIndex((l) => l.startsWith(`${key}:`))
  const newLines = block.split('\n')
  if (start === -1) {
    lines.push(...newLines)
  } else {
    let end = start + 1
    while (end < lines.length && /^(\s+\S|\s*$)/.test(lines[end] ?? '') && lines[end] !== '') end++
    lines.splice(start, end - start, ...newLines)
  }
  return `---\n${lines.join('\n')}\n---\n${raw.slice(m[0].length)}`
}

function isInsideQuotes(prefix: string): boolean {
  const dq = (prefix.match(/"/g) ?? []).length
  const sq = (prefix.match(/'/g) ?? []).length
  return dq % 2 === 1 || sq % 2 === 1
}

export function writeFile(file: string, content: string) {
  fs.writeFileSync(file, content)
}

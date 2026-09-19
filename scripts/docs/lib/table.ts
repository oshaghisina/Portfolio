const EMPTY = '—'

export function cell(value: unknown): string {
  if (value === null || value === undefined) return EMPTY
  if (Array.isArray(value)) return value.length ? value.map(cell).join(', ') : EMPTY
  const s = String(value).trim()
  if (s === '') return EMPTY
  return s.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ')
}

/** Build a GitHub-flavoured markdown table. An empty `rows` renders one placeholder row. */
export function mdTable(headers: string[], rows: string[][]): string {
  const head = `| ${headers.join(' | ')} |`
  const sep = `|${headers.map(() => '---').join('|')}|`
  const body = rows.length
    ? rows.map((r) => `| ${headers.map((_, i) => cell(r[i])).join(' | ')} |`)
    : [`| ${headers.map(() => EMPTY).join(' | ')} |`]
  return [head, sep, ...body].join('\n')
}

/** Parse the rows of a markdown table (skips header + separator). Cells are trimmed. */
export function parseTable(block: string): string[][] {
  const lines = block
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('|'))
  return lines.slice(2).map((l) =>
    l
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split(/(?<!\\)\|/)
      .map((c) => c.trim().replace(/\\\|/g, '|')),
  )
}

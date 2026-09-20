/**
 * Design tokens in the W3C DTCG JSON format (2025 object forms), as written to
 * Docs/Design-System/tokens/<benchmark>.tokens.json.
 *
 * Leaf tokens carry `$value` + `$type`; groups may carry a `$type` that leaves inherit. Fluid
 * sizes (`clamp(min, vw, max)`) are a house convention: a group with `min` / `vw` / `max`
 * children and `$extensions[TOKEN_EXT_NS].fluid = true`. Provenance lives under
 * `$extensions[TOKEN_EXT_NS]` (see `TokenExt`).
 */
import fs from 'node:fs'

import { TOKEN_EXT_NS, TOKEN_GROUPS } from './schema'

export type Origin = 'stylesheet' | 'computed' | 'manual'

export interface TokenExt {
  /** CSS custom property the value came from, e.g. `--fs-h1` */
  var?: string
  origin?: Origin
  /** Element selector + sample count when `origin: computed` */
  selector?: string
  sample?: number
  /** Verbatim CSS value */
  css?: string
  /** Marks a `{ min, vw, max }` composite group */
  fluid?: boolean
  vwUnit?: 'vw' | 'vh'
  /** DS item ids whose `tokens[]` reference this path — written by docs:index */
  items?: string[]
  /** ISO date when a re-capture no longer found the source; the token is kept, never deleted */
  stale?: string
  /** For non-cubic easings that were approximated */
  approximation?: boolean
  /** House tokens only: `<benchmark>:<path>` of the measured token this value was derived from */
  derivedFrom?: string
  /** House tokens only: the DS item that decided this value */
  item?: string
}

export interface Token {
  $value: unknown
  $type?: string
  $description?: string
  $extensions?: Record<string, unknown>
}

export interface Group {
  $type?: string
  $description?: string
  $extensions?: Record<string, unknown>
  [key: string]: unknown
}

export type TokensFile = Group

export interface FileExt {
  benchmark: string
  url?: string
  captured?: string
  stylesheets?: string[]
  viewport?: { width: number; height: number }
  unmappedVars?: Record<string, string>
}

const isObj = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === 'object' && !Array.isArray(v)
export const isToken = (v: unknown): v is Token => isObj(v) && '$value' in v
const isReserved = (k: string) => k.startsWith('$')

export function ext(node: Token | Group): TokenExt {
  const e = node.$extensions?.[TOKEN_EXT_NS]
  return isObj(e) ? (e as TokenExt) : {}
}

export function setExt(node: Token | Group, patch: Partial<TokenExt>) {
  const all = isObj(node.$extensions) ? node.$extensions : {}
  const cur = ext(node)
  const next: Record<string, unknown> = { ...cur, ...patch }
  for (const k of Object.keys(next)) if (next[k] === undefined) delete next[k]
  node.$extensions = { ...all, [TOKEN_EXT_NS]: next }
}

export function fileExt(json: TokensFile): FileExt | null {
  const e = json.$extensions?.[TOKEN_EXT_NS]
  return isObj(e) && typeof e.benchmark === 'string' ? (e as unknown as FileExt) : null
}

export const isFluidGroup = (v: unknown): v is Group =>
  isObj(v) && !isToken(v) && ext(v as Group).fluid === true

// ---------------------------------------------------------------------------
// Read / walk

export function readTokens(file: string): TokensFile | null {
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, 'utf8')) as TokensFile
}

export interface FlatEntry {
  path: string
  kind: 'token' | 'fluid'
  node: Token | Group
  /** Own or inherited `$type`; undefined when neither is set */
  type?: string
}

/** Every leaf token and fluid group with its dotted path and effective `$type`. */
export function flattenTokens(json: TokensFile): FlatEntry[] {
  const out: FlatEntry[] = []
  const walk = (node: Record<string, unknown>, prefix: string, inherited?: string) => {
    const type = typeof node.$type === 'string' ? node.$type : inherited
    for (const [k, v] of Object.entries(node)) {
      if (isReserved(k) || !isObj(v)) continue
      const p = prefix ? `${prefix}.${k}` : k
      if (isToken(v)) {
        out.push({ path: p, kind: 'token', node: v, type: typeof v.$type === 'string' ? v.$type : type })
      } else if (isFluidGroup(v)) {
        out.push({ path: p, kind: 'fluid', node: v, type: 'dimension' })
        walk(v, p, type)
      } else {
        walk(v, p, type)
      }
    }
  }
  walk(json, '')
  return out
}

/** Node at a dotted path, or undefined. */
export function getAt(json: TokensFile, path: string): unknown {
  let cur: unknown = json
  for (const seg of path.split('.')) {
    if (!isObj(cur)) return undefined
    cur = cur[seg]
  }
  return cur
}

function ensureGroup(json: TokensFile, segments: string[]): Record<string, unknown> {
  let cur: Record<string, unknown> = json
  for (const seg of segments) {
    const next = cur[seg]
    if (!isObj(next) || isToken(next)) cur[seg] = {}
    cur = cur[seg] as Record<string, unknown>
  }
  return cur
}

// ---------------------------------------------------------------------------
// CSS value parsing

export interface Dimension {
  value: number
  unit: string
}
export type Parsed =
  | { type: 'color'; value: { colorSpace: 'srgb' | 'oklch'; components: number[]; hex?: string; alpha?: number } }
  | { type: 'dimension'; value: Dimension }
  | { type: 'duration'; value: Dimension }
  | { type: 'number'; value: number }
  | { type: 'cubicBezier'; value: number[]; approximation?: boolean }
  | { type: 'fontFamily'; value: string[] }
  | { type: 'fluid'; min: Dimension; vw: number; vwUnit: 'vw' | 'vh'; max: Dimension }
  | { type: 'alias'; ref: string }

const round = (n: number, d = 3) => Math.round(n * 10 ** d) / 10 ** d

const NAMED_EASINGS: Record<string, number[]> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
}

function parseDimension(s: string): Dimension | null {
  const m = s.trim().match(/^(-?\d*\.?\d+)(px|rem|em|vw|vh|%|ch)$/)
  return m ? { value: Number(m[1]), unit: m[2] as string } : null
}

function hexToComponents(hex: string): { components: number[]; alpha?: number; hex: string } | null {
  let h = hex.replace('#', '')
  if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('')
  if (h.length !== 6 && h.length !== 8) return null
  const n = (i: number) => parseInt(h.slice(i, i + 2), 16)
  const components = [n(0), n(2), n(4)].map((v) => round(v / 255))
  const alpha = h.length === 8 ? round(n(6) / 255) : undefined
  return { components, alpha, hex: `#${h.slice(0, 6).toUpperCase()}` }
}

/** Parse one CSS value into a token shape; null when it isn't a token-like value. */
export function parseCssValue(raw: string): Parsed | null {
  const s = raw.trim()
  if (!s) return null

  const alias = s.match(/^var\((--[A-Za-z0-9_-]+)(?:,.*)?\)$/)
  if (alias) return { type: 'alias', ref: alias[1] as string }

  if (/^#[0-9a-f]{3,8}$/i.test(s)) {
    const c = hexToComponents(s)
    if (!c) return null
    return { type: 'color', value: { colorSpace: 'srgb', components: c.components, hex: c.hex, ...(c.alpha !== undefined && c.alpha < 1 ? { alpha: c.alpha } : {}) } }
  }
  const rgb = s.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:[\s,/]+(\d*\.?\d+%?))?\s*\)$/i)
  if (rgb) {
    const [r, g, b] = [rgb[1], rgb[2], rgb[3]].map((v) => Number(v))
    const a = rgb[4] ? (rgb[4].endsWith('%') ? Number(rgb[4].slice(0, -1)) / 100 : Number(rgb[4])) : 1
    const hex = `#${[r, g, b].map((v) => (v as number).toString(16).padStart(2, '0')).join('').toUpperCase()}`
    return { type: 'color', value: { colorSpace: 'srgb', components: [r, g, b].map((v) => round((v as number) / 255)), hex, ...(a < 1 ? { alpha: round(a) } : {}) } }
  }
  const oklch = s.match(/^oklch\(\s*(\d*\.?\d+%?)\s+(\d*\.?\d+)\s+(\d*\.?\d+)(?:\s*\/\s*(\d*\.?\d+%?))?\s*\)$/i)
  if (oklch) {
    const l = oklch[1]!.endsWith('%') ? Number(oklch[1]!.slice(0, -1)) / 100 : Number(oklch[1])
    const a = oklch[4] ? (oklch[4].endsWith('%') ? Number(oklch[4].slice(0, -1)) / 100 : Number(oklch[4])) : 1
    return { type: 'color', value: { colorSpace: 'oklch', components: [round(l), round(Number(oklch[2])), round(Number(oklch[3]))], ...(a < 1 ? { alpha: round(a) } : {}) } }
  }

  const clamp = s.match(/^clamp\(\s*([^,]+),\s*([^,]+),\s*([^)]+)\)$/i)
  if (clamp) {
    const min = parseDimension(clamp[1] as string)
    const max = parseDimension(clamp[3] as string)
    const mid = (clamp[2] as string).trim().match(/^(-?\d*\.?\d+)(vw|vh)$/)
    if (min && max && mid) return { type: 'fluid', min, vw: Number(mid[1]), vwUnit: mid[2] as 'vw' | 'vh', max }
    return null
  }

  const dur = s.match(/^(-?\d*\.?\d+)(ms|s)$/)
  if (dur) return { type: 'duration', value: { value: Number(dur[1]), unit: dur[2] as string } }

  const dim = parseDimension(s)
  if (dim) return { type: 'dimension', value: dim }

  const bez = s.match(/^cubic-bezier\(([^)]+)\)$/i)
  if (bez) {
    const nums = (bez[1] as string).split(',').map((n) => Number(n.trim()))
    if (nums.length === 4 && nums.every((n) => Number.isFinite(n))) return { type: 'cubicBezier', value: nums }
    return null
  }
  if (s in NAMED_EASINGS) return { type: 'cubicBezier', value: NAMED_EASINGS[s] as number[] }
  if (/^(linear|spring|steps)\(/i.test(s)) return { type: 'cubicBezier', value: NAMED_EASINGS.ease as number[], approximation: true }

  if (/^-?\d*\.?\d+$/.test(s)) return { type: 'number', value: Number(s) }

  if (s.includes(',') || /^["']/.test(s) || /^[A-Za-z][A-Za-z0-9 -]*$/.test(s)) {
    const families = s.split(',').map((f) => f.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
    // a lone bare word could be anything; only call it a font stack when it is a known generic or quoted
    const generic = /^(serif|sans-serif|monospace|system-ui|ui-monospace|ui-sans-serif|cursive|fantasy|-apple-system)$/
    if (families.length > 1 || /^["']/.test(s) || generic.test(families[0] ?? '')) return { type: 'fontFamily', value: families }
  }
  return null
}

/** A token (or fluid group) built from a parsed value. */
export function tokenFromParsed(p: Parsed): Token | Group | null {
  switch (p.type) {
    case 'color':
      return { $value: p.value, $type: 'color' }
    case 'dimension':
      return { $value: p.value, $type: 'dimension' }
    case 'duration':
      return { $value: p.value, $type: 'duration' }
    case 'number':
      return { $value: p.value, $type: 'number' }
    case 'cubicBezier':
      return { $value: p.value, $type: 'cubicBezier' }
    case 'fontFamily':
      return { $value: p.value, $type: 'fontFamily' }
    case 'fluid': {
      const g: Group = {
        min: { $value: p.min, $type: 'dimension' },
        vw: { $value: p.vw, $type: 'number' },
        max: { $value: p.max, $type: 'dimension' },
      }
      setExt(g, { fluid: true, vwUnit: p.vwUnit })
      return g
    }
    case 'alias':
      return null
  }
}

// ---------------------------------------------------------------------------
// Merge / write

export interface Incoming {
  path: string
  node: Token | Group
  ext: Partial<TokenExt>
}

/**
 * Merge captured tokens into an existing file. Script-owned fields (`$value`, `$type`, `var`,
 * `origin`, `selector`, `sample`, `css`, `fluid`, `vwUnit`, `approximation`) are overwritten;
 * `$description`, `items` and any `origin: manual` token are preserved; tokens missing from
 * `incoming` are marked `stale` (never deleted). Returns the same object, mutated.
 */
export function mergeTokens(existing: TokensFile, incoming: Incoming[], today: string): TokensFile {
  const seen = new Set<string>()
  for (const inc of incoming) {
    seen.add(inc.path)
    const segs = inc.path.split('.')
    const leaf = segs.pop() as string
    const parent = ensureGroup(existing, segs)
    const cur = parent[leaf]
    if (isObj(cur) && ext(cur as unknown as Token).origin === 'manual') continue

    const prev = isObj(cur) ? (cur as Token | Group) : undefined
    const next: Token | Group = { ...inc.node }
    if (prev?.$description) next.$description = prev.$description
    // fluid groups: keep hand-written descriptions on the children too
    if (isFluidGroup(next) && prev && !isToken(prev)) {
      for (const k of ['min', 'vw', 'max']) {
        const pc = prev[k]
        if (isToken(pc) && pc.$description && isToken(next[k])) (next[k] as Token).$description = pc.$description
      }
    }
    const prevExt = prev ? ext(prev) : {}
    const nextExt: TokenExt = { ...prevExt, ...ext(next), ...inc.ext, stale: undefined }
    if (prevExt.items) nextExt.items = prevExt.items
    setExt(next, nextExt)
    parent[leaf] = next
  }
  for (const entry of flattenTokens(existing)) {
    if (seen.has(entry.path)) continue
    // children of a fluid group are covered by their group
    if (entry.kind === 'token' && seen.has(entry.path.replace(/\.(min|vw|max)$/, ''))) continue
    const e = ext(entry.node)
    if (e.origin === 'manual' || e.stale) continue
    if (e.origin) setExt(entry.node, { stale: today })
  }
  return existing
}

/** Rewrite `items` back-references from a map of token path → DS ids. Returns a new object. */
export function setTokenItems(json: TokensFile, itemsByPath: Map<string, string[]>): TokensFile {
  const copy = JSON.parse(JSON.stringify(json)) as TokensFile
  for (const entry of flattenTokens(copy)) {
    const ids = itemsByPath.get(entry.path)
    setExt(entry.node, { items: ids && ids.length ? [...new Set(ids)].sort() : undefined })
    if (Object.keys(ext(entry.node)).length === 0 && entry.node.$extensions) {
      delete entry.node.$extensions[TOKEN_EXT_NS]
      if (Object.keys(entry.node.$extensions).length === 0) delete entry.node.$extensions
    }
  }
  return copy
}

const RESERVED_ORDER = ['$description', '$type', '$value', '$extensions']

function orderKeys(node: Record<string, unknown>, top: boolean): Record<string, unknown> {
  const reserved = RESERVED_ORDER.filter((k) => k in node)
  const rest = Object.keys(node).filter((k) => !isReserved(k))
  const groupOrder = top
    ? [...TOKEN_GROUPS.filter((g) => rest.includes(g)), ...rest.filter((k) => !(TOKEN_GROUPS as readonly string[]).includes(k)).sort()]
    : rest.sort()
  const out: Record<string, unknown> = {}
  for (const k of [...reserved, ...groupOrder]) {
    const v = node[k]
    out[k] = isObj(v) && !isReserved(k) ? orderKeys(v, false) : isObj(v) ? sortPlain(v) : v
  }
  return out
}

function sortPlain(v: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const k of Object.keys(v).sort()) {
    const x = v[k]
    out[k] = isObj(x) ? sortPlain(x) : x
  }
  return out
}

/** Deterministic serialization: reserved keys first, top-level groups in TOKEN_GROUPS order, the rest sorted. */
export function stringifyTokens(json: TokensFile): string {
  return `${JSON.stringify(orderKeys(json, true), null, 2)}\n`
}

/** A fresh file with only the root block. */
export function emptyTokensFile(meta: FileExt, description: string): TokensFile {
  return { $description: description, $extensions: { [TOKEN_EXT_NS]: meta } }
}

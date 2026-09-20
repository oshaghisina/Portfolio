// Server component only: reads the tokens file from disk (node:fs).

import fs from 'node:fs'
import path from 'node:path'

import { flattenTokens, type FlatEntry, type TokensFile } from '../../../../scripts/docs/lib/tokens'
import { contrast, oklchToHex, type Oklch } from '../../../../scripts/tokens/lib/contrast'
import { cssName, cssValue, emitEntries, themeOf, type ThemeName } from '../../../../scripts/tokens/lib/emit'

/** The house tokens, read at render time so the page always shows what theme.css was built from. */
export function loadTokens(): TokensFile {
  const file = path.join(process.cwd(), 'Docs/Design-System/tokens/sina.tokens.json')
  return JSON.parse(fs.readFileSync(file, 'utf8')) as TokensFile
}

export interface Row {
  path: string
  name: string
  variable: string
  css: string
}

const row = (e: FlatEntry): Row => ({ path: e.path, name: e.path.split('.').pop()!, variable: cssName(e.path), css: cssValue(e) })

/** Emittable entries under a prefix (fluid groups included, their children not). */
export function rows(json: TokensFile, prefix: string): Row[] {
  return emitEntries(json)
    .filter((e) => e.path.startsWith(prefix))
    .map(row)
}

export interface ColorRow extends Row {
  oklch: Oklch
  hex: string
  /** contrast against this theme's paper, when opaque */
  onPaper?: number
}

/** Colour roles (not the shadcn slot aliases) of one theme, with contrast against paper. */
export function colorRoles(json: TokensFile, theme: ThemeName): ColorRow[] {
  const entries = flattenTokens(json).filter((e) => themeOf(e.path) === theme)
  const value = (e: FlatEntry) => (e.node as { $value: unknown }).$value
  const toOklch = (v: unknown): Oklch | null => {
    const c = v as { components?: number[]; alpha?: number }
    if (!c?.components) return null
    const [l = 0, ch = 0, h = 0] = c.components
    return { l, c: ch, h, alpha: c.alpha }
  }
  const paper = toOklch(value(entries.find((e) => e.path.endsWith('.paper'))!))!
  return entries
    .filter((e) => typeof value(e) === 'object')
    .map((e) => {
      const oklch = toOklch(value(e))!
      return {
        ...row(e),
        oklch,
        hex: oklchToHex(oklch),
        onPaper: oklch.alpha === undefined ? contrast(oklch, paper) : undefined,
      }
    })
}

/** `background → paper` … the slot aliases of one theme. */
export function colorSlots(json: TokensFile, theme: ThemeName): { slot: string; role: string }[] {
  return flattenTokens(json)
    .filter((e) => themeOf(e.path) === theme && typeof (e.node as { $value: unknown }).$value === 'string')
    .map((e) => ({ slot: e.path.split('.').pop()!, role: String((e.node as { $value: string }).$value).split('.').pop()!.replace('}', '') }))
}

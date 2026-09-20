import fs from 'node:fs'

import { describe, expect, it } from 'vitest'

import { tokensFile } from '../../scripts/docs/lib/docs'
import { OWN_TOKENS, TOKEN_EXT_NS } from '../../scripts/docs/lib/schema'
import { readTokens, stringifyTokens, type TokensFile } from '../../scripts/docs/lib/tokens'
import { CSS_VARIABLES_FILE, THEME_CSS_FILE, buildAll } from '../../scripts/tokens/build'
import { contrast, oklchToHex, type Oklch } from '../../scripts/tokens/lib/contrast'
import { cssName, cssValue, emitCssVariablesJs, emitEntries, emitThemeCss } from '../../scripts/tokens/lib/emit'
import { TYPE_ROLES, cn } from '../../src/utilities/ui'

const ns = (e: Record<string, unknown>) => ({ [TOKEN_EXT_NS]: e })
const dim = (value: number, unit = 'rem') => ({ $type: 'dimension', $value: { value, unit } })
const okl = (l: number, c: number, h: number, alpha?: number) => ({
  $value: { colorSpace: 'oklch', components: [l, c, h], ...(alpha !== undefined ? { alpha } : {}) },
})

const fixture: TokensFile = {
  $extensions: ns({ benchmark: 'sina' }),
  color: {
    $type: 'color',
    light: { paper: okl(0.985, 0.006, 85), ink: okl(0.18, 0.01, 75), line: okl(0.18, 0.01, 75, 0.16), background: { $value: '{color.light.paper}' } },
    dark: { paper: okl(0.2, 0.012, 262), ink: okl(0.96, 0.005, 85), line: okl(0.96, 0.005, 85, 0.16), background: { $value: '{color.dark.paper}' } },
  },
  font: {
    family: {
      $type: 'fontFamily',
      sans: { $value: ['Geist Sans', 'system-ui', 'sans-serif'], $extensions: ns({ var: '--font-geist-sans' }) },
      'sans-fa': { $value: ['Vazirmatn', 'sans-serif'] },
    },
    size: {
      $type: 'dimension',
      h1: { $extensions: ns({ fluid: true, vwUnit: 'vw' }), min: dim(2.25), vw: { $type: 'number', $value: 4.05 }, max: dim(3.625) },
      eyebrow: dim(0.75),
    },
    leading: { $type: 'number', h1: { $value: 1.05 } },
    tracking: { $type: 'dimension', h1: dim(-0.03, 'em') },
    fa: {
      family: { $type: 'fontFamily', sans: { $value: '{font.family.sans-fa}' } },
      leading: { $type: 'number', h1: { $value: 1.2 } },
      size: { $type: 'dimension', eyebrow: dim(0.8125) },
    },
  },
  space: { $type: 'dimension', section: dim(4) },
  motion: {
    ease: { standard: { $type: 'cubicBezier', $value: [0.22, 1, 0.36, 1] } },
    duration: { fast: { $type: 'duration', $value: { value: 200, unit: 'ms' } } },
    lift: dim(-2, 'px'),
  },
  breakpoint: { $type: 'dimension', sm: dim(40), '2xl': dim(86) },
}

describe('tokens emitter — names and values', () => {
  it('maps every known path prefix to its Tailwind v4 namespace', () => {
    expect(cssName('color.light.ink-2')).toBe('--ink-2')
    expect(cssName('font.family.sans-fa')).toBe('--font-sans-fa')
    expect(cssName('font.size.h1')).toBe('--text-h1')
    expect(cssName('font.leading.body')).toBe('--leading-body')
    expect(cssName('font.tracking.eyebrow')).toBe('--tracking-eyebrow')
    expect(cssName('font.weight.medium')).toBe('--font-weight-medium')
    expect(cssName('font.fa.leading.body')).toBe('--leading-body')
    expect(cssName('space.section-sm')).toBe('--spacing-section-sm')
    expect(cssName('size.container')).toBe('--container-page')
    expect(cssName('size.measure')).toBe('--container-measure')
    expect(cssName('size.control.pad-x')).toBe('--size-control-pad-x')
    expect(cssName('radius.control')).toBe('--radius-control')
    expect(cssName('motion.ease.spring')).toBe('--ease-spring')
    expect(cssName('motion.duration.base')).toBe('--duration-base')
    expect(cssName('motion.lift')).toBe('--lift')
    expect(cssName('breakpoint.2xl')).toBe('--breakpoint-2xl')
    expect(() => cssName('shadow.card')).toThrow(/no CSS mapping/)
  })

  it('formats values per $type', () => {
    const entries = new Map(emitEntries(fixture).map((e) => [e.path, e]))
    const v = (p: string) => cssValue(entries.get(p)!)
    expect(v('color.light.paper')).toBe('oklch(98.5% 0.006 85)')
    expect(v('color.light.line')).toBe('oklch(18% 0.01 75 / 0.16)')
    expect(v('color.light.background')).toBe('var(--paper)')
    expect(v('font.family.sans')).toBe('var(--font-geist-sans), system-ui, sans-serif')
    expect(v('font.family.sans-fa')).toBe('"Vazirmatn", sans-serif')
    expect(v('font.size.h1')).toBe('clamp(2.25rem, 4.05vw, 3.625rem)')
    expect(v('font.tracking.h1')).toBe('-0.03em')
    expect(v('motion.ease.standard')).toBe('cubic-bezier(0.22, 1, 0.36, 1)')
    expect(v('motion.duration.fast')).toBe('200ms')
    expect(v('motion.lift')).toBe('-2px')
  })

  it('skips the min/vw/max children of fluid groups', () => {
    const paths = emitEntries(fixture).map((e) => e.path)
    expect(paths).toContain('font.size.h1')
    expect(paths).not.toContain('font.size.h1.min')
  })
})

describe('tokens emitter — theme.css', () => {
  const css = emitThemeCss(fixture)

  it('emits the four scopes in order', () => {
    const order = ['@theme static {', ":root, [data-theme='light'] {", "[data-theme='dark'] {", '@theme inline {', ':lang(fa) {']
    const idx = order.map((s) => css.indexOf(s))
    expect(idx.every((i) => i >= 0)).toBe(true)
    expect([...idx].sort((a, b) => a - b)).toEqual(idx)
  })

  it('repeats slot aliases in both theme scopes and bridges every colour name', () => {
    expect(css.match(/--background: var\(--paper\);/g)).toHaveLength(2)
    expect(css).toContain('--color-background: var(--background);')
    expect(css).toContain('--color-ink: var(--ink);')
  })

  it('adds companion vars for sizes and restates them in :lang(fa)', () => {
    expect(css).toContain('--text-h1--line-height: 1.05;')
    expect(css).toContain('--text-h1--letter-spacing: -0.03em;')
    const fa = css.slice(css.indexOf(':lang(fa) {'))
    expect(fa).toContain('--leading-h1: 1.2;')
    expect(fa).toContain('--text-h1--line-height: 1.2;')
    expect(fa).toContain('--text-eyebrow: 0.8125rem;')
    expect(fa).toContain('--font-sans: var(--font-sans-fa);')
  })

  it('refuses a light/dark mismatch and an orphan fa override', () => {
    const mismatch = structuredClone(fixture) as TokensFile
    delete (mismatch.color as Record<string, Record<string, unknown>>).dark!.line
    expect(() => emitThemeCss(mismatch)).toThrow(/light but not dark/)
    const orphan = structuredClone(fixture) as TokensFile
    ;((orphan.font as Record<string, unknown>).fa as Record<string, unknown>).leading = { $type: 'number', h9: { $value: 1 } }
    expect(() => emitThemeCss(orphan)).toThrow(/does not exist/)
  })

  it('emits breakpoints in px, largest first', () => {
    expect(emitCssVariablesJs(fixture)).toContain("    '2xl': 1376,\n    sm: 640,")
  })
})

describe('house tokens on disk', () => {
  const file = tokensFile(OWN_TOKENS)
  const json = readTokens(file)!

  it('is normalised and generates the committed files byte for byte', () => {
    expect(stringifyTokens(json)).toBe(fs.readFileSync(file, 'utf8'))
    expect(emitThemeCss(json)).toBe(fs.readFileSync(THEME_CSS_FILE, 'utf8'))
    expect(emitCssVariablesJs(json)).toBe(fs.readFileSync(CSS_VARIABLES_FILE, 'utf8'))
    expect(buildAll(false).every((r) => !r.changed)).toBe(true)
  })

  it('defines every variable the components rely on', () => {
    const css = emitThemeCss(json)
    for (const v of [
      '--text-display', '--text-h1', '--text-h2', '--text-h3', '--text-lede', '--text-body', '--text-small',
      '--text-caption', '--text-eyebrow', '--text-button', '--text-num', '--font-sans', '--font-mono', '--font-sans-fa',
      '--font-weight-medium', '--spacing-section', '--spacing-section-sm', '--spacing-gutter', '--spacing-block',
      '--container-page', '--container-measure', '--size-control-height', '--size-control-height-sm',
      '--size-control-pad-x', '--radius-control', '--radius-chip', '--radius-md', '--radius-lg', '--ease-standard',
      '--ease-spring', '--duration-fast', '--duration-base', '--lift', '--paper', '--panel', '--ink', '--ink-2',
      '--ink-3', '--line', '--line-soft', '--brand', '--brand-foreground', '--ring', '--background', '--foreground',
      '--card', '--muted', '--muted-foreground', '--border', '--input', '--primary', '--destructive', '--success',
      '--warning', '--error',
    ])
      expect(css, v).toContain(`${v}:`)
  })

  it('declares every type role to tailwind-merge so cn() keeps size and colour apart', () => {
    const roles = emitEntries(json)
      .filter((e) => /^font\.size\.[a-z0-9-]+$/.test(e.path))
      .map((e) => e.path.split('.').pop()!)
      .sort()
    expect([...TYPE_ROLES].sort()).toEqual(roles)
    expect(cn('text-h2', 'text-foreground')).toBe('text-h2 text-foreground')
    expect(cn('text-h1', 'text-h2')).toBe('text-h2')
  })

  it('meets the contrast targets in both themes', () => {
    const color = json.color as Record<'light' | 'dark', Record<string, { $value: { components: number[] } }>>
    const c = (theme: 'light' | 'dark', role: string): Oklch => {
      const [l, cc, h] = color[theme][role]!.$value.components
      return { l: l!, c: cc!, h: h! }
    }
    for (const theme of ['light', 'dark'] as const) {
      expect(contrast(c(theme, 'ink'), c(theme, 'paper')), `${theme} ink`).toBeGreaterThan(12)
      expect(contrast(c(theme, 'ink-2'), c(theme, 'paper')), `${theme} ink-2`).toBeGreaterThan(7)
      expect(contrast(c(theme, 'ink-3'), c(theme, 'paper')), `${theme} ink-3`).toBeGreaterThan(4.5)
      expect(contrast(c(theme, 'brand-foreground'), c(theme, 'brand')), `${theme} brand`).toBeGreaterThan(4.5)
    }
    expect(oklchToHex({ l: 1, c: 0, h: 0 })).toBe('#ffffff')
  })
})

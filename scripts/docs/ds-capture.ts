/**
 * Capture evidence and tokens for Design-System items from a benchmark site, driven by
 * Docs/Design-System/sources/<benchmark>.capture.json.
 *
 *   pnpm docs:ds-capture <benchmark> [--item DS-18 …] [--viewport desktop|mobile]
 *                                    [--no-tokens] [--tokens-only] [--dry-run] [--timeout ms]
 *
 * Writes (all local-only, gitignored) into Docs/Design-System/assets/<benchmark>/:
 *   DS-NN-<n>-<viewport>-<label>[-<state>].png   element crops (@2x) / viewport shots
 *   DS-NN-f01-<label>.png …                       frame sequences
 *   DS-NN-<label>.webm                            short videos
 *   DS-NN.json                                    bbox + computed styles + parts + fonts
 *   _stylesheets/*.css, _stylesheets/summary.json raw CSS + root vars / transitions / keyframes
 * and (committed) tokens/<benchmark>.tokens.json + each item's `evidence[]`.
 *
 * No named functions inside page.evaluate callbacks (tsx keepNames — see lib/screenshot.ts).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

import { chromium, type Browser, type BrowserContext, type Locator, type Page } from '@playwright/test'

import { DS_DIR, dsAssetsDir, dsItemFiles, fromRepo, today, tokensFile } from './lib/docs'
import { readDoc, setFields } from './lib/frontmatter'
import {
  DEFAULT_PROBES,
  loadManifest,
  type CaptureItem,
  type CaptureManifest,
  type Target,
  type ViewportKey,
} from './lib/manifest'
import { TOKEN_EXT_NS, VIEWPORTS } from './lib/schema'
import { closeQuietly, load, newContextFor, scrollThrough } from './lib/screenshot'
import {
  emptyTokensFile,
  mergeTokens,
  parseCssValue,
  readTokens,
  stringifyTokens,
  tokenFromParsed,
  type Incoming,
  type Parsed,
  type TokensFile,
} from './lib/tokens'
import { regenerateAll } from './index'

const USAGE = `usage: pnpm docs:ds-capture <benchmark> [--item DS-18 …] [--viewport desktop|mobile] [--no-tokens] [--tokens-only] [--dry-run] [--timeout ms]`

interface Opts {
  items?: string[]
  viewport?: ViewportKey
  tokens: boolean
  tokensOnly: boolean
  dryRun: boolean
  timeoutMs: number
}

/** Patched IntersectionObserver: every observed element reports as intersecting, asynchronously. */
const IO_PATCH = `(() => {
  if (!window.IntersectionObserver) return;
  class Patched {
    constructor(cb, opts) { this._cb = cb; this._els = new Set(); this.root = (opts && opts.root) || null; this.rootMargin = (opts && opts.rootMargin) || '0px'; this.thresholds = [1]; }
    observe(el) {
      this._els.add(el);
      setTimeout(() => {
        const r = el.getBoundingClientRect();
        try { this._cb([{ isIntersecting: true, intersectionRatio: 1, target: el, boundingClientRect: r, intersectionRect: r, rootBounds: null, time: performance.now() }], this); } catch (e) {}
      }, 0);
    }
    unobserve(el) { this._els.delete(el); }
    disconnect() { this._els.clear(); }
    takeRecords() { return []; }
  }
  window.IntersectionObserver = Patched;
})();`

interface TargetRecord {
  label: string
  resolvedSelector: string
  rect: { x: number; y: number; width: number; height: number }
  computed: Record<string, string>
  tag: string
  classes: string[]
  text: string
  parts: { label: string; selector: string; found: boolean; rect?: TargetRecord['rect']; computed?: Record<string, string>; tag?: string; text?: string }[]
  files: string[]
  states: Record<string, string>
}

interface ItemJson {
  id: string
  benchmark: string
  capturedAt: string
  route: string
  viewports: Record<string, { url: string; fonts: { family: string; weight: string; style: string; status: string }[]; targets: TargetRecord[] }>
  warnings: string[]
}

// ---------------------------------------------------------------------------
// Target resolution

function resolveTarget(page: Page, t: Target): Locator {
  let loc: Locator
  if (t.selector) loc = page.locator(t.selector)
  else if (t.role && t.name) loc = page.getByRole(t.role as Parameters<Page['getByRole']>[0], { name: t.name })
  else loc = page.getByText(t.text as string, t.exact ? { exact: true } : undefined)
  if (t.ancestor) {
    // the innermost ancestor matching the CSS selector that contains the match
    loc = page.locator(t.ancestor).filter({ has: loc.first() }).last()
  } else {
    loc = t.nth !== undefined ? loc.nth(t.nth) : loc.first()
  }
  return loc
}

async function describe(loc: Locator, probes: string[], parts: Target['parts']): Promise<Omit<TargetRecord, 'label' | 'files' | 'states'>> {
  return loc.evaluate(
    (el, args) => {
      const round = (n: number) => Math.round(n * 10) / 10
      const rectOf = (e: Element) => {
        const r = e.getBoundingClientRect()
        return { x: round(r.x + window.scrollX), y: round(r.y + window.scrollY), width: round(r.width), height: round(r.height) }
      }
      const computedOf = (e: Element, pseudo?: string) => {
        const cs = getComputedStyle(e, pseudo)
        const out: Record<string, string> = {}
        const probes = pseudo ? ['content', ...args.probes] : args.probes
        for (const p of probes) {
          const v = cs.getPropertyValue(p.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)) || (cs as unknown as Record<string, string>)[p]
          if (v) out[p] = String(v).trim()
        }
        return out
      }
      const pathOf = (e: Element) => {
        const segs: string[] = []
        let cur: Element | null = e
        while (cur && cur !== document.body && segs.length < 4) {
          const cls = [...cur.classList].slice(0, 2).map((c) => `.${c}`).join('')
          const id = cur.id ? `#${cur.id}` : ''
          segs.unshift(`${cur.tagName.toLowerCase()}${id}${cls}`)
          cur = cur.parentElement
        }
        return segs.join(' > ')
      }
      const textOf = (e: Element) => ((e as HTMLElement).innerText || e.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120)
      return {
        resolvedSelector: pathOf(el),
        rect: rectOf(el),
        computed: computedOf(el),
        tag: el.tagName.toLowerCase(),
        classes: [...el.classList].slice(0, 6),
        text: textOf(el),
        parts: (args.parts ?? []).map((p) => {
          if (p.pseudo) {
            const c = computedOf(el, p.pseudo)
            const found = !!c.content && c.content !== 'none' && c.content !== 'normal'
            return { label: p.label, selector: p.pseudo, found, computed: found ? c : undefined, tag: p.pseudo, text: found ? c.content : undefined }
          }
          const child = el.querySelector(p.selector as string)
          if (!child) return { label: p.label, selector: p.selector as string, found: false }
          return { label: p.label, selector: p.selector as string, found: true, rect: rectOf(child), computed: computedOf(child), tag: child.tagName.toLowerCase(), text: textOf(child) }
        }),
      }
    },
    { probes, parts: parts ?? [] },
  )
}

async function fontsOf(page: Page) {
  return page
    .evaluate(() => {
      const seen = new Map<string, { family: string; weight: string; style: string; status: string }>()
      for (const f of document.fonts as unknown as Iterable<FontFace>) {
        const key = `${f.family}|${f.weight}|${f.style}`
        if (!seen.has(key)) seen.set(key, { family: f.family.replace(/^["']|["']$/g, ''), weight: f.weight, style: f.style, status: f.status })
      }
      return [...seen.values()]
    })
    .catch(() => [])
}

async function clipShot(page: Page, loc: Locator, file: string, padding: number) {
  await loc.scrollIntoViewIfNeeded().catch(() => undefined)
  await page.waitForTimeout(200)
  const box = await loc.boundingBox()
  if (!box) throw new Error('element has no bounding box (hidden?)')
  const vp = page.viewportSize() ?? VIEWPORTS.desktop
  // clip is in viewport CSS px; keep it inside the viewport
  const x = Math.max(0, box.x - padding)
  const y = Math.max(0, box.y - padding)
  const width = Math.min(vp.width - x, box.width + padding * 2)
  const height = Math.min(vp.height - y, box.height + padding * 2)
  if (width <= 0 || height <= 0) throw new Error('element is outside the viewport')
  await page.screenshot({ path: file, clip: { x, y, width, height } })
}

// ---------------------------------------------------------------------------
// Tokens pass

interface StyleSummary {
  vars: Record<string, string>
  varSources: Record<string, string>
  transitions: { selector: string; prop: string; value: string }[]
  keyframes: { name: string; css: string }[]
  stylesheets: string[]
  cssomBlocked: string[]
}

async function collectStyles(page: Page, m: CaptureManifest): Promise<StyleSummary> {
  const rootSelectors = m.stylesheets?.rootSelectors ?? [':root', 'html', '[data-theme]']
  const summary = await page.evaluate(
    (args) => {
      const isRoot = (sel: string) =>
        sel
          .split(',')
          .map((s) => s.trim())
          .some((s) => args.rootSelectors.some((r) => s === r || s.startsWith(`${r}[`) || s.startsWith(`${r}.`) || s.startsWith(`html${r}`)))
      const varNames = new Set<string>()
      const varSources: Record<string, string> = {}
      const transitions: { selector: string; prop: string; value: string }[] = []
      const keyframes: { name: string; css: string }[] = []
      const stylesheets: string[] = []
      const blocked: string[] = []
      const walk = (rules: CSSRuleList, sheetHref: string) => {
        for (const rule of Array.from(rules)) {
          if (rule instanceof CSSStyleRule) {
            const st = rule.style
            if (isRoot(rule.selectorText)) {
              for (let i = 0; i < st.length; i++) {
                const name = st[i] as string
                if (name.startsWith('--')) {
                  varNames.add(name)
                  varSources[name] = `${sheetHref} ${rule.selectorText}`
                }
              }
            }
            for (const p of ['transition', 'transition-duration', 'transition-timing-function', 'animation', 'animation-duration', 'animation-timing-function']) {
              const v = st.getPropertyValue(p)
              if (v && v !== 'all 0s ease 0s' && v !== 'none' && transitions.length < 400) transitions.push({ selector: rule.selectorText.slice(0, 120), prop: p, value: v.trim() })
            }
          } else if (rule instanceof CSSKeyframesRule) {
            keyframes.push({ name: rule.name, css: rule.cssText.slice(0, 2000) })
          } else if (rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule) {
            walk(rule.cssRules, sheetHref)
          }
        }
      }
      for (const sheet of Array.from(document.styleSheets)) {
        const href = sheet.href ?? '(inline)'
        if (sheet.href) stylesheets.push(sheet.href)
        try {
          walk(sheet.cssRules, href)
        } catch {
          blocked.push(href)
        }
      }
      const cs = getComputedStyle(document.documentElement)
      const bodyCs = getComputedStyle(document.body)
      const vars: Record<string, string> = {}
      for (const name of varNames) {
        const v = (cs.getPropertyValue(name) || bodyCs.getPropertyValue(name)).trim()
        if (v) vars[name] = v
      }
      return { vars, varSources, transitions, keyframes, stylesheets, cssomBlocked: blocked }
    },
    { rootSelectors },
  )
  return summary
}

/** Regex fallback for stylesheets whose CSSOM is blocked (cross-origin without CORS). */
function varsFromCssText(css: string, rootSelectors: string[]): Record<string, string> {
  const vars: Record<string, string> = {}
  const blockRe = /([^{}]+)\{([^{}]*)\}/g
  for (const m of css.matchAll(blockRe)) {
    const sel = (m[1] as string).trim()
    if (!rootSelectors.some((r) => sel.split(',').some((s) => s.trim().startsWith(r)))) continue
    for (const d of (m[2] as string).matchAll(/(--[A-Za-z0-9_-]+)\s*:\s*([^;]+);?/g)) vars[d[1] as string] = (d[2] as string).trim()
  }
  return vars
}

function resolveAlias(value: string, vars: Record<string, string>, depth = 0): string {
  const p = parseCssValue(value)
  if (p?.type === 'alias' && depth < 6 && vars[p.ref]) return resolveAlias(vars[p.ref] as string, vars, depth + 1)
  return value
}

async function tokensPass(browser: Browser, m: CaptureManifest, opts: Opts, assets: string, warnings: string[]) {
  // keepMotion: the site may zero motion vars under prefers-reduced-motion; we want the real values
  const ctx = await newContextFor(browser, 'desktop', { scale: 1, keepMotion: true })
  const page = await ctx.newPage()
  await load(page, `${m.baseUrl}/`, { timeoutMs: opts.timeoutMs, keepMotion: true }, warnings)
  const summary = await collectStyles(page, m)
  const rootSelectors = m.stylesheets?.rootSelectors ?? [':root', 'html', '[data-theme]']

  // snapshot matched stylesheets; regex-parse the blocked ones
  const sheetDir = path.join(assets, '_stylesheets')
  fs.mkdirSync(sheetDir, { recursive: true })
  const matched = summary.stylesheets.filter((h) => (m.stylesheets?.match ?? []).some((frag) => h.includes(frag)) || !m.stylesheets?.match?.length)
  for (const href of matched) {
    try {
      const res = await page.request.get(href)
      const css = await res.text()
      fs.writeFileSync(path.join(sheetDir, path.basename(new URL(href).pathname) || 'sheet.css'), css)
      if (summary.cssomBlocked.includes(href)) Object.assign(summary.vars, varsFromCssText(css, rootSelectors))
    } catch (err) {
      warnings.push(`stylesheet ${href}: ${(err as Error).message.split('\n')[0]}`)
    }
  }
  fs.writeFileSync(path.join(sheetDir, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`)

  // vars → tokens
  const incoming: Incoming[] = []
  const unmapped: Record<string, string> = {}
  const tokenMap = m.tokenMap ?? {}
  for (const [name, raw] of Object.entries(summary.vars).sort()) {
    const tokenPath = tokenMap[name]
    if (!tokenPath) {
      unmapped[name] = raw.slice(0, 80)
      continue
    }
    const resolved = resolveAlias(raw, summary.vars)
    const parsed = parseCssValue(resolved)
    const node = parsed ? tokenFromParsed(parsed) : null
    if (!node) {
      warnings.push(`tokenMap ${name} → ${tokenPath}: cannot parse "${resolved}"`)
      continue
    }
    const approx = parsed && parsed.type === 'cubicBezier' && parsed.approximation ? { approximation: true } : {}
    if (approx.approximation) node.$description = `approximation of \`${resolved}\``
    incoming.push({ path: tokenPath, node, ext: { var: name, origin: 'stylesheet', css: resolved !== raw ? `${raw} → ${resolved}` : raw, ...approx } })
  }
  for (const name of Object.keys(tokenMap)) if (!(name in summary.vars)) warnings.push(`tokenMap ${name}: not defined on the page`)

  // measured tokens — grouped by (route, viewport) so each page loads once
  const pages = new Map<string, Page>([['/|desktop', page]])
  const pageFor = async (route: string, viewport: ViewportKey) => {
    const key = `${route}|${viewport}`
    const hit = pages.get(key)
    if (hit) return hit
    const c = await newContextFor(browser, viewport, { scale: 1, keepMotion: true })
    const pg = await c.newPage()
    await load(pg, `${m.baseUrl}${route}`, { timeoutMs: opts.timeoutMs, keepMotion: true }, warnings)
    await scrollThrough(pg)
    pages.set(key, pg)
    return pg
  }
  const firstOfList = (v: string) => (v.includes(',') && !/^(rgb|oklch|hsl)a?\(/i.test(v) && !v.startsWith('"') ? (v.split(/,(?![^()]*\))/)[0] as string).trim() : v)
  for (const spec of m.measure ?? []) {
    const wanted: ViewportKey = spec.viewport ?? 'desktop'
    const mpage = await pageFor(spec.route ?? '/', wanted)
    try {
      const values: string[] = await mpage.locator(spec.selector).evaluateAll(
        (els, args) =>
          els.slice(0, 12).map((el) => {
            const cs = getComputedStyle(el)
            const v = cs.getPropertyValue(args.prop.replace(/[A-Z]/g, (c: string) => `-${c.toLowerCase()}`))
            if (!args.relativeTo) return v.trim()
            const base = parseFloat(cs.getPropertyValue(args.relativeTo.replace(/[A-Z]/g, (c: string) => `-${c.toLowerCase()}`)))
            return base ? String(Math.round((parseFloat(v) / base) * 1000) / 1000) : v.trim()
          }),
        { prop: spec.prop, relativeTo: spec.relativeTo },
      )
      if (!values.length) {
        warnings.push(`measure ${spec.path}: ${spec.selector} matched nothing`)
        continue
      }
      const usable = values.filter((v) => v && v !== 'rgba(0, 0, 0, 0)' && v !== 'none' && v !== 'normal' && v !== 'auto')
      if (!usable.length) {
        warnings.push(`measure ${spec.path}: ${spec.selector}.${spec.prop} is transparent/none on every match`)
        continue
      }
      const mode = [...usable.reduce((acc, v) => acc.set(v, (acc.get(v) ?? 0) + 1), new Map<string, number>())].sort((a, b) => b[1] - a[1])[0]![0]
      const first = spec.type === 'duration' || spec.type === 'number' ? firstOfList(mode) : spec.type === 'fontFamily' ? mode : firstOfList(mode)
      let parsed: Parsed | null = parseCssValue(spec.type === 'fontFamily' ? mode : first)
      if (spec.type === 'fontWeight' && /^\d+$/.test(mode)) parsed = { type: 'number', value: Number(mode) }
      const node = parsed ? tokenFromParsed(parsed) : null
      if (!node) {
        warnings.push(`measure ${spec.path}: cannot parse "${mode}"`)
        continue
      }
      if (spec.type === 'fontWeight') node.$type = 'fontWeight'
      incoming.push({ path: spec.path, node, ext: { origin: 'computed', selector: `${spec.route ?? '/'} ${spec.selector}`, sample: usable.length, css: mode } })
    } catch (err) {
      warnings.push(`measure ${spec.path}: ${(err as Error).message.split('\n')[0]}`)
    }
  }
  for (const [key, pg] of pages) if (key !== '/|desktop') await closeQuietly(pg.context())
  await closeQuietly(ctx)

  // merge + write
  const file = tokensFile(m.benchmark)
  const existing: TokensFile =
    readTokens(file) ??
    emptyTokensFile(
      { benchmark: m.benchmark, url: m.baseUrl },
      `Measured design tokens of ${m.benchmark}. $value/$type and provenance are written by \`pnpm docs:ds-capture\`; $description is hand-written; \`items\` is written by \`pnpm docs:index\`.`,
    )
  const before = stringifyTokens(JSON.parse(JSON.stringify(existing)))
  const merged = mergeTokens(existing, incoming, today())
  const rootExt = (merged.$extensions?.[TOKEN_EXT_NS] ?? {}) as Record<string, unknown>
  const captured = typeof rootExt.captured === 'string' ? rootExt.captured : undefined
  merged.$extensions = {
    ...(merged.$extensions ?? {}),
    [TOKEN_EXT_NS]: {
      ...rootExt,
      benchmark: m.benchmark,
      url: m.baseUrl,
      captured,
      stylesheets: matched.map((h) => new URL(h).pathname),
      viewport: VIEWPORTS.desktop,
      unmappedVars: unmapped,
    },
  }
  const afterNoDate = stringifyTokens(JSON.parse(JSON.stringify(merged)))
  const changed = before !== afterNoDate
  if (changed || !captured) (merged.$extensions[TOKEN_EXT_NS] as Record<string, unknown>).captured = today()
  if (!opts.dryRun) {
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, stringifyTokens(merged))
  }
  console.log(`${opts.dryRun ? '·' : '✓'} tokens: ${incoming.length} written, ${Object.keys(unmapped).length} unmapped vars → ${fromRepo(file)}`)
}

// ---------------------------------------------------------------------------
// Items pass

interface Group {
  route: string
  viewport: ViewportKey
  keepMotion: boolean
  scale: number
  reveal: boolean
  items: CaptureItem[]
}

function groupItems(m: CaptureManifest, items: CaptureItem[], only?: ViewportKey): Group[] {
  const groups = new Map<string, Group>()
  const defaultViewports = m.defaults?.viewports ?? ['desktop']
  const defaultScale = m.defaults?.scale ?? 2
  for (const it of items) {
    const viewports = (it.viewports ?? defaultViewports).filter((v) => !only || v === only)
    const keepMotion = it.keepMotion ?? false
    const needsHiRes = it.capture.includes('element@2x') || it.capture.includes('states')
    const scale = needsHiRes ? defaultScale : 1
    const reveal = !keepMotion && it.disableReveal !== false
    for (const viewport of viewports) {
      const key = `${it.route}|${viewport}|${keepMotion}|${scale}|${reveal}`
      const g = groups.get(key) ?? { route: it.route, viewport, keepMotion, scale, reveal, items: [] }
      g.items.push(it)
      groups.set(key, g)
    }
  }
  return [...groups.values()]
}

async function runActions(page: Page, it: CaptureItem, warnings: string[]) {
  for (const a of it.actions ?? []) {
    try {
      if ('click' in a) await page.locator(a.click).first().click({ timeout: 5000 })
      else if ('hover' in a) await page.locator(a.hover).first().hover({ timeout: 5000 })
      else if ('wait' in a) await page.waitForTimeout(a.wait)
      else if ('key' in a) await page.keyboard.press(a.key)
      else if ('scroll' in a) {
        await page.evaluate((to) => {
          window.scrollTo(0, to === 'bottom' ? document.documentElement.scrollHeight : to === 'top' ? 0 : (to as number))
        }, a.scroll)
        await page.waitForTimeout(300)
      }
    } catch (err) {
      warnings.push(`${it.id}: action ${JSON.stringify(a)} failed — ${(err as Error).message.split('\n')[0]}`)
    }
  }
}

async function preparePage(browser: Browser, m: CaptureManifest, g: Group, opts: Opts, warnings: string[]): Promise<{ ctx: BrowserContext; page: Page }> {
  const ctx = await newContextFor(browser, g.viewport, { scale: g.scale, keepMotion: g.keepMotion })
  if (g.reveal && (m.reveal?.patchIntersectionObserver ?? true)) await ctx.addInitScript(IO_PATCH)
  const page = await ctx.newPage()
  await load(page, `${m.baseUrl}${g.route}`, { timeoutMs: opts.timeoutMs, keepMotion: g.keepMotion }, warnings)
  if (g.reveal) {
    if (m.reveal?.css) await page.addStyleTag({ content: m.reveal.css }).catch(() => undefined)
    if (m.reveal?.scrollThrough ?? true) await scrollThrough(page)
  }
  await page.waitForTimeout(m.defaults?.waitMs ?? 400)
  return { ctx, page }
}

function clearItemAssets(assets: string, id: string) {
  if (!fs.existsSync(assets)) return
  for (const f of fs.readdirSync(assets)) {
    if (f.startsWith(`${id}-`) && (f.endsWith('.png') || f.endsWith('.webm'))) fs.unlinkSync(path.join(assets, f))
  }
}

async function captureFrames(page: Page, loc: Locator | null, it: CaptureItem, label: string, assets: string, files: string[]) {
  const spec = it.frames as NonNullable<CaptureItem['frames']>
  const vpH = page.viewportSize()?.height ?? VIEWPORTS.desktop.height
  let from = 0
  let to = 0
  if (spec.scroll && loc) {
    const rect = await loc.evaluate((el) => {
      const r = el.getBoundingClientRect()
      return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY }
    })
    const docH = await page.evaluate(() => document.documentElement.scrollHeight)
    const at = (v: number | string, fallback: number) =>
      typeof v === 'number' ? v : v === 'top' ? 0 : v === 'bottom' ? docH - vpH : v === 'target-top' ? Math.max(0, rect.top - vpH * 0.85) : v === 'target-bottom' ? Math.max(0, rect.bottom - vpH * 0.15) : fallback
    from = at(spec.scroll.from, 0)
    to = at(spec.scroll.to, from)
  } else if (loc) {
    await loc.scrollIntoViewIfNeeded().catch(() => undefined)
  }
  for (let i = 0; i < spec.count; i++) {
    if (spec.scroll) {
      const y = from + ((to - from) * i) / Math.max(1, spec.count - 1)
      await page.evaluate((yy) => window.scrollTo(0, yy), y)
    }
    await page.waitForTimeout(spec.intervalMs)
    const name = `${it.id}-f${String(i + 1).padStart(2, '0')}-${label}.png`
    await page.screenshot({ path: path.join(assets, name) })
    files.push(name)
  }
}

async function captureVideo(browser: Browser, m: CaptureManifest, g: Group, it: CaptureItem, t: Target, label: string, assets: string, opts: Opts, warnings: string[]): Promise<string | null> {
  const tmp = path.join(assets, '_video-tmp')
  fs.mkdirSync(tmp, { recursive: true })
  const ctx = await newContextFor(browser, g.viewport, { scale: 1, keepMotion: true, recordVideoDir: tmp })
  const page = await ctx.newPage()
  try {
    await load(page, `${m.baseUrl}${it.route}`, { timeoutMs: opts.timeoutMs, keepMotion: true }, warnings)
    await runActions(page, it, warnings)
    const duration = it.video?.durationMs ?? 5000
    const loc = resolveTarget(page, t)
    const rect = await loc.evaluate((el) => {
      const r = el.getBoundingClientRect()
      return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY }
    })
    const vpH = page.viewportSize()?.height ?? VIEWPORTS.desktop.height
    const from = Math.max(0, rect.top - vpH * 0.85)
    const to = Math.max(from, rect.bottom - vpH * 0.15)
    const steps = Math.max(1, Math.floor(duration / 100))
    for (let i = 0; i <= steps; i++) {
      if (it.frames?.scroll) await page.evaluate((y) => window.scrollTo(0, y), from + ((to - from) * i) / steps)
      else if (i === 0) await loc.scrollIntoViewIfNeeded().catch(() => undefined)
      await page.waitForTimeout(100)
    }
    const video = page.video()
    await ctx.close()
    if (!video) return null
    const name = `${it.id}-${label}.webm`
    await video.saveAs(path.join(assets, name))
    await video.delete().catch(() => undefined)
    return name
  } catch (err) {
    warnings.push(`${it.id}: video ${label} failed — ${(err as Error).message.split('\n')[0]}`)
    await closeQuietly(ctx)
    return null
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true })
  }
}

async function itemsPass(browser: Browser, m: CaptureManifest, items: CaptureItem[], opts: Opts, assets: string, warnings: string[]) {
  const groups = groupItems(m, items, opts.viewport)
  const json = new Map<string, ItemJson>()
  const failed = new Set<string>()
  const padding = m.defaults?.padding ?? 16
  const counters = new Map<string, number>()
  const nextN = (id: string) => {
    const n = (counters.get(id) ?? 0) + 1
    counters.set(id, n)
    return n
  }
  for (const it of items) {
    clearItemAssets(assets, it.id)
    json.set(it.id, { id: it.id, benchmark: m.benchmark, capturedAt: new Date().toISOString(), route: it.route, viewports: {}, warnings: [] })
  }

  for (const g of groups) {
    console.log(`→ ${g.route} · ${g.viewport} · ${g.keepMotion ? 'motion' : 'frozen'} · @${g.scale}x · ${g.items.map((i) => i.id).join(', ')}`)
    const { ctx, page } = await preparePage(browser, m, g, opts, warnings)
    try {
      const fonts = await fontsOf(page)
      for (const it of g.items) {
        const rec = json.get(it.id) as ItemJson
        const vpRec: ItemJson['viewports'][string] = { url: page.url(), fonts, targets: [] }
        rec.viewports[g.viewport] = vpRec
        await runActions(page, it, warnings)
        const probes = it.probes ?? DEFAULT_PROBES
        for (const t of it.targets) {
          const label = t.label.replace(/[^a-z0-9]+/gi, '-').toLowerCase()
          const loc = resolveTarget(page, t)
          const tr: TargetRecord = { label: t.label, resolvedSelector: '', rect: { x: 0, y: 0, width: 0, height: 0 }, computed: {}, tag: '', classes: [], text: '', parts: [], files: [], states: {} }
          try {
            await loc.waitFor({ state: 'attached', timeout: 5000 })
          } catch {
            const msg = `${it.id}: target "${t.label}" not found on ${g.route} (${g.viewport})`
            warnings.push(msg)
            rec.warnings.push(msg)
            failed.add(`${it.id}/${t.label}`)
            continue
          }
          if (it.capture.includes('bbox+computed') || it.capture.includes('element@2x') || it.capture.includes('states')) {
            try {
              Object.assign(tr, await describe(loc, probes, t.parts))
              for (const p of tr.parts) if (!p.found) rec.warnings.push(`${it.id}: part "${p.label}" (${p.selector}) not found in "${t.label}"`)
            } catch (err) {
              rec.warnings.push(`${it.id}: describe "${t.label}" — ${(err as Error).message.split('\n')[0]}`)
            }
          }
          if (it.capture.includes('element@2x')) {
            const name = `${it.id}-${nextN(it.id)}-${g.viewport}-${label}.png`
            try {
              await clipShot(page, loc, path.join(assets, name), padding)
              tr.files.push(name)
            } catch (err) {
              rec.warnings.push(`${it.id}: crop "${t.label}" — ${(err as Error).message.split('\n')[0]}`)
            }
          }
          if (it.capture.includes('states')) {
            for (const state of it.states ?? []) {
              const name = `${it.id}-${nextN(it.id)}-${g.viewport}-${label}-${state}.png`
              try {
                if (state === 'hover') await loc.hover({ timeout: 3000 })
                else if (state === 'focus') await loc.focus({ timeout: 3000 })
                else if (state === 'active') {
                  await loc.hover({ timeout: 3000 })
                  await page.mouse.down()
                }
                await page.waitForTimeout(250)
                await clipShot(page, loc, path.join(assets, name), padding)
                if (state === 'active') await page.mouse.up()
                tr.files.push(name)
                tr.states[state] = name
              } catch (err) {
                rec.warnings.push(`${it.id}: state ${state} on "${t.label}" — ${(err as Error).message.split('\n')[0]}`)
              }
            }
            await page.mouse.move(0, 0).catch(() => undefined)
          }
          if (it.capture.includes('viewport')) {
            const name = `${it.id}-${nextN(it.id)}-${g.viewport}-${label}-viewport.png`
            await loc.scrollIntoViewIfNeeded().catch(() => undefined)
            await page.waitForTimeout(200)
            await page.screenshot({ path: path.join(assets, name) })
            tr.files.push(name)
          }
          if (it.capture.includes('frames') && it.frames) {
            try {
              await captureFrames(page, loc, it, label, assets, tr.files)
            } catch (err) {
              rec.warnings.push(`${it.id}: frames "${t.label}" — ${(err as Error).message.split('\n')[0]}`)
            }
          }
          if (it.capture.includes('video') && g.viewport === (it.viewports ?? m.defaults?.viewports ?? ['desktop'])[0]) {
            const name = await captureVideo(browser, m, g, it, t, label, assets, opts, warnings)
            if (name) tr.files.push(name)
          }
          vpRec.targets.push(tr)
        }
      }
    } finally {
      await closeQuietly(ctx)
    }
  }

  // write DS-NN.json + evidence[]
  for (const it of items) {
    const rec = json.get(it.id) as ItemJson
    fs.writeFileSync(path.join(assets, `${it.id}.json`), `${JSON.stringify(rec, null, 2)}\n`)
    const files = Object.values(rec.viewports).flatMap((v) => v.targets.flatMap((t) => t.files))
    const evidence = [...new Set([...files, `${it.id}.json`])].sort().map((f) => `${m.benchmark}/${f}`)
    const itemFile = dsItemFiles().find((f) => path.basename(f).startsWith(`${it.id}-`))
    if (itemFile) {
      const { raw, data } = readDoc(itemFile)
      const prev = Array.isArray(data.evidence) ? (data.evidence as string[]).filter((e) => !e.startsWith(`${m.benchmark}/`)) : []
      fs.writeFileSync(itemFile, setFields(raw, { evidence: [...prev, ...evidence].sort(), updated: today() }))
    }
    console.log(`✓ ${it.id}: ${files.length} file(s)${rec.warnings.length ? `, ${rec.warnings.length} warning(s)` : ''}`)
  }
  return failed
}

// ---------------------------------------------------------------------------

function dryRun(m: CaptureManifest, items: CaptureItem[], opts: Opts) {
  console.log(`dry run — ${m.benchmark} (${m.baseUrl}) · ${items.length} item(s)`)
  for (const g of groupItems(m, items, opts.viewport)) {
    console.log(`\n${g.route} · ${g.viewport} · ${g.keepMotion ? 'motion' : 'frozen'} · @${g.scale}x${g.reveal ? ' · force-reveal' : ''}`)
    for (const it of g.items) {
      console.log(`  ${it.id}  [${it.capture.join(', ')}]${it.actions?.length ? `  actions: ${it.actions.length}` : ''}`)
      for (const t of it.targets) {
        const how = t.selector ? `selector ${t.selector}` : t.role ? `role ${t.role} "${t.name}"` : `text "${t.text}"`
        console.log(`    · ${t.label}: ${how}${t.ancestor ? ` ↑ ${t.ancestor}` : ''}${t.parts?.length ? `  parts: ${t.parts.map((p) => p.label).join(', ')}` : ''}`)
      }
    }
  }
  if (opts.tokens) {
    const map = m.tokenMap ?? {}
    console.log(`\ntokens: ${Object.keys(map).length} mapped vars, ${m.measure?.length ?? 0} measured → ${fromRepo(tokensFile(m.benchmark))}`)
  }
}

async function main() {
  const { values, positionals } = parseArgs({
    options: {
      item: { type: 'string', multiple: true },
      viewport: { type: 'string' },
      tokens: { type: 'boolean', default: true },
      'tokens-only': { type: 'boolean', default: false },
      'dry-run': { type: 'boolean', default: false },
      timeout: { type: 'string', default: '45000' },
    },
    allowPositionals: true,
    allowNegative: true,
  })
  const benchmark = positionals[0]
  if (!benchmark) fail(USAGE)
  const opts: Opts = {
    items: values.item?.length ? values.item : undefined,
    viewport: values.viewport as ViewportKey | undefined,
    tokens: values.tokens ?? true,
    tokensOnly: values['tokens-only'] ?? false,
    dryRun: values['dry-run'] ?? false,
    timeoutMs: Number(values.timeout),
  }
  if (opts.viewport && opts.viewport !== 'desktop' && opts.viewport !== 'mobile') fail('--viewport must be desktop or mobile')

  const m = loadManifest(benchmark)
  const items = opts.tokensOnly ? [] : m.items.filter((it) => !opts.items || opts.items.includes(it.id))
  if (opts.items) for (const id of opts.items) if (!m.items.some((it) => it.id === id)) fail(`${id} is not in the manifest`)
  const existing = new Set(dsItemFiles().map((f) => path.basename(f).slice(0, 5)))
  const missing = items.filter((it) => !existing.has(it.id)).map((it) => it.id)
  if (missing.length) fail(`no item file for ${missing.join(', ')} — run pnpm docs:ds new first`)

  if (opts.dryRun) return dryRun(m, items, opts)

  const assets = dsAssetsDir(m.benchmark)
  fs.mkdirSync(assets, { recursive: true })
  const warnings: string[] = []
  const browser = await chromium.launch()
  let failed = new Set<string>()
  try {
    if (opts.tokens) await tokensPass(browser, m, opts, assets, warnings)
    if (items.length) failed = await itemsPass(browser, m, items, opts, assets, warnings)
  } finally {
    await closeQuietly(browser)
  }
  for (const r of regenerateAll(true).filter((x) => x.changed)) console.log(`✓ updated ${fromRepo(r.file)}`)
  for (const w of warnings) console.warn(`! ${w}`)
  console.log(`\nassets in ${fromRepo(assets)}/ (local-only); item measurements in DS-NN.json`)
  if (failed.size) {
    console.error(`\n${failed.size} target(s) not found: ${[...failed].join(', ')}`)
    process.exitCode = 1
  }
}

function fail(message: string): never {
  console.error(message)
  process.exit(1)
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}

export { DS_DIR }

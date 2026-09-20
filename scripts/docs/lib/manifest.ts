/**
 * Capture manifest: Docs/Design-System/sources/<benchmark>.capture.json tells `docs:ds-capture`
 * what to crop and measure on a benchmark site, item by item. Hand-written; validated here.
 */
import fs from 'node:fs'

import { manifestFile } from './docs'
import {
  BENCHMARK_TYPES,
  DS_CAPTURE_KINDS,
  DS_ID,
  DS_VIDEO_MAX_MS,
  TOKEN_PATH,
  type BenchmarkType,
  type DsCaptureKind,
} from './schema'

export type ViewportKey = 'desktop' | 'mobile'

export interface Part {
  label: string
  /** Descendant selector, or… */
  selector?: string
  /** …a pseudo-element of the target itself (section tags are often `::before`) */
  pseudo?: '::before' | '::after'
}

/** One thing to find on the page. Resolution order: selector → role+name → text (climbed to `ancestor`). */
export interface Target {
  label: string
  selector?: string
  nth?: number
  role?: string
  name?: string
  text?: string
  /** Whole-string, case-sensitive text match (default: substring, case-insensitive) */
  exact?: boolean
  /** CSS selector of the ancestor to climb to from a text/role match, e.g. `section` */
  ancestor?: string
  /** Sub-elements measured for the Anatomy table */
  parts?: Part[]
}

export type Action =
  | { click: string }
  | { hover: string }
  | { wait: number }
  | { scroll: number | 'bottom' | 'top' }
  | { key: string }

export interface FramesSpec {
  count: number
  intervalMs: number
  /** Scroll range; omit for time-driven captures (ticker, marquee) */
  scroll?: { from: 'target-top' | 'top' | number; to: 'target-bottom' | 'bottom' | number }
}

export interface CaptureItem {
  id: string
  route: string
  viewports?: ViewportKey[]
  keepMotion?: boolean
  /** Default true; set false when genuine reveal timing is the thing being captured */
  disableReveal?: boolean
  actions?: Action[]
  targets: Target[]
  capture: DsCaptureKind[]
  probes?: string[]
  states?: ('hover' | 'focus' | 'active')[]
  frames?: FramesSpec
  video?: { durationMs: number }
  notes?: string
}

export interface MeasureSpec {
  path: string
  selector: string
  prop: string
  type: 'dimension' | 'number' | 'color' | 'fontFamily' | 'duration' | 'fontWeight'
  /** Divide by this computed property (e.g. lineHeight / fontSize → unitless leading) */
  relativeTo?: string
  viewport?: ViewportKey
  /** Page to measure on; defaults to `/` */
  route?: string
}

export interface CaptureManifest {
  benchmark: string
  type: BenchmarkType
  baseUrl: string
  defaults?: {
    viewports?: ViewportKey[]
    scale?: number
    padding?: number
    waitMs?: number
    timeoutMs?: number
  }
  reveal?: {
    patchIntersectionObserver?: boolean
    css?: string
    scrollThrough?: boolean
  }
  stylesheets?: {
    match?: string[]
    rootSelectors?: string[]
  }
  /** CSS custom property → token path */
  tokenMap?: Record<string, string>
  measure?: MeasureSpec[]
  items: CaptureItem[]
}

export const DEFAULT_PROBES = [
  'color',
  'backgroundColor',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'textTransform',
  'padding',
  'margin',
  'gap',
  'borderRadius',
  'border',
  'boxShadow',
  'width',
  'height',
  'display',
  'gridTemplateColumns',
  'opacity',
  'transition',
]

const isObj = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v)
const isStr = (v: unknown): v is string => typeof v === 'string' && v.trim() !== ''
const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v)

/** Throws with every problem listed when the manifest is malformed. */
export function assertManifest(json: unknown, label = 'manifest'): CaptureManifest {
  const errors: string[] = []
  const err = (m: string) => errors.push(m)
  if (!isObj(json)) throw new Error(`${label}: expected an object`)

  if (!isStr(json.benchmark)) err('benchmark: required string')
  if (!(BENCHMARK_TYPES as readonly unknown[]).includes(json.type)) err(`type: one of ${BENCHMARK_TYPES.join(' | ')}`)
  if (!isStr(json.baseUrl) || !/^https?:\/\//.test(json.baseUrl)) err('baseUrl: http(s) URL required')

  if (json.tokenMap !== undefined) {
    if (!isObj(json.tokenMap)) err('tokenMap: expected { "--var": "group.path" }')
    else
      for (const [k, v] of Object.entries(json.tokenMap)) {
        if (!k.startsWith('--')) err(`tokenMap.${k}: keys are CSS custom properties (--…)`)
        if (!isStr(v) || !TOKEN_PATH.test(v)) err(`tokenMap.${k}: value must be a token path like color.brand`)
      }
  }
  if (json.measure !== undefined) {
    if (!Array.isArray(json.measure)) err('measure: expected an array')
    else
      json.measure.forEach((m, i) => {
        if (!isObj(m) || !isStr(m.path) || !TOKEN_PATH.test(m.path) || !isStr(m.selector) || !isStr(m.prop) || !isStr(m.type)) {
          err(`measure[${i}]: expected { path, selector, prop, type }`)
        }
      })
  }

  if (!Array.isArray(json.items) || json.items.length === 0) err('items: non-empty array required')
  else {
    const ids = new Set<string>()
    json.items.forEach((it, i) => {
      const at = `items[${i}]`
      if (!isObj(it)) return err(`${at}: expected an object`)
      if (!isStr(it.id) || !DS_ID.test(it.id)) err(`${at}.id: expected DS-NN`)
      else {
        if (ids.has(it.id)) err(`${at}.id: duplicate ${it.id}`)
        ids.add(it.id)
      }
      if (!isStr(it.route) || !it.route.startsWith('/')) err(`${at}.route: expected a path starting with /`)
      if (!Array.isArray(it.targets) || it.targets.length === 0) err(`${at}.targets: non-empty array required`)
      else
        it.targets.forEach((t, j) => {
          if (!isObj(t) || !isStr(t.label)) return err(`${at}.targets[${j}]: expected { label, … }`)
          if (!isStr(t.selector) && !(isStr(t.role) && isStr(t.name)) && !isStr(t.text)) {
            err(`${at}.targets[${j}] (${t.label}): needs selector, role+name or text`)
          }
          if (t.parts !== undefined && (!Array.isArray(t.parts) || t.parts.some((p) => !isObj(p) || !isStr(p.label) || (!isStr(p.selector) && !isStr(p.pseudo))))) {
            err(`${at}.targets[${j}].parts: expected [{ label, selector | pseudo }]`)
          }
        })
      if (!Array.isArray(it.capture) || it.capture.length === 0) err(`${at}.capture: non-empty array required`)
      else
        for (const k of it.capture) {
          if (!(DS_CAPTURE_KINDS as readonly unknown[]).includes(k)) err(`${at}.capture: unknown kind ${JSON.stringify(k)}`)
        }
      const caps = Array.isArray(it.capture) ? (it.capture as unknown[]) : []
      if (caps.includes('frames') && (!isObj(it.frames) || !isNum(it.frames.count) || !isNum(it.frames.intervalMs))) {
        err(`${at}.frames: { count, intervalMs } required when capture includes "frames"`)
      }
      if (caps.includes('video')) {
        if (!isObj(it.video) || !isNum(it.video.durationMs)) err(`${at}.video: { durationMs } required when capture includes "video"`)
        else if (it.video.durationMs > DS_VIDEO_MAX_MS) err(`${at}.video.durationMs: max ${DS_VIDEO_MAX_MS}`)
      }
      if (caps.includes('states') && (!Array.isArray(it.states) || it.states.length === 0)) {
        err(`${at}.states: non-empty array required when capture includes "states"`)
      }
      if (it.viewports !== undefined && (!Array.isArray(it.viewports) || it.viewports.some((v) => v !== 'desktop' && v !== 'mobile'))) {
        err(`${at}.viewports: desktop | mobile`)
      }
    })
  }
  if (errors.length) throw new Error(`${label}:\n  - ${errors.join('\n  - ')}`)
  return json as unknown as CaptureManifest
}

export function loadManifest(benchmark: string): CaptureManifest {
  const file = manifestFile(benchmark)
  if (!fs.existsSync(file)) throw new Error(`no capture manifest for ${benchmark} (${file})`)
  return assertManifest(JSON.parse(fs.readFileSync(file, 'utf8')), `${benchmark}.capture.json`)
}

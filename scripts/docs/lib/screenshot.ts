import fs from 'node:fs'
import path from 'node:path'

import { chromium, devices, type Browser, type BrowserContext, type Page } from '@playwright/test'

import { VIEWPORTS } from './schema'

export interface SiteMeta {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  ogSiteName: string
  ogImage: string
  canonical: string
  lang: string
  dir: string
  generator: string
}

export interface CaptureOptions {
  /** Where to write the PNGs */
  outDir: string
  timeoutMs: number
  /** Keep animations/transitions instead of freezing them */
  keepMotion: boolean
  /** false = collect metadata only */
  screenshot: boolean
}

export interface CaptureResult {
  meta: SiteMeta
  /** File names written into outDir, in capture order */
  screenshots: string[]
  warnings: string[]
}

const MAX_FULL_PAGE_HEIGHT = 15000
/** tsx/esbuild `keepNames` emits `__name(fn, 'x')` around named functions; give pages a no-op. */
const KEEP_NAMES_SHIM = 'window.__name = window.__name || ((fn) => fn)'
const NETWORK_IDLE_CAP_MS = 10_000

const COOKIE_BUTTONS = [
  'button:has-text("Accept all")',
  'button:has-text("Accept All")',
  'button:has-text("Accept")',
  'button:has-text("Agree")',
  'button:has-text("I agree")',
  'button:has-text("Got it")',
  'button:has-text("OK")',
  '[id*="cookie" i] button',
  '[class*="cookie" i] button',
  '[class*="consent" i] button',
]

const HIDE_BANNERS_CSS = `
  [class*="cookie" i], [id*="cookie" i], [class*="consent" i], [id*="consent" i],
  [class*="gdpr" i], [id*="gdpr" i] { display: none !important; }
`
const FREEZE_MOTION_CSS = `
  *, *::before, *::after {
    animation: none !important; transition: none !important; scroll-behavior: auto !important;
  }
`

/** Load `url` on desktop and mobile, collect metadata, and write the three screenshots. */
export async function captureSite(url: string, opts: CaptureOptions): Promise<CaptureResult> {
  const warnings: string[] = []
  const screenshots: string[] = []
  if (opts.screenshot) fs.mkdirSync(opts.outDir, { recursive: true })

  const browser = await chromium.launch()
  try {
    const desktop = await browser.newContext({
      viewport: VIEWPORTS.desktop,
      userAgent: devices['Desktop Chrome']?.userAgent,
      reducedMotion: opts.keepMotion ? 'no-preference' : 'reduce',
    })
    await desktop.addInitScript(KEEP_NAMES_SHIM)
    const page = await desktop.newPage()
    await load(page, url, opts, warnings)
    const meta = await readMeta(page)

    if (opts.screenshot) {
      await shoot(page, path.join(opts.outDir, 'desktop-fold.png'), false, warnings)
      screenshots.push('desktop-fold.png')
      await scrollThrough(page)
      await shoot(page, path.join(opts.outDir, 'desktop.png'), true, warnings)
      screenshots.push('desktop.png')
      await desktop.close()

      const mobile = await browser.newContext({
        ...devices['iPhone 14'],
        viewport: VIEWPORTS.mobile,
        deviceScaleFactor: 2, // 390 CSS px → 780 px PNG; crisp without the 3× file size
        reducedMotion: opts.keepMotion ? 'no-preference' : 'reduce',
      })
      await mobile.addInitScript(KEEP_NAMES_SHIM)
      const mpage = await mobile.newPage()
      await load(mpage, url, opts, warnings)
      await scrollThrough(mpage)
      await shoot(mpage, path.join(opts.outDir, 'mobile.png'), true, warnings)
      screenshots.push('mobile.png')
      await mobile.close()
    } else {
      await desktop.close()
    }

    return { meta, screenshots: screenshots.sort(), warnings }
  } finally {
    await closeQuietly(browser)
  }
}

async function load(page: Page, url: string, opts: CaptureOptions, warnings: string[]) {
  const attempt = async () => {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: opts.timeoutMs })
    await page.waitForLoadState('networkidle', { timeout: NETWORK_IDLE_CAP_MS }).catch(() => {
      warnings.push('network never went idle within 10s; captured anyway')
    })
    await page.evaluate(() => document.fonts?.ready).catch(() => undefined)
  }
  try {
    await attempt()
  } catch (err) {
    warnings.push(`first load failed (${(err as Error).message.split('\n')[0]}); retrying once`)
    await attempt()
  }
  await dismissCookieBanners(page)
  if (!opts.keepMotion) await page.addStyleTag({ content: FREEZE_MOTION_CSS }).catch(() => undefined)
}

async function dismissCookieBanners(page: Page) {
  for (const selector of COOKIE_BUTTONS) {
    try {
      const btn = page.locator(selector).first()
      if (await btn.isVisible({ timeout: 300 })) {
        await btn.click({ timeout: 1500 })
        await page.waitForTimeout(400)
        break
      }
    } catch {
      // not present or not clickable — try the next one
    }
  }
  await page.addStyleTag({ content: HIDE_BANNERS_CSS }).catch(() => undefined)
}

/** Scroll to the bottom in viewport steps so lazy-loaded media appears, then back to top. */
async function scrollThrough(page: Page) {
  await page
    .evaluate(async () => {
      const step = window.innerHeight
      const max = Math.min(document.documentElement.scrollHeight, 15000)
      for (let y = 0; y < max; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 250))
      }
      window.scrollTo(0, 0)
      await new Promise((r) => setTimeout(r, 500))
    })
    .catch(() => undefined)
}

async function shoot(page: Page, file: string, fullPage: boolean, warnings: string[]) {
  if (!fullPage) {
    await page.screenshot({ path: file })
    return
  }
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  const width = page.viewportSize()?.width ?? 1440
  if (height > MAX_FULL_PAGE_HEIGHT) {
    warnings.push(`${path.basename(file)}: page is ${height}px tall; clipped to ${MAX_FULL_PAGE_HEIGHT}px`)
    await page.screenshot({
      path: file,
      fullPage: true,
      clip: { x: 0, y: 0, width, height: MAX_FULL_PAGE_HEIGHT },
    })
    return
  }
  await page.screenshot({ path: file, fullPage: true })
}

async function readMeta(page: Page): Promise<SiteMeta> {
  // No named functions inside evaluate callbacks: tsx/esbuild `keepNames` would wrap them in a
  // `__name` helper that doesn't exist in the page. Anonymous call arguments are safe.
  const [description, ogTitle, ogDescription, ogSiteName, ogImage, generator] = await page.evaluate(
    (selectors) =>
      selectors.map((sel) => document.querySelector(sel)?.getAttribute('content')?.trim() ?? ''),
    [
      'meta[name="description"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[property="og:site_name"]',
      'meta[property="og:image"]',
      'meta[name="generator"]',
    ],
  )
  const [title, canonical, lang, dir] = await page.evaluate(() => [
    document.title.trim(),
    document.querySelector('link[rel="canonical"]')?.getAttribute('href')?.trim() ?? '',
    document.documentElement.getAttribute('lang')?.trim() ?? '',
    document.documentElement.getAttribute('dir')?.trim() ?? '',
  ])
  return {
    title: title ?? '',
    description: description ?? '',
    ogTitle: ogTitle ?? '',
    ogDescription: ogDescription ?? '',
    ogSiteName: ogSiteName ?? '',
    ogImage: ogImage ?? '',
    canonical: canonical ?? '',
    lang: lang ?? '',
    dir: dir ?? '',
    generator: generator ?? '',
  }
}

async function closeQuietly(browser: Browser | BrowserContext) {
  try {
    await browser.close()
  } catch {
    // already closed
  }
}

/** Metadata-only fallback when Playwright can't load the page (blocked, no browser, …). */
export async function fetchMetaBasic(url: string, timeoutMs: number): Promise<SiteMeta> {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(timeoutMs),
    headers: { 'user-agent': devices['Desktop Chrome']?.userAgent ?? 'Mozilla/5.0' },
  })
  const html = await res.text()
  const pick = (re: RegExp) => html.match(re)?.[1]?.trim() ?? ''
  const metaContent = (name: string) =>
    pick(new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)["']`, 'i')) ||
    pick(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${name}["']`, 'i'))
  return {
    title: pick(/<title[^>]*>([^<]*)<\/title>/i),
    description: metaContent('description'),
    ogTitle: metaContent('og:title'),
    ogDescription: metaContent('og:description'),
    ogSiteName: metaContent('og:site_name'),
    ogImage: metaContent('og:image'),
    canonical: pick(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i),
    lang: pick(/<html[^>]+lang=["']([^"']*)["']/i),
    dir: pick(/<html[^>]+dir=["']([^"']*)["']/i),
    generator: metaContent('generator'),
  }
}

// Temporary: capture every English page of the Marqevon deployment, desktop and mobile, for the
// case study. Page loads and scrolling only — no form submission. Delete after use.
//
//   npx tsx .capture-marqevon.mts [path-filter]
import { chromium, type Browser } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = 'http://194.59.214.136'
const OUT = 'Docs/Experience/Projects/marqevon/assets/capture-2026-09-26'
const filter = process.argv[2]

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, dpr: 2, mobile: false },
  mobile: { width: 390, height: 844, dpr: 2, mobile: true },
} as const
type Viewport = keyof typeof VIEWPORTS

/** `/` → `home`, `/insights/jet-a1-specification` → `insights--jet-a1-specification`. */
const nameFor = (path: string) => (path === '/' ? 'home' : path.slice(1).replace(/\//g, '--'))

async function pagePaths(): Promise<string[]> {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text()
  const english = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]!).pathname)
    .filter((p) => !/^\/(fr|ar|es|ja|zh|fa)(\/|$)/.test(p))
  // `/qualify` is linked from every primary CTA but left out of the sitemap.
  return [...new Set(['/', ...english, '/qualify'])].sort((a, b) =>
    a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b),
  )
}

const REVEAL_CSS = `
  .reveal, [class*="reveal"], .opacity-0 { opacity: 1 !important; transform: none !important; translate: none !important; }
  *, *::before, *::after { transition-duration: 0s !important; animation-play-state: paused !important; caret-color: transparent !important; }
`

async function capture(browser: Browser, path: string, viewport: Viewport) {
  const v = VIEWPORTS[viewport]
  const ctx = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: v.dpr,
    isMobile: v.mobile,
    hasTouch: v.mobile,
    colorScheme: 'light',
    locale: 'en-GB',
    reducedMotion: 'no-preference',
  })
  const page = await ctx.newPage()
  // Never let Next prefetch every linked route while the page is scrolled.
  await page.route('**/*', (route) =>
    route.request().url().includes('_rsc=') ? route.abort() : route.continue(),
  )
  const name = nameFor(path)
  try {
    await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 90_000 }).catch(async () => {
      await page.waitForLoadState('domcontentloaded')
    })
    // The consent bar is fixed; a full-page capture would bake it in mid-page.
    const essential = page.getByRole('button', { name: 'Essential only' })
    if (await essential.isVisible({ timeout: 4000 }).catch(() => false)) {
      await essential.click()
      await page.waitForTimeout(400)
    }
    await page.evaluate(`(async () => {
      for (const i of Array.from(document.images)) { i.loading = 'eager'; if (i.src) i.src = i.src }
      const step = Math.round(window.innerHeight * 0.8)
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y); await new Promise(r => setTimeout(r, 180))
      }
      window.scrollTo(0, 0)
    })()`)
    await page
      .waitForFunction(
        `Array.from(document.images).every(i => i.complete && (i.naturalWidth > 0 || !i.currentSrc))`,
        null,
        { timeout: 45_000 },
      )
      .catch(() => console.warn('  images still loading', viewport, path))
    await page.addStyleTag({ content: REVEAL_CSS })
    await page.evaluate('window.scrollTo(0, 0)')
    await page.waitForTimeout(1200)

    mkdirSync(`${OUT}/${viewport}/fold`, { recursive: true })
    await page.screenshot({ path: `${OUT}/${viewport}/fold/${name}.png` })
    const height: number = await page.evaluate('document.documentElement.scrollHeight')
    // Chromium caps a capture at 16,384 device pixels; tall pages go out at one pixel per CSS px.
    const scale = height * v.dpr > 16_000 ? 'css' : 'device'
    await page.screenshot({ path: `${OUT}/${viewport}/${name}.png`, fullPage: true, scale })
    const info = await page.evaluate(`({
      title: document.title,
      h1: (document.querySelector('h1')?.textContent || '').trim().replace(/\\s+/g, ' '),
      broken: Array.from(document.images).filter(i => i.currentSrc && !i.naturalWidth).map(i => i.currentSrc).slice(0, 5),
    })`)
    console.log('ok', viewport, path, height, scale, JSON.stringify(info))
    return { path, name, viewport, height, scale, ...(info as object) }
  } catch (error) {
    console.error('FAIL', viewport, path, (error as Error).message)
    return { path, name, viewport, error: (error as Error).message }
  } finally {
    await ctx.close()
  }
}

const paths = (await pagePaths()).filter(
  (p) => !filter || p === filter || (filter !== '/' && p.startsWith(filter)),
)
console.log(paths.length, 'pages')
const browser = await chromium.launch()
const results: unknown[] = []
for (const path of paths) {
  for (const viewport of Object.keys(VIEWPORTS) as Viewport[]) {
    results.push(await capture(browser, path, viewport))
  }
}
await browser.close()
mkdirSync(OUT, { recursive: true })
writeFileSync(`${OUT}/${filter ? 'manifest-partial' : 'manifest'}.json`, JSON.stringify(results, null, 2))

// Temporary: capture arashrezvani.me for the case study. Page loads and calendar browsing only —
// no form submission, no booking. Delete after use.
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const OUT = 'Docs/Experience/Projects/arash-rezvani/assets/capture-2026-09'
const BASE = 'https://arashrezvani.me'
type Shot = { path: string; out: string; w: number; h: number; mode: 'fold' | 'full' | 'scroll' | 'band'; to?: string; pickDay?: boolean }
const shots: Shot[] = [
  { path: '/fa/contact', out: 'desktop/contact-fa-calendar', w: 1440, h: 900, mode: 'band', to: 'یا گفت‌وگو' },
  { path: '/fa/contact', out: 'desktop/contact-fa-hours', w: 1440, h: 900, mode: 'band', to: 'یا گفت‌وگو', pickDay: true },
  { path: '/en/contact', out: 'desktop/contact-en-calendar', w: 1440, h: 900, mode: 'band', to: 'Or talk' },
  { path: '/en/contact', out: 'desktop/contact-en-hours', w: 1440, h: 900, mode: 'band', to: 'Or talk', pickDay: true },
  { path: '/fa/experience', out: 'mobile/experience-fa-practices', w: 390, h: 844, mode: 'scroll', to: 'نُه رشته' },
  { path: '/fa/contact', out: 'mobile/contact-fa-calendar', w: 390, h: 844, mode: 'scroll', to: 'یک روز انتخاب کنید' },
  { path: '/fa/contact', out: 'mobile/contact-fa-hours', w: 390, h: 844, mode: 'scroll', to: 'یک ساعت انتخاب کنید', pickDay: true },
]

const browser = await chromium.launch()
for (const shot of shots) {
  const mobile = shot.w < 600
  const ctx = await browser.newContext({
    viewport: { width: shot.w, height: shot.h },
    deviceScaleFactor: 2,
    isMobile: mobile,
    hasTouch: mobile,
    colorScheme: 'light',
    locale: shot.path.startsWith('/fa') ? 'fa-IR' : 'en-US',
    timezoneId: 'Asia/Tehran',
  })
  const page = await ctx.newPage()
  // Stop Next from prefetching every link, and never load a YouTube frame.
  await page.route('**/*', (route) => {
    const u = route.request().url()
    if (u.includes('_rsc=') || u.includes('youtube') || u.includes('ytimg')) return route.abort()
    return route.continue()
  })
  try {
    await page.goto(BASE + shot.path, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.waitForTimeout(2500)
    await page.evaluate(`(async () => {
      for (const i of Array.from(document.images)) { i.loading = 'eager'; if (i.src) i.src = i.src }
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 200)) }
      window.scrollTo(0, 0)
    })()`)
    await page.waitForFunction(`Array.from(document.images).every(i => i.complete)`, null, { timeout: 30000 }).catch(() => console.warn('images still loading', shot.path))
    if (shot.pickDay) {
      // The second open day of the month: selecting a day only lists its free quarter-hours.
      const days = page.locator('button:not([disabled])').filter({ hasText: /^[0-9۰-۹]{1,2}$/ })
      await days.nth(1).click()
      await page.waitForTimeout(1500)
    }
    await page.waitForTimeout(1200)
    mkdirSync(dirname(`${OUT}/${shot.out}.png`), { recursive: true })
    const heading = page.locator('h2:visible, h3:visible').filter({ hasText: shot.to ?? '' }).first()
    if (shot.mode === 'scroll') {
      await heading.evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 120))
      await page.waitForTimeout(900)
      await page.screenshot({ path: `${OUT}/${shot.out}.png` })
    } else if (shot.mode === 'band') {
      // The band row that holds the heading: its nearest ancestor as wide as the content column.
      await page.addStyleTag({ content: 'header{visibility:hidden!important}' })
      const band = heading.locator('xpath=ancestor::*[@class][1]/ancestor-or-self::*').last()
      const box = await heading.evaluate((el) => {
        let node = el as HTMLElement
        while (node.parentElement && node.getBoundingClientRect().width < 1200) node = node.parentElement
        const r = node.getBoundingClientRect()
        return { x: r.left, y: r.top + window.scrollY, width: r.width, height: r.height }
      })
      void band
      await page.screenshot({ path: `${OUT}/${shot.out}.png`, fullPage: true, clip: box })
    } else {
      await page.screenshot({ path: `${OUT}/${shot.out}.png`, fullPage: shot.mode === 'full' })
    }
    const marks = await page.evaluate(`Array.from(document.querySelectorAll('h1,h2,h3')).map(e => e.tagName + ' ' + Math.round(e.getBoundingClientRect().top + window.scrollY) + ' ' + e.textContent.trim().slice(0, 30)).join(' | ')`)
    console.log('ok', shot.out, shot.mode === 'full' ? marks : '')
  } catch (error) {
    console.error('FAIL', shot.out, (error as Error).message)
  }
  await ctx.close()
}
await browser.close()

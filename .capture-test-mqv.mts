// Temporary: test a >16k device-pixel full-page capture. Delete after use.
import { chromium } from '@playwright/test'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
const page = await ctx.newPage()
await page.goto('http://194.59.214.136/', { waitUntil: 'networkidle', timeout: 90000 })
const b = page.getByRole('button', { name: 'Essential only' }); if (await b.isVisible().catch(() => false)) await b.click()
await page.evaluate(`(async () => { for (const i of Array.from(document.images)) { i.loading='eager'; if (i.src) i.src = i.src } for (let y=0;y<document.documentElement.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,150))} window.scrollTo(0,0) })()`)
await page.waitForTimeout(3000)
await page.addStyleTag({ content: '.reveal,[class*="reveal"],.opacity-0{opacity:1!important;transform:none!important}' })
await page.screenshot({ path: process.env.OUTP!, fullPage: true, scale: 'device' })
await browser.close()

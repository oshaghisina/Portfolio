// Temporary: verify /work/cproperty in every locale and take review screenshots. Delete after use.
import { chromium } from '@playwright/test'

const OUT = '/private/tmp/claude-501/-Users-sinaoshaghi-Downloads-Projects-Development-Sina-Oshaghi-Portfolio/b22add90-8e45-4662-8234-569ed19ecb70/scratchpad/review'
const LOCALES = ['en', 'fa', 'ar', 'es', 'de', 'fr', 'ja']
const GATED = [/Motorway/i, /ULEZ/i, /Sell my van/i, /Everlodge|Airbnb/i, /Vauxhall/i, /£/, /\bAED\b/, /BBC|Daily Mail|Guardian/i, /carsparency|khodro/i, /Propertyeers|Online Ltd/i, /Milford/i, /Blue Yonder/i, /oscarisacc|sinaoshaghi@/i, /cproperty\.ca/i, /figma\.com/i]
const SHOTS = new Set((process.env.SHOTS ?? 'en:1440,en:390,fa:1440,fa:390').split(','))

const browser = await chromium.launch()
for (const locale of LOCALES) {
  for (const width of [1440, 390]) {
    const shot = SHOTS.has(`${locale}:${width}`)
    if (width === 390 && !shot) continue
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, colorScheme: 'light' })
    await ctx.addCookies([{ name: 'cookie-consent', value: 'accepted', url: 'http://localhost:3000' }])
    const page = await ctx.newPage()
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    const url = `http://localhost:3000${locale === 'en' ? '' : `/${locale}`}/work/cproperty`
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 })
    await page.locator('h1').first().waitFor({ state: 'visible', timeout: 120000 })
    const facts = await page.evaluate(`(() => ({
      h1: document.querySelectorAll('h1').length,
      title: document.querySelector('h1')?.textContent?.trim(),
      sections: document.querySelectorAll('main section[id^="s"]').length,
      figures: document.querySelectorAll('main figure').length,
      images: document.querySelectorAll('main img').length,
      hreflang: Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map((l) => l.getAttribute('hreflang')),
      emptyHeadings: Array.from(document.querySelectorAll('main h2, main h3')).filter((h) => !h.textContent.trim()).length,
      dir: document.documentElement.getAttribute('dir'),
      text: document.body.innerText + ' ' + Array.from(document.images).map((i) => i.alt).join(' '),
    }))()`) as Record<string, unknown> & { text: string }
    const gated = GATED.filter((pattern) => pattern.test(facts.text)).map(String)
    const { text: _text, ...rest } = facts
    console.log(JSON.stringify({ locale, width, status: response?.status(), ...rest, gated, errors: errors.slice(0, 2) }))
    if (shot) {
      await page.evaluate(`(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)) } window.scrollTo(0, 0) })()`)
      await page.waitForFunction(`Array.from(document.images).every(i => i.complete)`, null, { timeout: 60000 }).catch(() => {})
      await page.addStyleTag({ content: '*{animation:none!important;transition:none!important} [data-reveal]{opacity:1!important;transform:none!important}' })
      await page.waitForTimeout(800)
      await page.screenshot({ path: `${OUT}/cproperty-${locale}-${width}.png`, fullPage: true })
    }
    await ctx.close()
  }
}
await browser.close()

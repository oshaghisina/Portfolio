import { chromium } from '@playwright/test'

const OUT = '/tmp/shots'
const browser = await chromium.launch()

async function shot(url: string, width: number, name: string, sel?: string) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  // Next prefetches every <Link> on scroll and the dev server then compiles all of them.
  await page.route('**/*', (r) => (r.request().isNavigationRequest() && r.request().frame() === page.mainFrame() ? r.continue() : r.request().resourceType() === 'document' ? r.abort() : r.continue()))
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  if (sel) {
    const el = page.locator(sel).first()
    await el.waitFor({ state: 'visible', timeout: 20000 })
    await page.addStyleTag({ content: 'header.sticky{display:none !important}' })
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(700)
    await el.screenshot({ path: `${OUT}/${name}.png` })
  } else {
    await page.waitForTimeout(900)
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true })
  }
  const overflow = await page.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
  console.log(name, 'overflowX=', overflow)
  await ctx.close()
}

await shot('http://localhost:3000/', 1440, 'home-section-1440', '#experience')
await shot('http://localhost:3000/experience', 1440, 'exp-top-1440', '#capabilities')
await shot('http://localhost:3000/', 390, 'home-section-390', '#experience')
await shot('http://localhost:3000/fa', 1440, 'home-section-fa-1440', '#experience')
await shot('http://localhost:3000/', 1440, 'home-full-1440')
await browser.close()

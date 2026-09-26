/** One-off (delete after use): shoot the VIN roadmap chapter, from its heading to the downloads. */
import { chromium } from '@playwright/test'

const out = process.argv[2]!
const shots = [
  { name: 'en-desktop', path: '/work/vin-app', width: 1440, height: 900 },
  { name: 'en-mobile', path: '/work/vin-app', width: 390, height: 844 },
  { name: 'fa-desktop', path: '/fa/work/vin-app', width: 1440, height: 900 },
  { name: 'fa-mobile', path: '/fa/work/vin-app', width: 390, height: 844 },
]

const browser = await chromium.launch()
for (const shot of shots) {
  const page = await browser.newPage({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 2,
  })
  // Next prefetches every linked route in dev; only the page itself may load as a document.
  await page.route('**/*', (route) => {
    const request = route.request()
    if (request.resourceType() === 'document' && !request.isNavigationRequest()) return route.abort()
    return route.continue()
  })
  await page.goto(`http://localhost:3000${shot.path}`, { waitUntil: 'domcontentloaded', timeout: 180_000 })
  await page.locator('#s05-custom').waitFor({ state: 'attached', timeout: 120_000 })
  await page.waitForTimeout(5_000)
  await page.addStyleTag({
    content:
      'header{display:none!important} nextjs-portal{display:none!important} html{scroll-behavior:auto!important}' +
      '[data-reveal-state],[data-reveal-state]>*{opacity:1!important;translate:none!important}',
  })
  const box = (await page.evaluate(`(() => {
    const start = document.querySelector('#s05-custom')
    const end = document.querySelector('#s06-approach')
    const top = start.getBoundingClientRect().top + scrollY
    const bottom = end.getBoundingClientRect().top + scrollY
    const main = start.parentElement.getBoundingClientRect()
    return { x: main.left, y: top - 16, width: main.width, height: bottom - top }
  })()`)) as { x: number; y: number; width: number; height: number }
  await page.screenshot({ path: `${out}/${shot.name}.png`, clip: box, fullPage: true })
  console.log(shot.name, JSON.stringify(box))
  await page.close()
}
await browser.close()

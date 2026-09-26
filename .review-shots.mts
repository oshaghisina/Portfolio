// Temporary: full-page review screenshots of local case studies. Delete after use.
import { chromium } from '@playwright/test'
const OUT = '/private/tmp/claude-501/-Users-sinaoshaghi-Downloads-Projects-Development-Sina-Oshaghi-Portfolio/5079bc32-d1f1-4207-bd5e-95c5f936afbf/scratchpad/review'
const [slug, ...rest] = process.argv.slice(2)
const browser = await chromium.launch()
const sizes = (process.env.SIZES ?? '1440,390').split(',').map(Number)
for (const [prefix, width] of sizes.flatMap((w) => [['', w], ['/fa', w]] as const)) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, colorScheme: 'light' })
  await ctx.addCookies([{ name: 'cookie-consent', value: 'accepted', url: 'http://localhost:3000' }])
  const page = await ctx.newPage()
  await page.route('**/*', (r) => (r.request().resourceType() === 'document' && r.request().frame() !== page.mainFrame() ? r.abort() : r.request().url().includes('_rsc=') ? r.abort() : r.continue()))
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('http://localhost:3000' + prefix + '/work/' + slug, { waitUntil: 'domcontentloaded', timeout: 120000 })
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 120000 })
  await page.waitForTimeout(1500)
  await page.evaluate(`(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)) } window.scrollTo(0, 0) })()`)
  await page.waitForFunction(`Array.from(document.images).every(i => i.complete)`, null, { timeout: 60000 }).catch(() => {})
  await page.addStyleTag({ content: '*{animation:none!important;transition:none!important} [data-reveal]{opacity:1!important;transform:none!important}' })
  await page.waitForTimeout(800)
  const name = `${slug}${prefix.replace('/', '-') || '-en'}-${width}`
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true })
  const overflow = await page.evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth')
  console.log(name, 'overflowX', overflow, 'errors', errors.length ? errors.slice(0, 2) : 0)
  await ctx.close()
}
await browser.close()

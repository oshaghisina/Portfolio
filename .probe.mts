import { chromium } from '@playwright/test'
const browser = await chromium.launch()

const MEASURE = `(() => {
  const sec = document.querySelector('#experience')
  const canvas = sec.closest('.canvas')
  const cRect = canvas.getBoundingClientRect()
  const over = []
  sec.querySelectorAll('*').forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.width && (r.left < cRect.left - 1.5 || r.right > cRect.right + 1.5)) {
      over.push(el.tagName + '.' + String(el.className).slice(0, 40))
    }
  })
  const blocks = [...document.querySelectorAll('.my-block')].map((b) => {
    const h2 = b.querySelector('h2')
    return [(h2 ? h2.textContent : '(cta)').slice(0, 26), Math.round(b.getBoundingClientRect().height)]
  })
  return JSON.stringify({
    sectionH: Math.round(sec.getBoundingClientRect().height),
    pageH: Math.round(document.body.scrollHeight),
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    escapes: over,
    blocks,
  })
})()`

for (const [url, width] of [
  ['http://localhost:3000/', 1440], ['http://localhost:3000/', 430],
  ['http://localhost:3000/', 390], ['http://localhost:3000/', 360],
  ['http://localhost:3000/fa', 1440], ['http://localhost:3000/fa', 390],
  ['http://localhost:3000/ar', 1440], ['http://localhost:3000/ja', 1440],
  ['http://localhost:3000/de', 1440], ['http://localhost:3000/ja', 390],
] as [string, number][]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } })
  const page = await ctx.newPage()
  await page.route('**/*', (r) => (r.request().resourceType() === 'document' && !r.request().isNavigationRequest() ? r.abort() : r.continue()))
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.locator('#experience').waitFor({ state: 'visible', timeout: 20000 })
  const out = JSON.parse(await page.evaluate(MEASURE) as string)
  console.log(`${url.replace('http://localhost:3000', '') || '/'} @${width}  section=${out.sectionH}px  page=${out.pageH}px  overflowX=${out.overflowX}  escapes=${out.escapes.length ? out.escapes.join(' | ') : 'none'}`)
  if (width === 1440 && url.endsWith('3000/')) console.log('   blocks:', out.blocks.map((b: [string, number]) => `${b[0]}=${b[1]}`).join('  '))
  await ctx.close()
}
await browser.close()

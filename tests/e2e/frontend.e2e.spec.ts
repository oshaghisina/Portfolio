import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can load homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/Sina Oshaghi/)
    const heading = page.locator('h1').first()
    // Seeded EN hero from `src/endpoints/seed/home-copy.ts` — assert by content, not exact node
    // text, in case RichText / TwoTone splits the heading across children.
    await expect(heading).toContainText('Product designer who also runs growth')
  })
})

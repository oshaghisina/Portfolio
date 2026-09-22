import { test, expect } from '@playwright/test'

/**
 * The `/posts` → `/lab` rename and the locale readiness gate, smoke-tested against a running
 * dev server (see `playwright.config.ts`'s `webServer`). HTTP-only checks where possible — no
 * browser needed to observe a redirect, a 404, or a nav's contents.
 */
test.describe('Locale routing', () => {
  test('redirects the retired /posts path to /lab, preserving the locale prefix', async ({ request }) => {
    const bare = await request.get('http://localhost:3000/posts', { maxRedirects: 0 })
    expect(bare.status()).toBe(308)
    expect(bare.headers().location).toBe('/lab')

    const prefixed = await request.get('http://localhost:3000/fa/posts', { maxRedirects: 0 })
    expect(prefixed.status()).toBe(308)
    expect(prefixed.headers().location).toBe('/fa/lab')
  })

  test('a page unpublished in a locale 404s at that locale\'s URL instead of rendering empty', async ({ request }) => {
    // Lab posts are English-only by decision, which makes them the permanent fixture for this
    // rule: every *page* is now translated into all seven locales, so `/fa/contact` — what this
    // test used to assert — is a 200. The rule itself still has to hold.
    const response = await request.get('http://localhost:3000/fa/lab/digital-horizons', { maxRedirects: 0 })
    expect(response.status()).toBe(404)
  })

  test('every site page resolves in every locale', async ({ request }) => {
    const paths = ['', '/about', '/work', '/contact', '/lab']
    const locales = ['fa', 'ar', 'es', 'de', 'fr', 'ja']

    for (const path of paths) {
      expect((await request.get(`http://localhost:3000${path || '/'}`)).status()).toBe(200)
      for (const locale of locales) {
        const response = await request.get(`http://localhost:3000/${locale}${path}`)
        expect(response.status(), `/${locale}${path}`).toBe(200)
      }
    }
  })

  test('the nav renders translated labels, not English ones', async ({ page }) => {
    // The site chrome's `<header>` is the first on the page — block content (`SectionHeader`)
    // also renders `<header>` elements, so this must not match those too.
    await page.goto('http://localhost:3000/fa/work')
    const nav = page.locator('header').first().locator('nav')

    const labels = await nav.locator('a').allInnerTexts()
    expect(labels.length).toBeGreaterThan(0)
    // Not an assertion about the exact Persian wording, which is content and may be edited —
    // only that the locale is not silently serving the English strings.
    expect(labels).not.toContain('Work')
    expect(labels).not.toContain('About')
  })
})

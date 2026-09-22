import { test, expect } from '@playwright/test'

/**
 * The `/posts` → `/lab` rename and the locale readiness gate, smoke-tested against a running
 * dev server (see `playwright.config.ts`'s `webServer`). HTTP-only checks where possible — no
 * browser needed to observe a redirect, a 404, or an empty nav element.
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
    // Contact has no `fa` copy (D-009) — must never silently render the English page.
    const response = await request.get('http://localhost:3000/fa/contact', { maxRedirects: 0 })
    expect(response.status()).toBe(404)
  })

  test('an untranslated nav renders no links rather than visible empty anchors', async ({ page }) => {
    // Header/Footer are seeded English-only today — `/fa/work` is published, so the page
    // itself renders, but its nav should omit every item rather than show blank links.
    await page.goto('http://localhost:3000/fa/work')
    // The site chrome's `<header>` is the first on the page — block content (`SectionHeader`)
    // also renders `<header>` elements, so this must not match those too.
    const nav = page.locator('header').first().locator('nav')
    await expect(nav.locator('a')).toHaveCount(0)
  })
})

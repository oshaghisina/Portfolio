import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { HeaderLocaleMenu } from '@/Header/Nav/HeaderLocaleMenu'
import { HeaderNav } from '@/Header/Nav'
import { MobileNav } from '@/Header/Nav/MobileNav'
import { localeDestinations } from '@/components/LocaleSwitcher/destinations'
import type { Header } from '@/payload-types'
import { uiCopy } from '@/utilities/uiCopy'

afterEach(cleanup)

const header = {
  id: 1,
  navItems: [
    { id: 'work', link: { type: 'custom', url: '/work', label: 'Work' } },
    { id: 'about', link: { type: 'custom', url: '/about', label: 'About' } },
    { id: 'experience', link: { type: 'custom', url: '/experience', label: 'Experience' } },
    { id: 'contact', link: { type: 'custom', url: '/contact', label: 'Contact' } },
  ],
} as unknown as Header

describe('global header', () => {
  it('keeps the active link, locale prefix, and usable search control', () => {
    const { container } = render(
      <HeaderNav data={header} locale="fa" logicalPath="/about" readiness={{ fa: true }} />,
    )
    const desktopNav = container.querySelector('nav')!
    expect(desktopNav.className).toContain('xl:flex')
    expect(desktopNav.querySelector('a[aria-current="page"]')?.getAttribute('href')).toBe('/fa/about')
    expect(desktopNav.querySelector('a[href="/fa/work"]')).not.toBeNull()
    expect(screen.getByRole('link', { name: uiCopy.fa.search }).getAttribute('href')).toBe('/fa/search')
    expect(screen.getByRole('link', { name: uiCopy.fa.search }).className).toContain('size-(--size-control-height-sm)')
  })

  it('dismisses the desktop language menu with Escape and restores focus', () => {
    render(<HeaderLocaleMenu locale="en" logicalPath="/about" readiness={{ de: true }} />)
    const trigger = screen.getByRole('button', { name: 'Language' })
    fireEvent.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByRole('link', { name: 'Switch to Deutsch' }).getAttribute('href')).toBe('/de/about')
    fireEvent.keyDown(trigger, { key: 'Escape' })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(trigger)
  })

  it('keeps language routing ready-aware and names the target theme in every locale', () => {
    const options = localeDestinations('fa', '/about', { de: true })
    expect(options.find((option) => option.locale === 'de')?.href).toBe('/de/about')
    expect(options.find((option) => option.locale === 'ja')?.href).toBe('/ja')
    expect(options.find((option) => option.locale === 'en')?.href).toBe('/about')
    for (const copy of Object.values(uiCopy)) {
      expect(copy.switchToDarkMode).toBeTruthy()
      expect(copy.switchToLightMode).toBeTruthy()
    }
  })

  it('opens the full-screen native dialog and closes it on cancel', async () => {
    const { container } = render(<MobileNav data={header} foot={<span>Language list</span>} locale="en" />)
    const trigger = screen.getByRole('button', { name: 'Open menu' })
    const dialog = container.querySelector('dialog')!
    expect(dialog.className).toContain('w-screen')
    fireEvent.click(trigger)
    await waitFor(() => expect(dialog.hasAttribute('open')).toBe(true))
    expect(dialog.querySelector('a[href="/work"]')).not.toBeNull()
    expect(dialog.textContent).toContain('Language list')
    fireEvent(dialog, new Event('cancel', { cancelable: true }))
    await waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'))
  })
})

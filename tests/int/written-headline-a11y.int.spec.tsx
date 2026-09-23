import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { WrittenHeadline } from '@/components/WrittenHeadline'
import { splitHeroRichText } from '@/heros/splitHeroRichText'
import { heading, paragraph, richText } from '@/endpoints/seed/lexical-helpers'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('splitHeroRichText', () => {
  it('extracts the h1 and leaves the lede body', () => {
    const data = richText(
      heading('Product designer who also runs growth', 'h1'),
      paragraph('A short lede.'),
    )
    const { body, title } = splitHeroRichText(data)
    expect(title).toBe('Product designer who also runs growth')
    expect(body).not.toBeNull()
    const children = (body as DefaultTypedEditorState).root.children
    expect(children).toHaveLength(1)
    expect(children[0]).toMatchObject({ type: 'paragraph' })
  })

  it('returns null body when the hero is title-only', () => {
    const data = richText(heading('Have something worth figuring out?', 'h1'))
    const { body, title } = splitHeroRichText(data)
    expect(title).toBe('Have something worth figuring out?')
    expect(body).toBeNull()
  })
})

describe('WrittenHeadline a11y', () => {
  it('exposes the full title once via aria-label', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation(() => ({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    )

    render(<WrittenHeadline locale="en" text="Product designer who also runs growth" />)

    const headingEl = screen.getByRole('heading', {
      level: 1,
      name: 'Product designer who also runs growth',
    })
    expect(headingEl).toBeTruthy()
    expect(headingEl.getAttribute('aria-label')).toBe('Product designer who also runs growth')
    expect(headingEl.querySelector('[aria-hidden="true"]')).toBeTruthy()
  })
})

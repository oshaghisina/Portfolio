import React from 'react'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { TracksBlock } from '@/blocks/Tracks/Component.client'
import { TrackIllustration, type TrackKey } from '@/blocks/Tracks/Illustrations'
import { trackNoun, trackStageCopy } from '@/blocks/Tracks/copy'
import { homeCopy } from '@/endpoints/seed/home-copy'
import { LOCALES } from '@/utilities/locale'

const keys: TrackKey[] = ['productDesign', 'aiWorkflow', 'designSystems']
const content = (locale: (typeof LOCALES)[number]) => ({
  locale,
  sectionHeader: homeCopy[locale].tracks.header,
  tracks: keys.map((key, index) => ({ key, ...homeCopy[locale].tracks.items[index]! })),
})
afterEach(cleanup)

describe('Tracks stories', () => {
  it.each(LOCALES)('renders three translated stages per track in %s with no SVG text', (locale) => {
    const { container } = render(<TracksBlock {...content(locale)} />)
    const panels = container.querySelectorAll('.tracks-story-scene')
    expect(panels).toHaveLength(3)
    panels.forEach((panel, index) => {
      expect(panel.querySelectorAll('figcaption li')).toHaveLength(3)
      for (const label of trackStageCopy[locale][keys[index]])
        expect(panel.textContent).toContain(label)
      expect(panel.querySelector('svg text, svg image, canvas')).toBeNull()
    })
    expect(container.textContent).toContain(trackNoun[locale])
    expect(container.querySelector('[data-reveal-unit]')).toBeTruthy()
  })

  it('retains all panels in a shared grid cell when switching and only activates one scene', () => {
    const { container } = render(<TracksBlock {...content('en')} />)
    const panels = Array.from(container.querySelectorAll('.tracks-story-scene'))
    const navigation = screen.getByRole('group', { name: 'Primarily focused on' })
    const buttons = within(navigation).getAllByRole('button')
    for (let index = 0; index < 3; index++) {
      fireEvent.click(buttons[index])
      expect(panels.map((p) => p.getAttribute('data-track-active'))).toEqual(
        keys.map((_, i) => String(i === index)),
      )
      expect(panels.map((p) => p.getAttribute('aria-hidden'))).toEqual(
        keys.map((_, i) => String(i !== index)),
      )
      expect(Array.from(container.querySelectorAll('.tracks-story-scene'))).toEqual(panels)
      expect(buttons[index].getAttribute('aria-pressed')).toBe('true')
    }
    fireEvent.click(screen.getByRole('button', { name: 'Pause illustrations' }))
    expect(
      container.querySelector('.experience-visual-scope')?.getAttribute('data-exp-paused'),
    ).toBe('true')
    fireEvent.click(buttons[0])
    expect(screen.getByRole('button', { name: 'Resume illustrations' })).toBeTruthy()
  })

  it('follows keyboard reading order in Persian and keeps each object unmirrored', () => {
    const { container } = render(<TracksBlock {...content('fa')} />)
    const navigation = screen.getByRole('group')
    const buttons = within(navigation).getAllByRole('button')
    fireEvent.keyDown(buttons[0], { key: 'ArrowLeft' })
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true')
    expect(document.activeElement).toBe(buttons[1])
    fireEvent.keyDown(buttons[1], { key: 'End' })
    expect(buttons[2].getAttribute('aria-pressed')).toBe('true')
    fireEvent.keyDown(buttons[2], { key: 'Home' })
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true')
    const svg = container.querySelector<SVGElement>('svg[data-track-art]')!
    expect(svg.style.direction).toBe('ltr')
    expect(svg.querySelector('g[transform="translate(640 0) scale(-1 1)"]')).toBeTruthy()
  })

  it('gives every track distinct geometry with a reserved aspect ratio and a meaningful accent', () => {
    const shapes = new Set<string>()
    for (const key of keys) {
      const { container } = render(<TrackIllustration trackKey={key} />)
      const svg = container.querySelector('svg')!
      expect(svg.getAttribute('viewBox')).toBe('0 0 640 400')
      expect(svg.getAttribute('aria-hidden')).toBe('true')
      expect(svg.getAttribute('focusable')).toBe('false')
      expect(svg.querySelector('[fill="var(--track-accent)"]')).toBeTruthy()
      shapes.add(svg.innerHTML)
      cleanup()
    }
    expect(shapes.size).toBe(3)
  })
})

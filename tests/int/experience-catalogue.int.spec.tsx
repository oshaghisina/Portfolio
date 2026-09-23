/**
 * ExperienceCatalogue + ExperienceGrid — logo slot, mono markers, lg orphan spans.
 */
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { ExperienceCatalogueBlock } from '@/blocks/ExperienceCatalogue/Component'
import { ExperienceGrid } from '@/components/ExperienceGrid'

afterEach(cleanup)

describe('ExperienceGrid logo slot + orphan spans', () => {
  it('renders an optional logo node in the top row beside the index', () => {
    render(
      <ExperienceGrid
        items={[
          {
            index: 'A1',
            name: 'Acme',
            role: 'Designer',
            logo: (
              // eslint-disable-next-line @next/next/no-img-element -- test fixture, not production
              <img alt="" aria-hidden data-testid="mark" src="/company-logos/taha-gasht.png" />
            ),
          },
        ]}
      />,
    )
    const mark = screen.getByTestId('mark')
    expect(mark.getAttribute('aria-hidden')).toBe('true')
    expect(mark.getAttribute('alt')).toBe('')
    expect(screen.getByText('A1').className).toContain('index-code')
    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('Acme')
  })

  it('keeps text-only cells when no logo is passed', () => {
    const { container } = render(
      <ExperienceGrid items={[{ index: 'A1', name: 'Acme', role: 'Designer' }]} />,
    )
    expect(container.querySelector('img')).toBeNull()
    expect(screen.getByText('Acme')).toBeTruthy()
  })

  it('applies lg last-row orphan span classes so bg-line never fills empty cells', () => {
    const { container } = render(
      <ExperienceGrid
        items={Array.from({ length: 10 }, (_, i) => ({
          index: `A${i + 1}`,
          name: `Co ${i + 1}`,
          role: 'Role',
        }))}
      />,
    )
    const cell = container.querySelector('li')!
    const classes = cell.className
    expect(classes).toContain('lg:[&:last-child:nth-child(4n+1)]:col-span-4')
    expect(classes).toContain('lg:[&:nth-last-child(2):nth-child(4n+1)]:col-span-2')
    expect(classes).toContain('lg:[&:last-child:nth-child(4n+2)]:col-span-2')
    expect(classes).toContain('lg:[&:last-child:nth-child(4n+3)]:col-span-2')
    expect(classes).toContain('group')
  })
})

describe('ExperienceCatalogueBlock', () => {
  it('passes a CompanyLogo for a known companyKey', () => {
    const { container } = render(
      <ExperienceCatalogueBlock
        items={[
          {
            index: 'A1',
            name: 'Taha Gasht',
            role: 'Designer',
            companyKey: 'tahaGasht',
          },
        ]}
        sectionHeader={{ tag: 'Experience', lead: "Where I've", tail: 'worked' }}
      />,
    )
    const img = container.querySelector('img')
    expect(img).toBeTruthy()
    expect(img!.getAttribute('aria-hidden')).toBe('true')
    expect(img!.getAttribute('src')).toBe('/company-logos/taha-gasht.png')
  })

  it('renders text only when companyKey is missing or unknown', () => {
    const { container, rerender } = render(
      <ExperienceCatalogueBlock
        items={[{ index: 'A1', name: 'Acme', role: 'Designer' }]}
        sectionHeader={{ tag: 'Experience', lead: "Where I've", tail: 'worked' }}
      />,
    )
    expect(container.querySelector('img')).toBeNull()

    rerender(
      <ExperienceCatalogueBlock
        items={[
          {
            index: 'A1',
            name: 'Acme',
            role: 'Designer',
            companyKey: 'notARealKey' as 'tahaGasht',
          },
        ]}
        sectionHeader={{ tag: 'Experience', lead: "Where I've", tail: 'worked' }}
      />,
    )
    expect(container.querySelector('img')).toBeNull()
    expect(screen.getByText('Acme')).toBeTruthy()
  })

  it('renders two marks for Carsparency & Khodro45', () => {
    const { container } = render(
      <ExperienceCatalogueBlock
        items={[
          {
            index: 'A3',
            name: 'Carsparency & Khodro45',
            role: 'Designer',
            companyKey: 'carsparencyKhodro45',
          },
        ]}
        sectionHeader={{ tag: 'Experience', lead: "Where I've", tail: 'worked' }}
      />,
    )
    const imgs = container.querySelectorAll('img')
    expect(imgs).toHaveLength(2)
    expect(imgs[0]!.getAttribute('src')).toBe('/company-logos/carsparency.png')
    expect(imgs[1]!.getAttribute('src')).toBe('/company-logos/khodro45.png')
  })
})

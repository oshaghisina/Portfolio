/**
 * R11 right-sized images (jsdom): which of an upload's existing copies a browser may load, per
 * usage, and the `<source>` ImageMedia renders for them. Byte counts in the fixtures are the real
 * ones from the Arvan bucket (2026-09-28), so the "copy heavier than its original" cases are the
 * ones the site actually has.
 */
import { cleanup, fireEvent, render } from '@testing-library/react'
import React from 'react'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'

import { FigureBlock } from '@/blocks/CaseStudy/Figure/Component'
import { caseStudyCopy } from '@/components/CaseStudy/copy'
import { Media } from '@/components/Media'
import {
  capDensity,
  HIGH_DENSITY,
  imageCandidates,
  responsiveSource,
  scaledSizes,
  toSrcSet,
  type ResponsiveResource,
} from '@/components/Media/responsive'
import { ProjectArt } from '@/components/ProjectArt'
import type { CaseStudyFigureBlock, Media as MediaDoc } from '@/payload-types'

afterEach(cleanup)

const BUCKET = 'https://sinaoshaghi-portfolio.s3.ir-thr-at1.arvanstorage.ir'
const NONE = {
  url: null,
  width: null,
  height: null,
  mimeType: null,
  filesize: null,
  filename: null,
}

type Sizes = NonNullable<MediaDoc['sizes']>
const copy = (
  name: string,
  width: number,
  height: number,
  filesize: number | null,
  mime = 'image/png',
) => ({
  url: `${BUCKET}/${name}-${width}x${height}.${mime === 'image/png' ? 'png' : 'webp'}`,
  width,
  height,
  mimeType: mime,
  filesize,
  filename: `${name}-${width}x${height}.png`,
})

const upload = (
  name: string,
  width: number,
  height: number,
  filesize: number | null,
  sizes: Partial<Sizes>,
  extra: Partial<MediaDoc> = {},
): MediaDoc => ({
  id: name,
  alt: `${name} screen`,
  url: `${BUCKET}/${name}.png`,
  filename: `${name}.png`,
  mimeType: 'image/png',
  width,
  height,
  filesize,
  sizes: {
    thumbnail: NONE,
    square: NONE,
    small: NONE,
    medium: NONE,
    large: NONE,
    xlarge: NONE,
    og: NONE,
    ...sizes,
  },
  updatedAt: '2026-09-26T00:00:00.000Z',
  createdAt: '2026-09-26T00:00:00.000Z',
  ...extra,
})

/** RP1 "today spotlight": a 780×3034 PNG whose 600 px copy is still lighter than the original. */
const spotlight = upload('rp1-arena--today-spotlight', 780, 3034, 2371152, {
  thumbnail: copy('rp1-arena--today-spotlight', 300, 1167, 536383),
  square: copy('rp1-arena--today-spotlight', 500, 500, 306440),
  small: copy('rp1-arena--today-spotlight', 600, 2334, 2050251),
  og: copy('rp1-arena--today-spotlight', 1200, 630, 723683),
})

/** Khodro45 car list: the 600 px copy (907,703 B) outweighs the 780 px original (879,736 B). */
const carList = upload('khodro45-dealer-app--car-list-live-1', 780, 1688, 879736, {
  thumbnail: copy('khodro45-dealer-app--car-list-live-1', 300, 649, 258502),
  square: copy('khodro45-dealer-app--car-list-live-1', 500, 500, 385419),
  small: copy('khodro45-dealer-app--car-list-live-1', 600, 1298, 907703),
  og: copy('khodro45-dealer-app--car-list-live-1', 1200, 630, 1040493),
})

/** VIN home: a 1× capture, 390 px wide, with only a 300 px copy (and enlarged crops). */
const vinHome = upload('vin-app--home-default', 390, 2940, 1079415, {
  thumbnail: copy('vin-app--home-default', 300, 2262, 911219),
  square: copy('vin-app--home-default', 500, 500, 446718),
  og: copy('vin-app--home-default', 1200, 630, 1407816),
})

/** VIN colour sheet: both the 600 and 900 px copies outweigh the 933 px original. */
const colourSheet = upload('vin-app--design-system-color', 933, 1600, 117347, {
  thumbnail: copy('vin-app--design-system-color', 300, 514, 68264),
  small: copy('vin-app--design-system-color', 600, 1029, 144556),
  medium: copy('vin-app--design-system-color', 900, 1543, 248519),
})

const widths = (resource: ResponsiveResource, usage?: Parameters<typeof imageCandidates>[1]) =>
  imageCandidates(resource, usage).map((candidate) => candidate.width)

describe('imageCandidates', () => {
  it('offers the scaled copies and the original, narrowest first, never the square or og crops', () => {
    expect(widths(spotlight)).toEqual([300, 600, 780])
  })

  it('drops a copy that weighs more than a wider file: the original stands in for it', () => {
    expect(widths(carList)).toEqual([300, 780])
    expect(widths(carList, 'thumbnail')).toEqual([300, 780])
    expect(widths(colourSheet)).toEqual([300, 933])
  })

  it('keeps thumbnails off the full original when a lighter copy covers it', () => {
    expect(widths(spotlight, 'thumbnail')).toEqual([300, 600])
    // A 1× capture's only copy: the tile loads it, not the 1 MB original.
    expect(widths(vinHome, 'thumbnail')).toEqual([300])
    expect(widths(vinHome, 'figure')).toEqual([300, 390])
  })

  it('falls back to the original alone when no usable copy exists', () => {
    expect(imageCandidates(upload('bare', 780, 1688, 500000, {}))).toEqual([])
    // Only crops and not-generated sizes: nothing scaled to choose from.
    expect(
      imageCandidates(
        upload('crops-only', 390, 844, 90000, {
          square: copy('crops-only', 500, 500, 40000),
          og: copy('crops-only', 1200, 630, 80000),
        }),
      ),
    ).toEqual([])
    // Every copy heavier than the original: the original alone is right.
    expect(
      imageCandidates(
        upload('light-original', 780, 1688, 100000, {
          thumbnail: copy('light-original', 300, 649, 120000),
        }),
      ),
    ).toEqual([])
    expect(imageCandidates({ ...spotlight, url: null })).toEqual([])
    expect(imageCandidates({ ...spotlight, sizes: undefined })).toEqual([])
  })

  it('never offers an enlargement or a same-width re-encode', () => {
    const small = upload('small-original', 500, 1000, 90000, {
      thumbnail: copy('small-original', 300, 600, 30000),
      small: copy('small-original', 600, 1200, 60000),
      medium: copy('small-original', 500, 1000, 50000),
    })
    expect(widths(small)).toEqual([300, 500])
    expect(imageCandidates(small).at(-1)!.original).toBe(true)
  })

  it('chooses by width where byte counts are missing', () => {
    const unknown = upload('unknown-bytes', 1600, 1000, null, {
      thumbnail: copy('unknown-bytes', 300, 188, null),
      small: copy('unknown-bytes', 600, 375, 90000),
      medium: copy('unknown-bytes', 900, 563, null),
    })
    expect(widths(unknown)).toEqual([300, 600, 900, 1600])
    expect(widths(unknown, 'thumbnail')).toEqual([300, 600, 900])
  })

  it('gives SVG, GIF, video and the viewer no srcset at all', () => {
    const sizes = { thumbnail: copy('x', 300, 300, 100) }
    expect(
      imageCandidates(
        upload('logo', 600, 600, 5000, sizes, {
          mimeType: 'image/svg+xml',
          url: `${BUCKET}/logo.svg`,
        }),
      ),
    ).toEqual([])
    expect(
      imageCandidates(
        upload('loop', 600, 600, 5000, sizes, { mimeType: 'image/gif', url: `${BUCKET}/loop.gif` }),
      ),
    ).toEqual([])
    // Known by extension when the MIME type is missing.
    expect(
      imageCandidates(
        upload('loop', 600, 600, 5000, sizes, {
          mimeType: null,
          url: `${BUCKET}/loop.gif`,
          filename: 'loop.gif',
        }),
      ),
    ).toEqual([])
    expect(
      imageCandidates(upload('clip', 600, 600, 5000, sizes, { mimeType: 'video/mp4' })),
    ).toEqual([])
    expect(imageCandidates(spotlight, 'viewer')).toEqual([])
  })
})

describe('srcset and sizes', () => {
  it('writes width descriptors with the original’s cache tag', () => {
    expect(toSrcSet(imageCandidates(carList), '2026-09-26T18:31:08.949Z')).toBe(
      `${BUCKET}/khodro45-dealer-app--car-list-live-1-300x649.png?2026-09-26T18%3A31%3A08.949Z 300w, ` +
        `${BUCKET}/khodro45-dealer-app--car-list-live-1.png?2026-09-26T18%3A31%3A08.949Z 780w`,
    )
  })

  it('caps previews at 2× on ~3× screens and leaves every other screen on the original list', () => {
    expect(capDensity('(min-width: 1100px) 264px, (min-width: 768px) 25vw, 39vw')).toBe(
      `(min-width: 1100px) and ${HIGH_DENSITY} 176px, (min-width: 768px) and ${HIGH_DENSITY} 16.67vw, ` +
        `${HIGH_DENSITY} 26vw, (min-width: 1100px) 264px, (min-width: 768px) 25vw, 39vw`,
    )
    expect(capDensity('calc(100vw - 4.5rem)')).toBe(
      `${HIGH_DENSITY} calc((100vw - 4.5rem) * 2 / 3), calc(100vw - 4.5rem)`,
    )
    // `or` and `not` conditions are bracketed before the density test is added.
    expect(capDensity('(max-width: 400px) or (orientation: portrait) 90vw, 30rem')).toBe(
      `((max-width: 400px) or (orientation: portrait)) and ${HIGH_DENSITY} 60vw, ${HIGH_DENSITY} 20rem, ` +
        '(max-width: 400px) or (orientation: portrait) 90vw, 30rem',
    )
  })

  it('returns a sizes list it cannot read unchanged', () => {
    expect(capDensity('(min-width: 600px)')).toBe('(min-width: 600px)')
    expect(capDensity('')).toBe('')
  })

  it('scales a min() or max() length inside one calc()', () => {
    expect(capDensity('min(100vw, 20rem)')).toBe(
      `${HIGH_DENSITY} calc(min(100vw, 20rem) * 2 / 3), min(100vw, 20rem)`,
    )
  })

  it('caps only thumbnails; a figure keeps the full density for reading', () => {
    expect(responsiveSource(spotlight, { sizes: '20rem', usage: 'figure' })!.sizes).toBe('20rem')
    expect(responsiveSource(spotlight, { sizes: '20rem', usage: 'thumbnail' })!.sizes).toBe(
      `${HIGH_DENSITY} 13.33rem, 20rem`,
    )
    expect(responsiveSource(spotlight, { sizes: '20rem', usage: 'viewer' })).toBeNull()
  })

  it('trims bulk page data to the scaled copies and the fields a srcset reads', () => {
    expect(scaledSizes(carList)).toEqual({
      thumbnail: { url: carList.sizes!.thumbnail!.url, width: 300, height: 649, filesize: 258502 },
      small: { url: carList.sizes!.small!.url, width: 600, height: 1298, filesize: 907703 },
    })
    expect(scaledSizes(upload('bare', 780, 1688, 1, {}))).toBeUndefined()
  })
})

describe('ImageMedia', () => {
  const pictureOf = (container: HTMLElement) => container.querySelector('picture')!

  it('adds a source of existing copies and keeps the original as the img fallback', () => {
    const { container } = render(<Media resource={spotlight} size="20rem" />)
    const source = pictureOf(container).querySelector('source')!
    const img = pictureOf(container).querySelector('img')!
    expect(source.getAttribute('srcset')).toContain('-300x1167.png?')
    expect(source.getAttribute('srcset')).toContain('-600x2334.png?')
    expect(source.getAttribute('srcset')).toContain('rp1-arena--today-spotlight.png?')
    expect(source.getAttribute('srcset')).not.toContain('500x500')
    expect(source.getAttribute('srcset')).not.toContain('1200x630')
    expect(source.getAttribute('sizes')).toBe('20rem')
    // Source before img, so the browser reads it first.
    expect(pictureOf(container).firstElementChild).toBe(source)
    expect(img.getAttribute('src')).toContain('rp1-arena--today-spotlight.png?')
    // Space is reserved and the text alternative kept.
    expect(img.getAttribute('width')).toBe('780')
    expect(img.getAttribute('height')).toBe('3034')
    expect(img.getAttribute('alt')).toBe('rp1-arena--today-spotlight screen')
    expect(img.getAttribute('loading')).toBe('lazy')
  })

  it('gives the viewer, SVG and optimised local paths no source', () => {
    const viewer = render(<Media resource={spotlight} size="26rem" usage="viewer" />)
    expect(viewer.container.querySelector('source')).toBeNull()
    expect(viewer.container.querySelector('img')!.getAttribute('src')).toContain(
      'rp1-arena--today-spotlight.png',
    )
    cleanup()
    const svg = render(
      <Media
        resource={upload(
          'mark',
          64,
          64,
          900,
          {},
          { mimeType: 'image/svg+xml', url: `${BUCKET}/mark.svg` },
        )}
      />,
    )
    expect(svg.container.querySelector('source')).toBeNull()
    cleanup()
    const local = render(
      <Media
        resource={{ ...spotlight, url: '/api/media/file/rp1-arena--today-spotlight.png' }}
        size="20rem"
      />,
    )
    expect(local.container.querySelector('source')).toBeNull()
  })

  it('loads the hero eagerly at high priority without preloading the original', () => {
    const { container } = render(<Media priority resource={spotlight} size="20rem" />)
    const img = container.querySelector('img')!
    expect(img.getAttribute('loading')).toBe('eager')
    expect(img.getAttribute('fetchpriority')).toBe('high')
    expect(document.head.querySelector('link[rel="preload"][as="image"]')).toBeNull()
  })

  it('renders the same files in a right-to-left page', () => {
    const attrs = (dir: 'ltr' | 'rtl') => {
      const { container } = render(
        <div dir={dir}>
          <Media resource={carList} size="(min-width: 768px) 120px, 76px" usage="thumbnail" />
        </div>,
      )
      const source = container.querySelector('source')!
      const result = [source.getAttribute('srcset'), source.getAttribute('sizes')]
      cleanup()
      return result
    }
    expect(attrs('rtl')).toEqual(attrs('ltr'))
  })
})

describe('covers and the page index', () => {
  it('sizes a phone screen and a desktop screen on one plate separately, as previews', () => {
    const desktop = upload('desk', 2880, 1800, 1000000, {
      thumbnail: copy('desk', 300, 188, 30000),
      small: copy('desk', 600, 375, 90000),
    })
    const { container } = render(
      <ProjectArt
        companion={desktop}
        lead={spotlight}
        size={{ phone: '39vw', desktop: '76vw' }}
        slug="rp1-arena"
      />,
    )
    const phone = container.querySelector('.project-art-phone source')!
    const wide = container.querySelector('.project-art-desktop source')!
    expect(phone.getAttribute('sizes')).toBe(`${HIGH_DENSITY} 26vw, 39vw`)
    expect(wide.getAttribute('sizes')).toBe(`${HIGH_DENSITY} 50.67vw, 76vw`)
    // A cover never loads the 2.3 MB capture when its 600 px copy is lighter.
    expect(phone.getAttribute('srcset')).not.toContain('rp1-arena--today-spotlight.png')
  })

  describe('pages figure', () => {
    beforeAll(() => {
      const proto = HTMLDialogElement.prototype
      if (!Object.getOwnPropertyDescriptor(proto, 'open')) {
        Object.defineProperty(proto, 'open', {
          configurable: true,
          get(this: HTMLDialogElement) {
            return this.hasAttribute('open')
          },
        })
      }
      proto.showModal = function (this: HTMLDialogElement) {
        this.setAttribute('open', '')
      }
      proto.close = function (this: HTMLDialogElement) {
        this.removeAttribute('open')
        this.dispatchEvent(new Event('close'))
      }
    })

    const first = (i: number) =>
      upload(`screen-${i}`, 780, 1688, 60000, {
        thumbnail: copy(`screen-${i}`, 300, 649, 12000, 'image/webp'),
        small: copy(`screen-${i}`, 600, 1298, 40000, 'image/webp'),
      })
    const whole = (i: number) =>
      upload(`screen-${i}--whole`, 780, 8000, 300000, {
        thumbnail: copy(`screen-${i}--whole`, 300, 3077, 90000, 'image/webp'),
      })
    const items: NonNullable<CaseStudyFigureBlock['items']> = [1, 2].map((i) => ({
      id: `row-${i}`,
      caption: `Screen ${i}`,
      media: first(i),
      mobileFull: whole(i),
    }))

    it('tiles load copies of the first screen; the viewer opens the whole original', () => {
      const { container, getByRole } = render(
        <FigureBlock
          blockType="csFigure"
          copy={caseStudyCopy.en}
          items={items}
          layout="pages"
          locale="en"
          number="04"
          treatment="screen"
        />,
      )
      const tile = container.querySelector('ol source')!
      expect(tile.getAttribute('srcset')).toContain('screen-1-300x649.webp')
      expect(tile.getAttribute('srcset')).not.toContain('--whole')
      // A phone tile is a preview: 2× on ~3× screens, though ScreenFrame renders it.
      expect(tile.getAttribute('sizes')).toContain(HIGH_DENSITY)

      fireEvent.click(getByRole('button', { name: /Screen 1/ }))
      const dialog = container.querySelector('dialog')!
      expect(dialog.querySelector('source')).toBeNull()
      expect(dialog.querySelector('img')!.getAttribute('src')).toContain('screen-1--whole.png')
    })
  })
})

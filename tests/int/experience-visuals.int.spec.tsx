import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Payload } from 'payload'
import type { Page } from '@/payload-types'
import { CapabilityIndex } from '@/components/CapabilityIndex'
import { SkillIcon } from '@/blocks/CapabilityIcons'
import { SKILL_KEYS, SKILL_GROUP_KEYS, SKILLS_BY_GROUP } from '@/blocks/CapabilityIcons/keys'
import { INDUSTRY_COUNT } from '@/blocks/IndustryGrid/catalogue'
import { CapabilityModelBlock } from '@/blocks/CapabilityModel/Component'
import {
  ExperienceMotion,
  ExperienceMotionControl,
} from '@/components/ExperienceVisuals/Motion.client'
import { DISCIPLINE_KEYS, experienceVisualCopy } from '@/components/ExperienceVisuals/copy'
import {
  buildExperienceLayout,
  localizeExperienceLayout,
} from '@/endpoints/seed/experience-page-content'
import { experiencePageCopy } from '@/endpoints/seed/experience-page-copy'
import { backfillDisciplineKeys, seedExperienceVisuals } from '@/endpoints/seed/experience-visuals'
import { LOCALES, type Locale } from '@/utilities/locale'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

function oldLayout(): Page['layout'] {
  return buildExperienceLayout(experiencePageCopy.en)!.map((block, index) => {
    if (block.blockType !== 'capabilityModel') return { ...block, id: `block-${index}` }
    return {
      ...block,
      id: 'model',
      disciplines: [
        ...block.disciplines.map((row, i) => ({ id: `discipline-${i}`, label: row.label })),
        { id: 'custom', label: 'Legal advisory' },
      ],
    }
  }) as Page['layout']
}

describe('experience visual vocabulary', () => {
  it('keeps capabilities distinct from industries and every group linked to its matrix', () => {
    expect(SKILL_KEYS).toHaveLength(16)
    expect(INDUSTRY_COUNT).toBe(15)
    const { container } = render(<CapabilityIndex locale="en" />)
    expect(container.querySelectorAll('.experience-index-card')).toHaveLength(4)
    expect(Array.from(container.querySelectorAll('a')).map((a) => a.getAttribute('href'))).toEqual(
      SKILL_GROUP_KEYS.map((key) => `#capability-group-${key}`),
    )
    expect(SKILL_GROUP_KEYS.map((key) => SKILLS_BY_GROUP[key].length)).toEqual([5, 4, 3, 4])
    expect(
      Array.from(container.querySelectorAll('.experience-index-count')).map((el) => el.textContent),
    ).toEqual(['5 capabilities', '4 capabilities', '3 capabilities', '4 capabilities'])
    expect(container.querySelectorAll('svg[data-artwork^="group-"]')).toHaveLength(4)
    expect(container.textContent).toContain('16 capabilities')
  })

  it.each(LOCALES)(
    'supplies group descriptions, discipline contributions and controls in %s',
    (locale) => {
      const copy = experienceVisualCopy[locale]
      expect(Object.keys(copy.groups).sort()).toEqual([...SKILL_GROUP_KEYS].sort())
      expect(Object.keys(copy.disciplines).sort()).toEqual([...DISCIPLINE_KEYS].sort())
      for (const value of [
        ...Object.values(copy.groups),
        ...Object.values(copy.disciplines),
        copy.pause,
        copy.resume,
        copy.reduced,
      ]) {
        expect(value.trim().length).toBeGreaterThan(3)
      }
      const { container } = render(<CapabilityIndex locale={locale} />)
      for (const value of Object.values(copy.groups)) expect(container.textContent).toContain(value)
      cleanup()
    },
  )

  it('provides sixteen distinct compact and illustrated marks without embedded text or image downloads', () => {
    for (const variant of ['compact', 'illustration'] as const) {
      const geometry = new Set<string>()
      for (const key of SKILL_KEYS) {
        const { container } = render(<SkillIcon skillKey={key} variant={variant} />)
        const svg = container.querySelector('svg')!
        expect(svg.getAttribute('aria-hidden')).toBe('true')
        expect(svg.getAttribute('focusable')).toBe('false')
        expect(svg.style.direction).toBe('ltr')
        expect(svg.querySelector('text, image, foreignObject')).toBeNull()
        expect(
          svg.querySelector('[stroke="var(--track-accent)"], [fill="var(--track-accent)"]'),
        ).toBeTruthy()
        geometry.add(svg.innerHTML)
        cleanup()
      }
      expect(geometry.size).toBe(16)
    }
  })

  it('renders a complete static scene on the server and exposes no motion dependency', () => {
    const html = renderToStaticMarkup(
      <ExperienceMotion>
        <SkillIcon skillKey="technical-pm" variant="illustration" />
      </ExperienceMotion>,
    )
    expect(html).toContain('polygon')
    expect(html).not.toContain('data-exp-motion="true"')
    expect(html).not.toContain('<canvas')
  })

  it('keeps identities when translating or reordering disciplines, and supports a custom row', () => {
    const source = buildExperienceLayout(experiencePageCopy.en)!
    for (const locale of LOCALES) {
      const block = localizeExperienceLayout(locale, source)!.find(
        (b) => b.blockType === 'capabilityModel',
      )!
      if (block.blockType !== 'capabilityModel') throw new Error('missing model')
      expect(block.disciplines.map((row) => row.disciplineKey)).toEqual(DISCIPLINE_KEYS)
      const rows = [...block.disciplines].reverse()
      const { container } = render(
        <CapabilityModelBlock
          {...block}
          disciplines={[...rows, { label: 'Custom' }]}
          locale={locale}
        />,
      )
      expect(container.querySelectorAll('.experience-model-input')).toHaveLength(7)
      expect(container.querySelector('[data-artwork="custom-discipline"]')).toBeTruthy()
      expect(container.querySelector('[data-artwork="shared-delivery"]')).toBeTruthy()
      expect(container.textContent).toContain(experienceVisualCopy[locale].disciplines.ai)
      cleanup()
    }
  })
})

describe('experience motion lifecycle', () => {
  function setup(reducedInitially = false) {
    let reduced = reducedInitially
    let hidden = false
    let preferenceChanged: () => void = () => {}
    let intersect: IntersectionObserverCallback = () => {}
    const observe = vi.fn()
    const disconnect = vi.fn()
    const removeEventListener = vi.fn()
    vi.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden)
    vi.stubGlobal('matchMedia', () => ({
      get matches() {
        return reduced
      },
      addEventListener: (_: string, fn: () => void) => {
        preferenceChanged = fn
      },
      removeEventListener,
    }))
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(fn: IntersectionObserverCallback) {
          intersect = fn
        }
        observe = observe
        disconnect = disconnect
      },
    )
    const view = render(
      <ExperienceMotion>
        <ExperienceMotionControl locale="en" />
        <div data-experience-scene="">
          <SkillIcon skillKey="requirements" variant="illustration" />
        </div>
        <div data-experience-scene="">
          <SkillIcon skillKey="gamification" variant="illustration" />
        </div>
      </ExperienceMotion>,
    )
    const root = view.container.querySelector<HTMLElement>('.experience-visual-scope')!
    const scenes = Array.from(
      view.container.querySelectorAll<HTMLElement>('[data-experience-scene]'),
    )
    return {
      ...view,
      root,
      scenes,
      observe,
      disconnect,
      removeEventListener,
      enter: (index: number, isIntersecting: boolean) =>
        act(() =>
          intersect(
            [
              {
                target: scenes[index],
                isIntersecting,
                boundingClientRect: scenes[index].getBoundingClientRect(),
                intersectionRect: scenes[index].getBoundingClientRect(),
                intersectionRatio: isIntersecting ? 1 : 0,
                rootBounds: null,
                time: 0,
              },
            ],
            {} as IntersectionObserver,
          ),
        ),
      hide: (value: boolean) =>
        act(() => {
          hidden = value
          document.dispatchEvent(new Event('visibilitychange'))
        }),
      reduce: (value: boolean) =>
        act(() => {
          reduced = value
          preferenceChanged()
        }),
    }
  }

  it('observes each scene, pauses offscreen/hidden scenes, and retains manual pause on re-entry', () => {
    const view = setup()
    expect(view.root.dataset.expMotion).toBe('true')
    expect(view.scenes.map((s) => s.dataset.expVisible)).toEqual(['false', 'false'])
    view.enter(0, true)
    expect(view.scenes[0].dataset.expVisible).toBe('true')
    fireEvent.click(screen.getByRole('button', { name: 'Pause illustrations' }))
    expect(view.root.dataset.expPaused).toBe('true')
    expect(
      screen.getByRole('button', { name: 'Resume illustrations' }).getAttribute('aria-pressed'),
    ).toBe('true')
    view.hide(true)
    expect(view.scenes.every((s) => s.dataset.expVisible === 'false')).toBe(true)
    view.hide(false)
    expect(view.scenes[0].dataset.expVisible).toBe('true')
    expect(view.root.dataset.expPaused).toBe('true')
    view.enter(0, false)
    expect(view.scenes[0].dataset.expVisible).toBe('false')
    fireEvent.click(screen.getByRole('button', { name: 'Resume illustrations' }))
    expect(view.root.dataset.expPaused).toBe('false')
  })

  it('responds to reduced motion live and cleans up on unmount', () => {
    const view = setup(true)
    expect(view.root.dataset.expMotion).toBe('false')
    expect(view.observe).not.toHaveBeenCalled()
    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true)
    view.reduce(false)
    expect(view.observe).toHaveBeenCalledTimes(2)
    view.reduce(true)
    expect(view.root.dataset.expMotion).toBe('false')
    view.unmount()
    expect(view.disconnect).toHaveBeenCalled()
    expect(view.removeEventListener).toHaveBeenCalled()
  })
})

describe('discipline identity migration', () => {
  it('backfills by English row identity, preserves editorial text and unknown rows, and is idempotent', () => {
    const english = oldLayout()
    const snapshot = structuredClone(english)
    const translated = structuredClone(english)
    const model = translated.find((b) => b.blockType === 'capabilityModel')!
    if (model.blockType !== 'capabilityModel') throw new Error('missing model')
    model.disciplines.forEach((row) => {
      row.label = `Editorial translation ${row.id}`
    })
    model.disciplines.reverse()
    const result = backfillDisciplineKeys(translated, english)
    const next = result.find((b) => b.blockType === 'capabilityModel')!
    if (next.blockType !== 'capabilityModel') throw new Error('missing model')
    expect(next.disciplines.map((row) => row.id)).toEqual(model.disciplines.map((row) => row.id))
    expect(next.disciplines.map((row) => row.label)).toEqual(
      model.disciplines.map((row) => row.label),
    )
    expect(next.disciplines.find((row) => row.id === 'custom')?.disciplineKey).toBeUndefined()
    expect(next.disciplines.find((row) => row.id === 'discipline-0')?.disciplineKey).toBe(
      'business',
    )
    expect(result.filter((b) => b.blockType !== 'capabilityModel')).toEqual(
      translated.filter((b) => b.blockType !== 'capabilityModel'),
    )
    expect(backfillDisciplineKeys(result, english)).toEqual(result)
    expect(english).toEqual(snapshot)
  })

  it.each(['published', 'draft'] as const)(
    'snapshots all seven languages before writing and preserves %s status',
    async (_status) => {
      const pages = new Map<Locale, Page>(
        LOCALES.map((locale) => [
          locale,
          {
            id: 'experience-page',
            slug: 'experience',
            title: locale,
            _status,
            layout: oldLayout(),
          } as Page,
        ]),
      )
      const reads: Locale[] = []
      const update = vi.fn(
        async ({
          locale,
          data,
          draft,
        }: {
          locale: Locale
          data: Partial<Page>
          draft: boolean
        }) => {
          expect(reads).toHaveLength(6)
          expect(data._status).toBe(_status)
          expect(draft).toBe(_status === 'draft')
          const saved = { ...pages.get(locale)!, ...data }
          pages.set(locale, saved)
          return saved
        },
      )
      const payload = {
        find: vi.fn(async () => ({ docs: [structuredClone(pages.get('en'))] })),
        findByID: vi.fn(async ({ locale }: { locale: Locale }) => {
          if (!reads.includes(locale)) reads.push(locale)
          return structuredClone(pages.get(locale))
        }),
        update,
      } as unknown as Payload
      expect((await seedExperienceVisuals({ payload })).updatedLocales).toBe(7)
      expect(update).toHaveBeenCalledTimes(7)
      expect((await seedExperienceVisuals({ payload })).updatedLocales).toBe(0)
      expect(update).toHaveBeenCalledTimes(7)
      expect(pages.get('fa')!.title).toBe('fa')
    },
  )
})

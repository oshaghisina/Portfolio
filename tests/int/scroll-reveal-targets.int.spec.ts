import { describe, expect, it } from 'vitest'
import { collectRevealTargets } from '@/providers/ScrollReveal/targets'

describe('scroll reveal boundaries', () => {
  it('keeps interactive stages together so newly selected panels never inherit hidden children', () => {
    const root = document.createElement('main')
    root.dataset.revealRoot = ''
    root.innerHTML =
      '<section><header>Title</header><div role="tablist"><button>Stage</button></div><div data-reveal-unit><figure>Diagram</figure><div role="tabpanel"><dl><dt>Output</dt><dd>Result</dd></dl></div></div></section>'
    const targets = collectRevealTargets(root).map(({ element }) => element)
    expect(targets).toEqual([
      root.querySelector('header'),
      root.querySelector('[data-reveal-unit]'),
    ])
    expect(targets.some((element) => element.matches('dt, dd, button'))).toBe(false)
  })
  it('reveals long sections separately while retaining card surfaces and skipping existing entrances', () => {
    const root = document.createElement('main')
    root.dataset.revealRoot = ''
    root.innerHTML =
      '<section data-hero-entrance>Hero</section><section><h2>Cards</h2><ol><li><h3>First</h3></li><li><h3>Second</h3></li></ol></section><nav data-reveal-skip>Sticky index</nav>'
    const targets = collectRevealTargets(root)
    expect(targets.map(({ element }) => element.tagName)).toEqual(['H2', 'LI', 'LI'])
    expect(targets.map(({ contents }) => contents)).toEqual([false, true, true])
  })
})

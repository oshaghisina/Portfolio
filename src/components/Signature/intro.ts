/**
 * First-load intro: Sina's name is written on a blank sheet, then docks into the header's mark.
 *
 * `signatureIntro` runs as a blocking <head> script (`SignatureIntroScript`), so what it decides
 * lands before the first paint and none of it waits for hydration: whether this visit gets the
 * intro (it marks <html>, which is what the CSS shows the curtain for), when the intro ends (once
 * the name is written, or at the visitor's first input), and a cap in case neither ever comes.
 * It is sent as source text, so it must stay self-contained: no imports, no module scope, only
 * its argument.
 */
export interface SignatureIntroOptions {
  /** On <html>: `play` while the name is written, `dock` or `skip` while leaving, then removed. */
  attribute: string
  /** localStorage key holding when the intro last played. */
  storageKey: string
  /** A visitor who saw it more recently than this goes straight to the page. */
  replayAfterMs: number
  /** Ends the intro if the write never starts (the page never became visible). */
  capMs: number
  /** Ends it this long after the write starts, should the write never finish. */
  runMs: number
  /** The CSS animation that writes the name (`signature.css`). */
  writeAnimation: string
  selectors: {
    anchor: string
    curtain: string
    mark: string
    overlay: string
  }
}

export const SIGNATURE_INTRO: SignatureIntroOptions = {
  attribute: 'data-signature-intro',
  storageKey: 'signature-intro',
  replayAfterMs: 12 * 60 * 60 * 1000,
  capMs: 12_000,
  runMs: 6_000,
  writeAnimation: 'signature-write',
  selectors: {
    anchor: '[data-signature-anchor]',
    curtain: '.signature-intro-curtain',
    mark: '.signature-intro-mark',
    overlay: '.signature-intro',
  },
}

export function signatureIntro(options: SignatureIntroOptions): void {
  const root = document.documentElement

  try {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.visibilityState !== 'visible'
    )
      return
    const last = Number(window.localStorage.getItem(options.storageKey)) || 0
    // `?intro` replays it on demand, for a demo.
    const asked = /[?&]intro(?:[=&]|$)/.test(window.location.search)
    if (!asked && Date.now() - last < options.replayAfterMs) return
    window.localStorage.setItem(options.storageKey, String(Date.now()))
  } catch {
    // No storage means no way to play it only once, so it never plays.
    return
  }

  const inputs = ['keydown', 'pointerdown', 'touchstart', 'wheel']
  let leaving = false
  let cap = window.setTimeout(end, options.capMs)

  function end() {
    window.clearTimeout(cap)
    root.removeAttribute(options.attribute)
    document.removeEventListener('animationstart', onAnimationStart)
    document.removeEventListener('animationend', onAnimationEnd)
    for (const type of inputs) window.removeEventListener(type, onInput, true)
  }

  function onAnimationStart(event: AnimationEvent) {
    if (event.animationName !== options.writeAnimation) return
    window.clearTimeout(cap)
    cap = window.setTimeout(end, options.runMs)
  }

  function onAnimationEnd(event: AnimationEvent) {
    if (event.animationName === options.writeAnimation) leave(true)
  }

  function onInput(event: Event) {
    // The first wheel only lifts the curtain; scrolling starts with the next one.
    if (event.type === 'wheel') event.preventDefault()
    leave(false)
  }

  function leave(dock: boolean) {
    if (leaving) return
    leaving = true
    for (const type of inputs) window.removeEventListener(type, onInput, true)

    const overlay = document.querySelector<HTMLElement>(options.selectors.overlay)
    const curtain = overlay?.querySelector<HTMLElement>(options.selectors.curtain)
    const mark = overlay?.querySelector<HTMLElement>(options.selectors.mark)
    const anchor = document.querySelector(options.selectors.anchor)
    if (!overlay || !curtain || !mark || typeof overlay.animate !== 'function') return end()

    // Motion comes from the design tokens (theme.css), read where the page already declared them.
    // The CSS build minifies `550ms` to `.55s`, so read the unit.
    const tokens = window.getComputedStyle(root)
    const ms = (name: string, fallback: number) => {
      const value = tokens.getPropertyValue(name).trim()
      const time = parseFloat(value)
      if (!(time >= 0)) return fallback
      return value.endsWith('ms') ? time : value.endsWith('s') ? time * 1000 : fallback
    }
    const from = mark.getBoundingClientRect()
    const to = anchor?.getBoundingClientRect()

    let last: Animation
    if (dock && to && to.height > 0 && from.height > 0) {
      // Scale the written name onto the header's mark: same outlines, same viewBox, so it lands
      // exactly where the real one is revealed.
      root.setAttribute(options.attribute, 'dock')
      curtain.animate(
        { opacity: [1, 0] },
        { duration: ms('--duration-base', 320), easing: 'ease-out', fill: 'forwards' },
      )
      last = mark.animate(
        {
          transform: [
            'none',
            `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.height / from.height})`,
          ],
        },
        {
          duration: ms('--duration-slow', 550),
          easing: tokens.getPropertyValue('--ease-standard').trim() || 'ease-out',
          fill: 'forwards',
        },
      )
    } else {
      root.setAttribute(options.attribute, 'skip')
      last = overlay.animate(
        { opacity: [1, 0] },
        { duration: ms('--duration-fast', 200), easing: 'ease-out', fill: 'forwards' },
      )
    }
    last.finished.then(end, end)
  }

  root.setAttribute(options.attribute, 'play')
  document.addEventListener('animationstart', onAnimationStart)
  document.addEventListener('animationend', onAnimationEnd)
  for (const type of inputs) {
    window.addEventListener(type, onInput, { capture: true, passive: type !== 'wheel' })
  }
}

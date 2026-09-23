/** Semantic boundaries keep long pages revealing in sections without adding layout wrappers. */
const GROUP = 'ol, dl, [data-reveal-group]'
const CONTAINER = `section, article, .payload-richtext, [data-reveal-root], ${GROUP}`
const SKIP =
  '[data-reveal-skip], [data-hero-entrance], [aria-hidden="true"], [hidden], script, style, template, svg, [role="dialog"], [role="tablist"]'
const BOUNDARY = `${CONTAINER}, [data-reveal-skip], [data-hero-entrance]`

export type RevealTarget = { element: HTMLElement; contents: boolean }

export function collectRevealTargets(root: HTMLElement): RevealTarget[] {
  const targets: RevealTarget[] = []

  const visit = (element: HTMLElement) => {
    if (element.matches(SKIP)) return
    // Never transform a layout ancestor around nested chapters or a sticky section index.
    if (element.matches(CONTAINER) || element.querySelector(BOUNDARY)) {
      Array.from(element.children).forEach((child) => {
        if (child instanceof HTMLElement) visit(child)
      })
      return
    }
    targets.push({
      element,
      // Keep card surfaces and hairline grids painted while their contents arrive.
      contents: element.children.length > 0 && Boolean(element.parentElement?.matches(GROUP)),
    })
  }

  visit(root)
  return targets
}

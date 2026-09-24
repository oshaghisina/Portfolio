/**
 * Reveal roots that React has finished hydrating. Server HTML belongs to React until hydration
 * claims it, and the page segment hydrates after the layout that hosts the observer, so the
 * observer may only annotate roots listed here. `data-reveal-root` alone is not proof.
 */
const roots = new Set<HTMLElement>()
const listeners = new Set<() => void>()

const notify = () => listeners.forEach((listener) => listener())

export function registerRevealRoot(root: HTMLElement) {
  roots.add(root)
  notify()
  return () => {
    roots.delete(root)
    notify()
  }
}

export function getRevealRoots(): HTMLElement[] {
  return Array.from(roots)
}

export function onRevealRootsChange(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

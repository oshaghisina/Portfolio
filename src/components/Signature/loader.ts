/**
 * The route loader's clock (`loading.tsx`). Once a navigation's loader is up, it stays until it
 * has written the name: a page that arrives sooner waits for it (`SignatureLoaderHold`), and a
 * nested loading boundary that takes over from an outer one carries on the same write instead of
 * starting it again (`SignatureLoader`).
 */

/** The loop has written the name by about 1.25 s (`signature.css`); pages wait for that and a beat. */
export const LOADER_MIN_MS = 1500

/** When this navigation's first loader appeared, or null while none is up. */
let since: number | null = null
/** Loaders on screen. */
let shown = 0
/** What pages wait for in this navigation. */
let hold: Promise<void> | null = null

/** A loader appeared. Returns how long this navigation's loader has already been up, in ms. */
export function showLoader(): number {
  const now = performance.now()
  shown += 1
  since ??= now
  return now - since
}

/**
 * A loader went away. A nested boundary's loader replaces an outer one within a single commit, so
 * the navigation only ends if no loader is back once that commit is over.
 */
export function hideLoader(): void {
  shown -= 1
  queueMicrotask(() => {
    if (shown > 0) return
    since = null
    hold = null
  })
}

/** What a page arriving now waits for before it shows, or null to show it at once. */
export function loaderWait(): Promise<void> | null {
  if (since === null) return null
  const left = since + LOADER_MIN_MS - performance.now()
  if (left <= 0) return null
  // One promise per navigation: React retries the page when it settles, and a fresh promise on
  // that retry would suspend the page all over again.
  hold ??= new Promise((resolve) => setTimeout(resolve, left))
  return hold
}

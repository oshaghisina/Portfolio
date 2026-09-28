'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useSyncExternalStore } from 'react'
import { ReactLenis, type LenisRef } from 'lenis/react'
import type { LenisOptions } from 'lenis'

// Starting values only — tune `lerp` (and maybe `wheelMultiplier`) visually against the live
// site rather than treating these as final.
const LENIS_OPTIONS: LenisOptions = {
  lerp: 0.1, // moderate smoothing; try ~0.08 (snappier) – 0.12 (heavier) while tuning.
  wheelMultiplier: 1,
  syncTouch: false, // explicit: native touch passthrough, matches the existing default.
  // Lenis's built-in `anchors` handler doesn't preventDefault(), so the browser's own native
  // href default action (instant jump + hash update) still fires alongside it; depending on
  // exact frame timing this can produce a visible flash before Lenis's onNativeScroll
  // reconciliation corrects it (confirmed empirically: hash updates and scrollY briefly snaps to
  // the native jump position before Lenis's own curve takes back over). Anchor scrolling is
  // instead driven explicitly via useLenis() in the one component that needs it
  // (src/components/CaseStudy/SectionIndex.tsx), with a real preventDefault(), so it stays off
  // here.
  anchors: false,
  autoRaf: true, // Lenis owns its own rAF loop end-to-end; no custom loop needed.
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function onMotionSettingChange(listener: () => void) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener('change', listener)
  return () => query.removeEventListener('change', listener)
}

const motionAllowed = () => !window.matchMedia(REDUCED_MOTION).matches
// The server can't know the setting; Lenis starts right after hydration when motion is allowed.
const notOnServer = () => false

/**
 * Global inertial smooth-scroll for wheel/trackpad input. Mounted once at the app shell (see
 * `src/providers/index.tsx`) in Lenis's `root` mode, which drives real `window`/`documentElement`
 * scroll with no extra wrapper DOM node — keeping `position: sticky` (the header), the native
 * scrollbar, browser find, and text selection all intact.
 *
 * Never runs for `prefers-reduced-motion: reduce` — those users get the page's unmodified native
 * scroll behavior, matching the CSS fallback in globals.css. The setting is followed for the whole
 * visit: switching it on mid-visit destroys the instance (Lenis would otherwise keep catching the
 * wheel and easing it), and switching it off starts one again.
 *
 * Lenis sits beside the page rather than around it, so starting or stopping it never remounts
 * the page. In root mode it renders no DOM and `useLenis()` reads the instance from Lenis's root
 * store, so consumers see it either way (and see none under reduced motion).
 */
export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const enabled = useSyncExternalStore(onMotionSettingChange, motionAllowed, notOnServer)
  const lenisRef = useRef<LenisRef>(null)
  const pathname = usePathname()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    // Tracked even while Lenis is off, so turning it back on later never replays a navigation.
    if (prevPathname.current === pathname) return
    prevPathname.current = pathname
    // Snap Lenis's target/animated scroll to match Next's own post-navigation scroll position
    // instantly, so no spurious inertial "replay" plays after a route change.
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true, force: true })
  }, [pathname])

  return (
    <>
      {enabled ? <ReactLenis options={LENIS_OPTIONS} ref={lenisRef} root /> : null}
      {children}
    </>
  )
}

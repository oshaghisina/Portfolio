'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ReactLenis, type LenisRef } from 'lenis/react'
import type { LenisOptions } from 'lenis'

import canUseDOM from '@/utilities/canUseDOM'

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

/**
 * Global inertial smooth-scroll for wheel/trackpad input. Mounted once at the app shell (see
 * `src/providers/index.tsx`) in Lenis's `root` mode, which drives real `window`/`documentElement`
 * scroll with no extra wrapper DOM node — keeping `position: sticky` (the header), the native
 * scrollbar, browser find, and text selection all intact.
 *
 * Never instantiated at all for `prefers-reduced-motion: reduce` — those users get the page's
 * unmodified native scroll behavior, matching the existing CSS fallback in globals.css.
 */
export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Computed once, lazily: correct on the first client render, no flash. Root-mode `ReactLenis`
  // renders `children` with no extra DOM node in either branch, so this can't cause a hydration
  // mismatch — server and first client render both just render `children`.
  const [enabled] = useState(
    () => canUseDOM && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const lenisRef = useRef<LenisRef>(null)
  const pathname = usePathname()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (!enabled || prevPathname.current === pathname) return
    prevPathname.current = pathname
    // Snap Lenis's target/animated scroll to match Next's own post-navigation scroll position
    // instantly, so no spurious inertial "replay" plays after a route change.
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true, force: true })
  }, [enabled, pathname])

  if (!enabled) return <>{children}</>

  return (
    <ReactLenis options={LENIS_OPTIONS} ref={lenisRef} root>
      {children}
    </ReactLenis>
  )
}

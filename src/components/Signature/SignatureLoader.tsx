'use client'

import React, { use, useLayoutEffect, useRef, useState } from 'react'

import { hideLoader, loaderWait, showLoader } from './loader'
import { SignatureDraw } from './SignatureDraw'

/**
 * The route loader's mark: the signature written on a loop, on the navigation's clock. A loader
 * that takes over from another (a nested `loading.tsx` once the outer segment has arrived) picks
 * the write up where that one was, so the swap never shows.
 */
export const SignatureLoader: React.FC<{ className?: string }> = ({ className }) => {
  const ref = useRef<SVGSVGElement>(null)

  useLayoutEffect(() => {
    // Without motion there is no writing to finish: the page shows as soon as it is ready.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const elapsed = showLoader()
    if (elapsed > 0) ref.current?.style.setProperty('--signature-loop-elapsed', `${elapsed}ms`)
    return hideLoader
  }, [])

  return <SignatureDraw className={className} mode="loop" ref={ref} />
}

/**
 * Rendered by every page frame. A page that arrives while the loader is still writing the name
 * suspends under the loader's boundary until it has; read once, so a page already on screen never
 * waits again.
 */
export function SignatureLoaderHold(): null {
  const [wait] = useState(loaderWait)
  if (wait) use(wait)
  return null
}

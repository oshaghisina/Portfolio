import { cn } from '@/utilities/ui'
import React from 'react'

import { resolveTool } from './toolLogos'

/**
 * A brand mark on the section's paper surface.
 *
 * Decorative by design: the product name is rendered as visible text in the same cell, so the
 * image is `alt=""` + `aria-hidden` and a screen reader announces the name exactly once.
 *
 * Plain `<img>`, not `next/image`: `images.localPatterns` in next.config.ts only permits
 * `/api/media/file/**`, and there is no `dangerouslyAllowSVG`, so a local `/tool-logos/*.svg`
 * would be rejected by the optimizer.
 *
 * Dark paper is near-black, so every mark declares its own strategy in `toolLogos.ts`. The swap
 * is always CSS, never JS: `data-theme` is written on `<html>` on the client before paint, so the
 * server render cannot know the theme and a JS choice would hydrate wrong and flash.
 *
 * Never mirror these in RTL. Brand marks are not directional UI, and the house rule is that
 * brand and decorative art stays physical while only reading-flow elements mirror.
 */

/**
 * Fixed box, reserved even when no mark exists, so names stay aligned. `md` is the matrix cell
 * size; `sm` sits inline beside a line of small text (the Skills section's tool row).
 */
const BOXES = {
  md: 'size-8 shrink-0 sm:size-10',
  sm: 'size-5 shrink-0',
} as const

export interface ToolLogoProps {
  className?: string
  size?: keyof typeof BOXES
  toolKey: string
}

export const ToolLogo: React.FC<ToolLogoProps> = ({ className, size = 'md', toolKey }) => {
  const BOX = BOXES[size]
  const logo = resolveTool(toolKey)

  // Unknown key — stale data against a `toolKey` select that only offers resolver keys.
  // Component.tsx filters these rows out, so this is belt-and-braces.
  if (!logo) return null

  // No verified mark sourced yet: hold the space so the product name below still lines up with
  // its neighbours and the cell reads as deliberate restraint rather than a broken image.
  // Dropping the file into public/tool-logos/ and setting `src` is the only change needed.
  if (!logo.src) return <span aria-hidden className={cn(BOX, className)} />

  /* eslint-disable @next/next/no-img-element -- local SVG; next/image is blocked by images.localPatterns */

  // `width`/`height` are load-bearing: an SVG with a viewBox but no intrinsic size falls back to
  // 300×150 in some engines, which makes `object-contain` compute against the wrong box.
  const img = (extra: string, src: string) => (
    <img
      alt=""
      aria-hidden
      className={cn(BOX, 'object-contain', extra, className)}
      decoding="async"
      height={40}
      loading="lazy"
      src={src}
      width={40}
    />
  )

  // An official light-on-dark file exists. Both are rendered and CSS picks one — see above for
  // why the src cannot be chosen during render.
  if (logo.onDark === 'asset') {
    return (
      <>
        {img('dark:hidden', logo.src)}
        {img('hidden dark:block', logo.srcDark)}
      </>
    )
  }

  // `invert` alone flips a black container with a white glyph into a white container with a black
  // glyph, preserving the internal contrast. `brightness-0` is added only for flat single-colour
  // marks, where the goal is a solid white silhouette — adding it to the former would flatten the
  // glyph into the container and leave a blob.
  const onDark =
    logo.onDark === 'invert' ? 'dark:invert' : logo.onDark === 'whiten' ? 'dark:brightness-0 dark:invert' : ''

  return img(onDark, logo.src)
  /* eslint-enable @next/next/no-img-element */
}

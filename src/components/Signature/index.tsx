import { cn } from '@/utilities/ui'
import React from 'react'

import { SIGNATURE_PATH, SIGNATURE_VIEWBOX } from './outline'

/**
 * Sina's handwritten signature, used as the site wordmark.
 *
 * Inline rather than an <img> so `fill="currentColor"` inherits the surrounding text colour:
 * it follows light/dark and any `data-theme` a hero forces onto the header with no second asset.
 * Decorative — the caller supplies the accessible name ("Sina Oshaghi") as text. Other props (a
 * `data-*` hook, say) land on the <svg>.
 */
export const Signature: React.FC<React.ComponentProps<'svg'>> = ({ className, ...props }) => (
  <svg
    aria-hidden="true"
    className={cn('block w-auto', className)}
    fill="currentColor"
    focusable="false"
    viewBox={SIGNATURE_VIEWBOX}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d={SIGNATURE_PATH} fillRule="evenodd" />
  </svg>
)

'use client'

import { cn } from '@/utilities/ui'
import React from 'react'

import { drawSignature, SIGNATURE_VIEWBOX } from './outline'

// A client component with no state, on purpose: route loading states render it from the server,
// and as a server component its ~20 KB of outlines would travel in every one of their payloads.
// As a client component they ship once, in the chunk the header's `Signature` already loads.
const STROKES = drawSignature()

export interface SignatureDrawProps {
  className?: string
  /**
   * `write` writes the name once and settles on the finished mark (the first-load intro).
   * `loop` writes it, holds, fades the ink in writing order and starts again (loading).
   */
  mode: 'loop' | 'write'
  ref?: React.Ref<SVGSVGElement>
}

/**
 * Sina's signature being written. One pen (`--signature-pen`, animated in `signature.css`) draws
 * every outline along its sides, and each stroke's ink fills in as the pen leaves it. Size it with
 * `--signature-size` (the rendered width in px, unitless), which also keeps the traced line about
 * 1.25px. Decorative, like `Signature`.
 */
export const SignatureDraw: React.FC<SignatureDrawProps> = ({ className, mode, ref }) => (
  <svg
    aria-hidden="true"
    className={cn('signature-draw', className)}
    data-mode={mode}
    focusable="false"
    ref={ref}
    viewBox={SIGNATURE_VIEWBOX}
    xmlns="http://www.w3.org/2000/svg"
  >
    {STROKES.map(({ ink, inkAt, lines }, stroke) => (
      <g key={stroke} style={{ '--signature-ink-at': inkAt } as React.CSSProperties}>
        <path className="signature-ink" d={ink} fillRule="evenodd" />
        {lines.map(({ d, from, to }, line) => (
          <path
            className="signature-line"
            d={d}
            key={line}
            pathLength={1}
            style={{ '--signature-from': from, '--signature-to': to } as React.CSSProperties}
          />
        ))}
      </g>
    ))}
  </svg>
)

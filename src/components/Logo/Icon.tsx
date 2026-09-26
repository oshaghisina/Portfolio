import React from 'react'

import { SIGNATURE_STROKES } from '@/components/Signature/outline'

/** The signature's opening S: the same mark as `public/favicon.svg`, on the same 400-unit tile. */
const S_PATH = SIGNATURE_STROKES.filter((stroke) => stroke.name === 'S')
  .flatMap((stroke) => stroke.contours)
  .map(({ points }) => `M${points}Z`)
  .join('')

/**
 * The admin's nav icon (`admin.components.graphics.Icon`): the S from Sina's signature in place of
 * Payload's mark. Payload sizes the slot (18px in the breadcrumb), so the SVG just fills it.
 *
 * The outline is only a few units wide, a hairline at 18px, so a round stroke in the fill colour
 * thickens it the way the favicon does.
 */
export const Icon: React.FC = () => (
  <svg
    aria-label="Sina Oshaghi"
    height="100%"
    role="img"
    viewBox="0 0 400 400"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d={S_PATH}
      fill="var(--theme-elevation-1000)"
      fillRule="evenodd"
      stroke="var(--theme-elevation-1000)"
      strokeLinejoin="round"
      strokeWidth={20}
    />
  </svg>
)

import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * DS-11 — the page frame every route renders into: ruled paper behind, one `.canvas` sheet on
 * top. The sheet owns the width for everything inside it, which is why no page and no block
 * brings its own `.container` any more.
 *
 * No top padding, on purpose: the page opens flush against the header so the sheet's hairline
 * rails continue straight out of the header's bottom border. `PageOpener` carries the air the
 * headline needs. Bottom air lives *inside* `.canvas` so the same rails reach the footer
 * crossbar instead of stopping in a ruled-paper gap.
 */
export interface PageFrameProps {
  children: React.ReactNode
  className?: string
}

export const PageFrame: React.FC<PageFrameProps> = ({ children, className }) => (
  // `flex-1` on both: on a short page (a 404, an empty search) the sheet still reaches the
  // footer, so the rails never stop halfway down the viewport.
  <main className={cn('ruled-paper flex flex-1 flex-col', className)}>
    <div className="canvas flex-1 pb-16 md:pb-24">{children}</div>
  </main>
)

import { cn } from '@/utilities/ui'
import React from 'react'

/**
 * Decorative "operating system" chrome used by the hero's workspace preview. The homepage
 * Workspace block no longer shares this IDE chrome (D-031).
 * `WorkflowStages` — the same console shell reused three times is the intended visual identity,
 * not incidental duplication. Purely presentational: no data, no interaction.
 */
export interface ConsolePanelProps {
  title: string
  status?: string
  className?: string
  children: React.ReactNode
}

export const ConsolePanel: React.FC<ConsolePanelProps> = ({ children, className, status, title }) => (
  <div className={cn('overflow-hidden rounded-panel border border-line bg-panel/40', className)}>
    <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
      <span aria-hidden className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-ink-3/30" />
        <span className="size-2 rounded-full bg-ink-3/30" />
        <span className="size-2 rounded-full bg-ink-3/30" />
      </span>
      <span className="eyebrow text-ink-3">{title}</span>
      {status ? (
        <span className="ms-auto flex items-center gap-1.5 eyebrow text-ink-3">
          <span aria-hidden className="size-1.5 rounded-full bg-brand" />
          {status}
        </span>
      ) : null}
    </div>
    <div className="p-6 sm:p-8">{children}</div>
  </div>
)

import React from 'react'

export interface MetaStripRow {
  key?: string | null
  value?: string | null
}

/**
 * Footer key/value metadata strip — same `dt`/`dd` visual language as `ProjectMeta` (DS-17), but
 * for site-level facts (based in, focus, availability, …) rather than case-study values.
 */
export const MetaStrip: React.FC<{ rows?: MetaStripRow[] | null }> = ({ rows }) => {
  const entries = (rows ?? []).filter((row) => row.key && row.value)
  if (!entries.length) return null

  return (
    <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 md:mt-8 md:gap-0 md:border-t md:border-s md:border-line lg:grid-cols-6">
      {entries.map((row, i) => (
        <div className="flex min-w-0 flex-col gap-1 md:gap-2 md:border-b md:border-e md:border-line md:p-5" key={i}>
          <dt className="eyebrow text-ink-3">{row.key}</dt>
          <dd className="text-small font-medium text-foreground">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

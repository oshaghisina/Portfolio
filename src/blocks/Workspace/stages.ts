import type { Project } from '@/payload-types'

/** Canonical stage keys — visuals and interaction follow this order, not CMS array order. */
export const STAGE_KEYS = ['frame', 'map', 'decide', 'ship', 'measure'] as const

export type StageKey = (typeof STAGE_KEYS)[number]

export const STAGE_ORDER: StageKey[] = [...STAGE_KEYS]

export const STAGE_KEY_OPTIONS = [
  { label: 'Frame', value: 'frame' },
  { label: 'Map', value: 'map' },
  { label: 'Decide', value: 'decide' },
  { label: 'Ship', value: 'ship' },
  { label: 'Measure', value: 'measure' },
] as const

/** Evidence project slugs wired at seed time — Ship has none (Work mosaic owns shipped work). */
export const STAGE_EVIDENCE_SLUGS: Partial<Record<StageKey, string>> = {
  frame: 'digital-gold',
  map: 'vin-app',
  decide: 'rp1-arena',
  measure: 'digital-gold',
}

export type ResolvedStage = {
  key: StageKey
  label: string
  statement: string
  question: string
  description: string
  output: string
  id?: string | null
  /** Only set when the project has a published case study in the current locale. */
  evidence?: { href: string; title: string } | null
}

export type WorkspaceStageRow = {
  key?: StageKey | null
  label?: string | null
  statement?: string | null
  question?: string | null
  description?: string | null
  output?: string | null
  id?: string | null
  evidence?: (string | null) | Project
}

/** Order CMS rows by key; drop incomplete / unknown keys. */
export function orderStages(rows: WorkspaceStageRow[] | null | undefined): ResolvedStage[] {
  const ordered: ResolvedStage[] = []
  for (const key of STAGE_ORDER) {
    const row = (rows ?? []).find((r) => r.key === key)
    if (!row?.label || !row.statement || !row.question || !row.description || !row.output) {
      continue
    }
    ordered.push({
      key,
      id: row.id,
      label: row.label,
      statement: row.statement,
      question: row.question,
      description: row.description,
      output: row.output,
      evidence: null,
    })
  }
  return ordered
}

export function padStageIndex(index: number): string {
  return String(index + 1).padStart(2, '0')
}

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

/** Domain fragment labels (desktop mono captions). Compact mode draws unlabelled nodes. */
export const FRAGMENT_LABELS = ['users', 'cost', 'ops', 'policy', 'tech', 'data', 'brand'] as const

export type FragmentId = (typeof FRAGMENT_LABELS)[number]

export const LANE_LABELS = ['Business', 'Service', 'Product', 'Ops', 'Tech', 'Data'] as const

/** Per-object transform for one stage. Absolute states — 01→05 jumps straight here. */
export type ObjectPose = {
  x: number
  y: number
  opacity: number
  scale?: number
  /** Visual variant keyed by object family. */
  variant?: string
}

/**
 * Bench viewBox is 800×450 (≈16:9). Coordinates are absolute within that space.
 * Compact (mobile) consumers hide lane labels, drop fragments 5–6, and show 3 spec rows.
 */
export const BENCH = {
  width: 800,
  height: 450,
  /** Fragments that stay in-scope in Frame (others dim outside the dashed frame). */
  frameInScope: ['users', 'cost', 'ops', 'policy', 'data'] as FragmentId[],
  /** Fragments on the Decide brand path → become R1–R4. */
  decidePath: ['users', 'ops', 'tech', 'data'] as FragmentId[],
  /** Spec row count desktop / compact. */
  specRows: 4,
  compactSpecRows: 3,
  compactFragments: 5,
} as const

/** Lane y-centres for Map+. */
export const LANE_Y = [72, 132, 192, 252, 312, 372] as const

/**
 * Fragment resting positions by stage. Scattered → lanes → path/spec → artifact → signals.
 * Out-of-scope Frame fragments sit outside the dashed rect and stay dim.
 */
export const FRAGMENT_POSES: Record<StageKey, Record<FragmentId, ObjectPose>> = {
  frame: {
    users: { x: 180, y: 140, opacity: 1 },
    cost: { x: 280, y: 110, opacity: 1 },
    ops: { x: 220, y: 220, opacity: 1 },
    policy: { x: 340, y: 180, opacity: 1 },
    tech: { x: 460, y: 90, opacity: 0.35, variant: 'out' },
    data: { x: 300, y: 280, opacity: 1 },
    brand: { x: 500, y: 260, opacity: 0.35, variant: 'out' },
  },
  map: {
    users: { x: 160, y: LANE_Y[0], opacity: 1, variant: 'lane' },
    cost: { x: 280, y: LANE_Y[0], opacity: 1, variant: 'lane' },
    ops: { x: 200, y: LANE_Y[3], opacity: 1, variant: 'lane' },
    policy: { x: 340, y: LANE_Y[1], opacity: 1, variant: 'lane' },
    tech: { x: 400, y: LANE_Y[4], opacity: 1, variant: 'lane' },
    data: { x: 480, y: LANE_Y[5], opacity: 1, variant: 'lane' },
    brand: { x: 240, y: LANE_Y[2], opacity: 1, variant: 'lane' },
  },
  decide: {
    users: { x: 520, y: 100, opacity: 1, variant: 'spec' },
    cost: { x: 200, y: 140, opacity: 0.3, variant: 'cut' },
    ops: { x: 520, y: 160, opacity: 1, variant: 'spec' },
    policy: { x: 280, y: 200, opacity: 0.3, variant: 'cut' },
    tech: { x: 520, y: 220, opacity: 1, variant: 'spec' },
    data: { x: 520, y: 280, opacity: 1, variant: 'spec' },
    brand: { x: 160, y: 280, opacity: 0.3, variant: 'cut' },
  },
  ship: {
    users: { x: 200, y: 160, opacity: 1, variant: 'block' },
    cost: { x: 320, y: 160, opacity: 0.2, variant: 'absorbed' },
    ops: { x: 200, y: 240, opacity: 1, variant: 'block' },
    policy: { x: 380, y: 240, opacity: 0.2, variant: 'absorbed' },
    tech: { x: 320, y: 240, opacity: 1, variant: 'block' },
    data: { x: 320, y: 320, opacity: 1, variant: 'block' },
    brand: { x: 140, y: 320, opacity: 0.2, variant: 'absorbed' },
  },
  measure: {
    users: { x: 200, y: 160, opacity: 1, variant: 'block' },
    cost: { x: 320, y: 160, opacity: 0.2, variant: 'absorbed' },
    ops: { x: 200, y: 240, opacity: 1, variant: 'block' },
    policy: { x: 380, y: 240, opacity: 0.2, variant: 'absorbed' },
    tech: { x: 320, y: 240, opacity: 1, variant: 'block' },
    // Shifted node — evidence moved the model.
    data: { x: 380, y: 300, opacity: 1, variant: 'shifted' },
    brand: { x: 140, y: 320, opacity: 0.2, variant: 'absorbed' },
  },
}

/** Problem / brief node centre. */
export const PROBLEM_POSES: Record<StageKey, ObjectPose> = {
  frame: { x: 260, y: 200, opacity: 1, variant: 'solid' },
  map: { x: 320, y: 210, opacity: 1, variant: 'hub' },
  decide: { x: 520, y: 50, opacity: 1, variant: 'r0' },
  ship: { x: 260, y: 100, opacity: 1, variant: 'title' },
  measure: { x: 260, y: 100, opacity: 1, variant: 'target' },
}

/** Brief dashed box — only meaningful in Frame (fades out after). */
export const BRIEF_POSES: Record<StageKey, ObjectPose> = {
  frame: { x: 200, y: 150, opacity: 0.7, variant: 'dashed' },
  map: { x: 200, y: 150, opacity: 0 },
  decide: { x: 200, y: 150, opacity: 0 },
  ship: { x: 200, y: 150, opacity: 0 },
  measure: { x: 200, y: 150, opacity: 0 },
}

/** Domain lane opacity. */
export const LANE_OPACITY: Record<StageKey, number> = {
  frame: 0,
  map: 1,
  decide: 0.4,
  ship: 0.2,
  measure: 0.2,
}

/** Graph edge opacity (non-path). */
export const EDGE_OPACITY: Record<StageKey, number> = {
  frame: 0,
  map: 1,
  decide: 0.3,
  ship: 0.2,
  measure: 0.2,
}

/** Brand path edge opacity (Decide+). */
export const PATH_OPACITY: Record<StageKey, number> = {
  frame: 0,
  map: 0,
  decide: 1,
  ship: 0.35,
  measure: 0.35,
}

/** Spec / artifact / signals region opacity. */
export const SPEC_OPACITY: Record<StageKey, number> = {
  frame: 0,
  map: 0,
  decide: 1,
  ship: 0,
  measure: 0,
}

export const ARTIFACT_OPACITY: Record<StageKey, number> = {
  frame: 0,
  map: 0,
  decide: 0,
  ship: 1,
  measure: 1,
}

export const SIGNAL_OPACITY: Record<StageKey, number> = {
  frame: 0,
  map: 0,
  decide: 0,
  ship: 0,
  measure: 1,
}

export const RETURN_EDGE_OPACITY: Record<StageKey, number> = {
  frame: 0,
  map: 0,
  decide: 0,
  ship: 0,
  measure: 1,
}

/** Ghost of data node at old ship position (Measure reduced-motion / static). */
export const DATA_GHOST = { x: 320, y: 320 }

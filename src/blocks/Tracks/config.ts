import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

const TRACK_KEYS = ['productDesign', 'aiWorkflow', 'designSystems'] as const

/** Tracks: a fixed, non-looping three-state viewer — Product Design / AI Workflow / Design
 *  Systems — addressed by `key`, not by admin row order. Replaces the old single-focus
 *  Capabilities block. */
export const Tracks: Block = {
  slug: 'tracks',
  interfaceName: 'TracksBlock',
  labels: { singular: 'Tracks', plural: 'Tracks' },
  fields: [
    sectionHeader(),
    {
      name: 'tracks',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      labels: { singular: 'Track', plural: 'Tracks' },
      // Payload has no built-in "one row per enum value" constraint, so the exactly-once
      // requirement for each track key is enforced here.
      validate: (value: unknown) => {
        const rows = Array.isArray(value) ? value : []
        const keys = rows.map((r) => (r as { key?: string })?.key).filter(Boolean) as string[]
        const missing = TRACK_KEYS.filter((k) => !keys.includes(k))
        const extra = keys.filter((k) => !(TRACK_KEYS as readonly string[]).includes(k))
        const dupes = keys.filter((k, i) => keys.indexOf(k) !== i)
        if (missing.length || extra.length) {
          return `Tracks must include exactly these keys, one each: ${TRACK_KEYS.join(', ')}.`
        }
        if (dupes.length) return `Duplicate track key: ${dupes.join(', ')}.`
        return true
      },
      fields: [
        {
          name: 'key',
          type: 'select',
          required: true,
          options: [
            { label: 'Product Design', value: 'productDesign' },
            { label: 'AI Workflow', value: 'aiWorkflow' },
            { label: 'Design Systems', value: 'designSystems' },
          ],
        },
        { name: 'title', type: 'text', localized: true, required: true },
        {
          name: 'experience',
          type: 'text',
          localized: true,
          admin: {
            description: 'Optional short duration label, e.g. "10 yrs". Leave blank until source-verified.',
          },
        },
        { name: 'description', type: 'textarea', localized: true, required: true },
      ],
    },
  ],
}

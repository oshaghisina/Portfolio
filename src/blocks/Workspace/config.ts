import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

import { STAGE_KEYS, STAGE_KEY_OPTIONS } from './stages'

/** Workspace: How I work — an operating loop (Frame → Map → Decide → Ship → Measure)
 *  governed by ownership. Stages are addressed by `key`, not by admin row order. */
export const Workspace: Block = {
  slug: 'workspace',
  interfaceName: 'WorkspaceBlock',
  labels: { singular: 'Workspace', plural: 'Workspace' },
  fields: [
    sectionHeader(),
    {
      name: 'principle',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'Ownership bracket label spanning the stage rail, e.g. "Own the problem — at every stage".',
      },
    },
    {
      name: 'loopLabel',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'Return-edge caption under the rail, e.g. "Evidence reopens the model".',
      },
    },
    {
      name: 'stages',
      type: 'array',
      minRows: 5,
      maxRows: 5,
      labels: { singular: 'Stage', plural: 'Stages' },
      validate: (value: unknown) => {
        const rows = Array.isArray(value) ? value : []
        const keys = rows.map((r) => (r as { key?: string })?.key).filter(Boolean) as string[]
        const missing = STAGE_KEYS.filter((k) => !keys.includes(k))
        const extra = keys.filter((k) => !(STAGE_KEYS as readonly string[]).includes(k))
        const dupes = keys.filter((k, i) => keys.indexOf(k) !== i)
        if (missing.length || extra.length) {
          return `Stages must include exactly these keys, one each: ${STAGE_KEYS.join(', ')}.`
        }
        if (dupes.length) return `Duplicate stage key: ${dupes.join(', ')}.`
        return true
      },
      fields: [
        {
          name: 'key',
          type: 'select',
          required: true,
          options: [...STAGE_KEY_OPTIONS],
          admin: {
            description: 'Selects the bench visual state. Order on the page is fixed by key, not by this array.',
          },
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'statement',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Short claim under the stage name in the rail (desktop) / panel h3 (mobile).',
          },
        },
        {
          name: 'question',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Core question shown as the desktop panel heading.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'output',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'What this stage produces, e.g. "Problem statement + success metric".',
          },
        },
        {
          name: 'evidence',
          type: 'relationship',
          relationTo: 'projects',
          admin: {
            description:
              'Optional. Shown as “Seen in” only when the project has a published case study in the current locale.',
          },
        },
      ],
    },
  ],
}

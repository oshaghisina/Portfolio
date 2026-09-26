import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

import { CAPABILITY_OPTIONS } from './capabilities'
import { TOOL_LOGOS, TOOL_OPTIONS } from './toolLogos'

/**
 * SKILLS — seven capability rows (Product → Design → Research → Data → Growth → Delivery → AI),
 * each a title and a short run of skills, closed by one small "Selected tools" row (D-043). It
 * replaced a 40-logo tool matrix that showed which software was open, not what the work was.
 *
 * The slug stays `workflowStages` so the existing homepage layout records survive, as it did when
 * the block last changed shape (stage → tool names, then the tool matrix). The seeder rewrites the
 * whole block, so no stored row of the old shape needs migrating.
 *
 * House pattern — shared arrays, localized leaves: the arrays are not localized, `key` and
 * `toolKey` are shared identities, and only the words are translated. `skills` is a localized
 * `hasMany` text, so each locale holds its own list and a translation can never fork row ids.
 * Product names are never localized; they come from `./toolLogos`.
 */
export const WorkflowStages: Block = {
  slug: 'workflowStages',
  interfaceName: 'WorkflowStagesBlock',
  fields: [
    sectionHeader(),
    {
      name: 'capabilities',
      type: 'array',
      admin: {
        description:
          'Rendered in the canonical order defined in capabilities.ts (01 Product → 07 AI). The two-digit index follows that order, not the row order here.',
        initCollapsed: true,
      },
      labels: { plural: 'Capabilities', singular: 'Capability' },
      maxRows: 7,
      minRows: 1,
      // Payload has no cross-row uniqueness constraint, so a repeated capability — which would
      // read as a mistake on the page — is refused here.
      validate: (value: unknown) => {
        const keys = (Array.isArray(value) ? value : [])
          .map((row) => (row as { key?: string })?.key)
          .filter(Boolean) as string[]
        const duplicates = [...new Set(keys.filter((key, i) => keys.indexOf(key) !== i))]
        return duplicates.length
          ? `Each capability can only appear once. Duplicated: ${duplicates.join(', ')}.`
          : true
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'key',
              type: 'select',
              admin: {
                description: 'Stable id — sets the render order and the index code',
                width: '50%',
              },
              options: CAPABILITY_OPTIONS,
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              admin: { description: 'Row label, e.g. "Product"', width: '50%' },
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'contribution',
          type: 'text',
          localized: true,
          admin: {
            description:
              'The practical contribution this capability makes, e.g. "Make complex products easier to use."',
          },
        },
        {
          name: 'skills',
          type: 'text',
          admin: {
            description: 'One skill per entry, e.g. "Strategy", "Discovery". Rendered as one line.',
          },
          hasMany: true,
          localized: true,
          maxRows: 8,
          minRows: 1,
          required: true,
        },
        {
          name: 'note',
          type: 'text',
          admin: {
            description:
              'Optional second line under the skills, e.g. the build note under Delivery.',
          },
          localized: true,
        },
      ],
    },
    {
      name: 'toolsLabel',
      type: 'text',
      admin: {
        description:
          'Label for the tool row. "Selected" matters: the row is a sample, not the whole toolkit.',
      },
      localized: true,
    },
    {
      name: 'tools',
      type: 'array',
      admin: {
        description: 'Rendered in row order. Keep it short — this is a sample, not an inventory.',
        initCollapsed: true,
      },
      labels: { plural: 'Tools', singular: 'Tool' },
      maxRows: 12,
      validate: (value: unknown) => {
        const keys = (Array.isArray(value) ? value : [])
          .map((row) => (row as { toolKey?: string })?.toolKey)
          .filter(Boolean) as string[]
        const duplicates = [...new Set(keys.filter((key, i) => keys.indexOf(key) !== i))]
        if (!duplicates.length) return true
        const names = duplicates.map(
          (key) => TOOL_LOGOS[key as keyof typeof TOOL_LOGOS]?.name ?? key,
        )
        return `A tool can only appear once. Duplicated: ${names.join(', ')}.`
      },
      fields: [
        {
          name: 'toolKey',
          type: 'select',
          admin: {
            description: 'Resolves to a brand mark and its canonical product name (toolLogos.ts).',
          },
          options: TOOL_OPTIONS,
          required: true,
        },
      ],
    },
  ],
  labels: { plural: 'Skills & tools', singular: 'Skills & tools' },
}

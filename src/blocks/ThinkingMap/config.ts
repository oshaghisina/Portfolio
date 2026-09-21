import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

/**
 * "How I think" as a connected relationship map, not a grid of principle cards. The diagram's
 * layout (positions, connectors) is a fixed template in the Component — exactly 6 nodes, in
 * order: Business, Product, User, System, Execution, Learning — so only label/annotation text is
 * editable here.
 */
export const ThinkingMap: Block = {
  slug: 'thinkingMap',
  interfaceName: 'ThinkingMapBlock',
  labels: { singular: 'Thinking map', plural: 'Thinking maps' },
  fields: [
    sectionHeader(),
    {
      name: 'intro',
      type: 'richText',
      localized: true,
      admin: { description: 'Optional short intro above the diagram.' },
    },
    {
      name: 'nodes',
      type: 'array',
      minRows: 6,
      maxRows: 6,
      labels: { singular: 'Node', plural: 'Nodes' },
      admin: {
        description: 'Exactly 6, in this order: Business, Product, User, System, Execution, Learning — the diagram layout is fixed to this order.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'annotation',
          type: 'textarea',
          localized: true,
          admin: { description: 'Short — one sentence.' },
        },
      ],
    },
  ],
}

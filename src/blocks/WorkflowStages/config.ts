import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

/** WorkflowStages: tools shown as an operating system (stage → tools), not a software list. */
export const WorkflowStages: Block = {
  slug: 'workflowStages',
  interfaceName: 'WorkflowStagesBlock',
  labels: { singular: 'Workflow stage', plural: 'Workflow stages' },
  fields: [
    sectionHeader(),
    {
      name: 'stages',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      labels: { singular: 'Stage', plural: 'Stages' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'code',
              type: 'text',
              required: true,
              admin: { description: 'e.g. "R1"', width: '25%' },
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
              admin: { width: '75%' },
            },
          ],
        },
        {
          name: 'tools',
          type: 'text',
          localized: true,
          required: true,
          admin: { description: 'Comma-separated tool names' },
        },
      ],
    },
  ],
}

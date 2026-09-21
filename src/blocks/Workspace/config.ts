import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

/** Workspace: a connected process rail (own → ship → measure → learn), not prose + a list. */
export const Workspace: Block = {
  slug: 'workspace',
  interfaceName: 'WorkspaceBlock',
  labels: { singular: 'Workspace', plural: 'Workspace' },
  fields: [
    sectionHeader(),
    {
      name: 'tracks',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      labels: { singular: 'Track', plural: 'Tracks' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'code',
              type: 'text',
              required: true,
              admin: { description: 'e.g. "S1"', width: '25%' },
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
          name: 'description',
          type: 'textarea',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}

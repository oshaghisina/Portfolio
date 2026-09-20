import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

/** Capabilities: an indexed catalogue (01, 02, …), not equal-width feature cards. */
export const Capabilities: Block = {
  slug: 'capabilities',
  interfaceName: 'CapabilitiesBlock',
  labels: { singular: 'Capabilities', plural: 'Capabilities' },
  fields: [
    sectionHeader(),
    {
      name: 'groups',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      labels: { singular: 'Group', plural: 'Groups' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'index',
              type: 'text',
              required: true,
              admin: { description: 'e.g. "01"', width: '20%' },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: { width: '80%' },
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}

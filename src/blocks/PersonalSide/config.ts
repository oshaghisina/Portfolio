import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

/** "Outside work" — deliberately limited, typography-first. Only source-backed, comfortable-to-publish content. */
export const PersonalSide: Block = {
  slug: 'personalSide',
  interfaceName: 'PersonalSideBlock',
  labels: { singular: 'Personal side', plural: 'Personal sides' },
  fields: [
    sectionHeader(),
    {
      name: 'items',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Item', plural: 'Items' },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional. Leave empty — the section works fine with typography alone.' },
        },
      ],
    },
  ],
}

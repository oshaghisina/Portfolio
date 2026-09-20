import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionHeader } from '@/fields/sectionHeader'

/**
 * Selected Work: a small, editable array of case-study rows. V1 entries are provisional —
 * source-backed from the resume/inventory, not published case studies — so link and media
 * stay optional until real case-study content exists.
 */
export const SelectedWork: Block = {
  slug: 'selectedWork',
  interfaceName: 'SelectedWorkBlock',
  labels: { singular: 'Selected work', plural: 'Selected work' },
  fields: [
    sectionHeader(),
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Work item', plural: 'Work items' },
      admin: {
        initCollapsed: true,
        description:
          'Provisional entries are fine for V1 — replace with real case-study rows as they become available.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'category',
              type: 'text',
              required: true,
              admin: { description: 'e.g. "Product · Growth"', width: '50%' },
            },
          ],
        },
        {
          name: 'role',
          type: 'text',
          admin: { description: "Sina's role, e.g. \"Designer / Marketer / BI\"" },
        },
        {
          name: 'summary',
          type: 'textarea',
          required: true,
          admin: { description: 'One or two sentences — source-backed, no unverified outcomes' },
        },
        {
          name: 'featured',
          type: 'checkbox',
          admin: { description: 'Show as a larger feature row instead of the compact supporting list' },
        },
        {
          name: 'enableLink',
          type: 'checkbox',
          admin: { description: 'Only enable once there is a real case study or live URL to link to' },
        },
        link({
          overrides: {
            admin: {
              condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
            },
          },
        }),
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional — leave empty for a provisional entry' },
        },
      ],
    },
  ],
}

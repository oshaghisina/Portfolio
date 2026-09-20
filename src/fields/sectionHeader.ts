import type { GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

/**
 * DS-12 section opener as a reusable field group: tag · lead · tail · lede.
 * Every field becomes `localized: true` when Payload localization lands (D-009).
 */
export const sectionHeader = (overrides: Partial<GroupField> = {}): GroupField =>
  deepMerge<GroupField, Partial<GroupField>>(
    {
      name: 'sectionHeader',
      type: 'group',
      interfaceName: 'SectionHeaderField',
      admin: { hideGutter: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'tag',
              type: 'text',
              admin: { description: 'Short label on the rule, e.g. "Work" or "By the numbers"', width: '50%' },
            },
            {
              name: 'lead',
              type: 'text',
              admin: { description: 'First part of the heading, in ink', width: '50%' },
            },
          ],
        },
        {
          name: 'tail',
          type: 'text',
          admin: { description: 'Second part of the heading, muted (optional)' },
        },
        {
          name: 'lede',
          type: 'textarea',
          admin: { description: 'One or two sentences under the heading (optional)' },
        },
      ],
    },
    overrides,
  )

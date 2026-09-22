import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

/**
 * ExperienceCatalogue: a typographic employer grid for V1, wired directly as a homepage block
 * array (no `experiences` collection exists yet). Wraps the existing `ExperienceGrid` primitive.
 */
export const ExperienceCatalogue: Block = {
  slug: 'experienceCatalogue',
  interfaceName: 'ExperienceCatalogueBlock',
  labels: { singular: 'Experience catalogue', plural: 'Experience catalogue' },
  fields: [
    sectionHeader(),
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      labels: { singular: 'Employer', plural: 'Employers' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'index',
              type: 'text',
              required: true,
              admin: { description: 'e.g. "A1"', width: '20%' },
            },
            {
              name: 'name',
              type: 'text',
              localized: true,
              required: true,
              // Localized to match the `experiences` collection, which already translates
              // `company`. A company name is a proper noun but it still has a script-appropriate
              // form — Digikala is دیجی‌کالا in Persian — and the same fact should not follow two
              // rules depending on which block renders it.
              admin: { width: '80%' },
            },
          ],
        },
        {
          name: 'role',
          type: 'text',
          localized: true,
          required: true,
          admin: { description: 'e.g. "Designer / Marketer / BI developer · 2.5 yr"' },
        },
        {
          name: 'blurb',
          type: 'textarea',
          localized: true,
          admin: { description: 'Optional one-line description' },
        },
      ],
    },
  ],
}

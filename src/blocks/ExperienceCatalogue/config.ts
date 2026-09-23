import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

import { COMPANY_LOGOS, COMPANY_OPTIONS } from './companyLogos'

/**
 * ExperienceCatalogue: a typographic employer grid for the homepage. Wraps the existing
 * `ExperienceGrid` primitive. Optional `companyKey` resolves a code-owned brand mark from
 * `./companyLogos` — names stay primary; logos are mono secondary markers (D-032).
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
      // Payload has no cross-row uniqueness constraint, so a duplicated companyKey would otherwise
      // render the same mark twice without warning.
      validate: (value: unknown) => {
        const rows = Array.isArray(value) ? value : []
        const keys = rows
          .map((row) => (row as { companyKey?: string })?.companyKey)
          .filter(Boolean) as string[]
        const duplicates = [...new Set(keys.filter((key, i) => keys.indexOf(key) !== i))]
        if (duplicates.length) {
          const names = duplicates.map(
            (key) => COMPANY_LOGOS[key as keyof typeof COMPANY_LOGOS]?.name ?? key,
          )
          return `Each company can only appear once. Duplicated: ${names.join(', ')}.`
        }
        return true
      },
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
              admin: { width: '50%' },
            },
            {
              name: 'companyKey',
              type: 'select',
              admin: {
                description:
                  'Resolves to a brand mark in companyLogos.ts. Leave empty for a text-only cell.',
                width: '30%',
              },
              options: COMPANY_OPTIONS,
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

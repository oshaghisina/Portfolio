import type { Block } from 'payload'
import { sectionHeader } from '@/fields/sectionHeader'
import { INDUSTRY_COUNT, INDUSTRY_KEYS, industryLabels, isIndustryKey } from './catalogue'

export const IndustryGrid: Block = {
  slug: 'industryGrid',
  interfaceName: 'IndustryGridBlock',
  labels: { singular: 'Industry grid', plural: 'Industry grids' },
  fields: [
    sectionHeader(),
    {
      name: 'industries',
      type: 'array',
      required: true,
      minRows: INDUSTRY_COUNT,
      maxRows: INDUSTRY_COUNT,
      admin: {
        initCollapsed: true,
        description:
          'All 15 industries, once each. Drag to reorder; names and illustrations are shared across languages.',
      },
      validate: (value: unknown) => {
        const keys = Array.isArray(value) ? value.map((row) => (row as { key?: unknown })?.key) : []
        return keys.length === INDUSTRY_COUNT &&
          keys.every(isIndustryKey) &&
          new Set(keys).size === INDUSTRY_COUNT
          ? true
          : 'Include each of the 15 industries exactly once.'
      },
      fields: [
        {
          name: 'key',
          type: 'select',
          required: true,
          options: INDUSTRY_KEYS.map((value) => ({ value, label: industryLabels.en[value] })),
        },
      ],
    },
  ],
}

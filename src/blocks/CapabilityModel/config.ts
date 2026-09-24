import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'
import { DISCIPLINE_KEYS } from '@/components/ExperienceVisuals/copy'

/**
 * Working across disciplines: the several fields the practice draws on, and the one thing they
 * are all pointed at.
 *
 * Distinct from the About hero's intersection diagram on purpose. About argues identity — three
 * domains that keep converging on one person. This argues capability — several disciplines
 * feeding one deliverable. Same drawing vocabulary, different claim; if they said the same thing
 * one of them should go.
 */
export const CapabilityModel: Block = {
  slug: 'capabilityModel',
  interfaceName: 'CapabilityModelBlock',
  labels: { plural: 'Capability model', singular: 'Capability model' },
  fields: [
    sectionHeader(),
    {
      name: 'disciplines',
      type: 'array',
      admin: {
        description:
          'The fields the work draws on. Six reads best — the grid is two or three columns, so six fills it exactly.',
        initCollapsed: true,
      },
      labels: { plural: 'Disciplines', singular: 'Discipline' },
      maxRows: 8,
      minRows: 3,
      required: true,
      fields: [
        {
          name: 'disciplineKey',
          type: 'select',
          options: [...DISCIPLINE_KEYS],
          admin: {
            description:
              'Select the concept illustrated by this row. Leave empty for a custom discipline.',
          },
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'outputLabel',
      type: 'text',
      admin: { description: 'Small label over the result, e.g. "Feeding"' },
      localized: true,
      required: true,
    },
    {
      name: 'output',
      type: 'text',
      admin: { description: 'What they all feed, e.g. "System · Decision · Delivery"' },
      localized: true,
      required: true,
    },
  ],
}

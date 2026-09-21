import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

/** DS-18 stats trio: 1–4 headline numbers, each with a caption and a traceable source. */
export const MetricsStrip: Block = {
  slug: 'metricsStrip',
  interfaceName: 'MetricsStripBlock',
  labels: { singular: 'Metrics strip', plural: 'Metrics strips' },
  fields: [
    sectionHeader(),
    {
      name: 'metrics',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Metric', plural: 'Metrics' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: { description: 'Short — "30%", "20+", "~$0.03"', width: '40%' },
            },
            {
              name: 'caption',
              type: 'text',
              localized: true,
              required: true,
              admin: { description: 'What the number measures', width: '60%' },
            },
          ],
        },
        {
          name: 'source',
          type: 'text',
          localized: true,
          admin: { description: 'Where it comes from (report, dashboard, date) — every number is traceable' },
        },
      ],
    },
  ],
}

import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'

/**
 * Minimal "what Sina is exploring now" — one statement, one optional forward link toward /lab.
 * A plain optional URL + label (not the shared `link()` group) on purpose: that factory's
 * `label` sub-field is unconditionally required, which fits nav items but not a genuinely
 * optional, unset-until-/lab-ships link.
 */
export const NowSection: Block = {
  slug: 'nowSection',
  interfaceName: 'NowSectionBlock',
  labels: { singular: 'Now section', plural: 'Now sections' },
  fields: [
    sectionHeader(),
    {
      name: 'statement',
      type: 'richText',
      localized: true,
      required: true,
    },
    {
      name: 'link',
      type: 'group',
      admin: { description: 'Optional — leave empty until /lab exists. Do not link to a page that doesn’t exist yet.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'url', type: 'text', admin: { width: '50%' } },
            { name: 'label', type: 'text', localized: true, admin: { width: '50%' } },
          ],
        },
      ],
    },
  ],
}

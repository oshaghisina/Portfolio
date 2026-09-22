import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { translationReviewedField } from '@/fields/translationReviewed'

/**
 * Reference data only — company/role/period facts, so they have one authoritative source instead
 * of being hand-typed again on every page that mentions them (starting with the About page's
 * Career Journey). Deliberately trimmed vs. Docs/Content-Model.md §5: no slug, no versions/
 * drafts, no SEO tab, no logo/links/case-study join, no public detail route. Mirrors
 * Categories.ts's simple taxonomy access pattern, not Pages' heavier draft/version setup.
 */
export const Experiences: CollectionConfig = {
  slug: 'experiences',
  labels: { singular: 'Experience', plural: 'Experiences' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'company', 'role', 'order'],
    description: 'Company/role/period reference data — no confirmed calendar dates exist yet, so periods are shown as a duration label, not a year.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      admin: { description: 'Admin-facing row title, e.g. "Digikala — Digital Gold".' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'company',
          type: 'text',
          localized: true,
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'product',
          type: 'text',
          localized: true,
          admin: { description: 'Business unit or product, if different from the company, e.g. "Digital Gold".', width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'role',
          type: 'text',
          localized: true,
          required: true,
          admin: { description: 'Verbatim resume role string — do not silently resolve title ambiguities.', width: '50%' },
        },
        {
          name: 'employment',
          type: 'select',
          required: true,
          options: [
            { label: 'Full-time', value: 'full-time' },
            { label: 'Part-time', value: 'part-time' },
            { label: 'Freelance', value: 'freelance' },
            { label: 'Contract', value: 'contract' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'period',
      type: 'group',
      admin: { description: 'Leave start/end empty until real calendar dates are confirmed — the duration label is the only date-shaped fact seeded today.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'start',
              type: 'date',
              admin: { date: { pickerAppearance: 'monthOnly' }, width: '50%' },
            },
            {
              name: 'end',
              type: 'date',
              admin: {
                condition: (_data, siblingData) => !siblingData?.present,
                date: { pickerAppearance: 'monthOnly' },
                width: '50%',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'present',
              type: 'checkbox',
              label: 'Ongoing',
              defaultValue: false,
              admin: { width: '50%' },
            },
            {
              name: 'approx',
              type: 'checkbox',
              label: 'Approximate',
              defaultValue: false,
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'durationLabel',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "2.5 yrs" — resume-sourced, the only duration shown until dates are confirmed.' },
        },
      ],
      validate: (value) => {
        const v = value as { end?: unknown; present?: boolean } | undefined
        if (v?.present && v?.end) return 'Clear "End" when "Ongoing" is checked.'
        return true
      },
    },
    {
      name: 'domain',
      type: 'text',
      localized: true,
      admin: { description: 'Plain text, e.g. "fintech" — not a relationship, to avoid taxonomy scope creep.' },
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      required: true,
      admin: { description: 'One line, resume-sourced.' },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 50,
      admin: { description: 'Manual sort key (resume order).' },
    },
    translationReviewedField,
  ],
}

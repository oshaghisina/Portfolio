import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Short blurb under the wordmark.' },
      localized: true,
    },
    {
      name: 'social',
      type: 'array',
      // One row per platform, so six covers the full set below. Row order is ignored: SocialLinks
      // renders in a fixed order, the same one these options are listed in.
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'kind',
              type: 'select',
              admin: { width: '50%' },
              options: [
                { label: 'Email', value: 'email' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Telegram', value: 'telegram' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Dribbble', value: 'dribbble' },
                { label: 'Behance', value: 'behance' },
              ],
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              admin: { description: 'Full URL, or mailto:.', width: '50%' },
              required: true,
            },
          ],
        },
        {
          name: 'ariaLabel',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'pagesTitle',
      type: 'text',
      defaultValue: 'Pages',
      localized: true,
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'navLabel',
      type: 'text',
      admin: { description: 'aria-label for the nav; defaults to "Footer navigation" if left blank.' },
      localized: true,
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'About', localized: true },
        { name: 'text', type: 'textarea', localized: true },
        { name: 'linkLabel', type: 'text', localized: true },
        { name: 'linkHref', type: 'text' },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Get in touch', localized: true },
        { name: 'text', type: 'textarea', localized: true },
        { name: 'linkLabel', type: 'text', localized: true },
        {
          name: 'linkHref',
          type: 'text',
          admin: { description: 'e.g. /contact or mailto:you@example.com' },
        },
      ],
    },
    {
      name: 'metaBlock',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'key', type: 'text', admin: { width: '50%' }, localized: true, required: true },
            { name: 'value', type: 'text', admin: { width: '50%' }, localized: true, required: true },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
    },
    {
      name: 'legalLinks',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 4,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
  versions: {
    drafts: {
      // A locale's nav labels aren't ready just because English's are (D-009); requires
      // `experimental.localizeStatus` in payload.config.ts.
      localizeStatus: true,
    },
  },
}

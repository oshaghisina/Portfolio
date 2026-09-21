import type { GlobalConfig } from 'payload'

import { revalidateAbout } from './hooks/revalidateAbout'

/**
 * Compact, sitewide-reusable identity data only (name, small headline, contact links, resume,
 * portrait). The About page's own blocks hold the actual long-form narrative (hero statement,
 * biography, career journey, etc.) as their own content — Payload has no live "pull a global into
 * a block" mechanism, so this is a deliberate scoping choice: global = identity/settings,
 * page = authored content.
 */
export const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
    },
    {
      name: 'headline',
      type: 'text',
      localized: true,
      admin: { description: 'Small resume-style line, e.g. "Product Designer & Manager".' },
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      admin: { description: '≤ 12 words, optional.' },
    },
    {
      name: 'bioShort',
      type: 'textarea',
      localized: true,
      admin: { description: '~20-word one-liner, used for SEO/footer.' },
    },
    {
      name: 'basedIn',
      type: 'text',
      localized: true,
      admin: { description: 'Left empty — not yet confirmed.' },
    },
    {
      name: 'openTo',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Freelance', value: 'freelance' },
        { label: 'Consulting', value: 'consulting' },
        { label: 'Advisory', value: 'advisory' },
      ],
      admin: { description: 'Left empty — not yet confirmed.' },
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional. Leave empty unless a genuinely appropriate editorial portrait exists.' },
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'The downloadable CV (PDF).' },
    },
    {
      name: 'links',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'Email', value: 'email' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Dribbble', value: 'dribbble' },
                { label: 'Behance', value: 'behance' },
              ],
              admin: { width: '50%' },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateAbout],
  },
  versions: {
    drafts: {
      localizeStatus: true,
    },
  },
}

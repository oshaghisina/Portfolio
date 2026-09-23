import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const pathFields = [
  {
    name: 'index',
    type: 'text' as const,
    admin: { width: '20%' },
    label: 'Index',
    required: true,
  },
  {
    name: 'title',
    type: 'text' as const,
    admin: { width: '40%' },
    label: 'Title',
    localized: true,
    required: true,
  },
  {
    name: 'description',
    type: 'textarea' as const,
    label: 'Description',
    localized: true,
  },
  {
    name: 'ctaLabel',
    type: 'text' as const,
    label: 'CTA label',
    localized: true,
    required: true,
  },
]

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'sectionTitle',
      type: 'text',
      localized: true,
      admin: {
        description: 'Heading above the form grid (e.g. Start a conversation).',
      },
      label: 'Form section title',
    },
    {
      name: 'emailPath',
      type: 'group',
      label: 'Email path',
      fields: pathFields,
    },
    {
      name: 'formPath',
      type: 'group',
      label: 'Form path',
      fields: pathFields,
    },
    {
      name: 'closingNote',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Reply expectation and privacy note under the form.',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: 'Closing note',
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      localized: true,
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}

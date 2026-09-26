import type { Block } from 'payload'

/**
 * Downloads — the working files behind a chapter (a workbook, a deck, a PDF), offered as they are.
 * Evidence, like a figure: it sits inside the chapter above it and never opens one. The format
 * and size are read from the upload, so the editor only says what the file is and what is in it.
 */
export const CaseStudyDownloads: Block = {
  slug: 'csDownloads',
  interfaceName: 'CaseStudyDownloadsBlock',
  labels: { singular: 'Downloads', plural: 'Downloads' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: { description: 'Optional short title, e.g. "The two workbooks behind the roadmap".' },
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'File', plural: 'Files' },
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: { description: 'The file itself. Its format and size are shown from the upload.' },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
          admin: { description: 'What the file is, e.g. "Problem inventory".' },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: { description: 'One sentence on what is inside.' },
        },
      ],
    },
  ],
}

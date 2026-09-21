import type { Block } from 'payload'

/** What I learned — two to four concrete lessons; no inspirational filler. */
export const CaseStudyLessons: Block = {
  slug: 'csLessons',
  interfaceName: 'CaseStudyLessonsBlock',
  labels: { singular: 'Lessons', plural: 'Lessons' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: { description: 'Optional — defaults to "What I learned" in the page language.' },
    },
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      maxRows: 4,
      labels: { singular: 'Lesson', plural: 'Lessons' },
      admin: { description: 'A wrong assumption, what changed after launch, what would be done differently, a principle that became reusable.' },
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'body', type: 'textarea', localized: true },
      ],
    },
  ],
}

import type { Payload } from 'payload'

import { DEFAULT_LOCALE, dirFor, LOCALES } from '@/utilities/locale'

import { contactCopy } from '../contact-copy'
import { heading, paragraph, richText } from '../lexical-helpers'

/**
 * Write the `/contact` page and the contact form in every locale.
 *
 * The form is half of this: `submitButtonLabel`, `confirmationMessage`, `emails[].subject`,
 * `emails[].message` and every field's `label` are already `localized: true` in
 * `@payloadcms/plugin-form-builder`, so a locale nobody wrote renders unlabelled inputs and a
 * blank submit button. No schema change is needed, only content.
 *
 * Field labels are matched by the field's `name`, not by position, because `fields` is an
 * editable blocks array — reordering it in the admin must not silently relabel the inputs.
 */
export async function seedContactTranslations({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'pages',
    depth: 0,
    draft: true,
    limit: 1,
    locale: DEFAULT_LOCALE,
    pagination: false,
    where: { slug: { equals: 'contact' } },
  })

  const page = docs[0]
  if (!page) throw new Error('No `contact` page in this database — run the full seed first.')

  const block = (page.layout ?? []).find((row) => row.blockType === 'formBlock')
  if (!block) throw new Error('The `contact` layout has no `formBlock`.')

  // `depth: 0` leaves `form` as an id, which is what the relationship must be written back as.
  const formId = typeof block.form === 'object' ? (block.form as { id: string }).id : block.form
  const form = await payload.findByID({
    collection: 'forms',
    id: formId,
    depth: 0,
    locale: DEFAULT_LOCALE,
  })

  const labelByName: Record<string, 0 | 1 | 2 | 3> = {
    'full-name': 0,
    email: 1,
    phone: 2,
    message: 3,
  }

  for (const locale of LOCALES) {
    const copy = contactCopy[locale]
    const dir = dirFor(locale)

    await payload.update({
      collection: 'pages',
      id: page.id,
      context: { disableRevalidate: true },
      data: {
        _status: 'published',
        layout: (page.layout ?? []).map((row) =>
          row.blockType === 'formBlock'
            ? { ...row, introContent: richText(heading(copy.intro, 'h3', dir)) }
            : row,
        ),
        meta: { ...page.meta, description: copy.meta.description, title: copy.meta.title },
        title: copy.title,
        translationReviewed: locale === DEFAULT_LOCALE,
      },
      depth: 0,
      locale,
    })

    await payload.update({
      collection: 'forms',
      id: formId,
      context: { disableRevalidate: true },
      data: {
        confirmationMessage: richText(paragraph(copy.form.confirmation, dir)),
        emails: (form.emails ?? []).map((email) => ({
          ...email,
          message: richText(paragraph(copy.form.emailBody, dir)),
          subject: copy.form.emailSubject,
        })),
        fields: (form.fields ?? []).map((field) => {
          const index = 'name' in field ? labelByName[field.name as string] : undefined
          return index === undefined ? field : { ...field, label: copy.form.labels[index] }
        }),
        submitButtonLabel: copy.form.submitLabel,
      },
      depth: 0,
      locale,
    })
  }

  payload.logger.info(`— Contact page and form written in ${LOCALES.join(', ')} (page ${page.id})`)

  return { formId, locales: [...LOCALES], pageId: page.id }
}

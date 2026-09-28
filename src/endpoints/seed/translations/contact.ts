import type { Payload } from 'payload'

import { DEFAULT_LOCALE, dirFor, LOCALES } from '@/utilities/locale'

import { contactCopy } from '../contact-copy'
import { heading, paragraph, richText } from '../lexical-helpers'

function contactFieldsFor(locale: (typeof LOCALES)[number]) {
  const copy = contactCopy[locale]
  return [
    {
      name: 'full-name',
      blockName: 'full-name',
      blockType: 'text' as const,
      label: copy.form.labels.fullName,
      required: true,
      width: 50,
    },
    {
      name: 'email',
      blockName: 'email',
      blockType: 'email' as const,
      label: copy.form.labels.email,
      required: true,
      width: 50,
    },
    {
      name: 'company',
      blockName: 'company',
      blockType: 'text' as const,
      label: copy.form.labels.company,
      required: false,
      width: 50,
    },
    {
      name: 'project-type',
      blockName: 'project-type',
      blockType: 'select' as const,
      label: copy.form.labels.projectType,
      options: copy.form.projectTypes,
      required: false,
      width: 50,
    },
    {
      name: 'message',
      blockName: 'message',
      blockType: 'textarea' as const,
      label: copy.form.labels.message,
      required: true,
      width: 100,
    },
  ]
}

/**
 * Write the `/contact` page and the contact form in every locale.
 *
 * Field *structure* (names, types, widths) is written once in the default locale. Per-locale
 * updates only patch localized `label` / select option labels on the existing blocks — replacing
 * the whole `fields` array in every locale orphaned localized labels under `fallback: false`.
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

  const formId = typeof block.form === 'object' ? (block.form as { id: string }).id : block.form
  // 1) Default locale owns the field structure (phone → company + project-type).
  const enCopy = contactCopy[DEFAULT_LOCALE]
  const enDir = dirFor(DEFAULT_LOCALE)

  await payload.update({
    collection: 'forms',
    id: formId,
    context: { disableRevalidate: true },
    data: {
      confirmationMessage: richText(
        heading(enCopy.form.confirmationTitle, 'h2', enDir),
        paragraph(enCopy.form.confirmation, enDir),
      ),
      fields: contactFieldsFor(DEFAULT_LOCALE),
      submitButtonLabel: enCopy.form.submitLabel,
    },
    depth: 0,
    locale: DEFAULT_LOCALE,
  })

  const structured = await payload.findByID({
    collection: 'forms',
    id: formId,
    depth: 0,
    locale: DEFAULT_LOCALE,
  })

  for (const locale of LOCALES) {
    const copy = contactCopy[locale]
    const dir = dirFor(locale)

    await payload.update({
      collection: 'pages',
      id: page.id,
      context: { disableRevalidate: true },
      data: {
        _status: 'published',
        hero: {
          type: 'contactImpact',
          richText: richText(heading(copy.headline, 'h1', dir)),
          aside: richText(paragraph(copy.aside, dir)),
        },
        layout: (page.layout ?? []).map((row) =>
          row.blockType === 'formBlock'
            ? {
                ...row,
                enableIntro: false,
                introContent: null,
                sectionTitle: copy.sectionTitle,
                emailPath: {
                  index: copy.paths.email.index,
                  title: copy.paths.email.title,
                  description: copy.paths.email.description,
                  ctaLabel: copy.paths.email.ctaLabel,
                },
                formPath: {
                  index: copy.paths.form.index,
                  title: copy.paths.form.title,
                  description: copy.paths.form.description,
                  ctaLabel: copy.paths.form.ctaLabel,
                },
                closingNote: richText(paragraph(copy.closingNote, dir)),
              }
            : row,
        ),
        meta: { ...page.meta, description: copy.meta.description, title: copy.meta.title },
        title: copy.title,
        translationReviewed: locale === DEFAULT_LOCALE,
      },
      depth: 0,
      locale,
    })

    if (locale === DEFAULT_LOCALE) continue

    const labelByName: Record<string, string> = {
      'full-name': copy.form.labels.fullName,
      email: copy.form.labels.email,
      company: copy.form.labels.company,
      'project-type': copy.form.labels.projectType,
      message: copy.form.labels.message,
    }

    await payload.update({
      collection: 'forms',
      id: formId,
      context: { disableRevalidate: true },
      data: {
        confirmationMessage: richText(
          heading(copy.form.confirmationTitle, 'h2', dir),
          paragraph(copy.form.confirmation, dir),
        ),
        fields: (structured.fields ?? []).map((field) => {
          if (!('name' in field) || !field.name) return field
          const label = labelByName[field.name]
          if (!label) return field
          if (field.blockType === 'select' && field.name === 'project-type') {
            const byValue = Object.fromEntries(copy.form.projectTypes.map((o) => [o.value, o.label]))
            return {
              ...field,
              label,
              options: (field.options ?? []).map((opt) => ({
                ...opt,
                label: byValue[opt.value] ?? opt.label ?? opt.value,
              })),
            }
          }
          return { ...field, label }
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

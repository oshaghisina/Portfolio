import { RequiredDataFromCollectionSlug } from 'payload'

import { contactCopy } from './contact-copy'
import { heading, paragraph, richText } from './lexical-helpers'

export const contactForm: RequiredDataFromCollectionSlug<'forms'> = {
  confirmationMessage: richText(
    heading(contactCopy.en.form.confirmationTitle, 'h2'),
    paragraph(contactCopy.en.form.confirmation),
  ),
  confirmationType: 'message',
  createdAt: '2023-01-12T21:47:41.374Z',
  // The email to Sina is sent by `notifyContactSubmission` (src/hooks/contactSubmission.ts),
  // with addresses from the environment, so the form stores none.
  emails: [],
  fields: [
    {
      name: 'full-name',
      blockName: 'full-name',
      blockType: 'text',
      label: contactCopy.en.form.labels.fullName,
      required: true,
      width: 50,
    },
    {
      name: 'email',
      blockName: 'email',
      blockType: 'email',
      label: contactCopy.en.form.labels.email,
      required: true,
      width: 50,
    },
    {
      name: 'company',
      blockName: 'company',
      blockType: 'text',
      label: contactCopy.en.form.labels.company,
      required: false,
      width: 50,
    },
    {
      name: 'project-type',
      blockName: 'project-type',
      blockType: 'select',
      label: contactCopy.en.form.labels.projectType,
      options: contactCopy.en.form.projectTypes,
      required: false,
      width: 50,
    },
    {
      name: 'message',
      blockName: 'message',
      blockType: 'textarea',
      label: contactCopy.en.form.labels.message,
      required: true,
      width: 100,
    },
  ],
  redirect: undefined,
  submitButtonLabel: contactCopy.en.form.submitLabel,
  title: 'Contact Form',
  updatedAt: '2023-01-12T21:47:41.374Z',
}

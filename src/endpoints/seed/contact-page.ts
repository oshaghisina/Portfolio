import type { Form } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

import { contactCopy } from './contact-copy'
import { heading, paragraph, richText } from './lexical-helpers'

type ContactArgs = {
  contactForm: Form
}

export const contact: (args: ContactArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactForm,
}) => {
  const copy = contactCopy.en

  return {
    slug: 'contact',
    _status: 'published',
    hero: {
      type: 'contactImpact',
      richText: richText(heading(copy.headline, 'h1')),
      aside: richText(paragraph(copy.aside)),
    },
    layout: [
      {
        blockType: 'formBlock',
        enableIntro: false,
        form: contactForm,
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
        closingNote: richText(paragraph(copy.closingNote)),
      },
    ],
    meta: {
      description: copy.meta.description,
      title: copy.meta.title,
    },
    title: copy.title,
  }
}

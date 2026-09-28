import type {
  CollectionAfterChangeHook,
  CollectionBeforeValidateHook,
  Field,
  SendEmailOptions,
} from 'payload'

import { APIError } from 'payload'

import { getServerSideURL } from '@/utilities/getURL'

/**
 * Contact form mail (R01). The visitor's message is saved first; the email to Sina is a
 * notification about that saved message, so a mail failure is logged and never fails the save.
 * Addresses come from the environment only:
 *   CONTACT_EMAIL_TO    who receives the notification
 *   CONTACT_EMAIL_FROM  the sending address (must be allowed by the mail service)
 * With either unset, messages are still saved and no email is sent.
 */

/** Sent by the site form once per filled form (see `Form/Component.client.tsx`). */
export const SUBMISSION_KEY_PATTERN = /^[A-Za-z0-9-]{8,64}$/

export const submissionKeyField: Field = {
  name: 'submissionKey',
  type: 'text',
  index: true,
  admin: {
    description: 'Sent once per message by the site form, so a retry is not saved twice.',
    readOnly: true,
  },
}

/**
 * A retry after a lost response carries the same key as the first try: answer 409 instead of
 * saving the message a second time. The form treats 409 as "received".
 */
export const rejectRepeatedSubmission: CollectionBeforeValidateHook = async ({
  collection,
  data,
  operation,
  req,
}) => {
  if (operation !== 'create' || !data) return data

  const key: unknown = data.submissionKey
  if (typeof key !== 'string' || !SUBMISSION_KEY_PATTERN.test(key)) {
    // Save without a key rather than lose the message.
    return { ...data, submissionKey: undefined }
  }

  const existing = await req.payload.find({
    collection: collection.slug as 'form-submissions',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    req,
    where: { submissionKey: { equals: key } },
  })

  if (existing.docs.length > 0) {
    throw new APIError('This message was already received.', 409, null, true)
  }

  return data
}

type SubmissionRow = { field?: string | null; value?: string | null }

type NotificationInput = {
  adminURL: string
  from: string
  labels: Record<string, string>
  rows: SubmissionRow[]
  submissionID: string
  to: string
}

const EMAIL_PATTERN = /^[^\s@<>",;]+@[^\s@<>",;]+\.[^\s@<>",;]+$/

const oneLine = (value: string, max: number) => value.replace(/\s+/g, ' ').trim().slice(0, max)

const escapeHTML = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

/** The email Sina gets for one saved message. Replying answers the visitor directly. */
export function buildContactNotification({
  adminURL,
  from,
  labels,
  rows,
  submissionID,
  to,
}: NotificationInput): SendEmailOptions & { html: string; subject: string; text: string } {
  const values = new Map<string, string>()
  for (const row of rows) {
    if (row.field && typeof row.value === 'string' && row.value.trim()) {
      values.set(row.field, row.value.trim())
    }
  }

  const name = oneLine(values.get('full-name') ?? '', 80)
  const email = (values.get('email') ?? '').trim()
  const replyTo =
    email.length <= 254 && EMAIL_PATTERN.test(email)
      ? { address: email, name: name || email }
      : undefined

  const entries = [...values.entries()].map(([field, value]) => ({
    label: labels[field] || field,
    multiline: value.includes('\n'),
    value,
  }))
  const submissionURL = `${adminURL}/admin/collections/form-submissions/${submissionID}`
  const footer = replyTo
    ? `Reply to this email to answer ${name || email} directly.`
    : 'The visitor left no valid email address.'

  const text = [
    ...entries.map(({ label, multiline, value }) =>
      multiline ? `${label}:\n${value}` : `${label}: ${value}`,
    ),
    '',
    footer,
    `Saved in the admin: ${submissionURL}`,
  ].join('\n')

  const html = [
    ...entries.map(
      ({ label, value }) =>
        `<p><strong>${escapeHTML(label)}</strong><br><span style="white-space:pre-wrap">${escapeHTML(value)}</span></p>`,
    ),
    `<p>${escapeHTML(footer)}<br><a href="${escapeHTML(submissionURL)}">Saved in the admin</a></p>`,
  ].join('\n')

  return {
    from,
    html,
    replyTo,
    subject: name ? `New message from ${name}` : 'New message from the contact form',
    text,
    to,
  }
}

export const notifyContactSubmission: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== 'create') return doc

  const to = process.env.CONTACT_EMAIL_TO?.trim()
  const from = process.env.CONTACT_EMAIL_FROM?.trim()
  const { logger } = req.payload

  if (!to || !from) {
    logger.warn(
      `Form submission ${doc.id} saved; no email sent (CONTACT_EMAIL_TO or CONTACT_EMAIL_FROM is not set).`,
    )
    return doc
  }

  try {
    const formID = typeof doc.form === 'object' && doc.form ? doc.form.id : doc.form
    const form = await req.payload.findByID({
      collection: 'forms',
      depth: 0,
      id: formID,
      locale: 'en',
      overrideAccess: true,
      req,
    })
    const labels: Record<string, string> = {}
    for (const field of form.fields ?? []) {
      if ('name' in field && field.name && 'label' in field && field.label) {
        labels[field.name] = field.label
      }
    }

    await req.payload.sendEmail(
      buildContactNotification({
        adminURL: getServerSideURL(),
        from,
        labels,
        rows: doc.submissionData ?? [],
        submissionID: String(doc.id),
        to,
      }),
    )
    logger.info(`Form submission ${doc.id} saved; notification email sent.`)
  } catch (err) {
    logger.error({ err, msg: `Form submission ${doc.id} saved; the notification email failed.` })
  }

  return doc
}

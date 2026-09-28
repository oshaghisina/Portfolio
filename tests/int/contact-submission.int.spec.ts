import { readFileSync } from 'node:fs'
import path from 'node:path'

import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  buildContactNotification,
  notifyContactSubmission,
  rejectRepeatedSubmission,
} from '@/hooks/contactSubmission'
import { contactForm } from '@/endpoints/seed/contact-form'

vi.mock('@/utilities/getURL', () => ({
  getServerSideURL: () => 'https://sinaoshaghi.com',
}))

const rows = [
  { field: 'full-name', value: 'Ada Lovelace' },
  { field: 'email', value: 'ada@example.test' },
  { field: 'company', value: '' },
  { field: 'project-type', value: 'product' },
  { field: 'message', value: 'Hello <b>Sina</b>,\nline two' },
]

const formDoc = {
  id: 'form-1',
  fields: [
    { blockType: 'text', name: 'full-name', label: 'Full name' },
    { blockType: 'email', name: 'email', label: 'Email' },
    { blockType: 'textarea', name: 'message', label: 'Message' },
  ],
}

function fakeReq({
  existing = [],
  sendEmail = vi.fn(async () => ({})),
}: { existing?: unknown[]; sendEmail?: ReturnType<typeof vi.fn> } = {}) {
  const logger = { error: vi.fn(), info: vi.fn(), warn: vi.fn() }
  const payload = {
    find: vi.fn(async () => ({ docs: existing })),
    findByID: vi.fn(async () => formDoc),
    logger,
    sendEmail,
  }
  return { logger, payload, req: { payload } }
}

// The hooks only read what they use; the full Payload hook args aren't needed here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const call = (hook: (args: any) => unknown, args: Record<string, unknown>) => hook(args)

describe('contact form mail (R01)', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('builds one notification to Sina that replies to the visitor', () => {
    const mail = buildContactNotification({
      adminURL: 'https://sinaoshaghi.com',
      from: 'Site <site@example.test>',
      labels: { 'full-name': 'Full name', email: 'Email', message: 'Message' },
      rows,
      submissionID: 'sub-1',
      to: 'sina@example.test',
    })

    expect(mail.to).toBe('sina@example.test')
    expect(mail.from).toBe('Site <site@example.test>')
    expect(mail.replyTo).toEqual({ address: 'ada@example.test', name: 'Ada Lovelace' })
    expect(mail.subject).toBe('New message from Ada Lovelace')
    expect(mail.text).toContain('Full name: Ada Lovelace')
    expect(mail.text).toContain('Message:\nHello <b>Sina</b>,\nline two')
    expect(mail.text).not.toContain('company')
    expect(mail.text).toContain('https://sinaoshaghi.com/admin/collections/form-submissions/sub-1')
    expect(mail.html).toContain('Hello &lt;b&gt;Sina&lt;/b&gt;')
    expect(mail.html).not.toContain('<b>Sina</b>')
  })

  it('keeps header fields on one line and drops an invalid reply address', () => {
    const mail = buildContactNotification({
      adminURL: 'https://sinaoshaghi.com',
      from: 'site@example.test',
      labels: {},
      rows: [
        { field: 'full-name', value: 'Eve\r\nBcc: victim@example.test' },
        { field: 'email', value: 'not an address' },
      ],
      submissionID: 'sub-2',
      to: 'sina@example.test',
    })

    expect(mail.subject).toBe('New message from Eve Bcc: victim@example.test')
    expect(mail.subject).not.toMatch(/[\r\n]/)
    expect(mail.replyTo).toBeUndefined()
    expect(mail.text).toContain('The visitor left no valid email address.')
  })

  it('sends exactly one email for a new submission', async () => {
    vi.stubEnv('CONTACT_EMAIL_TO', 'sina@example.test')
    vi.stubEnv('CONTACT_EMAIL_FROM', 'site@example.test')
    const { payload, req } = fakeReq()
    const doc = { id: 'sub-3', form: 'form-1', submissionData: rows }

    const result = await call(notifyContactSubmission, { doc, operation: 'create', req })

    expect(result).toBe(doc)
    expect(payload.sendEmail).toHaveBeenCalledTimes(1)
    expect(payload.sendEmail.mock.calls[0][0]).toMatchObject({
      replyTo: { address: 'ada@example.test' },
      to: 'sina@example.test',
    })
  })

  it('keeps the saved message when the mail service fails', async () => {
    vi.stubEnv('CONTACT_EMAIL_TO', 'sina@example.test')
    vi.stubEnv('CONTACT_EMAIL_FROM', 'site@example.test')
    const { logger, req } = fakeReq({
      sendEmail: vi.fn(async () => {
        throw new Error('SMTP down')
      }),
    })
    const doc = { id: 'sub-4', form: 'form-1', submissionData: rows }

    await expect(call(notifyContactSubmission, { doc, operation: 'create', req })).resolves.toBe(
      doc,
    )
    expect(logger.error).toHaveBeenCalledTimes(1)
  })

  it('sends nothing without addresses, and nothing on update', async () => {
    vi.stubEnv('CONTACT_EMAIL_TO', '')
    const first = fakeReq()
    await call(notifyContactSubmission, {
      doc: { id: 'sub-5', form: 'form-1', submissionData: rows },
      operation: 'create',
      req: first.req,
    })
    expect(first.payload.sendEmail).not.toHaveBeenCalled()
    expect(first.logger.warn).toHaveBeenCalledTimes(1)

    vi.stubEnv('CONTACT_EMAIL_TO', 'sina@example.test')
    vi.stubEnv('CONTACT_EMAIL_FROM', 'site@example.test')
    const second = fakeReq()
    await call(notifyContactSubmission, {
      doc: { id: 'sub-5', form: 'form-1', submissionData: rows },
      operation: 'update',
      req: second.req,
    })
    expect(second.payload.sendEmail).not.toHaveBeenCalled()
  })

  it('answers 409 for a retry with a key that is already saved', async () => {
    const collection = { slug: 'form-submissions' }
    const key = '0b9f1c2e-7d1a-4b8e-9c55-1f2e3d4c5b6a'

    const fresh = fakeReq()
    const data = { form: 'form-1', submissionData: rows, submissionKey: key }
    await expect(
      call(rejectRepeatedSubmission, { collection, data, operation: 'create', req: fresh.req }),
    ).resolves.toBe(data)

    const repeat = fakeReq({ existing: [{ id: 'sub-6' }] })
    await expect(
      call(rejectRepeatedSubmission, { collection, data, operation: 'create', req: repeat.req }),
    ).rejects.toMatchObject({ status: 409 })
  })

  it('saves a message with a missing or odd key instead of losing it', async () => {
    const collection = { slug: 'form-submissions' }
    const { payload, req } = fakeReq({ existing: [{ id: 'other' }] })

    const result = (await call(rejectRepeatedSubmission, {
      collection,
      data: { form: 'form-1', submissionData: rows, submissionKey: '{"$ne":null}' },
      operation: 'create',
      req,
    })) as Record<string, unknown>

    expect(result.submissionKey).toBeUndefined()
    expect(payload.find).not.toHaveBeenCalled()
  })

  it('leaves no demo sender in the contact form seed', () => {
    expect(contactForm.emails).toEqual([])
    const seedDir = path.join(process.cwd(), 'src/endpoints/seed')
    for (const file of ['contact-form.ts', 'contact-copy.ts', 'translations/contact.ts']) {
      expect(readFileSync(path.join(seedDir, file), 'utf8')).not.toMatch(/payloadcms\.com/)
    }
  })
})

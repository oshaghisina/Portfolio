/**
 * Create or update a Payload admin user from env credentials.
 *
 *   pnpm create-admin
 *
 * Reads PROD_ADMIN_EMAIL, PROD_ADMIN_PASSWORD, and optional PROD_ADMIN_NAME.
 * Uses DATABASE_URL + PAYLOAD_SECRET from the environment (override those to
 * target production via an SSH Mongo tunnel).
 *
 * Never logs the password.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'

const email = (process.env.PROD_ADMIN_EMAIL || '').trim()
const password = process.env.PROD_ADMIN_PASSWORD || ''
const name = (process.env.PROD_ADMIN_NAME || '').trim() || undefined

if (!email || !password) {
  console.error('PROD_ADMIN_EMAIL and PROD_ADMIN_PASSWORD are required.')
  process.exit(1)
}

const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
  depth: 0,
  overrideAccess: true,
})

if (existing.docs[0]) {
  const id = existing.docs[0].id
  await payload.update({
    collection: 'users',
    id,
    data: {
      email,
      password,
      ...(name !== undefined ? { name } : {}),
    },
    overrideAccess: true,
  })
  console.log(JSON.stringify({ action: 'updated', email, id }, null, 2))
} else {
  const created = await payload.create({
    collection: 'users',
    data: {
      email,
      password,
      ...(name !== undefined ? { name } : {}),
    },
    overrideAccess: true,
  })
  console.log(JSON.stringify({ action: 'created', email, id: created.id }, null, 2))
}

process.exit(0)

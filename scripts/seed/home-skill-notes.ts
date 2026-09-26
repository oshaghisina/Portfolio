/** Local-only copy upgrade for the redesigned homepage Skills section. */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../../src/payload.config'
import { seedHomeSkillNotes } from '../../src/endpoints/seed/home-skill-notes'

const databaseHost = new URL(process.env.DATABASE_URL || '').hostname
if (!['localhost', '127.0.0.1', '[::1]'].includes(databaseHost)) {
  throw new Error('This preview migration only targets a local database.')
}
const payload = await getPayload({ config })
console.log(JSON.stringify(await seedHomeSkillNotes({ payload }), null, 2))
process.exit(0)

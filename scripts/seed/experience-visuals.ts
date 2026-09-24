import 'dotenv/config'
import { getPayload } from 'payload'
import { seedExperienceVisuals } from '../../src/endpoints/seed/experience-visuals'
import config from '../../src/payload.config'

const databaseHost = new URL(process.env.DATABASE_URL || '').hostname
if (!['localhost', '127.0.0.1', '[::1]'].includes(databaseHost)) {
  throw new Error('This preview migration only runs against a local database.')
}
const payload = await getPayload({ config })
console.log(JSON.stringify(await seedExperienceVisuals({ payload }), null, 2))
process.exit(0)

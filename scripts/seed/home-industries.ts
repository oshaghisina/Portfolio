/** Add the industry section to the LOCAL preview without running a full content seed.
 * Restart the dev server afterwards if its page cache is warm. */
import 'dotenv/config'
import { getPayload } from 'payload'
import { seedHomeIndustries } from '../../src/endpoints/seed/home-industries'
import config from '../../src/payload.config'

const databaseHost = new URL(process.env.DATABASE_URL || '').hostname
if (!['localhost', '127.0.0.1', '[::1]'].includes(databaseHost)) {
  throw new Error('This preview migration only runs against a local database.')
}
const payload = await getPayload({ config })
console.log(JSON.stringify(await seedHomeIndustries({ payload }), null, 2))
process.exit(0)

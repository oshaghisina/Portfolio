/**
 * Sync `experiences` with `experiencesData` (Carsparency / Khodro45 split):
 *   pnpm seed:experiences-sync
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { syncExperiences } from '../../src/endpoints/seed/sync-experiences'
import config from '../../src/payload.config'

const payload = await getPayload({ config })
const result = await syncExperiences({ payload })

console.log(JSON.stringify(result, null, 2))

process.exit(0)

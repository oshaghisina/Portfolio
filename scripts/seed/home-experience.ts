/**
 * Patch `companyKey` onto homepage experienceCatalogue rows without wiping anything:
 *   pnpm seed:home-experience
 * Additive and idempotent — the home page is matched by slug and only `companyKey` is written
 * on existing rows (ids kept). Hard-refresh `/` (or restart `pnpm dev`) afterwards; the script
 * runs with no Next server, so revalidation is disabled.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { seedHomeExperience } from '../../src/endpoints/seed/home-experience'
import config from '../../src/payload.config'

const payload = await getPayload({ config })
const result = await seedHomeExperience({ payload })

console.log(JSON.stringify(result, null, 2))

process.exit(0)

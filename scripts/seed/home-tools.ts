/**
 * Replace the homepage Skills block in the current database without wiping anything:
 *   pnpm seed:home-tools
 * Additive and idempotent — the home page is matched by slug and only its `workflowStages`
 * block is rewritten. Hard-refresh `/` (or restart `pnpm dev`) afterwards; the script runs with
 * no Next server, so revalidation is disabled.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { seedHomeTools } from '../../src/endpoints/seed/home-tools'
import config from '../../src/payload.config'

const payload = await getPayload({ config })
const result = await seedHomeTools({ payload })

console.log(JSON.stringify(result, null, 2))

process.exit(0)

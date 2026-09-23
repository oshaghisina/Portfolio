/**
 * Create or refresh `/experience` in the current database without wiping anything:
 *   pnpm seed:experience
 * Additive and idempotent — the page is matched by slug, the navigation rows are rewritten in
 * place, and the homepage teaser is inserted only if it is missing. Hard-refresh `/` (or restart
 * `pnpm dev`) afterwards; the script runs with no Next server, so revalidation is disabled.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { seedExperiencePage } from '../../src/endpoints/seed/experience-page'
import config from '../../src/payload.config'

const payload = await getPayload({ config })
const result = await seedExperiencePage({ payload })

console.log(JSON.stringify(result, null, 2))

process.exit(0)

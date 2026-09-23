/**
 * Bring the `projects` collection in line with `PROJECT_SEED` in the current database without
 * wiping anything:
 *   pnpm seed:projects
 * Additive and idempotent, except for `RETIRED_PROJECT_SLUGS`, which it deletes. Run
 * `pnpm seed:home-mosaic`, `pnpm seed:experience` and `pnpm seed:translations projects` after it —
 * see the docstring on `syncProjects`. Hard-refresh `/` (or restart `pnpm dev`) afterwards; the
 * script runs with no Next server, so revalidation is disabled.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { syncProjects } from '../../src/endpoints/seed/sync-projects'
import config from '../../src/payload.config'

const payload = await getPayload({ config })
const result = await syncProjects({ payload })

console.log(JSON.stringify(result, null, 2))

process.exit(0)

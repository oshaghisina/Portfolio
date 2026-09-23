/**
 * Replace the homepage's single Featured Project block with the work mosaic in the current
 * database, without wiping anything:
 *   pnpm seed:home-mosaic
 * Additive and idempotent — the home page is matched by slug and only that one block is
 * rewritten. Hard-refresh `/` (or restart `pnpm dev`) afterwards; the script runs with no Next
 * server, so revalidation is disabled.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { seedHomeMosaic } from '../../src/endpoints/seed/home-mosaic'
import config from '../../src/payload.config'

const payload = await getPayload({ config })
const result = await seedHomeMosaic({ payload })

console.log(JSON.stringify(result, null, 2))

process.exit(0)

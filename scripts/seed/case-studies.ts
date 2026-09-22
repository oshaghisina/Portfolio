/**
 * Seed the RP1 case study into the current database without wiping anything:
 *   pnpm seed:case-studies
 * Additive and idempotent — media is reused by filename, the project is matched by slug.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { seedCaseStudies } from '../../src/endpoints/seed/case-studies'
import config from '../../src/payload.config'

const payload = await getPayload({ config })
const result = await seedCaseStudies({ payload })

console.log(
  JSON.stringify(
    {
      projectId: result.projectId,
      created: result.created,
      media: Object.keys(result.media).length,
      mediaIds: result.media,
    },
    null,
    2,
  ),
)

process.exit(0)

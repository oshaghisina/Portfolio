/**
 * Check every translated surface for blank leaves, forked block row ids and wrong review flags:
 *   pnpm audit:translations
 * Read-only. Exits non-zero when anything is found, so it can gate a deploy.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import { auditTranslations } from '../../src/endpoints/seed/translations/audit'
import config from '../../src/payload.config'

const payload = await getPayload({ config })
const findings = await auditTranslations({ payload })

if (!findings.length) {
  console.log('No findings — every audited surface is published, filled and id-consistent.')
  process.exit(0)
}

for (const finding of findings) {
  console.error(`[${finding.kind}] ${finding.locale} · ${finding.detail}`)
}
console.error(`\n${findings.length} finding(s).`)
process.exit(1)

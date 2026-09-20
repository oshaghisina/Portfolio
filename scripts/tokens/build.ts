/**
 * Emit the frontend theme from the house tokens (D-014):
 *
 *   Docs/Design-System/tokens/sina.tokens.json
 *     → src/app/(frontend)/theme.css   (Tailwind v4 @theme + colour scopes + :lang(fa))
 *     → src/cssVariables.js            (breakpoints in px for next/image)
 *
 *   pnpm tokens:build            write both files
 *   pnpm tokens:build --check    exit 1 if either file would change
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

import { REPO_ROOT, fromRepo, tokensFile } from '../docs/lib/docs'
import { OWN_TOKENS } from '../docs/lib/schema'
import { readTokens } from '../docs/lib/tokens'
import { emitCssVariablesJs, emitThemeCss } from './lib/emit'

export const THEME_CSS_FILE = path.join(REPO_ROOT, 'src/app/(frontend)/theme.css')
export const CSS_VARIABLES_FILE = path.join(REPO_ROOT, 'src/cssVariables.js')

export interface BuildResult {
  file: string
  changed: boolean
}

/** Emit both files; with `write: false` only report what would change. */
export function buildAll(write: boolean): BuildResult[] {
  const src = tokensFile(OWN_TOKENS)
  const json = readTokens(src)
  if (!json) throw new Error(`tokens: ${fromRepo(src)} not found`)
  const outputs: [string, string][] = [
    [THEME_CSS_FILE, emitThemeCss(json)],
    [CSS_VARIABLES_FILE, emitCssVariablesJs(json)],
  ]
  return outputs.map(([file, next]) => {
    const prev = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null
    const changed = prev !== next
    if (changed && write) fs.writeFileSync(file, next)
    return { file, changed }
  })
}

function main() {
  const { values } = parseArgs({ options: { check: { type: 'boolean', default: false } } })
  const results = buildAll(!values.check)
  const changed = results.filter((r) => r.changed)
  if (values.check) {
    if (changed.length) {
      console.error('tokens:build --check: these files are out of date — run pnpm tokens:build:')
      for (const r of changed) console.error(`  ${fromRepo(r.file)}`)
      process.exitCode = 1
    } else {
      console.log(`tokens:build --check: ${results.length} files up to date`)
    }
    return
  }
  for (const r of changed) console.log(`updated  ${fromRepo(r.file)}`)
  console.log(`tokens:build: ${changed.length} of ${results.length} files updated`)
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) main()

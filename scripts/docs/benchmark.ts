/**
 * Intake a benchmark URL: screenshots + pre-filled analysis file + index row.
 *
 *   pnpm docs:benchmark <url> <content|design> [--slug s] [--no-screenshot]
 *                                              [--timeout ms] [--keep-motion] [--force]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

import { benchmarkDir, fromRepo, slugFromUrl, today } from './lib/docs'
import { setFields } from './lib/frontmatter'
import { BENCHMARK_TYPES, type BenchmarkType } from './lib/schema'
import { captureSite, fetchMetaBasic, type SiteMeta } from './lib/screenshot'
import { regenerateAll } from './index'

const USAGE = `usage: pnpm docs:benchmark <url> <content|design> [--slug s] [--no-screenshot] [--timeout ms] [--keep-motion] [--force]`

async function main() {
  const { values, positionals } = parseArgs({
    options: {
      slug: { type: 'string' },
      screenshot: { type: 'boolean', default: true },
      timeout: { type: 'string', default: '45000' },
      'keep-motion': { type: 'boolean', default: false },
      force: { type: 'boolean', default: false },
    },
    allowPositionals: true,
    allowNegative: true,
  })

  const [url, typeArg] = positionals
  if (!url || !typeArg) fail(USAGE)
  try {
    new URL(url)
  } catch {
    fail(`not a valid URL: ${url}`)
  }
  if (!(BENCHMARK_TYPES as readonly string[]).includes(typeArg)) fail(`type must be content or design\n${USAGE}`)
  const type = typeArg as BenchmarkType
  const timeoutMs = Number(values.timeout)
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) fail('--timeout must be a positive number of ms')

  const slug = values.slug ?? slugFromUrl(url)
  const dir = benchmarkDir(type)
  const target = path.join(dir, `${slug}.md`)
  const assetsDir = path.join(dir, 'assets', slug)
  if (fs.existsSync(target) && !values.force) {
    fail(`${fromRepo(target)} already exists — pass --force to overwrite the .md (screenshots are always refreshed)`)
  }

  // 1. Capture
  let meta: SiteMeta
  let screenshots: string[] = []
  const warnings: string[] = []
  console.log(`→ ${url} (${type}) as ${slug}`)
  try {
    const result = await captureSite(url, {
      outDir: assetsDir,
      timeoutMs,
      keepMotion: values['keep-motion'] ?? false,
      screenshot: values.screenshot ?? true,
    })
    meta = result.meta
    screenshots = result.screenshots
    warnings.push(...result.warnings)
  } catch (err) {
    warnings.push(`Playwright capture failed: ${(err as Error).message.split('\n')[0]}`)
    try {
      meta = await fetchMetaBasic(url, timeoutMs)
      warnings.push('metadata read with a plain fetch instead; no screenshots')
    } catch (err2) {
      warnings.push(`plain fetch failed too: ${(err2 as Error).message}`)
      meta = emptyMeta()
    }
  }

  // 2. Pre-fill the template
  const template = fs.readFileSync(path.join(dir, '_template.md'), 'utf8')
  const title = meta.ogTitle || meta.title || slug
  const filled = setFields(template, {
    title,
    url,
    slug,
    type,
    owner: meta.ogSiteName || '',
    lang: meta.lang,
    generator: meta.generator,
    date_added: today(),
    screenshots,
  })
    .replace('# {Title}', `# ${title}`)
    .replace(
      '> One-sentence summary of what this site is and why it was benchmarked.',
      meta.description ? `> ${meta.description}` : '> One-sentence summary of what this site is and why it was benchmarked.',
    )
    .replace(
      '> One-sentence summary of the design idea and why it was benchmarked.',
      meta.description ? `> ${meta.description}` : '> One-sentence summary of the design idea and why it was benchmarked.',
    )
    .replaceAll('{slug}', slug)
  fs.writeFileSync(target, filled)
  console.log(`✓ wrote ${fromRepo(target)}`)
  if (screenshots.length) console.log(`✓ ${screenshots.length} screenshots in ${fromRepo(assetsDir)}/ (local-only)`)

  // 3. Index
  const changed = regenerateAll(true).filter((r) => r.changed)
  for (const r of changed) console.log(`✓ updated ${fromRepo(r.file)}`)

  for (const w of warnings) console.warn(`! ${w}`)
  if (meta.dir === 'rtl' || /^(fa|ar|he|ur)\b/i.test(meta.lang)) {
    console.log(`ℹ site declares lang="${meta.lang}" dir="${meta.dir}" — note it in Bilingual / RTL notes`)
  }
  console.log(`\nnext: write the analysis in ${fromRepo(target)}, then fill summary, scores.* and relevance (see Docs/Benchmarks/Rubric.md)`)
}

function emptyMeta(): SiteMeta {
  return {
    title: '', description: '', ogTitle: '', ogDescription: '', ogSiteName: '', ogImage: '',
    canonical: '', lang: '', dir: '', generator: '',
  }
}

function fail(message: string): never {
  console.error(message)
  process.exit(1)
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}

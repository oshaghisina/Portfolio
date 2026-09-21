import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { BenchmarkType } from './schema'
import { BENCHMARK_TYPES, DS_FILE } from './schema'

export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
export const DOCS_ROOT = path.join(REPO_ROOT, 'Docs')

export type DocKind = 'benchmark' | 'experience' | 'project' | 'dsitem' | 'meta' | 'index'

export interface DocRef {
  /** Absolute path */
  file: string
  /** Path relative to Docs/ with forward slashes */
  rel: string
  kind: DocKind
  benchmarkType?: BenchmarkType
  /** Company folder name for experience/project docs */
  company?: string
  /** `DS-NN` for design-system items (from the file name, so validate can catch id/name drift) */
  dsId?: string
}

/** Folder that holds one benchmark type. */
export const benchmarkDir = (type: BenchmarkType) =>
  path.join(DOCS_ROOT, 'Benchmarks', type === 'content' ? 'Content' : 'Design')

export const EXPERIENCE_DIR = path.join(DOCS_ROOT, 'Experience')

/** Design-System folder and its sub-folders (see Docs/README.md). */
export const DS_DIR = path.join(DOCS_ROOT, 'Design-System')
export const DS_TOKENS_DIR = path.join(DS_DIR, 'tokens')
export const DS_SOURCES_DIR = path.join(DS_DIR, 'sources')
export const dsAssetsDir = (benchmark: string) => path.join(DS_DIR, 'assets', benchmark)
export const tokensFile = (benchmark: string) => path.join(DS_TOKENS_DIR, `${benchmark}.tokens.json`)
export const manifestFile = (benchmark: string) => path.join(DS_SOURCES_DIR, `${benchmark}.capture.json`)

export const toRel = (file: string) => path.relative(DOCS_ROOT, file).split(path.sep).join('/')
export const fromRepo = (file: string) => path.relative(REPO_ROOT, file).split(path.sep).join('/')

const INDEX_FILES = new Set([
  'README.md',
  'Benchmarks/Content/README.md',
  'Benchmarks/Design/README.md',
  'Experience/README.md',
  'Design-System/README.md',
])

/** Decide what kind of doc a Docs-relative path is; null for files we don't manage. */
export function classify(rel: string): Omit<DocRef, 'file'> | null {
  if (!rel.endsWith('.md')) return null
  const base = path.posix.basename(rel)
  if (base.startsWith('_')) return null
  if (INDEX_FILES.has(rel)) return { rel, kind: 'index' }

  const parts = rel.split('/')
  if (parts[0] === 'Benchmarks' && parts.length === 3 && parts[1] !== undefined) {
    const type = parts[1].toLowerCase()
    if ((BENCHMARK_TYPES as readonly string[]).includes(type)) {
      return { rel, kind: 'benchmark', benchmarkType: type as BenchmarkType }
    }
  }
  if (parts[0] === 'Experience' && parts.length === 3 && base === 'README.md') {
    return { rel, kind: 'experience', company: parts[1] }
  }
  if (parts[0] === 'Experience' && parts.length === 4 && base === 'README.md') {
    return { rel, kind: 'project', company: parts[1] }
  }
  if (parts[0] === 'Design-System') {
    // tokens/ and sources/ hold JSON; a stray .md there is not a doc we manage
    if (parts.length > 2) return null
    if (base.startsWith('DS-')) return { rel, kind: 'dsitem', dsId: DS_FILE.exec(base)?.[1] }
  }
  return { rel, kind: 'meta' }
}

function walk(dir: string, out: string[]) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'assets' || entry.name.startsWith('.')) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full)
  }
}

/** Every managed markdown doc under Docs/, sorted by path. */
export function discover(): DocRef[] {
  const files: string[] = []
  walk(DOCS_ROOT, files)
  return files
    .sort()
    .map((file) => {
      const c = classify(toRel(file))
      return c ? { file, ...c } : null
    })
    .filter((d): d is DocRef => d !== null)
}

/** Design-System item files (`DS-NN-*.md`), sorted — so ids come out in order. */
export function dsItemFiles(): string[] {
  if (!fs.existsSync(DS_DIR)) return []
  return fs
    .readdirSync(DS_DIR)
    .filter((f) => f.startsWith('DS-') && f.endsWith('.md'))
    .sort()
    .map((f) => path.join(DS_DIR, f))
}

/** Benchmark slugs that have a tokens file, sorted. */
export function tokenBenchmarks(): string[] {
  if (!fs.existsSync(DS_TOKENS_DIR)) return []
  return fs
    .readdirSync(DS_TOKENS_DIR)
    .filter((f) => f.endsWith('.tokens.json'))
    .map((f) => f.replace(/\.tokens\.json$/, ''))
    .sort()
}

/** Benchmark slugs that have a capture manifest, sorted. */
export function manifestBenchmarks(): string[] {
  if (!fs.existsSync(DS_SOURCES_DIR)) return []
  return fs
    .readdirSync(DS_SOURCES_DIR)
    .filter((f) => f.endsWith('.capture.json'))
    .map((f) => f.replace(/\.capture\.json$/, ''))
    .sort()
}

/** Company folders under Experience/ that have a README.md. */
export function companyDirs(): string[] {
  return fs
    .readdirSync(EXPERIENCE_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(EXPERIENCE_DIR, e.name, 'README.md')))
    .map((e) => e.name)
    .sort()
}

/** `https://www.linear.app/foo` → `linear-app` */
export function slugFromUrl(url: string): string {
  const host = new URL(url).hostname.replace(/^www\./, '')
  return host
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const today = () => new Date().toISOString().slice(0, 10)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { BenchmarkType } from './schema'
import { BENCHMARK_TYPES } from './schema'

export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
export const DOCS_ROOT = path.join(REPO_ROOT, 'Docs')

export type DocKind = 'benchmark' | 'experience' | 'project' | 'meta' | 'index'

export interface DocRef {
  /** Absolute path */
  file: string
  /** Path relative to Docs/ with forward slashes */
  rel: string
  kind: DocKind
  benchmarkType?: BenchmarkType
  /** Company folder name for experience/project docs */
  company?: string
}

/** Folder that holds one benchmark type. */
export const benchmarkDir = (type: BenchmarkType) =>
  path.join(DOCS_ROOT, 'Benchmarks', type === 'content' ? 'Content' : 'Design')

export const EXPERIENCE_DIR = path.join(DOCS_ROOT, 'Experience')

export const toRel = (file: string) => path.relative(DOCS_ROOT, file).split(path.sep).join('/')
export const fromRepo = (file: string) => path.relative(REPO_ROOT, file).split(path.sep).join('/')

const INDEX_FILES = new Set([
  'README.md',
  'Benchmarks/Content/README.md',
  'Benchmarks/Design/README.md',
  'Experience/README.md',
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
  if (parts[0] === 'Experience' && parts.length === 3) {
    const company = parts[1]
    return base === 'README.md'
      ? { rel, kind: 'experience', company }
      : { rel, kind: 'project', company }
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

# scripts/docs

Tooling for the `Docs/` knowledge base. Run through pnpm from the repo root.

| Command | What it does |
|---|---|
| `pnpm docs:benchmark <url> <content\|design>` | Load the site in Playwright, save `desktop.png` (1440), `mobile.png` (390) and `desktop-fold.png` to `Docs/Benchmarks/<Type>/assets/<slug>/` (gitignored), write `<slug>.md` from `_template.md` with title/url/slug/date/lang/generator pre-filled, regenerate the index. Flags: `--slug s`, `--no-screenshot`, `--timeout ms` (default 45000), `--keep-motion`, `--force` |
| `pnpm docs:index [--check]` | Regenerate every `<!-- index:start -->…<!-- index:end -->` block from frontmatter: both benchmark indices, the Experience index, each company's Projects table, and the Timeline table (+ its computed totals). `--check` exits 1 if anything would change |
| `pnpm docs:validate [files…] [--strict]` | Validate frontmatter against `lib/schema.ts` and cross-document rules (see below). Exit 1 on errors; `--strict` also fails on warnings |
| `pnpm docs:check` | `docs:index --check` + `docs:validate` — run before committing |

## Layout

```
lib/schema.ts       required keys, enums, criteria lists, regexes, marker strings  ← single source of truth
lib/docs.ts         paths, doc discovery/classification, slugFromUrl
lib/frontmatter.ts  YAML read; line-level setFields/replaceBlock that preserve comments
lib/markers.ts      replaceBetween / extractBetween for machine-owned blocks
lib/table.ts        markdown table build/parse
lib/period.ts       period normalisation, durations, overlaps
lib/screenshot.ts   Playwright capture + metadata, plain-fetch fallback
benchmark.ts / index.ts / validate.ts   CLIs
```

## Validation rules (summary)

- Every managed doc has frontmatter and `status ∈ draft | review | ready`; `ready` docs may not
  contain `❓` and must have their key fields filled.
- **Benchmarks:** `type` matches folder, `slug` = file name, valid `url`/`date_added`, `scores`
  keys exactly the rubric's for that type (0–5), `relevance` 1–5 past draft; warns when
  `|relevance − avg| > 1.5` or listed screenshots are missing locally.
- **Experience READMEs:** `slug` = folder lowercase, `resume_order`, `employment` enum, `period`
  as a string only while draft; exactly one marker pair.
- **Projects:** `slug` = file name, `company` matches the folder README, structured `period`
  inside the company's, `metrics[] {label, value}`, URL arrays, `inventory_id` exists.
- **Cross-doc:** relative links in indices and Inventory resolve; Synthesis warns when ≥ 3
  benchmarks are unsynthesised; Timeline rows reference real folders.

Changing a template key means updating `lib/schema.ts` (and `Docs/Benchmarks/Rubric.md` for
criteria). `tests/int/docs-tooling.int.spec.ts` checks the two stay in step.

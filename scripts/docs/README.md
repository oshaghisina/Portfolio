# scripts/docs

Tooling for the `Docs/` knowledge base. Run through pnpm from the repo root.

| Command | What it does |
|---|---|
| `pnpm docs:benchmark <url> <content\|design>` | Load the site in Playwright, save `desktop.png` (1440), `mobile.png` (390) and `desktop-fold.png` to `Docs/Benchmarks/<Type>/assets/<slug>/` (gitignored), write `<slug>.md` from `_template.md` with title/url/slug/date/lang/generator pre-filled, regenerate the index. Flags: `--slug s`, `--no-screenshot`, `--timeout ms` (default 45000), `--keep-motion`, `--force` |
| `pnpm docs:index [--check]` | Regenerate every `<!-- index:start -->…<!-- index:end -->` block from frontmatter: both benchmark indices, the Experience index, each company's Projects table, and the Timeline table (+ its computed totals). `--check` exits 1 if anything would change |
| `pnpm docs:validate [files…] [--strict]` | Validate frontmatter against `lib/schema.ts` and cross-document rules (see below). Exit 1 on errors; `--strict` also fails on warnings |
| `pnpm docs:check` | `docs:index --check` + `tokens:build --check` + `docs:validate` — run before committing |
| `pnpm tokens:build [--check]` | (`scripts/tokens/build.ts`) Emit `src/app/(frontend)/theme.css` — `@theme static` for type/space/size/radius/motion/breakpoints, `:root, [data-theme='light']` / `[data-theme='dark']` colour scopes with the shadcn slot aliases repeated per scope, an `@theme inline` colour bridge and a `:lang(fa)` block from `*.fa.*` — plus `src/cssVariables.js` (breakpoints in px) from `Docs/Design-System/tokens/sina.tokens.json`. `--check` exits 1 on drift. Pure emitters in `scripts/tokens/lib/emit.ts`, colour maths in `lib/contrast.ts` |
| `pnpm docs:ds new "<title>" --category c --take t [--priority n] [--source slug:type:"Section"]… [--target kind:path:name]` | Scaffold a Design-System item `Docs/Design-System/DS-NN-<slug>.md` from `_template.md` (next free id) and re-index. `docs:ds seed <items.json>` creates a batch; `docs:ds list [--category] [--priority]` prints them |
| `pnpm docs:ds-capture <benchmark> [--item DS-NN …] [--viewport desktop\|mobile] [--no-tokens] [--tokens-only] [--dry-run]` | Per `Docs/Design-System/sources/<benchmark>.capture.json`: force-reveal the page, crop targets @2x (+ hover/focus states), record bounding boxes and computed styles to `assets/<benchmark>/DS-NN.json`, take frame sequences / short videos for motion items, parse `:root` vars + measured computed values into `tokens/<benchmark>.tokens.json` (DTCG), and fill each item's `evidence[]`. Assets are local-only |

## Layout

```
lib/schema.ts       required keys, enums, criteria lists, regexes, marker strings  ← single source of truth
lib/docs.ts         paths, doc discovery/classification, slugFromUrl
lib/frontmatter.ts  YAML read; line-level setFields/replaceBlock that preserve comments
lib/markers.ts      replaceBetween / extractBetween for machine-owned blocks
lib/table.ts        markdown table build/parse
lib/period.ts       period normalisation, durations, overlaps
lib/screenshot.ts   Playwright capture + metadata, plain-fetch fallback; exports load/scrollThrough/newContextFor for ds-capture
lib/tokens.ts       DTCG token file: parseCssValue, mergeTokens (keeps $description / items / manual), stable stringify
lib/manifest.ts     capture manifest types + assertManifest
benchmark.ts / index.ts / validate.ts / ds.ts / ds-capture.ts   CLIs

../tokens/build.ts        tokens:build CLI (house tokens → theme.css + cssVariables.js)
../tokens/lib/emit.ts     cssName (path → CSS variable), cssValue, emitThemeCss, emitCssVariablesJs
../tokens/lib/contrast.ts oklch → sRGB, WCAG contrast (tests + /design)
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
- **Design-System items:** file name `DS-NN-<kebab>.md` matches `id`/`slug`; `category`, `take`,
  `adoption`, `rtl`, `localization`, `target.kind` enums; `priority` 1–3; every `sources[]` entry
  names an existing benchmark file (warns when `section` isn't a `##` heading there); `tokens[]`
  paths resolve in a source's tokens file (warn); `evidence[]` belongs to a source and exists
  locally (warn); `related[]` ids exist; `open_questions` equals the ❓ count (set by `docs:index`);
  `ready` requires a decided `adoption` and a filled `target`.
- **Cross-doc:** relative links in indices and Inventory resolve; Synthesis warns when ≥ 3
  benchmarks are unsynthesised; Timeline rows reference real folders; DS ids are unique; every
  `tokens/*.tokens.json` parses with `$value` + resolvable `$type` per leaf and a root `benchmark`;
  every `sources/*.capture.json` passes `assertManifest`; `DS-NN` references in Content-Model exist.
- **House tokens (`tokens/sina.tokens.json`):** exempt from the benchmark-file rule; `item` must
  be a DS id, `derivedFrom` must be `<benchmark>:<path>` of an existing measured token (warn);
  `color.light.*` and `color.dark.*` must define the same roles (error).

Changing a template key means updating `lib/schema.ts` (and `Docs/Benchmarks/Rubric.md` for
criteria). `tests/int/docs-tooling.int.spec.ts` checks the two stay in step.

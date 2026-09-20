---
id: "DS-18"                    # DS-NN — equals this file's prefix
title: "Stats trio"                 # Pattern name, e.g. "Single-accent rule"
slug: "stats-trio"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 1               # 1 = first sprint · 2 = next · 3 = later
adoption: "adopted"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: content
    section: "How work is showcased"
  - benchmark: "pleurat-com"
    type: design
    section: "Visual language"
target:                   # where it lands in the codebase
  kind: "block"
  path: "src/blocks/MetricsStrip/config.ts"
  name: "metricsStrip"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["font.size.num", "font.family.mono"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-18-1-desktop-trio.png", "pleurat-com/DS-18-2-desktop-caption.png", "pleurat-com/DS-18.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "ready"             # draft | review | ready
---

# DS-18 — Stats trio

> Three big numbers with mono captions (“30% · FASTER ARTICLE CREATION TIME”) closing a case study — the shape of proof on every page.

## What it is
Case studies close their outcome chapter with three big numbers, each a numeral (`--fs-num` fluid, ≈58–100px) over a 10.5px uppercase caption: “30% · FASTER ARTICLE CREATION TIME”, “20+ · PEOPLE INVOLVED WITHIN THE PROCESS”, “100% · POSITIVE FEEDBACK FROM ACTIVE USERS” (Codex); MindPath uses “10~ / 10+ / 5/5”, AI Journey “~$0.03 / 7 / 91”. The trio sits in a hairline-topped row inside the chapter grid; the home page's version is the scroll-filled bar chart (DS-19/35).

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-18.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **trio** | `div.sv-rv.is-in` | 1180.5×171.8px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · paddingTop 45px · gap 24px · display grid · grid 377.484px 377.5px 377.484px · borderTop 1px solid #16140E @16% | `color.ink` |
| ↳ value | `span` strong, b, .num, .val, :scope > * > *:first-child | 351.5×49px · font General Sans · size 48.96px · weight 500 · tracking -1.7136px · leading 48.96px · color #2F63C7 · borderTop 0px none — “30%” | — |
| ↳ caption | `span` small, .lbl, .cap, :scope > * > *:last-child | 351.5×16.8px · font General Sans · size 10.5px · weight 400 · tracking 1.365px · leading 16.8px · case uppercase · color #57534A · borderTop 0px none — “FASTER ARTICLE CREATION TIME” | `color.ink-2`, `font.size.eyebrow` |
| **caption** | `span.l` | 351.5×16.8px · font General Sans · size 10.5px · weight 400 · tracking 1.365px · leading 16.8px · case uppercase · color #57534A · borderTop 0px none | `color.ink-2`, `font.size.eyebrow` |

## Why it works
Three is the number that reads as “evidence” without becoming a dashboard; the caption in the label treatment (DS-09) does the explaining so the numeral can be huge. Putting it at the *end* of the study makes it the payoff, and the fixed shape makes proof a required field rather than an optional paragraph.

## For Sina
- **Take:** Borrow as the `metricsStrip` block (Content-Model §10 candidate — this and DS-19 are its evidence): `{ value, caption, source? }[]` capped at 3–4. Sina's marketing numbers (NMV, CTR/CPC, conversion, NPS) fit exactly; add a `source` field so every number is traceable, which Pleurat's are not.
- **RTL:** Mirrors: cells reverse, numerals stay LTR.
- **Persian:** Labels — captions get `_fa` twins; the numeral track is the digit decision (Persian or Latin digits, decided once for the whole site).

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| block | `src/blocks/MetricsStrip/config.ts` | metricsStrip | New block `src/blocks/MetricsStrip/{config,Component}.tsx`; `metrics` array field (value, caption, source) — also usable on the `about` global for the home page numbers. |

**Implemented (2026-09-19):** `metrics[] { value, caption, source }` (1–4) + optional `sectionHeader`; values in the numeral track in brand (the accent's "live data" job), captions as eyebrows, the source line under each. Registered in `RenderBlocks` and `Pages.layout`. Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-18-1-desktop-trio.png` — trio · crop @2x · desktop
- `DS-18-2-desktop-caption.png` — caption · crop @2x · desktop
- `DS-18.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-18.json`
- [x] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed

---
id: "DS-17"                    # DS-NN — equals this file's prefix
title: "Case-study meta strip"                 # Pattern name, e.g. "Single-accent rule"
slug: "case-study-meta-strip"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 1               # 1 = first sprint · 2 = next · 3 = later
adoption: "adopted"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: content
    section: "Content model"
  - benchmark: "pleurat-com"
    type: design
    section: "Key screens"
target:                   # where it lands in the codebase
  kind: "component"
  path: "src/components/ProjectMeta/index.tsx"
  name: "ProjectMeta"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["font.family.mono", "font.size.eyebrow", "color.line-soft"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-17-1-desktop-strip.png", "pleurat-com/DS-17-2-desktop-cell.png", "pleurat-com/DS-17-3-desktop-hero.png", "pleurat-com/DS-17.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-22"
status: "ready"             # draft | review | ready
---

# DS-17 — Case-study meta strip

> ROLE · TOOLS · TYPE · YEAR (· LIVE / CLIENT) in four or five hairline cells under the case-study title — fixed fields, not prose.

## What it is
Under every case-study title sits `.sv-case-bar`: four (sometimes five) hairline cells — ROLE · TOOLS · TYPE · YEAR, plus LIVE or CLIENT when they exist — each with a 10.5px uppercase label over a 15px value (“Sole UX/UI Designer”, “Figma & FigJam”, “Web · App · Kiosk”, “2025 — 26”). It is one grid, one border, no icons. The hero above it is the back link (`← ALL WORK`), the h1 and a one-line tagline.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-17.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **strip** | `div.sv-rv.is-in` | 1278.4×94.5px · font General Sans · size 17px · weight 400 · color #16140E · gap 1px · display grid · grid 318.344px 318.344px 318.344px 318.359px · border 1px solid #16140E @16% · borderTop 1px solid #16140E @16% · borderBottom 1px solid #16140E @16% · borderLeft 1px solid #16140E @16% | `color.ink` |
| ↳ cell | `div` :scope > div | 318.3×92.5px · font General Sans · size 17px · weight 400 · color #16140E · padding 22px — “ROLE Sole UX/UI Designer” | `color.ink` |
| ↳ label | `div` :scope > div > *:first-child | 274.3×16.3px · font General Sans · size 10.5px · weight 400 · tracking 1.47px · case uppercase · color #8B8577 · border 0px none · borderTop 0px none · borderBottom 0px none · borderLeft 0px none — “ROLE” | `color.ink-3`, `font.size.eyebrow` |
| ↳ value | `div` :scope > div > *:last-child | 274.3×23.3px · font General Sans · size 15px · weight 500 · color #16140E — “Sole UX/UI Designer” | `color.ink`, `font.size.button` |
| **cell** | `div` | 318.3×92.5px · font General Sans · size 17px · weight 400 · color #16140E · padding 22px | `color.ink` |
| **hero** | `div.sv-wrap` | 1382.4×359.1px · font General Sans · size 17px · weight 400 · color #16140E · padding 0px 52px | `color.ink` |
| ↳ back | `a` .sv-case-back | 80.9×16.3px · font General Sans · size 10.5px · weight 400 · tracking 1.68px · case uppercase · color #16140E · gap 8px · display inline-flex — “← ALL WORK” | `color.ink`, `font.size.eyebrow` |
| ↳ tagline | `p` .sv-case-tagline | 727.5×72.5px · font General Sans · size 25px · weight 400 · color #16140E — “A complete online laundry platform — fiv” | `color.ink` |

## Why it works
It answers the recruiter's first four questions before the first image and turns free-form prose into fixed fields, which is also what makes the studies comparable across the six. Because the labels are the same on every study, the eye finds “Year” in the same cell every time.

## For Sina
- **Take:** Borrow as `ProjectMeta` fed by fixed fields on `projects` (role, tools[], type/kind, period, client, liveUrl) — Content-Model §6 already has most of them. Add “Company” for Sina (nine employers matter more than clients here).
- **RTL:** Mirrors: cells reverse order, labels align start; the hairline grid is symmetric.
- **Persian:** Labels — the four labels get `_fa` twins; values like tool names can stay Latin, years follow the digit decision (DS-10).

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| component | `src/components/ProjectMeta/index.tsx` | ProjectMeta | Component `src/components/ProjectMeta/index.tsx` rendering `projects` fields; cells generated from a fixed label list so order never drifts. |

**Implemented (2026-09-19):** `PROJECT_META_KEYS` = company · role · period · type · tools · client · link (fixed order, empty keys skipped), EN/FA labels, tools as `TagList`, back link with a mirrored arrow. Shown on `/design`.

**Extended (2026-09-22, D-022):** keys `industry · team · status` (after `type`) with labels in all seven locales, and a `variant="compact"` — hairline rows instead of bordered cells, two columns on phones, one at `lg` — used by the case-study header at `/work/[slug]` so the facts read as structured metadata, not a card.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-17-1-desktop-strip.png` — strip · crop @2x · desktop
- `DS-17-2-desktop-cell.png` — cell · crop @2x · desktop
- `DS-17-3-desktop-hero.png` — hero · crop @2x · desktop
- `DS-17.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-17.json`
- [x] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed

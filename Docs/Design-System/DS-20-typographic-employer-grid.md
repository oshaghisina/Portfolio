---
id: "DS-20"                    # DS-NN — equals this file's prefix
title: "Typographic employer grid"                 # Pattern name, e.g. "Single-accent rule"
slug: "typographic-employer-grid"                  # kebab-case; the file is <id>-<slug>.md
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
    section: "Brand storytelling"
target:                   # where it lands in the codebase
  kind: "component"
  path: "src/components/ExperienceGrid/index.tsx"
  name: "ExperienceGrid"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "copy"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["font.family.mono", "color.line"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-20-1-desktop-board.png", "pleurat-com/DS-20-2-desktop-card.png", "pleurat-com/DS-20.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "ready"             # draft | review | ready
---

# DS-20 — Typographic employer grid

> Ten employers as a 5-column grid of type — index code, name, mono role, one-line blurb — instead of a logo wall; no permissions, no visual noise.

## What it is
“Where I've worked” is `.sv-board`: a 5-column grid of ten `article.sv-card`s separated by hairlines, each with an index code (`.ix`, 10.5px, ink-3), the company as a 21px/500 h3, the role in the label treatment (`.role`, uppercase 10.5px) and a 14.5px one-line blurb. No logos, no links, no dates. The same board appears on `/` and `/about`; the footer's transit-map “stations” reuse the index-code idea for tools.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-20.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **board** | `div.sv-board` | 1326.4×505.7px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · display grid · grid 265.266px 265.281px 265.281px 265.281px 265.281px · borderTop 1px solid #16140E @16% | `color.ink` |
| ↳ card | `article` .sv-card | 265.3×252.3px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · padding 30px 24px 34px — “A1 Hoopit AI SENIOR PRODUCT DESIGNER Led” | `color.ink` |
| **card** | `article.sv-card` | 265.3×252.3px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · padding 30px 24px 34px | `color.ink` |
| ↳ ix | `span` .ix | 15.6×14px · font General Sans · size 10.5px · weight 400 · tracking 1.47px · leading 16.275px · color #8B8577 · display inline · border 0px none · borderTop 0px none · borderLeft 0px none — “A2” | `color.ink-3`, `font.size.eyebrow` |
| ↳ title | `h3` h3 | 216.3×32.5px · font General Sans · size 21px · weight 500 · tracking -0.42px · leading 32.55px · color #16140E — “Santander UK” | `color.ink`, `font.size.h3` |
| ↳ role | `span` .role | 216.3×17px · font General Sans · size 11px · weight 400 · tracking 1.1px · leading 17.05px · case uppercase · color #57534A · border 0px none · borderTop 0px none · borderLeft 0px none — “SENIOR PRODUCT DESIGNER” | `color.ink-2` |
| ↳ blurb | `p` p | 216.3×44.9px · font General Sans · size 14.5px · weight 400 · leading 22.475px · color #57534A · border 0px none · borderTop 0px none · borderLeft 0px none — “Designed UX banking flows used by millio” | `color.ink-2`, `font.size.card-body` |

## Why it works
Names in type carry the credibility of Santander UK or Toyota without a logo wall's visual noise or permission questions, and the fixed cell means a startup and a bank get the same weight. The index codes turn ten unrelated employers into one ordered set — it reads as a catalogue, not a brag list.

## For Sina
- **Take:** Borrow as `experienceGrid` fed by the `experiences` collection (nine companies, `index`, `role`, one-line `blurb`), and fix Pleurat's dead end by linking each cell to its company page / case studies (“3 projects →”). This is also the answer to the `logoWall` candidate in Content-Model §10: names, not logos.
- **RTL:** Mirrors: grid flows right-to-left; index codes stay Latin or become Persian per the digit decision.
- **Persian:** Copy — company names can stay as written (most are Latin brands), roles and blurbs get `_fa` twins.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| block | `src/blocks/ExperienceGrid/config.ts` | experienceGrid | New block `src/blocks/ExperienceGrid` reading `experiences` (relationship or archive-style query), 5 → 3 → 1 columns at `lg → md → base`. |

**Implemented (2026-09-19):** presentational component (5 → 3 → 1 columns; index code · name · role · blurb · link). The `experienceGrid` block that reads the `experiences` collection follows Content-Model §5. Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-20-1-desktop-board.png` — board · crop @2x · desktop
- `DS-20-2-desktop-card.png` — card · crop @2x · desktop
- `DS-20.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-20.json`
- [x] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed

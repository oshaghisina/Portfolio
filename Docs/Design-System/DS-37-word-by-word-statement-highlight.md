---
id: "DS-37"                    # DS-NN — equals this file's prefix
title: "Word-by-word statement highlight"                 # Pattern name, e.g. "Single-accent rule"
slug: "word-by-word-statement-highlight"                  # kebab-case; the file is <id>-<slug>.md
category: "motion"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 3               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Key screens"
target:                   # where it lands in the codebase (no code yet)
  kind: "component"
  path: "src/components/Statement/index.tsx"
  name: "Statement"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "copy"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-37-f01-statement.png", "pleurat-com/DS-37-f02-statement.png", "pleurat-com/DS-37-f03-statement.png", "pleurat-com/DS-37-f04-statement.png", "pleurat-com/DS-37-f05-statement.png", "pleurat-com/DS-37-f06-statement.png", "pleurat-com/DS-37-f07-statement.png", "pleurat-com/DS-37-f08-statement.png", "pleurat-com/DS-37.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-37 — Word-by-word statement highlight

> A centred statement paragraph whose words darken one by one as you scroll — reading pace made visible.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-37.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **statement** | `section#top.sv-ab-hero` | 1440×2520px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · textAlign start | `color.ink` |
| ↳ pin | `div` .sv-ab-hero-pin | 1440×900px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · textAlign start — “Over the last decade, I’ve worked across” | `color.ink` |
| ↳ word | `span` span | 667.7×269.5px · font General Sans · size 30px · weight 500 · tracking -0.3px · leading 46.5px · color #16140E · textAlign center — “Over the last decade, I’ve worked across” | `color.ink` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Mirrors with `dir="rtl"` if built with logical properties (`margin-inline-start`, `text-align: start`); verify anything absolutely positioned.
- **Persian:** Body copy needs `_fa` twins; keep the English at Pleurat's length (2–4 sentences) so the Persian stays in parity.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| component | `src/components/Statement/index.tsx` | Statement | New React component; cva for interactive variants, plain `cn()` compound for layout (see `src/components/ui/button.tsx` vs `card.tsx`). |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-37-f01…f08-statement.png` — 8 viewport frames, statement, taken every few hundred ms while scrolling through
- `DS-37.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-37.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed

---
id: "DS-28"                    # DS-NN — equals this file's prefix
title: "Next-case card"                 # Pattern name, e.g. "Single-accent rule"
slug: "next-case-card"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: content
    section: "Content model"
target:                   # where it lands in the codebase (no code yet)
  kind: "component"
  path: "src/components/NextProject/index.tsx"
  name: "NextProject"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "copy"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-28-1-desktop-card.png", "pleurat-com/DS-28-2-desktop-card-hover.png", "pleurat-com/DS-28.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-28 — Next-case card

> NEXT CASE STUDY → title, one-line blurb, cover image, “Explore project” — the six studies form a loop.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-28.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **card** | `a.card` | 1180.5×375.7px · font General Sans · size 17px · weight 400 · color #16140E · bg #FBF7E6 · padding 43.2px · gap 57.6px · display grid · grid 574.719px 459.797px · border 1px solid #16140E @16% | `color.ink` |
| ↳ copy | `span` .copy | 574.7×248.9px · font General Sans · size 17px · weight 400 · color #16140E — “NEXT CASE STUDY Appello A mobile app tha” | `color.ink` |
| ↳ media | `span` .media | 459.8×287.4px · font General Sans · size 17px · weight 400 · color #16140E · border 1px solid #16140E @16% | `color.ink` |
| ↳ tag | `span` .sv-next-tag | 384.1×48px · font General Sans · size 15px · weight 400 · color #57534A · border 0px none — “A mobile app that lets field-based respo” | `color.ink-2`, `font.size.button` |
| ↳ go | `span` .sv-next-go | 178.4×49.3px · font General Sans · size 15px · weight 500 · color #16140E · padding 13px 22px · gap 12px · display inline-flex — “Explore project” | `color.ink`, `font.size.button` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Mirrors with `dir="rtl"` if built with logical properties (`margin-inline-start`, `text-align: start`); verify anything absolutely positioned.
- **Persian:** Body copy needs `_fa` twins; keep the English at Pleurat's length (2–4 sentences) so the Persian stays in parity.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| component | `src/components/NextProject/index.tsx` | NextProject | New React component; cva for interactive variants, plain `cn()` compound for layout (see `src/components/ui/button.tsx` vs `card.tsx`). |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-28-1-desktop-card.png` — card · crop @2x · desktop
- `DS-28-2-desktop-card-hover.png` — card · hover state · desktop
- `DS-28.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-28.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed

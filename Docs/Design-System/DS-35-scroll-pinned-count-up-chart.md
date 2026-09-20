---
id: "DS-35"                    # DS-NN — equals this file's prefix
title: "Scroll-pinned count-up chart"                 # Pattern name, e.g. "Single-accent rule"
slug: "scroll-pinned-count-up-chart"                  # kebab-case; the file is <id>-<slug>.md
category: "motion"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Visual language"
target:                   # where it lands in the codebase (no code yet)
  kind: "block"
  path: "src/blocks/MetricsStrip/Component.tsx"
  name: "count-up"
rtl: "neutral"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["motion.ease.standard", "motion.duration.slow"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-35-count-up.webm", "pleurat-com/DS-35-f01-count-up.png", "pleurat-com/DS-35-f02-count-up.png", "pleurat-com/DS-35-f03-count-up.png", "pleurat-com/DS-35-f04-count-up.png", "pleurat-com/DS-35-f05-count-up.png", "pleurat-com/DS-35-f06-count-up.png", "pleurat-com/DS-35-f07-count-up.png", "pleurat-com/DS-35-f08-count-up.png", "pleurat-com/DS-35-f09-count-up.png", "pleurat-com/DS-35-f10-count-up.png", "pleurat-com/DS-35-f11-count-up.png", "pleurat-com/DS-35-f12-count-up.png", "pleurat-com/DS-35.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-35 — Scroll-pinned count-up chart

> While the numbers section is pinned, bars fill and counters run up (9+ → 10+, 140+ → 150+) — the one spectacle on the page, and it carries meaning.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-35.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

_No measurements — see the frames and video in Evidence._

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Direction-neutral — nothing to mirror.
- **Persian:** Short labels need `_fa` twins; decide once whether mono/uppercase labels stay Latin or get a Persian equivalent (uppercase does not exist in Persian — use tracking + size instead).

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| block | `src/blocks/MetricsStrip/Component.tsx` | count-up | New Payload block: `config.ts` + `Component.tsx` in `src/blocks/`, registered in `RenderBlocks.tsx`; fields per Content-Model §10. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-35-f01…f12-count-up.png` — 12 viewport frames, count up, taken every few hundred ms while scrolling through
- `DS-35-count-up.webm` — short video, scrolls the section into and through view
- `DS-35.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-35.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed

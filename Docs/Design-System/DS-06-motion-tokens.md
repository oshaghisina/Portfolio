---
id: "DS-06"                    # DS-NN — equals this file's prefix
title: "Motion tokens"                 # Pattern name, e.g. "Single-accent rule"
slug: "motion-tokens"                  # kebab-case; the file is <id>-<slug>.md
category: "foundation"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "adopted"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Visual language"
target:                   # where it lands in the codebase
  kind: "token"
  path: "Docs/Design-System/tokens/sina.tokens.json"
  name: "motion.* → --ease-standard --ease-spring --duration-* --lift"
rtl: "neutral"                   # mirrors | neutral | needs-redesign
localization: "none"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["motion.ease.standard", "motion.ease.spring", "motion.duration.fast", "motion.duration.base", "motion.duration.slow", "motion.lift"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-06.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "review"             # draft | review | ready
---

# DS-06 — Motion tokens

> One standard ease, one spring, three durations (200/320/550ms) and a −2px hover lift — the whole motion vocabulary in six tokens.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-06.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Property | Value | Where measured | Token |
|---|---|---|---|
| ease.standard | `cubic-bezier(0.22, 1, 0.36, 1)` | stylesheet · `--ease` | `motion.ease.standard` |
| ease.spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | stylesheet · `--ease-spring` | `motion.ease.spring` |
| duration.fast | `0.2s` | stylesheet · `--dur-1` | `motion.duration.fast` |
| duration.base | `0.32s` | stylesheet · `--dur-2` | `motion.duration.base` |
| duration.slow | `0.55s` | stylesheet · `--dur-3` | `motion.duration.slow` |
| lift | `-2px` | stylesheet · `--lift` | `motion.lift` |

Representative elements:

| Part | Role | Measured | Token |
|---|---|---|---|
| **cta** | `a.sv-btn.sv-btn--amber` | 207.1×49.3px · transition background 0.2s, transform 0.15s · transitionDuration 0.2s, 0.15s · transitionTimingFunction ease, ease | — |
| **ghost** | `a.sv-btn.sv-btn--ghost` | 141.5×49.3px · transition background 0.2s, transform 0.15s · transitionDuration 0.2s, 0.15s · transitionTimingFunction ease, ease | — |
| **card** | `article.sv-card` | 254.7×242.3px · transition background 0.25s · transitionDuration 0.25s · transform matrix(0.96, 0, 0, 0.96, 0, 12) | — |
| **reveal** | `div.sv-rv.is-in` | 435.3×187.6px · transition opacity 0.8s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) · transitionDuration 0.8s, 0.8s · transitionTimingFunction ease, cubic-bezier(0.2, 0.8, 0.2, 1) | — |
| **bar-fill** | `div.fill` | 295.6×2px · transition height 1.1s cubic-bezier(0.22, 0.9, 0.24, 1) · transitionDuration 1.1s · transitionTimingFunction cubic-bezier(0.22, 0.9, 0.24, 1) | — |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Direction-neutral — nothing to mirror.
- **Persian:** Nothing to localize.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| token | `src/app/(frontend)/globals.css` | --ease-standard / --ease-spring / --duration-* | Emitted into `@theme` by the future `scripts/tokens` step from `tokens/sina.tokens.json`; never hand-edited in CSS. |

**Implemented (2026-09-19):** `Button` uses `duration-(--duration-fast) ease-standard hover:translate-y-(--lift)`; the drawer uses `--duration-base`. Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-06.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-06.json`
- [ ] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed

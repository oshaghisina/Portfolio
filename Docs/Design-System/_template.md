---
id: ""                    # DS-NN — equals this file's prefix
title: ""                 # Pattern name, e.g. "Single-accent rule"
slug: ""                  # kebab-case; the file is <id>-<slug>.md
category: ""              # foundation | type-device | layout | component | motion | signature
take: ""                  # borrow | adapt | avoid
priority: 0               # 1 = first sprint · 2 = next · 3 = later
adoption: candidate       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: ""         #   slug, e.g. pleurat-com
    type: design          #   content | design — which benchmark file
    section: ""           #   `## ` heading in that file, e.g. "Visual language"
target:                   # where it lands in the codebase (no code yet)
  kind: ""                #   token | utility | component | block | hero | global | layout | page | asset
  path: ""                #   e.g. src/app/(frontend)/globals.css
  name: ""                #   e.g. --color-brand · Button "outline" · metricsStrip
rtl: ""                   # mirrors | neutral | needs-redesign
localization: ""          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: []              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: YYYY-MM-DD
updated: YYYY-MM-DD
status: draft             # draft | review | ready
---

# {ID} — {Title}

> One sentence: what the pattern is and why it earns a place in Sina's system.

## What it is
What the source site does, in plain words. Where it appears, how often, what it sits next to.

## Measured
Values come from `assets/<benchmark>/<ID>.json` (computed styles) and the tokens file — not from
eyeballing. Foundations and type devices use the first shape; components, layout and motion use
the Anatomy shape (one row per part, plus states / variants / responsive rows).

| Property | Value | Where measured | Token |
|---|---|---|---|
| | | | |

## Why it works
The design reasoning — what problem this solves for a visitor, what it signals about the person.

## For Sina
- **Take:** borrow | adapt — what changes and why (personal-brand-first lens, D-007)
- **RTL:** mirrors | neutral | needs redesign — which parts flip, which break
- **Persian:** what needs a `_fa` twin, a partner typeface, or Persian digits (D-009)

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| | | | |

## Evidence
Local-only, in `assets/{benchmark}/` — one line per file with a caption; frames as a range.

## Open questions
> ❓ **Q1 — Confirm:** …

## Review checklist
- [ ] Q1 — …

---
id: "DS-40"                    # DS-NN — equals this file's prefix
title: "Illustration system"                 # Pattern name, e.g. "Single-accent rule"
slug: "illustration-system"                  # kebab-case; the file is <id>-<slug>.md
category: "signature"              # foundation | type-device | layout | component | motion | signature
take: "adapt"                  # borrow | adapt | avoid
priority: 3               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Visual language"
target:                   # where it lands in the codebase (no code yet)
  kind: "asset"
  path: "public/illustrations/"
  name: "illustration set"
rtl: "neutral"                   # mirrors | neutral | needs-redesign
localization: "none"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-40-1-desktop-skyline.png", "pleurat-com/DS-40-2-desktop-isometric.png", "pleurat-com/DS-40-3-desktop-footer-transit.png", "pleurat-com/DS-40-4-desktop-stroke-sample.png", "pleurat-com/DS-40.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 1         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-40 — Illustration system

> Thin-line illustrations in one stroke weight and one muted palette — skyline strip, isometric board, home office, rail-line pipeline, transit-map footer — with one recurring walking character.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-40.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **skyline** | `svg` | 1278.4×83.2px · color #16140E · height 83.2031px · width 1278.39px · strokeWidth 1px · fill rgb(0, 0, 0) | `color.ink` |
| **isometric** | `svg.sv-art` | 432×266.1px · color #16140E · height 266.109px · width 432px · strokeWidth 1px · fill rgb(0, 0, 0) | `color.ink` |
| **footer-transit** | `svg.sv-ar.sv-ar--ne` | 17×17px · color #16140E · height 17px · width 17px · stroke rgb(22, 20, 14) · strokeWidth 1.6px | `color.ink` |
| **stroke-sample** | `path.ln` | 15.4×0px · color #16140E · stroke rgb(111, 104, 88) · strokeWidth 1px | `color.ink` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Adapt — the pattern is right, the content or metaphor is Pleurat's; see the open question(s) below.
- **RTL:** Direction-neutral — nothing to mirror.
- **Persian:** Nothing to localize.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| asset | `public/illustrations/` | illustration set | Static assets under `public/` or uploaded to `media`. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-40-1-desktop-skyline.png` — skyline · crop @2x · desktop
- `DS-40-2-desktop-isometric.png` — isometric · crop @2x · desktop
- `DS-40-3-desktop-footer-transit.png` — footer transit · crop @2x · desktop
- `DS-40-4-desktop-stroke-sample.png` — stroke sample · crop @2x · desktop
- `DS-40.json` — bounding boxes, computed styles and parts for every target above

## Open questions
> ❓ **Q1 — Choose:** Illustration budget — commission a small set (hero strip + footer), generate a consistent SVG line style, or replace with typographic/data motifs Sina can produce himself?

## Review checklist
- [ ] Q1 — Illustration budget — commission a small set (hero strip + footer), generate a consistent SVG line style, or replace with typographic/data motifs Sina can produce himself?
- [x] Measured table filled from `assets/pleurat-com/DS-40.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed

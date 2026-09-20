---
id: "DS-09"                    # DS-NN — equals this file's prefix
title: "Mono eyebrow caps"                 # Pattern name, e.g. "Single-accent rule"
slug: "mono-eyebrow-caps"                  # kebab-case; the file is <id>-<slug>.md
category: "type-device"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 1               # 1 = first sprint · 2 = next · 3 = later
adoption: "adopted"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Visual language"
target:                   # where it lands in the codebase
  kind: "utility"
  path: "src/app/(frontend)/globals.css"
  name: ".eyebrow"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["font.family.mono", "font.size.eyebrow", "font.tracking.eyebrow", "font.weight.eyebrow", "color.ink-3"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-09-1-desktop-employer-role.png", "pleurat-com/DS-09-2-desktop-index-code.png", "pleurat-com/DS-09-3-desktop-figure-caption.png", "pleurat-com/DS-09-4-desktop-rail-sublabel.png", "pleurat-com/DS-09-5-desktop-section-tag.png", "pleurat-com/DS-09.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "ready"             # draft | review | ready
---

# DS-09 — Mono eyebrow caps

> Tiny monospaced caps with wide tracking for eyebrows, figure captions and metadata — `01 · OVERVIEW`, `FIG. 004 — FOUR TRACKS, ONE BENCH`, `BENCH · LIVE`.

## What it is
Metadata is set in tiny spaced caps: 10.5px, uppercase, tracking 1.47px (1.68px on the section tags), weight 400, colour ink-3 `#8B8577` — for employer roles (“SENIOR PRODUCT DESIGNER”), index codes (A1…A10, 01…05), figure captions (“FIG. 004 — FOUR TRACKS, ONE BENCH”), rail sub-labels (“BENCH · LIVE”) and the mono meta strip labels on case studies. The only variation is the section tag, which puts the same treatment in ink on an amber plate.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-09.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **employer-role** | `span.role` | 216.3×17px · font General Sans · size 11px · weight 400 · tracking 1.1px · leading 17.05px · case uppercase · color #57534A · border 0px none · height 17.0469px · width 216.266px | `color.ink-2` |
| **index-code** | `span.ix` | 13.4×14px · font General Sans · size 10.5px · weight 400 · tracking 1.47px · leading 16.275px · color #8B8577 · display inline · border 0px none | `color.ink-3`, `font.size.eyebrow` |
| **figure-caption** | `div.sv-cn-foot` | 1276.4×41.3px · font General Sans · size 10.5px · weight 400 · tracking 1.47px · leading 16.275px · case uppercase · color #8B8577 · bg #EFE9D2 · padding 12px 16px · gap 18px · display flex · height 41.2656px · width 1276.39px | `color.ink-3`, `font.size.eyebrow` |
| **rail-sublabel** | `span.gp` | 167×14.7px · font General Sans · size 9.5px · weight 400 · tracking 1.33px · leading 14.725px · case uppercase · color #8B8577 · border 0px none · height 14.7188px · width 167px | `color.ink-3` |
| **section-tag** | `section#focus.sv-inst-sec` | 1440×645.6px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · height 645.562px · width 1440px | `color.ink` |
| ↳ tag | `::before` | content "Tracks" · font General Sans · size 10.5px · weight 500 · tracking 1.68px · leading 10.5px · case uppercase · color #16140E · bg #F3B44A · padding 9px 13px 8px · height 27.5px · width 77.8906px — "Tracks" | `color.brand`, `color.ink`, `font.size.eyebrow` |

## Why it works
One treatment for *every* piece of metadata means the visitor never has to work out what is a label and what is content; the uppercase + tracking reads as “instrument panel” and sits under headings without competing. At 10.5px on ink-3 it is at the edge of legibility (≈4.1:1) — it works because labels are short and predictable, not because they are readable at a glance.

## For Sina
- **Take:** Borrow the role, raise the floor: same treatment, minimum 11–12px and ink-2 for anything the visitor must actually read (role, year, client); keep 10.5px/ink-3 only for decorative codes.
- **RTL:** Mirrors; tracking stays symmetric.
- **Persian:** Uppercase does not exist in Persian. The Persian eyebrow needs its own recipe — slightly larger size, medium weight, ink-3 — and Latin codes/numbers can stay in the Latin treatment inside a Persian page.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| utility | `src/app/(frontend)/globals.css` | .eyebrow | `.eyebrow` utility (`text-[11px] uppercase tracking-[0.14em] text-muted-foreground`) in `globals.css`; a `lang`-scoped variant for `fa`. |

**Implemented (2026-09-19):** `@utility eyebrow` — mono, 12px floor, 0.14em, uppercase, ink-2; `&:lang(fa)` drops the uppercase and falls back to the Persian sans, size and tracking arrive through the `:lang(fa)` variables (13px, 0em). Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-09-1-desktop-employer-role.png` — employer role · crop @2x · desktop
- `DS-09-2-desktop-index-code.png` — index code · crop @2x · desktop
- `DS-09-3-desktop-figure-caption.png` — figure caption · crop @2x · desktop
- `DS-09-4-desktop-rail-sublabel.png` — rail sublabel · crop @2x · desktop
- `DS-09-5-desktop-section-tag.png` — section tag · crop @2x · desktop
- `DS-09.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-09.json`
- [x] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed

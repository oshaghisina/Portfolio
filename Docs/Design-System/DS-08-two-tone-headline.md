---
id: "DS-08"                    # DS-NN — equals this file's prefix
title: "Two-tone headline"                 # Pattern name, e.g. "Single-accent rule"
slug: "two-tone-headline"                  # kebab-case; the file is <id>-<slug>.md
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
  kind: "component"
  path: "src/components/TwoTone/index.tsx"
  name: "TwoTone"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "copy"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["font.size.h1", "color.ink", "color.headline-muted"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-08-1-desktop-h1.png", "pleurat-com/DS-08-2-desktop-h2-numbers.png", "pleurat-com/DS-08-3-desktop-h2-teams.png", "pleurat-com/DS-08.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "ready"             # draft | review | ready
---

# DS-08 — Two-tone headline

> Headlines split into an ink clause and a muted second clause (“I design apps, websites, / and AI-powered systems”) — a one-span device that gives every heading a rhythm and a place for the point.

## What it is
Every big heading is split into an ink clause and a muted clause with a single `<span class="sv-dim">`: “I design apps, websites, / and **AI-powered systems**”, “Ten years, / **by the numbers.**”, “Where I've **worked**”. The muted colour is ink-3 `#8B8577` (the same grey-olive used for metadata), so the device costs one token and one span. Weight, size and tracking are unchanged between the two halves — only colour moves.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-08.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **h1** | `h1.sv-lines.is-in` | 700.6×121.3px · font General Sans · size 58.32px · weight 500 · tracking -1.7496px · leading 60.6528px · color #16140E · height 121.281px · width 700.562px | `color.ink`, `font.size.h1` |
| ↳ muted-clause | `span` .sv-dim | 524.6×73px · font General Sans · size 58.32px · weight 500 · tracking -1.7496px · leading 60.6528px · color #8B8577 · display inline · border 0px none — “AI-powered systems” | `color.ink-3`, `font.size.h1` |
| **h2-numbers** | `h2.sv-lines.is-in` | 308.5×91.3px · font General Sans · size 43.92px · weight 500 · tracking -1.3176px · leading 45.6768px · color #16140E · height 91.3438px · width 308.453px | `color.ink`, `font.size.h2` |
| ↳ muted-clause | `span` .sv-dim | 308.5×55px · font General Sans · size 43.92px · weight 500 · tracking -1.3176px · leading 45.6768px · color #8B8577 · display inline · border 0px none — “by the numbers.” | `color.ink-3`, `font.size.h2` |
| **h2-teams** | `h2.sv-lines.is-in` | 629.3×55.3px · font General Sans · size 43.92px · weight 500 · tracking -1.3176px · leading 45.6768px · color #16140E · height 55.3281px · width 629.281px | `color.ink`, `font.size.h2` |
| ↳ muted-clause | `span` .sv-dim | 141.7×55px · font General Sans · size 43.92px · weight 500 · tracking -1.3176px · leading 45.6768px · color #8B8577 · display inline · border 0px none — “worked” | `color.ink-3`, `font.size.h2` |

## Why it works
It gives every heading a rhythm (statement → point) and a place to put the emphasis without shouting; because the muted half is still large and still the heading, it is read, but the ink half is what is remembered. It also makes headlines scannable in a list of sections.

## For Sina
- **Take:** Borrow as-is: a `TwoTone` heading component (or a `<em>`/`<span>` convention in rich text) with the muted colour bound to `--muted-foreground`. Use it for the hero, section heads and case-study chapter titles.
- **RTL:** Mirrors: the clause order stays (first clause ink, second muted) but the muted clause lands on the *left* in RTL, so the visual weight flips — check the hero composition in both directions.
- **Persian:** Copy — the split point is a writing decision per language; store the heading as two fields (`lead` / `tail`) with `_fa` twins rather than parsing a span out of one string.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| component | `src/components/Headline/index.tsx` | TwoTone | Component `src/components/Headline/TwoTone.tsx` taking `lead` + `tail`; in Payload, two localized text fields on hero/section blocks rather than rich text. |

**Implemented (2026-09-19):** `<TwoTone as size lead tail />` — tail in `text-ink-3`, sizes from a literal class map; used by `SectionHeader`. (Path moved from `Headline/` to the folder-per-component convention.) Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-08-1-desktop-h1.png` — h1 · crop @2x · desktop
- `DS-08-2-desktop-h2-numbers.png` — h2 numbers · crop @2x · desktop
- `DS-08-3-desktop-h2-teams.png` — h2 teams · crop @2x · desktop
- `DS-08.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-08.json`
- [x] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed

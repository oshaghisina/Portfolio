---
id: "DS-32"                    # DS-NN — equals this file's prefix
title: "Mobile drawer nav"                 # Pattern name, e.g. "Single-accent rule"
slug: "mobile-drawer-nav"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 1               # 1 = first sprint · 2 = next · 3 = later
adoption: "adopted"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Key screens"
target:                   # where it lands in the codebase
  kind: "component"
  path: "src/Header/Nav/MobileNav.tsx"
  name: "MobileNav"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-32-1-mobile-sheet.png", "pleurat-com/DS-32-2-mobile-sheet-viewport.png", "pleurat-com/DS-32-3-mobile-link.png", "pleurat-com/DS-32-4-mobile-link-viewport.png", "pleurat-com/DS-32.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "ready"             # draft | review | ready
---

# DS-32 — Mobile drawer nav

> Full-height drawer with numbered oversized links (01 Welcome … 05 Contact), the active one in accent, email and location pinned at the bottom.

## What it is
On mobile the nav collapses to a hamburger that opens `.sv-nav-sheet`: a full-height cream sheet with five oversized links, each preceded by an index code (`01 Welcome … 05 Contact`), the current page in amber, hairlines between rows, and `.sv-nav-foot` pinned to the bottom with the email and “PRISTINA · CET” in the label treatment. The theme toggle stays in the header bar; the sheet has no logo repetition and no social icons.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-32.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **sheet** | `div#sv-nav-menu.sv-nav-sheet.is-open` | 390×844px · font General Sans · size 16.5px · weight 400 · color #16140E · bg #FFFCF0 · height 844px · position fixed | `color.paper`, `color.ink` |
| ↳ inner | `div` .sv-nav-sheet-in | 390×844px · font General Sans · size 16.5px · weight 400 · color #16140E · padding 98.2px 25px 42.2px · display flex · height 844px — “01 Welcome 02 Work 03 AI 04 Profile 05 C” | `color.ink` |
| ↳ link | `a` a | 311.3×77.7px · font General Sans · size 35.1px · weight 500 · tracking -1.053px · color #C77E0A · padding 20.256px 0px · borderBottom 0px none · height 77.6875px — “Welcome” | — |
| ↳ index | `span` .ix | 12.7×16.3px · font General Sans · size 10.5px · weight 400 · tracking 1.68px · color #C77E0A · borderBottom 0px none · height 16.2656px — “01” | `font.size.eyebrow` |
| ↳ foot | `div` .sv-nav-foot | 340×16.3px · font General Sans · size 10.5px · weight 400 · tracking 1.47px · color #8B8577 · gap 16px · display flex · borderBottom 0px none · height 16.2656px — “HELLO@PLEURAT.COM PRISTINA · CET” | `color.ink-3`, `font.size.eyebrow` |
| **link** | `a` | 309.2×77.7px · font General Sans · size 35.1px · weight 500 · tracking -1.053px · color #16140E · padding 20.256px 0px · height 77.6875px | `color.ink` |

## Why it works
Five big targets with numbers are faster to hit and to scan than a shrunk desktop menu, and repeating the email at the bottom means the most important action is never more than one tap away. Keeping the sheet in the same paper/ink/amber system makes it feel like a page, not an overlay.

## For Sina
- **Take:** Borrow: numbered oversized links, active in accent, contact + location pinned at the bottom. Sina's nav will have the same five or six entries; add the language switch (EN / FA) to the sheet's foot — it is the one place Pleurat has nothing to teach.
- **RTL:** Mirrors: numbers move to the right of the labels, the sheet slides in from the other side.
- **Persian:** Labels — nav labels get `_fa` twins; index codes follow the digit decision.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| component | `src/Header/Nav/index.tsx` | drawer | Drawer in `src/Header/Nav/index.tsx` (the template's header is a horizontal list — add a `Sheet`-style mobile nav), links from the `header` global, footer row from `about`/site settings. |

**Implemented (2026-09-19):** native `<dialog>` (focus trap, ESC and an inert page for free — no new dependency), slides from the inline-end side, numbered links with the active one in brand, `foot` slot for contact / location / the EN · FA switch once routing exists. Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-32-1-mobile-sheet.png` — sheet · crop @2x · mobile
- `DS-32-2-mobile-sheet-viewport.png` — sheet · viewport shot · mobile
- `DS-32-3-mobile-link.png` — link · crop @2x · mobile
- `DS-32-4-mobile-link-viewport.png` — link · viewport shot · mobile
- `DS-32.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-32.json`
- [x] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed

---
title: "Panel Redesign — Packages, Wallet, Financial Report, Profile, Calendar & Messenger"
title_fa: ""              # Persian title (shown on the fa site)
slug: "panel-redesign"
inventory_id: "OTE-03"    # row in ../../Inventory.md
company: "OTeacher"
product: ""                # Product or business unit, if different from company
role: "Product Designer"
period:
  start: ""
  end: ""
employment: "part-time"
domain: "edtech"
team: ""
summary: "Redesign of OTeacher's user panel across seven areas — packages, wallet, financial reporting, profile, an education calendar, messenger and logout — evidenced by an original pass and a follow-up 'edit' iteration on six of the seven."
summary_fa: ""
tools: [Figma]
skills: [ui-design, information-architecture, design-iteration]
figma:
  - "https://www.figma.com/design/AK18DgkzY2vZVEMdaBL8BS/OTeacher-%7C-Design?node-id=340-16618"    # Packages
  - "https://www.figma.com/design/AK18DgkzY2vZVEMdaBL8BS/OTeacher-%7C-Design?node-id=340-16817"    # Wallet
  - "https://www.figma.com/design/AK18DgkzY2vZVEMdaBL8BS/OTeacher-%7C-Design?node-id=6201-47309"   # Financial report
  - "https://www.figma.com/design/AK18DgkzY2vZVEMdaBL8BS/OTeacher-%7C-Design?node-id=340-17016"    # Profile
  - "https://www.figma.com/design/AK18DgkzY2vZVEMdaBL8BS/OTeacher-%7C-Design?node-id=340-17215"    # Education Calendar
  - "https://www.figma.com/design/AK18DgkzY2vZVEMdaBL8BS/OTeacher-%7C-Design?node-id=340-17414"    # Notifications / Messenger
  - "https://www.figma.com/design/AK18DgkzY2vZVEMdaBL8BS/OTeacher-%7C-Design?node-id=340-17812"    # Logout
  - "https://www.figma.com/design/AK18DgkzY2vZVEMdaBL8BS/OTeacher-%7C-Design?node-id=367-17512"    # "Logout" section — actually a Wallet top-up modal, see Solution
  - "https://www.figma.com/design/AK18DgkzY2vZVEMdaBL8BS/OTeacher-%7C-Design?node-id=3728-151103"  # Packages — edit pass
  - "https://www.figma.com/design/AK18DgkzY2vZVEMdaBL8BS/OTeacher-%7C-Design?node-id=3728-151211"  # Wallet — edit pass
  - "https://www.figma.com/design/AK18DgkzY2vZVEMdaBL8BS/OTeacher-%7C-Design?node-id=3728-151441"  # Profile — edit pass
  - "https://www.figma.com/design/AK18DgkzY2vZVEMdaBL8BS/OTeacher-%7C-Design?node-id=3728-152088"  # Education Calendar — edit pass
  - "https://www.figma.com/design/AK18DgkzY2vZVEMdaBL8BS/OTeacher-%7C-Design?node-id=3728-152404"  # Notifications / Messenger — edit pass
  - "https://www.figma.com/design/AK18DgkzY2vZVEMdaBL8BS/OTeacher-%7C-Design?node-id=3728-152606"  # Logout — edit pass
links: []
metrics: []
featured: false
status: draft
---

# Panel Redesign

> One-line summary: a seven-area redesign of OTeacher's user panel, iterated on twice for most
> sections — the most concretely evidenced project in this scan.

## Context

The Strategy deck's "New product" section names "New panel" (پنل جدید) as one of two initiatives
(alongside a new website — see [website-redesign](../website-redesign/README.md)). This project
is the directly-scanned evidence for it: a real Figma page named "Panel," structured as seven
named sections, most with a second "edit" pass.

## Problem

> ❓ **Q1 — Confirm:** No explicit problem statement slide exists for the panel — "New panel" is
> a bare section header in the Strategy deck. The presence of a near-complete second "edit" pass
> (6 of 7 sections redesigned again) suggests iteration driven by feedback or testing, but the
> specific problem each edit solved isn't evidenced by the file itself.

## My role

Product Designer, per the org chart in [product-roadmap-and-strategy](../product-roadmap-and-strategy/README.md).

> ❓ **Q2 — Confirm:** scope of solo vs. shared ownership on this panel.

## Process

> ❓ **Q3 — Confirm:** beyond "there were two passes" (an original and an "edit" set), no process
> detail (research, feedback source, review cadence) is evidenced in the Figma metadata alone.

## Solution

Seven sections, read directly from the Figma file's structure and content:

- **Packages** — a package-browsing shell; only a "1st" (first-tier) package screen is filled in,
  the rest of the section is thin.
- **Wallet** — Main/Withdraw tabs, a Toman-denominated balance, a transaction list (status, date,
  time, type, amount, reference number), and a top-up modal.
- **Financial report** — Main/Withdraw tabs; a per-class financial ledger (class date, class ID,
  teacher name, student name, class type — private/group, session status, package, paid/unpaid,
  amount, reason). This directly supports the teacher "more income" pain point (see
  [matchmaking-redesign](../matchmaking-redesign/README.md)) and the roadmap's FX-income-analysis
  item.
- **Profile** — includes a Finance tab (bank details: IBAN, account-holder name, verified status)
  and a Forgot-Password flow — payout/KYC infrastructure for teachers.
- **Education Calendar** — Month/Week/Day views, with a real calendar grid dated **Azar 1401
  (~Nov/Dec 2022)** — the one concrete date found anywhere in the Design file; worth
  cross-referencing against the open tenure-date question in
  [OTeacher/README.md](../README.md).
- **Notifications** — internally labeled **"Messenger"**: a List view plus a two-sided chat view.
  The chat mockup uses "سینا عشاقی" (Sina Oshaghi) as the placeholder name for *both* the teacher
  and student roles. This is the same feature as the roadmap's "پیام رسان" (messenger) line item
  — see [product-roadmap-and-strategy](../product-roadmap-and-strategy/README.md).
- **Logout** — a confirmation-style screen.

> ❓ **Q4 — Confirm:** a second Figma section is also named "Logout" (id `367:17512`), but its
> actual content is a Wallet top-up-modal exploration, not a logout screen — most likely a
> mislabeled or misplaced section in the source file. Stated as found; don't silently correct it
> without confirming with Sina.

> ❓ **Q5 — Confirm:** unexplored stray frames also exist on the Design-file canvas outside these
> seven sections (a "Title - Desktop" login/signup-looking fragment, and unlabeled frames with a
> "کلاس‌ها" / Classes list and pagination). Don't assume these belong to this project's scope.

## Outcome & impact

> ❓ **Q6 — Provide:** no outcome/impact evidence found for the panel redesign specifically —
> was it shipped? To which of the two passes (original or "edit")?

## Learnings

> ❓ Hold off on learnings until Q1–Q6 are answered.

## Assets

`assets/` — empty for now; see the asset-export note in [OTeacher/README.md](../README.md).

## Review checklist

- [ ] Q1 — Confirm the problem behind the panel redesign and its "edit" iteration
- [ ] Q2 — Confirm Sina's individual scope on this panel
- [ ] Q3 — Confirm the process behind the two design passes
- [ ] Q4 — Confirm the mislabeled second "Logout" section
- [ ] Q5 — Confirm whether the stray login/classes frames belong to this project
- [ ] Q6 — Provide outcome/impact evidence and shipped status

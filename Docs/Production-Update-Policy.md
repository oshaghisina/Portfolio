---
title: Payload API First production policy
doc_type: policy
status: ready
updated: 2026-09-27
---

# Payload API First production policy

**Mandatory for every agent:** Claude sessions, Codex, Cursor, Agent 1, Agent 2 (planning), Agent 3
(implementing), deployment or release agents, and any agent added later. The short form is in
[CLAUDE.md](../CLAUDE.md) under "Production updates". Decision: [D-052](Decisions.md).

> If a production change can be made safely through Payload (its API, or an established Payload
> data path), make it that way. Don't push code and deploy for it. Deploy only when the
> application itself has to change: code, schema, a source asset or infrastructure.

This is not "never deploy". It is "deploy because the application changed, not because content
changed".

## The rule

Before any push, deploy or restart meant to change production:

1. Work out exactly what has to change on the live site.
2. If Payload can produce that state safely, use Payload. **Don't deploy.**
3. If only part of it needs new code or schema, deploy that part once. Then make the data part
   through Payload.
4. Deploy only what the production data layer can't represent.

Don't deploy because it's the easiest or most familiar path.

**API-first chooses the path. It doesn't grant permission.** Every live write and every deploy
or restart still needs Sina's approval ([Approvals](#approvals)).

## How production works here

- Every route except `/_not-found` renders per request from the production database. **The
  image carries no CMS content**, and seeds never run on the server. So editing a seed and
  deploying leaves live content exactly as it was. Only a write to the production database
  changes content.
- `git push` to `main` builds an image in GitHub Actions (`.github/workflows/image.yml`; changes
  that touch only `Docs/` or `*.md` files are skipped). The build uses CI time, not the server, and changes nothing live.
- A **deploy** is Coolify pulling that image and replacing the running container on a
  1 vCPU / 2 GB server. Sina clicks Deploy, or explicitly asks an agent to call the Coolify API.
- A **restart** reuses the current image. It is lighter than a deploy.

So these are three separate layers:

| Layer                   | Changed by                     | Reaches production                               |
| ----------------------- | ------------------------------ | ------------------------------------------------ |
| Source history          | commit, push                   | never by itself                                  |
| Production application  | deploy (Coolify)               | when the new container starts                    |
| Production content/data | a Payload write to the live DB | at once (see [Caches](#caches-and-revalidation)) |

A live content fix can need no Git change at all, and a pushed commit can stay undeployed.

If a push-to-deploy webhook is ever added (it is on the [Deploy](Deploy.md) to-do list), a push
to `main` becomes a deploy, and the gate below applies before pushing too.

## Why deploys cost more than they look

Each deploy:

- pulls a new image onto a small pay-as-you-go server and replaces the container. The site
  restarts, caches start cold, and memory peaks while the new container boots on 2 GB;
- needs a CI image build first, several minutes per push;
- needs Sina's click or explicit approval, a human step every time;
- **ships everything on `main` at that moment**, including other sessions' commits. A content
  fix delivered by a deploy drags unrelated code live with it;
- slows iteration: build, pull and boot take minutes, while an API write takes seconds;
- adds risk: every container swap is a chance of a failed boot or a regression.

A Payload write touches only the records you meant. It takes effect at once and runs the
collection's hooks, validation and access rules. On collections with drafts it also leaves a
version.

## The decision gate

Run this before anything that could push, build, deploy or restart production. Write the answer
into the plan, the handoff note or the final report.

```text
PRODUCTION UPDATE ANALYSIS

1. What exactly must change in production? (route, record, field, locale)

2. Type:
   A. Payload-managed content/data   B. application code   C. Payload schema
   D. static source asset            E. dependency         F. environment/infrastructure
   G. mixed

3. Can the result be produced with:
   - the Payload MCP endpoint (the authenticated Payload API)?
   - an existing sync script that uses Payload's Local API?
   - existing fields and blocks on an existing record?
   - a Payload Media upload?

4. Would that path keep: every other locale, relationships, publish status per locale,
   access control, versions, metadata, ordering?

5. Yes        → DO NOT DEPLOY. Use Payload.
6. Partly     → split it: the data through Payload, the rest into one deploy.
7. No         → deploy only what the data layer can't represent.
```

### Find where the thing actually lives

Answer with evidence, not a guess. Find the visible text in the live REST reply
(`/api/<collection>?locale=xx&where%5Bslug%5D%5Bequals%5D=<slug>`), or grep `src/`. Some
visitor-facing things look like content but are code, and need a deploy:

- the 15 industries (`src/blocks/IndustryGrid/catalogue.ts`) and the 16 capabilities
  (`src/blocks/CapabilityIcons/keys.ts`);
- case-study card cover tints and focus points (`PROJECT_ART` in `src/components/ProjectArt/art.ts`);
- the default share image `public/sina-oshaghi-OG.webp`, and everything else in `public/`;
- how meta tags, JSON-LD and sitemaps are built (`src/utilities/generateMeta.ts`, the sitemap
  routes).

And the reverse: files under `src/endpoints/seed/` look like code but hold content. A seed only
changes the database it is run against, and it never runs on the server.

## Categories

### A. Payload API first: no deploy

These need no deploy when the current schema already holds them:

- page, project and case-study copy in any of the seven locales; typo fixes; Persian copy
  improvements (write «ه‌ی», never «هٔ»); translations and missing locales;
- headings, descriptions and CTA labels stored in blocks;
- SEO title, description and share image (`meta.*`, per locale);
- project order (`order`), relationships (next project, categories), archive visibility and
  publish status;
- experience (employer) records and their descriptions;
- case-study sections built from the existing blocks;
- header, footer and about globals: navigation, social links, labels;
- media fields such as alt text, and new editorial images uploaded to Media.

Already done this way on live, with no deploy (2026-09-27, through the MCP key): Home and About
`meta.image` cleared in 7 locales, the 3 template posts unpublished, and 9 thin archive projects
unpublished.

Example: "Improve the Persian text on /about."

```text
right:  read the live record that holds the text (the `about` page or the `about` global), locale=fa
        → update only those fa fields through Payload
        → read back all 7 locales → check /fa/about
wrong:  edit a seed → push → deploy
        (the live database never changes, so the page doesn't either)
```

### B. Application code: deploy

React components, layout, CSS, animation, responsive behaviour, routes, server logic, API routes,
accessibility inside components, shared utilities, client interaction, bug fixes, how meta tags,
sitemaps and JSON-LD are built, search, integrations, auth, dependencies, `next.config.ts`,
middleware and build configuration.

Examples: the `og:image` URL fix (75f5f2b, `generateMeta.ts`), RTL metric alignment, a dark-mode
employer-logo hover, the industries marquee loop, a card's cover tint in `art.ts`.

Even here, check whether part of the result is data. A new component that also needs copy is
category G.

### C. Payload schema: deploy once, then data

A new field, block type, localized field, relationship or collection change.

```text
schema + component
→ local checks (generate:types, generate:importmap, tsc, tests, build)
→ ONE deploy
→ fill the production records through Payload
→ verify
```

Example: a `caseStudySize` field on projects. Adding the field needs a deploy. Setting
`large`/`small` on 40 projects is 40 Payload updates in one scripted batch. It is not "edit the
seed, deploy, edit the seed again, deploy again". The `csDownloads` block (D-048) and the figure
`group` field (D-051) had this shape.

- MongoDB needs no migration for a new **optional** field: old documents simply lack it. A new
  **required** field makes the next save of every old document fail until it is filled.
- The MCP endpoint only reaches the collections listed in `mcpPlugin` (`src/plugins/index.ts`).
  Exposing another one, such as `redirects` or `forms`, is itself a code change.

### D. Static assets: depends who owns them

- **Editorial media** (project screenshots, case-study images, a page's share image, logos stored
  in the CMS): upload to Payload Media, which stores them in the Arvan bucket, and update the
  reference. No deploy.
- **Source-owned assets** (`public/`, favicons, fonts, the tool and company logos in `public/`,
  component SVGs such as the signature): deploy.

Don't move a source asset into the CMS just to avoid a deploy. Respect who owns it.

**Shared-bucket hazard:** laptop seeds upload to the same public bucket production reads.
Re-seeding a changed image locally renames the file and deletes the old object, which breaks the
live page until `sync-case-study.ts` runs. Warn Sina before re-seeding changed images (K18 in
[Roadmap risks](Roadmap/RISKS-AND-DECISIONS.md)).

### E. Infrastructure: ops work

Environment variables, Docker, Coolify settings, Traefik and certificates, DNS, the database
engine, storage, networking, server packages. These follow [Deploy](Deploy.md). Payload is not a
substitute. Changed env variables take effect only when the container restarts.

### F. Dependencies: deploy

A package added, removed or upgraded changes the image. Validate locally, then ship it in one
deploy with any other queued code.

### G. Mixed: split it

Put code and schema in one deploy, then make the data changes through Payload.

- **Real example (2026-09-27):** the Taha Gasht study went live through `sync-case-study.ts` with
  no deploy. Only its card tint (`art.ts`) and sitemap entry waited, for the next deploy that was
  happening anyway.
- "Add a localized case-study block and fill it on 10 studies": build the block, deploy once,
  fill the 10 records through Payload. Not 10 pushes.
- "Expand the Faymen case study": first check whether the existing case-study blocks can hold
  every new section. If they can, it is data only: no deploy. If a new visual block is needed,
  build it, deploy once, then fill all the content through Payload. Never redeploy after each
  copy or image change.

## Local is not production

- The seed files (`src/endpoints/seed/**`), the laptop database and the production database are
  three different things. Changing one never changes the others.
- **Never copy the laptop database, a local dump or a local uploads folder over production** to
  move content. The one full restore was the 2026-09-26 launch onto an empty server. Use targeted
  writes.
- **Don't let laptop and live drift apart.** The next laptop → live sync of a record overwrites a
  live-only edit to it: `sync-case-study.ts` replaces the whole project, and the translation and
  positioning syncs rewrite their fields. So after a live edit, do one of these:
  - make the same change in the seed or the laptop database; or
  - record it as a live-only change in [Deploy](Deploy.md).

  Before any laptop → live sync, look for recorded live-only edits on the same records. Some are
  already recorded: Home and About `meta.image`, the unpublished template posts and the hidden
  archive rows.

## Production write paths, in order of preference

1. **The Payload MCP endpoint.** `POST /api/mcp` on the live site, with the key from `.env`
   (`PAYLOAD_API_KEY` held the live key on 2026-09-27; check which variable holds it, and never
   print it). This is the authenticated Payload API. It runs hooks, validation, access rules and
   versions, and needs no SSH tunnel.
   - Tools: find, create, update and delete for pages, posts, projects, experiences, media and
     categories; find and update for the header, footer and about globals.
   - A key can do only what its per-collection switches allow (/admin → MCP → API Keys).
   - Fields go in as top-level arguments. A `data` string is dropped silently and the document is
     re-saved unchanged. Pass `locale` and `draft` explicitly. Find returns at most 100 documents.
   - Details: [Deploy](Deploy.md), "Payload MCP".
2. **An existing sync script that uses Payload's Local API**, over the SSH tunnel described in
   [Deploy](Deploy.md), with `NODE_ENV=production` and the production `PAYLOAD_SECRET`. Examples:
   `seo-sync`, `persian-copy-sync`, `positioning-sync`, `reorder-home-layout`, `home-tools`,
   `translations`. They validate as Payload does, but most skip revalidation
   (`disableRevalidate`), so check the cached surfaces afterwards.
3. **`scripts/seed/sync-case-study.ts`**, only for its documented job: copying one study that was
   re-seeded locally with changed images. It is a raw Mongo copy (the document, its latest
   version and its media) and bypasses Payload's hooks and validation. Dry run first.
4. **/admin by hand (Sina)**, when automation isn't practical or an agent's write is blocked.
5. **A deploy**, only for what the data layer can't represent.

Raw database edits (a mongosh `$set`) are not a Payload path: they skip hooks, validation and
versions. Use one only with Sina's approval naming it and a backup, and patch both the document
and its latest version.

The public REST API (`/api/...`) is for reading and checking, not for writing. Never add a new
write endpoint, an unauthenticated route or a "temporary" hook to get content in.

## Approvals

This policy doesn't change who approves production work ([Roadmap](Roadmap/README.md),
[D-046](Decisions.md)):

- A live-database write (MCP, a tunnel script, a raw sync) needs Sina's approval naming the
  action, unless Sina already approved that kind of write in the current session.
- A deploy or a restart is Sina's call every time. Sina clicks it, or explicitly asks an agent to
  call the Coolify API.
- If the permission check blocks a write, stop. Don't reshape the call to get around it. Give
  Sina the exact change, or the /admin steps.

## Authentication and secrets

Use the credentials already in `.env`, referred to by variable name. Never hard-code, commit,
print or log a key, token, password or connection string. Some API replies carry internal URLs,
so don't echo raw replies. Don't add API keys to user accounts or open unauthenticated endpoints.

## Making a safe write

### Read, compare, write, read back, verify

1. Fetch the record's current live state in every locale you might touch. Note `_status` per
   locale and `updatedAt`.
2. Identify exactly which fields change.
3. On collections with drafts (pages, projects, posts, header, footer), compare the published
   document (`draft: false`) with the latest version (`draft: true`), ignoring ids and timestamps.
   Payload builds every update on the **latest version**, not on the published document. If the
   two differ, your save would publish the difference too. Stop and report it.
4. Send only those fields.
5. Read the record back in all seven locales and diff before against after. Only the intended
   fields may differ.
6. Check the page ([Verify on the real site](#verify-on-the-real-site)).

### Send the smallest patch

Send `meta.description` for `locale: fa`, not the whole page. An array or blocks field can't take
a single row: send the full current array, keep every row's existing `id`, and change only the
target leaf. Never replace an array with a shorter copy from local data.

### Locales

- The seven locales are `en` (default), `fa`, `ar`, `es`, `de`, `fr` and `ja`, with
  `fallback: false`.
- Always write with an explicit `locale`. A write for `fa` must leave the other six untouched;
  the read-back proves it.
- A missing locale renders blank, not English. Never fill another locale with English.
- Live REST list queries need `?locale=xx`. Without it, or with `locale=all`, they return 0
  documents.
- Persian copy follows the [Persian writing guide](About-Me/Persian-Writing-Guide.md) and uses
  «ه‌ی».

### Relationships

Keep existing ids unless changing them is the task. A relationship or `hasMany` field is replaced
whole: send the full current list with your change, never a partial list built from local data.
Look ids up on live; don't assume laptop ids match.

### Publish status

Pages, projects, posts, the header and the footer keep `_status` separately per locale
(`localizeStatus`). Pass `draft` deliberately, and check `_status` in every locale afterwards.
Never publish a draft or unpublish a page by accident. Leave `_status` and `caseStudyStatus` as
they were unless changing them is the task.

### Batches

Many records mean one deterministic script or request sequence with a report at the end. Not
many manual edits, and never many deploys.

- **Idempotent:** a second run changes nothing. Look a record up by slug before creating it.
  Update rather than duplicate. Don't append blocks that are already there.
- **Dry run** for broad changes: print what would change (record, locale, field, old → new) and
  write nothing. Apply only once the plan reads right. A one-field edit doesn't need one.
- Other sessions write too. Re-check the source's `updatedAt` right before `--apply`.

### Backups: match them to the risk

- One field on one record: the before-read is the backup. Keep it in the session scratchpad.
- Many records, or a whole study: take a `mongodump` over the tunnel first ([Deploy](Deploy.md))
  and keep it on the laptop (`.backup/` is gitignored).
- Collections with drafts keep versions, but a raw sync doesn't create them. Don't count on
  versions after one.

## Verify on the real site

A 200 is not proof. Streaming routes return 200 even for a missing page, so check the body.

1. Read the record back (above).
2. Load the affected page in the locale you changed, and in one locale you didn't.
3. Check related content is intact: cards, next project, and images returning 200.
4. Check nothing went blank or fell back to another language.
5. Check RTL, light and dark only when the change could affect them.

## Caches and revalidation

| Surface                               | After a Payload save (MCP, /admin)                                                                                   | After a tunnel script or a raw sync                                               |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Pages, `/work`, `/work/<slug>`        | Fresh at once (rendered per request)                                                                                 | Fresh at once                                                                     |
| Header, footer, about globals         | Refreshed by their hooks                                                                                             | Can stay stale                                                                    |
| Redirects                             | Refreshed by the hook                                                                                                | Stale (`disableRevalidate`)                                                       |
| Sitemaps (3 routes, `unstable_cache`) | Tags refreshed by hooks, for a published project. The posts sitemap was still stale 5 minutes after an MCP unpublish | Stale until a restart, or a Payload save on a published record in that collection |

Use the smallest fix that works:

1. Look at the surface itself (fetch the sitemap, open the page) before assuming it is stale.
2. A normal Payload save on a published record in that collection refreshes its tags.
3. A container restart, not a deploy, with Sina's approval.

Never deploy just to clear a cache. There is no authenticated revalidate endpoint yet. If stale
caches keep forcing restarts, report that as an architecture gap rather than working around it
with deploys.

## When a deploy really is needed

### Pre-deploy checklist

```text
[ ] I checked whether Payload can produce the required production state.
[ ] I separated content/data changes from code changes.
[ ] I am not deploying only to change existing Payload-managed content, or to clear a cache.
[ ] What remains needs code, schema, a source asset, a dependency or infrastructure.
[ ] Deploy-requiring changes are grouped, so this is one deploy, not several.
[ ] Local checks passed on this exact tree.
[ ] Sina approved this deploy.
```

If the first box can't be ticked, **don't deploy yet**.

### Group deploys

Validate A, B and C, then ship them in one deploy rather than three. Don't hold back a critical
fix (a broken page, a security problem, data at risk) to wait for unrelated work. Use judgment
and say why.

### A deploy is not a test

Validate locally first. Never push broken attempts to see what happens.

```bash
pnpm exec tsc --noEmit
pnpm exec eslint <changed files>
pnpm test:int                # or the relevant vitest files
pnpm build                   # when routing, config or build-sensitive code changed
```

After a schema or component-registration change, also run `pnpm generate:types` and
`pnpm generate:importmap` and read their diffs. The full matrix is in
[Roadmap/VERIFICATION](Roadmap/VERIFICATION.md).

### Build once

This is already how it works: CI builds one image, and the server only pulls it (D-046). Never
build on the server, and don't change the pipeline as part of a content task.

## Roles

This applies to every agent. No agent may reason "local code or content changed, so deploy".

**Planning (Agent 2, or anyone writing a plan, task spec or execution packet).** Mark each change
surface as Payload-only, deploy-required or mixed, and add:

```text
## Production propagation

Payload API candidates:
- <collection / record · fields · locales>

Deploy-required:
- <files · why they need a deploy>

Mixed:
- <deploy part> / <data part>

Recommended production path:
<Payload only | one deploy then Payload | deploy only> · approvals needed from Sina
```

**Implementing (Agent 3).** Production is its own step after the local work. Classify again from
what actually changed, not from the plan:

```text
LOCAL IMPLEMENTATION COMPLETE
↓
CLASSIFY THE PRODUCTION DELTA
↓
PAYLOAD API / DEPLOY / MIXED
↓
APPLY THE MINIMUM PRODUCTION CHANGE (with Sina's approval)
↓
VERIFY
```

Don't push or deploy automatically when the local work is done.

**Deploying or releasing.** Run the decision gate and the pre-deploy checklist before every
deploy, and group what is queued.

The existing handoff notes carry this too: the "Live status" line of the session template in
[Roadmap/AGENT-HANDOFF](Roadmap/AGENT-HANDOFF.md), and the R16 release note in
[Roadmap/VERIFICATION](Roadmap/VERIFICATION.md).

## The report

Every agent whose work reaches production, or would need to, ends its report with:

```text
## Production Update Decision

Change type: CONTENT / CODE / SCHEMA / ASSET / INFRA / MIXED
Payload API applicable: YES / PARTIAL / NO
Production action: ...
Deployment required: YES / NO
Reason: ...
```

Examples:

```text
Change type: CONTENT
Payload API applicable: YES
Production action: Updated the fa fields of the about page through the MCP endpoint.
Deployment required: NO
Reason: The text lives in a localized Payload field; the page renders per request.
```

```text
Change type: MIXED
Payload API applicable: PARTIAL
Production action:
- deployed the new CaseStudyGallery block once
- filled the project galleries through Payload
Deployment required: YES, once, for the block's schema and component
Reason: A new block type is schema; its content is data.
```

If nothing reached production yet, say what would be needed and that it is waiting for Sina.

## Quick reference

| Task                                       | Where it lives                             | Path                             |
| ------------------------------------------ | ------------------------------------------ | -------------------------------- |
| Improve Persian copy on a page or study    | localized page or project fields           | Payload                          |
| Fix an employer description                | `experiences` record                       | Payload                          |
| Reorder Work                               | projects `order`                           | Payload                          |
| Hide an archive row                        | projects `_status`, per locale             | Payload                          |
| Add case-study copy with existing blocks   | the project's layout                       | Payload                          |
| Change a tool or social URL                | the record or global that holds it (check) | Payload if CMS-held, else deploy |
| Change an SEO description                  | `meta.description`                         | Payload                          |
| Change one page's share image              | `meta.image` → Media                       | Payload                          |
| Fix RTL metric alignment                   | CSS or component                           | deploy                           |
| Dark-mode employer-logo hover              | styling                                    | deploy                           |
| Industries marquee loop                    | component and animation                    | deploy                           |
| A card's cover tint                        | `src/components/ProjectArt/art.ts`         | deploy                           |
| The default share image file               | `public/`                                  | deploy                           |
| New project field, filled on every project | schema + data                              | one deploy, then Payload         |
| New block, filled on 10 studies            | schema + data                              | one deploy, then Payload         |
| Env variable or mail-service credentials   | infrastructure                             | Coolify settings + restart       |

## Don't

- Deploy a content-only change, or deploy only to refresh a cache.
- Copy a local database, dump or uploads folder over production.
- Re-seed changed images locally without warning Sina (the shared bucket renames and deletes
  files).
- Seed on the server.
- Create insecure or temporary production write endpoints, or bypass access control.
- Print, log or commit credentials.
- Change unrelated records, or locales you weren't asked to touch.
- Redeploy for each small change that could ship together.
- Assume every source change must go live now, or that every production change needs Git.
- Use API-first as an excuse to store code, config or layout logic as CMS data, or move source
  assets into the CMS just to skip a deploy.

## Safety comes first

```text
CORRECTNESS → DATA SAFETY → PRODUCTION STABILITY → MINIMUM DEPLOYMENT → SPEED
```

API-first is an optimization, not permission to bypass the architecture. If the Payload path
would be less reliable, less maintainable or architecturally wrong, deploy instead and say why.

## Default flow

```text
make the change
↓
analyse the production delta
↓
can Payload apply it safely?

YES     → Payload → verify → done
PARTIAL → deploy the code/schema part once → Payload for the rest → verify
NO      → one controlled deploy → verify
```

# CLAUDE.md — Sentinel docs

## Engineering Standards (read before writing any code)

These standards are binding. They exist so that AI-assisted changes are correct, minimal, and never break a running system.

### Non-negotiable: no breakage
- **No system breakage is ever acceptable.** Every change must leave the service buildable and its tests green. Before considering any task done, run the repo's checks (`tsc --noEmit` typecheck, lint, and the relevant tests) and confirm they pass.
- Prefer the smallest change that fully solves the problem. Do not refactor unrelated code, rename things, or "improve" style in files you were not asked to touch.
- When a change alters existing behavior that tests assert, update those tests to the new intended contract in the same change — never leave the suite red.
- If you are unsure, confused, or lack the context to make a safe change, STOP and ask the user rather than guessing. A blocked question is cheaper than a broken system. When you stop, record what is blocked and why in the relevant `*-todo.md` board.

### Code quality
- Write reusable, DRY code: factor shared logic into functions/modules; do not copy-paste. Reuse existing helpers before adding new ones.
- Match the surrounding code's style, naming, and idioms. New code should read like the code already there.
- Keep functions focused and small; validate inputs at boundaries; fail closed on security-relevant paths.

### Comments and documentation
- **Prefer JSDoc/TSDoc over inline comments.** Every public function/class/module gets a JSDoc/TSDoc block explaining what it does, its contract, and non-obvious behavior. Rationale for *why* code is written a certain way belongs in the JSDoc/TSDoc.
- **Inline comments are only permitted as genuine "come back later" markers** — e.g. a temporary workaround, a dependency to be removed once an upstream fix lands, or a known follow-up. Such a comment must state the condition for its own removal.
- **Once the reason is resolved, remove the comment.** Do not leave explanatory or narrating inline comments ("increment counter", "call the API") — the code and JSDoc/TSDoc must speak for themselves.

### Commits
- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`). Scope where useful, e.g. `fix(security): ...`.
- Never include AI/assistant attribution or co-author trailers in commit messages.
- Commit logically-scoped units of work; do not push unless explicitly asked.

This is a **standalone Next.js documentation site** — markdown content (`.md`/`.mdx` + YAML
frontmatter) rendered by a thin in-repo renderer (`app/`, `components/`, `lib/`). Navigation lives
in `nav.json`. It deploys as its **own Vercel project** to **https://docs.fortiqo.xyz**. **Mintlify
has been removed** — do not reintroduce `docs.json` or any third-party docs build tool.

Layout: `app/[[...slug]]/page.tsx` (renders any nav page) · `app/layout.tsx` (shell) ·
`lib/docs.ts` (loads markdown + nav) · `components/{mdx-components,DocsSidebar,DocsToc}.tsx`.
Content authoring is unchanged — write markdown, list it in `nav.json`.

## Local preview

```bash
bun install
bun run dev      # http://localhost:3000
```

## Adding a page

1. Create a `.md` (or `.mdx` if you need callout components) file in the appropriate `docs/` subdirectory.
2. Add the path (without extension) to the correct group in `nav.json`:

```json
{
  "group": "Trust & Verification",
  "pages": [
    "docs/trust/verification-process",
    "docs/trust/trust-scores",
    "docs/trust/badges",
    "docs/trust/your-new-page"
  ]
}
```

3. The frontend picks it up on its next build/dev run — no restart of a docs server needed.

## MDX frontmatter

Every page must start with:

```mdx
---
title: "Page title"
description: "One sentence describing the page — appears in search results and social previews."
---
```

Optional frontmatter fields:

```mdx
---
title: "Page title"
description: "..."
icon: "shield-check"        # Fontawesome icon for the sidebar
---
```

## Writing standards

- **Headings:** Sentence case. `## Key concepts`, not `## Key Concepts`.
- **Voice:** Active voice. Second person ("you"). Never "the user" or "one".
- **Callouts:** Use `<Note>`, `<Warning>`, `<Tip>`, `<Info>` for important asides. Don't overuse them.
- **Code blocks:** Every technical page must have at least one code example. Specify the language for syntax highlighting.
- **Inline code:** Use backtick formatting for file names, command names, field names, values, and code references.
- **Bold:** Use for UI elements only (`Click **Settings**`). Not for emphasis.
- **Links:** Use relative paths for internal links (`[concepts](/docs/getting-started/concepts)`), not absolute URLs.

## Mintlify components

### Cards

```mdx
<Card title="Quickstart" icon="rocket" href="/quickstart">
  Get up and running in five minutes.
</Card>

<CardGroup cols={2}>
  <Card title="..." icon="..." href="...">...</Card>
  <Card title="..." icon="..." href="...">...</Card>
</CardGroup>
```

### Steps

```mdx
<Steps>
  <Step title="Install">
    Step content with code examples.
    ```bash
    npm install ...
    ```
  </Step>
  <Step title="Configure">...</Step>
</Steps>
```

### Callouts

```mdx
<Note>For important information that is not a warning.</Note>
<Warning>For things that can cause data loss or billing charges.</Warning>
<Tip>For shortcuts and best practices.</Tip>
<Info>For supplementary context.</Info>
```

### Tabs

```mdx
<Tabs>
  <Tab title="Python">
    ```python
    ...
    ```
  </Tab>
  <Tab title="TypeScript">
    ```typescript
    ...
    ```
  </Tab>
</Tabs>
```

### Code groups

```mdx
<CodeGroup>
  ```bash npm
  npm install @sentinel-network/sdk
  ```

  ```bash pnpm
  pnpm add @sentinel-network/sdk
  ```
</CodeGroup>
```

## nav.json structure

Navigation is defined under `groups` as an array of groups. Each group has a `group` label and a
`pages` array of paths (relative to the repo root, without the file extension). `index` maps to the
`/docs` root; every other path maps to `/docs/<path-without-leading-"docs/">`.

```json
{
  "name": "Sentinel",
  "basePath": "/docs",
  "groups": [
    {
      "group": "Getting Started",
      "pages": ["index", "quickstart", "docs/getting-started/installation"]
    }
  ],
  "openapi": "https://sentinel-api.fortiqo.xyz/openapi.json"
}
```

The Mintlify callout components (`<Note>`, `<Warning>`, `<Tip>`, `<Card>`, `<CardGroup>`, `<Steps>`,
`<Step>`) are still supported — the frontend renderer maps them to brand-styled React components. Use
`.mdx` for pages that need them; plain `.md` otherwise.

## Content boundaries

Do document:
- Public API surfaces, SDK methods, CLI commands
- Verification methodology at a conceptual level (stages, weights, finding categories)
- Trust rubric in full — it is publicly committed
- Pricing, settlement, and payout mechanics
- Compliance posture (GDPR, DPDP, SOC 2 status)

Do not document:
- Specific red-team prompts or bypass payloads
- Internal service architecture or admin tooling
- Unreleased features (use `<Note>Coming soon</Note>` with a milestone if needed)

## Terminology

| Use | Not |
|---|---|
| agent | bot, model, worker |
| buyer | user, customer, client |
| developer | publisher, seller |
| trust score | rating, rank |
| credits | tokens (tokens are LLM tokens; credits are the billing unit) |
| invocation | call, request (use "invocation" for the full lifecycle concept; "request" for HTTP) |
| manifest | config file, definition |
| badge | certificate, certification (badge is the visual; certification is the process) |

## Conventions

### Commits
- Use **Conventional Commits**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `perf:`, `build:`, `ci:` — optional scope, e.g. `fix(auth): reject expired tokens`.
- The message describes the change only. **Never** reference AI assistants, agents, or tooling, and never add `Co-Authored-By` or other attribution trailers.

### Code style
- **No inline comments.** Make intent obvious through precise names and small, single-purpose functions.
- Document with **docstrings** (Python) / **JSDoc** (TypeScript) on modules, classes, and public/exported functions only — explain *why*, not *what*.
- If a line feels like it needs a comment, rename or refactor until it doesn't.

### Docs stay in sync (mandatory)
- Every change updates its docs **in the same commit**: this `CLAUDE.md`/`AGENT.md`, the relevant README/`docs/`, and the **central TODO board** at `sentinal-core-api/master-doc/` (this module's `*-todo.md` plus `platform-todo.md`). Tick completed items (`[ ]`→`[x]`) — **never delete a line**; add TODOs for follow-ups discovered. Never leave docs describing behaviour the code no longer has.
- **Each module follows its own implementation doc.** As planning moves, update that module's `docs/implementation.md` / `docs/architecture.md` / roadmap and the central TODO in the **same commit**, so plans and docs stay in lockstep with the code — every module owns and follows its own implementation.

### The system speaks in credits — never currency
- All user- and API-facing values are **points**. Never display or return paise, rupees, dollars, or a currency symbol anywhere in the system.
- Conversion: **1 USD = 100 credits** (current). 1 USD = 100 credits (fixed peg). The ledger may store the smallest unit internally, but every response, label, and copy string uses points only.

---

## Cross-repo reference — where to look (all repos are linked)

This repo is one of the Sentinel platform's repositories. The **single source of truth** for cross-repo
planning lives in `sentinel-core-api/master-doc/`. Any assistant working in *any* repo should start there:

- **`build-sequence.md` — START HERE.** The canonical, dependency-ordered build plan (phases 0–9): what to
  build first so the next thing is unblocked. Decide *order* here before picking work.
- **`platform-todo.md`** — the master backlog across all repos, grouped by theme (completed, pending-from-specs,
  security, must-have, discovery, reach). Tick items here when done.
- **`<module>-todo.md`** — this repo's own board (detail + status), mirrored from the master board.
- **`architecture-map.md`** — who calls whom (cross-repo edges, money/trust data-flow, trust boundaries).
- **`security-todo.md`** — severity-ranked security flags (file:line + fixes).

Each repo also owns its `docs/` (scope, implementation, architecture). **When changing anything — code or
markdown — update the matching `docs/` and the relevant `master-doc/*-todo.md` in the SAME commit** (never
delete a TODO line; tick `[ ]`→`[x]`). To find what to change: read `build-sequence.md` top-to-bottom, pick the
lowest unfinished phase whose gates aren't all ticked, then follow `architecture-map.md` to the owning repo
and file.

---

## structure.md — read first, keep current (non-negotiable)

Before changing **any** code in this (or any) repo, **read `docs/structure.md` first.** It is the
platform-wide map of what already exists — every repo's purpose, live APIs/features, real-vs-stubbed
status, and a **file-based map of where things live** — so you change the right file and don't rebuild
something that already exists.

- **Start there to locate work:** `structure.md` §4–6 (API surface), §9 (real vs stubbed), §12 (file map).
- **When you add or edit** an API, feature, page, service, or move a file: **update `structure.md` in the
  same commit** for the parts you touched. `structure.md` is **identical in all 13 repos** — propagate the
  edit to every repo's copy so they never diverge.
- This complements (does not replace) `sentinel-core-api/master-doc/` (`build-sequence.md` = what to build
  next; `*-todo.md` = the board). `structure.md` = what exists now + where it lives.

---

## TODO board — update after every task (master-doc only)

All TODOs live **only** in `sentinel-core-api/master-doc/`. There is already **one file per repo**
(`core-api-todo.md`, `frontend-todo.md`, `gateway-todo.md`, `billing-todo.md`, `verify-todo.md`, …)
plus `platform-todo.md` and `security-todo.md`. **Never create a new TODO/status file anywhere** (no
per-repo `docs/TODO.md`, no `status-report.md`) — use the existing file for the matching repo.

After **every** task, in the same commit, update the relevant board to mirror reality:
- **What we did** → tick `[ ]`→`[x]` (or `[~]` for partial).
- **What's pending** → add/keep `[ ]` items.
- **What's listed/deferred** → keep the roadmap items.

**Never delete a line** — tick or append only. Frontend work → `frontend-todo.md`; security → `security-todo.md`; cross-repo → `platform-todo.md`.

---

## DB schema change → migration BEFORE push (non-negotiable)

If a change touches the database schema — any new/changed/removed table, column,
index, or constraint, or any new ORM model/field — you MUST ship a matching
**Alembic migration in the same commit, and it must be applied before/at deploy.
Never push a model change without its migration.** Deployed code that runs ahead
of the DB schema 500s every query that hits the changed table (this has bitten us).

- Write an **idempotent** migration (`ADD COLUMN IF NOT EXISTS`, `CREATE TABLE IF
  NOT EXISTS`, …) chained to the current head (`down_revision`).
- Update the ORM model, `docs/structure.md`, and the `master-doc/*-todo.md` in the
  same commit.
- Verify it applies cleanly: `make migrate` / `alembic upgrade head` (or `alembic
  current` to check the revision).
- Backend services run `alembic upgrade head` on container start and the deploy
  runs an API smoke test — that is a safety net, **not** a substitute for shipping
  the migration.
- No-database repos (frontend, docs, infra, contracts, sdk, shared,
  agent-templates): still applies to any cross-repo schema/contract change — land
  the owning service's migration first.

---

## Docs framework — standalone markdown site at docs.fortiqo.xyz (2026-06-15)

Platform documentation is **markdown-first** and lives in **sentinel-docs**, which is a
self-contained Next.js app that renders its own markdown. It is published as a **standalone
site at https://docs.fortiqo.xyz** (its own Vercel project + Cloudflare DNS) — NOT inside
sentinel-frontend.

- **Mintlify is removed.** Do NOT reintroduce `docs.json`/Mintlify. sentinel-docs ships
  markdown (`.md`/`.mdx`) + a `nav.json` manifest, rendered by its own `app/` renderer.
- **Adding/editing a doc page:** add the `.md`/`.mdx` under sentinel-docs and list its slug in
  `nav.json`; the site renders it automatically on the next build.
- `sentinel.fortiqo.xyz/docs` redirects to `docs.fortiqo.xyz`.
- Track docs work in `master-doc/docs-todo.md` (tick/append only — never delete a line).
- **Keep docs honest & current (mandatory):** when you ship or push a feature, update the matching pages in **sentinel-docs** in the same change. Docs must reflect the **real** current state — never claim unbuilt or stubbed features as live (no bluff, no faking). Anything not yet built goes under **Progress & roadmap** as in-scope/planned. Periodically reconcile docs against `docs/structure.md` §9 (real-vs-stubbed) and keep the roadmap's Live / Rolling out / Planned sections accurate.

---

## Recommend before implementing (always)

Do **not** assume a requested change is the correct or best approach, and do not treat the
user's framing as ground truth. For every change request:

1. Evaluate the underlying goal and the request critically.
2. Find the most relevant, robust, well-architected way to achieve that goal — including a
   better alternative or a simpler/safer path if one exists.
3. **State your recommendation** concisely (what you'd do and why, and where it differs from the
   literal ask), then implement the best option. If it's a one-way door or materially changes
   scope, confirm first; otherwise proceed with the recommended approach and note the deviation.

Never blindly implement. Prefer the better-engineered solution over a literal transcription of
the request.

> **And: whatever changes — always update the TODO board** in `sentinel-core-api/master-doc/`
> in the same change. Treat it as a **dated timeline of activity**: append a dated entry for what
> was done, tick completed items, add any new task discovered, and mark in-progress work. Never
> delete a line. No change ships without its TODO update — the board must always reflect reality
> and the history of what happened.

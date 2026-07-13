# Sentinel docs — agent & contributor guide

> Canonical instruction set for anyone (human or AI) working in `sentinel-docs`.
> `CLAUDE.md` and `AGENT.md` are **byte-identical** — edit both together, never just one.

## What this repo is

`sentinel-docs` is the public documentation site for the **Sentinel** platform — the trust,
verification, and settlement layer for AI agent commerce.

- **Standalone Next.js 16 app** (App Router, React 19, TypeScript 5, Tailwind 3.4). Markdown/MDX
  content in this repo is rendered by a thin in-repo renderer — there is **no backend** and no calls
  to platform services.
- **Content:** `.md`/`.mdx` + YAML frontmatter, loaded via `gray-matter` + `next-mdx-remote` with
  `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-highlight`, `github-slugger`.
- **Navigation** lives in `nav.json` (an array of `groups`; each group has a `group` label and a
  `pages` list of slugs). **Not** `docs.json`.
- **Mintlify has been removed.** Do **not** reintroduce `docs.json`, `mintlify dev`, or any
  third-party docs build tool.
- **Deploys as its own Vercel project** to **https://docs.fortiqo.xyz** (Cloudflare DNS). The main
  app redirects `sentinel.fortiqo.xyz/docs` here. There is **no GitHub Actions workflow** in this
  repo — Vercel handles CI/CD (see "Deployment & CI" below).
- **Package manager: bun** (`bun.lock` is committed).
- No runtime secrets are needed to build or run. `.env.example` still references a stale
  `MINTLIFY_API_KEY` — it is unused (Mintlify is gone) and slated for removal.

Renderer layout: `app/[[...slug]]/page.tsx` (catch-all page renderer) · `app/layout.tsx` (shell) ·
`app/{robots.ts,sitemap.ts,opengraph-image.tsx}` (SEO) · `lib/docs.ts` (loads markdown + nav) ·
`components/{mdx-components,DocsSidebar,DocsToc}.tsx`. Content authoring is just: write markdown,
list it in `nav.json`.

Content lives under `docs/` (`getting-started`, `marketplace`, `developers`, `api-reference`,
`trust`, `sdk`, `mcp`, `compliance`) plus top-level `index.mdx` and `quickstart.mdx`. Internal
reference docs (`structure.md`, `scope.md`, `implementation.md`) also live under `docs/`.

## Engineering standards (read before writing any code)

These standards are binding. They exist so AI-assisted changes are correct, minimal, and never break
a running system.

### Non-negotiable: no breakage
- **No system breakage is ever acceptable.** Every change must leave the site buildable. Before
  considering any task done, run the repo's checks and confirm they pass — here that is
  `bun run build` (Next build, includes the type-check) and `bun run lint`. Add and run tests where a
  repo has them.
- Prefer the smallest change that fully solves the problem. Do not refactor unrelated code, rename
  things, or "improve" style in files you were not asked to touch.
- When a change alters existing behavior that tests assert, update those tests to the new intended
  contract in the same change — never leave the suite red.
- If you are unsure, confused, or lack the context to make a safe change, **STOP and ask** rather than
  guessing. A blocked question is cheaper than a broken system. When you stop, record what is blocked
  and why in the relevant `*-todo.md` board.

### Code quality
- Write reusable, DRY code: factor shared logic into functions/modules; do not copy-paste. Reuse
  existing helpers before adding new ones.
- Match the surrounding code's style, naming, and idioms. New code should read like the code already
  there.
- Keep functions focused and small; validate inputs at boundaries; fail closed on security-relevant
  paths.

### Comments and documentation
- **Prefer JSDoc/TSDoc (TypeScript) / docstrings (Python) over inline comments.** Every public
  function/class/module gets a doc block explaining what it does, its contract, and non-obvious
  behavior. Rationale for *why* code is written a certain way belongs there — explain *why*, not *what*.
- **The only permitted inline comment is a genuine "come back later" marker** — a temporary
  workaround, a dependency to remove once an upstream fix lands, or a known follow-up — and it must
  state the condition for its own removal.
- **Do not leave narrating inline comments** ("increment counter", "call the API"). If a line feels
  like it needs one, rename or refactor until it doesn't. Once the reason for a marker is resolved,
  remove it.

### Commits
- Use **Conventional Commits**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `perf:`,
  `build:`, `ci:` — optional scope, e.g. `fix(auth): reject expired tokens`.
- The message describes the change only. **Never** reference AI assistants, agents, or tooling, and
  never add `Co-Authored-By` or other attribution trailers.
- Commit logically-scoped units of work; do not push unless explicitly asked.

## Local development

```bash
bun install
bun run dev      # http://localhost:3000
bun run build
bun run start
bun run lint
```

## Adding or editing a page

1. Check whether the page already exists in the correct `docs/` subdirectory.
2. Create a `.md` (or `.mdx` if you need callout/layout components) file under the right `docs/`
   subdirectory.
3. Add its path (without extension) to the matching group's `pages` array in `nav.json` — a file not
   listed in `nav.json` is orphaned (reachable by direct URL, but not in the sidebar).
4. Every page must start with the required frontmatter (below).
5. Verify code examples are runnable against the current SDK/API version.
6. Run `bun run dev` and confirm the page renders without errors. The site picks up new pages on the
   next build/dev run — no docs server to restart.

## Frontmatter

Every page must start with:

```mdx
---
title: "Page title"
description: "One sentence describing the page — appears in search results and social previews."
---
```

Optional fields:

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
- **Code blocks:** Every technical page must have at least one code example. Specify the language for
  syntax highlighting.
- **Inline code:** Use backtick formatting for file names, command names, field names, values, and
  code references.
- **Bold:** Use for UI elements only (`Click **Settings**`). Not for emphasis.
- **Links:** Use relative paths for internal links (`[concepts](/docs/getting-started/concepts)`), not
  absolute URLs.

## Callout & layout components (MDX)

The in-repo renderer maps these components to brand-styled React components. Use `.mdx` for pages that
need them; plain `.md` otherwise.

### Callouts

```mdx
<Note>For important information that is not a warning.</Note>
<Warning>For things that can cause data loss or billing charges.</Warning>
<Tip>For shortcuts and best practices.</Tip>
<Info>For supplementary context.</Info>
```

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
    bun add @sentinel-network/sdk
    ```
  </Step>
  <Step title="Configure">...</Step>
</Steps>
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

  ```bash bun
  bun add @sentinel-network/sdk
  ```
</CodeGroup>
```

## nav.json

Navigation is defined under `groups` as an array. Each group has a `group` label and a `pages` array
of slugs (relative to the repo root, without the file extension). `index` maps to the site root; every
other slug maps to its path. The `openapi` field points the API reference at the live OpenAPI schema.

```json
{
  "name": "Sentinel",
  "basePath": "/",
  "groups": [
    {
      "group": "Getting Started",
      "pages": ["index", "quickstart", "docs/getting-started/installation"]
    }
  ],
  "openapi": "https://sentinel-api.fortiqo.xyz/openapi.json"
}
```

## Content boundaries

**Do document:**
- Public API surfaces (gateway endpoints, webhook shapes)
- SDK methods and CLI commands, with typed signatures
- Verification methodology / pipeline stages at a conceptual level (stages, weights, finding
  categories)
- Trust rubric in full — it is a public commitment
- Pricing, settlement, and payout mechanics
- Compliance posture (GDPR, DPDP, SOC 2 status, data residency)

**Do not document:**
- Specific red-team prompts or injection/bypass payloads
- Internal service architecture or admin tooling
- Unreleased features (use `<Note>Coming soon</Note>` with a milestone reference)
- Private developer bond amounts or individual trust reports

## Terminology (enforced across all docs)

| Use | Not |
|---|---|
| agent | bot, model, worker |
| buyer | user, customer, client |
| developer | publisher, seller, creator |
| trust score | rating, rank, reputation score |
| credits | tokens (tokens are LLM tokens; credits are the billing unit) |
| invocation | call, request (use "invocation" for the full lifecycle; "request" for HTTP) |
| manifest | config file, definition, definition file |
| badge | certificate, certification (badge is the visual; certification is the process) |

---

## Cross-repo reference — where to look (all repos are linked)

This repo is one of the Sentinel platform's repositories. The **single source of truth** for
cross-repo planning lives in `sentinel-core-api/master-doc/`. Any assistant working in *any* repo
should start there:

- **`build-sequence.md` — START HERE.** The canonical, dependency-ordered build plan (phases 0–9):
  what to build first so the next thing is unblocked. Decide *order* here before picking work.
- **`platform-todo.md`** — the master backlog across all repos, grouped by theme (completed,
  pending-from-specs, security, must-have, discovery, reach). Tick items here when done.
- **`<module>-todo.md`** — this repo's own board (detail + status), mirrored from the master board.
  For docs work that is `docs-todo.md`.
- **`architecture-map.md`** — who calls whom (cross-repo edges, money/trust data-flow, trust
  boundaries).
- **`security-todo.md`** — severity-ranked security flags (file:line + fixes).

Each repo also owns its `docs/` (scope, implementation, architecture). **When changing anything — code
or markdown — update the matching `docs/` and the relevant `master-doc/*-todo.md` in the SAME commit**
(never delete a TODO line; tick `[ ]`→`[x]`). To find what to change: read `build-sequence.md`
top-to-bottom, pick the lowest unfinished phase whose gates aren't all ticked, then follow
`architecture-map.md` to the owning repo and file.

---

## structure.md — read first, keep current (non-negotiable)

Before changing **any** code in this (or any) repo, **read `docs/structure.md` first.** It is the
platform-wide map of what already exists — every repo's purpose, live APIs/features, real-vs-stubbed
status, and a **file-based map of where things live** — so you change the right file and don't rebuild
something that already exists.

- **Start there to locate work:** `structure.md` §4–6 (API surface), §9 (real vs stubbed), §12 (file
  map).
- **When you add or edit** an API, feature, page, service, or move a file: **update `structure.md` in
  the same commit** for the parts you touched. `structure.md` is **identical in all 13 repos** —
  propagate the edit to every repo's copy so they never diverge.
- This complements (does not replace) `sentinel-core-api/master-doc/` (`build-sequence.md` = what to
  build next; `*-todo.md` = the board). `structure.md` = what exists now + where it lives.

---

## TODO board — update after every task (master-doc only)

All TODOs live **only** in `sentinel-core-api/master-doc/`. There is already **one file per repo**
(`core-api-todo.md`, `frontend-todo.md`, `gateway-todo.md`, `billing-todo.md`, `verify-todo.md`,
`docs-todo.md`, …) plus `platform-todo.md` and `security-todo.md`. **Never create a new TODO/status
file anywhere** (no per-repo `docs/TODO.md`, no `status-report.md`) — use the existing file for the
matching repo.

After **every** task, in the same commit, update the relevant board to mirror reality:
- **What we did** → tick `[ ]`→`[x]` (or `[~]` for partial).
- **What's pending** → add/keep `[ ]` items.
- **What's listed/deferred** → keep the roadmap items.

**Never delete a line** — tick or append only. Docs work → `docs-todo.md`; security →
`security-todo.md`; cross-repo → `platform-todo.md`.

---

## DB schema change → migration BEFORE push (non-negotiable)

If a change touches the database schema — any new/changed/removed table, column, index, or constraint,
or any new ORM model/field — you MUST ship a matching **Alembic migration in the same commit, and it
must be applied before/at deploy. Never push a model change without its migration.** Deployed code that
runs ahead of the DB schema 500s every query that hits the changed table (this has bitten us).

- Write an **idempotent** migration (`ADD COLUMN IF NOT EXISTS`, `CREATE TABLE IF NOT EXISTS`, …)
  chained to the current head (`down_revision`).
- Update the ORM model, `docs/structure.md`, and the `master-doc/*-todo.md` in the same commit.
- Verify it applies cleanly: `make migrate` / `alembic upgrade head` (or `alembic current` to check
  the revision).
- Backend services run `alembic upgrade head` on container start and the deploy runs an API smoke test
  — that is a safety net, **not** a substitute for shipping the migration.
- **No-database repos (this one, plus frontend, infra, contracts, sdk, shared, agent-templates):**
  still applies to any cross-repo schema/contract change — land the owning service's migration first.

---

## Docs framework — standalone markdown site at docs.fortiqo.xyz

Platform documentation is **markdown-first** and lives in **sentinel-docs**, a self-contained Next.js
app that renders its own markdown. It is published as a **standalone site at
https://docs.fortiqo.xyz** (its own Vercel project + Cloudflare DNS) — NOT inside sentinel-frontend.

- **Mintlify is removed.** Do NOT reintroduce `docs.json`/Mintlify. sentinel-docs ships markdown
  (`.md`/`.mdx`) + a `nav.json` manifest, rendered by its own `app/` renderer.
- **Adding/editing a doc page:** add the `.md`/`.mdx` under sentinel-docs and list its slug in
  `nav.json`; the site renders it automatically on the next build.
- `sentinel.fortiqo.xyz/docs` redirects to `docs.fortiqo.xyz`.
- Track docs work in `master-doc/docs-todo.md` (tick/append only — never delete a line).
- **Keep docs honest & current (mandatory):** when you ship or push a feature, update the matching
  pages in **sentinel-docs** in the same change. Docs must reflect the **real** current state — never
  claim unbuilt or stubbed features as live (no bluff, no faking). Anything not yet built goes under
  **Progress & roadmap** as in-scope/planned. Periodically reconcile docs against `docs/structure.md`
  §9 (real-vs-stubbed) and keep the roadmap's Live / Rolling out / Planned sections accurate.

---

## The system speaks in credits — never currency

- All user- and API-facing values are **credits**. Never display or return paise, rupees, dollars, or
  a raw currency symbol as the unit of account; the marketplace may show a USD *equivalent* alongside a
  credit price to help buyers compare, but credits are the unit.
- Conversion: **1 USD = 100 credits** (fixed peg). The ledger may store the smallest unit internally,
  but every response, label, and copy string uses credits.
- Current pricing content (keep docs in sync with these): a **flat 3% platform fee** on each
  successfully-delivered call (the developer keeps **97%**; no tiered take rates), and a **one-time
  $10 seller registration fee** (1,000 credits) that replaces per-agent listing charges.

---

## Recommend before implementing (always)

Do **not** assume a requested change is the correct or best approach, and do not treat the requester's
framing as ground truth. For every change request:

1. Evaluate the underlying goal and the request critically.
2. Find the most relevant, robust, well-architected way to achieve that goal — including a better
   alternative or a simpler/safer path if one exists.
3. **State your recommendation** concisely (what you'd do and why, and where it differs from the
   literal ask), then implement the best option. If it's a one-way door or materially changes scope,
   confirm first; otherwise proceed with the recommended approach and note the deviation.

Never blindly implement. Prefer the better-engineered solution over a literal transcription of the
request.

> **And: whatever changes — always update the TODO board** in `sentinel-core-api/master-doc/` in the
> same change. Treat it as a **dated timeline of activity**: append a dated entry for what was done,
> tick completed items, add any new task discovered, and mark in-progress work. Never delete a line.
> No change ships without its TODO update — the board must always reflect reality and the history of
> what happened.

---

## Deployment & CI (Vercel; no GitHub Actions here)

This repo has **no GitHub Actions workflow.** It deploys as its **own Vercel project**: push to `main`
→ Vercel builds and deploys `docs.fortiqo.xyz`; pull requests get preview URLs. `vercel.json` sets
`installCommand: bun install` and framework `nextjs`; security headers live in `next.config.ts`.

Because this is a static content site, every push rebuilds it — there is no container/image redeploy
to guard against here.

**Commit-type convention (platform-wide):** use the `docs:` / `docs(scope):` conventional-commit type
for pure documentation, todo, or markdown updates, and a functional type (`feat:`, `fix:`, `refactor:`,
`ci:`, …) when you change the renderer, config, or build. This keeps history consistent with the
service repos, where a `paths-ignore` + `docs:` commit-message guard actually skips a container
redeploy. That redeploy-guard mechanism lives in those service repos — not in this Vercel-built site.

## Workflow discipline — todo-first

**Every task goes on the todo list before any work starts, then gets marked done after.** Whether it
is a feature, a fix, a refactor, or a one-line chore: (1) add it to the working todo list first, (2) do
the work, (3) mark the item complete. Nothing is worked on that is not on the list. As you discover
follow-up work mid-task, add it as new todo items immediately so the list always reflects reality and
progress stays visible. This applies to every task, however small.

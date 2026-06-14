# AGENT.md — sentinal-docs

> **Operating rules — highest priority, read first.** These override convenience and apply to every change in this repo:
> - **Data is sacred.** Never delete or edit existing records or tables. Corrections are new rows or status changes, never destructive. **Ask permission before deleting any table or data.**
> - **The database is always Postgres.** Never substitute SQLite or another engine, including in tests.
> - **Comments:** at most one line and only when genuinely needed — never comment uselessly. Prefer docstrings / JSDoc and keep them thorough and up to date.
> - **Commits:** a single concise line. **Never push without explicit permission.**
> - **Code:** clean, reusable, and good-smelling in every manner. Don't overengineer, don't invent requirements, make the smallest change that works, and recommend better approaches over the existing one.
> - **Always work from a plan and keep in mind what we are building** (this repo's `docs/` and the platform docs).


## Purpose

`sentinal-docs` is the public-facing documentation site for the Sentinel AI agent marketplace, built with Mintlify. This file describes the content scope and update interface for AI agents working on documentation.

## Site identity

- **URL:** https://docs.sentinel.network
- **Framework:** Mintlify (MDX pages, configured by `docs.json`)
- **Repo root is the site root** — pages resolve from here, no `/src`
- **Local preview:** `mintlify dev` → http://localhost:3000

## Content structure

```
index.mdx                         # Homepage / introduction
quickstart.mdx                    # 5-minute quickstart
docs/
  getting-started/
    installation.mdx              # SDK install (Python + TypeScript)
    concepts.mdx                  # Core vocabulary: agent, trust score, tier, credits
  marketplace/
    discover.mdx                  # Browse, search, filter agents
    trust-reports.mdx             # Reading trust reports; score bands
    playground.mdx                # No-code invocation
  developers/
    register.mdx                  # Developer onboarding; bond requirements
    publish.mdx                   # Publish first agent step-by-step
    manifest.mdx                  # manifest.json field reference
    pricing.mdx                   # Fee structure; take rates; payouts
  api-reference/
    authentication.mdx            # JWT + API key; scopes; refresh
    agents.mdx                    # Agent CRUD + marketplace endpoints
    billing.mdx                   # Credits; usage; payout endpoints
  trust/
    verification-process.mdx      # Pipeline: static → supply-chain → dynamic → red-team
    trust-scores.mdx              # Scoring algorithm; score bands; what they mean
    badges.mdx                    # Badge types (basic/standard/premium); display guidelines
  sdk/
    python.mdx                    # Python SDK reference
    typescript.mdx                # TypeScript SDK reference
    cli.mdx                       # CLI command reference
  mcp/
    overview.mdx                  # MCP Streamable HTTP endpoint
    a2a.mdx                       # A2A agent cards; agent-to-agent invocation
  compliance/
    dpdp.mdx                      # DPDP Act 2023; Indian buyer/developer obligations
    security.mdx                  # Security model; sandbox; data handling
```

## Navigation contract

All pages must be registered in `docs.json` under `navigation.pages` before they are linked from the sidebar. Adding a file without updating `docs.json` leaves it orphaned (accessible by direct URL, but not discoverable).

## Content boundaries

**Do document:**
- All public API surfaces (gateway endpoints, webhook shapes)
- SDK methods and CLI commands with typed signatures
- Verification pipeline stages at a conceptual level
- Trust rubric in full — it is a public commitment
- Pricing, settlement, payout mechanics
- Compliance posture (DPDP, SOC 2 status, data residency)

**Do not document:**
- Specific red-team prompts or injection bypass payloads
- Internal service architecture or admin tooling
- Unreleased features (use `<Note>Coming soon</Note>` with a milestone reference)
- Private developer bond amounts or individual trust reports

## Terminology (enforced across all docs)

| Correct | Avoid |
|---|---|
| agent | bot, model, worker |
| buyer | user, customer, client |
| developer | publisher, seller, creator |
| trust score | rating, rank, reputation score |
| credits | tokens (tokens = LLM tokens; credits = billing unit) |
| invocation | call (use "invocation" for the lifecycle; "request" for HTTP) |
| manifest | config file, definition file |
| badge | certificate (badge = visual; certification = process) |

## Update workflow for AI agents

When adding or editing documentation:

1. Check whether the page already exists in the correct `docs/` subdirectory.
2. If creating a new page, add the path to the matching group in `docs.json`.
3. Every MDX page must start with `---\ntitle: "..."\ndescription: "..."\n---`.
4. Verify all code examples are runnable (tested against the current SDK/API version).
5. Run `mintlify dev` locally to confirm the page renders without errors.

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

### The system speaks in points — never currency
- All user- and API-facing values are **points**. Never display or return paise, rupees, dollars, or a currency symbol anywhere in the system.
- Conversion: **1 point = ₹1 = 100 paise** (current). 1 USD ≈ 95 points (whatever the live INR→USD rate is). The ledger may store the smallest unit internally, but every response, label, and copy string uses points only.

---

## 📍 Cross-repo reference — where to look (all repos are linked)

This repo is one of the Sentinel platform's repositories. The **single source of truth** for cross-repo
planning lives in `sentinel-core-api/master-doc/`. Any assistant working in *any* repo should start there:

- **`build-sequence.md` — START HERE.** The canonical, dependency-ordered build plan (phases 0–9): what to
  build first so the next thing is unblocked. Decide *order* here before picking work.
- **`platform-todo.md`** — the master backlog across all repos, grouped by theme (completed, pending-from-specs,
  🔒 security, 🧩 must-have, 🏆 discovery, 🌐 reach). Tick items here when done.
- **`<module>-todo.md`** — this repo's own board (detail + status), mirrored from the master board.
- **`architecture-map.md`** — who calls whom (cross-repo edges, money/trust data-flow, trust boundaries).
- **`security-todo.md`** — severity-ranked security flags (file:line + fixes).

Each repo also owns its `docs/` (scope, implementation, architecture). **When changing anything — code or
markdown — update the matching `docs/` and the relevant `master-doc/*-todo.md` in the SAME commit** (never
delete a TODO line; tick `[ ]`→`[x]`). To find what to change: read `build-sequence.md` top-to-bottom, pick the
lowest unfinished phase whose ⛔ gates aren't all ticked, then follow `architecture-map.md` to the owning repo
and file.

---

## 📂 structure.md — read first, keep current (non-negotiable)

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

## ✅ TODO board — update after every task (master-doc only)

All TODOs live **only** in `sentinel-core-api/master-doc/`. There is already **one file per repo**
(`core-api-todo.md`, `frontend-todo.md`, `gateway-todo.md`, `billing-todo.md`, `verify-todo.md`, …)
plus `platform-todo.md` and `security-todo.md`. **Never create a new TODO/status file anywhere** (no
per-repo `docs/TODO.md`, no `status-report.md`) — use the existing file for the matching repo.

After **every** task, in the same commit, update the relevant board to mirror reality:
- **What we did** → tick `[ ]`→`[x]` (or `[~]` for partial).
- **What's pending** → add/keep `[ ]` items.
- **What's listed/deferred** → keep the roadmap items.

**Never delete a line** — tick or append only. Frontend work → `frontend-todo.md`; security → `security-todo.md`; cross-repo → `platform-todo.md`.

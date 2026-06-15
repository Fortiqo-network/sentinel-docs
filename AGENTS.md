# AGENTS.md — Sentinel docs

## Purpose

This repository is the public documentation site for the Sentinel platform. It is published at [docs.sentinel.network](https://docs.sentinel.network) and serves as:

- The primary reference for buyers discovering and invoking agents
- The developer portal for publishing agents and earning on usage
- The trust-transparency hub — the verification methodology and scoring rubric are published here in full
- The SDK and API reference

## Technology

- **Framework:** [Mintlify](https://mintlify.com) — MDX pages, configured by `docs.json`
- **Deployment:** Automatic on push to `main` via the Mintlify GitHub App
- **Preview:** Per-PR preview deployments via Mintlify

## Content update workflows

### Adding or editing documentation

1. Edit or create `.mdx` files in the `docs/` directory.
2. Update `docs.json` navigation if you added a new page.
3. Preview locally with `mintlify dev`.
4. Open a PR — the Mintlify GitHub App posts a preview URL.
5. Merge to `main` to deploy to production.

### Updating the trust rubric

The trust rubric content in `docs/trust/trust-scores.mdx` and `docs/trust/verification-process.mdx` must stay in sync with the actual rubric running in the `verify` service.

When the `verify` service publishes a new rubric version:

1. Pull the rubric changelog from `verify/rubric/changelog.md`.
2. Update the stage weights table in `docs/trust/trust-scores.mdx`.
3. Update the finding category tables in `docs/trust/verification-process.mdx`.
4. Update the `rubric_version` value in any example JSON responses.
5. Open a PR titled `docs: sync rubric to vYYYY.N`.

CI runs a cross-check between the `rubric_version` referenced in these docs and the version tag on the latest `verify` release. The build fails if they do not match.

### Updating the API reference

API reference pages (`docs/api-reference/`) are hand-authored for now. When the `sentinel-shared` OpenAPI schema changes:

1. Review the diff in `sentinel-shared/openapi.yaml`.
2. Update the relevant endpoint documentation in `docs/api-reference/`.
3. Update example request/response JSON to match the new schema.

A future milestone will auto-generate API reference from OpenAPI using Mintlify's OpenAPI integration.

### Updating SDK reference

When a new SDK version ships:

1. Pull the SDK changelog.
2. Update `docs/sdk/python.mdx` and `docs/sdk/typescript.mdx` with new methods, changed signatures, or removed APIs.
3. Update install instructions if the minimum Python/Node version changed.

## Out of scope

- Internal admin tooling documentation
- Specific red-team attack payloads (these must never appear in this repo)
- Marketing content masquerading as methodology
- Unreleased service logic

## Contacts

| Area | Contact |
|---|---|
| Documentation content | docs@sentinel.network |
| Trust rubric questions | trust@sentinel.network |
| Security disclosures | security@sentinel.network |
| Compliance and legal | legal@sentinel.network |

## Docs & TODO (mandatory)
- Every change updates its docs in the **same commit**: this `CLAUDE.md`/`AGENT.md`, the relevant README/`docs/`, and the **central TODO board** at `sentinal-core-api/master-doc/` (this module's `*-todo.md` plus `platform-todo.md`). Tick completed items (`[ ]`→`[x]`) — **never delete a line**; add TODOs for follow-ups discovered.
- **Each module follows its own implementation doc.** As planning moves, update that module's `docs/implementation.md` / `docs/architecture.md` / roadmap and the central TODO in the same commit, so plans and docs stay in lockstep with the code — every module owns and follows its own implementation.

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

---

## 🗃️ DB schema change → migration BEFORE push (non-negotiable)

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

## 📚 Docs framework — markdown-only, rendered by the frontend (2026-06-15)

Platform documentation is **markdown-only** and lives in **sentinel-docs** (the content
source of truth). It is rendered at **https://sentinel.fortiqo.xyz/docs** by the
**sentinel-frontend** docs framework (Mintlify-like: sidebar, TOC, search, callouts, code).

- **Mintlify is removed.** Do NOT reintroduce `docs.json`/Mintlify or any separate docs
  build/runtime. sentinel-docs ships markdown (`.md`/`.mdx`) + a `nav.json` manifest only.
- **Single source of truth:** never duplicate doc content into the frontend. The frontend
  reads markdown from sentinel-docs at build time via `SENTINEL_DOCS_PATH` (default the
  monorepo sibling `../sentinel-docs`); nav comes from `nav.json`.
- **Adding/editing a doc page:** put the markdown in sentinel-docs and add its slug to
  `nav.json`; the frontend renders it automatically. Track work in
  `master-doc/docs-todo.md` (tick/append only — never delete a line).

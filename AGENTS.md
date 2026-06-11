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

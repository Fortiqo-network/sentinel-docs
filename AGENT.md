# AGENT.md — sentinal-docs

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

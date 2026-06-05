# sentinel-docs

> The **public documentation, developer portal, and trust-transparency site** for Sentinel. Houses the SDK reference, API docs, the **verification methodology and trust-score rubric**, and buyer/developer guides. New in the Phase-1 architecture — because trust is sold through transparency.

[![Docs](https://img.shields.io/badge/site-Docusaurus%20%7C%20Nextra-3578e5)]()
[![OpenAPI](https://img.shields.io/badge/api-OpenAPI-6ba539)]()

---

## 1. Why this repo exists

Sentinel's moat is **trust**. You cannot ask buyers to rely on a trust score and certification without **publishing how it's computed**. `sentinel-docs` is where the platform earns credibility:

- It makes the **verification methodology and trust-score rubric** public and versioned (so a "certified" badge means something checkable).
- It is the **developer onramp** (SDK quickstart, manifest reference, publishing guide) — directly tied to supply growth.
- It is the **buyer guide** (how to connect via URL/API/MCP, how pricing/credits/outcomes/disputes work).
- It hosts **API reference** auto-generated from the services' OpenAPI specs.

```
sentinel-shared (OpenAPI/schemas) ─► sentinel-docs (auto API ref)
sentinel-verify (rubric)          ─► sentinel-docs (trust methodology, versioned)
sentinel-sdk (reference)          ─► sentinel-docs (SDK docs)
```

---

## 2. Contents

- **Getting started** (buyers): discover → connect (URL/widget/API/MCP/npx) → pay with credits → outcomes & disputes.
- **Getting started** (developers): install SDK → build agent → local verify → publish → get paid.
- **SDK reference**: Python + TS API, CLI commands, manifest schema reference.
- **Access guide**: hosted URL, embeddable widget, REST, **MCP (Streamable HTTP)**, A2A, `npx @sentinel/connect`.
- **Verification & trust** (the flagship section): pipeline stages, what each finding category means, the **trust-score rubric and weights (versioned)**, certification tiers, continuous re-verification, how disputes feed back into scores.
- **Pricing & settlement**: take rates by tier, credits/wallet, escrow & outcome release, performance bonds & slashing policy, payout schedule.
- **Security**: platform isolation model (microVM), responsible disclosure / bug-bounty, data handling.
- **Compliance**: data residency, GDPR/DPDP, EU AI Act transparency notes, SOC 2 status.
- **API reference**: per-service OpenAPI (public subset).
- **Changelog / RFCs**: schema and rubric version history.
- **Status**: link to the status page.

---

## 3. Tech stack

| Concern | Choice |
|---|---|
| Site generator | **Docusaurus** or **Nextra** (MDX) |
| API reference | OpenAPI → **Redocly/Scalar** rendered from `sentinel-shared`/services |
| Search | Algolia DocSearch or local Lunr |
| Diagrams | Mermaid (in MDX) |
| Hosting | Static (Cloudflare Pages / CDN), built in CI |
| Package manager | **bun/yarn** (frontend convention) |

---

## 4. Project structure

```
sentinel-docs/
├── docs/
│   ├── buyers/                   # discover, connect, pay, disputes
│   ├── developers/               # sdk quickstart, publish, payouts
│   ├── sdk/                      # API + CLI reference
│   ├── access/                   # url, widget, rest, mcp, a2a, npx
│   ├── trust/                    # verification methodology + rubric (versioned)
│   ├── pricing/                  # take rates, credits, escrow, bonds
│   ├── security/                 # isolation, disclosure, bug bounty
│   ├── compliance/               # gdpr, dpdp, eu-ai-act, soc2
│   └── api/                      # generated OpenAPI reference
├── rfcs/                         # design + rubric RFCs
├── src/                          # site theme/components
├── static/
├── docusaurus.config.ts          # or nextra config
├── package.json                  # bun/yarn
└── README.md
```

---

## 5. Build & develop

```bash
bun install            # or yarn
bun run dev            # local docs at http://localhost:3001
bun run build          # static output
bun run gen:api        # pull OpenAPI from services/sentinel-shared and render
```

| Script | Action |
|---|---|
| `dev` / `build` | Local server / static build |
| `gen:api` | Regenerate API reference from OpenAPI |
| `gen:rubric` | Sync the published trust-score rubric from `sentinel-verify`'s versioned rubric |
| `lint` | MDX/link check (no broken links) |

---

## 6. The trust-transparency principle

The `trust/` section is **contractual**, not marketing. Rules:

- Every published rubric is **versioned**; changing weights/criteria is an RFC + changelog entry.
- The methodology must match what `sentinel-verify` actually does (CI cross-checks the rubric version referenced by verify against the docs).
- Finding categories, severities, and certification tiers documented here are the same enums defined in `sentinel-shared`.
- No private/exploitable detail (red-team prompts, specific bypasses) is published — only methodology and criteria.

---

## 7. Cross-repo dependencies

| Sources content from | For |
|---|---|
| `sentinel-shared` | OpenAPI + schema/enum reference |
| `sentinel-verify` | Trust-score rubric + methodology (versioned) |
| `sentinel-sdk` | SDK/CLI reference |
| `sentinel-billing` | Pricing/settlement/bond policy docs |
| Status page | Uptime/incident history |

## 8. License
Docs content may be CC-BY for the open methodology; site code proprietary. © Fortiqo-network.

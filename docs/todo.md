# sentinel-docs — todo.md

## M0 — Setup
- [ ] Scaffold Docusaurus/Nextra (MDX) + bun/yarn
- [ ] Nav, search, theme, Mermaid; link-checker in CI

## M1 — MVP
- [ ] Buyer getting-started (discover → connect → pay → outcomes/disputes)
- [ ] Developer getting-started (SDK → build → publish → payouts)
- [ ] Access guide: URL, widget, REST, MCP (Streamable HTTP), npx, A2A
- [ ] Pricing/settlement docs (take rates, credits, escrow, bonds, payouts)
- [ ] Trust section v1: pipeline stages, finding categories, rubric (versioned), cert tiers

## M2 — Hardening
- [ ] SDK + CLI reference (Python + TS) + manifest schema reference
- [ ] API reference auto-gen from OpenAPI (gen:api)
- [ ] Rubric sync (gen:rubric) + CI cross-check vs verify version
- [ ] Security (isolation, responsible disclosure, bug bounty) + data handling
- [ ] Compliance (GDPR/DPDP, EU AI Act transparency, SOC 2 status)

## M3 — Scale
- [ ] Changelog + RFC process pages
- [ ] Versioned docs per release
- [ ] i18n for key guides

## Definition of done
- [ ] Published rubric matches verify (CI cross-check passes)
- [ ] No broken links; API ref regenerates on schema change
- [ ] Zero-to-published-agent achievable from docs alone

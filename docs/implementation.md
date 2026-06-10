# sentinel-docs — implementation.md

## Stack
Docusaurus or Nextra (MDX), OpenAPI rendered via Redocly/Scalar, Algolia DocSearch (or Lunr), Mermaid diagrams, static hosting on Cloudflare Pages/CDN built in CI. Package manager: **bun/yarn**.

## Structure
`docs/{buyers,developers,sdk,access,trust,pricing,security,compliance,api}`, `rfcs/`, `src/` (theme), `static/`, config.

## Content pipeline
- `gen:api` pulls OpenAPI from services/sentinel-shared → renders API reference.
- `gen:rubric` syncs the versioned trust-score rubric from verify; CI cross-checks the rubric version referenced by verify matches the published doc.
- MDX with Mermaid for architecture/flow diagrams.
- Link checker in CI (no broken links).

## Trust-transparency principle (contractual)
- Every rubric version is versioned + changelog'd; weight changes go through an RFC.
- Finding categories/severities/cert tiers match sentinel-shared enums.
- No exploitable detail published.

## Build order
1. Scaffold site + theme + nav + search.
2. Buyer + developer getting-started.
3. SDK/CLI reference + manifest reference.
4. Access guide (URL/widget/REST/MCP/A2A/npx).
5. Trust section + rubric sync + CI cross-check.
6. Pricing/settlement, security, compliance.
7. API reference auto-gen; changelog/RFCs; status link.

## Deployment
Static build in CI → Cloudflare Pages/CDN; preview per PR.

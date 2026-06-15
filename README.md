# sentinel-docs

Public documentation site for the [Sentinel](https://sentinel.fortiqo.xyz) platform — the trust layer for AI agent commerce.

A **standalone Next.js site** (markdown content + a thin in-repo renderer). Deployed as its own
Vercel project to [docs.fortiqo.xyz](https://docs.fortiqo.xyz). **Mintlify has been removed.**

## Structure

```
sentinel-docs/
├── nav.json                         # Navigation manifest (groups + page order)
├── app/                             # Next renderer: [[...slug]] page, layout, globals.css
├── components/                      # mdx-components, DocsSidebar, DocsToc
├── lib/                             # docs loader (lib/docs.ts) + cn util
├── index.mdx                        # Home page
├── quickstart.mdx                   # Five-minute quickstart
├── docs/
│   ├── getting-started/
│   │   ├── concepts.mdx             # Key concepts glossary
│   │   └── installation.mdx        # SDK + CLI installation (Python + TypeScript)
│   ├── marketplace/
│   │   ├── discover.mdx             # Browsing, searching, filtering agents
│   │   ├── trust-reports.mdx       # Reading and interpreting trust reports
│   │   └── playground.mdx          # No-code playground guide
│   ├── developers/
│   │   ├── register.mdx            # Becoming a developer, bond requirements
│   │   ├── publish.mdx             # Publishing your first agent (step by step)
│   │   ├── manifest.mdx            # manifest.json field reference
│   │   └── pricing.mdx             # Fee structure, take rates, payouts
│   ├── api-reference/
│   │   ├── authentication.mdx      # JWT + API key auth, scopes
│   │   ├── agents.mdx              # Agent endpoints
│   │   └── billing.mdx             # Credits, usage, payout endpoints
│   ├── trust/
│   │   ├── verification-process.mdx # Pipeline stages: static, supply-chain, dynamic, red-team
│   │   ├── trust-scores.mdx        # Scoring rubric, score ranges, interpretation
│   │   └── badges.mdx              # Badge types, display guidelines, embedding
│   ├── sdk/
│   │   ├── python.mdx              # Python SDK reference
│   │   ├── typescript.mdx          # TypeScript SDK reference
│   │   └── cli.mdx                 # CLI reference
│   ├── mcp/
│   │   ├── overview.mdx            # MCP integration guide, Streamable HTTP endpoint
│   │   └── a2a.mdx                 # A2A agent-to-agent invocation
│   └── compliance/
│       ├── dpdp.mdx                # DPDP Act 2023 compliance notes
│       └── security.mdx            # Security model, sandboxing, responsible disclosure
├── logo/
│   ├── light.svg
│   └── dark.svg
└── favicon.svg
```

## Local development

```bash
bun install
bun run dev      # http://localhost:3000
```

## Adding pages

1. Create a `.md` (or `.mdx` for callout components) file under `docs/`.
2. Add its path (without extension) to the relevant group in `nav.json`.
3. Use sentence case headings, active voice, and second person throughout.

See [CLAUDE.md](./CLAUDE.md) for full conventions.

## Deployment

Deployed as a standalone Vercel project (Root Directory = repo root, framework Next.js) mapped to
`docs.fortiqo.xyz` via Cloudflare DNS. Pushing to `main` triggers a Vercel build; PRs get preview URLs.

## Related repositories

| Repo | Description |
|---|---|
| `sentinel-shared` | OpenAPI schemas — source of truth for the API reference |
| `verify` | Verification pipeline — source of truth for the trust rubric |
| `sdk` | Python and TypeScript SDKs |
| `sentinel-cli` | CLI tool |

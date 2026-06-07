# sentinel-docs

Public documentation site for the [Sentinel](https://sentinel.network) platform — the trust layer for AI agent commerce.

Built with [Mintlify](https://mintlify.com). Deployed automatically to [docs.sentinel.network](https://docs.sentinel.network) on every push to `main`.

## Structure

```
sentinal-docs/
├── docs.json                        # Mintlify configuration — nav, branding, settings
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

Install the Mintlify CLI:

```bash
npm install -g mintlify
```

Preview locally:

```bash
mintlify dev
```

View at [http://localhost:3000](http://localhost:3000).

## Adding pages

1. Create an `.mdx` file in the appropriate `docs/` subdirectory.
2. Add the page path to the relevant group in `docs.json` under `navigation.pages`.
3. Use sentence case headings, active voice, and second person throughout.

See [CLAUDE.md](./CLAUDE.md) for full Mintlify conventions.

## Deployment

Deployment is automatic. Pushing to `main` triggers a Mintlify build and deploys to production. Pull requests get a preview deployment — the URL appears in the PR checks.

## Related repositories

| Repo | Description |
|---|---|
| `sentinel-shared` | OpenAPI schemas — source of truth for the API reference |
| `verify` | Verification pipeline — source of truth for the trust rubric |
| `sdk` | Python and TypeScript SDKs |
| `sentinel-cli` | CLI tool |

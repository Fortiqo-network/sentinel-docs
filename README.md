# sentinel-docs

Public documentation site for the [Sentinel](https://sentinel.fortiqo.xyz) platform — the trust, verification, and settlement layer for AI agent commerce.

A **standalone Next.js site**: markdown/MDX content in this repo rendered by a thin in-repo renderer. Deployed as its own Vercel project to [docs.fortiqo.xyz](https://docs.fortiqo.xyz). **Mintlify has been removed.** The main app redirects `sentinel.fortiqo.xyz/docs` here.

---

## Platform role

Documentation is a first-class part of Sentinel's trust story ("transparency is the moat"): the verification methodology, trust-score rubric, SDK/CLI reference, and API reference all live here so buyers and developers can self-serve from discover → publish. It is a static content site with no backend and no calls to platform services.

---

## Key features / structure

```
sentinel-docs/
├── nav.json                     # Navigation manifest (groups + page order)
├── index.mdx                    # Home page
├── quickstart.mdx               # Five-minute quickstart
├── app/                         # Next renderer
│   ├── [[...slug]]/page.tsx     # Catch-all MDX renderer
│   ├── layout.tsx · globals.css
│   ├── icon.svg · opengraph-image.tsx
│   └── robots.ts · sitemap.ts   # SEO
├── components/                  # mdx-components, DocsSidebar, DocsToc
├── lib/                         # docs loader (lib/docs.ts) + cn util
└── docs/
    ├── getting-started/         # concepts, installation, roadmap
    ├── marketplace/             # discover, trust-reports, playground
    ├── developers/              # register, publish, manifest, pricing
    ├── api-reference/           # authentication, agents, billing
    ├── trust/                   # verification-process, trust-scores, badges
    ├── sdk/                     # python, typescript, cli
    ├── mcp/                     # overview (Streamable HTTP), a2a
    ├── compliance/              # dpdp, security
    └── structure.md · scope.md · implementation.md   # internal reference docs
```

Content is `.md`/`.mdx` loaded via `gray-matter` + `next-mdx-remote`, with `remark-gfm` and `rehype` plugins (slug, autolink-headings, highlight).

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 16** (App Router) |
| UI runtime | **React 19** |
| Language | **TypeScript 5** |
| Content | Markdown/MDX via `next-mdx-remote` + `gray-matter` |
| Markdown pipeline | `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-highlight`, `github-slugger` |
| Styling | **Tailwind CSS 3.4** |
| Package manager | **bun** (`bun.lock` committed) |

---

## Configuration

No runtime secrets are required — this is a static content site. A `.env.example` exists but currently references a `MINTLIFY_API_KEY`, which is **stale** (Mintlify has been removed and is no longer used). No env vars are needed to build or run.

---

## Local development

```bash
bun install
bun run dev      # http://localhost:3000
bun run build
bun run start
bun run lint
```

### Adding pages

1. Create a `.md` (or `.mdx` for callout components) file under `docs/`.
2. Add its path (without extension) to the relevant group in `nav.json`.
3. Use sentence-case headings, active voice, and second person. See `CLAUDE.md` for full conventions.

---

## Deploy

Standalone **Vercel** project (Root Directory = repo root, framework Next.js; `installCommand: bun install` in `vercel.json`), mapped to `docs.fortiqo.xyz` via Cloudflare DNS. Push to `main` → Vercel build; PRs get preview URLs. There is **no GitHub Actions workflow** in this repo — Vercel handles CI/CD.

Security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`) are set in `next.config.ts`.

---

## Status (verified against code)

Live at `docs.fortiqo.xyz`. The Next renderer, `nav.json` navigation, sidebar/TOC, SEO (`robots.ts`, `sitemap.ts`, `opengraph-image.tsx`), and the full content tree above (getting-started, marketplace, developers, api-reference, trust, sdk, mcp, compliance) are all in place. Content sections exist as listed; keep them in sync with the source-of-truth repos (`sentinel-shared` for API schemas, `sentinel-verify` for the rubric).

---

## Upcoming / roadmap

Near-term items (source: `sentinel-core-api/master-doc/docs-todo.md`):

- Auto-generate the **API reference from OpenAPI** and cross-check the published **rubric against `sentinel-verify`** in CI.
- Link-checker in CI; versioned docs per release; changelog + RFC process pages.
- Identity/portable-trust guide (DID/handle, well-known agent card, SIWE), embeddable-widget snippets, and a public ecosystem API reference for third-party builders.
- i18n for key guides.
- Remove the stale `MINTLIFY_API_KEY` from `.env.example`.

---

## Related repositories

| Repo | Description |
|---|---|
| `sentinel-shared` | Cross-service schemas — source of truth for the API reference |
| `sentinel-verify` | Verification pipeline — source of truth for the trust rubric |
| `sentinel-sdk` | Python and TypeScript SDKs + CLI |

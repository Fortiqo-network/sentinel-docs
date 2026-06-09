# CLAUDE.md — Sentinel docs

This is a Mintlify documentation site. Pages are MDX files with YAML frontmatter. Navigation and settings are in `docs.json`.

## Local preview

```bash
npm install -g mintlify
mintlify dev
# opens http://localhost:3000
```

If the dev server fails to start:

```bash
mintlify update   # update the CLI, then retry
```

## Adding a page

1. Create an `.mdx` file in the appropriate `docs/` subdirectory.
2. Add the relative path (without the `.mdx` extension) to the correct group in `docs.json`:

```json
{
  "group": "Trust & Verification",
  "pages": [
    "docs/trust/verification-process",
    "docs/trust/trust-scores",
    "docs/trust/badges",
    "docs/trust/your-new-page"   // add here
  ]
}
```

3. Restart `mintlify dev` if the page does not appear.

## MDX frontmatter

Every page must start with:

```mdx
---
title: "Page title"
description: "One sentence describing the page — appears in search results and social previews."
---
```

Optional frontmatter fields:

```mdx
---
title: "Page title"
description: "..."
icon: "shield-check"        # Fontawesome icon for the sidebar
---
```

## Writing standards

- **Headings:** Sentence case. `## Key concepts`, not `## Key Concepts`.
- **Voice:** Active voice. Second person ("you"). Never "the user" or "one".
- **Callouts:** Use `<Note>`, `<Warning>`, `<Tip>`, `<Info>` for important asides. Don't overuse them.
- **Code blocks:** Every technical page must have at least one code example. Specify the language for syntax highlighting.
- **Inline code:** Use backtick formatting for file names, command names, field names, values, and code references.
- **Bold:** Use for UI elements only (`Click **Settings**`). Not for emphasis.
- **Links:** Use relative paths for internal links (`[concepts](/docs/getting-started/concepts)`), not absolute URLs.

## Mintlify components

### Cards

```mdx
<Card title="Quickstart" icon="rocket" href="/quickstart">
  Get up and running in five minutes.
</Card>

<CardGroup cols={2}>
  <Card title="..." icon="..." href="...">...</Card>
  <Card title="..." icon="..." href="...">...</Card>
</CardGroup>
```

### Steps

```mdx
<Steps>
  <Step title="Install">
    Step content with code examples.
    ```bash
    npm install ...
    ```
  </Step>
  <Step title="Configure">...</Step>
</Steps>
```

### Callouts

```mdx
<Note>For important information that is not a warning.</Note>
<Warning>For things that can cause data loss or billing charges.</Warning>
<Tip>For shortcuts and best practices.</Tip>
<Info>For supplementary context.</Info>
```

### Tabs

```mdx
<Tabs>
  <Tab title="Python">
    ```python
    ...
    ```
  </Tab>
  <Tab title="TypeScript">
    ```typescript
    ...
    ```
  </Tab>
</Tabs>
```

### Code groups

```mdx
<CodeGroup>
  ```bash npm
  npm install @sentinel-network/sdk
  ```

  ```bash pnpm
  pnpm add @sentinel-network/sdk
  ```
</CodeGroup>
```

## docs.json structure

Navigation is defined under `navigation.pages` as an array of groups. Each group has a `group` label and a `pages` array of paths.

```json
{
  "navigation": {
    "pages": [
      {
        "group": "Getting Started",
        "pages": ["index", "quickstart", "docs/getting-started/installation"]
      }
    ]
  }
}
```

Path strings are relative to the repo root, without the `.mdx` extension.

## Content boundaries

Do document:
- Public API surfaces, SDK methods, CLI commands
- Verification methodology at a conceptual level (stages, weights, finding categories)
- Trust rubric in full — it is publicly committed
- Pricing, settlement, and payout mechanics
- Compliance posture (GDPR, DPDP, SOC 2 status)

Do not document:
- Specific red-team prompts or bypass payloads
- Internal service architecture or admin tooling
- Unreleased features (use `<Note>Coming soon</Note>` with a milestone if needed)

## Terminology

| Use | Not |
|---|---|
| agent | bot, model, worker |
| buyer | user, customer, client |
| developer | publisher, seller |
| trust score | rating, rank |
| credits | tokens (tokens are LLM tokens; credits are the billing unit) |
| invocation | call, request (use "invocation" for the full lifecycle concept; "request" for HTTP) |
| manifest | config file, definition |
| badge | certificate, certification (badge is the visual; certification is the process) |

## Conventions

### Commits
- Use **Conventional Commits**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `perf:`, `build:`, `ci:` — optional scope, e.g. `fix(auth): reject expired tokens`.
- The message describes the change only. **Never** reference AI assistants, agents, or tooling, and never add `Co-Authored-By` or other attribution trailers.

### Code style
- **No inline comments.** Make intent obvious through precise names and small, single-purpose functions.
- Document with **docstrings** (Python) / **JSDoc** (TypeScript) on modules, classes, and public/exported functions only — explain *why*, not *what*.
- If a line feels like it needs a comment, rename or refactor until it doesn't.

# Assistant guide

This file gives AI assistants the context they need to work in this repository.
It exists so automated checks that expect an `Assistant.md` at the repo root pass.

## What this repo is

- The official documentation site for **Sentinel**, built on [Mintlify](https://mintlify.com).
- Pages are MDX files with YAML frontmatter; configuration lives in `docs.json`.
- The site is under active development — see the "we're building something" notes
  on the [Introduction](index.mdx) and [Quickstart](quickstart.mdx) pages.

## Where to look first

- `docs.json` — site config: name, colors, navigation, logo, favicon.
- `index.mdx`, `quickstart.mdx` — the published pages.
- `logo/light.svg`, `logo/dark.svg`, `favicon.svg` — branding assets.
- `AGENTS.md` — detailed project instructions, terminology, and style preferences.

## Working agreements

For full guidance (style, terminology, content boundaries), follow `AGENTS.md`.
In short:

- Use active voice and second person ("you").
- Keep sentences concise — one idea per sentence.
- Use sentence case for headings.
- Bold for UI elements; code formatting for file names, commands, and paths.

## Local preview

```bash
npm i -g mint
mint dev
```

Then open `http://localhost:3000`.

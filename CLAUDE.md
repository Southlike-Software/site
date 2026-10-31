# CLAUDE.md

## comunication
be concise and sacrifice grammar for the sake of concision

## github
only use the github cli `gh` to interface with github

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portuguese-language (pt-BR) B2B marketing site for **Southlike Software**, targeting Brazilian real estate companies (imobiliárias) with AI automation services. Built with Astro 5 + Tailwind CSS 4, deployed on Vercel.

## Commands

| Command         | Action                                    |
| :-------------- | :---------------------------------------- |
| `bun install`   | Install dependencies                      |
| `bun run dev`   | Dev server at `http://localhost:4321`      |
| `bun run build` | Production build to `./dist/`             |
| `bun run preview`| Preview production build locally         |

No lint or test scripts are configured.

## Architecture

**Astro SSG/SSR hybrid** — most pages are statically generated; API routes use server-side rendering via the Vercel adapter.

`ContactForm.astro` → POST to `/api/lead` → Zod validation → Convex `leads:create` mutation (shared-secret guarded) → redirect to `/obrigado`

The lead API captures metadata (user-agent, referer, IP, source, timestamp) alongside form fields (name, company, phone, leadVolume, avgResponseTime).

## Environment Variables

Leads live in **Convex** (team `marcus-filipus`, project `southlike-site`); schema + functions in `convex/`.
`bunx convex dev` writes `CONVEX_DEPLOYMENT`/`CONVEX_URL` to `.env.local`. Also needed (local + Vercel):

```
CONVEX_URL=https://<deployment>.convex.cloud
LEADS_INGEST_SECRET=...   # must match the Convex deployment env var of same name
```

## Conventions

- All user-facing copy is in Portuguese (pt-BR)
- ES modules (`"type": "module"` in package.json)
- Strict TypeScript (`astro/tsconfigs/strict`)
- Zod for runtime validation at API boundaries
- No client-side JS framework — interactive behavior uses vanilla JS in `<script>` tags within Astro components

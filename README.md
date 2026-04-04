# Agent Verse

An interactive course platform for learning modern AI systems — agents, skills, memory, MCP, and token optimization. Each lesson combines reading with animated demos and hands-on exercises, all within a single-page dark-themed UI.

Progress is tracked per-lesson and persisted in the browser via `localStorage` — no account needed.

---

## What you'll learn

### Agents
How agents work at a fundamental level: the perception -> action -> verification loop, the role of models vs tools, how context windows/sessions shape behavior, and how SDD (Spec-Driven Development) structures complex changes.

### Skills
What skills are in the context of AI agents, how a `SKILL.md` file is structured, and how skills are discovered, loaded, and invoked at runtime.

### MCP (Model Context Protocol)
How MCP enables client-server integrations via tools, resources, and prompts; when to use stdio vs HTTP transport; and how local/project/user scopes affect trust and team sharing.

### Engram
How Engram gives agents persistent memory across sessions with SQLite + FTS5, and how MCP tools like `mem_save`, `mem_search`, and `mem_session_summary` support reliable context recovery.

### Tokens
Why token budgets matter: context overflow, cost, and latency. Includes RTK (Rust Token Killer) command-output compression plus Claude Code hooks and plugins for scalable automation.

---

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build    # Production build
pnpm lint     # Run ESLint
```

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, RSC-first) |
| Runtime | React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Inline styles + CSS custom properties |
| Animations | Framer Motion 12 |
| Icons | Material Symbols Outlined |
| Package manager | pnpm |

---

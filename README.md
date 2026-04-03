# Agent Verse

An interactive course platform for learning modern AI systems — agents, skills, memory, MCP, and token optimization. Each lesson combines reading with animated demos and hands-on exercises, all within a single-page dark-themed UI.

Progress is tracked per-lesson and persisted in the browser via `localStorage` — no account needed.

---

## What you'll learn

### AI Agents
How agents work at a fundamental level: the perception → action → verification loop, the role of models vs tools, and how context windows and sessions shape agent behavior.

### Skills
What skills are in the context of AI agents, how a `SKILL.md` file is structured, and how skills are discovered, loaded, and invoked at runtime.

### MCP (Model Context Protocol)
How context flows between the model, tools, and the environment. How modular architectures let you compose capabilities without coupling them.

### Memory
The difference between session memory (volatile, in-context) and persistent memory (cross-session, retrieval-based). How vector search enables agents to recall relevant information at scale.

### Tokens
Why token budgets matter: context overflow, cost, and latency. How compression, summarization, and selective retention keep agents running efficiently.

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
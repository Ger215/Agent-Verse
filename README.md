# Agent Verse

<p align="center">
  <img src="./public/LogoBg.png" alt="Agent Verse Galaxy Logo" width="520" />
</p>

<p align="center">
  <strong>Learn modern AI systems through interactive, visual lessons.</strong><br/>
  Agents, Skills, MCP, Engram memory, token optimization, and practical workflows in one place.
</p>

---

## Why Agent Verse

Agent Verse is not a static docs page. It is an interactive learning workspace where each lesson combines:

- Narrative explanations
- Visual architecture blocks
- Click-through demos and simulations
- Real command patterns you can apply immediately

Progress is tracked per lesson and persisted locally in your browser (`localStorage`) with no account required.

---

## Learning Tracks

| Track | What you learn |
|------|-----------------|
| Agents | The agentic loop (gather context -> take action -> verify), model vs tools, sessions/context control, and SDD basics |
| Skills | How `SKILL.md` works, how skills are discovered and loaded, and how to structure reusable agent behavior |
| MCP Protocol | Client-server tool architecture, prompts/resources/tools, transport choices, and trust boundaries |
| Engram | Persistent memory design with SQLite + FTS5 and MCP memory operations (`mem_save`, `mem_search`, `mem_session_summary`) |
| Token Optimization | Context budget strategy, RTK compression workflows, and hooks/plugins for scalable automation |

---

## Quick Start

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Useful scripts

```bash
pnpm dev      # Start local dev server
pnpm lint     # Run ESLint
pnpm build    # Production build
pnpm start    # Run production server
```

---

## Product Highlights

- Interactive lesson navigation with per-lesson completion state
- Sidebar module organization with collapsible sections
- Engram and RTK-focused lessons with real workflow examples
- MCP visual flows and architecture explainers
- Motion-enhanced UI built for readability and retention

---

## Tech Stack

| Layer | Technology |
|------|------------|
| Framework | Next.js 16 (App Router, RSC-first) |
| Runtime | React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Inline styles + CSS custom properties |
| Motion | Framer Motion 12 |
| Icons | Material Symbols Outlined |
| Package Manager | pnpm |

---

## Project Structure

```text
app/                    # App Router entrypoints and global layout
components/             # Shared UI + lesson components
components/lessons/     # Individual lesson screens
lib/courseData.ts       # Module + lesson metadata
public/                 # Logos and static assets
```

---

## Contributing Notes

- Keep lessons interactive (not just long text blocks)
- Reuse shared primitives (`LessonHeader`, `CodeBlock`, `CalloutBox`)
- Update both metadata and lesson map when adding/removing lessons
- Follow existing dark-theme token usage for visual consistency

---

## Vision

Agent Verse aims to be the fastest way for developers to go from "I watched a demo" to "I can design and operate real AI workflows".

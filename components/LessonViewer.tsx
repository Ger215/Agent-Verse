"use client";

import LessonNav from "@/components/LessonNav";
import { allLessons } from "@/lib/courseData";

import Agents1 from "@/components/lessons/Agents1";
import Agents2 from "@/components/lessons/Agents2";
import Agents3 from "@/components/lessons/Agents3";
import Agents4 from "@/components/lessons/Agents4";
import Agents5 from "@/components/lessons/Agents5";
import Skills1 from "@/components/lessons/Skills1";
import Mcp1 from "@/components/lessons/Mcp1";
import Mcp2 from "@/components/lessons/Mcp2";
import Mcp3 from "@/components/lessons/Mcp3";
import Memory1 from "@/components/lessons/Memory1";
import Memory2 from "@/components/lessons/Memory2";
import Tokens1 from "@/components/lessons/Tokens1";
import Tokens2 from "@/components/lessons/Tokens2";
import Tokens3 from "@/components/lessons/Tokens3";

const lessonComponents: Record<string, React.ComponentType> = {
  "agents-1": Agents1,
  "agents-2": Agents2,
  "agents-3": Agents3,
  "agents-4": Agents4,
  "agents-5": Agents5,
  "skills-1": Skills1,
  "mcp-1": Mcp1,
  "mcp-2": Mcp2,
  "mcp-3": Mcp3,
  "memory-1": Memory1,
  "memory-2": Memory2,
  "tokens-1": Tokens1,
  "tokens-2": Tokens2,
  "tokens-3": Tokens3,
};

const lessonReferences: Record<
  string,
  Array<{ label: string; href: string }>
> = {
  "agents-1": [
    {
      label: "Claude Code Overview (Anthropic Docs)",
      href: "https://docs.anthropic.com/en/docs/claude-code/overview",
    },
    {
      label: "How Claude Code Works",
      href: "https://code.claude.com/docs/en/how-claude-code-works",
    },
  ],
  "agents-2": [
    {
      label: "Claude Code Tooling and Execution Model",
      href: "https://docs.anthropic.com/en/docs/claude-code/overview",
    },
    {
      label: "Anthropic Developer Documentation",
      href: "https://docs.anthropic.com/",
    },
  ],
  "agents-3": [
    {
      label: "Claude Code Memory and Sessions",
      href: "https://docs.anthropic.com/en/docs/claude-code/memory",
    },
    {
      label: "Claude Code Permissions and Safety",
      href: "https://code.claude.com/docs/en/permission-modes",
    },
  ],
  "agents-4": [
    {
      label: "Create custom subagents (Claude Code Docs)",
      href: "https://code.claude.com/docs/en/sub-agents",
    },
    {
      label: "Agent Teams (Claude Code Docs)",
      href: "https://code.claude.com/docs/en/agent-teams",
    },
  ],
  "agents-5": [
    {
      label: "Martin Fowler — Software Design and Development in the Era of AI",
      href: "https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html",
    },
  ],
  "skills-1": [
    {
      label: "Claude Code Skills (Anthropic Docs)",
      href: "https://code.claude.com/docs/en/skills",
    },
  ],
  "mcp-1": [
    {
      label: "Model Context Protocol — Introduction",
      href: "https://modelcontextprotocol.io/introduction",
    },
    {
      label: "MCP Claude Code Docs",
      href: "https://code.claude.com/docs/en/mcp",
    },
  ],
  "mcp-2": [
    {
      label: "MCP Architecture Concepts",
      href: "https://modelcontextprotocol.io/docs/learn/architecture",
    },
  ],
  "mcp-3": [
    {
      label: "Claude Code Skills (Anthropic Docs)",
      href: "https://code.claude.com/docs/en/skills",
    },
    {
      label: "Claude Code Hooks",
      href: "https://code.claude.com/docs/en/hooks",
    },
  ],
  "memory-1": [
    {
      label: "Engram GitHub Repository",
      href: "https://github.com/Gentleman-Programming/engram",
    },
    {
      label: "SQLite FTS5 Documentation",
      href: "https://www.sqlite.org/fts5.html",
    },
  ],
  "memory-2": [
    {
      label: "Engram GitHub Repository",
      href: "https://github.com/Gentleman-Programming/engram",
    },
    {
      label: "SQLite FTS5 Documentation",
      href: "https://www.sqlite.org/fts5.html",
    },
  ],
  "tokens-1": [
    {
      label: "RTK (Rust Token Killer) Repository",
      href: "https://github.com/rtk-ai/rtk",
    },
    {
      label: "Claude Code Context and Tokens",
      href: "https://code.claude.com/docs/en/costs",
    },
  ],
  "tokens-2": [
    {
      label: "RTK (Rust Token Killer) Repository",
      href: "https://github.com/rtk-ai/rtk",
    },
    {
      label: "Token Efficiency in Agent Workflows",
      href: "https://code.claude.com/docs/en/costs",
    },
  ],
  "tokens-3": [
    {
      label: "Claude Code Hooks",
      href: "https://docs.anthropic.com/en/docs/claude-code/hooks",
    },
    {
      label: "Claude Code Plugins",
      href: "https://docs.anthropic.com/en/docs/claude-code/plugins",
    },
  ],
};

interface LessonViewerProps {
  lessonId: string;
  onComplete: () => void;
  onNext: () => void;
  onPrev: () => void;
  isCompleted: boolean;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function LessonViewer({
  lessonId,
  onComplete,
  onNext,
  onPrev,
  isCompleted,
  hasNext,
  hasPrev,
}: LessonViewerProps) {
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const isLast = currentIndex === allLessons.length - 1;

  const LessonComponent = lessonComponents[lessonId];
  const references = lessonReferences[lessonId] ?? [];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
        background: "transparent",
      }}
    >
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          scrollbarGutter: "stable",
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "2rem 1.25rem 1.5rem",
          }}
        >
          <div
            style={{
              background: "rgba(10, 12, 18, 0.7)",
              backdropFilter: "blur(12px)",
              borderRadius: "12px",
              padding: "1.75rem clamp(1rem, 2.5vw, 2rem)",
              boxShadow: "none",
            }}
          >
            {LessonComponent ? (
              <>
                <LessonComponent key={lessonId} />

                {references.length > 0 && (
                  <section style={{ marginTop: "2.25rem" }}>
                    <h3
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--on-surface-variant)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        margin: "0 0 0.7rem",
                      }}
                    >
                      References
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      {references.map((ref) => (
                        <a
                          key={ref.href}
                          href={ref.href}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            background: "rgba(8, 9, 13, 0.92)",
                            color: "var(--secondary)",
                            padding: "0.55rem 0.75rem",
                            borderRadius: "0.45rem",
                            textDecoration: "none",
                            fontSize: "0.85rem",
                            lineHeight: 1.45,
                          }}
                        >
                          {ref.label}
                        </a>
                      ))}
                    </div>
                  </section>
                )}
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "300px",
                  gap: "1rem",
                  color: "var(--on-surface-variant)",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "3rem", opacity: 0.3 }}
                >
                  school
                </span>
                <p style={{ fontSize: "1rem", margin: 0 }}>
                  Lesson not found: {lessonId}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <LessonNav
        onPrev={onPrev}
        onNext={onNext}
        onComplete={onComplete}
        hasPrev={hasPrev}
        hasNext={hasNext}
        isCompleted={isCompleted}
        isLast={isLast}
      />
    </div>
  );
}

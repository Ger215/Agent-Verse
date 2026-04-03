"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LessonHeader from "@/components/LessonHeader";

type FieldKey =
  | "name"
  | "description"
  | "disable-model-invocation"
  | "allowed-tools"
  | "effort"
  | "$ARGUMENTS";

interface FieldInfo {
  label: string;
  explanation: string;
  whenToUse: string;
  color: string;
}

const FIELDS: Record<FieldKey, FieldInfo> = {
  name: {
    label: "name",
    explanation:
      "The slash command. This creates /pr-review. Lowercase letters, numbers, hyphens only. Max 64 chars.",
    whenToUse: "Always set it — defaults to the directory name if omitted.",
    color: "var(--secondary)",
  },
  description: {
    label: "description",
    explanation:
      "How Claude decides when to load this skill automatically. Front-load the key use case — descriptions over 250 chars get truncated in listings. This is the most important field.",
    whenToUse:
      "Write it like a trigger: start with the action and context where the skill applies.",
    color: "var(--tertiary)",
  },
  "disable-model-invocation": {
    label: "disable-model-invocation",
    explanation:
      "When false (default), Claude can load this skill automatically. Set to true for workflows with side effects — deploys, commits, messages — where you want to control timing.",
    whenToUse:
      "Any skill that writes, sends, or deploys. You don't want Claude auto-running these.",
    color: "#f59e0b",
  },
  "allowed-tools": {
    label: "allowed-tools",
    explanation:
      "Tools Claude can use without asking permission when this skill is active. Here: Read, Grep, Glob — read-only access.",
    whenToUse:
      "Pre-approve tools the skill needs every time to avoid constant permission prompts.",
    color: "#34d399",
  },
  effort: {
    label: "effort",
    explanation:
      "Reasoning effort for this skill. Options: low, medium, high, max (Opus only). Overrides the session default.",
    whenToUse:
      "Set low for quick lookups; high or max for architectural decisions and complex reviews.",
    color: "#fb923c",
  },
  $ARGUMENTS: {
    label: "$ARGUMENTS",
    explanation:
      "Replaced with whatever you pass after the skill name. /pr-review 123 becomes 'Review the pull request at 123'. If $ARGUMENTS isn't in the content, Claude Code appends it automatically.",
    whenToUse:
      "Use $ARGUMENTS[0], $ARGUMENTS[1] (or $0, $1) for positional access when you need multiple inputs.",
    color: "#f87171",
  },
};

const QUICK_REF_ROWS = [
  { field: "name", default: "directory name", what: "Creates the /slash-command" },
  { field: "description", default: "first paragraph", what: "When Claude auto-loads this skill" },
  { field: "disable-model-invocation", default: "false", what: "Block Claude from auto-invoking" },
  { field: "user-invocable", default: "true", what: "Show/hide from / menu" },
  { field: "allowed-tools", default: "—", what: "Auto-approved tools" },
  { field: "effort", default: "session default", what: "Reasoning level" },
  { field: "context", default: "—", what: "Set fork to run in subagent" },
  { field: "paths", default: "—", what: "Glob patterns to limit activation" },
];

function ClickableField({
  fieldKey,
  children,
  active,
  onClick,
}: {
  fieldKey: FieldKey;
  children: React.ReactNode;
  active: boolean;
  onClick: (k: FieldKey) => void;
}) {
  const info = FIELDS[fieldKey];
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={() => onClick(fieldKey)}
      onKeyDown={(e) => e.key === "Enter" && onClick(fieldKey)}
      style={{
        cursor: "pointer",
        color: active ? info.color : "inherit",
        background: active ? `${info.color}22` : "transparent",
        borderRadius: "3px",
        padding: "0 2px",
        borderBottom: `2px solid ${active ? info.color : info.color + "66"}`,
        transition: "all 0.15s ease",
        outline: "none",
      }}
    >
      {children}
    </span>
  );
}

export default function Skills2() {
  const [active, setActive] = useState<FieldKey | null>(null);

  const toggle = (k: FieldKey) => setActive((prev) => (prev === k ? null : k));

  const hl = (k: FieldKey, text: string) => (
    <ClickableField fieldKey={k} active={active === k} onClick={toggle}>
      {text}
    </ClickableField>
  );

  const activeInfo = active ? FIELDS[active] : null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <LessonHeader
        module="Skills"
        title="Anatomy of a SKILL.md"
        duration="5 min"
        type="interactive"
      />

      <p className="mt-8 text-base leading-7" style={{ color: "var(--on-surface)" }}>
        A SKILL.md has two parts:{" "}
        <strong style={{ color: "var(--secondary)" }}>YAML frontmatter</strong> (between{" "}
        <code
          className="px-1 py-0.5 rounded text-xs font-mono"
          style={{ background: "var(--surface-high)", color: "var(--on-surface)" }}
        >
          ---
        </code>
        ) that configures behavior, and{" "}
        <strong style={{ color: "var(--tertiary)" }}>markdown content</strong> with the actual
        instructions Claude follows. Click any highlighted field to learn what it does.
      </p>

      {/* Interactive explorer */}
      <div
        className="mt-8 rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--outline-variant)" }}
      >
        {/* File tab bar */}
        <div
          className="flex items-center gap-2 px-4 py-2 text-xs font-mono"
          style={{
            background: "var(--surface-highest)",
            borderBottom: "1px solid var(--outline-variant)",
            color: "var(--on-surface-variant)",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "0.875rem" }}>
            description
          </span>
          SKILL.md — click highlighted fields to explore
        </div>

        {/* Code display */}
        <pre
          className="p-5 text-sm font-mono leading-7 overflow-x-auto m-0"
          style={{
            background: "var(--surface-lowest)",
            color: "var(--on-surface-variant)",
          }}
        >
          <span style={{ color: "var(--outline-variant)" }}>{"---\n"}</span>
          {hl("name", "name")}{": pr-review\n"}
          {hl("description", "description")}
          {
            ": Review pull requests for code quality, patterns, and potential issues.\n  Use when asked to review a PR or check code changes.\n"
          }
          {hl("disable-model-invocation", "disable-model-invocation")}{": false\n"}
          {hl("allowed-tools", "allowed-tools")}{": Read Grep Glob\n"}
          {hl("effort", "effort")}{": medium\n"}
          <span style={{ color: "var(--outline-variant)" }}>{"---\n"}</span>
          {"\n"}
          <span style={{ color: "var(--on-surface)" }}>
            {"Review the pull request at "}
          </span>
          {hl("$ARGUMENTS", "$ARGUMENTS")}
          <span style={{ color: "var(--on-surface)" }}>{":\n\n"}</span>
          <span style={{ color: "var(--on-surface-variant)" }}>
            {"1. Check for code quality issues\n"}
            {"2. Verify it follows project conventions\n"}
            {"3. Identify potential bugs or edge cases\n"}
            {"4. Suggest improvements\n\n"}
            {"Be specific — reference file names and line numbers."}
          </span>
        </pre>

        {/* Explanation panel */}
        <AnimatePresence mode="wait">
          {activeInfo && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="px-5 py-4"
              style={{
                background: `${activeInfo.color}10`,
                borderTop: `1px solid ${activeInfo.color}44`,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ background: activeInfo.color, marginTop: "6px", width: "8px", height: "8px", flexShrink: 0, borderRadius: "50%" }}
                />
                <div className="flex flex-col gap-1.5">
                  <code
                    className="text-sm font-mono font-semibold"
                    style={{ color: activeInfo.color }}
                  >
                    {activeInfo.label}
                  </code>
                  <p className="text-sm leading-6 m-0" style={{ color: "var(--on-surface)" }}>
                    {activeInfo.explanation}
                  </p>
                  <p
                    className="text-xs leading-5 m-0"
                    style={{ color: "var(--on-surface-variant)" }}
                  >
                    <span className="font-semibold" style={{ color: activeInfo.color }}>
                      When to use:{" "}
                    </span>
                    {activeInfo.whenToUse}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!activeInfo && (
          <div
            className="flex items-center justify-center gap-2 py-4 text-xs"
            style={{
              borderTop: "1px solid var(--outline-variant)",
              color: "var(--on-surface-variant)",
              opacity: 0.6,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>
              touch_app
            </span>
            Click any underlined field above to see its explanation
          </div>
        )}
      </div>

      {/* Quick reference table */}
      <h2
        className="mt-12 text-lg font-semibold"
        style={{ color: "var(--on-surface)" }}
      >
        Frontmatter quick reference
      </h2>
      <p className="mt-2 text-sm leading-6" style={{ color: "var(--on-surface-variant)" }}>
        All available frontmatter fields and their defaults.
      </p>

      <div
        className="mt-5 rounded-xl overflow-hidden text-sm"
        style={{ border: "1px solid var(--outline-variant)" }}
      >
        {/* Header row */}
        <div
          className="grid px-5 py-2.5 text-xs font-semibold uppercase tracking-wider"
          style={{
            gridTemplateColumns: "1.5fr 1fr 2fr",
            background: "var(--surface-highest)",
            borderBottom: "1px solid var(--outline-variant)",
            color: "var(--on-surface-variant)",
          }}
        >
          <span>Field</span>
          <span>Default</span>
          <span>What it does</span>
        </div>

        {QUICK_REF_ROWS.map((row, i) => (
          <div
            key={row.field}
            className="grid px-5 py-3"
            style={{
              gridTemplateColumns: "1.5fr 1fr 2fr",
              background: i % 2 === 0 ? "var(--surface-low)" : "var(--surface)",
              borderBottom:
                i < QUICK_REF_ROWS.length - 1
                  ? "1px solid var(--outline-variant)"
                  : undefined,
              alignItems: "center",
            }}
          >
            <code
              className="text-xs font-mono"
              style={{ color: "var(--secondary)" }}
            >
              {row.field}
            </code>
            <span
              className="text-xs font-mono"
              style={{ color: "var(--on-surface-variant)" }}
            >
              {row.default}
            </span>
            <span style={{ color: "var(--on-surface-variant)" }}>{row.what}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

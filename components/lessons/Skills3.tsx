"use client";

import { useState } from "react";
import LessonHeader from "@/components/LessonHeader";

interface MatrixRow {
  config: string;
  userCanInvoke: boolean;
  claudeCanInvoke: boolean;
  whenLoaded: string;
}

const MATRIX_ROWS: MatrixRow[] = [
  {
    config: "(default)",
    userCanInvoke: true,
    claudeCanInvoke: true,
    whenLoaded: "Description always in context, full skill loads on invocation",
  },
  {
    config: "disable-model-invocation: true",
    userCanInvoke: true,
    claudeCanInvoke: false,
    whenLoaded: "Description NOT in context",
  },
  {
    config: "user-invocable: false",
    userCanInvoke: false,
    claudeCanInvoke: true,
    whenLoaded: "Description always in context",
  },
];

const BUNDLED_SKILLS = [
  {
    name: "/batch <instruction>",
    desc: "Decomposes large changes into parallel units, spawns one agent per unit in isolated git worktrees, each opens a PR.",
  },
  {
    name: "/simplify [focus]",
    desc: "Reviews recently changed files for quality issues, spawns 3 review agents in parallel.",
  },
  {
    name: "/loop [interval] <prompt>",
    desc: "Runs a prompt repeatedly on an interval — polling a deploy, babysitting a PR.",
  },
  {
    name: "/debug [description]",
    desc: "Enables debug logging for the session, reads the debug log to diagnose issues.",
  },
];

function Check() {
  return (
    <span
      className="material-symbols-outlined"
      style={{ fontSize: "1.125rem", color: "#4ade80" }}
    >
      check_circle
    </span>
  );
}

function Cross() {
  return (
    <span
      className="material-symbols-outlined"
      style={{ fontSize: "1.125rem", color: "#f87171" }}
    >
      cancel
    </span>
  );
}

export default function Skills3() {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <LessonHeader
        module="Skills"
        title="Invocation & Control"
        duration="4 min"
        type="reading"
      />

      {/* Intro */}
      <p className="mt-8 text-base leading-7" style={{ color: "var(--on-surface)" }}>
        By default, both you and Claude can invoke any skill. Two frontmatter fields let you
        restrict this — giving you precise control over when and how each skill activates.
      </p>

      {/* Invocation matrix */}
      <h2
        className="mt-10 text-lg font-semibold"
        style={{ color: "var(--on-surface)" }}
      >
        Invocation matrix
      </h2>
      <p className="mt-2 text-sm leading-6" style={{ color: "var(--on-surface-variant)" }}>
        Click a row to highlight it. The three states cover every combination of who can invoke
        a skill.
      </p>

      <div
        className="mt-5 rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--outline-variant)" }}
      >
        {/* Table header */}
        <div
          className="grid px-5 py-3 text-xs font-semibold uppercase tracking-wider"
          style={{
            gridTemplateColumns: "2fr 1fr 1fr 2fr",
            background: "var(--surface-highest)",
            borderBottom: "1px solid var(--outline-variant)",
            color: "var(--on-surface-variant)",
          }}
        >
          <span>Config</span>
          <span>You</span>
          <span>Claude</span>
          <span>When loaded into context</span>
        </div>

        {MATRIX_ROWS.map((row, i) => (
          <div
            key={i}
            role="button"
            tabIndex={0}
            onClick={() => setActiveRow(activeRow === i ? null : i)}
            onKeyDown={(e) => e.key === "Enter" && setActiveRow(activeRow === i ? null : i)}
            className="grid px-5 py-4 cursor-pointer transition-colors"
            style={{
              gridTemplateColumns: "2fr 1fr 1fr 2fr",
              alignItems: "center",
              background:
                activeRow === i
                  ? "var(--surface-high)"
                  : i % 2 === 0
                  ? "var(--surface-low)"
                  : "var(--surface)",
              borderBottom:
                i < MATRIX_ROWS.length - 1
                  ? "1px solid var(--outline-variant)"
                  : undefined,
              outline: "none",
            }}
          >
            <code
              className="text-xs font-mono"
              style={{
                color:
                  row.config === "(default)"
                    ? "var(--on-surface-variant)"
                    : "var(--secondary)",
              }}
            >
              {row.config}
            </code>
            <div>{row.userCanInvoke ? <Check /> : <Cross />}</div>
            <div>{row.claudeCanInvoke ? <Check /> : <Cross />}</div>
            <span className="text-xs leading-5" style={{ color: "var(--on-surface-variant)" }}>
              {row.whenLoaded}
            </span>
          </div>
        ))}
      </div>

      {/* Two key fields */}
      <h2
        className="mt-12 text-lg font-semibold"
        style={{ color: "var(--on-surface)" }}
      >
        Two key fields explained
      </h2>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* disable-model-invocation */}
        <div
          className="rounded-xl p-5 flex flex-col gap-3"
          style={{
            background: "var(--surface-low)",
            border: "1px solid var(--secondary)",
            borderOpacity: "0.4",
            borderColor: "#ddb7ff44",
          }}
        >
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold w-fit"
            style={{ background: "#ddb7ff18", color: "var(--secondary)" }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "0.875rem" }}
            >
              block
            </span>
            disable-model-invocation: true
          </div>
          <ul className="space-y-2">
            {[
              "Only you can invoke it",
              "Use for: workflows with side effects — /commit, /deploy, /send-slack-message",
              "\"You don't want Claude deciding to deploy because your code looks ready.\"",
            ].map((item, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm leading-5"
                style={{ color: "var(--on-surface-variant)" }}
              >
                <span
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--secondary)", fontSize: "0.5rem", lineHeight: "1.25rem" }}
                >
                  ●
                </span>
                {i === 2 ? (
                  <em style={{ color: "var(--on-surface)", fontStyle: "italic" }}>{item}</em>
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* user-invocable */}
        <div
          className="rounded-xl p-5 flex flex-col gap-3"
          style={{
            background: "var(--surface-low)",
            border: "1px solid #adc6ff44",
          }}
        >
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold w-fit"
            style={{ background: "#adc6ff18", color: "var(--tertiary)" }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "0.875rem" }}
            >
              visibility_off
            </span>
            user-invocable: false
          </div>
          <ul className="space-y-2">
            {[
              "Only Claude can invoke it",
              "Use for: background knowledge that isn't a meaningful user action",
              "Example: a legacy-system-context skill Claude loads when relevant, but /legacy-system-context isn't an action users take",
            ].map((item, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm leading-5"
                style={{ color: "var(--on-surface-variant)" }}
              >
                <span
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--tertiary)", fontSize: "0.5rem", lineHeight: "1.25rem" }}
                >
                  ●
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bundled skills */}
      <h2
        className="mt-12 text-lg font-semibold"
        style={{ color: "var(--on-surface)" }}
      >
        Bundled skills
      </h2>
      <p className="mt-1 text-sm leading-6" style={{ color: "var(--on-surface-variant)" }}>
        These skills ship with every Claude Code session.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {BUNDLED_SKILLS.map((skill) => (
          <div
            key={skill.name}
            className="flex gap-4 rounded-xl px-5 py-4"
            style={{
              background: "var(--surface-low)",
              border: "1px solid var(--outline-variant)",
            }}
          >
            <code
              className="text-xs font-mono shrink-0 pt-0.5"
              style={{ color: "var(--tertiary-container)", minWidth: "160px" }}
            >
              {skill.name}
            </code>
            <span className="text-sm leading-6" style={{ color: "var(--on-surface-variant)" }}>
              {skill.desc}
            </span>
          </div>
        ))}
      </div>

      {/* Arguments */}
      <h2
        className="mt-12 text-lg font-semibold"
        style={{ color: "var(--on-surface)" }}
      >
        Arguments
      </h2>
      <p className="mt-2 text-sm leading-6" style={{ color: "var(--on-surface-variant)" }}>
        <code
          className="px-1.5 py-0.5 rounded text-xs font-mono"
          style={{ background: "var(--surface-high)", color: "#f87171" }}
        >
          $ARGUMENTS
        </code>{" "}
        is replaced with whatever you pass after the skill name.
      </p>

      <div
        className="mt-5 rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--outline-variant)" }}
      >
        <div
          className="grid px-5 py-3 text-xs font-semibold uppercase tracking-wider"
          style={{
            gridTemplateColumns: "1fr 1fr",
            background: "var(--surface-highest)",
            borderBottom: "1px solid var(--outline-variant)",
            color: "var(--on-surface-variant)",
          }}
        >
          <span>You type</span>
          <span>Claude receives</span>
        </div>
        <div
          className="grid px-5 py-4 gap-4 items-center"
          style={{
            gridTemplateColumns: "1fr 1fr",
            background: "var(--surface-low)",
          }}
        >
          <code
            className="text-sm font-mono"
            style={{ color: "var(--tertiary)" }}
          >
            /fix-issue 123
          </code>
          <span className="text-sm leading-5" style={{ color: "var(--on-surface-variant)" }}>
            "Fix GitHub issue{" "}
            <span style={{ color: "#f87171" }}>123</span> following our coding
            standards..."
          </span>
        </div>
      </div>

      <div
        className="mt-4 rounded-xl p-4 text-sm leading-6"
        style={{
          background: "var(--surface-low)",
          border: "1px solid var(--outline-variant)",
          color: "var(--on-surface-variant)",
        }}
      >
        For positional access use{" "}
        <code
          className="px-1 py-0.5 rounded text-xs font-mono"
          style={{ background: "var(--surface-high)", color: "#f87171" }}
        >
          $ARGUMENTS[0]
        </code>
        ,{" "}
        <code
          className="px-1 py-0.5 rounded text-xs font-mono"
          style={{ background: "var(--surface-high)", color: "#f87171" }}
        >
          $ARGUMENTS[1]
        </code>{" "}
        — or the shorthand{" "}
        <code
          className="px-1 py-0.5 rounded text-xs font-mono"
          style={{ background: "var(--surface-high)", color: "#f87171" }}
        >
          $0
        </code>
        ,{" "}
        <code
          className="px-1 py-0.5 rounded text-xs font-mono"
          style={{ background: "var(--surface-high)", color: "#f87171" }}
        >
          $1
        </code>
        . If{" "}
        <code
          className="px-1 py-0.5 rounded text-xs font-mono"
          style={{ background: "var(--surface-high)", color: "#f87171" }}
        >
          $ARGUMENTS
        </code>{" "}
        isn't present in the skill content, Claude Code appends it automatically.
      </div>
    </div>
  );
}

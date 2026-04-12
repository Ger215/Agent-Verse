import LessonHeader from "@/components/LessonHeader";

export default function Skills1() {
  return (
    <div className="lesson-shell">
      <LessonHeader
        module="Skills"
        title="What are Skills?"
        duration="4 min"
        type="reading"
      />

      <p
        className="mt-8 text-base leading-7"
        style={{ color: "var(--on-surface)" }}
      >
        Skills extend what Claude can do beyond its built-in capabilities, you
        create a{" "}
        <code
          className="px-1.5 py-0.5 rounded text-sm font-mono"
          style={{
            background: "var(--surface-high)",
            color: "var(--secondary)",
          }}
        >
          SKILL.md
        </code>{" "}
        file with a set of instructions, then Claude loads it automatically when
        needed or on trigger words, or you invoke it explicitly with{" "}
        <code
          className="px-1.5 py-0.5 rounded text-sm font-mono"
          style={{
            background: "var(--surface-high)",
            color: "var(--tertiary)",
          }}
        >
          /skill-name
        </code>
        , think of it as giving Claude a specialized playbook for any recurring
        task in your workflow.
      </p>

      <h2
        className="mt-12 text-lg font-semibold"
        style={{ color: "var(--on-surface)" }}
      >
        Two types of skill content
      </h2>
      <p
        className="mt-2 text-sm leading-6"
        style={{ color: "var(--on-surface-variant)" }}
      >
        Not all skills are used the same way, the content of your{" "}
        <code
          className="px-1.5 py-0.5 rounded text-sm font-mono"
          style={{
            background: "var(--surface-high)",
            color: "var(--secondary)",
          }}
        >
          SKILL.md
        </code>{" "}
        determines how Claude treats it
      </p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className="rounded-xl p-5 flex flex-col gap-3"
          style={{
            background: "var(--surface-low)",
            border: "1px solid var(--outline-variant)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "1.125rem", color: "var(--secondary)" }}
            >
              menu_book
            </span>
            <span
              className="font-semibold text-sm"
              style={{ color: "var(--on-surface)" }}
            >
              Reference
            </span>
          </div>
          <p
            className="text-xs leading-5"
            style={{ color: "var(--on-surface-variant)" }}
          >
            Knowledge Claude applies inline, conventions, style guides, naming
            rules this type of skills are Auto-loaded when relevant based on the
            description.
          </p>
          <pre
            className="rounded-lg p-3 text-xs leading-5 font-mono overflow-x-auto"
            style={{
              background: "var(--surface-lowest)",
              color: "var(--on-surface-variant)",
            }}
          >{`---
name: code-style
description: Project coding
  conventions and patterns.
---

Always use named exports.
Prefer const over let.`}</pre>
        </div>

        <div
          className="rounded-xl p-5 flex flex-col gap-3"
          style={{
            background: "var(--surface-low)",
            border: "1px solid var(--outline-variant)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "1.125rem", color: "var(--tertiary)" }}
            >
              task_alt
            </span>
            <span
              className="font-semibold text-sm"
              style={{ color: "var(--on-surface)" }}
            >
              Task
            </span>
          </div>
          <p
            className="text-xs leading-5"
            style={{ color: "var(--on-surface-variant)" }}
          >
            Step-by-step for specific repetitive actions, usually triggered manually with{" "}
            <code className="font-mono" style={{ color: "var(--tertiary)" }}>
              /skill-name
            </code>
          </p>
          <pre
            className="rounded-lg p-3 text-xs leading-5 font-mono overflow-x-auto"
            style={{
              background: "var(--surface-lowest)",
              color: "var(--on-surface-variant)",
            }}
          >{`---
name: deploy
disable-model-invocation:
  true
---

1. Run tests
2. Build assets
3. Push to staging`}</pre>
        </div>
      </div>

      <h2
        className="mt-12 text-lg font-semibold"
        style={{ color: "var(--on-surface)" }}
      >
        Where skills live
      </h2>
      <p
        className="mt-2 text-sm leading-6"
        style={{ color: "var(--on-surface-variant)" }}
      >
        Skills are scoped by location, a skill found at a more specific scope
        takes precedence over broader ones.
      </p>

      <div
        className="mt-5 rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--outline-variant)" }}
      >
        {[
          {
            dot: "var(--secondary)",
            scope: "Enterprise",
            path: "Managed settings",
            applies: "All users in your org",
          },
          {
            dot: "var(--tertiary)",
            scope: "Personal",
            path: "~/.claude/skills/<name>/SKILL.md",
            applies: "All your projects",
          },
          {
            dot: "#4ade80",
            scope: "Project",
            path: ".claude/skills/<name>/SKILL.md",
            applies: "This project only",
          },
          {
            dot: "#fb923c",
            scope: "Plugin",
            path: "<plugin>/skills/<name>/SKILL.md",
            applies: "Where plugin is enabled",
          },
        ].map((row, i, arr) => (
          <div
            key={i}
            className="skills-scope-row px-5 py-4 text-sm"
            style={{
              background: i % 2 === 0 ? "var(--surface-low)" : "var(--surface)",
              borderBottom:
                i < arr.length - 1
                  ? "1px solid var(--outline-variant)"
                  : undefined,
            }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{
                  background: row.dot,
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
              />
              <span
                className="font-medium"
                style={{ color: "var(--on-surface)" }}
              >
                {row.scope}
              </span>
            </div>
            <code
              className="text-xs font-mono self-center"
              style={{ color: "var(--on-surface-variant)" }}
            >
              {row.path}
            </code>
            <span style={{ color: "var(--on-surface-variant)" }}>
              {row.applies}
            </span>
          </div>
        ))}
      </div>

      <h2
        className="mt-12 text-lg font-semibold"
        style={{ color: "var(--on-surface)" }}
      >
        Skill directory structure
      </h2>
      <p
        className="mt-2 text-sm leading-6"
        style={{ color: "var(--on-surface-variant)" }}
      >
        A skill is a directory, not just a file, supporting files keep the
        instructions focused and the skill self-contained.
      </p>

      <pre
        className="mt-5 rounded-xl p-5 text-sm font-mono leading-6 overflow-x-auto"
        style={{
          background: "var(--surface-lowest)",
          border: "1px solid var(--outline-variant)",
          color: "var(--on-surface-variant)",
        }}
      >
        <span style={{ color: "var(--on-surface)" }}>{"my-skill/"}</span>
        {"\n"}
        <span style={{ color: "var(--tertiary)" }}>{"├── SKILL.md"}</span>
        {"           # Main instructions (required)\n"}
        {"├── template.md        # Template for Claude to fill in\n"}
        {"├── examples/\n"}
        {"│   └── sample.md      # Example output\n"}
        {"└── scripts/\n"}
        {"    └── validate.sh    # Script Claude can run"}
      </pre>
    </div>
  );
}

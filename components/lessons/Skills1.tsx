import LessonHeader from "@/components/LessonHeader";

export default function Skills1() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <LessonHeader
        module="Skills"
        title="What are Skills?"
        duration="4 min"
        type="reading"
      />

      {/* Intro */}
      <p className="mt-8 text-base leading-7" style={{ color: "var(--on-surface)" }}>
        Skills extend what Claude can do beyond its built-in capabilities. You create a{" "}
        <code
          className="px-1.5 py-0.5 rounded text-sm font-mono"
          style={{ background: "var(--surface-high)", color: "var(--secondary)" }}
        >
          SKILL.md
        </code>{" "}
        file with a set of instructions — Claude loads it automatically when relevant, or you
        invoke it explicitly with{" "}
        <code
          className="px-1.5 py-0.5 rounded text-sm font-mono"
          style={{ background: "var(--surface-high)", color: "var(--tertiary)" }}
        >
          /skill-name
        </code>
        . Think of it as giving Claude a specialized playbook for any recurring task in your
        workflow.
      </p>

      {/* Skills vs built-in commands callout */}
      <div
        className="mt-8 rounded-r-xl p-5"
        style={{
          borderLeft: "4px solid var(--secondary)",
          background: "var(--surface-low)",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "var(--secondary)" }}
        >
          Skills vs built-in commands
        </p>
        <ul className="space-y-2.5">
          {[
            <>
              Built-in commands like{" "}
              <code
                className="px-1 py-0.5 rounded text-xs font-mono"
                style={{ background: "var(--surface-high)", color: "var(--on-surface)" }}
              >
                /compact
              </code>{" "}
              execute fixed, hard-coded logic — no flexibility.
            </>,
            "Skills are prompt-based — you give Claude a playbook and let it orchestrate using its own tools.",
            "A skill can spawn parallel agents, read files, and adapt dynamically to your codebase.",
            <>
              Existing{" "}
              <code
                className="px-1 py-0.5 rounded text-xs font-mono"
                style={{ background: "var(--surface-high)", color: "var(--on-surface)" }}
              >
                .claude/commands/
              </code>{" "}
              files keep working — skills are a superset, not a replacement.
            </>,
          ].map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm leading-6"
              style={{ color: "var(--on-surface-variant)" }}
            >
              <span
                className="mt-0.5 shrink-0 material-symbols-outlined text-base"
                style={{ color: "var(--secondary)", fontSize: "1rem" }}
              >
                arrow_forward
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Two types of skill content */}
      <h2
        className="mt-12 text-lg font-semibold"
        style={{ color: "var(--on-surface)" }}
      >
        Two types of skill content
      </h2>
      <p className="mt-2 text-sm leading-6" style={{ color: "var(--on-surface-variant)" }}>
        Not all skills are used the same way. The content of your SKILL.md determines how Claude
        treats it.
      </p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Reference */}
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
            <span className="font-semibold text-sm" style={{ color: "var(--on-surface)" }}>
              Reference
            </span>
          </div>
          <p className="text-xs leading-5" style={{ color: "var(--on-surface-variant)" }}>
            Knowledge Claude applies inline — conventions, style guides, naming rules.
            Auto-loaded when relevant based on the description.
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

        {/* Task */}
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
            <span className="font-semibold text-sm" style={{ color: "var(--on-surface)" }}>
              Task
            </span>
          </div>
          <p className="text-xs leading-5" style={{ color: "var(--on-surface-variant)" }}>
            Step-by-step for specific actions. Usually triggered manually with{" "}
            <code className="font-mono" style={{ color: "var(--tertiary)" }}>
              /name
            </code>
            . Great for workflows with side effects.
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

      {/* Where skills live */}
      <h2
        className="mt-12 text-lg font-semibold"
        style={{ color: "var(--on-surface)" }}
      >
        Where skills live
      </h2>
      <p className="mt-2 text-sm leading-6" style={{ color: "var(--on-surface-variant)" }}>
        Skills are scoped by location. A skill found at a more specific scope takes precedence
        over broader ones.
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
            className="grid gap-4 px-5 py-4 text-sm"
            style={{
              gridTemplateColumns: "1fr 2fr 1fr",
              background:
                i % 2 === 0 ? "var(--surface-low)" : "var(--surface)",
              borderBottom:
                i < arr.length - 1
                  ? "1px solid var(--outline-variant)"
                  : undefined,
            }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: row.dot, width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0 }}
              />
              <span className="font-medium" style={{ color: "var(--on-surface)" }}>
                {row.scope}
              </span>
            </div>
            <code
              className="text-xs font-mono self-center"
              style={{ color: "var(--on-surface-variant)" }}
            >
              {row.path}
            </code>
            <span style={{ color: "var(--on-surface-variant)" }}>{row.applies}</span>
          </div>
        ))}
      </div>

      {/* Directory structure */}
      <h2
        className="mt-12 text-lg font-semibold"
        style={{ color: "var(--on-surface)" }}
      >
        Skill directory structure
      </h2>
      <p className="mt-2 text-sm leading-6" style={{ color: "var(--on-surface-variant)" }}>
        A skill is a directory, not just a file. Supporting files keep the instructions focused
        and the skill self-contained.
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

      <p className="mt-4 text-xs leading-5" style={{ color: "var(--on-surface-variant)" }}>
        <span
          className="inline-flex items-center gap-1 font-medium"
          style={{ color: "var(--secondary)" }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "0.875rem" }}>
            info
          </span>
          Only SKILL.md is required.
        </span>{" "}
        Supporting files keep the skill focused — reference them from SKILL.md when Claude
        needs them.
      </p>
    </div>
  );
}

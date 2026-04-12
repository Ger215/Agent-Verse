import LessonHeader from '@/components/LessonHeader'
import CalloutBox from '@/components/CalloutBox'
import CodeBlock from '@/components/CodeBlock'

const phases = [
  {
    name: 'Explore',
    goal: 'Understand the problem and constraints before committing to implementation',
  },
  {
    name: 'Propose',
    goal: 'Define intent, scope, and expected impact of the change',
  },
  {
    name: 'Spec + Design',
    goal: 'Write requirements and technical design so implementation has clear acceptance criteria',
  },
  {
    name: 'Implement',
    goal: 'Break work into execution steps and implement in focused batches',
  },
  {
    name: 'Verify',
    goal: 'Validate against spec, if the work made corresponds to the original intent and meets the acceptance criteria',
  },
]

const levels = [
  {
    name: 'Spec-first',
    detail: 'Write specs before coding with AI, but treat them as temporary task artifacts.',
  },
  {
    name: 'Spec-anchored',
    detail: 'Keep specs after delivery and evolve them with the feature over time.',
  },
  {
    name: 'Spec-as-source',
    detail: 'Specs become the primary artifact; code is generated and humans mostly edit specs.',
  },
]

export default function Agents5() {
  return (
    <div className="lesson-shell">
      <LessonHeader module="Agents" title="Spec-Driven Development (SDD)" duration="6 min" type="reading" />

      <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '1.0625rem' }}>
        SDD is how you make autonomous coding agents predictable, instead of jumping directly into edits, you force an
        explicit sequence: explore, propose, specify, design, implement, verify.
      </p>
      <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.0625rem' }}>
        The result is lower rework, clearer collaboration, and fewer accidental regressions when tasks get large.
      </p>

      <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        SDD Levels (Fowler / Thoughtworks)
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
        {levels.map(level => (
          <div key={level.name} style={{ background: 'var(--surface-low)', borderRadius: '0.6rem', padding: '0.85rem 1rem' }}>
            <p style={{ margin: 0, color: 'var(--on-surface)', fontWeight: 600, fontSize: '0.92rem' }}>{level.name}</p>
            <p style={{ margin: '0.3rem 0 0', color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              {level.detail}
            </p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        SDD Lifecycle
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
        {phases.map((phase, i) => (
          <div
            key={phase.name}
            style={{
              background: 'var(--surface-low)',
              borderRadius: '0.6rem',
              padding: '0.85rem 1rem',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: '999px',
                background: 'var(--surface-highest)',
                color: 'var(--on-surface-variant)',
                fontSize: '0.72rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              {i + 1}
            </span>
            <div>
              <p style={{ margin: 0, color: 'var(--on-surface)', fontWeight: 600, fontSize: '0.92rem' }}>{phase.name}</p>
              <p style={{ margin: '0.25rem 0 0', color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                {phase.goal}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        Command Flow
      </p>
      <CodeBlock
        language="bash"
        code={`/sdd-init
/sdd-new improve-auth-flow
/sdd-ff improve-auth-flow
/sdd-apply improve-auth-flow
/sdd-verify improve-auth-flow
/sdd-archive improve-auth-flow`}
      />

      <CalloutBox variant="tip">
        Use SDD for changes that are ambiguous, risky, or cross multiple files, for tiny fixes, direct prompting is
        usually faster.
      </CalloutBox>

      <CalloutBox variant="warning">
        Key caution mentioned by Martin Fowler: A rigid SDD workflow does not fit every problem size, if spec overhead becomes
        heavier than the change itself, scale the process down.
      </CalloutBox>
    </div>
  )
}

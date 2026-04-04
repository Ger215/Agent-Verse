import LessonHeader from '@/components/LessonHeader'
import CalloutBox from '@/components/CalloutBox'

const rtkSavings = [
  { operation: 'ls / tree', standard: '~2,000', rtk: '~400', savings: '-80%' },
  { operation: 'cat / read', standard: '~40,000', rtk: '~12,000', savings: '-70%' },
  { operation: 'git status', standard: '~3,000', rtk: '~600', savings: '-80%' },
  { operation: 'test runners', standard: '~25,000', rtk: '~2,500', savings: '-90%' },
]

const problems = [
  {
    icon: 'data_loss_prevention',
    title: 'Context Bloat',
    desc: 'Raw shell output is noisy. Large logs, diffs, and test output consume context that should be used for reasoning.',
    color: '#f87171',
  },
  {
    icon: 'payments',
    title: 'Higher Cost',
    desc: 'Token-heavy workflows directly increase spend, repeating verbose commands all day multiplies that cost fast.',
    color: '#f59e0b',
  },
  {
    icon: 'hourglass',
    title: 'Slower Iteration',
    desc: 'More tokens means slower responses and slower debugging loops, so productivity drops when each step takes longer.',
    color: '#ddb7ff',
  },
]

export default function Tokens1() {
  return (
    <>
      <LessonHeader module="Token Optimization" title="Why RTK" duration="4 min" type="reading" />

      <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--on-surface)', marginBottom: '1.5rem' }}>
        RTK (Rust Token Killer) is a Rust CLI proxy that compresses command output before it reaches the LLM context.
      </p>

      {/* Token equivalencies */}
      <div
        style={{
          background: 'var(--surface-low)',
          borderRadius: '10px',
          padding: '1.25rem',
          marginBottom: '2rem',
          border: '1px solid rgba(70,69,84,0.15)',
        }}
      >
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--on-surface-variant)', margin: '0 0 1rem' }}>
          RTK Snapshot
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[
            { tokens: 'Rust binary', equals: 'single executable', icon: 'memory' },
            { tokens: '100+ commands', equals: 'supported rewrites', icon: 'terminal' },
            { tokens: '<10ms', equals: 'reported overhead', icon: 'bolt' },
          ].map(item => (
            <div
              key={item.tokens}
              style={{
                textAlign: 'center',
                padding: '1rem',
                background: 'var(--surface-high)',
                borderRadius: '8px',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: '#4d8eff', display: 'block', marginBottom: '0.5rem' }}>
                {item.icon}
              </span>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '0.25rem' }}>
                 {item.tokens}
               </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)' }}>{item.equals}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RTK savings table */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--on-surface)', margin: '2rem 0 1rem', letterSpacing: '-0.02em' }}>
        Typical Savings by Command
      </h2>

      <div style={{ border: '1px solid rgba(70,69,84,0.2)', borderRadius: '10px', overflow: 'hidden', marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 0.8fr', background: 'var(--surface-high)', padding: '0.75rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--on-surface-variant)' }}>
          <div>Operation</div>
          <div>Standard</div>
          <div>RTK</div>
          <div>Savings</div>
        </div>
        {rtkSavings.map((row, i) => (
          <div
            key={row.operation}
            style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 0.8fr', padding: '0.75rem 1.25rem', borderTop: '1px solid rgba(70,69,84,0.1)', background: i % 2 === 0 ? 'transparent' : 'var(--surface-low)' }}
          >
            <div style={{ fontSize: '0.875rem', color: 'var(--on-surface)', fontWeight: 500 }}>{row.operation}</div>
            <div style={{ fontSize: '0.875rem', color: '#fca5a5', fontFamily: 'ui-monospace, monospace' }}>{row.standard}</div>
            <div style={{ fontSize: '0.875rem', color: '#86efac', fontFamily: 'ui-monospace, monospace' }}>{row.rtk}</div>
            <div style={{ fontSize: '0.875rem', color: '#34d399', fontWeight: 700 }}>{row.savings}</div>
          </div>
        ))}
      </div>

      {/* Three problems */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--on-surface)', margin: '2rem 0 1rem', letterSpacing: '-0.02em' }}>
        The Three Problems
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {problems.map(p => (
          <div
            key={p.title}
            style={{
              display: 'flex',
              gap: '1rem',
              padding: '1.25rem',
              background: 'var(--surface-low)',
              border: `1px solid ${p.color}22`,
              borderRadius: '8px',
              alignItems: 'flex-start',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: p.color, flexShrink: 0 }}>
              {p.icon}
            </span>
            <div>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: p.color, margin: '0 0 0.25rem' }}>{p.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', margin: 0, lineHeight: 1.65 }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

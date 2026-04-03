import LessonHeader from '@/components/LessonHeader'
import CalloutBox from '@/components/CalloutBox'

const useCases = [
  { session: 'Track conversation history', persistent: 'User preferences & settings' },
  { session: 'Temporary task state', persistent: 'Long-term knowledge base' },
  { session: 'Current request context', persistent: 'Past decisions & outcomes' },
  { session: 'Active tool results', persistent: 'Cross-session learning' },
]

export default function Memory1() {
  return (
    <>
      <LessonHeader module="Memory Systems" title="Session vs Persistent" duration="5 min" type="reading" />

      <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--on-surface)', marginBottom: '1.5rem' }}>
        Agents need to remember things. But not all memory is the same — where data is stored and how long it lasts
        determines how an agent can use it.
      </p>

      {/* Two-column comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        {/* Session */}
        <div
          style={{
            background: 'var(--surface-low)',
            border: '1px solid rgba(70,69,84,0.2)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '1rem 1.25rem',
              background: '#4d8eff12',
              borderBottom: '1px solid #4d8eff22',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: '#4d8eff' }}>memory_alt</span>
            <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--on-surface)' }}>Session Memory</span>
          </div>
          <div style={{ padding: '1.25rem' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.625rem',
                background: '#4d8eff18',
                borderRadius: '100px',
                fontSize: '0.75rem',
                color: '#4d8eff',
                marginBottom: '0.75rem',
              }}
            >
              Like RAM
            </div>
            <ul style={{ margin: 0, padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {['Fast access', 'Temporary — lost on session end', 'Holds current conversation', 'No setup required'].map(item => (
                <li key={item} style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Persistent */}
        <div
          style={{
            background: 'var(--surface-low)',
            border: '1px solid rgba(70,69,84,0.2)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '1rem 1.25rem',
              background: '#ddb7ff12',
              borderBottom: '1px solid #ddb7ff22',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: '#ddb7ff' }}>storage</span>
            <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--on-surface)' }}>Persistent Memory</span>
          </div>
          <div style={{ padding: '1.25rem' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.625rem',
                background: '#ddb7ff18',
                borderRadius: '100px',
                fontSize: '0.75rem',
                color: '#ddb7ff',
                marginBottom: '0.75rem',
              }}
            >
              Like a Hard Drive
            </div>
            <ul style={{ margin: 0, padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {['Slower retrieval', 'Survives restarts', 'Stores long-term knowledge', 'Requires indexing/DB'].map(item => (
                <li key={item} style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <CalloutBox variant="tip">
        Session memory is what you hold in your head during a conversation. Persistent memory is your notebook.
      </CalloutBox>

      {/* Use cases table */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--on-surface)', margin: '2rem 0 1rem', letterSpacing: '-0.02em' }}>
        When to Use Each
      </h2>

      <div
        style={{
          border: '1px solid rgba(70,69,84,0.2)',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'var(--surface-high)',
            padding: '0.75rem 1.25rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--on-surface-variant)',
          }}
        >
          <div>Session</div>
          <div>Persistent</div>
        </div>
        {useCases.map((row, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              padding: '0.75rem 1.25rem',
              borderTop: '1px solid rgba(70,69,84,0.1)',
              background: i % 2 === 0 ? 'transparent' : 'var(--surface-low)',
            }}
          >
            <div style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)' }}>{row.session}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)' }}>{row.persistent}</div>
          </div>
        ))}
      </div>
    </>
  )
}

import LessonHeader from '@/components/LessonHeader'
import CalloutBox from '@/components/CalloutBox'

const contextLimits = [
  { model: 'GPT-3.5', limit: '16K tokens', words: '~12K words' },
  { model: 'Claude Sonnet', limit: '200K tokens', words: '~150K words' },
  { model: 'GPT-4o', limit: '128K tokens', words: '~96K words' },
  { model: 'Llama 3', limit: '128K tokens', words: '~96K words' },
]

const problems = [
  {
    icon: 'data_loss_prevention',
    title: 'Context Overflow',
    desc: 'When the context window fills, the model loses access to earlier information — like forgetting the start of a conversation.',
    color: '#f87171',
  },
  {
    icon: 'payments',
    title: 'High Cost',
    desc: 'Most AI providers charge per token. Long contexts = expensive operations, especially at scale with many concurrent agents.',
    color: '#f59e0b',
  },
  {
    icon: 'hourglass_slow',
    title: 'Slow Inference',
    desc: 'The longer the context, the longer the model takes to process it. Performance degrades as context grows.',
    color: '#ddb7ff',
  },
]

export default function Tokens1() {
  return (
    <>
      <LessonHeader module="Token Optimization" title="Why Tokens Matter" duration="4 min" type="reading" />

      <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--on-surface)', marginBottom: '1.5rem' }}>
        Every AI model has a token limit — the maximum amount of text it can process at once. Tokens are roughly words
        or word-pieces: on average, 1 token ≈ ¾ of a word.
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
          Token Reference
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[
            { tokens: '1K', equals: '~750 words', icon: 'article' },
            { tokens: '10K', equals: '~7,500 words', icon: 'book' },
            { tokens: '100K', equals: '~75,000 words', icon: 'library_books' },
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
                {item.tokens} tokens
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)' }}>{item.equals}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Context limits table */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--on-surface)', margin: '2rem 0 1rem', letterSpacing: '-0.02em' }}>
        Context Limits by Model
      </h2>

      <div style={{ border: '1px solid rgba(70,69,84,0.2)', borderRadius: '10px', overflow: 'hidden', marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'var(--surface-high)', padding: '0.75rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--on-surface-variant)' }}>
          <div>Model</div>
          <div>Limit</div>
          <div>Equivalent</div>
        </div>
        {contextLimits.map((row, i) => (
          <div
            key={row.model}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '0.75rem 1.25rem', borderTop: '1px solid rgba(70,69,84,0.1)', background: i % 2 === 0 ? 'transparent' : 'var(--surface-low)' }}
          >
            <div style={{ fontSize: '0.875rem', color: 'var(--on-surface)', fontWeight: 500 }}>{row.model}</div>
            <div style={{ fontSize: '0.875rem', color: '#4d8eff', fontFamily: 'ui-monospace, monospace' }}>{row.limit}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)' }}>{row.words}</div>
          </div>
        ))}
      </div>

      <CalloutBox variant="warning">
        As agents work through long tasks, context grows. Hitting the limit means losing information or failing entirely.
      </CalloutBox>

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

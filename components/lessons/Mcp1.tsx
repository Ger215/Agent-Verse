import LessonHeader from '@/components/LessonHeader'
import CalloutBox from '@/components/CalloutBox'

const principles = [
  {
    icon: 'handshake',
    title: 'Standardized',
    desc: 'One protocol for all model integrations. No more custom glue code for every pair of components.',
    color: '#4d8eff',
  },
  {
    icon: 'extension',
    title: 'Modular',
    desc: 'Swap models, memories, or tools independently. Each piece has a well-defined interface.',
    color: '#ddb7ff',
  },
  {
    icon: 'expand',
    title: 'Scalable',
    desc: 'Add new capabilities without rewriting everything. Extend the system by adding new MCP-compliant modules.',
    color: '#34d399',
  },
]

export default function Mcp1() {
  return (
    <>
      <LessonHeader module="MCP Protocol" title="Context Flow Explained" duration="5 min" type="reading" />

      <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--on-surface)', marginBottom: '1.5rem' }}>
        MCP (Model Context Protocol) is a standard that defines how context — memory, tools, instructions — flows
        between different parts of an AI system.
      </p>

      {/* Before / After */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--on-surface)', margin: '2rem 0 1rem', letterSpacing: '-0.02em' }}>
        Before vs After MCP
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        {/* Before */}
        <div
          style={{
            background: 'var(--surface-low)',
            border: '1px solid rgba(70,69,84,0.2)',
            borderRadius: '10px',
            padding: '1.25rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f87171', marginBottom: '1rem' }}>
            Before MCP
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['Model A', 'Model B', 'Model C'].map(m => (
              <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ padding: '0.25rem 0.5rem', background: '#f8717133', border: '1px solid #f8717144', borderRadius: '4px', fontSize: '0.75rem', color: '#f87171', flexShrink: 0 }}>
                  {m}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--outline-variant)' }}>↔ custom integration ↔</span>
                <div style={{ padding: '0.25rem 0.5rem', background: '#f8717133', border: '1px solid #f8717144', borderRadius: '4px', fontSize: '0.75rem', color: '#f87171', flexShrink: 0 }}>
                  Tool
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', marginTop: '1rem', marginBottom: 0, lineHeight: 1.6 }}>
            Every pair of components needs its own custom integration. N×M connections = chaos.
          </p>
        </div>

        {/* After */}
        <div
          style={{
            background: 'var(--surface-low)',
            border: '1px solid rgba(70,69,84,0.2)',
            borderRadius: '10px',
            padding: '1.25rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#34d399', marginBottom: '1rem' }}>
            After MCP
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
            <div style={{ display: 'flex', gap: '0.375rem' }}>
              {['Model A', 'Model B', 'Model C'].map(m => (
                <div key={m} style={{ padding: '0.25rem 0.5rem', background: '#34d39922', border: '1px solid #34d39944', borderRadius: '4px', fontSize: '0.6875rem', color: '#34d399' }}>
                  {m}
                </div>
              ))}
            </div>
            <div style={{ width: '1px', height: '16px', background: '#34d39944' }} />
            <div style={{ padding: '0.375rem 1rem', background: '#4d8eff22', border: '1px solid #4d8eff66', borderRadius: '6px', fontSize: '0.8125rem', fontWeight: 700, color: '#4d8eff' }}>
              MCP
            </div>
            <div style={{ width: '1px', height: '16px', background: '#34d39944' }} />
            <div style={{ display: 'flex', gap: '0.375rem' }}>
              {['Memory', 'Tools', 'Instructions'].map(c => (
                <div key={c} style={{ padding: '0.25rem 0.5rem', background: '#34d39922', border: '1px solid #34d39944', borderRadius: '4px', fontSize: '0.6875rem', color: '#34d399' }}>
                  {c}
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', marginTop: '1rem', marginBottom: 0, lineHeight: 1.6 }}>
            One standard protocol. Plug any model to any tool — no custom code.
          </p>
        </div>
      </div>

      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--on-surface)', margin: '2rem 0 1rem', letterSpacing: '-0.02em' }}>
        Three Principles
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {principles.map(p => (
          <div
            key={p.title}
            style={{
              display: 'flex',
              gap: '1rem',
              padding: '1.25rem',
              background: 'var(--surface-low)',
              border: '1px solid rgba(70,69,84,0.15)',
              borderRadius: '8px',
              alignItems: 'flex-start',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: p.color, flexShrink: 0 }}>
              {p.icon}
            </span>
            <div>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--on-surface)', margin: '0 0 0.25rem' }}>{p.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', margin: 0, lineHeight: 1.65 }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <CalloutBox variant="info">
        MCP is to AI systems what HTTP is to the web — a shared protocol that lets heterogeneous components communicate.
      </CalloutBox>
    </>
  )
}

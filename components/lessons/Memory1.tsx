import LessonHeader from '@/components/LessonHeader'
import CalloutBox from '@/components/CalloutBox'

const useCases = [
  { session: 'Current prompt and temporary state', persistent: 'Saved observations with What/Why/Where/Learned' },
  { session: 'One conversation context window', persistent: 'Cross-session recall via full-text search' },
  { session: 'Ephemeral tool output', persistent: 'Structured session summaries' },
  { session: 'Local reasoning only', persistent: 'Project-scoped memory for teams and agents' },
]

export default function Memory1() {
  return (
    <>
      <LessonHeader module="Engram" title="Why Engram" duration="5 min" type="reading" />

      <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--on-surface)', marginBottom: '1.5rem' }}>
        Engram is a persistent memory system for coding agents, it stores important information in SQLite with FTS5 search,
        and exposes that memory through MCP tools so agents can recover context after session resets.
      </p>

      <a
        href="https://github.com/Gentleman-Programming/engram"
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'block',
          textDecoration: 'none',
          background: 'var(--surface-lowest)',
          border: '1px solid rgba(70,69,84,0.2)',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '2rem',
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src="https://opengraph.githubassets.com/1/Gentleman-Programming/engram"
            alt="Engram GitHub preview"
            style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block', background: '#0b0c10', filter: 'brightness(0.58) saturate(0.9) contrast(1.05)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.28), rgba(0,0,0,0.42))' }} />
        </div>
        <div style={{ padding: '0.85rem 0.95rem', display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '0.2rem' }}>Gentleman-Programming/engram</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>Persistent memory for coding agents: MCP server, CLI, HTTP API, and TUI.</div>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#93c5fd', flexShrink: 0 }}>Open repo -&gt;</span>
        </div>
      </a>

      <div className="lesson-card-grid-2" style={{ marginBottom: '2rem' }}>
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
            <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--on-surface)' }}>Session Context</span>
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
              {['Fast access', 'Temporary and volatile', 'Holds only current conversation', 'Resets on compaction/session end'].map(item => (
                <li key={item} style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

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
            <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--on-surface)' }}>Engram Persistent Memory</span>
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
              {['FTS5-powered retrieval', 'Survives restarts and compaction', 'Project and session organization', 'MCP tools for save/search/summaries'].map(item => (
                <li key={item} style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <CalloutBox variant="tip">
        Session context is your short-term memory, Engram is the long-term notebook your agent can query anytime.
      </CalloutBox>

      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--on-surface)', margin: '2rem 0 1rem', letterSpacing: '-0.02em' }}>
        Core Engram Tools
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
        {[
          { name: 'mem_save', use: 'Save a structured observation' },
          { name: 'mem_search', use: 'Find relevant past context' },
          { name: 'mem_get_observation', use: 'Read full observation by ID' },
          { name: 'mem_context', use: 'Load recent session memory' },
          { name: 'mem_session_summary', use: 'Persist end-of-session summary' },
          { name: 'mem_update', use: 'Refine an existing memory item' },
        ].map(tool => (
          <div key={tool.name} style={{ background: 'var(--surface-low)', border: '1px solid rgba(70,69,84,0.2)', borderRadius: '8px', padding: '0.75rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#93c5fd', marginBottom: '0.35rem', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>
              {tool.name}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>{tool.use}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--on-surface)', margin: '2rem 0 1rem', letterSpacing: '-0.02em' }}>
        When to Use Each
      </h2>

      <div className="lesson-table-scroll" style={{ marginBottom: '2rem' }}>
        <div
          className="lesson-table-2"
          style={{
            border: '1px solid rgba(70,69,84,0.2)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <div
            className="lesson-table-header"
            style={{
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
            <div>Engram</div>
          </div>
        {useCases.map((row, i) => (
          <div
            key={i}
            className="lesson-table-row"
            style={{
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
      </div>
    </>
  )
}

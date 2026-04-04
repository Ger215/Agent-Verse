'use client'

import { useState } from 'react'
import LessonHeader from '@/components/LessonHeader'
import CodeBlock from '@/components/CodeBlock'
import CalloutBox from '@/components/CalloutBox'

const presetQueries = [
  'How do we save architecture decisions?',
  'Show recent session summary',
  'Find bugfix context for auth',
]

const flowSteps = [
  {
    id: 'context',
    title: 'Load Context',
    command: 'mem_context(project: "agent-verse")',
    note: 'Gets recent sessions first, fast and cheap.',
  },
  {
    id: 'search',
    title: 'Search Memory',
    command: 'mem_search(query: <topic>, project: "agent-verse")',
    note: 'Uses SQLite + FTS5 to find relevant memories.',
  },
  {
    id: 'get',
    title: 'Get Full Record',
    command: 'mem_get_observation(id: <from search>)',
    note: 'Search results are short previews, fetch full detail before acting.',
  },
  {
    id: 'save',
    title: 'Save New Learning',
    command: 'mem_save(title, type, What/Why/Where/Learned)',
    note: 'Store bugfixes, architecture decisions, and discoveries immediately.',
  },
] as const

const memories = [
  {
    id: 'm1',
    title: 'MCP Transport Decision',
    text: 'Decision: Chose HTTP transport for remote MCP servers; SSE is deprecated where HTTP is available.',
    tags: ['decision', 'mcp', 'transport', 'http'],
    color: '#4d8eff',
    type: 'decision',
  },
  {
    id: 'm2',
    title: 'Session Summary Example',
    text: 'Session summary: Implemented interactive MCP communication diagram and server cards in the lesson.',
    tags: ['session', 'summary', 'mcp', 'diagram'],
    color: '#ddb7ff',
    type: 'summary',
  },
  {
    id: 'm3',
    title: 'Topic Key Pattern',
    text: 'Architecture note: Use topic_key for evolving decisions so future writes update instead of duplicating.',
    tags: ['architecture', 'topic_key', 'decision'],
    color: '#f59e0b',
    type: 'pattern',
  },
  {
    id: 'm4',
    title: 'Lint Bugfix Record',
    text: 'Bugfix memory: Corrected unescaped JSX entities in lesson content to satisfy lint rules.',
    tags: ['bugfix', 'lint', 'jsx'],
    color: '#34d399',
    type: 'bugfix',
  },
  {
    id: 'm5',
    title: 'Retrieval Workflow Rule',
    text: 'Workflow pattern: mem_search -> mem_get_observation is required to retrieve full memory details.',
    tags: ['workflow', 'mem_search', 'mem_get_observation'],
    color: '#fb923c',
    type: 'workflow',
  },
]

function scoreMemory(query: string, memory: typeof memories[0]): number {
  const q = query.toLowerCase()
  let score = 0
  memory.tags.forEach(tag => {
    if (q.includes(tag)) score += 0.4
  })
  if ((q.includes('decision') || q.includes('architecture')) && (memory.tags.includes('decision') || memory.tags.includes('architecture'))) score += 0.5
  if ((q.includes('summary') || q.includes('recent')) && memory.tags.includes('summary')) score += 0.6
  if ((q.includes('bugfix') || q.includes('auth') || q.includes('lint')) && memory.tags.includes('bugfix')) score += 0.5
  if ((q.includes('search') || q.includes('retrieve') || q.includes('context')) && memory.tags.includes('mem_search')) score += 0.5
  return Math.min(score, 0.99)
}

export default function Memory2() {
  const [query, setQuery] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [searched, setSearched] = useState(false)

  const handleSearch = (q: string) => {
    setQuery(q)
    const newScores: Record<string, number> = {}
    memories.forEach(m => {
      newScores[m.id] = scoreMemory(q, m)
    })
    setSearched(true)
    setScores(newScores)
  }

  const topMatch = searched
    ? memories.reduce((best, m) =>
        (scores[m.id] || 0) > (scores[best.id] || 0) ? m : best
      )
    : null

  const currentStep = flowSteps[activeStep]

  return (
    <>
      <LessonHeader module="Engram" title="Engram Tool Flow" duration="6 min" type="interactive" />

      <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--on-surface)', marginBottom: '1.25rem' }}>
        Engram gives coding agents durable memory through MCP tools and SQLite + FTS5 retrieval. Use the interactive
        flow below to see how context is loaded, searched, expanded, and saved.
      </p>

      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--on-surface)', margin: '0 0 0.8rem' }}>
        Architecture
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-low)', borderRadius: '10px', padding: '0.9rem', marginBottom: '2rem' }}>
        {[
          ['Agent', 'Claude / OpenCode'],
          ['MCP', 'stdio transport'],
          ['Engram', 'Go binary'],
          ['Store', 'SQLite + FTS5'],
        ].map((n, i) => (
          <>
            <div key={`${n[0]}-card`} style={{ background: 'var(--surface)', borderRadius: '8px', padding: '0.6rem 0.65rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--on-surface-variant)', marginBottom: '0.22rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{n[0]}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--on-surface)', fontWeight: 600 }}>{n[1]}</div>
            </div>
            {i < 3 && <span key={`${n[0]}-arrow`} style={{ color: 'var(--outline-variant)', fontSize: '0.85rem' }}>{'->'}</span>}
          </>
        ))}
      </div>

      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--on-surface)', margin: '0 0 0.8rem' }}>
        Interactive Retrieval Flow
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem', marginBottom: '0.8rem' }}>
        {flowSteps.map((step, i) => {
          const active = i === activeStep
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(i)}
              style={{
                textAlign: 'left',
                padding: '0.6rem 0.7rem',
                borderRadius: '8px',
                border: `1px solid ${active ? 'rgba(77,142,255,0.5)' : 'rgba(70,69,84,0.24)'}`,
                background: active ? 'rgba(77,142,255,0.16)' : 'var(--surface-low)',
                color: active ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '0.67rem', opacity: 0.82, marginBottom: '0.22rem' }}>{`STEP ${i + 1}`}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{step.title}</div>
            </button>
          )
        })}
      </div>

      <div style={{ background: 'var(--surface-low)', border: '1px solid rgba(70,69,84,0.2)', borderRadius: '10px', padding: '0.9rem', marginBottom: '1.7rem' }}>
        <div style={{ fontSize: '0.74rem', color: 'var(--on-surface-variant)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
          {currentStep.title}
        </div>
        <CodeBlock language="mcp" code={currentStep.command} />
        <p style={{ margin: '0.2rem 0 0', fontSize: '0.84rem', color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
          {currentStep.note}
        </p>
      </div>

      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--on-surface)', margin: '0 0 0.8rem' }}>
        Search Simulation
      </h2>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && query.trim() && handleSearch(query)}
            placeholder="Ask for memory context..."
            style={{
              flex: 1,
              padding: '0.625rem 0.875rem',
              background: 'var(--surface-low)',
              border: '1px solid rgba(70,69,84,0.3)',
              borderRadius: '6px',
              color: 'var(--on-surface)',
              fontSize: '0.9375rem',
              outline: 'none',
            }}
          />
          <button
            onClick={() => query.trim() && handleSearch(query)}
            style={{
              padding: '0.625rem 1.25rem',
              background: 'linear-gradient(135deg, #ddb7ff, #4d8eff)',
              border: 'none',
              borderRadius: '6px',
              color: '#0e0e0e',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {presetQueries.map(q => (
            <button
              key={q}
              onClick={() => handleSearch(q)}
              style={{
                padding: '0.25rem 0.75rem',
                background: 'var(--surface-high)',
                border: '1px solid rgba(70,69,84,0.2)',
                borderRadius: '100px',
                color: 'var(--on-surface-variant)',
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {memories.map(m => {
          const score = searched ? scores[m.id] || 0 : 0
          const isTop = topMatch?.id === m.id
          return (
            <div key={m.id} style={{ background: 'var(--surface-low)', border: `1px solid ${isTop ? `${m.color}55` : 'rgba(70,69,84,0.16)'}`, borderRadius: '8px', padding: '0.6rem 0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.4rem' }}>
                <div style={{ fontSize: '0.84rem', color: 'var(--on-surface)', fontWeight: 600 }}>{m.title}</div>
                {searched && <div style={{ fontSize: '0.78rem', color: isTop ? m.color : 'var(--on-surface-variant)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(score * 100)}%</div>}
              </div>
              <div style={{ height: '6px', borderRadius: '999px', background: 'var(--surface-high)', overflow: 'hidden', marginBottom: '0.5rem' }}>
                <div style={{ width: `${searched ? Math.max(6, score * 100) : 6}%`, height: '100%', background: m.color, opacity: searched ? 0.9 : 0.4, transition: 'width 0.2s ease' }} />
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: 1.55, color: 'var(--on-surface-variant)' }}>{m.text}</p>
            </div>
          )
        })}
      </div>

      {/* Retrieved memory */}
      {searched && topMatch && (
        <div
          style={{
            background: `${topMatch.color}12`,
            border: `1px solid ${topMatch.color}33`,
            borderRadius: '10px',
            padding: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: topMatch.color }}>
              data_object
            </span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: topMatch.color }}>
              Top match - {Math.round((scores[topMatch.id] || 0) * 100)} relevance
              </span>
            </div>
          <p style={{ fontSize: '0.9375rem', color: 'var(--on-surface)', margin: 0, lineHeight: 1.6 }}>
            {topMatch.text}
          </p>
          <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            {topMatch.tags.map(tag => (
              <span
                key={tag}
                style={{
                  padding: '0.125rem 0.5rem',
                  background: `${topMatch.color}20`,
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  color: topMatch.color,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <CalloutBox variant="tip">
        Engram works best when you save high-value outcomes immediately: bugfixes, architecture decisions, and workflow
        discoveries.
      </CalloutBox>
    </>
  )
}

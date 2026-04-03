'use client'

import { useState } from 'react'
import LessonHeader from '@/components/LessonHeader'

const presetQueries = [
  'How do we save architecture decisions?',
  'Show recent session summary',
  'Find bugfix context for auth',
]

const memories = [
  {
    id: 'm1',
    text: 'Decision: Chose HTTP transport for remote MCP servers; SSE is deprecated where HTTP is available.',
    tags: ['decision', 'mcp', 'transport', 'http'],
    color: '#4d8eff',
    x: 15,
    y: 20,
  },
  {
    id: 'm2',
    text: 'Session summary: Implemented interactive MCP communication diagram and server cards in the lesson.',
    tags: ['session', 'summary', 'mcp', 'diagram'],
    color: '#ddb7ff',
    x: 65,
    y: 15,
  },
  {
    id: 'm3',
    text: 'Architecture note: Use topic_key for evolving decisions so future writes update instead of duplicating.',
    tags: ['architecture', 'topic_key', 'decision'],
    color: '#f59e0b',
    x: 40,
    y: 55,
  },
  {
    id: 'm4',
    text: 'Bugfix memory: Corrected unescaped JSX entities in lesson content to satisfy lint rules.',
    tags: ['bugfix', 'lint', 'jsx'],
    color: '#34d399',
    x: 80,
    y: 60,
  },
  {
    id: 'm5',
    text: 'Workflow pattern: mem_search -> mem_get_observation is required to retrieve full memory details.',
    tags: ['workflow', 'mem_search', 'mem_get_observation'],
    color: '#fb923c',
    x: 25,
    y: 75,
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
  return Math.min(score + Math.random() * 0.1, 0.99)
}

export default function Memory2() {
  const [query, setQuery] = useState('')
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

  return (
    <>
      <LessonHeader module="Engram" title="Engram Tool Flow" duration="6 min" type="interactive" />

      <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--on-surface)', marginBottom: '2rem' }}>
        Engram stores structured observations and lets agents retrieve them with search tools. Run a query to simulate
        how an agent finds relevant context before calling <code style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>mem_get_observation</code>.
      </p>

      {/* Query input */}
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

      {/* Vector space visualization */}
      <div
        style={{
          position: 'relative',
          background: 'var(--surface-lowest)',
          border: '1px solid rgba(70,69,84,0.2)',
          borderRadius: '10px',
          height: '200px',
          marginBottom: '1.5rem',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '0.5rem', left: '0.75rem', fontSize: '0.6875rem', color: 'var(--outline-variant)' }}>
          Memory Index Space
        </div>
        {memories.map(m => {
          const score = scores[m.id] || 0
          const isTop = topMatch?.id === m.id
          return (
            <div
              key={m.id}
              title={m.text}
              style={{
                position: 'absolute',
                left: `${m.x}%`,
                top: `${m.y}%`,
                width: isTop ? '14px' : '10px',
                height: isTop ? '14px' : '10px',
                borderRadius: '50%',
                background: searched ? m.color : 'var(--surface-highest)',
                opacity: searched ? (0.3 + score * 0.7) : 0.5,
                transform: 'translate(-50%, -50%)',
                transition: 'all 0.3s ease',
                cursor: 'default',
                boxShadow: isTop ? `0 0 0 3px ${m.color}44, 0 0 12px ${m.color}66` : 'none',
              }}
            />
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

      <div style={{ marginTop: '1rem', background: 'var(--surface-low)', border: '1px solid rgba(70,69,84,0.2)', borderRadius: '10px', padding: '1rem' }}>
        <div style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
          Recommended Retrieval Sequence
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--on-surface)', lineHeight: 1.7, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>
          {`mem_context -> mem_search -> mem_get_observation -> mem_update or mem_save`}
        </div>
      </div>
    </>
  )
}

'use client'

import { useState } from 'react'
import LessonHeader from '@/components/LessonHeader'

const blocks = [
  {
    id: 'model',
    label: 'Model',
    icon: 'psychology',
    color: '#ddb7ff',
    what: 'The AI reasoning engine',
    provides: 'Inference, understanding, generation',
    example: 'GPT-4, Claude, Llama',
    connections: ['memory', 'tools', 'ui'],
  },
  {
    id: 'memory',
    label: 'Memory',
    icon: 'memory',
    color: '#4d8eff',
    what: 'Persistent knowledge store',
    provides: 'Context retrieval, session history',
    example: 'Vector DB, key-value store',
    connections: ['model'],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: 'bolt',
    color: '#f59e0b',
    what: 'External capability executors',
    provides: 'Real-world actions, data fetching',
    example: 'APIs, code runners, file systems',
    connections: ['model'],
  },
  {
    id: 'ui',
    label: 'UI',
    icon: 'web',
    color: '#34d399',
    what: 'User-facing interface layer',
    provides: 'Input capture, output rendering',
    example: 'Chat UI, dashboard, API consumer',
    connections: ['model'],
  },
]

type BlockId = 'model' | 'memory' | 'tools' | 'ui'

export default function Mcp2() {
  const [active, setActive] = useState<BlockId | null>(null)

  const activeBlock = blocks.find(b => b.id === active)

  return (
    <>
      <LessonHeader module="MCP Protocol" title="Modular Architecture" duration="6 min" type="interactive" />

      <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--on-surface)', marginBottom: '2rem' }}>
        An MCP-based system is made of independent blocks connected via the protocol. Click each block to see what it does
        and how it connects to the rest of the system.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem', alignItems: 'start' }}>
        {/* Architecture blocks */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            {blocks.map(block => {
              const isActive = active === block.id
              const isConnected = activeBlock?.connections.includes(block.id) || block.connections.includes(active || '')
              return (
                <button
                  key={block.id}
                  onClick={() => setActive(prev => prev === block.id ? null : block.id as BlockId)}
                  style={{
                    padding: '1.25rem',
                    background: isActive ? `${block.color}22` : isConnected ? `${block.color}0e` : 'var(--surface-low)',
                    border: `2px solid ${isActive ? block.color : isConnected ? block.color + '55' : 'rgba(70,69,84,0.2)'}`,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textAlign: 'center',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: isActive || isConnected ? block.color : 'var(--on-surface-variant)' }}>
                    {block.icon}
                  </span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: isActive ? block.color : 'var(--on-surface)' }}>
                    {block.label}
                  </span>
                  {isConnected && !isActive && (
                    <span style={{ fontSize: '0.6875rem', color: block.color }}>connected</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* MCP label */}
          <div
            style={{
              padding: '0.5rem',
              background: 'var(--surface-high)',
              border: '1px dashed rgba(70,69,84,0.4)',
              borderRadius: '6px',
              textAlign: 'center',
              fontSize: '0.75rem',
              color: 'var(--on-surface-variant)',
            }}
          >
            All connected via <strong style={{ color: 'var(--on-surface)' }}>MCP</strong>
          </div>
        </div>

        {/* Detail panel */}
        <div
          style={{
            background: activeBlock ? `${activeBlock.color}10` : 'var(--surface-low)',
            border: `1px solid ${activeBlock ? activeBlock.color + '33' : 'rgba(70,69,84,0.15)'}`,
            borderRadius: '10px',
            padding: '1.5rem',
            minHeight: '220px',
            transition: 'all 0.2s ease',
          }}
        >
          {activeBlock ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: activeBlock.color }}>{activeBlock.icon}</span>
                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--on-surface)' }}>{activeBlock.label}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <Row label="What it is" value={activeBlock.what} />
                <Row label="Provides" value={activeBlock.provides} />
                <Row label="Example" value={activeBlock.example} />
                <Row label="Connects to" value={activeBlock.connections.map(c => blocks.find(b => b.id === c)?.label).join(', ')} />
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '0.75rem', opacity: 0.5 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--on-surface-variant)' }}>touch_app</span>
              <p style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', textAlign: 'center', margin: 0 }}>
                Click a block to explore its role in the architecture
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--on-surface-variant)', marginBottom: '0.25rem' }}>
        {label}
      </div>
      <div style={{ fontSize: '0.9rem', color: 'var(--on-surface)' }}>{value}</div>
    </div>
  )
}

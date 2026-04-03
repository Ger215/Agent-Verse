"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import LessonHeader from '@/components/LessonHeader'
import CalloutBox from '@/components/CalloutBox'

const principles = [
  {
    icon: 'handshake',
    title: 'Standardized',
    desc: 'MCP defines shared primitives (tools, resources, prompts) so clients and servers can interoperate without custom adapters.',
    color: '#4d8eff',
  },
  {
    icon: 'lan',
    title: 'Transport-aware',
    desc: 'Servers can run locally over stdio or remotely over HTTP. SSE exists but is now considered deprecated in modern setups.',
    color: '#ddb7ff',
  },
  {
    icon: 'policy',
    title: 'Scoped & Safe',
    desc: 'MCP connections can be local, project, or user scoped. Treat third-party servers as code execution surfaces and review trust boundaries.',
    color: '#34d399',
  },
]

const popularMcps = [
  {
    name: 'GitHub',
    useCase: 'PR reviews, issue workflows, repo automation',
    transport: 'HTTP',
  },
  {
    name: 'Sentry',
    useCase: 'Production error triage and release correlation',
    transport: 'HTTP',
  },
  {
    name: 'Notion',
    useCase: 'Knowledge retrieval and docs operations',
    transport: 'HTTP',
  },
  {
    name: 'Asana',
    useCase: 'Task tracking and planning workflows',
    transport: 'SSE/HTTP',
  },
  {
    name: 'PostgreSQL (dbhub)',
    useCase: 'Natural-language database querying',
    transport: 'stdio',
  },
]

const clients = ['Client A', 'Client B'] as const
const tools = ['Tool X', 'Tool Y'] as const

type DiagramMode = 'without' | 'with'

export default function Mcp1() {
  const [diagramMode, setDiagramMode] = useState<DiagramMode>('without')
  const [activeClient, setActiveClient] = useState<(typeof clients)[number]>('Client A')

  return (
    <>
      <LessonHeader module="MCP Protocol" title="Context Flow Explained" duration="5 min" type="reading" />

      <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--on-surface)', marginBottom: '1.5rem' }}>
        MCP (Model Context Protocol) is an open standard that lets AI clients connect to external capabilities through
        MCP servers. In practice, servers expose tools, resources, and prompts so the model can act on real systems
        (APIs, databases, issue trackers, docs) using one consistent contract.
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
        Communication Drawing
      </h2>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setDiagramMode('without')}
          aria-pressed={diagramMode === 'without'}
          style={{
            border: `1px solid ${diagramMode === 'without' ? '#f87171' : 'rgba(70,69,84,0.28)'}`,
            background: diagramMode === 'without' ? 'rgba(248,113,113,0.15)' : 'var(--surface-low)',
            color: diagramMode === 'without' ? '#fecaca' : 'var(--on-surface-variant)',
            borderRadius: '999px',
            padding: '0.4rem 0.7rem',
            fontSize: '0.75rem',
            cursor: 'pointer',
          }}
        >
          Without MCP
        </button>
        <button
          onClick={() => setDiagramMode('with')}
          aria-pressed={diagramMode === 'with'}
          style={{
            border: `1px solid ${diagramMode === 'with' ? '#34d399' : 'rgba(70,69,84,0.28)'}`,
            background: diagramMode === 'with' ? 'rgba(52,211,153,0.15)' : 'var(--surface-low)',
            color: diagramMode === 'with' ? '#bbf7d0' : 'var(--on-surface-variant)',
            borderRadius: '999px',
            padding: '0.4rem 0.7rem',
            fontSize: '0.75rem',
            cursor: 'pointer',
          }}
        >
          With MCP
        </button>
      </div>

      <div
        style={{
          background: 'var(--surface-low)',
          border: `1px solid ${diagramMode === 'with' ? 'rgba(52,211,153,0.22)' : 'rgba(248,113,113,0.22)'}`,
          borderRadius: '10px',
          padding: '0.875rem',
          marginBottom: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          {clients.map(client => {
            const active = client === activeClient
            return (
              <motion.button
                key={client}
                onClick={() => setActiveClient(client)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-pressed={active}
                style={{
                  border: `1px solid ${active ? '#4d8eff' : 'rgba(70,69,84,0.3)'}`,
                  background: active ? 'rgba(77,142,255,0.18)' : 'var(--surface-high)',
                  color: active ? '#bfdbfe' : 'var(--on-surface-variant)',
                  borderRadius: '999px',
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                {client}
              </motion.button>
            )
          })}
        </div>

        <ConnectionDiagram mode={diagramMode} activeClient={activeClient} />
      </div>

      <p style={{ margin: '0 0 2rem', fontSize: '0.8125rem', color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
        Switch modes and click each client to see how communication paths change.
      </p>

      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--on-surface)', margin: '2rem 0 1rem', letterSpacing: '-0.02em' }}>
        Popular MCP Servers
      </h2>

      <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--on-surface-variant)', margin: '0 0 0.75rem' }}>
        Common picks from Claude MCP docs and real-world workflows.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
        {popularMcps.map(server => (
          <div
            key={server.name}
            style={{
              background: 'var(--surface-low)',
              border: '1px solid rgba(70,69,84,0.15)',
              borderRadius: '8px',
              padding: '0.875rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.625rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--on-surface)' }}>{server.name}</span>
              <span style={{ fontSize: '0.6875rem', padding: '0.2rem 0.45rem', borderRadius: '999px', border: '1px solid rgba(77,142,255,0.35)', color: '#93c5fd', background: 'rgba(77,142,255,0.12)', flexShrink: 0 }}>
                {server.transport}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--on-surface-variant)' }}>{server.useCase}</p>
          </div>
        ))}
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
        MCP is to AI systems what HTTP is to the web: one protocol, many implementations. Prefer trusted servers and
        favor HTTP transport for remote services.
      </CalloutBox>
    </>
  )
}

function ConnectionDiagram({ mode, activeClient }: { mode: DiagramMode; activeClient: (typeof clients)[number] }) {
  const activeIndex = clients.indexOf(activeClient)

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '220px',
        borderRadius: '8px',
        border: '1px dashed rgba(70,69,84,0.35)',
        background: 'rgba(16,15,21,0.35)',
        overflow: 'hidden',
      }}
    >
      <motion.svg viewBox="0 0 1000 360" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {mode === 'without' ? (
          <>
            {[0, 1].flatMap(c => [0, 1].map(t => ({ c, t }))).map(({ c, t }) => {
              const y1 = c === 0 ? 110 : 250
              const y2 = t === 0 ? 110 : 250
              const highlighted = c === activeIndex
              return (
                <motion.path
                  key={`${c}-${t}`}
                  d={`M 175 ${y1} C 360 ${y1}, 640 ${y2}, 825 ${y2}`}
                  fill="transparent"
                  stroke={highlighted ? '#f87171' : 'rgba(248,113,113,0.24)'}
                  strokeWidth={highlighted ? 4 : 2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: highlighted ? 0.5 : 0.35 }}
                />
              )
            })}
          </>
        ) : (
          <>
            {[0, 1].map(c => {
              const y1 = c === 0 ? 110 : 250
              const highlighted = c === activeIndex
              return (
                <motion.path
                  key={`client-${c}`}
                  d={`M 175 ${y1} C 300 ${y1}, 390 180, 500 180`}
                  fill="transparent"
                  stroke={highlighted ? '#34d399' : 'rgba(52,211,153,0.24)'}
                  strokeWidth={highlighted ? 4 : 2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: highlighted ? 0.5 : 0.35 }}
                />
              )
            })}
            {[0, 1].map(t => {
              const y2 = t === 0 ? 110 : 250
              return (
                <motion.path
                  key={`tool-${t}`}
                  d={`M 500 180 C 610 180, 700 ${y2}, 825 ${y2}`}
                  fill="transparent"
                  stroke="#34d399"
                  strokeWidth={3}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45 }}
                />
              )
            })}
          </>
        )}
      </motion.svg>

      {clients.map((client, i) => {
        const top = i === 0 ? '22%' : '72%'
        const selected = client === activeClient
        return (
          <div
            key={client}
            style={{
              position: 'absolute',
              left: '8%',
              top,
              transform: 'translate(-50%, -50%)',
              padding: '0.35rem 0.6rem',
              borderRadius: '999px',
              border: `1px solid ${selected ? '#4d8eff' : 'rgba(70,69,84,0.32)'}`,
              background: selected ? 'rgba(77,142,255,0.16)' : 'rgba(20,19,27,0.92)',
              color: selected ? '#bfdbfe' : 'var(--on-surface-variant)',
              fontSize: '0.72rem',
              fontWeight: 600,
            }}
          >
            {client}
          </div>
        )
      })}

      {mode === 'with' && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '0.4rem 0.75rem',
            borderRadius: '8px',
            border: '1px solid rgba(52,211,153,0.45)',
            background: 'rgba(52,211,153,0.16)',
            color: '#bbf7d0',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          MCP Server
        </div>
      )}

      {tools.map((tool, i) => {
        const top = i === 0 ? '22%' : '72%'
        return (
          <div
            key={tool}
            style={{
              position: 'absolute',
              left: '92%',
              top,
              transform: 'translate(-50%, -50%)',
              padding: '0.35rem 0.6rem',
              borderRadius: '999px',
              border: `1px solid ${mode === 'with' ? 'rgba(52,211,153,0.4)' : 'rgba(248,113,113,0.4)'}`,
              background: mode === 'with' ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)',
              color: mode === 'with' ? '#bbf7d0' : '#fecaca',
              fontSize: '0.72rem',
              fontWeight: 600,
            }}
          >
            {tool}
          </div>
        )
      })}
    </div>
  )
}

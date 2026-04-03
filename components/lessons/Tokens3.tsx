"use client"

import { useState } from 'react'
import LessonHeader from '@/components/LessonHeader'
import CalloutBox from '@/components/CalloutBox'

const hookEvents = [
  { name: 'PreToolUse', use: 'Runs before a tool call; can allow or deny' },
  { name: 'PostToolUse', use: 'Runs after successful tool execution' },
  { name: 'UserPromptSubmit', use: 'Validates prompts before Claude processes them' },
  { name: 'Stop', use: 'Runs when Claude is about to finish a response' },
]

const pluginPieces = [
  { name: '.claude-plugin/plugin.json', desc: 'Plugin identity: name, version, author, metadata' },
  { name: 'skills/', desc: 'Reusable skills namespaced as /plugin-name:skill' },
  { name: 'agents/', desc: 'Custom subagents for specialized workflows' },
  { name: 'hooks/hooks.json', desc: 'Plugin-scoped hooks that load when plugin is enabled' },
  { name: '.mcp.json', desc: 'MCP server definitions bundled with the plugin' },
]

const hookFlow = [
  { id: 'h1', title: 'Event fires', desc: 'Claude emits a lifecycle event such as PreToolUse before running a command.' },
  { id: 'h2', title: 'Matcher filters', desc: 'The matcher decides whether the hook should run for this tool or event.' },
  { id: 'h3', title: 'Hook executes', desc: 'Your command, HTTP, prompt, or agent hook runs with JSON input context.' },
  { id: 'h4', title: 'Decision applied', desc: 'Claude continues, blocks, or modifies behavior based on hook output.' },
]

const pluginFlow = [
  { id: 'p1', title: 'Create plugin', desc: 'Add .claude-plugin/plugin.json with name, version, and metadata.' },
  { id: 'p2', title: 'Add components', desc: 'Include skills, agents, hooks, and optional MCP/LSP config files.' },
  { id: 'p3', title: 'Run locally', desc: 'Start Claude with --plugin-dir to test namespaced commands and behavior.' },
  { id: 'p4', title: 'Reload and ship', desc: 'Use /reload-plugins while iterating, then distribute to your team.' },
]

type DiagramMode = 'hooks' | 'plugins'

export default function Tokens3() {
  const [diagramMode, setDiagramMode] = useState<DiagramMode>('hooks')
  const [activeStep, setActiveStep] = useState('h1')

  const activeFlow = diagramMode === 'hooks' ? hookFlow : pluginFlow
  const selected = activeFlow.find(step => step.id === activeStep) ?? activeFlow[0]

  const switchMode = (next: DiagramMode) => {
    setDiagramMode(next)
    setActiveStep(next === 'hooks' ? 'h1' : 'p1')
  }

  return (
    <>
      <LessonHeader module="Token Optimization" title="Hooks & Plugins" duration="5 min" type="reading" />

      <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--on-surface)', marginBottom: '1.5rem' }}>
        Hooks automate behavior at runtime. Plugins package those automations, skills, agents, and MCP config so your
        whole team can reuse the same setup.
      </p>

      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--on-surface)', margin: '2rem 0 1rem', letterSpacing: '-0.02em' }}>
        Interactive Flow Explorer
      </h2>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => switchMode('hooks')}
          aria-pressed={diagramMode === 'hooks'}
          style={{
            border: `1px solid ${diagramMode === 'hooks' ? '#4d8eff' : 'rgba(70,69,84,0.28)'}`,
            background: diagramMode === 'hooks' ? 'rgba(77,142,255,0.16)' : 'var(--surface-low)',
            color: diagramMode === 'hooks' ? '#bfdbfe' : 'var(--on-surface-variant)',
            borderRadius: '999px',
            padding: '0.4rem 0.72rem',
            fontSize: '0.75rem',
            cursor: 'pointer',
          }}
        >
          Hook Event Flow
        </button>
        <button
          onClick={() => switchMode('plugins')}
          aria-pressed={diagramMode === 'plugins'}
          style={{
            border: `1px solid ${diagramMode === 'plugins' ? '#34d399' : 'rgba(70,69,84,0.28)'}`,
            background: diagramMode === 'plugins' ? 'rgba(52,211,153,0.16)' : 'var(--surface-low)',
            color: diagramMode === 'plugins' ? '#bbf7d0' : 'var(--on-surface-variant)',
            borderRadius: '999px',
            padding: '0.4rem 0.72rem',
            fontSize: '0.75rem',
            cursor: 'pointer',
          }}
        >
          Plugin Packaging Flow
        </button>
      </div>

      <div style={{ background: 'var(--surface-low)', border: '1px solid rgba(70,69,84,0.2)', borderRadius: '10px', padding: '0.875rem', marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
          {activeFlow.map((step, i) => {
            const active = step.id === selected.id
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                style={{
                  textAlign: 'left',
                  border: `1px solid ${active ? (diagramMode === 'hooks' ? '#4d8eff' : '#34d399') : 'rgba(70,69,84,0.24)'}`,
                  background: active ? (diagramMode === 'hooks' ? 'rgba(77,142,255,0.16)' : 'rgba(52,211,153,0.16)') : 'var(--surface-high)',
                  color: active ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                  borderRadius: '8px',
                  padding: '0.55rem',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '0.68rem', opacity: 0.8, marginBottom: '0.2rem' }}>{`STEP ${i + 1}`}</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{step.title}</div>
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          {activeFlow.map((step, i) => (
            <div key={`flow-${step.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{ fontSize: '0.7rem', padding: '0.18rem 0.42rem', borderRadius: '999px', background: step.id === selected.id ? (diagramMode === 'hooks' ? 'rgba(77,142,255,0.18)' : 'rgba(52,211,153,0.18)') : 'var(--surface-high)', color: step.id === selected.id ? 'var(--on-surface)' : 'var(--on-surface-variant)' }}>
                {step.title}
              </div>
              {i < activeFlow.length - 1 && <span style={{ fontSize: '0.7rem', color: 'var(--outline-variant)' }}>{'->'}</span>}
            </div>
          ))}
        </div>

        <div style={{ border: '1px dashed rgba(70,69,84,0.32)', borderRadius: '8px', padding: '0.75rem', background: 'rgba(16,15,21,0.35)' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem', color: diagramMode === 'hooks' ? '#93c5fd' : '#86efac', fontWeight: 700 }}>
            {selected.title}
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--on-surface-variant)' }}>{selected.desc}</p>
        </div>
      </div>

      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--on-surface)', margin: '2rem 0 1rem', letterSpacing: '-0.02em' }}>
        Hooks (Claude Code)
      </h2>

      <div style={{ border: '1px solid rgba(70,69,84,0.2)', borderRadius: '10px', overflow: 'hidden', marginBottom: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', background: 'var(--surface-high)', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--on-surface-variant)' }}>
          <div>Event</div>
          <div>Purpose</div>
        </div>
        {hookEvents.map((event, i) => (
          <div
            key={event.name}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', padding: '0.75rem 1rem', borderTop: '1px solid rgba(70,69,84,0.1)', background: i % 2 === 0 ? 'transparent' : 'var(--surface-low)' }}
          >
            <div style={{ fontSize: '0.8125rem', color: '#93c5fd', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>{event.name}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)' }}>{event.use}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--surface-low)', border: '1px solid rgba(70,69,84,0.2)', borderRadius: '10px', padding: '1rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem', fontWeight: 600 }}>
          Hook Example
        </div>
        <pre style={{ margin: 0, fontSize: '0.75rem', lineHeight: 1.6, color: 'var(--on-surface)', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', overflowX: 'auto' }}>
{`{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "./hooks/validate.sh" }
        ]
      }
    ]
  }
}`}
        </pre>
      </div>

      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--on-surface)', margin: '2rem 0 1rem', letterSpacing: '-0.02em' }}>
        Plugins (Claude Code)
      </h2>

      <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--on-surface-variant)', margin: '0 0 0.75rem' }}>
        Use standalone `.claude/` config for local experiments. Use plugins when you need versioned, shareable behavior
        across projects or teams.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {pluginPieces.map(piece => (
          <div key={piece.name} style={{ background: 'var(--surface-low)', border: '1px solid rgba(70,69,84,0.2)', borderRadius: '8px', padding: '0.75rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#bfdbfe', marginBottom: '0.35rem', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>
              {piece.name}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>{piece.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--surface-low)', border: '1px solid rgba(70,69,84,0.2)', borderRadius: '10px', padding: '1rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem', fontWeight: 600 }}>
          Plugin Dev Flow
        </div>
        <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '0.8125rem', color: 'var(--on-surface)', lineHeight: 1.7 }}>
          mkdir my-plugin/.claude-plugin<br />
          create plugin.json + skills/<br />
          claude --plugin-dir ./my-plugin<br />
          /reload-plugins
        </div>
      </div>

      <CalloutBox variant="info">
        Hooks are runtime automation points. Plugins are distribution packages. Combine both to enforce team standards
        with minimal prompt overhead.
      </CalloutBox>
    </>
  )
}

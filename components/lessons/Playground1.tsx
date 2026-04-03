'use client'

import { useState } from 'react'
import LessonHeader from '@/components/LessonHeader'

const timelineSteps = [
  { id: 1, label: 'Parse Intent', icon: 'psychology', ms: 12, color: '#4d8eff' },
  { id: 2, label: 'Memory Lookup', icon: 'memory', ms: 8, color: '#ddb7ff' },
  { id: 3, label: 'Select Tool', icon: 'bolt', ms: 6, color: '#f59e0b' },
  { id: 4, label: 'Execute: get_weather', icon: 'cloud_download', ms: 18, color: '#34d399' },
  { id: 5, label: 'Format Response', icon: 'format_align_left', ms: 4, color: '#fb923c' },
]

const tools = [
  { name: 'get_weather', confidence: 0.94, match: true },
  { name: 'search_web', confidence: 0.23, match: false },
  { name: 'send_email', confidence: 0.07, match: false },
]

const outputJson = `{
  "tool": "get_weather",
  "input": {
    "location": "Buenos Aires",
    "unit": "celsius"
  },
  "output": {
    "temperature": 22,
    "unit": "celsius",
    "condition": "partly cloudy",
    "humidity": 68,
    "wind_kmh": 14
  },
  "response": "It's currently 22°C and partly cloudy in Buenos Aires.",
  "latency_ms": 48
}`

type RunState = 'idle' | 'running' | 'complete'

export default function Playground1() {
  const [input, setInput] = useState("What's the weather in Buenos Aires?")
  const [state, setState] = useState<RunState>('idle')
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])

  const handleRun = () => {
    if (state === 'running') return
    setState('running')
    setVisibleSteps([])

    timelineSteps.forEach((step, i) => {
      const delay = timelineSteps.slice(0, i).reduce((sum, s) => sum + s.ms * 6, 0) + 200
      setTimeout(() => {
        setVisibleSteps(prev => [...prev, step.id])
        if (i === timelineSteps.length - 1) {
          setTimeout(() => setState('complete'), 300)
        }
      }, delay)
    })
  }

  const handleReset = () => {
    setState('idle')
    setVisibleSteps([])
  }

  const totalMs = timelineSteps.reduce((sum, s) => sum + s.ms, 0)

  return (
    <>
      <LessonHeader module="Playground" title="Simulate an Agent" duration="10 min" type="exercise" />

      <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--on-surface)', marginBottom: '2rem' }}>
        Put it all together. Simulate a full agent run — from input to output — and see every step of the reasoning loop.
      </p>

      {/* Main layout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Input + Controls */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={2}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: 'var(--surface-low)',
              border: '1px solid rgba(70,69,84,0.3)',
              borderRadius: '8px',
              color: 'var(--on-surface)',
              fontSize: '0.9375rem',
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={handleRun}
              disabled={state === 'running'}
              style={{
                padding: '0.625rem 1.25rem',
                background: state === 'running' ? 'var(--surface-high)' : 'linear-gradient(135deg, #ddb7ff, #4d8eff)',
                border: 'none',
                borderRadius: '6px',
                color: state === 'running' ? 'var(--on-surface-variant)' : '#0e0e0e',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: state === 'running' ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                {state === 'running' ? 'hourglass_empty' : 'play_arrow'}
              </span>
              Run Agent
            </button>
            <button
              onClick={handleReset}
              style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                border: '1px solid rgba(70,69,84,0.3)',
                borderRadius: '6px',
                color: 'var(--on-surface-variant)',
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Timeline + Tool Registry */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {/* Timeline */}
          <div
            style={{
              background: 'var(--surface-low)',
              border: '1px solid rgba(70,69,84,0.15)',
              borderRadius: '10px',
              padding: '1.25rem',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--on-surface-variant)', marginBottom: '1rem' }}>
              Agent Timeline
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {timelineSteps.map(step => {
                const isVisible = visibleSteps.includes(step.id)
                return (
                  <div
                    key={step.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.625rem',
                      opacity: isVisible ? 1 : 0.25,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        background: isVisible ? `${step.color}22` : 'var(--surface-high)',
                        border: `1px solid ${isVisible ? step.color + '55' : 'rgba(70,69,84,0.2)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', color: isVisible ? step.color : 'var(--outline-variant)' }}>
                        {step.icon}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.8125rem', color: isVisible ? 'var(--on-surface)' : 'var(--on-surface-variant)', flex: 1 }}>
                      {step.label}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'ui-monospace, monospace', color: isVisible ? step.color : 'var(--outline-variant)' }}>
                      {step.ms}ms
                    </span>
                  </div>
                )
              })}
            </div>
            {state === 'complete' && (
              <div
                style={{
                  marginTop: '1rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(70,69,84,0.15)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)' }}>Total</span>
                <span style={{ fontSize: '0.9375rem', fontWeight: 700, fontFamily: 'ui-monospace, monospace', color: '#34d399' }}>
                  {totalMs}ms
                </span>
              </div>
            )}
          </div>

          {/* Tool Registry */}
          <div
            style={{
              background: 'var(--surface-low)',
              border: '1px solid rgba(70,69,84,0.15)',
              borderRadius: '10px',
              padding: '1.25rem',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--on-surface-variant)', marginBottom: '1rem' }}>
              Tool Registry
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {tools.map(tool => {
                const show = visibleSteps.length >= 3
                const pct = Math.round(tool.confidence * 100)
                return (
                  <div key={tool.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <code style={{ fontSize: '0.8125rem', fontFamily: 'ui-monospace, monospace', color: tool.match && show ? '#34d399' : 'var(--on-surface-variant)' }}>
                        {tool.name}
                      </code>
                      <span style={{ fontSize: '0.75rem', color: tool.match && show ? '#34d399' : 'var(--outline-variant)', fontFamily: 'ui-monospace, monospace' }}>
                        {show ? `${pct}%` : '—'}
                      </span>
                    </div>
                    <div style={{ height: '4px', background: 'var(--surface-high)', borderRadius: '100px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: show ? `${pct}%` : '0%',
                          background: tool.match ? 'linear-gradient(90deg, #34d399, #4d8eff)' : 'var(--surface-highest)',
                          borderRadius: '100px',
                          transition: 'width 0.5s ease',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Output console */}
        {state === 'complete' && (
          <div
            style={{
              background: 'var(--surface-lowest)',
              border: '1px solid #34d39933',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid rgba(70,69,84,0.15)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#34d399' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>terminal</span>
              output.json
            </div>
            <pre style={{ margin: 0, padding: '1.25rem', fontSize: '0.8125rem', fontFamily: 'ui-monospace, monospace', lineHeight: 1.7, color: 'var(--on-surface)', overflowX: 'auto' }}>
              {outputJson}
            </pre>
          </div>
        )}

        {state === 'idle' && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--on-surface-variant)', fontSize: '0.9rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem', opacity: 0.4 }}>play_circle</span>
            Click &quot;Run Agent&quot; to start the simulation
          </div>
        )}
      </div>
    </>
  )
}

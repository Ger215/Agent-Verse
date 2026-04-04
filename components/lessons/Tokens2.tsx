'use client'

import { useState } from 'react'
import LessonHeader from '@/components/LessonHeader'

const uncompressedText = `$ git status
On branch feature/auth-refresh
Changes not staged for commit:
  modified: src/auth/refresh.ts
  modified: src/auth/token.ts
  modified: src/auth/index.ts
  modified: src/ui/LoginForm.tsx
  modified: src/ui/SessionBanner.tsx
  ... 27 more files

$ cargo test
running 148 tests
test auth::token::tests::valid_signature ... ok
test auth::token::tests::expired_token ... FAILED
test auth::refresh::tests::rotates_refresh_token ... FAILED
test auth::refresh::tests::replay_attack_blocked ... ok
... 140 more lines of test output

Raw command output includes repeated boilerplate, long file lists, and full runner logs.`

const compressedText = `$ rtk git status
changed files: 32 (auth: 3, ui: 2, tests: 12, other: 15)
focus: src/auth/refresh.ts, src/auth/token.ts

$ rtk test cargo test
FAILED: 2/148 tests
- auth::token::tests::expired_token
- auth::refresh::tests::rotates_refresh_token
hint: inspect src/auth/token.ts and src/auth/refresh.ts

Signal preserved, noise removed.`

const techniques = [
  { label: 'Recursive Pruning', color: '#ddb7ff', desc: 'Removes redundant and low-signal content iteratively' },
  { label: 'Context Compression', color: '#4d8eff', desc: 'Summarizes past exchanges into compact representations' },
  { label: 'Direct Memory Access', color: '#34d399', desc: 'Retrieves only relevant memories instead of full history' },
]

export default function Tokens2() {
  const [compressed, setCompressed] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [count, setCount] = useState(12482)

  const handleCompress = () => {
    if (compressed || animating) return
    setAnimating(true)
    const target = 1940
    const start = 12482
    const duration = 1200
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(start - (start - target) * eased)
      setCount(current)
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setCompressed(true)
        setAnimating(false)
      }
    }
    requestAnimationFrame(tick)
  }

  const handleReset = () => {
    setCompressed(false)
    setAnimating(false)
    setCount(12482)
  }

  const reduction = Math.round(((12482 - count) / 12482) * 100)

  return (
    <>
      <LessonHeader module="Token Optimization" title="RTK Compression in Action" duration="5 min" type="interactive" />

      <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--on-surface)', marginBottom: '2rem' }}>
        RTK compresses command output while preserving high-signal information, trigger compression below to simulate
        what happens when verbose context is rewritten into compact summaries.
      </p>

      <div style={{ background: 'var(--surface-low)', border: '1px solid rgba(70,69,84,0.18)', borderRadius: '10px', padding: '0.875rem', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem', fontWeight: 600 }}>
          Typical Setup
        </div>
        <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '0.8125rem', color: '#bfdbfe', lineHeight: 1.65 }}>
          brew install rtk<br />
          rtk init -g<br />
          restart your agent CLI
        </div>
      </div>

      <div style={{ background: 'var(--surface-low)', border: '1px solid rgba(70,69,84,0.18)', borderRadius: '10px', padding: '0.875rem', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem', fontWeight: 600 }}>
          Command Rewrite Example
        </div>
        <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '0.8125rem', color: 'var(--on-surface)', lineHeight: 1.65 }}>
          {'git status -> rtk git status'}<br />
          {'cargo test -> rtk test cargo test'}
        </div>
      </div>

      {/* Token counter */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '1.25rem',
          background: 'var(--surface-low)',
          borderRadius: '10px',
          marginBottom: '1.5rem',
          border: '1px solid rgba(70,69,84,0.15)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'ui-monospace, monospace', color: compressed ? '#34d399' : '#f87171', letterSpacing: '-0.03em', transition: 'color 0.5s' }}>
            {count.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', marginTop: '0.25rem' }}>tokens</div>
        </div>
        {reduction > 0 && (
          <>
            <div style={{ flex: 1, height: '4px', background: 'var(--surface-high)', borderRadius: '100px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${100 - reduction}%`,
                  background: 'linear-gradient(90deg, #34d399, #4d8eff)',
                  borderRadius: '100px',
                  transition: 'width 0.05s linear',
                }}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'ui-monospace, monospace', color: '#34d399' }}>
                -{reduction}%
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>reduction</div>
            </div>
          </>
        )}
      </div>

      {/* Context display */}
      <div
        style={{
          background: 'var(--surface-lowest)',
          border: '1px solid rgba(70,69,84,0.3)',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid rgba(70,69,84,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', fontFamily: 'monospace' }}>
            {compressed ? 'compressed-context.txt' : 'agent-context.txt'}
          </span>
          {compressed && (
            <span style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>check_circle</span>
              RTK compressed
            </span>
          )}
        </div>
        <pre
          style={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.75rem',
            fontFamily: 'ui-monospace, monospace',
            lineHeight: 1.6,
            color: compressed ? 'var(--on-surface)' : 'var(--on-surface-variant)',
            maxHeight: '200px',
            overflowY: 'auto',
            transition: 'color 0.3s ease',
          }}
        >
          {compressed ? compressedText : uncompressedText}
        </pre>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
        <button
          onClick={handleCompress}
          disabled={compressed || animating}
          style={{
            padding: '0.625rem 1.5rem',
            background: compressed || animating ? 'var(--surface-high)' : 'linear-gradient(135deg, #ddb7ff, #4d8eff)',
            border: 'none',
            borderRadius: '6px',
            color: compressed || animating ? 'var(--on-surface-variant)' : '#0e0e0e',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: compressed || animating ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
            {animating ? 'hourglass_empty' : 'compress'}
          </span>
          {animating ? 'Compressing...' : 'Compress'}
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '0.625rem 1rem',
            background: 'transparent',
            border: '1px solid rgba(70,69,84,0.3)',
            borderRadius: '6px',
            color: 'var(--on-surface-variant)',
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>

      {/* Techniques */}
      <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--on-surface)', margin: '0 0 1rem', letterSpacing: '-0.02em' }}>
        Techniques Used
      </h2>
      <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {techniques.map(t => (
          <div
            key={t.label}
            style={{
              padding: '0.625rem 1rem',
              background: `${t.color}12`,
              border: `1px solid ${t.color}33`,
              borderRadius: '8px',
              flex: 1,
              minWidth: '160px',
            }}
          >
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: t.color, marginBottom: '0.25rem' }}>{t.label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>{t.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--surface-low)', border: '1px solid rgba(70,69,84,0.2)', borderRadius: '10px', padding: '0.875rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem', fontWeight: 600 }}>
          Hook Behavior
        </div>
        <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
          In Claude Code, RTK rewrites Bash commands through a hook.
        </p>
      </div>
    </>
  )
}

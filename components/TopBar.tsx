'use client'

import { allLessons } from '@/lib/courseData'

interface TopBarProps {
  completed: Set<string>
  currentLessonId: string
  onMenuToggle: () => void
}

export default function TopBar({ completed, onMenuToggle }: TopBarProps) {
  const total = allLessons.length
  const done = completed.size
  const pct = total > 0 ? (done / total) * 100 : 0

  return (
    <header
      style={{
        background: 'var(--surface-lowest)',
        borderBottom: '1px solid rgba(70,69,84,0.15)',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.5rem',
        gap: '1.5rem',
        flexShrink: 0,
        zIndex: 10,
      }}
    >
      {/* Logo + Course name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #ddb7ff, #4d8eff)',
            flexShrink: 0,
          }}
        />
        <span
          className="gradient-text"
          style={{ fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '-0.01em' }}
        >
          Obsidian AI
        </span>
        <span
          style={{
            width: '1px',
            height: '16px',
            background: 'var(--outline-variant)',
            opacity: 0.5,
          }}
        />
        <span
          style={{
            fontSize: '0.8125rem',
            color: 'var(--on-surface-variant)',
            fontWeight: 500,
          }}
        >
          Modern AI Systems
        </span>
      </div>

      {/* Progress bar — center */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          maxWidth: '320px',
          margin: '0 auto',
        }}
      >
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--on-surface-variant)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {done} / {total} lessons
        </span>
        <div
          style={{
            flex: 1,
            height: '4px',
            background: 'var(--surface-high)',
            borderRadius: '100px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #ddb7ff, #4d8eff)',
              borderRadius: '100px',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--on-surface-variant)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {Math.round(pct)}%
        </span>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={onMenuToggle}
        style={{
          marginLeft: 'auto',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--on-surface-variant)',
          padding: '0.25rem',
          display: 'none',
        }}
        className="menu-toggle"
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      <style>{`
        @media (max-width: 768px) {
          .menu-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  )
}

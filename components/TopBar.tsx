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
        background: 'rgba(12, 13, 18, 0.94)',
        backdropFilter: 'blur(20px)',
        borderRadius: '14px',
        minHeight: '62px',
        display: 'flex',
        alignItems: 'center',
        padding: '0.7rem 1rem',
        gap: '1rem',
        flexShrink: 0,
        zIndex: 10,
        boxShadow: '0 14px 30px rgba(0, 0, 0, 0.58)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #ddb7ff, #4d8eff)',
            flexShrink: 0,
            boxShadow: '0 8px 18px rgba(77, 142, 255, 0.24)',
          }}
        />
        <span className="gradient-text" style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
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
            fontSize: '0.75rem',
            color: 'var(--on-surface-variant)',
            fontWeight: 600,
            padding: '0.22rem 0.5rem',
            borderRadius: '999px',
            border: '1px solid rgba(70, 69, 84, 0.22)',
            background: 'var(--surface-variant)',
          }}
        >
          Modern AI Systems
        </span>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '0.55rem',
          maxWidth: '360px',
          margin: '0 auto',
          background: 'rgba(8, 9, 13, 0.74)',
          padding: '0.45rem 0.6rem',
          borderRadius: '10px',
        }}
        className="topbar-progress"
      >
        <span
          style={{
            fontSize: '0.72rem',
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
            height: '6px',
            background: 'rgba(255, 255, 255, 0.06)',
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
            fontSize: '0.72rem',
            color: 'var(--on-surface-variant)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {Math.round(pct)}%
        </span>
      </div>

      <button
        onClick={onMenuToggle}
        style={{
          marginLeft: 'auto',
          background: 'var(--surface-variant)',
          border: '1px solid rgba(70, 69, 84, 0.18)',
          borderRadius: '8px',
          cursor: 'pointer',
          color: 'var(--on-surface)',
          padding: '0.35rem',
          display: 'none',
        }}
        className="menu-toggle"
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      <style>{`
        @media (max-width: 768px) {
          .topbar-progress { display: none !important; }
          .menu-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  )
}

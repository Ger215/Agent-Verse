'use client'

import Image from 'next/image'
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
        background: 'rgba(9, 10, 14, 0.86)',
        backdropFilter: 'blur(12px)',
        borderRadius: '12px',
        minHeight: '62px',
        display: 'flex',
        alignItems: 'center',
        padding: '0.7rem 1rem',
        gap: '1rem',
        flexShrink: 0,
        zIndex: 10,
        boxShadow: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        <Image
          src="/Logo.png"
          alt="Agent Verse logo"
          width={48}
          height={48}
          priority
          style={{ flexShrink: 0 }}
        />
        <span className="gradient-text" style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
          Agent Verse
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
            boxShadow: 'none',
            background: 'rgba(15, 17, 23, 0.82)',
          }}
        >
          AI Workflow Crash Course
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
          background: 'rgba(9, 10, 14, 0.8)',
          padding: '0.45rem 0.6rem',
          borderRadius: '8px',
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
            background: 'rgba(74, 68, 85, 0.36)',
            borderRadius: '100px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: '100%',
              background: 'var(--gradient)',
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
          background: 'transparent',
          boxShadow: 'none',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          color: 'var(--on-surface)',
          padding: '0.35rem',
          display: 'none',
          transition: 'background 0.15s ease',
        }}
        onMouseOver={e => (e.currentTarget.style.background = 'var(--surface-high)')}
        onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
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

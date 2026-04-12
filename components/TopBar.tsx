'use client'

import Image from 'next/image'
import { allLessons } from '@/lib/courseData'

interface TopBarProps {
  completed: Set<string>
  onMenuToggle: () => void
}

export default function TopBar({ completed, onMenuToggle }: TopBarProps) {
  const total = allLessons.length
  const done = completed.size
  const pct = total > 0 ? (done / total) * 100 : 0

  return (
    <header className="topbar-shell">
      <div className="topbar-brand">
        <Image
          src="/Logo.png"
          alt="Agent Verse logo"
          width={48}
          height={48}
          priority
          style={{ flexShrink: 0, width: 'auto', height: 'auto', maxWidth: '48px' }}
        />
        <span
          className="gradient-text"
          style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.01em', flexShrink: 0 }}
        >
          Agent Verse
        </span>
        <span
          aria-hidden
          style={{
            width: '1px',
            height: '16px',
            background: 'var(--outline-variant)',
            opacity: 0.5,
          }}
        />
        <div className="topbar-brand-copy">
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--on-surface-variant)',
              fontWeight: 600,
              padding: '0.22rem 0.5rem',
              borderRadius: '999px',
              boxShadow: 'none',
              background: 'rgba(15, 17, 23, 0.82)',
              width: 'fit-content',
              maxWidth: '100%',
            }}
          >
            AI Workflow Crash Course
          </span>
          <span
            style={{
              fontSize: '0.65rem',
              color: 'var(--on-surface-variant)',
              opacity: 0.6,
              paddingLeft: '0.5rem',
              overflowWrap: 'anywhere',
            }}
          >
            Developed By{' '}
            <a
              href="https://www.linkedin.com/in/germ%C3%A1n-ramos-199596204/"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'inherit', textDecoration: 'underline', textDecorationStyle: 'solid', cursor: 'pointer' }}
            >
              Germán Ramos
            </a>
          </span>
        </div>
      </div>

      <div className="topbar-progress">
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
        style={{ boxShadow: 'none' }}
        onMouseOver={e => (e.currentTarget.style.background = 'var(--surface-high)')}
        onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
        className="menu-toggle"
        aria-label="Toggle menu"
      >
        <span
          className="material-symbols-outlined"
          style={{
            lineHeight: 1,
            fontSize: '1.25rem',
            display: 'block',
            margin: '0 auto',
          }}
        >
          menu
        </span>
      </button>
    </header>
  )
}

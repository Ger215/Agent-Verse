'use client'

interface LessonNavProps {
  onPrev: () => void
  onNext: () => void
  onComplete: () => void
  hasPrev: boolean
  hasNext: boolean
  isCompleted: boolean
  isLast: boolean
}

export default function LessonNav({
  onPrev,
  onNext,
  onComplete,
  hasPrev,
  hasNext,
  isCompleted,
  isLast,
}: LessonNavProps) {
  return (
    <div
      style={{
        background: 'rgba(9, 10, 14, 0.86)',
        backdropFilter: 'blur(12px)',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexShrink: 0,
        boxShadow: 'none',
      }}
      className="lesson-nav"
    >
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          minHeight: '44px',
          padding: '0.55rem 1rem',
          background: 'transparent',
          border: 'none',
          borderRadius: '6px',
          boxShadow: 'none',
          color: hasPrev ? 'var(--on-surface-variant)' : 'var(--outline-variant)',
          fontSize: '0.875rem',
          cursor: hasPrev ? 'pointer' : 'not-allowed',
          opacity: hasPrev ? 1 : 0.4,
          transition: 'all 0.15s ease',
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
          arrow_back
        </span>
        Previous
      </button>

      {isCompleted ? (
        hasNext ? (
          <button
            onClick={onNext}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              minHeight: '44px',
              padding: '0.55rem 1.25rem',
              background: 'transparent',
              border: 'none',
              borderRadius: '6px',
              boxShadow: 'none',
              color: 'var(--on-surface)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--secondary-container)' }}>
              check_circle
            </span>
            Completed — Next
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
              arrow_forward
            </span>
          </button>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              minHeight: '44px',
              padding: '0.55rem 1.25rem',
              color: 'var(--secondary)',
              fontSize: '0.875rem',
              borderRadius: '8px',
              background: 'rgba(9, 10, 14, 0.72)',
              boxShadow: 'none',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
              emoji_events
            </span>
            Course Complete!
          </div>
        )
      ) : (
        <button
          onClick={onComplete}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
              minHeight: '44px',
              padding: '0.55rem 1.25rem',
              background: 'var(--gradient)',
              border: 'none',
              borderRadius: '6px',
              color: '#1a1222',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'opacity 0.15s ease, transform 0.15s ease',
              boxShadow: 'none',
            }}
          onMouseOver={e => {
            e.currentTarget.style.opacity = '0.92'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseOut={e => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          onFocus={e => (e.currentTarget.style.boxShadow = 'none')}
          onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
        >
          {isLast ? (
            <>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                check
              </span>
              Mark Complete
            </>
          ) : (
            <>
              Complete & Continue
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                arrow_forward
              </span>
            </>
          )}
        </button>
      )}

      <style>{`
        @media (max-width: 700px) {
          .lesson-nav {
            flex-direction: column;
            align-items: stretch;
          }
          .lesson-nav button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

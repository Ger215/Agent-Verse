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
        background: 'var(--surface-lowest)',
        borderTop: '1px solid rgba(70,69,84,0.15)',
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexShrink: 0,
      }}
    >
      {/* Previous */}
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          padding: '0.5rem 1rem',
          background: 'transparent',
          border: '1px solid rgba(70,69,84,0.3)',
          borderRadius: '6px',
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

      {/* Complete / Next */}
      {isCompleted ? (
        hasNext ? (
          <button
            onClick={onNext}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.5rem 1.25rem',
              background: 'var(--surface-high)',
              border: '1px solid rgba(70,69,84,0.3)',
              borderRadius: '6px',
              color: 'var(--on-surface)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#4d8eff' }}>
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
              padding: '0.5rem 1.25rem',
              color: '#4d8eff',
              fontSize: '0.875rem',
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
            padding: '0.5rem 1.25rem',
            background: 'linear-gradient(135deg, #ddb7ff, #4d8eff)',
            border: 'none',
            borderRadius: '6px',
            color: '#0e0e0e',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity 0.15s ease',
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseOut={e => (e.currentTarget.style.opacity = '1')}
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
              Mark Complete & Continue
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                arrow_forward
              </span>
            </>
          )}
        </button>
      )}
    </div>
  )
}

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
        background: 'rgba(10, 11, 15, 0.96)',
        backdropFilter: 'blur(20px)',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexShrink: 0,
        boxShadow: '0 -14px 30px rgba(0, 0, 0, 0.56)',
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
          border: '1px solid rgba(70, 69, 84, 0.1)',
          borderRadius: '10px',
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
              background: 'rgba(255, 255, 255, 0.07)',
              border: '1px solid rgba(70, 69, 84, 0.08)',
              borderRadius: '10px',
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
              minHeight: '44px',
              padding: '0.55rem 1.25rem',
              color: '#4d8eff',
              fontSize: '0.875rem',
              borderRadius: '10px',
              background: 'rgba(77,142,255,0.1)',
              boxShadow: '0 0 0 1px rgba(70, 69, 84, 0.12)',
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
            background: 'linear-gradient(135deg, #ddb7ff, #4d8eff)',
            border: 'none',
            borderRadius: '10px',
            color: '#2c0051',
            fontSize: '0.875rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'opacity 0.15s ease, box-shadow 0.15s ease',
            boxShadow: '0 0 0 rgba(111, 0, 190, 0)',
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseOut={e => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.boxShadow = '0 0 0 rgba(111, 0, 190, 0)'
          }}
          onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 4px rgba(111, 0, 190, 0.1)')}
          onBlur={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(111, 0, 190, 0)')}
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

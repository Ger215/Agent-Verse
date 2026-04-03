'use client'

import { modules } from '@/lib/courseData'

const typeColors: Record<string, string> = {
  reading: '#4d8eff',
  interactive: '#ddb7ff',
  exercise: '#f59e0b',
}

interface CourseSidebarProps {
  currentLessonId: string
  completed: Set<string>
  onSelectLesson: (id: string) => void
  open: boolean
}

export default function CourseSidebar({
  currentLessonId,
  completed,
  onSelectLesson,
  open,
}: CourseSidebarProps) {
  return (
    <>
      {/* Backdrop for mobile */}
      {open && (
        <div
          onClick={() => onSelectLesson(currentLessonId)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 19,
            display: 'none',
          }}
          className="sidebar-backdrop"
        />
      )}

      <aside
        style={{
          width: '280px',
          flexShrink: 0,
          background: 'var(--surface-lowest)',
          borderRight: '1px solid rgba(70,69,84,0.15)',
          overflowY: 'auto',
          height: '100%',
        }}
        className={`course-sidebar${open ? ' open' : ''}`}
      >
        <div style={{ padding: '1rem 0' }}>
          {modules.map(mod => {
            const completedCount = mod.lessons.filter(l => completed.has(l.id)).length
            const total = mod.lessons.length

            return (
              <div key={mod.id} style={{ marginBottom: '0.25rem' }}>
                {/* Module header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    marginBottom: '0.125rem',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '1rem', color: 'var(--on-surface-variant)' }}
                  >
                    {mod.icon}
                  </span>
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--on-surface)',
                      flex: 1,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {mod.title}
                  </span>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      color: 'var(--on-surface-variant)',
                      background: 'var(--surface-high)',
                      padding: '0.125rem 0.4rem',
                      borderRadius: '100px',
                    }}
                  >
                    {completedCount}/{total}
                  </span>
                </div>

                {/* Lessons */}
                {mod.lessons.map(lesson => {
                  const isCurrent = lesson.id === currentLessonId
                  const isDone = completed.has(lesson.id)

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        padding: '0.5rem 1rem 0.5rem 1.25rem',
                        background: isCurrent ? 'var(--surface-high)' : 'transparent',
                        border: 'none',
                        borderLeft: isCurrent
                          ? '3px solid transparent'
                          : '3px solid transparent',
                        backgroundImage: isCurrent
                          ? 'linear-gradient(var(--surface-high), var(--surface-high)), linear-gradient(135deg, #ddb7ff, #4d8eff)'
                          : 'none',
                        backgroundOrigin: isCurrent ? 'border-box' : 'initial',
                        backgroundClip: isCurrent ? 'padding-box, border-box' : 'initial',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.15s ease',
                        borderRadius: isCurrent ? '0 4px 4px 0' : '0',
                        position: 'relative',
                      }}
                    >
                      {/* Active border indicator */}
                      {isCurrent && (
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: '3px',
                            background: 'linear-gradient(135deg, #ddb7ff, #4d8eff)',
                            borderRadius: '0 2px 2px 0',
                          }}
                        />
                      )}

                      {/* Status icon */}
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: isDone
                            ? 'linear-gradient(135deg, #ddb7ff, #4d8eff)'
                            : 'transparent',
                          border: isDone
                            ? 'none'
                            : isCurrent
                            ? '2px solid var(--on-surface)'
                            : '2px solid var(--outline-variant)',
                        }}
                      >
                        {isDone && (
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '0.625rem', color: '#0e0e0e', fontVariationSettings: "'FILL' 1" }}
                          >
                            check
                          </span>
                        )}
                      </div>

                      {/* Title + meta */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '0.8125rem',
                            color: isCurrent ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                            fontWeight: isCurrent ? 500 : 400,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            marginBottom: '0.125rem',
                          }}
                        >
                          {lesson.title}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <span
                            style={{ fontSize: '0.6875rem', color: 'var(--outline-variant)' }}
                          >
                            {lesson.duration}
                          </span>
                          <span
                            style={{
                              fontSize: '0.625rem',
                              padding: '0.1rem 0.35rem',
                              borderRadius: '100px',
                              color: typeColors[lesson.type],
                              background: `${typeColors[lesson.type]}18`,
                            }}
                          >
                            {lesson.type}
                          </span>
                        </div>
                      </div>
                    </button>
                  )
                })}

                {/* Module divider */}
                <div
                  style={{
                    height: '1px',
                    background: 'rgba(70,69,84,0.1)',
                    margin: '0.5rem 1rem',
                  }}
                />
              </div>
            )
          })}
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .course-sidebar {
            position: fixed;
            top: 56px;
            left: 0;
            bottom: 0;
            z-index: 20;
            transform: translateX(-100%);
            transition: transform 0.25s ease;
          }
          .course-sidebar.open {
            transform: translateX(0);
          }
          .sidebar-backdrop {
            display: block !important;
          }
        }
      `}</style>
    </>
  )
}

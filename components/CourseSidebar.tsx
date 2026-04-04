'use client'

import { modules } from '@/lib/courseData'

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
          width: '296px',
          flexShrink: 0,
          background: 'var(--surface-lowest)',
          minHeight: 0,
          overflowY: 'auto',
          scrollbarGutter: 'stable',
          height: '100%',
        }}
        className={`course-sidebar${open ? ' open' : ''}`}
      >
        <div style={{ padding: '1rem 0.65rem' }}>
          {modules.map(mod => {
            const completedCount = mod.lessons.filter(l => completed.has(l.id)).length
            const total = mod.lessons.length

            return (
              <div
                key={mod.id}
                style={{
                  marginBottom: '0.75rem',
                  borderRadius: '10px',
                  background: 'var(--surface-lowest)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 0.85rem',
                    background: 'rgba(255, 255, 255, 0.03)',
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
                      fontSize: '0.79rem',
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
                      fontSize: '0.67rem',
                      color: 'var(--on-surface-variant)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '0.125rem 0.4rem',
                      borderRadius: '100px',
                    }}
                  >
                    {completedCount}/{total}
                  </span>
                </div>

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
                        padding: '0.56rem 0.85rem 0.56rem 1rem',
                        background: isCurrent ? 'rgba(255, 255, 255, 0.07)' : 'transparent',
                        border: 'none',
                        borderLeft: isCurrent
                          ? '3px solid transparent'
                          : '3px solid transparent',
                        backgroundImage: isCurrent
                          ? 'linear-gradient(var(--surface-highest), var(--surface-highest)), linear-gradient(135deg, #ddb7ff, #4d8eff)'
                          : 'none',
                        backgroundOrigin: isCurrent ? 'border-box' : 'initial',
                        backgroundClip: isCurrent ? 'padding-box, border-box' : 'initial',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.15s ease',
                        borderRadius: isCurrent ? '0 6px 6px 0' : '0',
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
                            ? '2px solid #b8c8f5'
                            : '2px solid var(--outline-variant)',
                        }}
                      >
                        {isDone && (
                          <span
                            className="material-symbols-outlined"
                             style={{ fontSize: '0.625rem', color: '#0b1020', fontVariationSettings: "'FILL' 1" }}
                          >
                            check
                          </span>
                        )}
                      </div>

                      {/* Title + meta */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                             fontSize: '0.8rem',
                            color: isCurrent ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                            fontWeight: isCurrent ? 500 : 400,
                             whiteSpace: 'nowrap',
                             overflow: 'hidden',
                             textOverflow: 'ellipsis',
                           }}
                         >
                           {lesson.title}
                         </div>
                      </div>
                    </button>
                  )
                })}

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

'use client'

import { useState } from 'react'
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
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(modules.map(mod => [mod.id, true]))
  )

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }))
  }

  return (
    <>
      {open && (
        <div
          onClick={() => onSelectLesson(currentLessonId)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(16, 15, 15, 0.62)',
            backdropFilter: 'blur(4px)',
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
          background: 'rgba(9, 10, 14, 0.86)',
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
                  borderRadius: '8px',
                  background: 'rgba(14, 16, 22, 0.96)',
                  boxShadow: 'none',
                  overflow: 'hidden',
                }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleModule(mod.id)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleModule(mod.id)
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 0.85rem',
                    background: 'rgba(18, 20, 28, 0.92)',
                    cursor: 'pointer',
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
                      background: 'rgba(16, 18, 25, 0.88)',
                      padding: '0.125rem 0.4rem',
                      borderRadius: '100px',
                    }}
                  >
                    {completedCount}/{total}
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: '1rem',
                      color: 'var(--on-surface-variant)',
                      transform: expandedModules[mod.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.18s ease',
                    }}
                    aria-hidden
                  >
                    expand_more
                  </span>
                </div>

                {expandedModules[mod.id] && mod.lessons.map(lesson => {
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
                        background: isCurrent ? 'var(--surface-highest)' : 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.15s ease',
                        borderRadius: '6px',
                        position: 'relative',
                      }}
                      onMouseOver={e => {
                        if (!isCurrent) e.currentTarget.style.background = 'var(--surface-highest)'
                      }}
                      onMouseOut={e => {
                        if (!isCurrent) e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      {isCurrent && (
                        <div
                          style={{
                            position: 'absolute',
                            left: '0.4rem',
                            top: 0,
                            bottom: 0,
                            width: '2px',
                            background: 'var(--gradient)',
                            borderRadius: '999px',
                            opacity: 0.9,
                          }}
                        />
                      )}

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
                            ? 'var(--gradient)'
                            : 'transparent',
                          border: isDone
                            ? 'none'
                            : isCurrent
                            ? '2px solid var(--secondary)'
                            : '2px solid rgba(74, 68, 85, 0.65)',
                        }}
                      >
                        {isDone && (
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '0.625rem', color: '#18171d', fontVariationSettings: "'FILL' 1" }}
                          >
                            check
                          </span>
                        )}
                      </div>

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
            top: calc(var(--mobile-header-height) + 0.75rem);
            left: 0.5rem;
            bottom: 0.5rem;
            z-index: 40;
            width: min(320px, calc(100vw - 1rem));
            height: auto;
            transform: translateX(-100%);
            transition: transform 0.25s ease;
            border-radius: 14px;
            border: 1px solid rgba(74, 68, 85, 0.28);
            box-shadow: 0 24px 64px rgba(0, 0, 0, 0.55);
            visibility: hidden;
            pointer-events: none;
          }
          .course-sidebar.open {
            transform: translateX(0);
            visibility: visible;
            pointer-events: auto;
          }
          .sidebar-backdrop {
            display: block !important;
            z-index: 35 !important;
          }
        }
      `}</style>
    </>
  )
}

'use client'

import LessonNav from '@/components/LessonNav'
import { allLessons } from '@/lib/courseData'

import Agents1 from '@/components/lessons/Agents1'
import Agents2 from '@/components/lessons/Agents2'
import Agents3 from '@/components/lessons/Agents3'
import Agents4 from '@/components/lessons/Agents4'
import Skills1 from '@/components/lessons/Skills1'
import Mcp1 from '@/components/lessons/Mcp1'
import Mcp2 from '@/components/lessons/Mcp2'
import Memory1 from '@/components/lessons/Memory1'
import Memory2 from '@/components/lessons/Memory2'
import Tokens1 from '@/components/lessons/Tokens1'
import Tokens2 from '@/components/lessons/Tokens2'
import Tokens3 from '@/components/lessons/Tokens3'

const lessonComponents: Record<string, React.ComponentType> = {
  'agents-1': Agents1,
  'agents-2': Agents2,
  'agents-3': Agents3,
  'agents-4': Agents4,
  'skills-1': Skills1,
  'mcp-1': Mcp1,
  'mcp-2': Mcp2,
  'memory-1': Memory1,
  'memory-2': Memory2,
  'tokens-1': Tokens1,
  'tokens-2': Tokens2,
  'tokens-3': Tokens3,
}

interface LessonViewerProps {
  lessonId: string
  onComplete: () => void
  onNext: () => void
  onPrev: () => void
  isCompleted: boolean
  hasNext: boolean
  hasPrev: boolean
}

export default function LessonViewer({
  lessonId,
  onComplete,
  onNext,
  onPrev,
  isCompleted,
  hasNext,
  hasPrev,
}: LessonViewerProps) {
  const currentIndex = allLessons.findIndex(l => l.id === lessonId)
  const isLast = currentIndex === allLessons.length - 1

  const LessonComponent = lessonComponents[lessonId]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        background: 'transparent',
      }}
    >
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', scrollbarGutter: 'stable' }}>
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            padding: '2rem 1.25rem 1.5rem',
          }}
        >
          <div
            style={{
              background: 'rgba(10, 12, 18, 0.7)',
              backdropFilter: 'blur(12px)',
              borderRadius: '12px',
              padding: '1.75rem clamp(1rem, 2.5vw, 2rem)',
              boxShadow: 'none',
            }}
          >
            {LessonComponent ? (
              <LessonComponent key={lessonId} />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '300px',
                  gap: '1rem',
                  color: 'var(--on-surface-variant)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '3rem', opacity: 0.3 }}>
                  school
                </span>
                <p style={{ fontSize: '1rem', margin: 0 }}>Lesson not found: {lessonId}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <LessonNav
        onPrev={onPrev}
        onNext={onNext}
        onComplete={onComplete}
        hasPrev={hasPrev}
        hasNext={hasNext}
        isCompleted={isCompleted}
        isLast={isLast}
      />
    </div>
  )
}

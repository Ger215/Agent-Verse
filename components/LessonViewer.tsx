'use client'

import LessonNav from '@/components/LessonNav'
import { allLessons } from '@/lib/courseData'

import Agents1 from '@/components/lessons/Agents1'
import Agents2 from '@/components/lessons/Agents2'
import Agents3 from '@/components/lessons/Agents3'
import Skills1 from '@/components/lessons/Skills1'
import Skills2 from '@/components/lessons/Skills2'
import Skills3 from '@/components/lessons/Skills3'
import Mcp1 from '@/components/lessons/Mcp1'
import Mcp2 from '@/components/lessons/Mcp2'
import Memory1 from '@/components/lessons/Memory1'
import Memory2 from '@/components/lessons/Memory2'
import Tokens1 from '@/components/lessons/Tokens1'
import Tokens2 from '@/components/lessons/Tokens2'
import Playground1 from '@/components/lessons/Playground1'

const lessonComponents: Record<string, React.ComponentType> = {
  'agents-1': Agents1,
  'agents-2': Agents2,
  'agents-3': Agents3,
  'skills-1': Skills1,
  'skills-2': Skills2,
  'skills-3': Skills3,
  'mcp-1': Mcp1,
  'mcp-2': Mcp2,
  'memory-1': Memory1,
  'memory-2': Memory2,
  'tokens-1': Tokens1,
  'tokens-2': Tokens2,
  'playground-1': Playground1,
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
      }}
    >
      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '2.5rem 2rem',
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

      {/* Fixed nav at bottom */}
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

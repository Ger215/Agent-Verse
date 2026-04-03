'use client'

import { useState } from 'react'
import TopBar from '@/components/TopBar'
import CourseSidebar from '@/components/CourseSidebar'
import LessonViewer from '@/components/LessonViewer'
import { allLessons } from '@/lib/courseData'

const STORAGE_KEY = 'obsidian-ai-progress'

function loadCompletedFromStorage(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return new Set()
    const ids: string[] = JSON.parse(stored)
    return new Set(ids)
  } catch {
    return new Set()
  }
}

export default function Home() {
  const [currentLessonId, setCurrentLessonId] = useState('agents-1')
  const [completed, setCompleted] = useState<Set<string>>(loadCompletedFromStorage)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const saveCompleted = (updated: Set<string>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(updated)))
    } catch {
      // ignore
    }
  }

  const handleComplete = () => {
    const updated = new Set(completed)
    updated.add(currentLessonId)
    setCompleted(updated)
    saveCompleted(updated)

    // Advance to next lesson
    const idx = allLessons.findIndex(l => l.id === currentLessonId)
    if (idx >= 0 && idx < allLessons.length - 1) {
      setCurrentLessonId(allLessons[idx + 1].id)
    }
  }

  const handleNext = () => {
    const idx = allLessons.findIndex(l => l.id === currentLessonId)
    if (idx >= 0 && idx < allLessons.length - 1) {
      setCurrentLessonId(allLessons[idx + 1].id)
    }
  }

  const handlePrev = () => {
    const idx = allLessons.findIndex(l => l.id === currentLessonId)
    if (idx > 0) {
      setCurrentLessonId(allLessons[idx - 1].id)
    }
  }

  const handleSelectLesson = (id: string) => {
    setCurrentLessonId(id)
    setSidebarOpen(false)
  }

  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId)
  const hasNext = currentIndex < allLessons.length - 1
  const hasPrev = currentIndex > 0

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        overflow: 'hidden',
        background: 'transparent',
        padding: '0.75rem',
      }}
    >
      <TopBar
        completed={completed}
        currentLessonId={currentLessonId}
        onMenuToggle={() => setSidebarOpen(o => !o)}
      />

      <div
        style={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          marginTop: '0.75rem',
          borderRadius: '16px',
          boxShadow: 'var(--panel-shadow)',
          background: 'var(--surface-lowest)',
        }}
      >
        <CourseSidebar
          currentLessonId={currentLessonId}
          completed={completed}
          onSelectLesson={handleSelectLesson}
          open={sidebarOpen}
        />

        <main
          style={{
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--surface-low)',
          }}
        >
          <LessonViewer
            key={currentLessonId}
            lessonId={currentLessonId}
            onComplete={handleComplete}
            onNext={handleNext}
            onPrev={handlePrev}
            isCompleted={completed.has(currentLessonId)}
            hasNext={hasNext}
            hasPrev={hasPrev}
          />
        </main>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import TopBar from '@/components/TopBar'
import CourseSidebar from '@/components/CourseSidebar'
import LessonViewer from '@/components/LessonViewer'
import { allLessons } from '@/lib/courseData'

const STORAGE_KEY = 'obsidian-ai-progress'

export default function Home() {
  const [currentLessonId, setCurrentLessonId] = useState('agents-1')
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const ids: string[] = JSON.parse(stored)
        setCompleted(new Set(ids))
      }
    } catch {
      // localStorage unavailable or corrupt — start fresh
    }
  }, [])

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
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--background)',
      }}
    >
      <TopBar
        completed={completed}
        currentLessonId={currentLessonId}
        onMenuToggle={() => setSidebarOpen(o => !o)}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <CourseSidebar
          currentLessonId={currentLessonId}
          completed={completed}
          onSelectLesson={handleSelectLesson}
          open={sidebarOpen}
        />

        <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
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

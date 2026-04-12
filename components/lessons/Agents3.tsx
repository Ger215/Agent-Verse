'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LessonHeader from '@/components/LessonHeader'

const permissionModes = [
  {
    id: 'default',
    label: 'Default',
    icon: 'shield',
    color: '#adc6ff',
    description: 'Claude asks before file edits and shell commands',
    prompt: 'Shift+Tab ×1',
  },
  {
    id: 'auto-edits',
    label: 'Auto-accept Edits',
    icon: 'edit_document',
    color: '#ddb7ff',
    description: 'Claude edits files without asking, but still asks for shell commands',
    prompt: 'Shift+Tab ×2',
  },
  {
    id: 'plan',
    label: 'Plan Mode',
    icon: 'checklist',
    color: '#f59e0b',
    description: 'Claude uses read-only tools and creates a plan, you approve before any changes are made',
    prompt: 'Shift+Tab ×3',
  },
]

const memoryTypes = [
  {
    icon: 'description',
    label: 'CLAUDE.md',
    color: '#ddb7ff',
    description: 'A markdown file in your project where you store conventions, patterns, and instructions that Claude should know every session. Persistent across sessions.',
    example: '## Code style\n- Use TypeScript strict mode\n- Prefer named exports\n- Tests go in __tests__/ dirs',
  },
  {
    icon: 'psychology',
    label: 'Auto Memory',
    color: '#adc6ff',
    description: 'Learnings Claude saves automatically as you work such as project patterns and your preferences.',
    example: '# Auto Memory\nUser prefers pnpm over npm.\nProject uses Tailwind v4 syntax.',
  },
  {
    icon: 'chat',
    label: 'Session Context',
    color: '#c7c4d7',
    description: 'Your conversation history within the current session which includes messages, tool results, file contents, this memory is lost when you start a new session.',
    example: '// In-memory only\n// Compacted automatically\n// when context fills up',
  },
]

export default function Agents3() {
  const [activeMode, setActiveMode] = useState('default')
  const [activeMemory, setActiveMemory] = useState('CLAUDE.md')

  const currentMemory = memoryTypes.find(m => m.label === activeMemory)!

  return (
    <div className="lesson-shell">
      <LessonHeader
        module="Agents"
        title="Sessions, Context & Control"
        duration="5 min"
        type="reading"
      />

      <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.0625rem' }}>
        Every Claude Code session has its own context window, the conversation history, file contents, tool results, and instructions that Claude holds in memory.
      </p>

      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
          What&apos;s inside the context window
        </p>
        <div style={{ background: 'rgba(9, 10, 14, 0.9)', borderRadius: '0.5rem', overflow: 'hidden' }}>
          {[
            { label: 'CLAUDE.md', size: 15, color: '#ddb7ff' },
            { label: 'Conversation history (Messages)', size: 30, color: '#adc6ff' },
            { label: 'System Tools', size: 35, color: '#4d8eff' },
            { label: 'Skills', size: 25, color: '#3FA04B' },
            { label: 'System prompt', size: 10, color: '#c7c4d7' },
            { label: 'Free space', size: 10, color: 'var(--surface-highest)' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.625rem 1rem' }}>
              <div style={{
                height: 8,
                width: `${item.size}%`,
                minWidth: 24,
                borderRadius: 4,
                background: item.color,
                flexShrink: 0,
              }} />
              <span style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)' }}>{item.label}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', marginTop: '0.625rem', lineHeight: 1.6 }}>
          As you work, context fills up, Claude compacts it automatically, but this can cause important information from the session to get lost.
        </p>
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        Three kinds of memory
      </p>
      <div className="lesson-tab-row" style={{ marginBottom: '1rem' }}>
        {memoryTypes.map(m => (
          <button
            key={m.label}
            onClick={() => setActiveMemory(m.label)}
            style={{
              flex: 1,
              padding: '0.625rem 0.5rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              background: activeMemory === m.label ? 'rgba(24, 28, 38, 0.96)' : 'rgba(9, 10, 14, 0.9)',
              transition: 'background 0.15s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <span className="material-symbols-outlined" style={{
              fontSize: '1.125rem',
              color: activeMemory === m.label ? m.color : 'var(--on-surface-variant)',
            }}>
              {m.icon}
            </span>
            <span style={{
              fontSize: '0.7rem',
              color: activeMemory === m.label ? 'var(--on-surface)' : 'var(--on-surface-variant)',
              fontWeight: activeMemory === m.label ? 600 : 400,
              textAlign: 'center',
            }}>
              {m.label}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeMemory}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <div className="lesson-card-grid-2" style={{ gap: '0.75rem' }}>
            <div style={{
              background: 'rgba(12, 14, 20, 0.94)',
              borderRadius: '0.5rem',
              padding: '1.25rem',
              borderLeft: `3px solid ${currentMemory.color}`,
            }}>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                {currentMemory.description}
              </p>
            </div>
            <div style={{ background: 'rgba(8, 9, 13, 0.96)', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <div style={{ padding: '0.375rem 0.875rem', background: 'rgba(12, 14, 20, 0.94)', fontSize: '0.75rem', color: 'var(--on-surface-variant)', borderBottom: '1px solid rgba(70,69,84,0.1)' }}>
                example
              </div>
              <pre style={{
                padding: '0.875rem',
                margin: 0,
                fontSize: '0.8125rem',
                lineHeight: 1.65,
                color: 'var(--on-surface-variant)',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
              }}>
                {currentMemory.example}
              </pre>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        Permission modes , press Shift+Tab to cycle
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.5rem' }}>
        {permissionModes.map(mode => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            style={{
              padding: '0.875rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              background: activeMode === mode.id ? 'rgba(24, 28, 38, 0.96)' : 'rgba(9, 10, 14, 0.9)',
              transition: 'background 0.15s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
              textAlign: 'left',
            }}
          >
            <span className="material-symbols-outlined" style={{
              fontSize: '1.25rem',
              color: activeMode === mode.id ? mode.color : 'var(--on-surface-variant)',
              flexShrink: 0,
            }}>
              {mode.icon}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ color: activeMode === mode.id ? 'var(--on-surface)' : 'var(--on-surface-variant)', fontWeight: 600, fontSize: '0.9rem' }}>
                  {mode.label}
                </span>
                <code style={{
                  fontSize: '0.7rem',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '0.25rem',
                   background: 'rgba(8, 9, 13, 0.96)',
                  color: 'var(--on-surface-variant)',
                  fontFamily: 'monospace',
                }}>
                  {mode.prompt}
                </code>
              </div>
              <AnimatePresence>
                {activeMode === mode.id && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ color: 'var(--on-surface-variant)', fontSize: '0.8375rem', lineHeight: 1.6, overflow: 'hidden' }}
                  >
                    {mode.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            {activeMode === mode.id && (
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: mode.color, flexShrink: 0 }} />
            )}
          </button>
        ))}
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        Context management commands
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.5rem' }}>
        {[
          {
            cmd: '/compact',
            icon: 'compress',
            color: '#ddb7ff',
            description: 'Summarizes the conversation history to free up space while preserving key decisions and context. Use this proactively before the window fills up.',
          },
          {
            cmd: '/clear',
            icon: 'delete_sweep',
            color: '#adc6ff',
            description: 'Wipes the entire session context and starts fresh. Useful when switching tasks or after a bad chain of reasoning that you want to abandon.',
          },
          {
            cmd: '/context',
            icon: 'data_usage',
            color: '#4d8eff',
            description: 'Shows how much of the context window is currently in use, broken down by category. Run this to know when to compact before Claude degrades.',
          },
        ].map(item => (
          <div
            key={item.cmd}
            style={{
              padding: '0.875rem 1rem',
              borderRadius: '0.375rem',
              background: 'rgba(9, 10, 14, 0.9)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.875rem',
              borderLeft: `3px solid ${item.color}`,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: item.color, marginTop: 2, flexShrink: 0 }}>
              {item.icon}
            </span>
            <div>
              <code style={{
                fontSize: '0.8125rem',
                color: item.color,
                background: 'rgba(24, 28, 38, 0.96)',
                padding: '0.125rem 0.5rem',
                borderRadius: '0.25rem',
                fontFamily: 'monospace',
                display: 'inline-block',
                marginBottom: '0.375rem',
              }}>
                {item.cmd}
              </code>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'rgba(9, 10, 14, 0.9)',
        borderRadius: '0.5rem',
        padding: '1.25rem',
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '1.5rem',
      }}>
        <span className="material-symbols-outlined" style={{ color: '#98d982', fontSize: '1.25rem', marginTop: 2, flexShrink: 0 }}>restore</span>
        <div>
          <p style={{ color: 'var(--on-surface)', fontWeight: 600, marginBottom: '0.375rem' }}>Every file edit is reversible</p>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.7 }}>
            Before Claude edits any file, it snapshots the current contents so if something goes wrong, you can press <code style={{ color: 'var(--on-surface)', background: 'rgba(24, 28, 38, 0.96)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.8125rem' }}>Esc Esc</code> to rewind, or just tell Claude to undo, checkpoints are local to your session and separate from git.
          </p>
        </div>
      </div>

      <div style={{
        background: 'rgba(9, 10, 14, 0.9)',
        borderRadius: '0.5rem',
        padding: '1.25rem',
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '2.5rem',
      }}>
        <span className="material-symbols-outlined" style={{ color: '#adc6ff', fontSize: '1.25rem', marginTop: 2, flexShrink: 0 }}>fork_right</span>
        <div>
          <p style={{ color: 'var(--on-surface)', fontWeight: 600, marginBottom: '0.375rem' }}>Sessions are independent but resumable</p>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.7 }}>
            Each new session starts with a fresh context, you can use{' '}
            <code style={{ color: 'var(--on-surface)', background: 'rgba(24, 28, 38, 0.96)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.8125rem' }}>claude --continue</code> or <code style={{ color: 'var(--on-surface)', background: 'rgba(24, 28, 38, 0.96)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.8125rem' }}>claude --resume</code>{' '}
            to pick up where you left off.
          </p>
        </div>
      </div>

    </div>
  )
}

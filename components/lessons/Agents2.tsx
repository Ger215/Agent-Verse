'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LessonHeader from '@/components/LessonHeader'

const toolCategories = [
  {
    id: 'files',
    icon: 'folder_open',
    label: 'File Operations',
    color: '#adc6ff',
    summary: 'Read, edit, create, rename, and reorganize files across your whole project.',
    examples: [
      { action: 'Read a file', code: 'Read: src/payments/token.ts' },
      { action: 'Edit code', code: 'Edit: src/payments/token.ts\n  line 42: await token.refresh()' },
      { action: 'Create a file', code: 'Write: src/utils/helpers.ts' },
    ],
    insight: 'Claude sees your entire project, not just the current file, it reads across directories to understand how components connect.',
  },
  {
    id: 'search',
    icon: 'manage_search',
    label: 'Search',
    color: '#ddb7ff',
    summary: 'Find files by pattern, search content with regex, and explore codebases to understand structure.',
    examples: [
      { action: 'Find files', code: 'Glob: src/**/*.test.ts' },
      { action: 'Search content', code: 'Grep: "token.refresh" → 3 matches' },
      { action: 'Find definition', code: 'Grep: "class TokenManager"' },
    ],
    insight: 'Before editing, Claude searches to understand where things are, this is how it avoids guessing.',
  },
  {
    id: 'execution',
    icon: 'terminal',
    label: 'Execution',
    color: '#98d982',
    summary: 'Run shell commands, start servers, run tests, and if needed also use git, basically anything you can do from the terminal.',
    examples: [
      { action: 'Run tests', code: '$ npm test\nPASS src/payments/ (3 tests)' },
      { action: 'Use git', code: '$ git diff HEAD\n$ git commit -m "fix: token refresh"' },
      { action: 'Build project', code: '$ npm run build\n✓ Compiled successfully' },
    ],
    insight: 'If you can run it from the command line, Claude can too, this is what makes it actually useful for real tasks.',
  },
  {
    id: 'web',
    icon: 'public',
    label: 'Web',
    color: '#f59e0b',
    summary: 'Search the web, fetch documentation, and look up error messages to get current information.',
    examples: [
      { action: 'Search the web', code: 'WebSearch: "next.js 16 breaking changes"' },
      { action: 'Fetch docs', code: 'WebFetch: https://nextjs.org/docs/app/...' },
      { action: 'Look up error', code: 'WebSearch: "ERR_MODULE_NOT_FOUND typescript"' },
    ],
    insight: 'Claude\'s training has a cutoff date so Web tools give it access to updated docs, changelogs, and answers.',
  },
  {
    id: 'intelligence',
    icon: 'psychology',
    label: 'Code Intelligence',
    color: '#c7c4d7',
    summary: 'See type errors and warnings after edits, jump to definitions, and find references (requires IDE plugins).',
    examples: [
      { action: 'Get diagnostics', code: 'getDiagnostics: 2 type errors found\n  src/token.ts:42 — Property \'refresh\'\n  does not exist on type \'Token\'.' },
      { action: 'Find references', code: 'References: TokenManager used in\n  src/payments/checkout.ts:18\n  src/auth/session.ts:34' },
    ],
    insight: 'With IDE plugins, Claude gets the same real-time feedback the IDE does, it can catch type errors immediately after making an edit.',
  },
]

export default function Agents2() {
  const [activeId, setActiveId] = useState('files')

  const active = toolCategories.find(t => t.id === activeId)!

  return (
    <div className="lesson-shell">
      <LessonHeader
        module="Agents"
        title="Models & Tools"
        duration="6 min"
        type="interactive"
      />

      <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: '0.75rem', fontSize: '1.0625rem' }}>
        The agentic loop runs on two things: a <strong style={{ color: 'var(--on-surface)' }}>model</strong> that reasons, and <strong style={{ color: 'var(--on-surface)' }}>tools</strong> that act. Without tools, Claude can only produce text, with them, it can read your code, run commands, search the web, and verify its own work.
      </p>
      <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.0625rem' }}>
        The built-in tools fall into five categories, select each one below to explore what it does.
      </p>

      <div style={{
        background: 'var(--surface)',
        borderRadius: '0.5rem',
        padding: '1rem 1.25rem',
        marginBottom: '2rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
      }}>
        <div style={{
          width: 40, height: 40,
          borderRadius: '0.375rem',
          background: 'var(--gradient)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: '#131313' }}>smart_toy</span>
        </div>
        <div>
          <p style={{ color: 'var(--on-surface)', fontWeight: 600, marginBottom: '0.25rem' }}>The Model (Claude Sonnet / Opus)</p>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            The reasoning engine, it understands your code, breaks work into steps, decides which tools to use, and interprets the results.
          </p>
        </div>
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        Tool Categories
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {toolCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveId(cat.id)}
            style={{
              padding: '0.5rem 0.875rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              background: activeId === cat.id ? 'var(--surface-highest)' : 'var(--surface-low)',
              transition: 'background 0.15s',
              outline: activeId === cat.id ? `1px solid ${cat.color}33` : 'none',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '1rem', color: activeId === cat.id ? cat.color : 'var(--on-surface-variant)' }}
            >
              {cat.icon}
            </span>
            <span style={{
              fontSize: '0.8125rem',
              color: activeId === cat.id ? 'var(--on-surface)' : 'var(--on-surface-variant)',
              fontWeight: activeId === cat.id ? 600 : 400,
            }}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.16 }}
        >
          <div style={{
            background: 'var(--surface)',
            borderRadius: '0.5rem',
            padding: '1.25rem 1.5rem',
            marginBottom: '1.25rem',
            borderLeft: `3px solid ${active.color}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: active.color }}>{active.icon}</span>
              <span style={{ color: 'var(--on-surface)', fontWeight: 600 }}>{active.label}</span>
            </div>
            <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.7, fontSize: '0.9375rem' }}>
              {active.summary}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {active.examples.map((ex, i) => (
              <div key={i} style={{ background: 'var(--surface-lowest)', borderRadius: '0.375rem', overflow: 'hidden' }}>
                <div style={{
                  padding: '0.375rem 0.875rem',
                  background: 'var(--surface-low)',
                  fontSize: '0.75rem',
                  color: 'var(--on-surface-variant)',
                  borderBottom: '1px solid rgba(70,69,84,0.1)',
                }}>
                  {ex.action}
                </div>
                <pre style={{
                  padding: '0.75rem 0.875rem',
                  margin: 0,
                  fontSize: '0.8125rem',
                  lineHeight: 1.65,
                  color: 'var(--on-surface-variant)',
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                }}>
                  {ex.code}
                </pre>
              </div>
            ))}
          </div>

          <div style={{
            padding: '1rem 1.25rem',
            background: 'var(--surface-low)',
            borderRadius: '0.375rem',
            display: 'flex',
            gap: '0.625rem',
            alignItems: 'flex-start',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: active.color, marginTop: 2, flexShrink: 0 }}>info</span>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.65 }}>
              {active.insight}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div style={{ marginTop: '2.5rem' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          How they chain together
        </p>
        <div style={{ background: 'var(--surface-low)', borderRadius: '0.5rem', padding: '1.25rem' }}>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', marginBottom: '0.875rem', lineHeight: 1.7 }}>
            When you say <em style={{ color: 'var(--on-surface)' }}>&ldquo;fix the failing tests&rdquo;</em>, Claude might:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { step: 1, icon: 'terminal', color: '#98d982', text: 'Run the test suite to see what\'s failing' },
              { step: 2, icon: 'manage_search', color: '#ddb7ff', text: 'Search for the relevant source files' },
              { step: 3, icon: 'folder_open', color: '#adc6ff', text: 'Read those files to understand the code' },
              { step: 4, icon: 'edit', color: '#ddb7ff', text: 'Edit the files to fix the issue' },
              { step: 5, icon: 'terminal', color: '#98d982', text: 'Run the tests again to verify' },
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'var(--surface-highest)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.6875rem', color: 'var(--on-surface-variant)', fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {item.step}
                </span>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: item.color, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)' }}>{item.text}</span>
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.8125rem', marginTop: '0.875rem', lineHeight: 1.6 }}>
            Each tool use gives Claude new information that enriches the next step, this is the <strong style={{ color: 'var(--on-surface)' }}>Agentic Loop</strong> in action.
          </p>
        </div>
      </div>
    </div>
  )
}

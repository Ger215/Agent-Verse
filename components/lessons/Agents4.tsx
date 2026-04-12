'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LessonHeader from '@/components/LessonHeader'

const builtInAgents = [
  {
    name: 'Explore',
    model: 'Haiku',
    tools: 'Read-only',
    color: '#ddb7ff',
    icon: 'travel_explore',
    desc: 'Fast, read-only agent optimized for searching and analyzing codebases. Claude uses it whenever it needs to understand code without making changes, keeping exploration results out of your main context.',
  },
  {
    name: 'Plan',
    model: 'Inherits',
    tools: 'Read-only',
    color: '#adc6ff',
    icon: 'checklist',
    desc: "Used during Plan Mode to gather codebase context before presenting a plan. Subagents cannot spawn other subagents, so this prevents infinite nesting while still researching what's needed.",
  },
  {
    name: 'General-purpose',
    model: 'Inherits',
    tools: 'All tools',
    color: '#4d8eff',
    icon: 'smart_toy',
    desc: 'Capable agent for complex, multi-step tasks that require both exploration and action , code modifications, multi-file operations, or tasks with multiple dependent steps.',
  },
]

const benefits = [
  { icon: 'hub', color: '#ddb7ff', label: 'Preserve context', desc: 'Exploration and heavy tasks stay out of your main conversation' },
  { icon: 'lock', color: '#adc6ff', label: 'Enforce constraints', desc: 'Limit which tools a subagent can use for safety' },
  { icon: 'recycling', color: '#4d8eff', label: 'Reuse configs', desc: 'Define once, available across all your projects' },
  { icon: 'savings', color: '#98d982', label: 'Control costs', desc: 'Route lightweight tasks to faster, cheaper models like Haiku' },
]

const scopeOptions = [
  {
    id: 'project',
    label: 'Project',
    path: '.claude/agents/',
    color: '#ddb7ff',
    desc: 'Available only in this project. Check into version control so your team can use and improve them collaboratively.',
  },
  {
    id: 'user',
    label: 'Personal',
    path: '~/.claude/agents/',
    color: '#4d8eff',
    desc: 'Available in all your projects on this machine. Great for personal workflows you reuse everywhere.',
  },
]

export default function Agents4() {
  const [activeAgent, setActiveAgent] = useState('Explore')
  const [activeScope, setActiveScope] = useState('project')

  const currentAgent = builtInAgents.find(a => a.name === activeAgent)!
  const currentScope = scopeOptions.find(s => s.id === activeScope)!

  return (
    <div className="lesson-shell">
      <LessonHeader
        module="Agents"
        title="Subagents"
        duration="5 min"
        type="reading"
      />

      <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.0625rem' }}>
        Subagents are specialized AI assistants that run in their own context window. When a task would flood your main conversation with logs, search results, or file contents you won&apos;t need again, Claude delegates it to a subagent, which does the work in isolation and returns only the summary.
      </p>

      <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        Why use subagents
      </p>
      <div className="lesson-card-grid-2" style={{ gap: '0.5rem', marginBottom: '2.5rem' }}>
        {benefits.map(item => (
          <div key={item.label} style={{ background: 'rgba(9, 10, 14, 0.9)', borderRadius: '0.375rem', padding: '0.875rem', display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: item.color, marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <p style={{ color: 'var(--on-surface)', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.2rem' }}>{item.label}</p>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.75rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        Built-in subagents
      </p>
      <div className="lesson-tab-row" style={{ marginBottom: '1rem' }}>
        {builtInAgents.map(a => (
          <button
            key={a.name}
            onClick={() => setActiveAgent(a.name)}
            style={{
              flex: 1,
              padding: '0.625rem 0.5rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              background: activeAgent === a.name ? 'rgba(24, 28, 38, 0.96)' : 'rgba(9, 10, 14, 0.9)',
              transition: 'background 0.15s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: activeAgent === a.name ? a.color : 'var(--on-surface-variant)' }}>
              {a.icon}
            </span>
            <span style={{ fontSize: '0.7rem', color: activeAgent === a.name ? 'var(--on-surface)' : 'var(--on-surface-variant)', fontWeight: activeAgent === a.name ? 600 : 400, textAlign: 'center' }}>
              {a.name}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeAgent}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <div style={{ background: 'rgba(9, 10, 14, 0.9)', borderRadius: '0.5rem', padding: '1.25rem', borderLeft: `3px solid ${currentAgent.color}` }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <code style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', background: 'rgba(24, 28, 38, 0.96)', color: 'var(--on-surface-variant)', fontFamily: 'monospace' }}>
                model: {currentAgent.model}
              </code>
              <code style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', background: 'rgba(24, 28, 38, 0.96)', color: 'var(--on-surface-variant)', fontFamily: 'monospace' }}>
                tools: {currentAgent.tools}
              </code>
            </div>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
              {currentAgent.desc}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        Create a custom subagent
      </p>
      <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
        Run <code style={{ color: 'var(--on-surface)', background: 'rgba(24, 28, 38, 0.96)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.8125rem' }}>/agents</code> to open the interactive manager, or create a Markdown file with YAML frontmatter. Choose where to save it:
      </p>

      <div className="lesson-tab-row" style={{ marginBottom: '1rem' }}>
        {scopeOptions.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveScope(s.id)}
            style={{
              flex: 1,
              padding: '0.625rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              background: activeScope === s.id ? 'rgba(24, 28, 38, 0.96)' : 'rgba(9, 10, 14, 0.9)',
              transition: 'background 0.15s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ fontSize: '0.8125rem', color: activeScope === s.id ? 'var(--on-surface)' : 'var(--on-surface-variant)', fontWeight: activeScope === s.id ? 600 : 400 }}>
              {s.label}
            </span>
            <code style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', background: 'rgba(8, 9, 13, 0.96)', color: activeScope === s.id ? currentScope.color : 'var(--on-surface-variant)', fontFamily: 'monospace' }}>
              {s.path}
            </code>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeScope}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <div style={{ background: 'rgba(8, 9, 13, 0.96)', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <div style={{ padding: '0.375rem 0.875rem', background: 'rgba(12, 14, 20, 0.94)', fontSize: '0.75rem', color: 'var(--on-surface-variant)', borderBottom: '1px solid rgba(70,69,84,0.1)', display: 'flex', justifyContent: 'space-between' }}>
              <span>{currentScope.path}code-reviewer.md</span>
              <span style={{ color: currentScope.color }}>{currentScope.label.toLowerCase()} scope</span>
            </div>
            <pre style={{ padding: '0.875rem', margin: 0, fontSize: '0.8125rem', lineHeight: 1.65, color: 'var(--on-surface-variant)', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>{`---
name: code-reviewer
description: Reviews code for quality, security, and best practices
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. Analyze the code and provide
specific, actionable feedback on quality, security,
and best practices. Show the problematic code and
a corrected version for each issue you find.`}</pre>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', marginTop: '0.625rem', lineHeight: 1.6 }}>
            {currentScope.desc}
          </p>
        </motion.div>
      </AnimatePresence>

      <div style={{ background: 'rgba(9, 10, 14, 0.9)', borderRadius: '0.5rem', padding: '1.25rem', display: 'flex', gap: '0.75rem' }}>
        <span className="material-symbols-outlined" style={{ color: '#f59e0b', fontSize: '1.25rem', marginTop: 2, flexShrink: 0 }}>warning</span>
        <div>
          <p style={{ color: 'var(--on-surface)', fontWeight: 600, marginBottom: '0.375rem' }}>Subagents cannot spawn other subagents</p>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
            Nesting is intentionally blocked. If you need multiple agents working in parallel and communicating with each other, use <strong style={{ color: 'var(--on-surface)' }}>Agent Teams</strong> instead, they coordinate across separate sessions.
          </p>
        </div>
      </div>
    </div>
  )
}

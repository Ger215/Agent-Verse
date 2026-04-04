'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LessonHeader from '@/components/LessonHeader'

const steps = [
  {
    id: 0,
    phase: 'Gather Context',
    icon: 'search',
    color: '#adc6ff',
    description: 'Claude reads relevant code, explores files, and understands structure before touching anything.',
    example: 'Run the test suite → read error output → search for relevant source files → read them to understand the code',
    toolLabel: '$ npm test',
    toolOutput: 'FAIL src/payments/checkout.test.ts\n  ✗ should handle expired cards\n    Error: Token refresh failed after expiry\n    at tokenRefresh (src/payments/token.ts:42)',
  },
  {
    id: 1,
    phase: 'Take Action',
    icon: 'edit',
    color: '#ddb7ff',
    description: 'Claude edits files, runs commands and calls APIs, whatever the task requires, based on what it learned on the previous step.',
    example: 'Edit the source file to fix the token refresh logic',
    toolLabel: 'Edit: src/payments/token.ts',
    toolOutput: '- if (token.expiry < Date.now()) throw new Error(\'Token expired\')\n+ if (token.expiry < Date.now()) await token.refresh()',
  },
  {
    id: 2,
    phase: 'Verify Results',
    icon: 'check_circle',
    color: '#98d982',
    description: 'Claude checks its own work, runs tests, reads output, and decides if the task is done or needs another iteration of the Agentic Loop.',
    example: 'Run the tests again to confirm the fix worked',
    toolLabel: '$ npm test',
    toolOutput: 'PASS src/payments/checkout.test.ts\n  ✓ should handle expired cards (42ms)\n  ✓ should process valid cards (18ms)\n\nTest Suites: 1 passed, 1 total',
  },
]

export default function Agents1() {
  const [activeStep, setActiveStep] = useState(0)
  const [loopCount, setLoopCount] = useState(0)

  const current = steps[activeStep]
  const isLast = activeStep === steps.length - 1

  const advance = () => {
    if (isLast) {
      setLoopCount(c => c + 1)
      setActiveStep(0)
    } else {
      setActiveStep(s => s + 1)
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
      <LessonHeader
        module="Agents"
        title="The Agentic Loop"
        duration="5 min"
        type="interactive"
      />

      <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: '0.75rem', fontSize: '1.0625rem' }}>
        When you give Claude a task, it does not solve it in one response, it works in a loop called the "Agentic Loop".
      </p>

      <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '1.0625rem' }}>
        These three phases repeat until the task is fully complete:
      </p>

      <ul style={{ color: 'var(--on-surface-variant)', marginTop: 0, marginBottom: '1.25rem', paddingLeft: '1.35rem', lineHeight: 1.8, fontSize: '1.0625rem' }}>
        <li>1. <strong style={{ color: 'var(--on-surface)' }}>Gather context</strong></li>
        <li>2. <strong style={{ color: 'var(--on-surface)' }}>Take action</strong></li>
        <li>3. <strong style={{ color: 'var(--on-surface)' }}>Verify results</strong></li>
      </ul>

      {/* Prompt being solved */}
      <div style={{
        background: 'var(--surface-low)',
        borderRadius: '0.5rem',
        padding: '1rem 1.25rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
      }}>
        <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)', fontSize: '1.25rem', marginTop: 2 }}>person</span>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', marginBottom: '0.25rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Example prompt</p>
          <p style={{ color: 'var(--on-surface)', fontStyle: 'italic' }}>
            &ldquo;Fix the checkout flow broken for users with expired cards&rdquo;
          </p>
        </div>
      </div>

      {/* Phase tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {steps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(i)}
            style={{
              flex: 1,
              padding: '0.75rem 0.5rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              background: activeStep === i ? 'var(--surface-highest)' : 'var(--surface-low)',
              transition: 'background 0.2s',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {activeStep === i && (
              <motion.div
                layoutId="phase-underline"
                style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: 2,
                  background: step.color,
                  pointerEvents: 'none',
                }}
              />
            )}
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: '1.125rem',
                color: activeStep === i ? step.color : 'var(--on-surface-variant)',
                display: 'block',
                marginBottom: '0.25rem',
              }}
            >
              {step.icon}
            </span>
            <span style={{
              fontSize: '0.75rem',
              color: activeStep === i ? 'var(--on-surface)' : 'var(--on-surface-variant)',
              fontWeight: activeStep === i ? 600 : 400,
              display: 'block',
            }}>
              {step.phase}
            </span>
          </button>
        ))}
      </div>

      {/* Step detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          <div style={{
            background: 'var(--surface)',
            borderRadius: '0.5rem',
            padding: '1.25rem 1.5rem',
            marginBottom: '1rem',
            borderLeft: `3px solid ${current.color}`,
          }}>
            <p style={{ color: 'var(--on-surface)', lineHeight: 1.7, marginBottom: '0.625rem' }}>
              {current.description}
            </p>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              {current.example}
            </p>
          </div>

          {/* Tool output */}
          <div style={{ background: 'var(--surface-lowest)', borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div style={{
              padding: '0.5rem 1rem',
              background: 'var(--surface-low)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderBottom: '1px solid rgba(70,69,84,0.15)',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)' }}>terminal</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)', fontFamily: 'monospace' }}>
                {current.toolLabel}
              </span>
            </div>
            <pre style={{
              padding: '1rem',
              margin: 0,
              fontSize: '0.8125rem',
              lineHeight: 1.7,
              color: 'var(--on-surface-variant)',
              fontFamily: 'monospace',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
            }}>
              {current.toolOutput}
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--on-surface-variant)' }}>
            Phase {activeStep + 1} of {steps.length}
          </span>
          {loopCount > 0 && (
            <span style={{
              fontSize: '0.75rem',
              padding: '0.125rem 0.5rem',
              borderRadius: '9999px',
              background: 'var(--surface-highest)',
              color: 'var(--on-surface-variant)',
            }}>
              Loop ×{loopCount + 1}
            </span>
          )}
        </div>
        <button
          onClick={advance}
          style={{
            padding: '0.625rem 1.25rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #ddb7ff, #4d8eff)',
            color: '#131313',
            fontWeight: 600,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}
        >
          {isLast ? (
            <>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>refresh</span>
              Run loop again
            </>
          ) : (
            <>
              Next phase
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
            </>
          )}
        </button>
      </div>

      {/* Key callout */}
      <div style={{
        marginTop: '2.5rem',
        padding: '1.25rem',
        background: 'var(--surface-low)',
        borderRadius: '0.5rem',
        display: 'flex',
        gap: '0.75rem',
      }}>
        <span className="material-symbols-outlined" style={{ color: '#ddb7ff', fontSize: '1.25rem', marginTop: 2, flexShrink: 0 }}>lightbulb</span>
        <div>
          <p style={{ color: 'var(--on-surface)', fontWeight: 600, marginBottom: '0.375rem' }}>The loop adapts to the task</p>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            A quick question might only need context gathering. A bug fix cycles through all three phases. A large refactor might loop dozens of times — Claude chains actions together and course-corrects as it learns. You can interrupt at any point to steer it differently.
          </p>
        </div>
      </div>
    </div>
  )
}

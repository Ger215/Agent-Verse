'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LessonHeader from '@/components/LessonHeader'
import { SKILL_FILES } from '@/lib/skillContent'

const cliSkills = [
  {
    id: 'gh',
    name: 'Github',
    tool: 'GitHub',
    color: '#e6edf3',
    logo: 'https://cdn.simpleicons.org/github/e6edf3',
    description: 'PRs, issues, Actions runs, and repos.',
    replacedMcp: false,
  },
  {
    id: 'glab',
    name: 'GitLab',
    tool: 'GitLab',
    color: '#fb923c',
    logo: 'https://cdn.simpleicons.org/gitlab/fb923c',
    description: 'MRs, issues, CI/CD pipelines, and repos.',
    replacedMcp: false,
  },
  {
    id: 'acli',
    name: 'Atlassian',
    tool: 'Jira / Confluence',
    color: '#0052CC',
    logo: 'https://cdn.simpleicons.org/atlassian/0052CC',
    description: 'Jira and Confluence via OAuth. Replaces the Atlassian MCP entirely.',
    replacedMcp: true,
  },
]

const restSkills = [
  {
    id: 'clickup',
    name: 'Clickup',
    tool: 'ClickUp',
    color: '#4d8eff',
    logo: 'https://cdn.simpleicons.org/clickup/4d8eff',
    description: 'Tasks, lists, spaces, and comments. Auth via $CLICKUP_API_TOKEN.',
  },
  {
    id: 'figma-api',
    name: 'Figma',
    tool: 'Figma',
    color: '#a78bfa',
    logo: 'https://cdn.simpleicons.org/figma/a78bfa',
    description: 'Files, nodes, components, styles, and comments. Auth via $FIGMA_API_TOKEN.',
  },
  {
    id: 'slite',
    name: 'Slite',
    tool: 'Slite',
    color: '#38bdf8',
    logo: 'https://www.google.com/s2/favicons?domain=slite.com&sz=64',
    description: 'Read, create, and update docs on your Slite workspace. Auth via $SLITE_API_TOKEN.',
  },
]

const decisionSteps = [
  { question: 'Does the tool ship a CLI binary?', yes: 'cli', no: null },
  { question: 'Does the tool have a REST API?', yes: 'rest', no: 'mcp' },
]

function DownloadButton({ skillId, color }: { skillId: string; color: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const handleDownload = () => {
    setStatus('loading')
    try {
      const content = SKILL_FILES[skillId]
      if (!content) throw new Error('Not found')
      const blob = new Blob([content], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'SKILL.md'
      a.click()
      URL.revokeObjectURL(url)
      setStatus('done')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2000)
    }
  }

  const label = status === 'loading' ? 'Downloading...' : status === 'done' ? 'Downloaded' : status === 'error' ? 'Not found' : 'Download SKILL.md'
  const icon = status === 'done' ? 'check' : status === 'error' ? 'error' : 'download'

  return (
    <button
      onClick={handleDownload}
      disabled={status === 'loading'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.625rem 1rem',
        borderRadius: '0.375rem',
        border: `1px solid ${status === 'done' ? '#86efac44' : status === 'error' ? '#fca5a544' : color + '44'}`,
        background: status === 'done' ? 'rgba(134,239,172,0.08)' : status === 'error' ? 'rgba(252,165,165,0.08)' : `${color}08`,
        color: status === 'done' ? '#86efac' : status === 'error' ? '#fca5a5' : color,
        fontSize: '0.8125rem',
        fontWeight: 500,
        cursor: status === 'loading' ? 'wait' : 'pointer',
        transition: 'all 0.15s',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>{icon}</span>
      {label}
    </button>
  )
}

export default function Mcp3() {
  const [activeCliSkill, setActiveCliSkill] = useState('gh')
  const [activeRestSkill, setActiveRestSkill] = useState('clickup')
  const [decisionStep, setDecisionStep] = useState(0)
  const [decisionResult, setDecisionResult] = useState<string | null>(null)

  const currentCli = cliSkills.find(s => s.id === activeCliSkill)!
  const currentRest = restSkills.find(s => s.id === activeRestSkill)!

  const handleDecision = (answer: 'yes' | 'no') => {
    const step = decisionSteps[decisionStep]
    if (answer === 'yes' && step.yes) {
      setDecisionResult(step.yes)
    } else if (answer === 'no' && step.no) {
      setDecisionResult(step.no)
    } else if (answer === 'no' && !step.no) {
      setDecisionStep(1)
    }
  }

  const resetDecision = () => {
    setDecisionStep(0)
    setDecisionResult(null)
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
      <LessonHeader
        module="MCP Protocol"
        title="MCP Alternatives: CLIs or REST APIs + Skills"
        duration="6 min"
        type="interactive"
      />

      <p style={{ color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.0625rem' }}>
        MCPs are powerful, but they require running server processes which consume a lot of tokens and as you may know, many tools have a CLI or a REST API that can be used to interact with them,
        in those cases you can skip MCPs entirely and use a skill that teaches Claude how to talk to the tool directly.
        Less infrastructure, less tokens to get the same result.
      </p>

      {/* Decision tree */}
      <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        Which approach should I use?
      </p>
      <div style={{ background: 'rgba(9, 10, 14, 0.9)', borderRadius: '0.5rem', padding: '1.25rem', marginBottom: '2.5rem' }}>
        <AnimatePresence mode="wait">
          {decisionResult ? (
            <motion.div key="result" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}>
              {decisionResult === 'mcp' ? (
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span className="material-symbols-outlined" style={{ color: '#f59e0b', fontSize: '1.25rem', marginTop: 2, flexShrink: 0 }}>hub</span>
                  <div>
                    <p style={{ color: 'var(--on-surface)', fontWeight: 600, marginBottom: '0.375rem' }}>Use MCP</p>
                    <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
                      No CLI and no REST API available. The tool likely needs a dedicated MCP server. Check if one already exists before building your own.
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span className="material-symbols-outlined" style={{ color: decisionResult === 'cli' ? '#34d399' : '#4d8eff', fontSize: '1.25rem', marginTop: 2, flexShrink: 0 }}>
                    {decisionResult === 'cli' ? 'terminal' : 'api'}
                  </span>
                  <div>
                    <p style={{ color: 'var(--on-surface)', fontWeight: 600, marginBottom: '0.375rem' }}>
                      Use {decisionResult === 'cli' ? 'CLI + Skill' : 'REST API + Skill'}
                    </p>
                    <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
                      {decisionResult === 'cli'
                        ? 'Install the CLI, write a skill with the key commands and patterns. No server, no config.'
                        : 'Store the API key in an env var, write a skill with the base URL and common curl patterns.'}
                    </p>
                  </div>
                </div>
              )}
              <button onClick={resetDecision} style={{ marginTop: '0.875rem', background: 'rgba(24,28,38,0.96)', border: 'none', borderRadius: '0.375rem', padding: '0.375rem 0.75rem', fontSize: '0.75rem', color: 'var(--on-surface-variant)', cursor: 'pointer' }}>
                Start over
              </button>
            </motion.div>
          ) : (
            <motion.div key={`step-${decisionStep}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}>
              <p style={{ color: 'var(--on-surface)', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1rem' }}>
                {decisionSteps[decisionStep].question}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleDecision('yes')} style={{ padding: '0.5rem 1.25rem', borderRadius: '0.375rem', border: '1px solid rgba(52,211,153,0.4)', background: 'rgba(52,211,153,0.08)', color: '#86efac', fontSize: '0.875rem', cursor: 'pointer', fontWeight: 600 }}>
                  Yes
                </button>
                <button onClick={() => handleDecision('no')} style={{ padding: '0.5rem 1.25rem', borderRadius: '0.375rem', border: '1px solid rgba(70,69,84,0.3)', background: 'rgba(24,28,38,0.96)', color: 'var(--on-surface-variant)', fontSize: '0.875rem', cursor: 'pointer' }}>
                  No
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Disclaimer ──────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '0.5rem', padding: '0.875rem 1rem', marginBottom: '2rem' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: '#f59e0b', flexShrink: 0, marginTop: 1 }}>warning</span>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.8125rem', lineHeight: 1.7, margin: 0 }}>
          The skill files below are <strong style={{ color: 'var(--on-surface)' }}>starting points, not drop-in solutions,</strong> each one will need to be adapted to your own setup, binary paths, workspace IDs, API tokens, project keys, and auth methods will differ from environment to environment so treat them just as templates.
        </p>
      </div>

      {/* ── CLI + Skill ──────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#34d399' }}>terminal</span>
        <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>CLI + Skill</p>
      </div>
      <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
        The tool ships a binary, the skill teaches Claude which commands to run, which flags to use, and gotchas like binary path overrides.
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
        {cliSkills.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveCliSkill(s.id)}
            style={{
              flex: 1,
              padding: '0.625rem 0.5rem',
              borderRadius: '0.375rem',
              border: `1px solid ${activeCliSkill === s.id ? s.color + '66' : 'rgba(70,69,84,0.2)'}`,
              background: activeCliSkill === s.id ? `${s.color}10` : 'rgba(9,10,14,0.9)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              position: 'relative',
              transition: 'all 0.15s',
            }}
          >
            <img src={s.logo} alt={s.tool} width={16} height={16} style={{ opacity: activeCliSkill === s.id ? 1 : 0.4, transition: 'opacity 0.15s' }} />
            <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: activeCliSkill === s.id ? 'var(--on-surface)' : 'var(--on-surface-variant)', fontWeight: activeCliSkill === s.id ? 600 : 400 }}>{s.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeCliSkill} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }} style={{ marginBottom: '2.5rem' }}>
          <div style={{ background: 'rgba(9,10,14,0.9)', borderRadius: '0.5rem', padding: '1rem 1.25rem', borderLeft: `3px solid ${currentCli.color}`, display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <img src={currentCli.logo} alt={currentCli.tool} width={18} height={18} />
                <p style={{ color: 'var(--on-surface)', fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>{currentCli.tool}</p>
              </div>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.8125rem', lineHeight: 1.6, margin: 0 }}>{currentCli.description}</p>
              <code style={{ fontSize: '0.7rem', color: 'var(--on-surface-variant)', opacity: 0.6, marginTop: '0.375rem', display: 'block' }}>~/.claude/skills/{currentCli.id}/SKILL.md</code>
            </div>
            <div style={{ flexShrink: 0, width: 160 }}>
              <DownloadButton skillId={currentCli.id} color={currentCli.color} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── REST API + Skill ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#4d8eff' }}>api</span>
        <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>REST API + Skill</p>
      </div>
      <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
        The tool only has an HTTP API. The skill defines the base URL, auth header, and the most common curl patterns so Claude never has to guess.
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
        {restSkills.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveRestSkill(s.id)}
            style={{
              flex: 1,
              padding: '0.625rem 0.5rem',
              borderRadius: '0.375rem',
              border: `1px solid ${activeRestSkill === s.id ? s.color + '66' : 'rgba(70,69,84,0.2)'}`,
              background: activeRestSkill === s.id ? `${s.color}10` : 'rgba(9,10,14,0.9)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'all 0.15s',
            }}
          >
            <img src={s.logo} alt={s.tool} width={16} height={16} style={{ opacity: activeRestSkill === s.id ? 1 : 0.4, transition: 'opacity 0.15s' }} />
            <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: activeRestSkill === s.id ? 'var(--on-surface)' : 'var(--on-surface-variant)', fontWeight: activeRestSkill === s.id ? 600 : 400 }}>{s.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeRestSkill} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }} style={{ marginBottom: '2.5rem' }}>
          <div style={{ background: 'rgba(9,10,14,0.9)', borderRadius: '0.5rem', padding: '1rem 1.25rem', borderLeft: `3px solid ${currentRest.color}`, display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <img src={currentRest.logo} alt={currentRest.tool} width={18} height={18} />
                <p style={{ color: 'var(--on-surface)', fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>{currentRest.tool}</p>
              </div>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.8125rem', lineHeight: 1.6, margin: 0 }}>{currentRest.description}</p>
              <code style={{ fontSize: '0.7rem', color: 'var(--on-surface-variant)', opacity: 0.6, marginTop: '0.375rem', display: 'block' }}>~/.claude/skills/{currentRest.id}/SKILL.md</code>
            </div>
            <div style={{ flexShrink: 0, width: 160 }}>
              <DownloadButton skillId={currentRest.id} color={currentRest.color} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── When to still use MCP ────────────────────────────────────────────── */}
      <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        When to still use MCP
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {[
          { icon: 'sync_alt', text: 'The tool requires bidirectional, real-time communication (e.g. streaming events)' },
          { icon: 'key', text: 'Auth is complex, OAuth flows, token refresh, multiple scopes' },
          { icon: 'groups', text: 'The integration must be shared across a whole team with centralized config' },
          { icon: 'extension', text: 'An official MCP server already exists, no reason to reinvent it' },
        ].map((item, i) => (
          <div key={i} style={{ background: 'rgba(9,10,14,0.9)', borderRadius: '0.375rem', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#f59e0b', marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

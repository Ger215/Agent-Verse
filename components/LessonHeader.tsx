interface LessonHeaderProps {
  module: string
  title: string
  duration: string
  type: 'reading' | 'interactive' | 'exercise'
}

const moduleIcons: Record<string, string> = {
  Agents: 'smart_toy',
  'Skills': 'bolt',
  'MCP Protocol': 'account_tree',
  Engram: 'memory',
  'Token Optimization': 'generating_tokens',
}

export default function LessonHeader({ module, title }: LessonHeaderProps) {
  const moduleIcon = moduleIcons[module] ?? 'menu_book'

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.22rem 0.6rem', borderRadius: '999px', background: 'var(--surface-high)', marginBottom: '0.9rem' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '0.9rem', color: 'var(--secondary)' }}>{moduleIcon}</span>
        <p
          style={{
            fontSize: '0.71rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--on-surface-variant)',
            margin: 0,
          }}
        >
          {module}
        </p>
      </div>
      <h1
        style={{
          fontSize: 'clamp(1.65rem, 2.7vw, 2.2rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--on-surface)',
          lineHeight: 1.15,
          margin: '0 0 1.05rem 0',
        }}
      >
        {title}
      </h1>
    </div>
  )
}

const typeColors: Record<string, string> = {
  reading: '#4d8eff',
  interactive: '#ddb7ff',
  exercise: '#f59e0b',
}

const typeLabels: Record<string, string> = {
  reading: 'Reading',
  interactive: 'Interactive',
  exercise: 'Exercise',
}

interface LessonHeaderProps {
  module: string
  title: string
  duration: string
  type: 'reading' | 'interactive' | 'exercise'
}

export default function LessonHeader({ module, title, duration, type }: LessonHeaderProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.22rem 0.6rem', borderRadius: '999px', background: 'var(--surface-high)', marginBottom: '0.9rem' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '0.9rem', color: 'var(--secondary)' }}>auto_awesome</span>
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.8125rem',
            color: 'var(--on-surface-variant)',
            background: 'var(--surface-high)',
            borderRadius: '999px',
            padding: '0.2rem 0.55rem',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>schedule</span>
          {duration}
        </span>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            padding: '0.2rem 0.6rem',
            borderRadius: '100px',
            background: `${typeColors[type]}22`,
            color: typeColors[type],
            border: `1px solid ${typeColors[type]}44`,
          }}
        >
          {typeLabels[type]}
        </span>
      </div>
    </div>
  )
}

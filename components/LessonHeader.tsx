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
      <p
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--on-surface-variant)',
          marginBottom: '0.75rem',
          margin: '0 0 0.75rem 0',
        }}
      >
        {module}
      </p>
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--on-surface)',
          lineHeight: 1.2,
          margin: '0 0 1rem 0',
        }}
      >
        {title}
      </h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.8125rem',
            color: 'var(--on-surface-variant)',
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

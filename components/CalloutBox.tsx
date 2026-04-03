import { ReactNode } from 'react'

const variantStyles: Record<string, { border: string; bg: string; icon: string; iconColor: string }> = {
  info: {
    border: '#4d8eff',
    bg: '#4d8eff14',
    icon: 'info',
    iconColor: '#4d8eff',
  },
  warning: {
    border: '#f59e0b',
    bg: '#f59e0b14',
    icon: 'warning',
    iconColor: '#f59e0b',
  },
  tip: {
    border: '#ddb7ff',
    bg: '#ddb7ff14',
    icon: 'lightbulb',
    iconColor: '#ddb7ff',
  },
}

interface CalloutBoxProps {
  children: ReactNode
  variant?: 'info' | 'warning' | 'tip'
}

export default function CalloutBox({ children, variant = 'tip' }: CalloutBoxProps) {
  const s = variantStyles[variant]
  return (
    <div
      style={{
        borderLeft: `3px solid ${s.border}`,
        background: s.bg,
        borderRadius: '0 8px 8px 0',
        padding: '1rem 1.25rem',
        margin: '1.5rem 0',
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'flex-start',
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: '1.125rem', color: s.iconColor, flexShrink: 0, marginTop: '0.125rem' }}
      >
        {s.icon}
      </span>
      <div style={{ color: 'var(--on-surface)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  )
}

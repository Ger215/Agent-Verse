import { ReactNode } from 'react'

const variantStyles: Record<string, { border: string; bg: string; icon: string; iconColor: string }> = {
  info: {
    border: '#4d8eff',
    bg: 'linear-gradient(135deg, rgba(77,142,255,0.16), rgba(77,142,255,0.06))',
    icon: 'info',
    iconColor: '#4d8eff',
  },
  warning: {
    border: '#f59e0b',
    bg: 'linear-gradient(135deg, rgba(245,158,11,0.16), rgba(245,158,11,0.06))',
    icon: 'warning',
    iconColor: '#f59e0b',
  },
  tip: {
    border: '#ddb7ff',
    bg: 'linear-gradient(135deg, rgba(221,183,255,0.18), rgba(221,183,255,0.06))',
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
        borderRadius: '0 10px 10px 0',
        padding: '1rem 1.25rem',
        margin: '1.5rem 0',
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'flex-start',
        boxShadow: '0 0 0 1px rgba(70, 69, 84, 0.14)',
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

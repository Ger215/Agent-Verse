import { ReactNode } from 'react'

const variantStyles: Record<string, { border: string; bg: string; icon: string; iconColor: string }> = {
  info: {
    border: 'rgba(59,130,246,0.4)',
    bg: 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(59,130,246,0.06))',
    icon: 'info',
    iconColor: 'var(--secondary)',
  },
  warning: {
    border: 'rgba(255,183,132,0.4)',
    bg: 'linear-gradient(135deg, rgba(255,183,132,0.2), rgba(217,119,6,0.06))',
    icon: 'warning',
    iconColor: 'var(--tertiary)',
  },
  tip: {
    border: 'rgba(124,58,237,0.4)',
    bg: 'linear-gradient(135deg, rgba(210,187,255,0.2), rgba(124,58,237,0.08))',
    icon: 'lightbulb',
    iconColor: 'var(--primary)',
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
      className="lesson-inline-row lesson-mobile-stack"
      style={{
        boxShadow: 'none',
        background: s.bg,
        borderRadius: '8px',
        padding: '1rem 1.25rem',
        margin: '1.5rem 0',
        gap: '0.75rem',
        alignItems: 'flex-start',
        backdropFilter: 'blur(12px)',
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

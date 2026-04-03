interface CodeBlockProps {
  code: string
  language?: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div
      style={{
        background: 'var(--surface-lowest)',
        borderRadius: '12px',
        overflow: 'hidden',
        margin: '1.5rem 0',
        boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(70, 69, 84, 0.15)',
      }}
    >
      {language && (
        <div
          style={{
            padding: '0.55rem 1rem',
            borderBottom: '1px solid rgba(70, 69, 84, 0.15)',
            fontSize: '0.72rem',
            color: 'var(--on-surface-variant)',
            fontFamily: 'monospace',
            background: 'var(--surface)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {language}
        </div>
      )}
      <pre
        style={{
          margin: 0,
          padding: '1.1rem 1.25rem 1.25rem',
          overflowX: 'auto',
          fontSize: '0.8125rem',
          lineHeight: 1.7,
          color: 'var(--on-surface)',
          fontFamily: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, monospace',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

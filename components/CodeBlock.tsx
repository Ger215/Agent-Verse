interface CodeBlockProps {
  code: string
  language?: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div
      style={{
        background: 'rgba(15, 17, 23, 0.78)',
        borderRadius: '10px',
        overflow: 'hidden',
        margin: '1.5rem 0',
        backdropFilter: 'blur(12px)',
        boxShadow: 'none',
      }}
    >
      {language && (
        <div
          style={{
            padding: '0.55rem 1rem',
            fontSize: '0.72rem',
            color: 'var(--on-surface-variant)',
            fontFamily: 'monospace',
            background: 'rgba(9, 10, 14, 0.82)',
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

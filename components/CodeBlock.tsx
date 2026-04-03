interface CodeBlockProps {
  code: string
  language?: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div
      style={{
        background: 'var(--surface-lowest)',
        border: '1px solid var(--outline-variant)',
        borderRadius: '8px',
        overflow: 'hidden',
        margin: '1.5rem 0',
      }}
    >
      {language && (
        <div
          style={{
            padding: '0.5rem 1rem',
            borderBottom: '1px solid var(--outline-variant)',
            fontSize: '0.75rem',
            color: 'var(--on-surface-variant)',
            fontFamily: 'monospace',
          }}
        >
          {language}
        </div>
      )}
      <pre
        style={{
          margin: 0,
          padding: '1.25rem',
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

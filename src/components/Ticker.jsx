const items = [
  'React',               'Brand Identity',     'Claude API',
  'Figma',               'Python',             'Packaging',
  'Prompt Engineering',  'Vite',               'Print Design',
  'Node.js',             'AI Workflows',       'Typography',
  'JavaScript',          'Visual Systems',     'REST APIs',
];

export default function Ticker() {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div style={{
      overflow: 'hidden',
      padding: '28px 0',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(255,255,255,0.018)',
      position: 'relative',
    }}>
      {/* Fade masks */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(90deg,
            #090909 0%,
            transparent 8%,
            transparent 92%,
            #090909 100%
          )
        `,
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      <div style={{
        display: 'flex',
        gap: '0',
        animation: 'ticker 28s linear infinite',
        width: 'max-content',
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            padding: '0 28px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px',
            fontWeight: '500',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: i % 3 === 0 ? '#B57BFF' : 'rgba(232,224,245,0.35)',
            whiteSpace: 'nowrap',
          }}>
            {item}
            <span style={{
              display: 'inline-block',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'rgba(181,123,255,0.4)',
              flexShrink: 0,
            }} />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

import { useEffect } from 'react';

const SectionLabel = ({ children }) => (
  <p style={{
    fontSize: '0.68rem',
    fontWeight: '600',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'rgba(181,123,255,0.7)',
    marginBottom: '10px',
    fontFamily: 'var(--font-body)',
  }}>
    {children}
  </p>
);

export default function ProjectDrawer({ project, onClose }) {
  const { drawer } = project;

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(8,6,14,0.55)',
          backdropFilter: 'blur(3px)',
          zIndex: 1000,
          animation: 'drawerOverlayIn 0.25s ease',
        }}
      />

      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 'min(520px, 100vw)',
        background: 'rgba(11,8,20,0.97)',
        backdropFilter: 'blur(28px)',
        borderLeft: '1px solid rgba(181,123,255,0.15)',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        animation: 'drawerSlideIn 0.3s cubic-bezier(0.22,0.61,0.36,1)',
      }}>
        {/* Sticky header */}
        <div style={{
          padding: '26px 30px 20px',
          background: 'rgba(11,8,20,0.99)',
          borderBottom: '1px solid rgba(181,123,255,0.1)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
          flexShrink: 0,
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.45rem',
            fontWeight: '700',
            color: '#f1eef8',
            letterSpacing: '-0.3px',
            lineHeight: '1.2',
          }}>
            {project.title}
          </h2>
          <button
            onClick={onClose}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              border: '1px solid rgba(181,123,255,0.18)',
              background: 'rgba(181,123,255,0.06)',
              color: 'rgba(241,238,248,0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{
          overflowY: 'auto',
          flex: 1,
          padding: '26px 30px 48px',
        }}>
          {/* Subtitle */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            color: 'rgba(241,238,248,0.62)',
            lineHeight: '1.55',
            marginBottom: '8px',
          }}>
            {drawer.subtitle}
          </p>

          {/* Meta */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.76rem',
            color: 'rgba(181,123,255,0.75)',
            letterSpacing: '0.2px',
            marginBottom: '22px',
          }}>
            {drawer.meta}
          </p>

          {/* Open live button */}
          <a
            href={drawer.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: '999px',
              background: 'rgba(181,123,255,0.1)',
              border: '1px solid rgba(181,123,255,0.26)',
              color: '#c9a8ff',
              fontSize: '0.82rem',
              fontWeight: '600',
              fontFamily: 'var(--font-body)',
              marginBottom: '30px',
              textDecoration: 'none',
            }}
          >
            Open live project
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Snapshot grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            marginBottom: '26px',
          }}>
            {[
              { label: 'Role', value: drawer.snapshot.role },
              { label: 'Focus', value: drawer.snapshot.focus },
              { label: 'Stack', value: drawer.snapshot.stack },
            ].map(({ label, value }) => (
              <div key={label} style={{
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(15,12,26,0.7)',
                border: '1px solid rgba(181,123,255,0.1)',
              }}>
                <p style={{
                  fontSize: '0.65rem',
                  fontWeight: '600',
                  letterSpacing: '1.8px',
                  textTransform: 'uppercase',
                  color: 'rgba(181,123,255,0.65)',
                  marginBottom: '5px',
                  fontFamily: 'var(--font-body)',
                }}>
                  {label}
                </p>
                <p style={{
                  fontSize: '0.78rem',
                  color: 'rgba(241,238,248,0.82)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: '1.4',
                }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Challenge / Solution */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '26px' }}>
            {[
              { label: 'Challenge', text: drawer.challenge },
              { label: 'Solution', text: drawer.solution },
            ].map(({ label, text }) => (
              <div key={label} style={{
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(15,12,26,0.7)',
                border: '1px solid rgba(181,123,255,0.1)',
              }}>
                <p style={{
                  fontSize: '0.65rem',
                  fontWeight: '600',
                  letterSpacing: '1.8px',
                  textTransform: 'uppercase',
                  color: 'rgba(181,123,255,0.65)',
                  marginBottom: '7px',
                  fontFamily: 'var(--font-body)',
                }}>
                  {label}
                </p>
                <p style={{
                  fontSize: '0.82rem',
                  color: 'rgba(241,238,248,0.65)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: '1.55',
                }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Technical decisions */}
          <SectionLabel>Technical Decisions</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '26px' }}>
            {drawer.decisions.map((d, i) => (
              <div key={i} style={{
                padding: '14px 18px',
                borderRadius: '12px',
                background: 'rgba(15,12,26,0.7)',
                border: '1px solid rgba(181,123,255,0.1)',
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  color: 'rgba(181,123,255,0.45)',
                  paddingTop: '3px',
                  flexShrink: 0,
                  minWidth: '18px',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p style={{
                    fontSize: '0.83rem',
                    fontWeight: '600',
                    color: 'rgba(241,238,248,0.88)',
                    fontFamily: 'var(--font-body)',
                    marginBottom: '3px',
                  }}>
                    {d.title}
                  </p>
                  <p style={{
                    fontSize: '0.8rem',
                    color: 'rgba(241,238,248,0.5)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: '1.5',
                  }}>
                    {d.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stack pills */}
          <SectionLabel>Stack</SectionLabel>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '7px',
            marginBottom: '26px',
          }}>
            {drawer.stack.map((tech) => (
              <span key={tech} style={{
                padding: '4px 11px',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-body)',
                fontWeight: '500',
                background: 'rgba(13,10,22,0.85)',
                color: 'rgba(218,200,244,0.82)',
                border: '1px solid rgba(181,123,255,0.17)',
              }}>
                {tech}
              </span>
            ))}
          </div>

          {/* What it shows */}
          <SectionLabel>What it shows</SectionLabel>
          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(241,238,248,0.58)',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.65',
            padding: '16px 18px',
            borderRadius: '12px',
            background: 'rgba(15,12,26,0.7)',
            border: '1px solid rgba(181,123,255,0.1)',
          }}>
            {drawer.shows}
          </p>
        </div>
      </div>
    </>
  );
}

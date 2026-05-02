import { useEffect, useState } from 'react';

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

const Card = ({ children, style }) => (
  <div style={{
    padding: '14px 16px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.025)',
    border: '1px solid rgba(255,255,255,0.07)',
    ...style,
  }}>
    {children}
  </div>
);

const CardLabel = ({ children }) => (
  <p style={{
    fontSize: '0.65rem',
    fontWeight: '600',
    letterSpacing: '1.8px',
    textTransform: 'uppercase',
    color: 'rgba(181,123,255,0.65)',
    marginBottom: '5px',
    fontFamily: 'var(--font-body)',
  }}>
    {children}
  </p>
);

function GalleryImage({ src }) {
  const [error, setError] = useState(false);
  return error ? (
    <div style={{
      width: '100%',
      aspectRatio: '4/3',
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
    }} />
  ) : (
    <img
      src={src}
      alt=""
      onError={() => setError(true)}
      style={{
        width: '100%',
        display: 'block',
        borderRadius: '12px',
        objectFit: 'cover',
      }}
    />
  );
}

export default function ProjectDrawer({ project, onClose }) {
  const { drawer } = project;
  const isDesign = !!drawer.overview;

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
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(3,3,4,0.85)',
          zIndex: 1000,
          animation: 'modalOverlayIn 0.2s ease',
        }}
      />

      {/* Modal wrapper */}
      <div className="project-modal-wrap">
        <div
          className="project-modal"
          style={{
            background: 'rgba(12,11,15,0.98)',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(181,123,255,0.05)',
          }}
        >
          {/* Header */}
          <div className="project-modal-header">
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.35rem, 2.4vw, 1.9rem)',
                fontWeight: '700',
                color: '#f1eef8',
                letterSpacing: '-0.4px',
                lineHeight: '1.2',
                marginBottom: '6px',
              }}>
                {project.title}
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-body)',
                color: 'rgba(241,238,248,0.65)',
                lineHeight: '1.45',
                marginBottom: '5px',
              }}>
                {drawer.subtitle}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-label)',
                color: 'rgba(181,123,255,0.7)',
                letterSpacing: '0.2px',
              }}>
                {drawer.meta}
              </p>
            </div>

            <div className="project-modal-header-actions">
              {drawer.url && (
                <a
                  href={drawer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '8px 16px',
                    borderRadius: '999px',
                    background: 'rgba(18,18,20,0.92)',
                    border: '1px solid rgba(181,123,255,0.2)',
                    color: 'rgba(241,238,248,0.88)',
                    fontSize: 'var(--fs-btn)',
                    fontWeight: '600',
                    fontFamily: 'var(--font-body)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Open project
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )}
              <button
                onClick={onClose}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.09)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(241,238,248,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  cursor: 'none',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="project-modal-body">

            {isDesign ? (
              <>
                {/* Overview */}
                <SectionLabel>Overview</SectionLabel>
                <p style={{
                  fontSize: 'var(--fs-body)',
                  color: 'rgba(241,238,248,0.65)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: '1.65',
                  padding: '16px 18px',
                  borderRadius: '12px',
                  background: 'rgba(12,9,22,0.6)',
                  border: '1px solid rgba(181,123,255,0.1)',
                  marginBottom: '24px',
                }}>
                  {drawer.overview}
                </p>

                {/* Gallery */}
                {drawer.gallery && (
                  <>
                    <SectionLabel>Work Samples</SectionLabel>
                    <div className="design-gallery">
                      {drawer.gallery.map((src, i) => (
                        <GalleryImage key={i} src={src} />
                      ))}
                    </div>
                  </>
                )}

                {/* Disciplines */}
                <SectionLabel>Disciplines</SectionLabel>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '7px',
                  marginBottom: '24px',
                }}>
                  {drawer.stack.map((item) => (
                    <span key={item} style={{
                      padding: '4px 11px',
                      borderRadius: '999px',
                      fontSize: 'var(--fs-label)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: '500',
                      background: 'rgba(16,16,18,0.92)',
                      color: 'rgba(200,196,212,0.75)',
                      border: '1px solid rgba(181,123,255,0.13)',
                    }}>
                      {item}
                    </span>
                  ))}
                </div>

                {/* What it shows */}
                <SectionLabel>What it shows</SectionLabel>
                <p style={{
                  fontSize: 'var(--fs-body)',
                  color: 'rgba(241,238,248,0.65)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: '1.65',
                  padding: '16px 18px',
                  borderRadius: '12px',
                  background: 'rgba(12,9,22,0.6)',
                  border: '1px solid rgba(181,123,255,0.1)',
                }}>
                  {drawer.shows}
                </p>
              </>
            ) : (
              <>
                {/* Snapshot — 3 cols */}
                <div className="project-modal-snap-grid">
                  {[
                    { label: 'Role', value: drawer.snapshot.role },
                    { label: 'Focus', value: drawer.snapshot.focus },
                    { label: 'Stack', value: drawer.snapshot.stack },
                  ].map(({ label, value }) => (
                    <Card key={label}>
                      <CardLabel>{label}</CardLabel>
                      <p style={{
                        fontSize: 'var(--fs-body)',
                        color: 'rgba(241,238,248,0.82)',
                        fontFamily: 'var(--font-body)',
                        lineHeight: '1.4',
                      }}>
                        {value}
                      </p>
                    </Card>
                  ))}
                </div>

                {/* Challenge / Solution — 2 cols */}
                <div className="project-modal-2col">
                  {[
                    { label: 'Challenge', text: drawer.challenge },
                    { label: 'Solution', text: drawer.solution },
                  ].map(({ label, text }) => (
                    <Card key={label} style={{ padding: '18px 20px' }}>
                      <CardLabel>{label}</CardLabel>
                      <p style={{
                        fontSize: 'var(--fs-body)',
                        color: 'rgba(241,238,248,0.7)',
                        fontFamily: 'var(--font-body)',
                        lineHeight: '1.55',
                      }}>
                        {text}
                      </p>
                    </Card>
                  ))}
                </div>

                {/* Technical decisions — 2 cols */}
                <SectionLabel>Technical Decisions</SectionLabel>
                <div className="project-modal-2col">
                  {drawer.decisions.map((d, i) => (
                    <Card key={i} style={{ padding: '14px 18px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
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
                          fontSize: 'var(--fs-body)',
                          fontWeight: '600',
                          color: 'rgba(241,238,248,0.88)',
                          fontFamily: 'var(--font-body)',
                          marginBottom: '3px',
                        }}>
                          {d.title}
                        </p>
                        <p style={{
                          fontSize: 'var(--fs-body)',
                          color: 'rgba(241,238,248,0.55)',
                          fontFamily: 'var(--font-body)',
                          lineHeight: '1.5',
                        }}>
                          {d.text}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Stack pills */}
                <SectionLabel>Stack</SectionLabel>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '7px',
                  marginBottom: '24px',
                }}>
                  {drawer.stack.map((tech) => (
                    <span key={tech} style={{
                      padding: '4px 11px',
                      borderRadius: '999px',
                      fontSize: 'var(--fs-label)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: '500',
                      background: 'rgba(16,16,18,0.92)',
                      color: 'rgba(200,196,212,0.75)',
                      border: '1px solid rgba(181,123,255,0.13)',
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* What it shows */}
                <SectionLabel>What it shows</SectionLabel>
                <p style={{
                  fontSize: 'var(--fs-body)',
                  color: 'rgba(241,238,248,0.65)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: '1.65',
                  padding: '16px 18px',
                  borderRadius: '12px',
                  background: 'rgba(12,9,22,0.6)',
                  border: '1px solid rgba(181,123,255,0.1)',
                }}>
                  {drawer.shows}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

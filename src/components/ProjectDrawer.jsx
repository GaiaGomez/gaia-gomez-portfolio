import { useEffect, useState } from 'react';

// ── Primitive UI pieces ───────────────────────────────────

const SectionLabel = ({ children }) => (
  <p style={{
    fontSize: 'var(--text-meta)',
    fontWeight: '600',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--color-lavender)',
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
    background: '#070708',
    border: '1px solid rgba(243,233,216,0.10)',
    ...style,
  }}>
    {children}
  </div>
);

const CardLabel = ({ children }) => (
  <p style={{
    fontSize: 'var(--text-meta)',
    fontWeight: '600',
    letterSpacing: '1.8px',
    textTransform: 'uppercase',
    color: 'var(--color-lavender)',
    marginBottom: '5px',
    fontFamily: 'var(--font-body)',
    opacity: 0.75,
  }}>
    {children}
  </p>
);

// Consistent section block: label + content + bottom gap
const Section = ({ label, children }) => (
  <div style={{ marginBottom: '28px' }}>
    <SectionLabel>{label}</SectionLabel>
    {children}
  </div>
);

// ── Case study components ─────────────────────────────────

// Pill chain showing a user workflow left-to-right
const FlowDiagram = ({ steps, note }) => (
  <div>
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      alignItems: 'center',
      padding: '16px 18px',
      borderRadius: '12px',
      background: '#050506',
      border: '1px solid rgba(243,233,216,0.10)',
    }}>
      {steps.map((step, i) => (
        <span key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            padding: '5px 13px',
            borderRadius: '999px',
            background: '#080809',
            border: '1px solid rgba(243,233,216,0.12)',
            color: 'rgba(241,238,248,0.88)',
            fontSize: 'var(--text-nav)',
            fontWeight: '500',
            fontFamily: 'var(--font-body)',
            whiteSpace: 'nowrap',
          }}>
            {step}
          </span>
          {i < steps.length - 1 && (
            <span style={{ color: 'rgba(168,145,196,0.38)', fontSize: '0.7rem', flexShrink: 0 }}>→</span>
          )}
        </span>
      ))}
    </div>
    {note && (
      <p style={{
        fontSize: 'var(--text-meta)',
        color: 'rgba(241,238,248,0.32)',
        fontFamily: 'var(--font-body)',
        marginTop: '8px',
        fontStyle: 'italic',
      }}>
        {note}
      </p>
    )}
  </div>
);

// Labeled rows showing the tech stack by layer
const ArchitectureMap = ({ layers }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    borderRadius: '12px',
    background: '#050506',
    border: '1px solid rgba(243,233,216,0.10)',
    overflow: 'hidden',
  }}>
    {layers.map((layer, i) => (
      <div key={layer.label} style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0',
        borderBottom: i < layers.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}>
        <div style={{
          width: '84px',
          flexShrink: 0,
          padding: '10px 14px',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          alignSelf: 'stretch',
          background: '#070708',
        }}>
          <span style={{
            fontSize: 'var(--text-meta)',
            color: 'rgba(168,145,196,0.5)',
            fontFamily: 'var(--font-body)',
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            fontWeight: '600',
            lineHeight: 1.2,
          }}>
            {layer.label}
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', padding: '10px 14px', flex: 1 }}>
          {layer.items.map(item => (
            <span key={item} style={{
              padding: '3px 9px',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(241,238,248,0.7)',
              fontSize: 'var(--text-meta)',
              fontFamily: 'var(--font-body)',
              whiteSpace: 'nowrap',
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

// Reusable numbered 2-col card grid for decisions / ux / tradeoffs
// Uses CSS class so the mobile single-column breakpoint applies
const NumberedCards = ({ items }) => (
  <div className="project-modal-2col" style={{ marginBottom: 0, gap: '8px' }}>
    {items.map((d, i) => (
      <Card key={i} style={{ padding: '14px 18px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.65rem',
          fontWeight: '700',
          color: 'var(--color-lavender)',
          opacity: 0.45,
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
            marginBottom: '4px',
          }}>
            {d.title}
          </p>
          <p style={{
            fontSize: 'var(--fs-body)',
            color: 'rgba(241,238,248,0.5)',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.55',
          }}>
            {d.text}
          </p>
        </div>
      </Card>
    ))}
  </div>
);

// What this proves — lavender-tinted hiring signal cards
const ProofCards = ({ items }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '8px',
  }}>
    {items.map((item, i) => (
      <div key={i} style={{
        padding: '14px 16px',
        borderRadius: '12px',
        background: '#050506',
        border: '1px solid rgba(243,233,216,0.10)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
      }}>
        <span style={{
          color: 'var(--color-lavender)',
          flexShrink: 0,
          fontSize: '0.65rem',
          marginTop: '4px',
          opacity: 0.75,
        }}>
          ✦
        </span>
        <p style={{
          fontSize: 'var(--fs-body)',
          color: 'rgba(241,238,248,0.8)',
          fontFamily: 'var(--font-body)',
          lineHeight: '1.5',
        }}>
          {item}
        </p>
      </div>
    ))}
  </div>
);

// Gallery image with error fallback
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
      style={{ width: '100%', display: 'block', borderRadius: '12px', objectFit: 'cover' }}
    />
  );
}

// ── Main drawer component ─────────────────────────────────

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
          background: 'rgba(0,0,0,0.86)',
          zIndex: 1000,
          animation: 'modalOverlayIn 0.2s ease',
        }}
      />

      {/* Modal */}
      <div className="project-modal-wrap">
        <div
          className="project-modal"
          style={{
            background: '#030304',
            border: '1px solid rgba(243,233,216,0.12)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.82), 0 0 0 1px rgba(243,233,216,0.04)',
          }}
        >
          {/* ── Header ─────────────────────────────────── */}
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
                color: 'rgba(241,238,248,0.58)',
                lineHeight: '1.45',
                marginBottom: '5px',
              }}>
                {drawer.subtitle}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-label)', letterSpacing: '0.2px' }}>
                {drawer.meta.split(' · ').map((part, i) => (
                  <span key={i}>
                    {i > 0 && <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 4px' }}>·</span>}
                    <span style={{ color: 'rgba(168,145,196,0.7)' }}>{part}</span>
                  </span>
                ))}
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
                    gap: '6px',
                    background: 'none',
                    border: 'none',
                    padding: '4px 0',
                    color: 'var(--color-cream)',
                    fontSize: 'var(--fs-btn)',
                    fontWeight: '600',
                    fontFamily: 'var(--font-body)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    cursor: 'none',
                    transition: 'color 0.22s, gap 0.22s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--color-lavender)';
                    e.currentTarget.style.gap = '10px';
                    const svg = e.currentTarget.querySelector('svg');
                    if (svg) svg.style.transform = 'translate(2px,-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--color-cream)';
                    e.currentTarget.style.gap = '6px';
                    const svg = e.currentTarget.querySelector('svg');
                    if (svg) svg.style.transform = 'none';
                  }}
                >
                  Open project
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, transition: 'transform 0.22s' }}>
                    <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )}
              <button
                onClick={onClose}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.09)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(241,238,248,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── Body ───────────────────────────────────── */}
          <div className="project-modal-body">

            {isDesign ? (
              /* ── Design project branch ── */
              <>
                <Section label="Overview">
                  <p style={{
                    fontSize: 'var(--fs-body)',
                    color: 'rgba(241,238,248,0.65)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: '1.65',
                    padding: '16px 18px',
                    borderRadius: '12px',
                    background: '#050506',
                    border: '1px solid rgba(243,233,216,0.10)',
                  }}>
                    {drawer.overview}
                  </p>
                </Section>

                {drawer.gallery && (
                  <Section label="Work Samples">
                    <div className="design-gallery" style={{ marginBottom: 0 }}>
                      {drawer.gallery.map((src, i) => (
                        <GalleryImage key={i} src={src} />
                      ))}
                    </div>
                  </Section>
                )}

                <Section label="Disciplines">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {drawer.stack.map(item => (
                      <span key={item} style={{
                        padding: '4px 11px',
                        borderRadius: '999px',
                        fontSize: 'var(--fs-label)',
                        fontFamily: 'var(--font-body)',
                        fontWeight: '500',
                        background: '#080809',
                        color: 'var(--color-lavender)',
                        border: '1px solid rgba(243,233,216,0.12)',
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </Section>

                <Section label="What it shows">
                  <p style={{
                    fontSize: 'var(--fs-body)',
                    color: 'rgba(241,238,248,0.65)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: '1.65',
                    padding: '16px 18px',
                    borderRadius: '12px',
                    background: '#050506',
                    border: '1px solid rgba(243,233,216,0.10)',
                  }}>
                    {drawer.shows}
                  </p>
                </Section>
              </>
            ) : (
              /* ── Dev project branch ── */
              <>
                {/* 1. Snapshot */}
                <div style={{ marginBottom: '28px' }}>
                  <div className="project-modal-snap-grid" style={{ marginBottom: 0 }}>
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
                </div>

                {/* 2. Problem + Solution */}
                <div style={{ marginBottom: '28px' }}>
                  <div className="project-modal-2col" style={{ marginBottom: 0, gap: '8px' }}>
                    {[
                      { label: 'Problem', text: drawer.challenge },
                      { label: 'Solution', text: drawer.solution },
                    ].map(({ label, text }) => (
                      <Card key={label} style={{ padding: '18px 20px' }}>
                        <CardLabel>{label}</CardLabel>
                        <p style={{
                          fontSize: 'var(--fs-body)',
                          color: 'rgba(241,238,248,0.68)',
                          fontFamily: 'var(--font-body)',
                          lineHeight: '1.62',
                        }}>
                          {text}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* 3. Workflow */}
                {drawer.flow?.length > 0 && (
                  <Section label="Workflow">
                    <FlowDiagram steps={drawer.flow} note={drawer.flowNote} />
                  </Section>
                )}

                {/* 4. Architecture */}
                {drawer.architecture?.length > 0 && (
                  <Section label="Architecture">
                    <ArchitectureMap layers={drawer.architecture} />
                  </Section>
                )}

                {/* 5. Technical Decisions */}
                {drawer.decisions?.length > 0 && (
                  <Section label="Technical Decisions">
                    <NumberedCards items={drawer.decisions} />
                  </Section>
                )}

                {/* 6. UX Decisions */}
                {drawer.ux?.length > 0 && (
                  <Section label="UX Decisions">
                    <NumberedCards items={drawer.ux} />
                  </Section>
                )}

                {/* 7. Constraints & Tradeoffs */}
                {drawer.tradeoffs?.length > 0 && (
                  <Section label="Constraints & Tradeoffs">
                    <NumberedCards items={drawer.tradeoffs} />
                  </Section>
                )}

                {/* 8. Stack */}
                <Section label="Stack">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {drawer.stack.map(tech => (
                      <span key={tech} style={{
                        padding: '4px 11px',
                        borderRadius: '999px',
                        fontSize: 'var(--fs-label)',
                        fontFamily: 'var(--font-body)',
                        fontWeight: '500',
                        background: '#080809',
                        color: 'var(--color-lavender)',
                        border: '1px solid rgba(243,233,216,0.12)',
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </Section>

                {/* 9. Current State */}
                {drawer.state && (
                  <Section label="Current State">
                    <p style={{
                      fontSize: 'var(--fs-body)',
                      color: 'rgba(241,238,248,0.62)',
                      fontFamily: 'var(--font-body)',
                      lineHeight: '1.65',
                      padding: '16px 18px',
                      borderRadius: '12px',
                      background: '#050506',
                      border: '1px solid rgba(243,233,216,0.10)',
                    }}>
                      {drawer.state}
                    </p>
                  </Section>
                )}

                {/* 10. What this proves */}
                {drawer.proof?.length > 0 && (
                  <Section label="What this proves">
                    <ProofCards items={drawer.proof} />
                  </Section>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

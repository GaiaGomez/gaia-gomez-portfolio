import { useEffect, useState } from 'react';

const NAV_SECTIONS = ['Overview', 'Challenge', 'Process', 'Visual Identity', 'Deliverables', 'Result'];

const ACCENT = '#B57BFF';
const BG = '#08060e';
const SURFACE = '#0f0b1a';
const TEXT = '#ede8f5';
const MUTED = 'rgba(237,232,245,0.45)';
const BORDER = 'rgba(181,123,255,0.1)';

export default function MistikCase({ onClose }) {
  const [active, setActive] = useState('Overview');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const scrollTo = (id) => {
    setActive(id);
    const el = document.getElementById(`mistik-${id.replace(' ', '-').toLowerCase()}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(8,6,14,0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '92vw',
          maxWidth: 1100,
          height: '88vh',
          background: BG,
          border: `1px solid ${BORDER}`,
          borderRadius: 24,
          display: 'flex',
          overflow: 'hidden',
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(181,123,255,0.08)',
        }}
      >
        {/* Sidebar */}
        <aside style={{
          width: 220,
          flexShrink: 0,
          background: SURFACE,
          borderRight: `1px solid ${BORDER}`,
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 0',
        }}>
          <div style={{ padding: '0 24px 28px', borderBottom: `1px solid ${BORDER}` }}>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 10,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: ACCENT,
              marginBottom: 6,
            }}>Case</p>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: TEXT,
              letterSpacing: -0.5,
            }}>Mistik</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: MUTED, marginTop: 4 }}>
              Brand Identity · 2020
            </p>
          </div>

          <nav style={{ padding: '20px 0', flex: 1 }}>
            {NAV_SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 24px',
                  background: active === s ? 'rgba(181,123,255,0.1)' : 'transparent',
                  borderLeft: `2px solid ${active === s ? ACCENT : 'transparent'}`,
                  border: 'none',
                  color: active === s ? TEXT : MUTED,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {s}
              </button>
            ))}
          </nav>

          <div style={{ padding: '0 24px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Branding', 'Identity', 'Packaging', 'Streetwear'].map(t => (
                <span key={t} style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  background: 'rgba(181,123,255,0.08)',
                  border: `1px solid rgba(181,123,255,0.2)`,
                  color: ACCENT,
                  fontSize: 10,
                  fontFamily: "'DM Sans', sans-serif",
                }}>{t}</span>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '48px 56px',
          position: 'relative',
        }}>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'sticky',
              top: 0,
              float: 'right',
              zIndex: 10,
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'rgba(181,123,255,0.08)',
              border: `1px solid ${BORDER}`,
              color: MUTED,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginBottom: 16,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(181,123,255,0.18)'; e.currentTarget.style.color = TEXT; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(181,123,255,0.08)'; e.currentTarget.style.color = MUTED; }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Hero image */}
          <div style={{
            width: '100%',
            marginBottom: 48,
          }}>
            <img
              src="/mistik.webp"
              alt="Mistik Brand"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: 'none',
                objectFit: 'contain',
                borderRadius: 20,
                border: '1px solid #1c1626',
                display: 'block',
              }}
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          {/* Overview */}
          <Section id="mistik-overview" title="Overview" onVisible={() => setActive('Overview')}>
            <p style={bodyStyle}>
              Mistik is a Colombian streetwear brand built around rawness, identity, and youth culture.
              The project covered end-to-end brand creation — from naming workshops to final deliverables
              ready for production and social media.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 28 }}>
              {[
                { label: 'Client', value: 'Mistik (local brand)' },
                { label: 'Year', value: '2020' },
                { label: 'Role', value: 'Brand Designer' },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  padding: '18px 20px',
                  background: SURFACE,
                  borderRadius: 12,
                  border: `1px solid ${BORDER}`,
                }}>
                  <p style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: ACCENT, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 6 }}>{label}</p>
                  <p style={{ fontSize: 14, color: TEXT, fontFamily: "'DM Sans', sans-serif" }}>{value}</p>
                </div>
              ))}
            </div>
          </Section>

          <Divider />

          {/* Challenge */}
          <Section id="mistik-challenge" title="Challenge" onVisible={() => setActive('Challenge')}>
            <p style={bodyStyle}>
              The brand needed to feel authentic to Colombian street culture — not a copy of international
              references, but something rooted in local identity. The challenge was creating a visual system
              that could live on garments, packaging, and digital channels simultaneously, without losing coherence.
            </p>
            <p style={{ ...bodyStyle, marginTop: 16 }}>
              Budget constraints meant every decision had to be production-ready from day one — no room
              for concepts that couldn't be printed, embroidered, or applied to a tote bag.
            </p>
          </Section>

          <Divider />

          {/* Process */}
          <Section id="mistik-process" title="Process" onVisible={() => setActive('Process')}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { step: '01', title: 'Discovery & Brand Direction', desc: "Moodboard sessions, competitor analysis, and positioning workshops to define the brand's tone: gritty, honest, Colombian." },
                { step: '02', title: 'Logo Exploration', desc: 'Multiple rounds of logomark sketches exploring typography, symbols, and hybrid approaches. Final direction: a custom logotype with strong geometric structure.' },
                { step: '03', title: 'System Buildout', desc: 'Color palette, typeface selection, usage rules, and application guidelines across all touchpoints.' },
                { step: '04', title: 'Production Files', desc: 'Delivery of print-ready files for screen printing, embroidery vectors, and packaging dielines.' },
              ].map(({ step, title, desc }) => (
                <div key={step} style={{
                  display: 'flex',
                  gap: 20,
                  padding: '20px 24px',
                  background: SURFACE,
                  borderRadius: 12,
                  border: `1px solid ${BORDER}`,
                }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: ACCENT, fontWeight: 700, minWidth: 28 }}>{step}</span>
                  <div>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: TEXT, fontWeight: 600, marginBottom: 6 }}>{title}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: MUTED, lineHeight: 1.65 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Divider />

          {/* Visual Identity */}
          <Section id="mistik-visual-identity" title="Visual Identity" onVisible={() => setActive('Visual Identity')}>
            <p style={bodyStyle}>
              The visual system is built on tension — dark grounds, high contrast typography, and a restrained
              palette that feels both premium and street-accessible.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
              {[
                { label: 'Primary', color: '#0a0a0a', hex: '#0a0a0a' },
                { label: 'Accent', color: '#c8f000', hex: '#c8f000' },
                { label: 'Neutral', color: '#e8e4dc', hex: '#e8e4dc' },
                { label: 'Deep', color: '#1a1a2e', hex: '#1a1a2e' },
              ].map(({ label, color, hex }) => (
                <div key={label} style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: `1px solid ${BORDER}`,
                }}>
                  <div style={{ height: 56, background: color }} />
                  <div style={{ padding: '10px 14px', background: SURFACE }}>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: TEXT }}>{label}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: MUTED }}>{hex}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, padding: '20px 24px', background: SURFACE, borderRadius: 12, border: `1px solid ${BORDER}` }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: ACCENT, marginBottom: 10 }}>Typography</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, color: TEXT, fontWeight: 700 }}>Primary — Space Grotesk</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: MUTED, marginTop: 6 }}>Secondary — DM Sans · Body & supporting text</p>
            </div>
          </Section>

          <Divider />

          {/* Deliverables */}
          <Section id="mistik-deliverables" title="Deliverables" onVisible={() => setActive('Deliverables')}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { icon: '◈', title: 'Logo & Brand System', desc: 'Primary logo, logomark, inverted versions, clear space rules, and misuse examples.' },
                { icon: '◉', title: 'Garment Designs', desc: 'T-shirt and apparel graphics ready for screen printing and embroidery, with print specs.' },
                { icon: '▣', title: 'Packaging & Tote Bags', desc: 'Custom packaging dielines and tote bag designs with print-ready files.' },
                { icon: '◈', title: 'Social Media Kit', desc: 'Post templates, story formats, and a content style guide for Instagram and digital channels.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{
                  padding: '22px',
                  background: SURFACE,
                  borderRadius: 12,
                  border: `1px solid ${BORDER}`,
                }}>
                  <span style={{ fontSize: 20, color: ACCENT, display: 'block', marginBottom: 10 }}>{icon}</span>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: TEXT, fontWeight: 600, marginBottom: 6 }}>{title}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Divider />

          {/* Result */}
          <Section id="mistik-result" title="Result" onVisible={() => setActive('Result')}>
            <p style={bodyStyle}>
              Mistik launched with a complete, production-ready brand system. The identity was applied
              consistently across all physical and digital touchpoints — from the first garment drop to
              social media content, creating a cohesive brand presence from day one.
            </p>
          </Section>

          <div style={{ height: 48 }} />
        </main>
      </div>
    </div>
  );
}

const bodyStyle = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 15,
  color: 'rgba(237,232,245,0.6)',
  lineHeight: 1.75,
  fontWeight: 300,
};

function Section({ id, title, children, onVisible }) {
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible?.(); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [id, onVisible]);

  return (
    <div id={id} style={{ marginBottom: 48 }}>
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 22,
        fontWeight: 700,
        color: '#ede8f5',
        letterSpacing: -0.5,
        marginBottom: 20,
      }}>{title}</h3>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: 'rgba(181,123,255,0.08)', marginBottom: 48 }} />;
}

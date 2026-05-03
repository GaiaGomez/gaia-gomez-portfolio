import { useEffect, useState } from 'react';

const NAV_SECTIONS = ['Overview', 'Challenge', 'Process', 'Visual Identity', 'Deliverables', 'Result'];

const ACCENT = 'rgba(255,255,255,0.72)';
const BG = '#080808';
const SURFACE = '#111113';
const TEXT = '#ede8f5';
const MUTED = 'rgba(237,232,245,0.45)';
const BORDER = 'rgba(255,255,255,0.09)';

export default function ComoEnCasaCase({ onClose }) {
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
    const el = document.getElementById(`cec-${id.replace(' ', '-').toLowerCase()}`);
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
          boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
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
            }}>Case Study</p>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: TEXT,
              letterSpacing: -0.5,
            }}>Como en Casa</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: MUTED, marginTop: 4 }}>
              Brand Identity · 2021
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
                  background: active === s ? 'rgba(255,255,255,0.07)' : 'transparent',
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
              {['Branding', 'Packaging', 'Coffee', 'Identity'].map(t => (
                <span key={t} style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
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
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${BORDER}`,
              color: MUTED,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginBottom: 16,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = TEXT; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = MUTED; }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Hero image */}
          <div style={{ width: '100%', marginBottom: 48 }}>
            <img
              src="/comoencasa.webp"
              alt="Como en Casa Brand"
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
          <Section id="cec-overview" title="Overview" onVisible={() => setActive('Overview')}>
            <p style={bodyStyle}>
              Como en Casa — "Like Home" — is a specialty coffee shop, fine pastry and brunch space with a
              coworking area in Colombia. The brand was created to feel warm, close, and distinctly personal —
              the opposite of a generic café chain.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 28 }}>
              {[
                { label: 'Client', value: 'Como en Casa' },
                { label: 'Year', value: '2021' },
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
          <Section id="cec-challenge" title="Challenge" onVisible={() => setActive('Challenge')}>
            <p style={bodyStyle}>
              The Colombian specialty coffee market is saturated with minimal, trendy aesthetics that all
              start to look the same. Como en Casa needed to stand out by leaning into something richer —
              a handcrafted visual world that communicates care, quality, and belonging from the first glance.
            </p>
            <p style={{ ...bodyStyle, marginTop: 16 }}>
              Every touchpoint — from the coffee bag to the wine bottle — had to feel cohesive and intentional,
              while being warm enough to reflect the essence of a place that feels like home.
            </p>
          </Section>

          <Divider />

          {/* Process */}
          <Section id="cec-process" title="Process" onVisible={() => setActive('Process')}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { step: '01', title: 'Brand Strategy & Positioning', desc: 'Defined the brand essence around warmth, detail, and authenticity. Mapped competitors and carved out a distinct visual territory rooted in handcraft and care.' },
                { step: '02', title: 'Logo & Identity System', desc: 'Developed a distinctive handcrafted logo with floral patterns and organic elements. Built a full black-and-white system that feels premium without losing personality.' },
                { step: '03', title: 'Packaging Design', desc: 'Applied the identity to coffee bags, cups, and a wine bottle — each adapted to its format while maintaining full visual consistency.' },
                { step: '04', title: 'Brand Experience', desc: 'Extended the system to tote bags, promotional pieces and graphic material to ensure the brand showed up consistently across all physical touchpoints.' },
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
          <Section id="cec-visual-identity" title="Visual Identity" onVisible={() => setActive('Visual Identity')}>
            <p style={bodyStyle}>
              The visual system is built on black and white — pure, timeless, and artisanal. Floral patterns
              and a distinctive handcrafted logotype give the brand a signature look that reads as professional
              yet deeply personal.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
              {[
                { label: 'Primary', color: '#0d0d0d', hex: '#0d0d0d' },
                { label: 'White', color: '#f5f0e8', hex: '#f5f0e8' },
                { label: 'Warm Cream', color: '#e8dfc8', hex: '#e8dfc8' },
                { label: 'Deep Espresso', color: '#1a0f08', hex: '#1a0f08' },
              ].map(({ label, color, hex }) => (
                <div key={label} style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: `1px solid ${BORDER}`,
                }}>
                  <div style={{ height: 56, background: color, border: color === '#f5f0e8' || color === '#e8dfc8' ? '1px solid rgba(255,255,255,0.08)' : 'none' }} />
                  <div style={{ padding: '10px 14px', background: SURFACE }}>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: TEXT }}>{label}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: MUTED }}>{hex}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, padding: '20px 24px', background: SURFACE, borderRadius: 12, border: `1px solid ${BORDER}` }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: ACCENT, marginBottom: 10 }}>Direction</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: TEXT, fontWeight: 600, lineHeight: 1.6 }}>
                Handcrafted logomark · Floral patterns · Black & white system
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: MUTED, marginTop: 6 }}>
                Warm, artisanal, and consistent — nothing generic.
              </p>
            </div>
          </Section>

          <Divider />

          {/* Deliverables */}
          <Section id="cec-deliverables" title="Deliverables" onVisible={() => setActive('Deliverables')}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { icon: '◈', title: 'Logo & Brand System', desc: 'Handcrafted logotype with floral system, usage rules, and full brand guidelines.' },
                { icon: '◉', title: 'Coffee Packaging', desc: 'Coffee bag designs with print-ready files, adapted to production specifications.' },
                { icon: '▣', title: 'Cups & Presentation', desc: 'Cup designs and presentation elements maintaining brand consistency across service touchpoints.' },
                { icon: '◈', title: 'Wine Bottle Design', desc: 'Label design for wine offering, adapted to the brand system with premium finish.' },
                { icon: '◉', title: 'Tote Bag', desc: 'Branded tote bag design for retail and gifting, carrying the visual identity into everyday life.' },
                { icon: '▣', title: 'Promotional Material', desc: 'Graphic pieces and promotional materials for campaigns, events and in-store communication.' },
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
          <Section id="cec-result" title="Result" onVisible={() => setActive('Result')}>
            <p style={bodyStyle}>
              Como en Casa is now an open, operating business with a brand that sets it apart from every
              other café in its area. The identity is applied consistently across all physical and digital
              touchpoints — every cup, bag, and piece of packaging carries the same warmth and intentionality.
            </p>
            <p style={{ ...bodyStyle, marginTop: 16 }}>
              The brand doesn't just look good — it communicates exactly what the place is: a space where
              you feel at home, where every detail was thought through with care.
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
  return <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 48 }} />;
}

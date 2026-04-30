import { useEffect, useState } from 'react';

const NAV_SECTIONS = ['Overview', 'Approach', 'Work Samples', 'Skills Applied', 'Result'];

const ACCENT = '#B57BFF';
const BG = '#08060e';
const SURFACE = '#0f0b1a';
const TEXT = '#ede8f5';
const MUTED = 'rgba(237,232,245,0.45)';
const BORDER = 'rgba(181,123,255,0.1)';

export default function SelectedWorksCase({ onClose }) {
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
    const el = document.getElementById(`sw-${id.replace(/\s+/g, '-').toLowerCase()}`);
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
            }}>Case Study</p>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: TEXT,
              letterSpacing: -0.5,
            }}>Selected Works</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: MUTED, marginTop: 4 }}>
              Graphic Design · 2021–2025
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
              {['Branding', 'Editorial', 'Social Media', 'Flyers'].map(t => (
                <span key={t} style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  background: 'rgba(181,123,255,0.08)',
                  border: '1px solid rgba(181,123,255,0.2)',
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
          <div style={{ width: '100%', marginBottom: 48 }}>
            <img
              src="/selectedworks.webp"
              alt="Selected Works"
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
          <Section id="sw-overview" title="Overview" onVisible={() => setActive('Overview')}>
            <p style={bodyStyle}>
              A collection of freelance and in-house graphic design work spanning multiple clients,
              industries, and formats. Each piece was designed to serve a specific communication goal —
              events, brand campaigns, digital content, editorial — with full attention to visual quality
              and audience fit.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 28 }}>
              {[
                { label: 'Type', value: 'Freelance & In-house' },
                { label: 'Period', value: '2021–2025' },
                { label: 'Role', value: 'Graphic Designer' },
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

          {/* Approach */}
          <Section id="sw-approach" title="Approach" onVisible={() => setActive('Approach')}>
            <p style={bodyStyle}>
              Every project in this collection started with the same question: what does this piece need
              to communicate, and to whom? Whether it was an event flyer or a social media campaign,
              the goal was always clarity first — then personality.
            </p>
            <p style={{ ...bodyStyle, marginTop: 16 }}>
              Working across different clients and industries meant adapting quickly — learning each
              brand, understanding its audience, and delivering work that felt native to that world,
              not generic.
            </p>
          </Section>

          <Divider />

          {/* Work Samples */}
          <Section id="sw-work-samples" title="Work Samples" onVisible={() => setActive('Work Samples')}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                {
                  client: 'Coffee Party',
                  type: 'Event Flyer',
                  desc: 'Visual design for a specialty coffee event — typography-led layout with strong hierarchy and mood.',
                },
                {
                  client: 'Rooftop Cinema Night',
                  type: 'Event Flyer',
                  desc: 'Atmospheric poster design for an outdoor cinema event. Balancing cinematic references with clear event communication.',
                },
                {
                  client: 'Seissta',
                  type: 'Social Media Content',
                  desc: 'Recurring content design for digital channels — templates, visual direction, and brand-aligned posts.',
                },
                {
                  client: 'Run the Runway',
                  type: 'Social Media Content',
                  desc: 'Campaign graphics for a fashion-meets-sport event. High energy, typographic, bold.',
                },
                {
                  client: 'Festival de Orquídeas',
                  type: 'Social Media Content',
                  desc: 'Cultural event content — rich, detailed, with a visual language that honors the subject matter.',
                },
                {
                  client: 'Kiin',
                  type: 'Branding',
                  desc: 'Brand identity work including logo system and visual language for a growing local brand.',
                },
              ].map(({ client, type, desc }) => (
                <div key={client} style={{
                  display: 'flex',
                  gap: 20,
                  padding: '20px 24px',
                  background: SURFACE,
                  borderRadius: 12,
                  border: `1px solid ${BORDER}`,
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: TEXT, fontWeight: 600 }}>{client}</p>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: 'rgba(181,123,255,0.08)',
                        border: '1px solid rgba(181,123,255,0.2)',
                        color: ACCENT,
                        fontSize: 10,
                        fontFamily: "'DM Sans', sans-serif",
                      }}>{type}</span>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: MUTED, lineHeight: 1.65 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Divider />

          {/* Skills Applied */}
          <Section id="sw-skills-applied" title="Skills Applied" onVisible={() => setActive('Skills Applied')}>
            <p style={bodyStyle}>
              These projects collectively represent a wide range of graphic design disciplines applied
              in real client contexts — from fast turnaround freelance work to longer brand campaigns.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 24 }}>
              {[
                { skill: 'Visual Direction', desc: 'Setting the tone and aesthetic language for each piece based on brand and audience.' },
                { skill: 'Layout & Typography', desc: 'Structuring information with clarity and hierarchy across flyers, posts and editorial formats.' },
                { skill: 'Brand Alignment', desc: "Adapting to each client's existing visual identity or helping define it from scratch." },
                { skill: 'Social Media Design', desc: 'Creating content optimized for digital channels — templated and one-off pieces.' },
                { skill: 'Event Graphic Design', desc: 'Posters and flyers that capture atmosphere and communicate key info at a glance.' },
                { skill: 'Client Communication', desc: 'Working directly with clients to iterate quickly and deliver on brief.' },
              ].map(({ skill, desc }) => (
                <div key={skill} style={{
                  padding: '20px',
                  background: SURFACE,
                  borderRadius: 12,
                  border: `1px solid ${BORDER}`,
                }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: TEXT, fontWeight: 600, marginBottom: 6 }}>{skill}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Divider />

          {/* Result */}
          <Section id="sw-result" title="Result" onVisible={() => setActive('Result')}>
            <p style={bodyStyle}>
              A body of work that demonstrates versatility — the ability to move between industries,
              formats, and brand voices while maintaining a consistent standard of visual quality.
            </p>
            <p style={{ ...bodyStyle, marginTop: 16 }}>
              Each piece was delivered, used, and published. Not concepts — real work for real audiences.
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

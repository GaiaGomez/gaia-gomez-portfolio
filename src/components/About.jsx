import { useState } from 'react';

const vibeCards = [
  { phrase: 'In my build era', sub: 'Learning by doing' },
  { phrase: 'New tools', sub: 'No fear' },
  { phrase: 'Detail obsessed', sub: 'In a good way' },
  { phrase: 'Code + taste', sub: 'Best combo honestly' },
];

const experienceItems = [
  {
    role: 'Graphic designer',
    company: 'Stay Group',
    type: 'Hospitality operator',
    period: '2025 – present',
    description: 'Leading multichannel campaigns, branding, packaging, signage and communication materials for multiple sub-brands. Optimizing creative and digital workflows.',
  },
  {
    role: 'Designer & developer',
    company: 'Freelance',
    type: 'Workana & direct clients',
    period: '2024 – 2025',
    description: 'Visual identity and digital solutions for clients in Colombia, the U.S. and Latin America. UX/UI design and development of a mobile application. Full project management with international clients.',
  },
  {
    role: 'Founder & creative director',
    company: 'Mistik',
    type: 'Own venture',
    period: '2020 – 2024',
    description: 'End-to-end brand creation: business model, e-commerce, digital marketing and operations. Managed strategy, pricing, suppliers and logistics.',
  },
];

const educationItems = [
  {
    degree: 'Software engineering (final semester)',
    institution: 'Politécnico Grancolombiano',
    period: '2022 – 2026',
  },
  {
    degree: 'Diploma in computer science',
    institution: 'Politécnico Grancolombiano',
    period: '2026',
  },
  {
    degree: 'Fashion design — Graphic design emphasis',
    institution: 'Universidad Pontificia Bolivariana',
    period: '2015 – 2020',
  },
];

const accordionSections = [
  { id: 'experience', label: 'Experience', items: experienceItems, type: 'experience' },
  { id: 'education', label: 'Education', items: educationItems, type: 'education' },
];

const bodyText = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 'var(--fs-body)',
  color: 'rgba(241,238,248,0.62)',
  lineHeight: '1.75',
  fontWeight: '300',
};

export default function About() {
  const [openSection, setOpenSection] = useState(null);

  const toggle = (id) => setOpenSection(prev => prev === id ? null : id);

  return (
    <section className="section" id="about">
      <div className="container">

        {/* 1. Hero bio */}
        <div style={{ maxWidth: '720px', marginBottom: 'clamp(56px, 8vw, 96px)' }}>
          <p className="section-label">About me</p>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'var(--fs-section-title)',
            fontWeight: '700',
            color: 'var(--text)',
            lineHeight: 1.08,
            letterSpacing: '-1px',
            marginBottom: '10px',
          }}>
            Gaia Gómez
          </h1>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'var(--fs-card-title)',
            fontWeight: '500',
            color: 'var(--accent)',
            marginBottom: '32px',
          }}>
            Software engineer with a design background
          </p>

          <p style={{ ...bodyText, marginBottom: '16px' }}>
            Software engineer (final semester) with 5+ years in graphic design — branding, packaging, digital systems, the whole thing. Currently building full stack applications and figuring out how AI fits into everything.
          </p>
          <p style={{ ...bodyText, marginBottom: '16px' }}>
            I have a curious brain, a design-aware mindset and a genuine obsession with learning how things work. I like building digital experiences that make sense, feel good to use and keep getting better through iteration.
          </p>
          <p style={bodyText}>
            I'm fully in it: learning, testing, improving and trying things until they click. My design background adds an extra layer of clarity and user sensitivity to the way I build.
          </p>
        </div>

        {/* 2. Vibe cards grid */}
        <div className="vibe-grid" style={{ marginBottom: 'clamp(56px, 8vw, 96px)' }}>
          {vibeCards.map(card => (
            <div key={card.phrase} className="ui-card">
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)',
                fontWeight: '700',
                color: 'var(--accent)',
                lineHeight: 1.15,
                marginBottom: '8px',
              }}>
                {card.phrase}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'var(--fs-label)',
                color: 'var(--muted)',
              }}>
                {card.sub}
              </div>
            </div>
          ))}
        </div>

        {/* 3. Accordion sections */}
        <div style={{ marginBottom: 'clamp(56px, 8vw, 96px)' }}>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {accordionSections.map(section => {
              const isOpen = openSection === section.id;
              return (
                <div key={section.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

                  {/* Header */}
                  <button
                    onClick={() => toggle(section.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '26px 0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text)',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 'var(--fs-card-title)',
                      fontWeight: '600',
                      letterSpacing: '-0.01em',
                      textAlign: 'left',
                    }}
                  >
                    <span>{section.label}</span>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--accent)',
                      fontSize: '20px',
                      fontWeight: '300',
                      lineHeight: 1,
                      flexShrink: 0,
                      transition: 'transform 0.32s var(--ease-standard)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}>
                      +
                    </span>
                  </button>

                  {/* Animated content using CSS grid trick */}
                  <div style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.32s var(--ease-standard)',
                  }}>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ paddingBottom: '28px' }}>

                        {section.type === 'experience' ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {section.items.map(item => (
                              <div key={item.role} style={{
                                padding: '22px 24px',
                                borderRadius: '16px',
                                background: 'rgba(16,16,18,0.6)',
                                border: '1px solid rgba(255,255,255,0.06)',
                              }}>
                                <div style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'flex-start',
                                  flexWrap: 'wrap',
                                  gap: '6px',
                                  marginBottom: '3px',
                                }}>
                                  <div>
                                    <span style={{
                                      fontFamily: "'Space Grotesk', sans-serif",
                                      fontSize: '0.98rem',
                                      fontWeight: '600',
                                      color: 'var(--text)',
                                    }}>
                                      {item.role}
                                    </span>
                                    <span style={{
                                      color: 'var(--accent)',
                                      margin: '0 6px',
                                      fontSize: '0.9rem',
                                    }}>
                                      —
                                    </span>
                                    <span style={{
                                      fontFamily: "'DM Sans', sans-serif",
                                      fontSize: '0.9rem',
                                      color: 'var(--text)',
                                      fontWeight: '500',
                                    }}>
                                      {item.company}
                                    </span>
                                  </div>
                                  <span style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: 'var(--fs-label)',
                                    color: 'var(--muted)',
                                    whiteSpace: 'nowrap',
                                  }}>
                                    {item.period}
                                  </span>
                                </div>
                                <div style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: 'var(--fs-label)',
                                  color: 'var(--muted)',
                                  marginBottom: '10px',
                                  opacity: 0.7,
                                }}>
                                  {item.type}
                                </div>
                                <p style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: '0.88rem',
                                  color: 'rgba(241,238,248,0.52)',
                                  lineHeight: '1.65',
                                  margin: 0,
                                }}>
                                  {item.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {section.items.map(item => (
                              <div key={item.degree} style={{
                                padding: '18px 24px',
                                borderRadius: '16px',
                                background: 'rgba(16,16,18,0.6)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                                gap: '6px',
                              }}>
                                <div>
                                  <div style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '0.98rem',
                                    fontWeight: '600',
                                    color: 'var(--text)',
                                    marginBottom: '3px',
                                  }}>
                                    {item.degree}
                                  </div>
                                  <div style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: '0.88rem',
                                    color: 'var(--muted)',
                                  }}>
                                    {item.institution}
                                  </div>
                                </div>
                                <span style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: 'var(--fs-label)',
                                  color: 'var(--muted)',
                                  whiteSpace: 'nowrap',
                                }}>
                                  {item.period}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* 4. CTA links */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <a
            href="https://www.linkedin.com/in/gaiagomez/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/GaiaGomez"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: 'rgba(18,18,20,0.82)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: 'rgba(241,238,248,0.88)',
            }}
          >
            GitHub ↗
          </a>
        </div>

      </div>
    </section>
  );
}

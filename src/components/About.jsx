import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const vibeCards = [
  {
    phrase: 'In my build era',
    display: <>In my <span style={{ color: 'var(--color-lavender)' }}>build</span> era</>,
    sub: 'Learning by doing',
  },
  {
    phrase: 'Deep in AI',
    display: <>Deep in <span style={{ color: 'var(--color-lavender)' }}>AI</span></>,
    sub: 'Master’s mode: on',
  },
  {
    phrase: 'Detail obsessed',
    display: <>Detail <span style={{ color: 'var(--color-lavender)' }}>obsessed</span></>,
    sub: 'In a good way',
  },
  {
    phrase: 'Code + taste',
    display: <><span style={{ color: 'var(--color-cream)' }}>Code</span> <span style={{ color: 'rgba(243,233,216,0.3)' }}>+</span> <span style={{ color: 'var(--color-lavender)' }}>taste</span></>,
    sub: 'Best combo honestly',
  },
];

const experienceItems = [
  {
    role: 'Full Stack Developer & Product Builder',
    company: 'Freelance',
    type: 'Direct Clients',
    period: '2026 – Present',
    description:
      'Building full stack products end to end with React, Next.js, TypeScript, Node.js and Supabase, from requirements and scope to deployment. Web apps and internal platforms for real users, like a clinical operations platform and a café operations dashboard. Integrating AI where it adds value: LLM APIs, prompt design, conversational assistants and automation workflows with n8n and Make.',
  },
  {
    role: 'Graphic Designer',
    company: 'Stay Group',
    type: 'Hospitality operator',
    period: '2025 – 2026',
    description:
      'Designed multi-channel campaigns for several hospitality sub-brands: branding, packaging, signage, menus and communication materials. Streamlined creative and digital workflows, improving delivery times and brand consistency across brands.',
  },
  {
    role: 'Graphic Designer & Digital Consultant',
    company: 'Freelance',
    type: 'Workana & Direct Clients',
    period: '2024 – 2025',
    description:
      'Designed visual identity systems and digital and print materials for international clients. Consulted on digital transformation: process definition, tool selection, implementation and training. Planned and ran digital marketing and content strategy, managing scope, budget and timelines independently.',
  },
  {
    role: 'Founder & Project Lead',
    company: 'Mistik',
    type: 'Own venture',
    period: '2020 – 2024',
    description:
      'Built and ran a clothing brand end to end: business model, e-commerce, digital marketing and operations. Led pricing, suppliers, logistics and customer experience, plus budgeting and continuous improvement.',
  },
];

// `detail` es opcional: se muestra como una línea extra debajo de la institución.
const educationItems = [
  {
    degree: 'Master’s in Big Data, Data Science & Artificial Intelligence',
    institution: 'Universidad Complutense de Madrid',
    period: '2026 – 2027',
    detail: 'In progress · RAG, embeddings, NoSQL & graph databases, cloud, distributed systems',
  },
  {
    degree: 'Software Engineering',
    institution: 'Politécnico Grancolombiano',
    period: '2022 – 2026',
  },
  {
    degree: 'Diploma in Computer Science',
    institution: 'Politécnico Grancolombiano',
    period: '2026',
  },
  {
    degree: 'Fashion Design — Graphic Design emphasis',
    institution: 'Universidad Pontificia Bolivariana',
    period: '2015 – 2020',
  },
];

// Stack agrupado. "Learning now" es a propósito: muestra hacia dónde va el
// perfil (AI Engineering) sin presentar como dominado lo que aún está en curso.
const stackGroups = [
  {
    label: 'Engineering',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'REST APIs', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Vitest', 'Playwright', 'Git', 'Vercel'],
  },
  {
    label: 'AI & Data',
    items: ['LLM APIs (Claude, OpenAI)', 'Prompt design', 'RAG', 'Embeddings', 'Semantic search', 'Python', 'MongoDB / NoSQL', 'n8n', 'Make', 'Claude Code', 'Cursor'],
  },
  {
    label: 'Learning now',
    items: ['AI agents', 'LangChain / LangGraph', 'FastAPI', 'pgvector', 'LLM evaluation', 'Docker'],
  },
  {
    label: 'Design',
    items: ['Figma', 'Adobe Creative Suite', 'Brand identity', 'Visual systems'],
  },
];

const accordionSections = [
  { id: 'experience', label: 'Experience', items: experienceItems, type: 'experience' },
  { id: 'education', label: 'Education', items: educationItems, type: 'education' },
  { id: 'stack', label: 'Stack', items: stackGroups, type: 'stack' },
];

const bodyText = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 'var(--fs-body)',
  color: 'rgba(243,233,216,0.62)',
  lineHeight: '1.75',
  fontWeight: '300',
};

export default function About() {
  const [openSection, setOpenSection] = useState(null);
  const [bioRef, bioVisible] = useReveal();
  const [vibeRef, vibeVisible] = useReveal();
  const [accordionRef, accordionVisible] = useReveal();

  const toggle = (id) => setOpenSection(prev => prev === id ? null : id);

  return (
    <section className="section" id="about">
      <div className="container">

        {/* 1. Hero bio with portrait */}
        <div
          ref={bioRef}
          className="about-hero"
          style={{
            opacity: bioVisible ? 1 : 0,
            transform: bioVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 0.65s var(--ease-standard), transform 0.65s var(--ease-standard)',
          }}
        >
          {/* Text — left */}
          <div>
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
              <span style={{ color: 'var(--color-lavender)' }}>Software Engineer • Product Engineer • Full Stack Developer</span>, designer by history, curious human by default.
            </p>

            <p style={{ ...bodyText, marginBottom: '16px' }}>
            My background combines <span style={{ color: 'var(--color-lavender)', fontWeight: 700 }}>Software Engineering</span> with 5+ years of experience in graphic design, digital marketing and <span style={{ color: 'var(--color-lavender)', fontWeight: 700 }}>project management</span>.
            </p>

            <p style={{ ...bodyText, marginBottom: '16px' }}>
            I’ve spent years making things look good. Now I build <span style={{ color: 'var(--color-lavender)', fontWeight: 700 }}>full stack digital products</span> end to end (strategy, UX, development, testing and deployment) and lately I’ve been going deep on <span style={{ color: 'var(--color-lavender)', fontWeight: 700 }}>applied AI</span>.
            </p>

            <p style={{ ...bodyText, marginBottom: '16px' }}>
            I’m doing a <span style={{ color: 'var(--color-lavender)', fontWeight: 700 }}>Master’s in Big Data, Data Science & AI</span> at Universidad Complutense de Madrid, working with LLMs, RAG, embeddings and vector search. What excites me most is turning that into real software: products where AI actually solves a problem, not just a feature on the box.
            </p>

            <p style={bodyText}>
            I like clear interfaces, smart systems, tiny details and products that feel nice to use. Design taste plus engineering is still my favorite combo.
            </p>
          </div>

          {/* Portrait — right */}
          <div className="about-portrait-wrap">
            <div className="about-portrait-glow" />
            <img
              src="/gaia-about-portrait.webp"
              alt="Gaia Gómez"
              className="about-portrait"
            />
          </div>
        </div>

        {/* 2. Vibe cards grid */}
        <div
          ref={vibeRef}
          className="vibe-grid"
          style={{ marginBottom: 'clamp(56px, 8vw, 96px)' }}
        >
          {vibeCards.map((card, i) => (
            <div
              key={card.phrase}
              className="ui-card vibe-card"
              style={{
                opacity: vibeVisible ? 1 : 0,
                transform: vibeVisible ? 'translateY(0)' : 'translateY(22px)',
                transition: `opacity 0.6s var(--ease-standard) ${i * 0.1}s, transform 0.6s var(--ease-standard) ${i * 0.1}s`,
              }}
            >
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)',
                fontWeight: '700',
                color: 'var(--accent)',
                lineHeight: 1.15,
                marginBottom: '8px',
              }}>
                {card.display}
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
        <div
          ref={accordionRef}
          style={{
            marginBottom: 'clamp(56px, 8vw, 96px)',
            opacity: accordionVisible ? 1 : 0,
            transform: accordionVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 0.65s var(--ease-standard) 0.1s, transform 0.65s var(--ease-standard) 0.1s',
          }}
        >
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
                                      fontSize: 'var(--text-body)',
                                      fontWeight: '600',
                                      color: 'var(--text)',
                                    }}>
                                      {item.role}
                                    </span>
                                    <span style={{
                                      color: 'var(--color-lavender)',
                                      margin: '0 6px',
                                      fontSize: 'var(--text-body)',
                                      opacity: 0.65,
                                    }}>
                                      —
                                    </span>
                                    <span style={{
                                      fontFamily: "'DM Sans', sans-serif",
                                      fontSize: 'var(--text-body)',
                                      color: 'var(--color-lavender)',
                                      fontWeight: '500',
                                      opacity: 0.85,
                                    }}>
                                      {item.company}
                                    </span>
                                  </div>
                                  <span style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: 'var(--fs-label)',
                                    color: 'var(--color-lavender)',
                                    whiteSpace: 'nowrap',
                                    opacity: 0.75,
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
                        ) : section.type === 'stack' ? (
                          // Stack: un bloque por grupo, con chips por herramienta
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {section.items.map(group => (
                              <div key={group.label} style={{
                                padding: '18px 24px',
                                borderRadius: '16px',
                                background: 'rgba(16,16,18,0.6)',
                                border: '1px solid rgba(255,255,255,0.06)',
                              }}>
                                <div style={{
                                  fontFamily: "'Space Grotesk', sans-serif",
                                  fontSize: 'var(--fs-label)',
                                  fontWeight: '600',
                                  color: 'var(--color-lavender)',
                                  letterSpacing: '0.04em',
                                  textTransform: 'uppercase',
                                  marginBottom: '12px',
                                  opacity: 0.85,
                                }}>
                                  {group.label}
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                  {group.items.map(tool => (
                                    <span key={tool} style={{
                                      fontFamily: "'DM Sans', sans-serif",
                                      fontSize: '0.84rem',
                                      color: 'rgba(241,238,248,0.72)',
                                      padding: '5px 12px',
                                      borderRadius: '999px',
                                      border: '1px solid rgba(168,145,196,0.25)',
                                      background: 'rgba(168,145,196,0.06)',
                                    }}>
                                      {tool}
                                    </span>
                                  ))}
                                </div>
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
                                    fontSize: 'var(--text-body)',
                                    fontWeight: '600',
                                    color: 'var(--text)',
                                    marginBottom: '3px',
                                  }}>
                                    {item.degree}
                                  </div>
                                  <div style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: '0.88rem',
                                    color: 'var(--color-lavender)',
                                    opacity: 0.75,
                                  }}>
                                    {item.institution}
                                  </div>
                                  {item.detail && (
                                    <div style={{
                                      fontFamily: "'DM Sans', sans-serif",
                                      fontSize: 'var(--fs-label)',
                                      color: 'var(--muted)',
                                      marginTop: '6px',
                                    }}>
                                      {item.detail}
                                    </div>
                                  )}
                                </div>
                                <span style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: 'var(--fs-label)',
                                  color: 'var(--color-lavender)',
                                  whiteSpace: 'nowrap',
                                  opacity: 0.75,
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


      </div>
    </section>
  );
}

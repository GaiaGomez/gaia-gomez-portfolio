import { useState } from 'react';
import { projects } from '../data/projects';
import ProjectDrawer from './ProjectDrawer';
import { useReveal } from '../hooks/useReveal';

function ProjectFeatureCard({ project, onOpenDrawer }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const hasLink = !!project.link;
  const showImage = project.image && !imgError;

  const metaTags = project.drawer?.meta ? project.drawer.meta.split(' · ') : [];

  const stackItems = project.drawer?.snapshot?.stack
    ? project.drawer.snapshot.stack.split(' · ').slice(0, 4)
    : Array.isArray(project.drawer?.stack)
    ? project.drawer.stack.slice(0, 4)
    : [];

  return (
    <div
      className="project-feature-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      {showImage && (
        <img
          src={project.image}
          alt={project.title}
          onError={() => setImgError(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: hovered ? 'grayscale(65%)' : 'grayscale(100%)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'filter 0.75s ease, transform 0.95s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      )}

      {/* Dark gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered
            ? 'linear-gradient(to top, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.36) 55%, rgba(0,0,0,0.10) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.22) 100%)',
          transition: 'background 0.75s ease',
        }}
      />

      {/* Content — anchored to bottom */}
      <div className="project-feature-content">
        {/* Meta row */}
        {metaTags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            {metaTags.map((tag, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                {i > 0 && (
                  <span style={{ margin: '0 10px', color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem' }}>·</span>
                )}
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.67rem',
                  fontWeight: '500',
                  color: 'rgba(255,255,255,0.38)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {tag}
                </span>
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="project-feature-title">
          {project.title}
        </h3>

        {/* Description */}
        <p className="project-feature-desc">
          {project.description}
        </p>

        {/* Bottom row: stack tags + CTA */}
        <div className="project-feature-bottom">
          {/* Stack tags */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {stackItems.map((s, i) => (
              <span
                key={i}
                style={{
                  padding: '4px 10px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.11)',
                  color: 'rgba(255,255,255,0.38)',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '500',
                  letterSpacing: '0.02em',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
            {onOpenDrawer && (
              <button
                onClick={onOpenDrawer}
                className="project-feature-btn"
              >
                Details
              </button>
            )}
            {hasLink && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-feature-btn project-feature-btn--primary"
              >
                View case study
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                  <path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [headerRef, headerVisible] = useReveal();
  const [listRef, listVisible] = useReveal();

  return (
    <>
      {activeDrawer && (
        <ProjectDrawer project={activeDrawer} onClose={() => setActiveDrawer(null)} />
      )}

      <section className="section" id="projects">
        <div className="container">

          {/* Section header */}
          <div
            ref={headerRef}
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.65s var(--ease-standard), transform 0.65s var(--ease-standard)',
              marginBottom: '56px',
            }}
          >
            <p className="section-label">Selected Work</p>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Projects that<br />
              <span style={{ color: '#f1eef8' }}>matter</span>
            </h2>
          </div>

          {/* Feature cards — vertical stack */}
          <div ref={listRef} className="project-feature-list">
            {projects.map((p, i) => (
              <div
                key={p.id}
                style={{
                  opacity: listVisible ? 1 : 0,
                  transform: listVisible ? 'translateY(0)' : 'translateY(32px)',
                  transition: `opacity 0.7s var(--ease-standard) ${i * 0.12}s, transform 0.7s var(--ease-standard) ${i * 0.12}s`,
                }}
              >
                <ProjectFeatureCard
                  project={p}
                  onOpenDrawer={p.drawer ? () => setActiveDrawer(p) : undefined}
                />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

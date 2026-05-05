import { useState } from 'react';
import { projects } from '../data/projects';
import ProjectDrawer from './ProjectDrawer';
import { useReveal } from '../hooks/useReveal';

function EditorialProjectRow({ project, onOpenDrawer }) {
  const [ref, visible] = useReveal();

  const metaTags = project.drawer?.meta ? project.drawer.meta.split(' · ') : [];
  const stackItems = project.drawer?.snapshot?.stack
  ? project.drawer.snapshot.stack.split(' · ').slice(0, 4)
  : Array.isArray(project.drawer?.stack)
  ? project.drawer.stack.slice(0, 4)
  : [];

const hasLink = !!project.link;

  return (
    <div
      ref={ref}
      className={`wrapper${visible ? ' is-revealed' : ''}`}
    >
      {/* Image layer — parallax on desktop */}
      <div
        className="wrapper__bg"
        style={{ backgroundImage: project.image ? `url(${project.image})` : 'none' }}
      />

      {/* Gradient: strong at bottom, fades softly upward */}
      <div className="wrapper__gradient" aria-hidden="true" />

      {/* Content anchored to bottom */}
      <div className="wrapper__content">
        <div className="editorial-divider" />

        {metaTags.length > 0 && (
          <div className="editorial-meta">
            {metaTags.map((tag, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                {i > 0 && <span className="editorial-meta-dot">·</span>}
                <span
                  className="editorial-meta-tag"
                  style={{ color: 'rgba(168,145,196,0.72)' }}
                >{tag}</span>
              </span>
            ))}
          </div>
        )}

        <h3 className="editorial-title">{project.title}</h3>
        <p className="editorial-desc">{project.description}</p>

        <div className="editorial-bottom">
          {stackItems.length > 0 && (
            <p className="editorial-stack">
              {stackItems.map((item, i) => (
                <span key={item}>
                  {i > 0 && <span style={{ opacity: 0.45 }}> · </span>}
                  <span style={{ color: 'rgba(168,145,196,0.55)' }}>{item}</span>
                </span>
              ))}
            </p>
          )}
          <div className="editorial-actions">
            {onOpenDrawer && (
              <button onClick={onOpenDrawer} className="project-feature-btn">
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
                Open project
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

  return (
    <>
      {activeDrawer && (
        <ProjectDrawer project={activeDrawer} onClose={() => setActiveDrawer(null)} />
      )}

      <section className="section" id="projects">
        <div className="container">
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
              <span style={{ color: 'var(--color-pink)' }}>matter</span>
            </h2>
          </div>
        </div>

        <div className="projects-editorial-list">
          {projects.map((p) => (
            <EditorialProjectRow
              key={p.id}
              project={p}
              onOpenDrawer={p.drawer ? () => setActiveDrawer(p) : undefined}
            />
          ))}
        </div>
      </section>
    </>
  );
}

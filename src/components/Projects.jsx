import { useState } from 'react';
import { projects } from '../data/projects';
import SelectedWorksCase from './SelectedWorksCase';

const filters = ['All', 'Clinical Operations App', 'Personal Finance App', 'Personal Website', 'Brand & Visual Design'];

const categoryColors = {
  'Clinical Operations App': { bg: 'rgba(93,181,255,0.08)', border: 'rgba(93,181,255,0.25)', text: '#5db5ff' },
  'Personal Finance App':    { bg: 'rgba(255,181,93,0.08)', border: 'rgba(255,181,93,0.25)', text: '#ffb55d' },
  'Personal Website':        { bg: 'rgba(161,255,168,0.08)', border: 'rgba(161,255,168,0.25)', text: '#92e598' },
  'Brand & Visual Design':   { bg: 'rgba(181,123,255,0.1)', border: 'rgba(181,123,255,0.25)', text: '#B57BFF' },
};

function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);
  const c = categoryColors[project.category];

  const isModal = project.title === 'Selected Design Works';
  const Tag = isModal ? 'div' : 'a';
  const linkProps = isModal
    ? { onClick, style: { cursor: 'pointer' } }
    : { href: project.link };

  return (
    <Tag
      {...linkProps}
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        position: 'relative',
        padding: '36px',
        borderRadius: '20px',
        background: hovered
          ? 'rgba(181,123,255,0.06)'
          : 'rgba(15,12,26,0.8)',
        border: `1px solid ${hovered ? 'rgba(181,123,255,0.3)' : 'rgba(181,123,255,0.1)'}`,
        transition: 'all 0.35s ease',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 60px rgba(181,123,255,0.12), 0 0 0 1px rgba(181,123,255,0.15)'
          : '0 4px 20px rgba(0,0,0,0.3)',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* Glow top-right */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        right: '-30px',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(181,123,255,0.15) 0%, transparent 70%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s',
        pointerEvents: 'none',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <span style={{
          display: 'inline-block',
          padding: '5px 14px',
          borderRadius: '999px',
          background: c.bg,
          border: `1px solid ${c.border}`,
          color: c.text,
          fontSize: '11px',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: '500',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
        }}>
          {project.category}
        </span>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          color: 'rgba(232,224,245,0.3)',
        }}>
          {project.year}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '22px',
        fontWeight: '600',
        color: hovered ? '#e8e0f5' : 'rgba(232,224,245,0.9)',
        marginBottom: '12px',
        transition: 'color 0.25s',
        letterSpacing: '-0.3px',
        lineHeight: '1.3',
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '14px',
        color: 'rgba(232,224,245,0.45)',
        lineHeight: '1.65',
        marginBottom: '28px',
        fontWeight: '300',
      }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {project.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {/* Links */}
      {(project.liveDemo || project.github) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                color: '#c9a8ff',
                textDecoration: 'none',
                border: '1px solid rgba(181,123,255,0.25)',
                background: 'rgba(181,123,255,0.08)',
                borderRadius: '999px',
                padding: '6px 12px',
              }}
            >
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                color: 'rgba(232,224,245,0.8)',
                textDecoration: 'none',
                border: '1px solid rgba(232,224,245,0.2)',
                borderRadius: '999px',
                padding: '6px 12px',
              }}
            >
              GitHub
            </a>
          )}
        </div>
      )}

      {/* Arrow link */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        right: '32px',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: hovered ? 'rgba(181,123,255,0.2)' : 'rgba(181,123,255,0.06)',
        border: `1px solid ${hovered ? 'rgba(181,123,255,0.4)' : 'rgba(181,123,255,0.1)'}`,
        transition: 'all 0.25s',
        transform: hovered ? 'rotate(-45deg)' : 'rotate(0deg)',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 11L11 3M11 3H5M11 3v6" stroke="#B57BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Tag>
  );
}

export default function Projects() {
  const [active, setActive] = useState('All');
  const [showSelectedWorks, setShowSelectedWorks] = useState(false);

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.category === active);

  return (
    <>
    {showSelectedWorks && <SelectedWorksCase onClose={() => setShowSelectedWorks(false)} />}
    <section className="section" id="projects">
      <div className="container">

        <p className="section-label">Selected Work</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '28px', marginBottom: '56px' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Projects that<br />
            <span style={{ color: '#B57BFF' }}>matter</span>
          </h2>

          {/* Filter buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button
                key={f}
                className="filter-btn"
                onClick={() => setActive(f)}
                style={{
                  padding: '9px 22px',
                  borderRadius: '999px',
                  border: `1px solid ${active === f ? '#B57BFF' : 'rgba(181,123,255,0.15)'}`,
                  background: active === f ? 'rgba(181,123,255,0.15)' : 'transparent',
                  color: active === f ? '#B57BFF' : 'rgba(232,224,245,0.45)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'none',
                  transition: 'all 0.25s',
                  letterSpacing: '0.3px',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          {filtered.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              onClick={
                p.title === 'Selected Design Works' ? () => setShowSelectedWorks(true) :
                undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

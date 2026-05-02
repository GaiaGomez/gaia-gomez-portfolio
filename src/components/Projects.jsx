import { useState } from 'react';
import { projects } from '../data/projects';
import SelectedWorksCase from './SelectedWorksCase';
import ProjectDrawer from './ProjectDrawer';

function ProjectCard({ project, onOpenModal, onOpenDrawer }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isDesignWorks = project.title === 'Selected Design Works';
  const showImage = project.image && !imgError;

  const imgArea = (
    <>
      {showImage && (
        <img
          src={project.image}
          alt={project.title}
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: hovered ? 0.88 : 0.72,
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'opacity 0.4s, transform 0.55s var(--ease-standard)',
          }}
        />
      )}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '64px',
        background: 'linear-gradient(to bottom, transparent, rgba(15,12,26,0.92))',
        pointerEvents: 'none',
      }} />
    </>
  );

  const imgWrapBase = {
    height: '220px',
    overflow: 'hidden',
    position: 'relative',
    background: 'linear-gradient(135deg, #12101f 0%, #0a0816 100%)',
    display: 'block',
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'var(--radius-card)',
        background: 'rgba(15,12,26,0.92)',
        border: `1px solid ${hovered ? 'rgba(181,123,255,0.22)' : 'rgba(181,123,255,0.12)'}`,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(181,123,255,0.12)'
          : '0 4px 20px rgba(0,0,0,0.28)',
        transition: 'transform var(--t-hover) var(--ease-standard), border-color var(--t-hover) var(--ease-standard), box-shadow var(--t-hover) var(--ease-standard)',
      }}
    >
      {/* Image area */}
      {isDesignWorks ? (
        <div onClick={onOpenModal} style={{ ...imgWrapBase, cursor: 'none' }}>
          {imgArea}
        </div>
      ) : (
        <a href={project.link} target="_blank" rel="noopener noreferrer" style={imgWrapBase}>
          {imgArea}
        </a>
      )}

      {/* Content */}
      <div style={{ padding: '22px 28px 72px' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--fs-card-title)',
          fontWeight: '600',
          color: hovered ? '#f1eef8' : 'rgba(241,238,248,0.92)',
          marginBottom: '10px',
          letterSpacing: '-0.3px',
          lineHeight: '1.3',
          transition: 'color 0.25s',
        }}>
          {project.title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-body)',
          color: 'rgba(241,238,248,0.5)',
          lineHeight: '1.65',
          fontWeight: '300',
        }}>
          {project.description}
        </p>
      </div>

      {/* Details button — bottom left */}
      {!isDesignWorks && (
        <button
          onClick={onOpenDrawer}
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '28px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 13px',
            borderRadius: '999px',
            background: 'rgba(15,12,26,0.85)',
            border: '1px solid rgba(181,123,255,0.18)',
            color: 'rgba(241,238,248,0.65)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.76rem',
            fontWeight: '600',
            letterSpacing: '0.3px',
          }}
        >
          Details
        </button>
      )}

      {/* Arrow — bottom right */}
      {isDesignWorks ? (
        <div
          onClick={onOpenModal}
          style={{
            position: 'absolute',
            bottom: '28px',
            right: '28px',
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
            cursor: 'none',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 11L11 3M11 3H5M11 3v6" stroke="#B57BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      ) : (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            bottom: '28px',
            right: '28px',
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
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 11L11 3M11 3H5M11 3v6" stroke="#B57BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const [showSelectedWorks, setShowSelectedWorks] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState(null);

  return (
    <>
      {showSelectedWorks && <SelectedWorksCase onClose={() => setShowSelectedWorks(false)} />}
      {activeDrawer && <ProjectDrawer project={activeDrawer} onClose={() => setActiveDrawer(null)} />}

      <section className="section" id="projects">
        <div className="container">
          <p className="section-label">Selected Work</p>
          <h2 className="section-title" style={{ marginBottom: '56px' }}>
            Projects that<br />
            <span style={{ color: '#f1eef8' }}>matter</span>
          </h2>

          <div className="projects-grid">
            {projects.map(p => (
              <ProjectCard
                key={p.id}
                project={p}
                onOpenModal={p.title === 'Selected Design Works' ? () => setShowSelectedWorks(true) : undefined}
                onOpenDrawer={p.drawer ? () => setActiveDrawer(p) : undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

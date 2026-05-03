import { useState, useEffect } from 'react';

const roles = [
  'Software Engineer + Designer',
];

const chips = [
  { label: 'Product', top: '20%', right: '10%', left: 'auto', bottom: 'auto', delay: '0s' },
  { label: 'Code', top: '43%', right: '3.5%', left: 'auto', bottom: 'auto', delay: '0.6s' },
  { label: 'Architecture', top: '67%', right: '10%', left: 'auto', bottom: 'auto', delay: '0.9s' },
  { label: 'Design', top: 'auto', right: '10%', left: 'auto', bottom: '12%', delay: '1.2s' },
  { label: 'AI', top: '24%', right: '33%', left: 'auto', bottom: 'auto', delay: '0.4s' },
];

export default function Hero() {
  const [displayed,  setDisplayed]  = useState('');
  const [roleIdx,    setRoleIdx]    = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Typewriter
  useEffect(() => {
    const fullText = roles[roleIdx];
    let timeout;
    if (!isDeleting) {
      if (displayed.length < fullText.length) {
        timeout = setTimeout(() => setDisplayed(fullText.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      } else {
        setIsDeleting(false);
        setRoleIdx(i => (i + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIdx]);

  // Blinking cursor
  useEffect(() => {
    const iv = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(iv);
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: '#090909',
    }}>

      {/* ── BG blobs ─────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: '-15%', right: '-8%',
        width: '650px', height: '650px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.022) 0%, transparent 68%)',
        filter: 'blur(72px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', left: '-12%',
        width: '480px', height: '480px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(80,80,90,0.06) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      {/* ── Subtle grid ──────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />

      {/* ── Floating chips ───────────────────────────── */}
      {chips.map(chip => (
        <div
          key={chip.label}
          className="hero-chip"
          style={{
            position: 'absolute',
            top: chip.top, right: chip.right,
            left: chip.left, bottom: chip.bottom,
            padding: '10px 20px',
            borderRadius: '999px',
            background: 'rgba(16,16,18,0.88)',
            border: '1px solid rgba(255,255,255,0.14)',
            color: 'rgba(255,255,255,0.88)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px',
            fontWeight: '500',
            letterSpacing: '0.3px',
            backdropFilter: 'blur(10px)',
            animation: `floatChip 5s ease-in-out infinite`,
            animationDelay: chip.delay,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {chip.label}
        </div>
      ))}

      {/* ── Spinning circle (right side) ─────────────── */}
      <div className="hero-spin-circle" style={{
        position: 'absolute',
        right: '17%',
        top: '40%',
        transform: 'translateY(-50%)',
        width: '96px',
        height: '96px',
        animation: 'spinCircle 12s linear infinite',
        pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 96 96" width="96" height="96">
          <defs>
            <path id="circlePath" d="M 48,48 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
          </defs>
          <text
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="10"
            fontWeight="300"
            letterSpacing="4.0"
            fill="#FFFFFF"
            opacity="0.75"
          >
            <textPath href="#circlePath">LET'S  MAKE  COOL  THINGS </textPath>
          </text>
        </svg>
        {/* Center star */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          color: 'rgba(255,255,255,0.7)',
          opacity: 0.9,
        }}>
          ✦
        </div>
      </div>

      {/* ── Main content ─────────────────────────────── */}
      <div className="container hero-content-wrap" style={{ paddingTop: '86px', paddingLeft: '34px', marginLeft: 0, maxWidth: 'none', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '760px' }}>

          {/* Group 1: Badge + Name */}
          <div className="fade-in-up" style={{ animationDelay: '0.05s' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 18px',
              borderRadius: '999px',
              background: 'rgba(16,16,18,0.88)',
              border: '1px solid rgba(255,255,255,0.09)',
              marginBottom: '38px',
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.3px',
                fontWeight: '400',
              }}>
                Hello, i'm
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(5rem, 11vw, 8.2rem)',
              fontWeight: '700',
              lineHeight: '0.9',
              letterSpacing: '-2px',
              marginBottom: '14px',
            }}>
              <span style={{ display: 'block', color: '#f7f5fb' }}>Gaia</span>
            </h1>
          </div>

          {/* Group 2: Typewriter + Subtitle */}
          <div className="fade-in-up" style={{ animationDelay: '0.22s' }}>
            <div style={{
              marginBottom: '6px',
              minHeight: '36px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: '820px',
            }}>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.3rem, 2.4vw, 2.1rem)',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.82)',
                letterSpacing: '-0.3px',
              }}>
                {displayed}
                <span style={{
                  opacity: showCursor ? 1 : 0,
                  color: 'rgba(255,255,255,0.45)',
                  marginLeft: '2px',
                  fontWeight: '300',
                  transition: 'opacity 0.1s',
                }}>|</span>
              </span>
            </div>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(1.8rem, 2.8vw, 3rem)',
              color: '#f1edf8',
              lineHeight: '1.2',
              marginBottom: '42px',
              fontWeight: '600',
              width: '100%',
              maxWidth: '820px',
            }}>
              Glad you're here.
            </p>
          </div>

          {/* Group 3: Buttons */}
          <div className="fade-in-up" style={{ animationDelay: '0.38s' }}>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href="#projects"
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(18,18,20,0.92)',
                  color: '#f4f1fa',
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: '0.3px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'none',
                  transition: 'opacity var(--t-hover) var(--ease-standard), transform var(--t-hover) var(--ease-standard)',
                  boxShadow: '0 8px 22px rgba(0,0,0,0.35)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                View projects
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <img
  className="hero-portrait fade-in"
  src="/gaia-portrait-cutout.webp"
  alt="Gaia portrait"
  style={{
    position: 'absolute',
    bottom: '-14px',
    left: '56%',
    transform: 'translateX(-50%)',
    height: '86vh',
    maxHeight: '940px',
    width: 'auto',
    objectFit: 'contain',
    zIndex: 1,
    pointerEvents: 'none',
    userSelect: 'none',
    filter: 'drop-shadow(0 18px 28px rgba(0, 0, 0, 0.45))',
    animationDelay: '0.15s',
  }}
/>

      {/* ── Keyframes ────────────────────────────────── */}
      <style>{`
        @keyframes floatChip {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-10px); }
        }
        @keyframes spinCircle {
          from { transform: translateY(-50%) rotate(0deg);   }
          to   { transform: translateY(-50%) rotate(360deg); }
        }
        @keyframes shimmerText {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }

        .hero-content-wrap {
          padding-right: clamp(24px, 6vw, 88px);
        }

        @media (min-width: 1200px) {
          .hero-content-wrap {
            padding-right: clamp(210px, 22vw, 350px);
          }
        }

        @media (max-width: 1024px) {
          .hero-portrait { height: 68vh !important; left: 66% !important; }
          .hero-content-wrap {
            position: relative;
            z-index: 3;
            padding-right: 24px;
            padding-left: 24px !important;
          }
        }

        /* Tablet + mobile: portrait fades to atmosphere */
        @media (max-width: 768px) {
          .hero-portrait {
            animation: none !important;
            opacity: 0.25 !important;
            left: auto !important;
            right: -20px !important;
            transform: none !important;
            height: 52vh !important;
            z-index: 0 !important;
          }
          .hero-content-wrap {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }

        /* Small phones: hide portrait entirely */
        @media (max-width: 480px) {
          .hero-portrait { display: none !important; }
        }
      `}</style>
    </section>
  );
}

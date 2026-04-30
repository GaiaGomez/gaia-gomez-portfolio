import { useState, useEffect } from 'react';

const roles = [
  'Software Engineer + Designer',
];

const chips = [
  { label: 'Product',      top: '20%',  right: '10%', left: 'auto', bottom: 'auto', delay: '0s' },
  { label: 'Code',         top: '42%',  right: '4%', left: 'auto', bottom: 'auto', delay: '0.6s' },
  { label: 'Design',       top: 'auto', right: '15%', left: 'auto', bottom: '12%', delay: '1.2s' },
  { label: 'AI',           top: 'auto', right: 'auto', left: '45%', bottom: '48%', delay: '0.4s' },
  { label: 'Architecture', top: '66%',  right: '11%', left: 'auto', bottom: 'auto', delay: '0.9s' },
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
      background: '#08060e',
    }}>

      {/* ── BG blobs ─────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: '-15%', right: '-8%',
        width: '650px', height: '650px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(181,123,255,0.13) 0%, transparent 68%)',
        filter: 'blur(48px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', left: '-12%',
        width: '480px', height: '480px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,47,190,0.09) 0%, transparent 70%)',
        filter: 'blur(64px)', pointerEvents: 'none',
      }} />

      {/* ── Subtle grid ──────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(181,123,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(181,123,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />

      {/* ── Floating chips ───────────────────────────── */}
      {chips.map(chip => (
        <div
          key={chip.label}
          style={{
            position: 'absolute',
            top: chip.top, right: chip.right,
            left: chip.left, bottom: chip.bottom,
            padding: '10px 20px',
            borderRadius: '999px',
            background: 'rgba(181,123,255,0.07)',
            border: '1px solid rgba(181,123,255,0.22)',
            color: '#c9a8ff',
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
      <div style={{
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
            fill="#B57BFF"
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
          color: '#B57BFF',
          opacity: 0.9,
        }}>
          ✦
        </div>
      </div>

      {/* ── Main content ─────────────────────────────── */}
      <div className="container" style={{ paddingTop: '90px', paddingLeft: '48px', marginLeft: 0, maxWidth: 'none', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '780px' }}>

          {/* 1. Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 18px',
            borderRadius: '999px',
            background: 'rgba(181,123,255,0.1)',
            border: '1px solid rgba(181,123,255,0.28)',
            marginBottom: '44px',
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              color: '#c9a8ff',
              letterSpacing: '0.3px',
              fontWeight: '400',
            }}>
              Hello, i'm        
            </span>
          </div>

          {/* 2. Name */}
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(64px, 10vw, 130px)',
            fontWeight: '700',
            lineHeight: '0.93',
            letterSpacing: '-4px',
            marginBottom: '24px',
          }}>
            <span style={{
              display: 'block',
              color: '#ede8f5',
            }}>
              Gaia
            </span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(90deg, #E0AAFF 0%, #B57BFF 40%, #7B2FBE 70%, #E0AAFF 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmerText 3s ease-in-out infinite',
            }}>
              Gómez
            </span>
          </h1>

          {/* 3. Typewriter */}
          <div style={{
            marginBottom: '28px',
            minHeight: '36px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(18px, 2.2vw, 26px)',
              fontWeight: '500',
              color: '#E0AAFF',
              letterSpacing: '-0.3px',
            }}>
              {displayed}
              <span style={{
                opacity: showCursor ? 1 : 0,
                color: '#B57BFF',
                marginLeft: '2px',
                fontWeight: '300',
                transition: 'opacity 0.1s',
              }}>|</span>
            </span>
          </div>

          {/* 4. Subtitle */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(16px, 1.8vw, 19px)',
            color: 'rgba(237,232,245,0.45)',
            lineHeight: '1.65',
            marginBottom: '52px',
            fontWeight: '300',
            maxWidth: '480px',
          }}>
            I build polished web applications that combine clean architecture, thoughtful UX and strong visual design.
          </p>

          {/* 5. Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href="#projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #B57BFF 0%, #7B2FBE 100%)',
                color: '#fff',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: '500',
                letterSpacing: '0.3px',
                border: 'none',
                cursor: 'none',
                transition: 'opacity 0.25s, transform 0.25s',
                boxShadow: '0 4px 24px rgba(181,123,255,0.35)',
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

      {/* ── Scroll indicator ─────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: '36px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity: 0.35,
        pointerEvents: 'none',
      }}>
        <span style={{
          fontSize: '10px',
          letterSpacing: '2.5px',
          fontFamily: "'DM Sans', sans-serif",
          textTransform: 'uppercase',
        }}>scroll</span>
        <div style={{
          width: '1px',
          height: '38px',
          background: 'linear-gradient(to bottom, rgba(181,123,255,0.9), transparent)',
          animation: 'scrollLine 1.9s ease-in-out infinite',
        }} />
      </div>

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
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top;    }
          50%  { transform: scaleY(1); transform-origin: top;    }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}

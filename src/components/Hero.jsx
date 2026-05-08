import { useState, useEffect, useRef } from 'react';

const roles = [
  'Software Engineer • Product Engineer • Full Stack Developer',
];

const chips = [
  { label: 'Product', top: '20%', right: '10%', left: 'auto', bottom: 'auto', delay: '0s', color: '#A891C4' },
  { label: 'Code', top: '43%', right: '3.5%', left: 'auto', bottom: 'auto', delay: '0.6s', color: '#A891C4' },
  { label: 'Architecture', top: '67%', right: '10%', left: 'auto', bottom: 'auto', delay: '0.9s', color: '#A891C4' },
  { label: 'Design', top: 'auto', right: '10%', left: 'auto', bottom: '12%', delay: '1.2s', color: '#A891C4' },
  { label: 'AI', top: '24%', right: '33%', left: 'auto', bottom: 'auto', delay: '0.4s', color: '#A891C4' },
];

export default function Hero() {
  const [displayed, setDisplayed] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const sectionRef = useRef(null);

  // Scroll-based scale: 1 → 0.96 over one viewport height
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onScroll = () => {
      const scale = Math.max(
        0.96,
        Math.min(1, 1 - (window.scrollY / window.innerHeight) * 0.04)
      );

      if (sectionRef.current) {
        sectionRef.current.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Typewriter
  useEffect(() => {
    const fullText = roles[roleIdx];
    let timeout;

    if (!isDeleting) {
      if (displayed.length < fullText.length) {
        timeout = setTimeout(
          () => setDisplayed(fullText.slice(0, displayed.length + 1)),
          42
        );
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 3600);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      } else {
        setIsDeleting(false);
        setRoleIdx((i) => (i + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIdx]);

  // Blinking cursor
  useEffect(() => {
    const iv = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(iv);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#090909',
        transformOrigin: 'top center',
        willChange: 'transform',
      }}
    >
      {/* ── BG blobs ─────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-8%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.022) 0%, transparent 68%)',
          filter: 'blur(72px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-12%',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(80,80,90,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Subtle grid ──────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── Floating chips ───────────────────────────── */}
      {chips.map((chip) => (
        <div
          key={chip.label}
          className="hero-chip"
          data-chip={chip.label.toLowerCase()}
          style={{
            position: 'absolute',
            top: chip.top,
            right: chip.right,
            left: chip.left,
            bottom: chip.bottom,
            padding: '10px 20px',
            borderRadius: '999px',
            background: 'rgba(16,16,18,0.88)',
            border: `1px solid ${chip.color}28`,
            color: chip.color,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'var(--text-meta)',
            fontWeight: '500',
            letterSpacing: '0.3px',
            backdropFilter: 'blur(10px)',
            animation: 'floatChip 5s ease-in-out infinite',
            animationDelay: chip.delay,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {chip.label}
        </div>
      ))}

      {/* ── Spinning circle ──────────────────────────── */}
      <div
        className="hero-spin-circle"
        style={{
          position: 'absolute',
          right: '17%',
          top: '40%',
          transform: 'translateY(-50%)',
          width: '96px',
          height: '96px',
          animation: 'spinCircle 12s linear infinite',
          pointerEvents: 'none',
        }}
      >
        <svg viewBox="0 0 96 96" width="96" height="96">
          <defs>
            <path
              id="circlePath"
              d="M 48,48 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"
            />
          </defs>

          <text
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="10"
            fontWeight="300"
            letterSpacing="4.0"
            fill="#A891C4"
            opacity="0.7"
          >
            <textPath href="#circlePath">LET&apos;S MAKE COOL THINGS </textPath>
          </text>
        </svg>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#A891C4',
            opacity: 0.85,
          }}
        >
          ✦
        </div>
      </div>

      {/* ── Main content ─────────────────────────────── */}
      <div
        className="container hero-content-wrap"
        style={{
          paddingTop: '86px',
          paddingLeft: '34px',
          marginLeft: 0,
          maxWidth: 'none',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: '760px' }}>
          {/* Group 1: Badge + Name */}
          <div className="fade-in-up" style={{ animationDelay: '0.05s' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 18px',
                borderRadius: '999px',
                background: 'rgba(16,16,18,0.88)',
                border: '1px solid rgba(255,255,255,0.09)',
                marginBottom: '38px',
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'var(--text-meta)',
                  color: 'rgba(255,255,255,0.55)',
                  letterSpacing: '0.3px',
                  fontWeight: '400',
                }}
              >
                Hello, i&apos;m
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'var(--text-hero-title)',
                fontWeight: '700',
                lineHeight: '0.9',
                letterSpacing: '-2px',
                marginBottom: '14px',
              }}
            >
              <span style={{ display: 'block', color: '#F3E9D8' }}>Gaia</span>
            </h1>
          </div>

          {/* Group 2: Typewriter + Subtitle */}
          <div className="fade-in-up" style={{ animationDelay: '0.22s' }}>
            <div
              style={{
                marginBottom: '6px',
                minHeight: '34px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: '620px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.08rem, 1.75vw, 1.55rem)',
                  fontWeight: '800',
                  color: '#A891C4',
                  letterSpacing: '-0.45px',
                  lineHeight: '1.2',
                  whiteSpace: 'normal',
                }}
              >
                {displayed}
                <span
                  style={{
                    opacity: showCursor ? 1 : 0,
                    color: '#A891C4',
                    marginLeft: '3px',
                    fontWeight: '300',
                    transition: 'opacity 0.1s',
                  }}
                >
                  |
                </span>
              </span>
            </div>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                color: 'rgba(243,233,216,0.78)',
                lineHeight: '1.35',
                marginTop: '2px',
                marginBottom: '24px',
                fontWeight: '500',
                letterSpacing: '-0.1px',
              }}
            >
              with a Graphic Design background
            </p>

            <p
            style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(0.95rem, 1.05vw, 1rem)',
            color: 'rgba(243,233,216,0.78)',
            lineHeight: '1.35',
            marginBottom: '38px',
            fontWeight: '500',
            letterSpacing: '-0.1px',
            width: '100%',
            maxWidth: '820px',
            }}
            >
            Glad you&apos;re here.
            </p>
          </div>

          {/* Group 3: Buttons */}
          <div className="fade-in-up" style={{ animationDelay: '0.38s' }}>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href="#projects"
                className="btn btn-primary"
                style={{ cursor: 'none', textDecoration: 'none' }}
              >
                View projects
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
          top: '61%',
          bottom: 'auto',
          left: '47%',
          transform: 'translate(-50%, -50%)',
          height: '82vh',
          maxHeight: '920px',
          width: 'auto',
          objectFit: 'contain',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          filter:
            'brightness(1.18) contrast(1.08) drop-shadow(0 24px 42px rgba(0,0,0,0.72)) drop-shadow(0 0 28px rgba(255,255,255,0.08))',
          animationDelay: '0.15s',
        }}
      />

      {/* ── Keyframes ────────────────────────────────── */}
      <style>{`
        @keyframes floatChip {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spinCircle {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }

        @keyframes shimmerText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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
          .hero-portrait {
            height: 68vh !important;
            left: 66% !important;
          }

          .hero-content-wrap {
            position: relative;
            z-index: 3;
            padding-right: 24px;
            padding-left: 24px !important;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            flex-direction: column !important;
            align-items: stretch !important;
            justify-content: flex-start !important;
            min-height: auto !important;
            padding-bottom: 44px;
          }

          .hero-content-wrap {
            width: 100% !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
          }

          .hero-portrait {
            position: relative !important;
            bottom: auto !important;
            left: auto !important;
            transform: none !important;
            width: 88% !important;
            height: auto !important;
            max-height: 42vh !important;
            display: block !important;
            align-self: center !important;
            margin: 12px auto 0 !important;
            opacity: 1 !important;
            z-index: 2 !important;
            animation: none !important;
          }

          .hero-spin-circle {
            display: none !important;
          }

          .hero-chip[data-chip="code"],
          .hero-chip[data-chip="architecture"] {
            display: none !important;
          }

          .hero-chip {
            font-size: 0.72rem !important;
            padding: 7px 14px !important;
            animation: none !important;
          }

          .hero-chip[data-chip="product"] {
            top: auto !important;
            left: auto !important;
            right: 20px !important;
            bottom: 108px !important;
          }

          .hero-chip[data-chip="design"] {
            top: auto !important;
            left: auto !important;
            right: 20px !important;
            bottom: 64px !important;
          }

          .hero-chip[data-chip="ai"] {
            top: auto !important;
            left: auto !important;
            right: 20px !important;
            bottom: 20px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-portrait {
            width: 96% !important;
            max-height: 38vh !important;
          }

          .hero-chip {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
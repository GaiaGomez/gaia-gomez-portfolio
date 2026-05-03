import { useState, useEffect } from 'react';

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'About me', href: '#about' },
];

function HamburgerIcon({ open }) {
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden="true">
      {open ? (
        <>
          <line x1="2" y1="2"  x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="20" y1="2" x2="2"  y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <line x1="1" y1="3"  x2="21" y2="3"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="1" y1="9"  x2="21" y2="9"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="1" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </>
      )}
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on desktop resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 40px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.4s, border-color 0.4s',
        background: scrolled || menuOpen ? 'rgba(6,6,7,0.96)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}>
        <a href="#" onClick={close} style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '27px',
          fontWeight: '700',
          color: '#e8e0f5',
          letterSpacing: '-0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          textDecoration: 'none',
        }}>
          GG
          <span style={{
            display: 'inline-block',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#ffffff',
            marginLeft: '1px',
            verticalAlign: 'super',
          }} />
        </a>

        {/* Desktop links */}
        <ul className="nav-desktop-links" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}>
          {links.map(l => (
            <li key={l.label}>
              <a
                href={l.href}
                className="nav-link"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  fontWeight: '400',
                  color: 'rgba(241,238,248,0.72)',
                  transition: 'color 0.2s',
                  letterSpacing: '0.2px',
                }}
                onMouseEnter={e => e.target.style.color = '#ffffff'}
                onMouseLeave={e => e.target.style.color = 'rgba(241,238,248,0.72)'}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="btn btn-outline nav-link"
              style={{ minHeight: 'var(--btn-h)', padding: '0 24px', fontSize: 'var(--fs-btn)' }}
            >
              Say hi ✦
            </a>
          </li>
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            width: '44px',
            height: '44px',
            alignItems: 'center',
            justifyContent: 'center',
            background: menuOpen ? 'rgba(255,255,255,0.06)' : 'none',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            color: '#f1eef8',
            cursor: 'pointer',
            transition: 'background 0.2s',
            flexShrink: 0,
          }}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '70px',
            zIndex: 999,
            background: 'rgba(9,9,9,0.98)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            animation: 'fadeIn 0.18s var(--ease-standard)',
            padding: '40px 24px',
          }}
        >
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={close}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.8rem, 8vw, 2.4rem)',
                fontWeight: '700',
                color: 'rgba(241,238,248,0.88)',
                letterSpacing: '-0.5px',
                textDecoration: 'none',
                padding: '14px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                width: '100%',
                textAlign: 'center',
                transition: 'color 0.2s',
                animation: `fadeInUp 0.4s var(--ease-standard) ${i * 0.07}s both`,
              }}
              onTouchStart={e => e.currentTarget.style.color = '#ffffff'}
              onTouchEnd={e => e.currentTarget.style.color = 'rgba(241,238,248,0.88)'}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={close}
            className="btn btn-outline"
            style={{
              marginTop: '24px',
              minHeight: '56px',
              padding: '0 40px',
              fontSize: '1rem',
              animation: 'fadeInUp 0.4s var(--ease-standard) 0.16s both',
            }}
          >
            Say hi ✦
          </a>
        </div>
      )}
    </>
  );
}

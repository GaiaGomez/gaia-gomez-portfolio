import { useState, useEffect } from 'react';

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'About me', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle = {
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
    background: scrolled ? 'rgba(6,6,7,0.88)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
  };

  const logoStyle = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '27px',
    fontWeight: '700',
    color: '#e8e0f5',
    letterSpacing: '-0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
  };

  const dotStyle = {
    display: 'inline-block',
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#B57BFF',
    marginLeft: '1px',
    verticalAlign: 'super',
  };

  return (
    <nav style={navStyle}>
      <a href="#" style={logoStyle}>
        GG<span style={dotStyle} />
      </a>

      {/* Desktop links */}
      <ul style={{
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
              onMouseEnter={e => e.target.style.color = '#B57BFF'}
              onMouseLeave={e => e.target.style.color = 'rgba(241,238,248,0.72)'}
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className="btn btn-outline"
            style={{ minHeight: 'var(--btn-h)', padding: '0 24px', fontSize: 'var(--fs-btn)' }}
          >
            Say hi ✦
          </a>
        </li>
      </ul>
    </nav>
  );
}

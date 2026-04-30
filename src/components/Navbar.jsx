import { useState, useEffect } from 'react';

const links = [
  { label: 'Work',    href: '#projects' },
  { label: 'Skills',  href: '#skills'   },
  { label: 'About',   href: '#about'    },
  { label: 'Contact', href: '#contact'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

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
    background: scrolled ? 'rgba(8,6,14,0.85)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(181,123,255,0.1)' : '1px solid transparent',
  };

  const logoStyle = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '20px',
    fontWeight: '700',
    color: '#e8e0f5',
    letterSpacing: '-0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
  };

  const dotStyle = {
    display: 'inline-block',
    width: '6px',
    height: '6px',
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
        gap: '36px',
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
                color: 'rgba(232,224,245,0.65)',
                transition: 'color 0.2s',
                letterSpacing: '0.2px',
              }}
              onMouseEnter={e => e.target.style.color = '#B57BFF'}
              onMouseLeave={e => e.target.style.color = 'rgba(232,224,245,0.65)'}
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className="btn btn-outline"
            style={{ padding: '8px 22px', fontSize: '13px' }}
          >
            Say hi ✦
          </a>
        </li>
      </ul>
    </nav>
  );
}

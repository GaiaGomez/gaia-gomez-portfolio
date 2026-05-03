import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const socials = [
  { label: 'GitHub', href: 'https://github.com/GaiaGomez', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )},
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gaiagomez', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )},
  { label: 'Instagram', href: 'https://www.instagram.com/gaiagomez/', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )},
];

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [focused, setFocused] = useState('');
  const [leftRef, leftVisible]   = useReveal();
  const [rightRef, rightVisible] = useReveal();

  const inputStyle = (field) => ({
    width: '100%',
    padding: '16px 20px',
    borderRadius: '12px',
    background: 'rgba(14,14,16,0.82)',
    border: `1px solid ${focused === field ? 'rgba(181,123,255,0.28)' : 'rgba(255,255,255,0.08)'}`,
    color: '#f1eef8',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
    boxShadow: focused === field ? '0 0 0 3px rgba(181,123,255,0.05)' : 'none',
    resize: 'none',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="section" id="contact" style={{
      background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.008) 100%)',
    }}>
      <div className="container">

        <p className="section-label">Contact</p>
        <div className="contact-grid">

          {/* Left */}
          <div
            ref={leftRef}
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? 'translateY(0)' : 'translateY(22px)',
              transition: 'opacity 0.65s var(--ease-standard), transform 0.65s var(--ease-standard)',
            }}
          >
            <h2 className="section-title">
              Let's build<br />
              something <span style={{ color: '#f1eef8' }}>great</span>
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'var(--fs-body)',
              color: 'rgba(241,238,248,0.58)',
              lineHeight: '1.7',
              marginBottom: '48px',
              fontWeight: '300',
              maxWidth: 'var(--text-max)',
            }}>
              My inbox is always open.
            </p>

            {/* Direct email */}
            <a href="mailto:gaiavaninago@gmail.com" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '48px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '18px',
              fontWeight: '500',
              color: '#B57BFF',
              borderBottom: '1px solid rgba(181,123,255,0.3)',
              paddingBottom: '4px',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#B57BFF'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(181,123,255,0.3)'}
            >
              gaiavaninago@gmail.com
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H7M13 3v6" stroke="#B57BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Socials */}
            <div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'rgba(232,224,245,0.3)',
                marginBottom: '16px',
              }}>
                Find me on
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    title={s.label}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(16,16,18,0.9)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(241,238,248,0.6)',
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(181,123,255,0.22)';
                      e.currentTarget.style.color = '#B57BFF';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(16,16,18,0.9)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.color = 'rgba(241,238,248,0.6)';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div
            ref={rightRef}
            style={{
              padding: '32px',
              borderRadius: 'var(--radius-card)',
              background: 'rgba(16,16,18,0.9)',
              border: '1px solid rgba(255,255,255,0.08)',
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? 'translateY(0)' : 'translateY(22px)',
              transition: 'opacity 0.65s var(--ease-standard) 0.12s, transform 0.65s var(--ease-standard) 0.12s',
            }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(77,255,145,0.1)',
                  border: '1px solid rgba(77,255,145,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#4dff91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '22px',
                  color: '#e8e0f5',
                  marginBottom: '10px',
                }}>
                  Message sent!
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  color: 'rgba(232,224,245,0.45)',
                }}>
                  I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'var(--fs-label)',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'rgba(232,224,245,0.35)',
                    marginBottom: '8px',
                  }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    style={inputStyle('name')}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'var(--fs-label)',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'rgba(232,224,245,0.35)',
                    marginBottom: '8px',
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    style={inputStyle('email')}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'var(--fs-label)',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'rgba(232,224,245,0.35)',
                    marginBottom: '8px',
                  }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Say hi 👋"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    style={inputStyle('message')}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '8px', position: 'relative', minHeight: 'var(--btn-h)' }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>Send message</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ position: 'relative', zIndex: 1 }}>
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '100px',
          paddingTop: '32px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '18px',
            fontWeight: '700',
            color: 'rgba(241,238,248,0.76)',
          }}>
            GG<span style={{ color: '#B57BFF' }}>.</span>
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            color: 'rgba(232,224,245,0.2)',
          }}>
            © 2026 Gaia Gómez. Built by me.
          </span>
        </div>
      </div>
    </section>
  );
}

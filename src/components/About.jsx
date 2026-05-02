const facts = [
  { label: 'Learning by doing',   value: 'In my build era' },
  { label: 'No fear', value: 'New  tools' },
  { label: 'In a good way', value: 'Detail obsessed' },
  { label: 'Best combo honestly',  value: 'Code + taste' },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}>
          {/* Left: text */}
          <div>
            <p className="section-label">About me</p>
            <h2 className="section-title">
              Code, design<br />
              and everything<br />
              <span style={{ color: '#f1eef8' }}>in between</span>
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'var(--fs-body)',
              color: 'rgba(241,238,248,0.58)',
              lineHeight: '1.75',
              marginBottom: '20px',
              fontWeight: '300',
              maxWidth: 'var(--text-max)',
            }}>
              I’m Gaia, a junior software engineer with a curious brain, a design aware mindset and a genuine obsession with learning how things work. I like building digital experiences that make sense, feel good to use and keep getting better through iteration.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'var(--fs-body)',
              color: 'rgba(241,238,248,0.58)',
              lineHeight: '1.75',
              marginBottom: '44px',
              fontWeight: '300',
              maxWidth: 'var(--text-max)',
            }}>
              I’m fully in it: learning, testing, improving and trying things until they click. My design background adds an extra layer of clarity and user sensitivity to the way I build.

            </p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '44px' }}>
              {facts.map(f => (
                <div key={f.label} style={{
                  padding: '24px',
                  borderRadius: '24px',
                  background: 'rgba(16,16,18,0.88)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '36px',
                    fontWeight: '700',
                    color: '#B57BFF',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}>
                    {f.value}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'var(--fs-label)',
                    color: 'rgba(232,224,245,0.4)',
                  }}>
                    {f.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#contact" className="btn btn-primary" style={{ position: 'relative' }}>
                <span style={{ position: 'relative', zIndex: 1 }}>Get in touch</span>
              </a>
              <a
                href="/Gaia-Gomez-CV.pdf"
                download
                className="btn"
                style={{
                  minHeight: 'var(--btn-h)',
                  background: 'rgba(18,18,20,0.82)',
                  borderColor: 'rgba(255,255,255,0.09)',
                  color: 'rgba(241,238,248,0.88)',
                }}
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Right: visual card */}
          <div style={{ position: 'relative' }}>
            {/* Background card */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '-20px',
              bottom: '-20px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))',
              border: '1px solid rgba(255,255,255,0.06)',
            }} />

            {/* Main card */}
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-card)',
              padding: '32px',
              background: 'rgba(16,16,18,0.94)',
              border: '1px solid rgba(255,255,255,0.09)',
              backdropFilter: 'blur(10px)',
            }}>
              {/* Avatar placeholder */}
              <div style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #252528, #1e1e22)',
                border: '1px solid rgba(181,123,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '32px',
                fontWeight: '700',
                color: '#fff',
              }}>
                GG
              </div>

              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '24px',
                fontWeight: '700',
                color: '#e8e0f5',
                marginBottom: '4px',
              }}>
                Gaia Gómez
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                color: '#B57BFF',
                marginBottom: '28px',
              }}>
                Software Engineer · Designer
              </p>

              {/* Info rows */}
              {[
                { icon: '📍', text: 'Based in Medellín, Colombia' },
                { icon: '🧠', text: 'Code first, design as a plus' },
                { icon: '🎒', text: 'Open to junior software roles' },
                { icon: '🌐', text: 'EN / ES' },
              ].map(item => (
                <div key={item.text} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <span style={{ fontSize: '16px', lineHeight: 1 }}>{item.icon}</span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    color: 'rgba(232,224,245,0.55)',
                  }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

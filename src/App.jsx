import './App.css';
import { useEffect, useRef } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import Projects     from './components/Projects';
import About        from './components/About';
import Contact      from './components/Contact';

export default function App() {
  const glowRef = useRef(null);

  useEffect(() => {
    const isDesktop = window.matchMedia('(pointer: fine) and (min-width: 769px)').matches;
    const noMotion  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isDesktop || noMotion) return;

    const mouse = { x: -9999, y: -9999 };
    const pos   = { x: -9999, y: -9999 };
    let raf;

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.07;
      pos.y += (mouse.y - pos.y) * 0.07;
      if (glowRef.current) {
        glowRef.current.style.background =
          `radial-gradient(650px at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.03), transparent 70%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Grain noise overlay */}
      <div id="noise-overlay" />

      {/* Cursor glow — desktop only, respects prefers-reduced-motion */}
      <div ref={glowRef} style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'background 0.1s',
      }} />

      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}

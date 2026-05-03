import { useEffect, useRef, useState } from 'react';

// SVG plane coords: nose(26,2), upper-wing(3,6), lower-wing(5,26), fold(12,16)
// centroid ≈ (11.5, 12.5) → NATURAL_ANGLE ≈ –36°
const NOSE_X   = 26;
const NOSE_Y   = 2;
const CENTER_X = (26 + 3 + 5 + 12) / 4;
const CENTER_Y = (2  + 6 + 26 + 16) / 4;
const NATURAL_ANGLE = Math.atan2(NOSE_Y - CENTER_Y, NOSE_X - CENTER_X) * (180 / Math.PI);

export default function CustomCursor() {
  const svgRef   = useRef(null);
  const pos      = useRef({ x: -300, y: -300 });
  const prevPos  = useRef({ x: -300, y: -300 });
  const smoothX  = useRef(-300);
  const smoothY  = useRef(-300);
  const curAngle = useRef(0);
  const tgtAngle = useRef(0);
  const curScale = useRef(1);
  const tgtScale = useRef(1);
  const isHover  = useRef(false);
  const raf      = useRef(null);
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    setHasPointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!hasPointer) return;

    const onMove = (e) => {
      prevPos.current = { ...pos.current };
      pos.current = { x: e.clientX, y: e.clientY };
      const dx  = pos.current.x - prevPos.current.x;
      const dy  = pos.current.y - prevPos.current.y;
      const spd = Math.sqrt(dx * dx + dy * dy);
      if (spd > 0.8) {
        tgtAngle.current = Math.atan2(dy, dx) * (180 / Math.PI) - NATURAL_ANGLE;
      }
    };

    const onDown = () => { tgtScale.current = isHover.current ? 1.0  : 0.78; };
    const onUp   = () => { tgtScale.current = isHover.current ? 1.22 : 1.0;  };

    const onEnter = () => { isHover.current = true;  tgtScale.current = 1.22; };
    const onLeave = () => { isHover.current = false; tgtScale.current = 1.0;  };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    function attach() {
      document.querySelectorAll('a, button, .btn, .filter-btn, .nav-link, .project-card').forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    }
    attach();

    const animate = () => {
      smoothX.current += (pos.current.x - smoothX.current) * 0.13;
      smoothY.current += (pos.current.y - smoothY.current) * 0.13;

      let da = tgtAngle.current - curAngle.current;
      while (da >  180) da -= 360;
      while (da < -180) da += 360;
      curAngle.current += da * 0.09;

      curScale.current += (tgtScale.current - curScale.current) * 0.2;

      if (svgRef.current) {
        const tx = smoothX.current - NOSE_X;
        const ty = smoothY.current - NOSE_Y;
        svgRef.current.style.transform =
          `translate(${tx}px, ${ty}px) rotate(${curAngle.current}deg) scale(${curScale.current})`;
        svgRef.current.style.filter = isHover.current
          ? 'drop-shadow(0 0 6px rgba(255,255,255,0.35)) drop-shadow(1px 2px 3px rgba(0,0,0,0.5)) brightness(1.18)'
          : 'drop-shadow(0.5px 1.5px 3px rgba(0,0,0,0.65))';
      }

      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      observer.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [hasPointer]);

  if (!hasPointer) return null;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 28 28"
      width="28"
      height="28"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        transformOrigin: `${NOSE_X}px ${NOSE_Y}px`,
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
        overflow: 'visible',
      }}
    >
      <defs>
        {/* Upper face: bright chrome near nose, silver toward wing tip */}
        <linearGradient id="cg-body" x1="100%" y1="0%" x2="10%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.97" />
          <stop offset="42%"  stopColor="#e0e0e0" stopOpacity="0.90" />
          <stop offset="100%" stopColor="#808080" stopOpacity="0.70" />
        </linearGradient>
        {/* Lower wing: darker shadow side */}
        <linearGradient id="cg-wing" x1="100%" y1="0%" x2="5%" y2="100%">
          <stop offset="0%"   stopColor="#b8b8b8" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#181818" stopOpacity="0.52" />
        </linearGradient>
        {/* Glass sheen: bright highlight fading toward wing edge */}
        <linearGradient id="cg-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.00" />
        </linearGradient>
      </defs>

      {/* Lower wing – underside/shadow face */}
      <path
        d="M 26 2 L 5 26 L 12 16 Z"
        fill="url(#cg-wing)"
        stroke="rgba(0,0,0,0.52)"
        strokeWidth="0.45"
        strokeLinejoin="round"
      />

      {/* Upper body – bright top face */}
      <path
        d="M 26 2 L 3 6 L 12 16 Z"
        fill="url(#cg-body)"
        stroke="rgba(0,0,0,0.30)"
        strokeWidth="0.45"
        strokeLinejoin="round"
      />

      {/* Center fold ridge – bright chrome crease */}
      <line
        x1="26" y1="2" x2="12" y2="16"
        stroke="rgba(255,255,255,0.92)"
        strokeWidth="0.65"
        strokeLinecap="round"
      />

      {/* Glass sheen – inner highlight near nose on upper face */}
      <path
        d="M 26 2 L 8 4 L 15 10 Z"
        fill="url(#cg-sheen)"
      />

      {/* Nose tip highlight */}
      <circle cx="25.4" cy="2.6" r="0.9" fill="white" opacity="0.9" />
    </svg>
  );
}

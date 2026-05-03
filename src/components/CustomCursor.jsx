import { useEffect, useRef, useState } from 'react';

// 40×40 viewBox — nose at (38, 5), visual center ~(15, 20)
const NOSE_X = 38;
const NOSE_Y = 5;
const NATURAL_ANGLE = Math.atan2(5 - 20, 38 - 15) * (180 / Math.PI); // ≈ –33°

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

    const onDown = () => { tgtScale.current = isHover.current ? 1.0  : 0.80; };
    const onUp   = () => { tgtScale.current = isHover.current ? 1.18 : 1.0;  };
    const onEnter = () => { isHover.current = true;  tgtScale.current = 1.18; };
    const onLeave = () => { isHover.current = false; tgtScale.current = 1.0;  };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });
    function attach() {
      document.querySelectorAll('a,button,.btn,.filter-btn,.nav-link,.project-card').forEach(el => {
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
          `translate(${tx}px,${ty}px) rotate(${curAngle.current}deg) scale(${curScale.current})`;
        svgRef.current.style.filter = isHover.current
          ? 'drop-shadow(0 0 9px rgba(255,255,255,0.45)) drop-shadow(1px 2px 5px rgba(0,0,0,0.55)) brightness(1.22)'
          : 'drop-shadow(1px 3px 5px rgba(0,0,0,0.75))';
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

  /*
    Plane silhouette (40×40 viewBox, rounded beziers):
      Nose         (38,5)
      Top-back     (3,11)
      Fold-point   (13,22)
      Lower-back   (5,36)
      Tail         (18,30)

    Fold line (shared ridge): M38 5  C31 12 23 18  13 22

    Layer order (back → front):
      1. Lower face  — dark gradient (below fold line)
      2. Upper face  — bright chrome gradient (above fold line)
      3. Inner groove — near-black sliver straddling fold line → depth
      4. Outer rim stroke  — thick white/silver halo
      5. Top-edge stroke   — extra bright upper outline
      6. Fold-ridge stroke — bright crease line
      7. Glass sheen       — soft triangle near nose
      8. Reflection streak — secondary blurred highlight
      9. Lower rim light   — faint lower-edge rim
     10. Nose area glow    — blurred radial white
     11. Nose tip dot      — hard bright specular
  */

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 40 40"
      width="40"
      height="40"
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
        {/* Soft blur for glow elements */}
        <filter id="cg-b" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.1"/>
        </filter>

        {/* Upper face: white→silver→mid-gray, brightest near nose */}
        <linearGradient id="cg-top" x1="100%" y1="0%" x2="4%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1.00"/>
          <stop offset="35%"  stopColor="#eeeeee" stopOpacity="0.97"/>
          <stop offset="75%"  stopColor="#c0c0c0" stopOpacity="0.90"/>
          <stop offset="100%" stopColor="#606060" stopOpacity="0.80"/>
        </linearGradient>

        {/* Lower face: mid-silver→charcoal→near-black */}
        <linearGradient id="cg-low" x1="95%" y1="5%" x2="4%" y2="95%">
          <stop offset="0%"   stopColor="#b0b0b0" stopOpacity="0.92"/>
          <stop offset="40%"  stopColor="#505050" stopOpacity="0.88"/>
          <stop offset="100%" stopColor="#060606" stopOpacity="0.68"/>
        </linearGradient>

        {/* Inner groove: very dark, fades toward tail */}
        <linearGradient id="cg-grv" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#000000" stopOpacity="0.96"/>
          <stop offset="60%"  stopColor="#101010" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#282828" stopOpacity="0.30"/>
        </linearGradient>

        {/* Glass sheen: white → transparent */}
        <linearGradient id="cg-shn" x1="0%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.90"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.00"/>
        </linearGradient>

        {/* Nose radial glow */}
        <radialGradient id="cg-ngl" cx="30%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1.0"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0"/>
        </radialGradient>
      </defs>

      {/* ── 1. Lower face (dark underside, below fold line) ── */}
      <path
        d="M 38 5 C 31 12 23 18 13 22
           C 10 28 7 32 5 36
           C 8 36 13 33 18 30
           C 24 27 31 18 38 5 Z"
        fill="url(#cg-low)"
      />

      {/* ── 2. Upper face (bright top wing, above fold line) ── */}
      <path
        d="M 38 5 C 29 4 12 7 3 11
           C 5 17 9 20 13 22
           C 23 18 31 12 38 5 Z"
        fill="url(#cg-top)"
      />

      {/* ── 3. Inner dark groove (concave fold crease depth) ──
              Narrow sliver ±2 around the fold-line bezier        */}
      <path
        d="M 38 5 C 31 14 23 20 13 22
           C 23 16 31 10 38 5 Z"
        fill="url(#cg-grv)"
      />

      {/* ── 4. Outer glossy rim (thick chrome halo stroke) ── */}
      <path
        d="M 38 5 C 29 4 12 7 3 11
           C 5 17 9 20 13 22
           C 10 28 7 32 5 36
           C 8 36 13 33 18 30
           C 24 27 31 18 38 5 Z"
        fill="none"
        stroke="rgba(255,255,255,0.80)"
        strokeWidth="2.0"
        strokeLinejoin="round"
      />

      {/* ── 5. Top-edge inner bright stroke ── */}
      <path
        d="M 38 5 C 29 4 12 7 3 11"
        fill="none"
        stroke="rgba(255,255,255,0.97)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* ── 6. Fold-ridge crease (bright center line) ── */}
      <path
        d="M 38 5 C 31 12 23 18 13 22"
        fill="none"
        stroke="rgba(255,255,255,0.88)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {/* ── 7. Large glass sheen (triangular specular near top) ── */}
      <path
        d="M 38 5 C 33 4 22 6 13 9
           C 8 11 5 13 6 17
           C 10 15 17 12 23 9
           C 29 7 34 6 38 5 Z"
        fill="url(#cg-shn)"
      />

      {/* ── 8. Secondary curved reflection streak ── */}
      <path
        d="M 26 9 C 20 13 15 18 13 22"
        fill="none"
        stroke="rgba(255,255,255,0.48)"
        strokeWidth="0.85"
        strokeLinecap="round"
        filter="url(#cg-b)"
      />

      {/* ── 9. Lower rim light (faint lower-edge chrome) ── */}
      <path
        d="M 5 36 C 8 36 13 33 18 30 C 24 27 31 18 38 5"
        fill="none"
        stroke="rgba(255,255,255,0.30)"
        strokeWidth="0.65"
        strokeLinecap="round"
      />

      {/* ── 10. Nose area blurred glow ── */}
      <circle cx="36" cy="7" r="4.5" fill="url(#cg-ngl)" filter="url(#cg-b)"/>

      {/* ── 11. Nose tip hard specular dot ── */}
      <circle cx="37.2" cy="5.8" r="1.2" fill="white" opacity="0.96"/>
    </svg>
  );
}

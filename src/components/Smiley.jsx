import { useEffect, useRef, useState } from 'react';

/*
  Smiley — carita minimalista con lentes (un mini-autorretrato).

  Interacciones:
  - Desktop: los ojos siguen el cursor y la cabeza se inclina un poquito hacia él.
  - Hover: sonrisa grande + cachetes sonrojados.
  - Click / tap: guiño, rebote, chispita ✦ y cambia el "status".
  - Parpadea sola cada 2.5–6 s.
  - prefers-reduced-motion: sin seguimiento, sin rebote ni parpadeo (queda estática).

  Rendimiento: el seguimiento del cursor NO usa estado de React. Escribe los
  transforms directo en el DOM vía refs dentro de requestAnimationFrame, así no
  hay un re-render por frame. Además el loop se pausa cuando la carita no está
  en pantalla (IntersectionObserver).
*/

const STATUSES = [
  'shipping something',
  'deep in RAG',
  'learning agents',
  'probably refactoring',
  'designing in my head',
  'debugging with coffee',
  'reading about embeddings',
];

// Centros de los lentes en el viewBox 0 0 200 200
const EYE_L = { x: 70, y: 92 };
const EYE_R = { x: 130, y: 92 };
const PUPIL_RANGE = 7; // px máximos que se mueve la pupila dentro del lente

export default function Smiley() {
  const wrapRef = useRef(null);   // botón (para medir posición en pantalla)
  const headRef = useRef(null);   // grupo que se inclina hacia el cursor
  const pupilsRef = useRef(null); // grupo de pupilas que se desplaza

  const [blink, setBlink] = useState(false);
  const [wink, setWink] = useState(false);
  const [bounce, setBounce] = useState(0); // contador: cambia la key → reinicia la animación
  const [statusIdx, setStatusIdx] = useState(0);

  // ── Seguimiento del cursor ────────────────────────────────────────────────
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (reduce || !finePointer) return;

    const target = { x: 0, y: 0 }; // hacia dónde quiere mirar (normalizado -1..1)
    const cur = { x: 0, y: 0 };    // dónde mira ahora (suavizado)
    let raf = null;
    let visible = false;

    const onMove = (e) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      // Intensidad crece con la distancia hasta ~350px y luego se satura
      const k = Math.min(dist / 350, 1);
      target.x = (dx / dist) * k;
      target.y = (dy / dist) * k;
    };

    const tick = () => {
      // Interpolación lineal (lerp): avanza 12% hacia el objetivo por frame
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      if (pupilsRef.current) {
        pupilsRef.current.setAttribute(
          'transform',
          `translate(${(cur.x * PUPIL_RANGE).toFixed(2)} ${(cur.y * PUPIL_RANGE).toFixed(2)})`
        );
      }
      if (headRef.current) {
        headRef.current.style.transform =
          `translate(${(cur.x * 4).toFixed(2)}px, ${(cur.y * 3).toFixed(2)}px) rotate(${(cur.x * 6).toFixed(2)}deg)`;
      }
      raf = visible ? requestAnimationFrame(tick) : null;
    };

    // Solo anima cuando la carita está visible en pantalla
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    if (wrapRef.current) io.observe(wrapRef.current);

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // ── Parpadeo automático con intervalo aleatorio ───────────────────────────
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let t1, t2;
    const schedule = () => {
      t1 = setTimeout(() => {
        setBlink(true);
        t2 = setTimeout(() => { setBlink(false); schedule(); }, 140);
      }, 2500 + Math.random() * 3500);
    };
    schedule();
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // ── Status: rota solo cada 4 s ────────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => setStatusIdx((i) => (i + 1) % STATUSES.length), 4000);
    return () => clearInterval(iv);
  }, []);

  // ── Click: guiño + rebote + siguiente status ──────────────────────────────
  const handleClick = () => {
    setWink(true);
    setBounce((n) => n + 1);
    setStatusIdx((i) => (i + 1) % STATUSES.length);
    setTimeout(() => setWink(false), 420);
  };

  return (
    <section className="smiley-section" aria-label="A tiny self-portrait">
      <button
        ref={wrapRef}
        type="button"
        className="smiley-btn"
        onClick={handleClick}
        aria-label="Smiley face with glasses. Click to make it wink."
      >
        {/* key={bounce}: al cambiar, React remonta el div y la animación CSS se repite */}
        <div key={bounce} className={`smiley-float ${bounce ? 'is-bouncing' : ''}`}>
          <svg viewBox="0 0 200 200" className="smiley-svg" aria-hidden="true">
            <defs>
              <radialGradient id="smiley-fill" cx="50%" cy="38%" r="65%">
                <stop offset="0%" stopColor="rgba(168,145,196,0.16)" />
                <stop offset="100%" stopColor="rgba(168,145,196,0.02)" />
              </radialGradient>
            </defs>

            <g ref={headRef} className="smiley-head">
              {/* Cara */}
              <circle cx="100" cy="100" r="86" fill="url(#smiley-fill)" className="smiley-stroke" />

              {/* Cachetes (aparecen en hover) */}
              <ellipse cx="52" cy="128" rx="13" ry="7" className="smiley-cheek" />
              <ellipse cx="148" cy="128" rx="13" ry="7" className="smiley-cheek" />

              {/* Pupilas: se mueven con el cursor; parpadean escalando en Y */}
              <g ref={pupilsRef}>
                <circle
                  cx={EYE_L.x} cy={EYE_L.y} r="6.5"
                  className={`smiley-pupil ${blink || wink ? 'is-closed' : ''}`}
                />
                <circle
                  cx={EYE_R.x} cy={EYE_R.y} r="6.5"
                  className={`smiley-pupil ${blink ? 'is-closed' : ''}`}
                />
              </g>
              {/* Ojito cerrado "^" del guiño */}
              <path
                d={`M${EYE_L.x - 8} ${EYE_L.y + 2} Q${EYE_L.x} ${EYE_L.y - 7} ${EYE_L.x + 8} ${EYE_L.y + 2}`}
                className={`smiley-stroke smiley-wink ${wink ? 'is-on' : ''}`}
              />

              {/* Lentes redondos + puente */}
              <circle cx={EYE_L.x} cy={EYE_L.y} r="21" className="smiley-stroke smiley-lens" />
              <circle cx={EYE_R.x} cy={EYE_R.y} r="21" className="smiley-stroke smiley-lens" />
              <path d="M91 90 Q100 83 109 90" className="smiley-stroke" />

              {/* Boca: sonrisa simple ↔ sonrisa grande (crossfade en hover) */}
              <path d="M78 134 Q100 150 122 134" className="smiley-stroke smiley-mouth-idle" />
              <path d="M72 128 Q100 168 128 128 Z" className="smiley-mouth-happy" />
            </g>
          </svg>

          {/* Chispita que sale en cada click */}
          {bounce > 0 && <span className="smiley-spark" aria-hidden="true">✦</span>}
        </div>
      </button>

      {/* aria-live: los lectores de pantalla anuncian el cambio de status */}
      <p className="smiley-status" aria-live="polite">
        <span className="smiley-status-label">status:</span>{' '}
        <span key={statusIdx} className="smiley-status-text">{STATUSES[statusIdx]}</span>
      </p>
      {/* Dos textos; el CSS muestra uno u otro según si el dispositivo tiene hover */}
      <p className="smiley-hint">
        <span className="smiley-hint-pointer">(go on, click it)</span>
        <span className="smiley-hint-touch">(go on, tap it)</span>
      </p>
    </section>
  );
}

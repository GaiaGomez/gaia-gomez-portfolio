import { useEffect, useRef, useState } from 'react';

/*
  Smiley — carita en pixel art.

  Interacciones:
  - Desktop: los ojos siguen el cursor (en "pasitos" de píxel, look retro).
  - Hover: sonrisa grande lavanda + cachetes.
  - Click / tap: guiño, rebote, chispita ✦ y cambia el "status".
  - Parpadea sola cada 2.5–6 s.
  - prefers-reduced-motion: queda estática.

  Rendimiento: el seguimiento del cursor NO usa estado de React; escribe los
  transforms directo en el DOM vía refs dentro de requestAnimationFrame
  (cero re-renders por frame) y se pausa fuera de pantalla (IntersectionObserver).
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

// ── Pixel art ───────────────────────────────────────────────────────────────
// Grilla de 20×20 celdas; cada celda mide U unidades del viewBox (200×200).
// "X" = píxel encendido. Editar la forma = editar estos dibujos.
const U = 10;

const RING = [
  '....................',
  '......XXXXXXXX......',
  '....XXXXXXXXXXXX....',
  '...XXXX......XXXX...',
  '..XXX..........XXX..',
  '..XX............XX..',
  '.XXX............XXX.',
  '.XX..............XX.',
  '.XX..............XX.',
  '.XX..............XX.',
  '.XX..............XX.',
  '.XX..............XX.',
  '.XX..............XX.',
  '.XXX............XXX.',
  '..XX............XX..',
  '..XXX..........XXX..',
  '...XXXX......XXXX...',
  '....XXXXXXXXXXXX....',
  '......XXXXXXXX......',
  '....................',
];

// Sonrisa normal (escalonada, como en la referencia)
const MOUTH_IDLE = rowsAt(11, [
  '.....XX......XX.....',
  '......XXXXXXXX......',
]);

// Sonrisa grande (hover)
const MOUTH_HAPPY = rowsAt(10, [
  '.....XXXXXXXXXX.....',
  '......XXXXXXXX......',
  '........XXXX........',
]);

// Cachetes: debajo de los ojos, sin tocar el aro
const CHEEKS = rowsAt(9, ['....XX........XX....']);

// Ojito cerrado "^" del guiño (sobre el ojo izquierdo)
const WINK = rowsAt(7, [
  '......XX............',
  '.....X..X...........',
]);

// Ojos: bloques de 2×2 celdas. Van aparte porque se animan (mirar/parpadear).
const EYE_L = { x: 6 * U, y: 7 * U };
const EYE_R = { x: 12 * U, y: 7 * U };
const EYE_SIZE = 2 * U;
const PUPIL_RANGE = 8;  // máximo desplazamiento de los ojos (unidades del viewBox)
const PIXEL_STEP = 2.5; // los ojos se mueven en pasitos de 2.5 → se siente pixelado

/** Pone un dibujo parcial en la fila `top` de una grilla de 20 filas. */
function rowsAt(top, rows) {
  return Array.from({ length: 20 }, (_, i) => rows[i - top] ?? '');
}

/**
 * Convierte un dibujo ASCII en rects SVG. Junta las "X" seguidas de cada fila
 * en un solo rect (menos nodos en el DOM que un rect por píxel).
 */
function toRects(pattern) {
  const rects = [];
  pattern.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      if (row[x] !== 'X') { x++; continue; }
      const start = x;
      while (row[x] === 'X') x++;
      rects.push({ x: start * U, y: y * U, w: (x - start) * U });
    }
  });
  return rects;
}

/** Grupo de píxeles. Los rects se solapan 0.6 para que no se vean costuras. */
function Pixels({ pattern, className }) {
  return (
    <g className={className} filter="url(#px-soft)">
      {toRects(pattern).map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w + 0.6} height={U + 0.6} />
      ))}
    </g>
  );
}

const snap = (v) => Math.round(v / PIXEL_STEP) * PIXEL_STEP;

export default function Smiley() {
  const wrapRef = useRef(null);  // botón (para medir posición en pantalla)
  const headRef = useRef(null);  // grupo que se desplaza un poco hacia el cursor
  const eyesRef = useRef(null);  // grupo de ojos que mira al cursor

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
      const k = Math.min(dist / 350, 1); // intensidad crece con la distancia y se satura
      target.x = (dx / dist) * k;
      target.y = (dy / dist) * k;
    };

    const tick = () => {
      // Lerp: avanza 12% hacia el objetivo por frame (movimiento suave)
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      if (eyesRef.current) {
        eyesRef.current.setAttribute(
          'transform',
          `translate(${snap(cur.x * PUPIL_RANGE)} ${snap(cur.y * PUPIL_RANGE)})`
        );
      }
      if (headRef.current) {
        // Solo traslación (sin rotar): rotar pixel art lo hace ver "chueco"
        headRef.current.style.transform =
          `translate(${snap(cur.x * 4)}px, ${snap(cur.y * 3)}px)`;
      }
      raf = visible ? requestAnimationFrame(tick) : null;
    };

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
    <section className="smiley-section" aria-label="A tiny pixel smiley">
      <button
        ref={wrapRef}
        type="button"
        className="smiley-btn"
        onClick={handleClick}
        aria-label="Pixel smiley face. Click to make it wink."
      >
        {/* key={bounce}: al cambiar, React remonta el div y la animación CSS se repite */}
        <div key={bounce} className={`smiley-float ${bounce ? 'is-bouncing' : ''}`}>
          <svg viewBox="0 0 200 200" className="smiley-svg" aria-hidden="true">
            <defs>
              {/*
                "Gooey filter": desenfoca y vuelve a endurecer el borde (umbral de alfa).
                Resultado: las esquinas de los píxeles quedan levemente redondeadas
                y los bloques se funden en una sola forma, como en la referencia.
              */}
              <filter id="px-soft" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
                <feGaussianBlur stdDeviation="1.6" />
                <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" />
              </filter>
            </defs>

            <g ref={headRef} className="smiley-head">
              <Pixels pattern={RING} className="px-cream" />
              <Pixels pattern={CHEEKS} className="px-cheek" />

              {/* Ojos: miran al cursor y parpadean (scaleY) */}
              <g ref={eyesRef}>
                <rect
                  x={EYE_L.x} y={EYE_L.y} width={EYE_SIZE} height={EYE_SIZE} rx="3"
                  className={`px-eye ${blink || wink ? 'is-closed' : ''}`}
                />
                <rect
                  x={EYE_R.x} y={EYE_R.y} width={EYE_SIZE} height={EYE_SIZE} rx="3"
                  className={`px-eye ${blink ? 'is-closed' : ''}`}
                />
              </g>
              <Pixels pattern={WINK} className={`px-cream px-wink ${wink ? 'is-on' : ''}`} />

              {/* Boca: sonrisa normal ↔ sonrisa grande (crossfade en hover) */}
              <Pixels pattern={MOUTH_IDLE} className="px-cream px-mouth-idle" />
              <Pixels pattern={MOUTH_HAPPY} className="px-mouth-happy" />
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

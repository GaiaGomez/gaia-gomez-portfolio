import { useEffect, useRef, useState } from 'react';

export function useReveal() {
  const ref = useRef(null);
  // Con reduced motion arranca visible desde el primer render (inicializador
  // perezoso), en vez de hacer setVisible(true) dentro del effect.
  const [reduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [visible, setVisible] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return [ref, visible];
}

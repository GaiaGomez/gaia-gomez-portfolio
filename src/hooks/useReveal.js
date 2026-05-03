import { useEffect, useRef, useState } from 'react';

export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
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
  }, []);

  return [ref, visible];
}

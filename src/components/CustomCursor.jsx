import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const pos      = useRef({ x: 0, y: 0 });
  const ring     = useRef({ x: 0, y: 0 });
  const raf      = useRef(null);
  const [variant, setVariant] = useState('default'); // default | project | link

  // Only render on fine-pointer devices (mouse/trackpad, not touch)
  const [hasPointer, setHasPointer] = useState(false);
  useEffect(() => {
    setHasPointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!hasPointer) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterProject = () => setVariant('project');
    const onLeaveProject = () => setVariant('default');
    const onEnterLink    = () => setVariant('link');
    const onLeaveLink    = () => setVariant('default');

    window.addEventListener('mousemove', onMove);

    // delegate hover detection
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    function attachListeners() {
      document.querySelectorAll('.project-card').forEach(el => {
        el.removeEventListener('mouseenter', onEnterProject);
        el.removeEventListener('mouseleave', onLeaveProject);
        el.addEventListener('mouseenter', onEnterProject);
        el.addEventListener('mouseleave', onLeaveProject);
      });
      document.querySelectorAll('a, button, .btn, .filter-btn, .nav-link').forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    }

    attachListeners();

    // smooth ring follow
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform  = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [hasPointer]);

  if (!hasPointer) return null;

  const dotStyle = {
    position: 'fixed',
    top: -4,
    left: -4,
    width: 8,
    height: 8,
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 99999,
    transition: 'background 0.25s, width 0.2s, height 0.2s, top 0.2s, left 0.2s',
    background: '#B57BFF',
    willChange: 'transform',
  };

  const ringStyle = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 99998,
    borderRadius: '50%',
    transition: 'width 0.25s, height 0.25s, top 0.25s, left 0.25s, border-color 0.25s, opacity 0.25s',
    border: `1.5px solid ${
      variant === 'project' ? 'rgba(181,123,255,0.65)'
      : variant === 'link'   ? 'rgba(255,255,255,0.6)'
      : 'rgba(181,123,255,0.5)'
    }`,
    background: variant === 'project'
      ? 'rgba(181,123,255,0.08)'
      : variant === 'link'
      ? 'rgba(255,255,255,0.04)'
      : 'transparent',
    willChange: 'transform',
    ...(variant === 'project'
      ? { top: -24, left: -24, width: 48, height: 48 }
      : variant === 'link'
      ? { top: -20, left: -20, width: 40, height: 40 }
      : { top: -18, left: -18, width: 36, height: 36 }
    ),
  };

  return (
    <>
      <div ref={dotRef}  style={dotStyle}  />
      <div ref={ringRef} style={ringStyle} />
    </>
  );
}

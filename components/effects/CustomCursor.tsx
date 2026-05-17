'use client';

import { useEffect, useRef } from 'react';

/**
 * Cursor custom: flecha tipo puntero (con contorno amarillo) + anillo retardado.
 * Solo activo en pointer fino (escritorio).
 */
export default function CustomCursor() {
  const arrowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) return;

    document.body.classList.add('cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (arrowRef.current) {
        arrowRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onDown = () => ringRef.current?.classList.add('scale-75');
    const onUp = () => ringRef.current?.classList.remove('scale-75');

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor="hover"]');
      if (interactive) ringRef.current?.classList.add('cursor-hover');
      else ringRef.current?.classList.remove('cursor-hover');
    };

    let raf = 0;
    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mouseover', onOver);
      document.body.classList.remove('cursor-active');
    };
  }, []);

  return (
    <>
      {/* Flecha puntero — relleno negro con contorno amarillo */}
      <div
        ref={arrowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[2px] -mt-[2px]"
        aria-hidden
      >
        <svg
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2 L2 17 L6.5 13 L9.2 19.5 L12.3 18.2 L9.6 11.8 L16 11.5 Z"
            fill="#050505"
            stroke="#e6ff04"
            strokeWidth="1.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Anillo retardado */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 rounded-full border border-acid/70 transition-[transform,width,height,background-color] duration-200 ease-out [&.cursor-hover]:h-12 [&.cursor-hover]:w-12 [&.cursor-hover]:border-flare/70 [&.cursor-hover]:bg-acid/10"
        aria-hidden
      />
    </>
  );
}

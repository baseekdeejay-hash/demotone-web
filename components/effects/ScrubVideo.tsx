'use client';

import { useEffect, useRef, type RefObject } from 'react';

type Mode = 'through' | 'exit';

/**
 * Video atado al scroll: avanza al bajar y retrocede al subir.
 *
 * POR QUE UN CANVAS Y NO UN <video> A SECAS:
 * Mover video.currentTime en un <video> en pausa cambia el tiempo pero el
 * navegador NO siempre repinta el fotograma visible (Chrome sobre todo). El
 * video "avanzaba" por dentro pero se veia congelado -> parecia que no se movia.
 * Aqui el <video> queda oculto como fuente y cada fotograma se dibuja en un
 * <canvas>, que siempre repinta. Es la tecnica estandar de scroll-scrubbing.
 *
 * NO se desactiva con prefers-reduced-motion: el movimiento lo produce el
 * usuario al hacer scroll, no se reproduce solo.
 *
 * El video debe estar codificado con keyframe en cada frame o el seek dara
 * tirones (ver AGENTS.md 4.4).
 *
 * mode 'through': progreso 0 cuando la seccion entra por abajo, 1 al salir por
 *   arriba (secciones intermedias, p.ej. Bio).
 * mode 'exit': progreso 0 con la seccion pegada arriba, 1 al terminar de salir
 *   (la portada, que ya esta visible al cargar).
 * speed multiplica el progreso: 2 completa el video a mitad de recorrido.
 */
export default function ScrubVideo({
  src,
  poster,
  sectionRef,
  mode = 'through',
  speed = 1,
  wrapperClassName = '',
  canvasClassName = ''
}: {
  src: string;
  poster?: string;
  sectionRef: RefObject<HTMLElement | null>;
  mode?: Mode;
  speed?: number;
  wrapperClassName?: string;
  canvasClassName?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!section || !video || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const w = video.videoWidth;
      const h = video.videoHeight;
      if (!w || !h) return;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.drawImage(video, 0, 0, w, h);
    };

    let pending = false;
    const update = () => {
      const dur = video.duration;
      if (!dur || Number.isNaN(dur)) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const raw =
        mode === 'exit'
          ? -rect.top / Math.max(1, rect.height)
          : (vh - rect.top) / Math.max(1, rect.height + vh);
      const p = Math.min(1, Math.max(0, raw * speed));
      const target = p * dur;
      if (Math.abs(video.currentTime - target) > 0.01) {
        video.currentTime = target; // dispara 'seeked' -> draw()
      } else {
        draw();
      }
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        update();
      });
    };

    const onSeeked = () => draw();
    const onLoaded = () => {
      draw();
      update();
    };

    video.addEventListener('seeked', onSeeked);
    video.addEventListener('loadeddata', onLoaded);

    // Prime: decodifica un fotograma para que drawImage tenga datos.
    video.muted = true;
    video.play().then(() => video.pause()).catch(() => {});

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    if (video.readyState >= 2) {
      draw();
      update();
    }

    return () => {
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadeddata', onLoaded);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionRef, mode, speed]);

  return (
    <div className={`relative ${wrapperClassName}`}>
      {/* Fuente oculta (opacity-0, NO display:none: con display:none el navegador
          no decodifica ni busca fotogramas). El canvas es lo que se ve. */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0"
      />
      <canvas ref={canvasRef} aria-hidden className={canvasClassName} />
    </div>
  );
}

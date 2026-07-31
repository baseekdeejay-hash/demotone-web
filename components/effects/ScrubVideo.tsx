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
 * SUAVIZADO (para que no vaya a trompicones):
 * No saltamos al fotograma exacto del scroll (eso, a 24fps, se ve a saltos).
 * Guardamos un "objetivo" y un bucle rAF acerca el tiempo mostrado al objetivo
 * con interpolacion (lerp), encadenando cada seek al evento 'seeked' anterior
 * para no saturar el decodificador. El resultado es un movimiento fluido que
 * persigue al scroll y frena suave al parar.
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
 * ease: 0-1, cuanto se acerca al objetivo por frame. Mas bajo = mas suave y
 *   con mas inercia; mas alto = mas pegado al scroll. 0.18 es un buen punto.
 */
export default function ScrubVideo({
  src,
  poster,
  sectionRef,
  mode = 'through',
  speed = 1,
  startVh,
  rangeVh = 0.7,
  ease = 0.18,
  wrapperClassName = '',
  canvasClassName = ''
}: {
  src: string;
  poster?: string;
  sectionRef: RefObject<HTMLElement | null>;
  mode?: Mode;
  speed?: number;
  /**
   * Punto de arranque como fraccion del alto de pantalla, medido sobre el
   * rect.top de la seccion. Si se define, ignora `mode`/`speed` y el video se
   * queda en el primer fotograma hasta que rect.top baja de startVh*vh, y
   * completa a lo largo de rangeVh*vh de scroll. Ej: 0.5 arranca cuando el top
   * de la seccion llega a media pantalla (punto medio entre "nada mas asomar"
   * y "seccion pegada arriba").
   */
  startVh?: number;
  rangeVh?: number;
  ease?: number;
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

    let target = 0; // tiempo (s) al que apunta el scroll
    let display = 0; // tiempo (s) que se muestra, persiguiendo a target
    let active = false; // hay un bucle de suavizado corriendo
    let raf = 0;

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

    const measure = () => {
      const dur = video.duration;
      if (!dur || Number.isNaN(dur)) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      let raw: number;
      if (startVh != null) {
        // Arranca cuando rect.top baja de startVh*vh y completa en rangeVh*vh.
        raw = (startVh * vh - rect.top) / Math.max(1, rangeVh * vh);
      } else if (mode === 'exit') {
        raw = (-rect.top / Math.max(1, rect.height)) * speed;
      } else {
        raw = ((vh - rect.top) / Math.max(1, rect.height + vh)) * speed;
      }
      const p = Math.min(1, Math.max(0, raw));
      target = p * dur;
    };

    // Un solo paso de suavizado. Cada seek encadena el siguiente en 'seeked'.
    const step = () => {
      const diff = target - display;
      if (Math.abs(diff) < 0.004) {
        display = target;
        active = false;
        if (Math.abs(video.currentTime - display) > 0.008) {
          video.currentTime = display; // ultimo ajuste fino
        } else {
          draw();
        }
        return;
      }
      display += diff * ease;
      if (Math.abs(video.currentTime - display) > 0.008) {
        video.currentTime = display; // 'seeked' -> draw + siguiente step
      } else {
        // salto sub-frame: no vale la pena buscar, seguimos por rAF
        draw();
        raf = requestAnimationFrame(step);
      }
    };

    const onSeeked = () => {
      draw();
      if (active) raf = requestAnimationFrame(step);
    };

    const onScroll = () => {
      measure();
      if (!active) {
        active = true;
        step();
      }
    };

    const onLoaded = () => {
      measure();
      display = target;
      video.currentTime = display;
    };

    video.addEventListener('seeked', onSeeked);
    video.addEventListener('loadeddata', onLoaded);

    // Prime: decodifica un fotograma para que drawImage tenga datos.
    video.muted = true;
    video.play().then(() => video.pause()).catch(() => {});

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    if (video.readyState >= 2) {
      measure();
      display = target;
      draw();
      onScroll();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadeddata', onLoaded);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionRef, mode, speed, startVh, rangeVh, ease]);

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

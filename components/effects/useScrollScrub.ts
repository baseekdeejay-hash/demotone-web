'use client';

import { useEffect, type RefObject } from 'react';

type Mode = 'through' | 'exit';

/**
 * Ata el tiempo de un <video> al scroll: avanza al bajar y retrocede al subir.
 *
 * Implementacion nativa (scroll + requestAnimationFrame + getBoundingClientRect)
 * en lugar de useScroll/useMotionValueEvent de framer-motion, que no estaba
 * moviendo el video de forma fiable.
 *
 * OJO: esto NO se desactiva con prefers-reduced-motion a proposito. El
 * movimiento lo genera el usuario al hacer scroll, no se reproduce solo; si se
 * respetaba esa preferencia, cualquiera con "reducir movimiento" activado en su
 * sistema veia el video congelado y parecia que la web estaba rota.
 *
 * modo 'through': progreso 0 cuando la seccion entra por abajo, 1 al salir por
 *   arriba. Para secciones intermedias (Bio).
 * modo 'exit': progreso 0 con la seccion pegada arriba, 1 cuando termina de
 *   salir. Para la portada (Hero), que ya esta visible al cargar.
 *
 * `speed` multiplica el progreso: 2 completa el video a mitad de recorrido.
 *
 * El video debe estar codificado con keyframe en cada frame o el seek dara
 * tirones (ver AGENTS.md 4.4).
 */
export default function useScrollScrub(
  sectionRef: RefObject<HTMLElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  { mode = 'through', speed = 1 }: { mode?: Mode; speed?: number } = {}
) {
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let frame = 0;
    let primed = false;

    // Un play/pause silencioso deja el video listo para buscar fotogramas.
    const prime = async () => {
      if (primed) return;
      primed = true;
      try {
        video.muted = true;
        await video.play();
        video.pause();
      } catch {
        // Si el navegador bloquea play(), el seek sigue funcionando igual.
      }
      update();
    };

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
        video.currentTime = target;
      }
    };

    // El flag se baja DENTRO del callback, no dentro de update(), para que el
    // orden de asignacion nunca lo deje bloqueado en "pendiente".
    let pending = false;
    const onScroll = () => {
      if (pending) return;
      pending = true;
      frame = requestAnimationFrame(() => {
        pending = false;
        frame = 0;
        update();
      });
    };

    if (video.readyState >= 2) prime();
    else video.addEventListener('loadeddata', prime, { once: true });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      video.removeEventListener('loadeddata', prime);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionRef, videoRef, mode, speed]);
}

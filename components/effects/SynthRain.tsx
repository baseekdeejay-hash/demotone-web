'use client';

import { useEffect, useRef, useState } from 'react';

type Variant = 'side-margins' | 'pocket';

type Props = {
  variant?: Variant;
  count?: number;
  /** Solo para variant 'pocket': altura del area que ocupa la lluvia */
  height?: string;
};

type Synth = {
  el: HTMLImageElement;
  x: number;
  y: number;
  z: number;
  size: number;
  speedY: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotXSpeed: number;
  rotYSpeed: number;
  rotZSpeed: number;
};

const SYNTH_FILTER =
  'grayscale(1) contrast(1.6) sepia(0.85) hue-rotate(8deg) saturate(3.5) brightness(0.95)';

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeSynths(
  container: HTMLElement,
  count: number,
  opts: { sizeMin: number; sizeMax: number; opacity: number }
): Synth[] {
  const synths: Synth[] = [];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('img');
    el.src = '/images/synth.jpg';
    el.alt = '';
    el.draggable = false;
    el.setAttribute('aria-hidden', 'true');
    el.style.position = 'absolute';
    el.style.left = '0';
    el.style.top = '0';
    el.style.willChange = 'transform, opacity';
    el.style.pointerEvents = 'none';
    el.style.userSelect = 'none';
    el.style.filter = SYNTH_FILTER;
    el.style.opacity = String(opts.opacity);
    el.style.mixBlendMode = 'screen';
    el.style.objectFit = 'contain';
    container.appendChild(el);

    const size = random(opts.sizeMin, opts.sizeMax);
    el.style.width = `${size}px`;
    el.style.height = 'auto';

    synths.push({
      el,
      x: random(5, 75),
      y: random(-30, 130),
      z: random(-250, 80),
      size,
      speedY: random(0.04, 0.12),
      rotX: random(0, 360),
      rotY: random(0, 360),
      rotZ: random(-25, 25),
      rotXSpeed: random(-0.12, 0.12),
      rotYSpeed: random(-0.18, 0.18),
      rotZSpeed: random(-0.05, 0.05)
    });
  }
  return synths;
}

function animate(synths: Synth[], parentEl: HTMLElement): () => void {
  let raf = 0;
  const tick = () => {
    const h = parentEl.clientHeight || window.innerHeight;
    const w = parentEl.clientWidth || 1;
    for (const s of synths) {
      s.y += s.speedY;
      if (s.y > 130) {
        s.y = -30;
        s.x = random(5, 75);
        s.z = random(-250, 80);
      }
      s.rotX += s.rotXSpeed;
      s.rotY += s.rotYSpeed;
      s.rotZ += s.rotZSpeed;

      const yPx = (s.y / 100) * h - s.size / 2;
      const xPx = (s.x / 100) * w - s.size / 2;

      // Atenuar opacidad segun profundidad Z (mas lejos = mas tenue)
      const depthOpacityFactor = 0.5 + (s.z + 250) / 660; // ~0.5 a 1.0
      s.el.style.opacity = String(0.32 * depthOpacityFactor);

      s.el.style.transform =
        `translate3d(${xPx}px, ${yPx}px, ${s.z}px)` +
        ` rotateX(${s.rotX}deg) rotateY(${s.rotY}deg) rotateZ(${s.rotZ}deg)`;
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

export default function SynthRain({
  variant = 'side-margins',
  count = 4,
  height = '100%'
}: Props) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const pocketRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Detectar capacidad (no en mobile/coarse pointer, no reduced-motion)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let wide: MediaQueryList | null = null;
    if (variant === 'side-margins') {
      wide = window.matchMedia('(min-width: 1500px) and (hover: hover) and (pointer: fine)');
    } else {
      // Pocket: cualquier desktop/tablet (no movil)
      wide = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)');
    }
    const update = () => setEnabled(wide!.matches && !reduce.matches);
    update();
    wide.addEventListener('change', update);
    reduce.addEventListener('change', update);
    return () => {
      wide!.removeEventListener('change', update);
      reduce.removeEventListener('change', update);
    };
  }, [variant]);

  useEffect(() => {
    if (!enabled) return;

    if (variant === 'side-margins') {
      const left = leftRef.current;
      const right = rightRef.current;
      if (!left || !right) return;
      const optsL = { sizeMin: 80, sizeMax: 170, opacity: 0.32 };
      const optsR = { sizeMin: 80, sizeMax: 170, opacity: 0.32 };
      const synthsL = makeSynths(left, count, optsL);
      const synthsR = makeSynths(right, count, optsR);
      const stopL = animate(synthsL, left);
      const stopR = animate(synthsR, right);
      return () => {
        stopL();
        stopR();
        synthsL.forEach((s) => s.el.remove());
        synthsR.forEach((s) => s.el.remove());
      };
    }

    if (variant === 'pocket') {
      const pocket = pocketRef.current;
      if (!pocket) return;
      const opts = { sizeMin: 70, sizeMax: 130, opacity: 0.3 };
      const synths = makeSynths(pocket, count, opts);
      const stop = animate(synths, pocket);
      return () => {
        stop();
        synths.forEach((s) => s.el.remove());
      };
    }
  }, [enabled, variant, count]);

  if (!enabled) return null;

  if (variant === 'side-margins') {
    return (
      <>
        <div
          ref={leftRef}
          className="pointer-events-none fixed top-0 left-0 h-full overflow-hidden"
          style={{
            zIndex: 0,
            width: 'calc(max((100vw - 1280px) / 2, 0px))',
            perspective: '1000px',
            perspectiveOrigin: 'center center'
          }}
          aria-hidden
        />
        <div
          ref={rightRef}
          className="pointer-events-none fixed top-0 right-0 h-full overflow-hidden"
          style={{
            zIndex: 0,
            width: 'calc(max((100vw - 1280px) / 2, 0px))',
            perspective: '1000px',
            perspectiveOrigin: 'center center'
          }}
          aria-hidden
        />
      </>
    );
  }

  return (
    <div
      ref={pocketRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        zIndex: 0,
        height,
        perspective: '800px',
        perspectiveOrigin: 'center center'
      }}
      aria-hidden
    />
  );
}

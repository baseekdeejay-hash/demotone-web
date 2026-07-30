'use client';

import { useEffect, useRef, useState } from 'react';

type Variant = 'side-margins' | 'pocket';

type Props = {
  variant?: Variant;
  count?: number;
  height?: string;
};

type Synth = {
  el: HTMLDivElement;
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

const ACID = '#e6ff04';
const STROKE_THIN = '1.5px solid ' + ACID;
const FACE_BG = 'rgba(5, 5, 5, 0.4)';
const GLOW =
  '0 0 16px rgba(230, 255, 4, 0.55), inset 0 0 12px rgba(230, 255, 4, 0.18)';

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createSynthBox(size: number): HTMLDivElement {
  const W = size;
  const D = size * 0.57;
  const H = size * 0.19;

  const root = document.createElement('div');
  root.style.position = 'absolute';
  root.style.left = '0';
  root.style.top = '0';
  root.style.width = `${W}px`;
  root.style.height = `${D}px`;
  root.style.transformStyle = 'preserve-3d';
  root.style.willChange = 'transform, opacity';
  root.style.pointerEvents = 'none';

  const makeFace = (
    w: number,
    h: number,
    transform: string,
    innerHTML?: string
  ): HTMLDivElement => {
    const f = document.createElement('div');
    f.style.position = 'absolute';
    f.style.left = `${(W - w) / 2}px`;
    f.style.top = `${(D - h) / 2}px`;
    f.style.width = `${w}px`;
    f.style.height = `${h}px`;
    f.style.transform = transform;
    f.style.transformStyle = 'preserve-3d';
    f.style.boxSizing = 'border-box';
    f.style.border = STROKE_THIN;
    f.style.background = FACE_BG;
    f.style.boxShadow = GLOW;
    f.style.backfaceVisibility = 'visible';
    if (innerHTML) f.innerHTML = innerHTML;
    return f;
  };

  const knob = `<div style="width:${size * 0.075}px;height:${size * 0.075}px;border:${STROKE_THIN};border-radius:50%;box-shadow:inset 0 0 4px rgba(230,255,4,0.4),0 0 6px rgba(230,255,4,0.3);position:relative;"><div style="position:absolute;left:50%;top:8%;width:2px;height:42%;background:${ACID};transform:translateX(-50%);box-shadow:0 0 4px ${ACID};"></div></div>`;

  const knobs = Array.from({ length: 6 }).map(() => knob).join('');

  const buttons = Array.from({ length: 13 })
    .map(
      (_, i) =>
        `<div style="flex:1;height:100%;border:${STROKE_THIN};background:${i % 3 === 0 ? 'rgba(230,255,4,0.12)' : 'transparent'};"></div>`
    )
    .join('');

  const topInner = `
    <div style="position:absolute;inset:${size * 0.04}px;display:flex;flex-direction:column;gap:${size * 0.03}px;pointer-events:none;">
      <div style="display:flex;gap:${size * 0.03}px;align-items:center;">
        ${knobs}
        <div style="flex:1;"></div>
        <div style="width:${size * 0.18}px;height:${size * 0.055}px;border:${STROKE_THIN};box-shadow:inset 0 0 6px rgba(230,255,4,0.35);"></div>
      </div>
      <div style="display:flex;gap:${size * 0.012}px;align-items:center;height:${size * 0.08}px;">
        ${buttons}
      </div>
      <div style="height:1px;background:${ACID};box-shadow:0 0 4px ${ACID};opacity:0.5;"></div>
    </div>
  `;

  const top = makeFace(W, D, `translateZ(${H / 2}px)`, topInner);
  root.appendChild(top);

  const bottom = makeFace(W, D, `rotateX(180deg) translateZ(${H / 2}px)`);
  root.appendChild(bottom);

  const front = makeFace(
    W,
    H,
    `rotateX(-90deg) translateZ(${D / 2}px) translateY(${(D - H) / 2}px)`
  );
  root.appendChild(front);

  const back = makeFace(
    W,
    H,
    `rotateX(90deg) translateZ(${D / 2}px) translateY(-${(D - H) / 2}px)`
  );
  root.appendChild(back);

  const left = makeFace(
    H,
    D,
    `rotateY(-90deg) translateZ(${W / 2}px) translateX(-${(W - H) / 2}px)`
  );
  root.appendChild(left);

  const right = makeFace(
    H,
    D,
    `rotateY(90deg) translateZ(${W / 2}px) translateX(${(W - H) / 2}px)`
  );
  root.appendChild(right);

  return root;
}

function makeSynths(
  container: HTMLElement,
  count: number,
  opts: { sizeMin: number; sizeMax: number }
): Synth[] {
  const synths: Synth[] = [];
  for (let i = 0; i < count; i++) {
    const size = random(opts.sizeMin, opts.sizeMax);
    const el = createSynthBox(size);
    container.appendChild(el);

    synths.push({
      el,
      x: random(5, 75),
      y: random(-30, 130),
      z: random(-300, 80),
      size,
      speedY: random(0.04, 0.11),
      rotX: random(0, 360),
      rotY: random(0, 360),
      rotZ: random(-35, 35),
      rotXSpeed: random(-0.12, 0.12),
      rotYSpeed: random(-0.18, 0.18),
      rotZSpeed: random(-0.04, 0.04)
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
        s.z = random(-300, 80);
      }
      s.rotX += s.rotXSpeed;
      s.rotY += s.rotYSpeed;
      s.rotZ += s.rotZSpeed;

      const yPx = (s.y / 100) * h - s.size / 2;
      const xPx = (s.x / 100) * w - s.size / 2;

      const depthFactor = 0.55 + (s.z + 300) / 760;
      s.el.style.opacity = String(Math.min(1, 0.7 * depthFactor));

      s.el.style.transform =
        `translate3d(${xPx}px, ${yPx}px, ${s.z}px) rotateX(${s.rotX}deg) rotateY(${s.rotY}deg) rotateZ(${s.rotZ}deg)`;
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

export default function SynthRain({
  variant = 'side-margins',
  count = 6,
  height = '100%'
}: Props) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const pocketRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let wide: MediaQueryList | null = null;
    if (variant === 'side-margins') {
      wide = window.matchMedia(
        '(min-width: 1500px) and (hover: hover) and (pointer: fine)'
      );
    } else {
      wide = window.matchMedia(
        '(min-width: 900px) and (hover: hover) and (pointer: fine)'
      );
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
      const opts = { sizeMin: 180, sizeMax: 320 };
      const synthsL = makeSynths(left, count, opts);
      const synthsR = makeSynths(right, count, opts);
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
      const opts = { sizeMin: 160, sizeMax: 260 };
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
            perspective: '1200px',
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
            perspective: '1200px',
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
        perspective: '1000px',
        perspectiveOrigin: 'center center'
      }}
      aria-hidden
    />
  );
}

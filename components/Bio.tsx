'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import Reveal from './effects/Reveal';
import SynthRain from './effects/SynthRain';
import { bio } from '@/data/content';

export default function Bio() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  return (
    <section
      id="bio"
      ref={ref}
      className="relative overflow-hidden border-t border-ink-400/40 bg-ink-900 py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-industrial-grid opacity-30" />
      <div className="absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-acid/10 blur-3xl" />
      <div className="absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-flare/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-12 md:gap-16">
        <div className="relative md:col-span-5">
          {/* Pocket rain de TB-303: rellena el espacio bajo la foto en pantallas medias */}
          <SynthRain variant="pocket" count={3} />
          <motion.div style={{ y: yImg }} className="sticky top-28">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink-400/60 bg-ink-700">
              <span className="absolute left-2 top-2 z-10 h-3 w-3 border-l border-t border-acid" />
              <span className="absolute right-2 top-2 z-10 h-3 w-3 border-r border-t border-acid" />
              <span className="absolute left-2 bottom-2 z-10 h-3 w-3 border-l border-b border-acid" />
              <span className="absolute right-2 bottom-2 z-10 h-3 w-3 border-r border-b border-acid" />

              <Image
                src={bio.image}
                alt={bio.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover grayscale contrast-125 transition-all duration-700 hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-25 mix-blend-overlay" />
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
              <span>FILE//DEMOTONE.PORTRAIT.02</span>
              <span className="text-acid">&bull;</span>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-7">
          <Reveal>
            <span className="eyebrow">// 01 &mdash; Bio</span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-bone-100 md:text-7xl">
              Sobre <span className="text-acid">Demotone</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-200">
              {bio.short}
            </p>
          </Reveal>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-bone-200/90">
            {bio.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.06}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.45}>
            <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-ink-400/60 bg-ink-400/60 sm:grid-cols-3">
              {bio.facts.map((f) => (
                <div key={f.label} className="bg-ink-900 p-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
                    {f.label}
                  </dt>
                  <dd className="mt-2 font-display text-base font-bold uppercase leading-tight text-bone-100">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {bio.extra ? (
            <Reveal delay={0.55}>
              <p className="mt-8 max-w-2xl text-base italic leading-relaxed text-bone-300 md:text-lg">
                {bio.extra}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={0.65}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a href="#music" className="btn-neon">
                Ver discograf&iacute;a
              </a>
              <a
                href="#contact"
                className="font-mono text-xs uppercase tracking-[0.28em] text-bone-200 transition-colors hover:text-acid"
              >
                Booking &rsaquo;
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import Reveal from './effects/Reveal';
import ScrubVideo from './effects/ScrubVideo';
import { bio } from '@/data/content';

export default function Bio() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id="bio"
      ref={ref}
      className="relative overflow-hidden border-t border-ink-400/40 bg-ink-900 py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-industrial-grid opacity-30" />
      <div className="absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-acid/10 blur-3xl" />
      <div className="absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-flare/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          {/* Grande y ENTERO: ocupa toda su columna (~700px en desktop, mucho
              mayor que antes) sin recortarse ni salirse por el borde. En movil
              ocupa todo el ancho. El canvas usa la relacion natural del video. */}
          <div className="w-full">
            <ScrubVideo
              src={bio.video}
              poster={bio.videoPoster}
              sectionRef={ref}
              mode="through"
              wrapperClassName="w-full"
              canvasClassName="block h-auto w-full"
            />
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
              <span>FILE//DEMOTONE.TB303.EXPLODE</span>
              <span className="text-acid">&bull;</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-5">
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

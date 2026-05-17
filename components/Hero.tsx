'use client';

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion
} from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowDown, Play } from 'lucide-react';
import ParticleField from './effects/ParticleField';
import GlitchText from './effects/GlitchText';
import Marquee from './effects/Marquee';
import { site } from '@/data/content';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 768px), (pointer: coarse)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || isMobile) return;
    const prime = async () => {
      try {
        v.muted = true;
        await v.play();
        v.pause();
        v.currentTime = 0;
      } catch {
        // ok
      }
    };
    if (v.readyState >= 2) prime();
    else v.addEventListener('loadeddata', prime, { once: true });
  }, [isMobile]);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const v = videoRef.current;
    if (!v || isMobile || reduce) return;
    const dur = v.duration;
    if (!dur || isNaN(dur)) return;
    const p = Math.max(0, Math.min(1, progress));
    const targetTime = p * dur;
    if (Math.abs(v.currentTime - targetTime) > 0.02) {
      v.currentTime = targetTime;
    }
  });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink-900"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src="/videos/hero.mp4"
        poster="/images/hero-poster.jpg"
        muted
        playsInline
        preload="auto"
        autoPlay={false}
        loop={false}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ink-900/85 via-ink-900/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/20 via-transparent to-ink-900/90" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-industrial-grid opacity-15" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-scanlines opacity-20 mix-blend-overlay" />

      <ParticleField className="-z-0 opacity-60" />

      <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-0 hidden w-px -translate-x-1/2 overflow-hidden md:block">
        <div className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-acid/30 to-transparent animate-scan" />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-20 md:pt-32"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow"
          >
            Live · {site.tagline}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(3.4rem,11vw,9rem)] font-bold uppercase leading-[0.85] tracking-tight text-bone-100 drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
          >
            <GlitchText text="DEMO" as="span" className="block" />
            <span className="block text-acid">TONE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 max-w-xl text-base text-bone-200 md:text-lg drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]"
          >
            {site.description}{' '}
            <span className="text-bone-300">
              También conocido como{' '}
              <span className="text-acid">{site.aliasShort}</span> (Hardgroove · Acid).
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#sets" className="btn-neon">
              <Play size={14} /> Escuchar sets
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-bone-200 transition-colors hover:text-acid"
            >
              <span className="h-px w-8 bg-bone-300" />
              Booking
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-ink-400/60 pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300"
          >
            <div>
              <dt>BPM</dt>
              <dd className="mt-1 text-2xl text-bone-100">138&mdash;148</dd>
            </div>
            <div>
              <dt>Estilo</dt>
              <dd className="mt-1 text-2xl text-bone-100">Raw</dd>
            </div>
            <div>
              <dt>Origen</dt>
              <dd className="mt-1 text-2xl text-bone-100">ES</dd>
            </div>
          </motion.dl>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute right-6 top-24 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] md:right-10 md:top-28">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" />
        REC // ID:001
      </div>

      <a
        href="#bio"
        className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone-300 hover:text-acid"
      >
        Scroll
        <ArrowDown size={14} className="animate-bounce" />
      </a>

      <div className="absolute inset-x-0 bottom-0 z-0">
        <Marquee items={['TECHNO', 'HARDGROOVE', 'ACID', 'RAW', 'DEMOTONE']} />
      </div>
    </section>
  );
}

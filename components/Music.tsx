'use client';

import { ExternalLink } from 'lucide-react';
import Reveal from './effects/Reveal';
import SynthRain from './effects/SynthRain';
import { tracks, type Track } from '@/data/content';

function YouTubeEmbed({ id }: { id: string }) {
  return (
    <iframe
      className="aspect-video w-full"
      src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
      title="YouTube"
      frameBorder={0}
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}

function SoundCloudEmbed({ url }: { url: string }) {
  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    url
  )}&color=%23e6ff04&inverse=true&auto_play=false&show_user=true&hide_related=true&visual=true&show_comments=false&show_reposts=false&show_teaser=false`;
  return (
    <iframe
      className="aspect-video w-full"
      src={src}
      title="SoundCloud"
      allow="autoplay"
      loading="lazy"
      frameBorder={0}
    />
  );
}

function TrackCard({ track }: { track: Track }) {
  const linkOut =
    track.type === 'youtube'
      ? `https://www.youtube.com/watch?v=${track.id}`
      : track.id;

  return (
    <article className="group relative flex flex-col border border-ink-400/60 bg-ink-800 transition-colors hover:border-acid/60">
      <span className="absolute left-2 top-2 z-10 h-3 w-3 border-l border-t border-acid/70 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="absolute right-2 top-2 z-10 h-3 w-3 border-r border-t border-acid/70 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="absolute left-2 bottom-2 z-10 h-3 w-3 border-l border-b border-acid/70 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="absolute right-2 bottom-2 z-10 h-3 w-3 border-r border-b border-acid/70 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative bg-ink-900">
        {track.type === 'youtube' ? (
          <YouTubeEmbed id={track.id} />
        ) : (
          <SoundCloudEmbed url={track.id} />
        )}
      </div>

      <div className="flex flex-col gap-1 border-t border-ink-400/60 p-5">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
          <span>{track.year ?? ''}</span>
          {track.label ? <span className="text-acid">{track.label}</span> : null}
        </div>
        <h3 className="mt-1 font-display text-xl font-bold uppercase leading-tight tracking-tight text-bone-100">
          {track.title}
        </h3>
        <a
          href={linkOut}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.22em] text-bone-200 transition-colors hover:text-acid"
        >
          Abrir <ExternalLink size={12} />
        </a>
      </div>
    </article>
  );
}

export default function Music() {
  return (
    <section
      id="music"
      className="relative overflow-hidden border-t border-ink-400/40 bg-ink-800 py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-scanlines opacity-30" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-acid/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="eyebrow">// 02 &mdash; Discograf&iacute;a</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-bone-100 md:text-7xl">
            M&uacute;sica <span className="text-acid">/</span> tracks
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base text-bone-200 md:text-lg">
            Producciones originales y remixes.
          </p>
        </Reveal>

        <div className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {tracks.map((t, i) => (
            <Reveal key={`${t.id}-${i}`} delay={0.05 * i}>
              <TrackCard track={t} />
            </Reveal>
          ))}
          {/* Lluvia de TB-303 en la columna vacia cuando hay numero impar de tracks */}
          {tracks.length % 2 === 1 ? (
            <div className="relative hidden min-h-[280px] md:block">
              <SynthRain variant="pocket" count={3} />
            </div>
          ) : null}
        </div>

        {tracks.length === 0 ? (
          <p className="mt-10 font-mono text-sm text-bone-300">
            &mdash; Pr&oacute;ximamente &mdash;
          </p>
        ) : null}
      </div>
    </section>
  );
}

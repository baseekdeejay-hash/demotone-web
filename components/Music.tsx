'use client';

import { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import Reveal from './effects/Reveal';
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
  )}&color=%23e6ff04&inverse=true&auto_play=false&show_user=true&hide_related=true&visual=false`;
  return (
    <iframe
      className="h-[166px] w-full"
      src={src}
      title="SoundCloud"
      allow="autoplay"
      loading="lazy"
      frameBorder={0}
    />
  );
}

function TrackCard({ track }: { track: Track }) {
  const [open, setOpen] = useState(false);
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
        {open ? (
          track.type === 'youtube' ? (
            <YouTubeEmbed id={track.id} />
          ) : (
            <SoundCloudEmbed url={track.id} />
          )
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="relative flex aspect-video w-full items-center justify-center bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900 text-bone-100 transition-colors hover:bg-ink-700"
            aria-label={`Reproducir ${track.title}`}
          >
            <div className="absolute inset-0 bg-scanlines opacity-30" />
            <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
              {track.type === 'youtube' ? 'YOUTUBE' : 'SOUNDCLOUD'}
            </span>
            <span className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.22em] text-acid">
              ► PLAY
            </span>
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-acid bg-ink-900/70 text-acid transition-all group-hover:scale-110 group-hover:bg-acid group-hover:text-ink-900">
              <Play size={22} fill="currentColor" />
            </span>
          </button>
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
          <span className="eyebrow">// 02 — Discograf&iacute;a</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-bone-100 md:text-7xl">
            M&uacute;sica <span className="text-acid">/</span> tracks
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base text-bone-200 md:text-lg">
            Producciones originales y remixes. Pulsa para reproducir directamente desde
            YouTube o SoundCloud.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {tracks.map((t, i) => (
            <Reveal key={`${t.id}-${i}`} delay={0.05 * i}>
              <TrackCard track={t} />
            </Reveal>
          ))}
        </div>

        {tracks.length === 0 ? (
          <p className="mt-10 font-mono text-sm text-bone-300">
            — Pr&oacute;ximamente —
          </p>
        ) : null}
      </div>
    </section>
  );
}

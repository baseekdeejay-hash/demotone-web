import TrackCard from '@/components/sesiones/TrackCard';
import { SESSIONS } from '@/lib/sesiones/data';

export default function SesionesIndexPage() {
  return (
    <div>
      <header className="mb-8 flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#ff5500]">
          // Biblioteca
        </span>
        <h1 className="font-display text-3xl font-bold text-white md:text-5xl">
          Sesiones DJ
        </h1>
        <p className="mt-1 max-w-xl text-sm text-zinc-400 md:text-base">
          Sets en directo y mixes seleccionados. Reproductor con waveform
          interactiva.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {SESSIONS.map((s) => (
          <TrackCard key={s.slug} session={s} />
        ))}
      </section>

      {SESSIONS.length === 0 ? (
        <p className="font-mono text-sm text-zinc-500">— Sin sesiones todavía —</p>
      ) : null}
    </div>
  );
}

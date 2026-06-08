import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import BigPlayer from '@/components/sesiones/BigPlayer';
import TrackCard from '@/components/sesiones/TrackCard';
import { SESSIONS, findSession } from '@/lib/sesiones/data';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return SESSIONS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props) {
  const s = findSession(params.slug);
  if (!s) return { title: 'Sesión no encontrada' };
  return {
    title: `${s.title} — ${s.artist}`,
    description: s.description ?? `Sesión DJ "${s.title}" por ${s.artist}.`
  };
}

export default function SessionPage({ params }: Props) {
  const session = findSession(params.slug);
  if (!session) notFound();

  const others = SESSIONS.filter((s) => s.slug !== session.slug);

  return (
    <div>
      <Link
        href="/sesiones"
        className="mb-5 inline-flex items-center gap-1 text-sm text-zinc-400 transition hover:text-white"
      >
        <ChevronLeft size={14} /> Volver a la biblioteca
      </Link>

      <BigPlayer session={session} />

      {others.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-300">
            Más sesiones
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {others.map((s) => (
              <TrackCard key={s.slug} session={s} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

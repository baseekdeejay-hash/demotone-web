import type { Metadata } from 'next';
import SesionesNav from '@/components/sesiones/SesionesNav';
import MiniPlayer from '@/components/sesiones/MiniPlayer';

export const metadata: Metadata = {
  title: 'Sesiones',
  description:
    'Sesiones DJ de Demotone. House, techno, hardgroove y acid en formato sets completos.'
};

export default function SesionesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh bg-[#0a0a0b] text-zinc-100">
      <SesionesNav />
      <main className="mx-auto max-w-7xl px-4 pb-32 pt-6 md:px-6 md:pb-36 md:pt-8">
        {children}
      </main>
      <MiniPlayer />
    </div>
  );
}

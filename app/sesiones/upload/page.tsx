import { Info } from 'lucide-react';

export default function UploadPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-6">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#ff5500]">
          // Subir
        </span>
        <h1 className="mt-1 font-display text-3xl font-bold text-white md:text-4xl">
          Subir una sesión
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Sube tu set en MP3 y aparecerá en la biblioteca.
        </p>
      </header>

      <div className="mb-6 flex gap-3 rounded-md border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-100">
        <Info className="mt-0.5 shrink-0" size={16} />
        <div>
          <strong className="font-semibold">UI preliminar.</strong> El upload
          funcional (almacenamiento + base de datos) llegará en la siguiente
          fase. Por ahora puedes preparar los campos visualmente y entender el
          flujo. Para añadir un track ya, edita{' '}
          <code className="rounded bg-black/30 px-1.5 py-0.5">
            lib/sesiones/data.ts
          </code>{' '}
          y haz push.
        </div>
      </div>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          alert(
            'Backend de upload todavía no implementado. Esto llega en la próxima iteración.'
          );
        }}
      >
        <Field label="Título" required>
          <input
            type="text"
            placeholder="Ej. House on Wax vol.3"
            className="w-full rounded bg-[#1a1a1a] px-3 py-2 text-sm text-white ring-1 ring-white/10 transition focus:outline-none focus:ring-[#ff5500]"
          />
        </Field>

        <Field label="Artista" required>
          <input
            type="text"
            placeholder="Demotone / Baseek"
            className="w-full rounded bg-[#1a1a1a] px-3 py-2 text-sm text-white ring-1 ring-white/10 transition focus:outline-none focus:ring-[#ff5500]"
          />
        </Field>

        <Field label="Descripción">
          <textarea
            rows={4}
            placeholder="Una sesión de techno en vinilo grabada en directo..."
            className="w-full rounded bg-[#1a1a1a] px-3 py-2 text-sm text-white ring-1 ring-white/10 transition focus:outline-none focus:ring-[#ff5500]"
          />
        </Field>

        <Field label="Géneros (separados por coma)">
          <input
            type="text"
            placeholder="house, tech house, vinyl"
            className="w-full rounded bg-[#1a1a1a] px-3 py-2 text-sm text-white ring-1 ring-white/10 transition focus:outline-none focus:ring-[#ff5500]"
          />
        </Field>

        <Field label="Imagen de portada">
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm text-zinc-400 file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-white/5 file:px-3 file:py-1.5 file:text-sm file:text-white hover:file:bg-white/10"
          />
        </Field>

        <Field label="Archivo MP3" required>
          <input
            type="file"
            accept="audio/mpeg"
            className="w-full text-sm text-zinc-400 file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-white/5 file:px-3 file:py-1.5 file:text-sm file:text-white hover:file:bg-white/10"
          />
        </Field>

        <button
          type="submit"
          className="rounded bg-[#ff5500] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#ff7733]"
        >
          Subir sesión
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-wider text-zinc-400">
        {label} {required ? <span className="text-[#ff5500]">*</span> : null}
      </span>
      {children}
    </label>
  );
}

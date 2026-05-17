type Props = {
  items: string[];
  className?: string;
};

export default function Marquee({ items, className = '' }: Props) {
  // Duplicamos varias veces para que la cinta siempre llene la pantalla
  // y nunca se vean huecos vacios → da sensacion de linea centrada continua.
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className={`overflow-hidden border-y border-ink-400/60 bg-ink-800 ${className}`}>
      <div className="marquee-track items-center py-4">
        {loop.map((t, i) => (
          <span
            key={i}
            className="mx-8 inline-flex items-center gap-8 font-display text-3xl uppercase tracking-tight text-bone-100 md:text-5xl"
          >
            {t}
            <span className="text-acid">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

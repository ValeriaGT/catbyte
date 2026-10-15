type Props = { frase: string; repeticiones?: number; /** Cinta quieta, sin desplazamiento. */ estatica?: boolean };

/** Figma: Secciones › Marquesina. Se anima en bucle (salvo `estatica` o con prefers-reduced-motion). */
export function Marquesina({ frase, repeticiones = 10, estatica = false }: Props) {
  const items = Array.from({ length: repeticiones }, (_, i) => (
    <span key={i} className="cuerpo-3 shrink-0 text-texto-principal">
      • {frase}
    </span>
  ));
  return (
    <div className="overflow-hidden border-y-2 border-borde-fuerte bg-fondo-superficie py-8" aria-label={frase} role={estatica ? "img" : "marquee"}>
      <div className={estatica ? "flex w-max gap-32" : "flex w-max gap-32 motion-safe:animate-marquesina"} aria-hidden="true">
        {items}
        {!estatica && items}
      </div>
    </div>
  );
}

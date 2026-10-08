/** Figma: Secciones › Marquesina. Se anima en bucle salvo con prefers-reduced-motion. */
export function Marquesina({ frase, repeticiones = 10 }: { frase: string; repeticiones?: number }) {
  const items = Array.from({ length: repeticiones }, (_, i) => (
    <span key={i} className="cuerpo-3 shrink-0 text-texto-principal">
      • {frase}
    </span>
  ));
  return (
    <div className="overflow-hidden border-y-2 border-borde-fuerte bg-fondo-superficie py-8" aria-label={frase} role="marquee">
      <div className="flex w-max gap-32 motion-safe:animate-marquesina" aria-hidden="true">
        {items}
        {items}
      </div>
    </div>
  );
}

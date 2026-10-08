import { BannerSeccion, CardComunidad } from "@catbyte/ui";
import { TESTIMONIOS } from "@/content/home";

// Franja naranja con bordes inclinados (Figma: Rectangle 107).
const FRANJA = "polygon(0 7%, 100% 0, 100% 93%, 0 100%)";

/** Testimonios de la comunidad sobre la franja naranja; en pantallas angostas se desplazan horizontalmente. */
export function Comunidad() {
  return (
    <section aria-label="Nuestra comunidad" className="relative py-40">
      <div aria-hidden="true" className="absolute inset-x-0 top-80 bottom-0 bg-fondo-destacado" style={{ clipPath: FRANJA }} />
      <div className="relative">
        <BannerSeccion titulo="NUESTRA COMUNIDAD" color="oscuro" />
      </div>
      <ul className="relative flex snap-x snap-mandatory gap-64 overflow-x-auto px-40 pt-40 pb-80 [scrollbar-width:none]">
        {TESTIMONIOS.map((t) => (
          <li key={t.nombre} className="w-[300px] shrink-0 snap-center sm:w-350">
            <CardComunidad {...t} className="-rotate-3" />
          </li>
        ))}
      </ul>
    </section>
  );
}

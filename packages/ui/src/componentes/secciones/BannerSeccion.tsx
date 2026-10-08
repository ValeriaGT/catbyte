import { cx } from "../../lib/cx";

type Props = { titulo: string; subtitulo?: string; color?: "naranja" | "oscuro" };

/** Figma: Secciones › Banner de sección. Cinta inclinada 2° a sangre. */
export function BannerSeccion({ titulo, subtitulo, color = "naranja" }: Props) {
  return (
    <div className="overflow-hidden py-24">
      <div className="-mx-40 -rotate-2">
        <h2
          className={cx(
            "titulo-6 lg:titulo-4 border-t-4 border-borde-fuerte px-40 py-16 text-center",
            color === "naranja" ? "bg-fondo-destacado text-texto-inverso" : "bg-fondo-superficie-alta text-texto-principal",
          )}
        >
          {titulo}
        </h2>
        {subtitulo && (
          <p className="cuerpo-3 lg:cuerpo-1 border-y-2 border-borde-fuerte bg-fondo-superficie-alta px-40 py-4 text-center text-texto-principal">
            {subtitulo}
          </p>
        )}
      </div>
    </div>
  );
}

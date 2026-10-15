import { cx } from "../../lib/cx";

type Props = { titulo: string; icono?: React.ReactNode; children: React.ReactNode; className?: string };

/** Figma: bloque del checkout (Información de contacto, Dirección…). Tarjeta gris con sombra dura y título H-7. */
export function SeccionCompra({ titulo, icono, children, className }: Props) {
  return (
    <section className={cx("flex flex-col gap-16 rounded-16 border border-borde-inverso bg-fondo-superficie-alta p-20 shadow-dura-6 md:p-40", className)}>
      <h2 className="titulo-7 flex items-center gap-8 text-texto-principal">
        {icono && (
          <span aria-hidden="true" className="flex size-26 items-center justify-center">
            {icono}
          </span>
        )}
        {titulo}
      </h2>
      {children}
    </section>
  );
}

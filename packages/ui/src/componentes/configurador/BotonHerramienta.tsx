import type { ButtonHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { Icono, type NombreIcono } from "../ui/Icono";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { icono: NombreIcono };

/** Figma: botones naranjas "Ordenar" y "Filtrar" sobre la lista de opciones. */
export function BotonHerramienta({ icono, className, children, ...props }: Props) {
  return (
    <button
      type="button"
      className={cx(
        "cuerpo-3 flex h-45 items-center gap-10 rounded-8 bg-fondo-destacado px-16 font-bold text-texto-principal uppercase transition-opacity hover:opacity-90",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-borde-marca aria-pressed:ring-2 aria-pressed:ring-borde-fuerte aria-expanded:ring-2 aria-expanded:ring-borde-fuerte",
        className,
      )}
      {...props}
    >
      <Icono nombre={icono} tamano={icono === "ordenar" ? 16 : 24} />
      {children}
    </button>
  );
}

/** Opción de filtro que aparece al pulsar "Filtrar". */
export function ChipFiltro({ activo, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { activo: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      className={cx(
        "cuerpo-3 rounded-8 border px-12 py-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-borde-marca",
        activo ? "border-borde-marca bg-fondo-marca text-texto-inverso" : "border-borde-default text-texto-principal hover:border-borde-marca",
        className,
      )}
      {...props}
    />
  );
}

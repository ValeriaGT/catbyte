import type { ButtonHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { Icono, type NombreIcono } from "./Icono";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icono?: NombreIcono;
  /** Obligatorio: el botón no tiene texto visible. */
  "aria-label": string;
};

/** Figma: Botones › Botón ícono. Hover invierte a verde con ícono negro. */
export function BotonIcono({ icono = "chevron-derecha", className, ...props }: Props) {
  return (
    <button
      type="button"
      className={cx(
        "inline-flex items-center justify-center rounded-8 border border-borde-marca bg-fondo-superficie p-20 text-accion-secundaria transition-colors",
        "hover:bg-accion-primaria hover:text-accion-sobre-primaria",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-borde-marca",
        "disabled:pointer-events-none disabled:opacity-40",
        className,
      )}
      {...props}
    >
      <Icono nombre={icono} />
    </button>
  );
}

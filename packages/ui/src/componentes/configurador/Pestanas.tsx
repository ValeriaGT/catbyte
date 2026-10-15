"use client";

import { cx } from "../../lib/cx";

type Props = {
  etiqueta: string;
  pestanas: readonly { id: string; etiqueta: string }[];
  activa: string;
  onCambiar: (id: string) => void;
  /** "grande" usa títulos H-7 (Figma: Continuar como invitado / Iniciar sesión). */
  tamano?: "normal" | "grande";
  className?: string;
};

/** Figma: tabs (Skins / RGB / Figuras 3D). Control segmentado: la pestaña activa se rellena en verde. */
export function Pestanas({ etiqueta, pestanas, activa, onCambiar, tamano = "normal", className }: Props) {
  return (
    <div role="tablist" aria-label={etiqueta} className={cx("flex w-full rounded-full bg-fondo-pagina p-4", className)}>
      {pestanas.map((p) => {
        const esActiva = p.id === activa;
        return (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={esActiva}
            onClick={() => onCambiar(p.id)}
            className={cx(
              tamano === "grande" ? "titulo-7 sm:whitespace-nowrap" : "cuerpo-3 whitespace-nowrap",
              "flex-1 rounded-full px-12 py-8 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-borde-marca sm:px-24",
              esActiva ? "bg-fondo-marca text-fondo-superficie-alta" : "text-texto-principal hover:bg-texto-principal/10",
            )}
          >
            {p.etiqueta}
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { cx } from "../../lib/cx";
import { IconoCompra } from "./IconoCompra";
import type { NombreIconoCompra } from "./iconos-compra";

export type PasoConfigurador = { id: string; etiqueta: string; icono: NombreIconoCompra };

type Props = {
  pasos: readonly PasoConfigurador[];
  activo: string;
  /** Pasos que ya tienen una pieza elegida: se pintan en verde. */
  completados?: readonly string[];
  onSeleccionar: (id: string) => void;
  className?: string;
};

const ESTADO = {
  activo: "size-85 border border-borde-marca bg-fondo-superficie-alta text-texto-marca [--icono-hueco:var(--color-fondo-superficie-alta)]",
  completado:
    "size-62 border border-borde-marca bg-fondo-marca/30 text-texto-marca [--icono-hueco:color-mix(in_srgb,var(--color-fondo-marca)_30%,var(--color-fondo-superficie-alta))] group-hover:bg-fondo-marca/45",
  pendiente:
    "size-62 bg-fondo-vitrina text-fondo-superficie-alta [--icono-hueco:var(--color-fondo-vitrina)] group-hover:bg-texto-principal group-hover:[--icono-hueco:var(--color-texto-principal)]",
};

/** Figma: Menu selección (estados menu compra: pendiente, completado y activo). El activo crece y se enmarca en verde. */
export function PasosConfigurador({ pasos, activo, completados = [], onSeleccionar, className }: Props) {
  return (
    <nav aria-label="Pasos de personalización" className={cx("overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", className)}>
      <ol className="mx-auto flex w-max items-end gap-20 px-4 pb-4 xl:gap-28">
        {pasos.map((p) => {
          const esActivo = p.id === activo;
          const estado = esActivo ? "activo" : completados.includes(p.id) ? "completado" : "pendiente";
          return (
            <li key={p.id}>
              <button
                type="button"
                aria-current={esActivo ? "step" : undefined}
                onClick={() => onSeleccionar(p.id)}
                className="group flex flex-col items-center gap-4 rounded-8 text-texto-principal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-borde-marca"
              >
                <span className={cx("flex items-center justify-center rounded-full p-10 transition-colors", ESTADO[estado])}>
                  <IconoCompra nombre={p.icono} className={esActivo ? "size-56" : "size-42"} />
                </span>
                <span className={cx("whitespace-nowrap", esActivo ? "cuerpo-2" : "cuerpo-4")}>
                  {p.etiqueta}
                  {estado === "completado" && <span className="sr-only"> (listo)</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

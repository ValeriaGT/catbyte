"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "../../lib/cx";

type Props = {
  etiqueta: string;
  /** Horizontal: cards en fila (chasis). Vertical: filas apiladas con altura fija (procesador). */
  direccion?: "horizontal" | "vertical";
  children: React.ReactNode;
  className?: string;
};

/**
 * Figma: lista de opciones con barra de avance. La barra verde refleja cuánto se ha desplazado la lista;
 * se oculta la barra nativa y se dibuja la del diseño.
 */
export function CarruselOpciones({ etiqueta, direccion = "horizontal", children, className }: Props) {
  const lista = useRef<HTMLDivElement>(null);
  const [barra, setBarra] = useState({ tamano: 1, inicio: 0 });
  const vertical = direccion === "vertical";

  useEffect(() => {
    const el = lista.current;
    if (!el) return;
    const medir = () => {
      const total = vertical ? el.scrollHeight : el.scrollWidth;
      const visible = vertical ? el.clientHeight : el.clientWidth;
      const avance = vertical ? el.scrollTop : el.scrollLeft;
      const tamano = total ? visible / total : 1;
      const recorrido = total - visible;
      setBarra({ tamano, inicio: recorrido > 0 ? (avance / recorrido) * (1 - tamano) : 0 });
    };
    medir();
    el.addEventListener("scroll", medir, { passive: true });
    const observador = new ResizeObserver(medir);
    observador.observe(el);
    return () => {
      el.removeEventListener("scroll", medir);
      observador.disconnect();
    };
  }, [children, vertical]);

  return (
    <div className={cx("flex gap-10", vertical ? "gap-24 lg:gap-32" : "flex-col", className)}>
      <div
        ref={lista}
        role="radiogroup"
        aria-label={etiqueta}
        className={cx(
          "flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          vertical ? "max-h-317 min-w-0 flex-1 flex-col gap-16 overflow-y-auto p-2" : "justify-between gap-10 overflow-x-auto py-10",
        )}
      >
        {children}
      </div>
      {barra.tamano < 1 && (
        <div aria-hidden="true" className={cx("relative shrink-0 rounded-8 bg-texto-secundario", vertical ? "w-16" : "h-16")}>
          <div
            className={cx("absolute rounded-8 bg-fondo-marca", vertical ? "inset-x-0" : "inset-y-0")}
            style={vertical ? { height: `${barra.tamano * 100}%`, top: `${barra.inicio * 100}%` } : { width: `${barra.tamano * 100}%`, left: `${barra.inicio * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}

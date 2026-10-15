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
 * Figma: lista de opciones con barra de avance. Se oculta la barra nativa y se dibuja la del diseño,
 * que también sirve para desplazarse: se arrastra, se pulsa en cualquier punto o se usa con flechas.
 * En horizontal, la rueda del mouse desplaza la fila.
 */
export function CarruselOpciones({ etiqueta, direccion = "horizontal", children, className }: Props) {
  const lista = useRef<HTMLDivElement>(null);
  const pista = useRef<HTMLDivElement>(null);
  const agarre = useRef<number | null>(null);
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
    // La rueda vertical mueve la fila horizontal mientras quede recorrido; al llegar al borde, la página sigue.
    const rueda = (e: WheelEvent) => {
      if (vertical || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (e.deltaY > 0 ? el.scrollLeft >= max - 1 : el.scrollLeft <= 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    medir();
    el.addEventListener("scroll", medir, { passive: true });
    el.addEventListener("wheel", rueda, { passive: false });
    const observador = new ResizeObserver(medir);
    observador.observe(el);
    return () => {
      el.removeEventListener("scroll", medir);
      el.removeEventListener("wheel", rueda);
      observador.disconnect();
    };
  }, [children, vertical]);

  // Lleva la lista a la fracción 0–1 de su recorrido.
  const irA = (fraccion: number, suave = false) => {
    const el = lista.current;
    if (!el) return;
    const recorrido = vertical ? el.scrollHeight - el.clientHeight : el.scrollWidth - el.clientWidth;
    const destino = Math.min(1, Math.max(0, fraccion)) * recorrido;
    el.scrollTo({ [vertical ? "top" : "left"]: destino, behavior: suave ? "smooth" : "auto" });
  };

  // Posición del puntero en la pista (px desde su inicio) y largo de la pista.
  const medirPuntero = (e: React.PointerEvent) => {
    const r = pista.current!.getBoundingClientRect();
    return { pos: vertical ? e.clientY - r.top : e.clientX - r.left, largo: vertical ? r.height : r.width };
  };

  const moverA = (e: React.PointerEvent) => {
    const { pos, largo } = medirPuntero(e);
    irA((pos - agarre.current!) / (largo * (1 - barra.tamano)));
  };

  const alPresionar = (e: React.PointerEvent) => {
    const { pos, largo } = medirPuntero(e);
    const inicioPulgar = barra.inicio * largo;
    const largoPulgar = barra.tamano * largo;
    // Al agarrar el pulgar se conserva el punto de agarre; al pulsar la pista, el pulgar salta centrado ahí.
    agarre.current = pos >= inicioPulgar && pos <= inicioPulgar + largoPulgar ? pos - inicioPulgar : largoPulgar / 2;
    e.currentTarget.setPointerCapture(e.pointerId);
    moverA(e);
  };

  const alMover = (e: React.PointerEvent) => {
    if (agarre.current !== null) moverA(e);
  };

  const alSoltar = () => {
    agarre.current = null;
  };

  const actual = barra.tamano < 1 ? barra.inicio / (1 - barra.tamano) : 0;

  const alTeclear = (e: React.KeyboardEvent) => {
    const destinos: Record<string, number> = {
      ArrowRight: actual + 0.2,
      ArrowDown: actual + 0.2,
      ArrowLeft: actual - 0.2,
      ArrowUp: actual - 0.2,
      Home: 0,
      End: 1,
    };
    if (!(e.key in destinos)) return;
    e.preventDefault();
    irA(destinos[e.key], true);
  };

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
        <div
          ref={pista}
          role="scrollbar"
          aria-label={`Desplazar ${etiqueta.toLowerCase()}`}
          aria-orientation={vertical ? "vertical" : "horizontal"}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(actual * 100)}
          tabIndex={0}
          onPointerDown={alPresionar}
          onPointerMove={alMover}
          onPointerUp={alSoltar}
          onPointerCancel={alSoltar}
          onKeyDown={alTeclear}
          className={cx(
            "group relative shrink-0 cursor-pointer touch-none rounded-8 bg-texto-secundario focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-borde-marca",
            vertical ? "w-16" : "h-16",
          )}
        >
          <div
            className={cx("absolute rounded-8 bg-fondo-marca transition-colors group-hover:bg-accion-primaria-hover", vertical ? "inset-x-0" : "inset-y-0")}
            style={vertical ? { height: `${barra.tamano * 100}%`, top: `${barra.inicio * 100}%` } : { width: `${barra.tamano * 100}%`, left: `${barra.inicio * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}

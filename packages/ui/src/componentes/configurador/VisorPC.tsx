"use client";

import { useState } from "react";
import { cx } from "../../lib/cx";
import { Icono } from "../ui/Icono";

// Silueta exacta de Figma (Gif computador › Texto). En Figma está girada −90°; la matriz la deja en su sitio:
// muesca arriba a la derecha, donde va el botón de reproducir.
const FORMA =
  "M463.149 403.544C466.684 403.544 469.545 400.548 469.545 396.845V50.0574C469.545 44.803 465.479 40.5448 460.463 40.5448H49.6269C44.6103 40.5448 40.5448 44.803 40.5448 50.0574V486.032C40.5448 491.287 44.6103 495.545 49.6269 495.545H370.716C376.248 495.545 380.735 490.846 380.735 485.051V419.018C380.735 410.471 387.349 403.536 395.516 403.536H463.156L463.149 403.544Z";

type Props = {
  total: string;
  imagen?: string;
  /** Piezas elegidas hasta ahora (Figma: tag), una píldora por pieza. */
  etiquetas?: readonly string[];
  className?: string;
};

/** Figma: Gif computador. Marco con el total, la foto del PC y el botón para hacerla girar. */
export function VisorPC({ total, imagen, etiquetas = [], className }: Props) {
  const [girando, setGirando] = useState(false);
  return (
    <div className={cx("flex w-full max-w-456 flex-col gap-24", className)}>
      <div className="@container relative aspect-[456/429] w-full">
        <svg viewBox="0 0 456 429" className="absolute inset-0 h-full w-full drop-shadow-[8px_8px_24px_var(--color-fondo-hundido)]" aria-hidden="true">
          <path d={FORMA} transform="matrix(0 -1 1 0 -40.5 469.5)" className="fill-fondo-superficie-alta stroke-borde-marca stroke-2" />
        </svg>
        <p className="absolute top-[1.9%] left-[2%] flex h-[20.3%] w-[76.3%] flex-col items-center justify-center rounded-8 bg-fondo-pagina px-16 text-center text-[5.7cqw] leading-[1] font-black font-titulo text-texto-principal">
          <span>TOTAL:</span>
          <span>{total}</span>
        </p>
        <div className="absolute top-[29.6%] left-[18.9%] h-[66%] w-[62%] [perspective:800px]">
          {imagen && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imagen}
              alt=""
              className={cx("h-full w-full object-contain transition-transform duration-[2s] ease-in-out motion-reduce:transition-none", girando && "[transform:rotateY(360deg)]")}
            />
          )}
        </div>
        <button
          type="button"
          aria-label={girando ? "Volver a la vista frontal" : "Girar el equipo"}
          aria-pressed={girando}
          onClick={() => setGirando((g) => !g)}
          className="absolute top-0 right-0 flex aspect-square w-[16.2%] items-center justify-center rounded-16 border-2 border-borde-marca text-texto-marca transition-colors hover:bg-accion-secundaria-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-borde-marca"
        >
          <Icono nombre="play" tamano={41} className="h-[56%] w-[56%]" />
        </button>
      </div>
      {etiquetas.length > 0 && (
        <ul aria-label="Piezas elegidas" className="flex flex-wrap justify-between gap-12">
          {etiquetas.map((e) => (
            <li key={e} className="cuerpo-2 min-w-100 rounded-16 bg-fondo-acento px-12 py-8 text-center text-texto-principal">
              {e}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

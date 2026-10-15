"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { cx } from "../../lib/cx";
import { clasesBoton } from "../ui/Boton";
import { Icono } from "../ui/Icono";

type Props = {
  abierto: boolean;
  onCerrar: () => void;
  titulo: string;
  /** Video del tutorial. Mientras no exista se muestra `poster` (en Figma, la maqueta del reproductor). */
  video?: string;
  poster: string;
  accion: { texto: string; href: string };
  /** Ilustración de la izquierda (Figma: Mask group y Vector 24/25), rutas de la app. */
  decoracion?: { malla: string; bordeClaro: string; bordeMarca: string };
};

/**
 * Figma: Video (modal "¿Cómo personalizar?"). Usa <dialog>: Esc cierra y el foco queda dentro.
 * Fondo de puntos verdes y franja dentada a la izquierda; el contenido va centrado.
 */
export function ModalVideo({ abierto, onCerrar, titulo, video, poster, accion, decoracion }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
  }, [abierto]);

  return (
    <dialog
      ref={ref}
      onClose={onCerrar}
      onClick={(e) => e.target === e.currentTarget && onCerrar()}
      aria-labelledby="modal-video-titulo"
      className="m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-1238 overflow-hidden rounded-[40px] bg-fondo-hundido p-0 text-texto-principal backdrop:bg-fondo-hundido/70"
    >
      <div className="relative max-h-[calc(100dvh-32px)] overflow-y-auto">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Puntos verdes cada 31 px, como la retícula de Figma. */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,var(--color-fondo-marca)_1.5px,transparent_1.8px)] bg-size-[31px_31px] opacity-50" />
          {decoracion && (
            <div className="absolute inset-y-0 left-0 hidden w-260 md:block">
              {/* Figma voltea la franja en horizontal; se respetan sus posiciones (x − ancho) con scaleX(−1). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={decoracion.bordeClaro} alt="" className="absolute top-[-85px] left-[-138px] h-[1125.5px] w-[395.5px] max-w-none -scale-x-100" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={decoracion.bordeMarca} alt="" className="absolute top-[-85px] left-[-159px] h-[1125.5px] w-[395.5px] max-w-none -scale-x-100" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={decoracion.malla} alt="" className="absolute top-[-74px] left-[-155px] h-[1125.5px] w-[395.5px] max-w-none -scale-x-100" />
            </div>
          )}
        </div>

        <div className="relative flex flex-col items-center gap-32 px-20 pt-40 pb-40 md:px-82">
          <div className="flex w-full items-start justify-end gap-16">
            <h2 id="modal-video-titulo" className="titulo-4 md:titulo-2 flex-1 pt-12 text-center">
              {titulo}
            </h2>
            <button
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar"
              className="flex size-56 shrink-0 items-center justify-center rounded-8 bg-accion-primaria text-accion-sobre-primaria transition-colors hover:bg-accion-primaria-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-borde-marca"
            >
              <Icono nombre="cerrar" tamano={40} />
            </button>
          </div>

          <div className="relative aspect-[1074/604] w-full overflow-hidden">
            {video ? (
              <video src={video} poster={poster} controls className="h-full w-full bg-fondo-hundido object-contain" />
            ) : (
              // Recorte de Figma (image 89): la imagen trae margen alrededor del reproductor.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={poster} alt="Video tutorial: próximamente" className="absolute top-[-27.76%] left-[-15.81%] h-[155.52%] w-[131.44%] max-w-none" />
            )}
          </div>

          <Link href={accion.href} className={cx(clasesBoton("primario", "pequeno"), "md:titulo-6 md:px-24 md:py-12")}>
            {accion.texto}
          </Link>
        </div>
      </div>
    </dialog>
  );
}

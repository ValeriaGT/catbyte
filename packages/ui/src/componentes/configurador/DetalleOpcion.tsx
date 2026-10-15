"use client";

import { useEffect, useRef } from "react";
import { Icono } from "../ui/Icono";

/** Texto con tramos resaltados en verde, como en Figma. */
export type TextoResaltado = readonly (string | { resaltado: string })[];

export type DetallePieza = {
  descripcion: TextoResaltado;
  caracteristicas: readonly { titulo: string; puntos: readonly TextoResaltado[] }[];
};

type Props = {
  abierto: boolean;
  onCerrar: () => void;
  titulo: string;
  imagen?: string;
  detalle: DetallePieza;
  /** Ilustraciones de fondo (rutas de la app): textura, trazo y las dos manos. */
  decoracion?: { textura?: string; trazo?: string; arriba?: string; izquierda?: string };
};

function Resaltado({ texto }: { texto: TextoResaltado }) {
  return texto.map((t, i) => (typeof t === "string" ? t : <strong key={i} className="font-bold text-texto-marca">{t.resaltado}</strong>));
}

/** Figma: Detalle (modal de "Ver más"). Usa <dialog>: Esc cierra y el foco queda atrapado dentro. */
export function DetalleOpcion({ abierto, onCerrar, titulo, imagen, detalle, decoracion = {} }: Props) {
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
      aria-labelledby="detalle-titulo"
      className="m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-1316 overflow-hidden rounded-[40px] bg-fondo-hundido p-0 text-texto-principal backdrop:bg-fondo-hundido/70"
    >
      <div className="relative max-h-[calc(100dvh-32px)] overflow-y-auto px-20 pt-40 pb-56 md:px-64">
        {/* Decoración: no recibe clics ni lectores de pantalla. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {decoracion.textura && <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${decoracion.textura})` }} />}
          {decoracion.trazo && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={decoracion.trazo} alt="" className="absolute -top-280 -left-240 w-[700px] max-w-none -rotate-40 opacity-50" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={decoracion.trazo} alt="" className="absolute top-[45%] left-[60%] w-[700px] max-w-none -rotate-40 opacity-50" />
            </>
          )}
          {decoracion.arriba && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={decoracion.arriba} alt="" className="absolute top-132 right-0 hidden w-140 -scale-y-100 -rotate-12 lg:block" />
          )}
          {decoracion.izquierda && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={decoracion.izquierda} alt="" className="absolute top-[52%] -left-28 hidden w-165 -rotate-24 lg:block" />
          )}
        </div>

        <div className="relative flex flex-col gap-40">
          <div className="flex items-start justify-between gap-16">
            <span className="hidden size-56 shrink-0 md:block" />
            <h2 id="detalle-titulo" className="titulo-6 md:titulo-4 mt-48 text-center uppercase">
              {titulo}
            </h2>
            <button
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar detalle"
              className="flex size-56 shrink-0 items-center justify-center rounded-8 bg-accion-primaria text-accion-sobre-primaria transition-colors hover:bg-accion-primaria-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-borde-marca"
            >
              <Icono nombre="cerrar" tamano={40} />
            </button>
          </div>

          <div className="relative flex flex-col items-center gap-24 rounded-16 border border-borde-marca bg-fondo-pagina p-24 md:mt-64 md:min-h-226 md:flex-row md:gap-40 md:py-32 md:pr-56 md:pl-280">
            {imagen && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imagen} alt="" className="w-160 drop-shadow-[0_10px_5px_rgb(0_0_0/0.25)] md:absolute md:-top-80 md:left-60 md:w-208" />
            )}
            <p className="cuerpo-2 leading-20 md:text-[18px]">
              <Resaltado texto={detalle.descripcion} />
            </p>
          </div>

          <ul className="grid gap-48 pt-24 md:grid-cols-3 md:gap-32">
            {detalle.caracteristicas.map((c) => (
              <li key={c.titulo} className="relative flex flex-col items-center rounded-16 border border-borde-marca bg-fondo-pagina px-24 pt-48 pb-32">
                <h3 className="titulo-7 absolute -top-24 rounded-4 bg-fondo-marca px-24 py-12 text-center whitespace-nowrap text-texto-inverso shadow-[0_7px_5px_rgb(0_0_0/0.25)]">
                  {c.titulo}
                </h3>
                <ul className="cuerpo-4 flex list-disc flex-col gap-16 pl-18 text-left">
                  {c.puntos.map((p, i) => (
                    <li key={i}>
                      <Resaltado texto={p} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </dialog>
  );
}

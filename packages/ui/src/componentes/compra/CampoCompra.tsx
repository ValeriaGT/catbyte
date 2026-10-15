"use client";

import { useId, type InputHTMLAttributes, type SelectHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { Icono } from "../ui/Icono";

type Base = {
  etiqueta: string;
  /** Ícono a la izquierda del valor (Figma: Gato, correo, ubicación…). */
  icono?: React.ReactNode;
  error?: string;
  className?: string;
};

type ConTexto = Base & InputHTMLAttributes<HTMLInputElement> & { opciones?: undefined };
type ConLista = Base & SelectHTMLAttributes<HTMLSelectElement> & { opciones: readonly { valor: string; texto: string }[] };

const CONTROL =
  "cuerpo-1 min-w-0 flex-1 appearance-none bg-transparent text-texto-principal outline-none placeholder:text-texto-secundario disabled:opacity-40";

/**
 * Figma: Formulario (checkout). Etiqueta H-7, ícono + valor B-1 sobre una línea verde; con error la línea
 * se vuelve roja y aparece el mensaje. Con `opciones` es una lista desplegable con chevron.
 */
export function CampoCompra(props: ConTexto | ConLista) {
  const { etiqueta, icono, error, className, id, ...resto } = props;
  const generado = useId();
  const campoId = id ?? generado;
  const errorId = `${campoId}-error`;
  const comunes = { id: campoId, "aria-invalid": error ? true : undefined, "aria-describedby": error ? errorId : undefined };

  return (
    <div className={cx("flex min-w-0 flex-col p-10", className)}>
      <label htmlFor={campoId} className="titulo-7 text-texto-principal">
        {etiqueta}
      </label>
      <div
        className={cx(
          "flex items-center gap-10 border-b py-16 transition-colors focus-within:border-b-2",
          error ? "border-borde-error" : "border-borde-marca",
        )}
      >
        {icono && (
          <span aria-hidden="true" className="flex size-26 shrink-0 items-center justify-center">
            {icono}
          </span>
        )}
        {"opciones" in resto && resto.opciones ? (
          <>
            <select {...comunes} {...(resto as SelectHTMLAttributes<HTMLSelectElement>)} className={cx(CONTROL, "cursor-pointer [&>option]:bg-fondo-superficie")}>
              {(resto as ConLista).opciones.map((o) => (
                <option key={o.valor} value={o.valor}>
                  {o.texto}
                </option>
              ))}
            </select>
            <Icono nombre="chevron-abajo" className="pointer-events-none shrink-0 text-texto-marca" />
          </>
        ) : (
          <input {...comunes} {...(resto as InputHTMLAttributes<HTMLInputElement>)} className={CONTROL} />
        )}
      </div>
      {error && (
        <p id={errorId} className="cuerpo-5 pt-4 text-texto-error">
          {error}
        </p>
      )}
    </div>
  );
}

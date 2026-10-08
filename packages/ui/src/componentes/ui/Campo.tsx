"use client";

import { useId, type InputHTMLAttributes } from "react";
import { cx } from "../../lib/cx";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  etiqueta: string;
  error?: string;
};

/** Figma: Formularios › Campo. Foco = línea verde; error = línea roja + mensaje. */
export function Campo({ etiqueta, error, className, id, ...props }: Props) {
  const generado = useId();
  const campoId = id ?? generado;
  const errorId = `${campoId}-error`;
  return (
    <div className={cx("flex flex-col gap-8", className)}>
      <label htmlFor={campoId} className="titulo-7 text-texto-principal">
        {etiqueta}
      </label>
      <input
        id={campoId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cx(
          "cuerpo-3 border-b-2 bg-transparent py-12 text-texto-principal outline-none placeholder:text-texto-secundario",
          "focus:border-borde-marca disabled:opacity-40",
          error ? "border-borde-error" : "border-borde-default",
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="cuerpo-5 text-texto-error">
          {error}
        </p>
      )}
    </div>
  );
}

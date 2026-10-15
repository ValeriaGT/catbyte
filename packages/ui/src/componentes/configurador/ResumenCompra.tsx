import Link from "next/link";
import { cx } from "../../lib/cx";
import { Icono } from "../ui/Icono";

export type LineaResumen = { id: string; nombre: string; precio: string; href: string; incluida: boolean };

type Props = {
  lineas: readonly LineaResumen[];
  total: string;
  onAlternar: (id: string) => void;
  /** Botones del pie (Figma: Atrás / Ir a pagar). */
  acciones?: React.ReactNode;
  className?: string;
};

/** Figma: Select. Casilla verde con check cuando está marcada; borde gris cuando no. */
function Casilla({ marcada }: { marcada: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "flex size-24 shrink-0 items-center justify-center rounded-4",
        marcada ? "bg-fondo-marca text-texto-inverso" : "border border-borde-default",
      )}
    >
      {marcada && <Icono nombre="check" tamano={18} />}
    </span>
  );
}

/**
 * Figma: Resumen de tu compra. Cada pieza se puede desmarcar para sacarla del total; su nombre lleva
 * de vuelta al paso donde se eligió.
 */
export function ResumenCompra({ lineas, total, onAlternar, acciones, className }: Props) {
  return (
    <div className={cx("flex w-full max-w-453 flex-col gap-16", className)}>
      <ul className="flex flex-col gap-8">
        {lineas.map((l) => (
          <li key={l.id} className="flex items-center justify-between gap-24 rounded-16 px-16 py-8">
            <span className="flex min-w-0 items-center gap-10">
              <label className="flex cursor-pointer rounded-4 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-borde-marca">
                <input type="checkbox" checked={l.incluida} onChange={() => onAlternar(l.id)} className="sr-only" aria-label={`Incluir ${l.nombre}`} />
                <Casilla marcada={l.incluida} />
              </label>
              <Link
                href={l.href}
                className={cx(
                  "cuerpo-2 underline underline-offset-2 hover:text-texto-marca focus-visible:outline-2 focus-visible:outline-borde-marca",
                  l.incluida ? "text-texto-principal" : "text-texto-secundario line-through",
                )}
              >
                {l.nombre}
              </Link>
            </span>
            <span className={cx("cuerpo-2 shrink-0", l.incluida ? "text-texto-principal" : "text-texto-secundario line-through")}>{l.precio}</span>
          </li>
        ))}
        <li className="flex items-center justify-between gap-24 px-16 py-8 text-texto-principal">
          <span className="cuerpo-1">Total</span>
          <span className="cuerpo-1" aria-live="polite">
            {total}
          </span>
        </li>
      </ul>
      {acciones && <div className="flex gap-16">{acciones}</div>}
    </div>
  );
}

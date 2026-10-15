import { cx } from "../../lib/cx";

type Props = { nombre: string; piezas: readonly string[]; total: string; imagen?: string; className?: string };

/** Figma: Resumen del pedido (compra exitosa). Foto del equipo, nombre, piezas separadas por barras y total en verde. */
export function TarjetaPedido({ nombre, piezas, total, imagen, className }: Props) {
  return (
    <div className={cx("flex flex-col items-center gap-16 sm:flex-row", className)}>
      {imagen && (
        <span className="flex size-142 shrink-0 items-center justify-center rounded-8 p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imagen} alt="" className="size-126 object-contain drop-shadow-[0_7px_7px_rgb(0_0_0/0.3)]" />
        </span>
      )}
      <div className="flex flex-col gap-8 text-texto-principal">
        <p className="cuerpo-1">{nombre}</p>
        <p className="cuerpo-2">{piezas.join(" | ")}</p>
        <p className="cuerpo-1 text-texto-marca">Total: {total}</p>
      </div>
    </div>
  );
}

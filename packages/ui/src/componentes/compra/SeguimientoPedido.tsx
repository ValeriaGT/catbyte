import { cx } from "../../lib/cx";
import { Icono } from "../ui/Icono";

export type EtapaPedido = { titulo: string; detalle?: string };

type Props = {
  etapas: readonly EtapaPedido[];
  /** Índice de la etapa en curso; las anteriores se ven completas. */
  actual: number;
  className?: string;
};

/**
 * Seguidor del pedido (sin diseño en Figma; sigue el lenguaje de los pasos del configurador):
 * etapas completas en verde con check, la actual con anillo verde y pulso, las siguientes en gris.
 */
export function SeguimientoPedido({ etapas, actual, className }: Props) {
  return (
    <ol aria-label="Seguimiento del pedido" className={cx("grid", className)} style={{ gridTemplateColumns: `repeat(${etapas.length}, minmax(0, 1fr))` }}>
      {etapas.map((e, i) => {
        const estado = i < actual ? "completa" : i === actual ? "actual" : "pendiente";
        return (
          <li key={e.titulo} aria-current={estado === "actual" ? "step" : undefined} className="relative flex flex-col items-center gap-8 text-center">
            {/* Tramo de línea hacia la etapa siguiente. */}
            {i < etapas.length - 1 && (
              <span
                aria-hidden="true"
                className={cx("absolute top-16 left-[calc(50%+20px)] h-2 w-[calc(100%-40px)]", i < actual ? "bg-fondo-marca" : "bg-borde-sutil")}
              />
            )}
            <span
              aria-hidden="true"
              className={cx(
                "relative flex size-32 items-center justify-center rounded-full",
                estado === "completa" && "bg-fondo-marca text-texto-inverso",
                estado === "actual" && "border-2 border-borde-marca bg-fondo-superficie-alta",
                estado === "pendiente" && "border-2 border-borde-sutil bg-fondo-superficie-alta",
              )}
            >
              {estado === "completa" && <Icono nombre="check" tamano={18} />}
              {estado === "actual" && (
                <>
                  <span className="size-12 rounded-full bg-fondo-marca" />
                  <span className="absolute inset-0 rounded-full border-2 border-borde-marca motion-safe:animate-ping" />
                </>
              )}
            </span>
            <span className={cx("cuerpo-4 font-bold sm:cuerpo-3 sm:font-bold", estado === "pendiente" ? "text-texto-secundario" : "text-texto-principal")}>
              {e.titulo}
              <span className="sr-only">{estado === "completa" ? " (lista)" : estado === "actual" ? " (en curso)" : " (pendiente)"}</span>
            </span>
            {e.detalle && <span className="cuerpo-5 text-texto-secundario">{e.detalle}</span>}
          </li>
        );
      })}
    </ol>
  );
}

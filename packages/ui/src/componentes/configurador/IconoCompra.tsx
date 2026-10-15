import { cx } from "../../lib/cx";
import { ICONOS_COMPRA, type NombreIconoCompra } from "./iconos-compra";

// Posición del dibujo dentro de su marco cuadrado, tal como está en Figma (los demás llenan el marco).
const CAJA: Partial<Record<NombreIconoCompra, string>> = {
  case: "9.38% 18.75%",
  graficadora: "18.75% 3.13% 15.63% 3.13%",
  diseno: "-3.6% 13.43% -3.6% 0",
};

/** Figma: Iconos compra. Cuadrado; el tamaño lo da `className` (p. ej. `size-42`). */
export function IconoCompra({ nombre, className }: { nombre: NombreIconoCompra; className?: string }) {
  const { ancho, alto, contenido } = ICONOS_COMPRA[nombre];
  return (
    <span aria-hidden="true" className={cx("relative block shrink-0", className)}>
      <span className="absolute" style={{ inset: CAJA[nombre] ?? 0 }}>
        <svg viewBox={`0 0 ${ancho} ${alto}`} fill="none" className="block h-full w-full">
          {contenido}
        </svg>
      </span>
    </span>
  );
}

import { cx } from "../../lib/cx";
import { EtiquetaOpcion, type ColorEtiquetaOpcion } from "./EtiquetaOpcion";
import { IconoCompra } from "./IconoCompra";
import type { NombreIconoCompra } from "./iconos-compra";
import { MarcaRadio } from "./MarcaRadio";

type Props = {
  grupo: string;
  valor: string;
  nombre: string;
  precio: string;
  etiqueta?: string;
  colorEtiqueta?: ColorEtiquetaOpcion;
  imagen?: string;
  /** Si no hay foto, se dibuja el ícono del paso. */
  icono?: NombreIconoCompra;
  seleccionada: boolean;
  onSeleccionar: (valor: string) => void;
  /** Abre el detalle de la pieza. Sin él no se muestra "Ver más". */
  onVerMas?: () => void;
  className?: string;
};

/**
 * Figma: opción en fila (procesador). Toda la fila elige la opción; "Ver más" queda por encima
 * del área del radio para abrir el detalle sin seleccionar.
 */
export function FilaOpcion({ grupo, valor, nombre, precio, etiqueta, colorEtiqueta, imagen, icono, seleccionada, onSeleccionar, onVerMas, className }: Props) {
  return (
    <div
      className={cx(
        "relative flex items-center gap-16 rounded-8 border border-borde-fuerte pr-24 transition-colors sm:gap-24",
        "hover:bg-texto-principal/10 has-checked:bg-texto-principal/20 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-borde-marca",
        className,
      )}
    >
      <label className="absolute inset-0 cursor-pointer rounded-8">
        <input type="radio" name={grupo} value={valor} checked={seleccionada} onChange={() => onSeleccionar(valor)} className="sr-only" />
        <span className="sr-only">
          {nombre}, {precio}
        </span>
      </label>
      <span className="flex shrink-0 p-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {imagen ? (
          <img src={imagen} alt="" className="h-110 w-92 object-contain sm:h-145 sm:w-121" />
        ) : (
          icono && (
            <span className="flex h-110 w-92 items-center justify-center sm:h-145 sm:w-121">
              <IconoCompra nombre={icono} className="size-80 text-texto-secundario [--icono-hueco:var(--color-fondo-superficie-alta)]" />
            </span>
          )
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-col items-start gap-12 py-16 text-texto-principal">
        {etiqueta && <EtiquetaOpcion color={colorEtiqueta}>{etiqueta}</EtiquetaOpcion>}
        <span className="titulo-7">{nombre}</span>
        <span className="cuerpo-2">{precio}</span>
        {onVerMas && (
          <button
            type="button"
            onClick={onVerMas}
            className="cuerpo-1 relative font-bold text-texto-marca underline decoration-2 underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-borde-marca"
          >
            Ver más<span className="sr-only">: {nombre}</span>
          </button>
        )}
      </span>
      <MarcaRadio seleccionada={seleccionada} />
    </div>
  );
}

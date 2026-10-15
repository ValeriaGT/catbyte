import { cx } from "../../lib/cx";
import { IconoCompra } from "./IconoCompra";
import type { NombreIconoCompra } from "./iconos-compra";
import { MarcaRadio } from "./MarcaRadio";
import { EtiquetaOpcion, type ColorEtiquetaOpcion } from "./EtiquetaOpcion";

type Props = {
  /** Nombre del grupo de radios (uno por paso). */
  grupo: string;
  valor: string;
  nombre: string;
  precio: string;
  etiqueta?: string;
  colorEtiqueta?: ColorEtiquetaOpcion;
  imagen?: string;
  /** Si no hay foto, se dibuja el ícono del paso. */
  icono?: NombreIconoCompra;
  /** Opción "Sin …": la foto se ve en gris, como en Figma. */
  apagada?: boolean;
  seleccionada: boolean;
  onSeleccionar: (valor: string) => void;
  className?: string;
};

/** Figma: chasis (opción del configurador). Es un radio: toda la card se puede pulsar y se maneja con flechas. */
export function CardOpcion({ grupo, valor, nombre, precio, etiqueta, colorEtiqueta, imagen, icono, apagada, seleccionada, onSeleccionar, className }: Props) {
  return (
    <label
      className={cx(
        "flex w-147 shrink-0 grow-0 cursor-pointer flex-col rounded-8 border border-borde-default p-8 transition-colors",
        "hover:bg-fondo-vitrina/10 has-checked:bg-fondo-vitrina/20 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-borde-marca",
        className,
      )}
    >
      <input type="radio" name={grupo} value={valor} checked={seleccionada} onChange={() => onSeleccionar(valor)} className="peer sr-only" />
      <span className="flex items-center justify-between">
        {etiqueta ? <EtiquetaOpcion color={colorEtiqueta}>{etiqueta}</EtiquetaOpcion> : <span />}
        <MarcaRadio seleccionada={seleccionada} />
      </span>
      <span className="flex h-143 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {imagen ? (
          <img src={imagen} alt="" className={cx("max-h-124 max-w-124 object-contain", apagada && "opacity-40 grayscale")} />
        ) : (
          icono && <IconoCompra nombre={icono} className="size-80 text-texto-secundario [--icono-hueco:var(--color-fondo-superficie-alta)]" />
        )}
      </span>
      <span className="flex flex-col px-6 py-10 text-texto-principal">
        <span className="cuerpo-2">{nombre}</span>
        <span className="cuerpo-3">{precio}</span>
      </span>
    </label>
  );
}

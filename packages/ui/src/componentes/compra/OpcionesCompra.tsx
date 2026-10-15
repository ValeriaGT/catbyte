import { cx } from "../../lib/cx";
import { MarcaRadio } from "../configurador/MarcaRadio";
import { Icono } from "../ui/Icono";

type Comun = {
  grupo: string;
  valor: string;
  seleccionada: boolean;
  onSeleccionar: (valor: string) => void;
  icono: React.ReactNode;
  className?: string;
};

const MARCO =
  "relative flex cursor-pointer rounded-8 border transition-colors hover:bg-texto-principal/10 has-checked:bg-texto-principal/20 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-borde-marca";

/** Figma: Envio. Fila con ícono, nombre, precio y plazo; el radio va a la derecha. */
export function OpcionEnvio({ grupo, valor, seleccionada, onSeleccionar, icono, nombre, precio, plazo, className }: Comun & { nombre: string; precio: string; plazo: string }) {
  return (
    <label className={cx(MARCO, "items-center justify-between gap-16 border-borde-fuerte px-16 py-16 sm:px-24", className)}>
      <input type="radio" name={grupo} value={valor} checked={seleccionada} onChange={() => onSeleccionar(valor)} className="sr-only" />
      <span className="flex min-w-0 items-center gap-16">
        <span aria-hidden="true" className="flex w-50 shrink-0 justify-center">
          {icono}
        </span>
        <span className="flex flex-col gap-4 text-texto-principal sm:gap-8">
          <span className="titulo-7">{nombre}</span>
          <span className="cuerpo-1">{precio}</span>
          <span className="cuerpo-3">{plazo}</span>
        </span>
      </span>
      <MarcaRadio seleccionada={seleccionada} />
    </label>
  );
}

/** Figma: método de pago. Tarjeta con el logo dentro de una píldora verde (llena si está elegida). */
export function OpcionPago({ grupo, valor, seleccionada, onSeleccionar, icono, nombre, className }: Comun & { nombre: string }) {
  return (
    <label className={cx(MARCO, "flex-col items-center gap-10 border-borde-default p-8 pb-16", className)}>
      <input type="radio" name={grupo} value={valor} checked={seleccionada} onChange={() => onSeleccionar(valor)} className="sr-only" />
      <span className="self-end">
        <MarcaRadio seleccionada={seleccionada} />
      </span>
      <span aria-hidden="true" className={cx("flex h-70 w-112 items-center justify-center rounded-full", seleccionada ? "bg-fondo-marca" : "bg-fondo-marca/20")}>
        {icono}
      </span>
      <span className="cuerpo-2 text-center text-texto-principal">{nombre}</span>
    </label>
  );
}

/** Figma: Select (casilla). Verde con check cuando está marcada; borde gris cuando no. */
export function CasillaVerificacion({
  marcada,
  onCambiar,
  error,
  children,
  className,
}: {
  marcada: boolean;
  onCambiar: (marcada: boolean) => void;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex flex-col gap-4", className)}>
      <label className="flex cursor-pointer items-start gap-8 rounded-4 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-borde-marca">
        <input type="checkbox" checked={marcada} onChange={(e) => onCambiar(e.target.checked)} aria-invalid={error ? true : undefined} className="sr-only" />
        <span
          aria-hidden="true"
          className={cx(
            "mt-4 flex size-24 shrink-0 items-center justify-center rounded-4",
            marcada ? "bg-fondo-marca text-texto-inverso" : cx("border", error ? "border-borde-error" : "border-borde-default"),
          )}
        >
          {marcada && <Icono nombre="check" tamano={18} />}
        </span>
        <span className="cuerpo-1 text-texto-principal">{children}</span>
      </label>
      {error && <p className="cuerpo-5 pl-32 text-texto-error">{error}</p>}
    </div>
  );
}

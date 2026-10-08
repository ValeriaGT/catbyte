import type { ButtonHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { Icono, type NombreIcono } from "./Icono";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  tipo?: "primario" | "secundario";
  tamano?: "grande" | "pequeno";
  iconoIzquierdo?: NombreIcono;
  iconoDerecho?: NombreIcono;
};

const TIPO = {
  primario: "bg-accion-primaria text-accion-sobre-primaria hover:bg-accion-primaria-hover",
  secundario: "border-2 border-accion-secundaria text-accion-secundaria hover:bg-accion-secundaria-hover",
};
const TAMANO = { grande: "titulo-6 px-24 py-12", pequeno: "titulo-7 px-20 py-8" };

/** Clases del botón, para aplicarlas también a un <Link> que debe verse como botón. */
export function clasesBoton(tipo: keyof typeof TIPO = "primario", tamano: keyof typeof TAMANO = "grande") {
  return cx(
    "inline-flex items-center justify-center gap-8 rounded-8 transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-borde-marca",
    "disabled:pointer-events-none disabled:opacity-40",
    TIPO[tipo],
    TAMANO[tamano],
  );
}

/** Figma: Botones › Botón (Tipo × Tamaño × Estado). Estado "Hover" y "Deshabilitado" los resuelve CSS. */
export function Boton({ tipo = "primario", tamano = "grande", iconoIzquierdo, iconoDerecho, className, children, ...props }: Props) {
  return (
    <button type="button" className={cx(clasesBoton(tipo, tamano), className)} {...props}>
      {iconoIzquierdo && <Icono nombre={iconoIzquierdo} />}
      {children}
      {iconoDerecho && <Icono nombre={iconoDerecho} />}
    </button>
  );
}

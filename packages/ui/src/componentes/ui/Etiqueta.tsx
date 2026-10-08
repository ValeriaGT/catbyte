import { cx } from "../../lib/cx";

const COLOR = {
  naranja: "bg-fondo-destacado text-texto-inverso",
  verde: "bg-fondo-marca text-texto-inverso",
  morado: "bg-fondo-acento text-texto-principal",
};

/** Figma: Secciones › Etiqueta. Sin radio a propósito (cinta adhesiva). */
export function Etiqueta({ color = "naranja", children, className }: { color?: keyof typeof COLOR; children: React.ReactNode; className?: string }) {
  return <span className={cx("inline-block titulo-6 px-16 py-4", COLOR[color], className)}>{children}</span>;
}

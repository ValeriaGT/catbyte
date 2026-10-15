import { cx } from "../../lib/cx";

const COLOR = {
  naranja: "bg-acento-naranja/50",
  morado: "bg-acento-morado/50",
  azul: "bg-acento-azul/50",
  verde: "bg-acento-verde/50",
  fucsia: "bg-acento-fucsia/50",
};

export type ColorEtiquetaOpcion = keyof typeof COLOR;

/** Figma: tags (uso de la pieza: Gamer, Audiovisual, 3D…). Color de acento al 50 %. */
export function EtiquetaOpcion({ color = "naranja", children, className }: { color?: ColorEtiquetaOpcion; children: React.ReactNode; className?: string }) {
  return <span className={cx("cuerpo-4 w-max rounded-8 px-8 py-4 font-bold text-texto-principal", COLOR[color], className)}>{children}</span>;
}

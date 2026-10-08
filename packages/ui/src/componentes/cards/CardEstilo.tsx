import Link from "next/link";
import { cx } from "../../lib/cx";

const COLOR = {
  morado: "to-acento-morado",
  verde: "to-acento-verde",
  azul: "to-acento-azul",
  naranja: "to-acento-naranja",
  fucsia: "to-acento-fucsia",
};

type Props = { href: string; etiqueta: string; color: keyof typeof COLOR; imagen?: string };

/** Figma: Cards › Card estilo. El degradado toma el color de acento de la variante. */
export function CardEstilo({ href, etiqueta, color, imagen }: Props) {
  return (
    <Link href={href} className="group relative block aspect-[180/600] w-full overflow-hidden rounded-16 bg-fondo-superficie-alta">
      {imagen && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imagen} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      )}
      <span className={cx("absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-b from-transparent", COLOR[color])} />
      <span className="titulo-7 absolute inset-x-12 bottom-32 text-center text-texto-principal">{etiqueta}</span>
    </Link>
  );
}

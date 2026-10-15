import Link from "next/link";
import { cx } from "../../lib/cx";
import { clasesBoton } from "../ui/Boton";

const COLOR = {
  morado: "bg-acento-morado",
  verde: "bg-acento-verde",
  azul: "bg-acento-azul",
  naranja: "bg-acento-naranja",
  fucsia: "bg-acento-fucsia",
};

type Props = {
  href: string;
  titulo: string;
  descripcion: string;
  color: keyof typeof COLOR;
  imagen?: string;
  className?: string;
};

/** Figma: Cards › Card producto. Marco del color de acento, foto y panel blanco con el botón "Ver más". */
export function CardProducto({ href, titulo, descripcion, color, imagen, className }: Props) {
  return (
    <article className={cx("flex w-full max-w-354 flex-col gap-8 overflow-hidden rounded-8 p-8", COLOR[color], className)}>
      <div className="aspect-[338/368] overflow-hidden rounded-2 bg-fondo-superficie-alta">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {imagen && <img src={imagen} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="flex items-center justify-between gap-12 rounded-8 bg-fondo-inverso p-16 text-texto-inverso">
        <div className="flex min-w-0 flex-col gap-8">
          <h3 className="titulo-7">{titulo}</h3>
          <p className="cuerpo-2">{descripcion}</p>
        </div>
        <Link href={href} aria-label={`Ver más: ${titulo}`} className={cx(clasesBoton("primario", "pequeno"), "shrink-0 whitespace-nowrap")}>
          Ver más
        </Link>
      </div>
    </article>
  );
}

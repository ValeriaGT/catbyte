import { cx } from "../../lib/cx";

type Props = {
  cita: string;
  nombre: string;
  rol: string;
  /** Foto del PC recortada (fondo transparente): se muestra sobre la vitrina gris. */
  imagen?: string;
  avatar?: string;
  className?: string;
};

/** Figma: Cards › Card comunidad. La inclinación de la Home (−3,3°) la aplica la sección con `className`. */
export function CardComunidad({ cita, nombre, rol, imagen, avatar, className }: Props) {
  return (
    <figure className={cx("flex w-full max-w-350 flex-col gap-12 rounded-8 border-4 border-borde-fuerte bg-fondo-acento p-24 shadow-suave", className)}>
      <div className="flex aspect-square items-center justify-center rounded-4 bg-fondo-vitrina p-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {imagen && <img src={imagen} alt="" className="max-h-full max-w-full object-contain" />}
      </div>
      <figcaption className="flex items-center gap-20 text-texto-principal">
        <span className="size-96 shrink-0 overflow-hidden rounded-full bg-fondo-vitrina">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {avatar && <img src={avatar} alt="" className="h-full w-full object-cover object-top" />}
        </span>
        <span className="flex flex-col gap-8">
          <blockquote className="cuerpo-3">{cita}</blockquote>
          <span className="cuerpo-5">
            {nombre}
            <br />
            {rol}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

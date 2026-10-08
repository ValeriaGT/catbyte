type Props = { cita: string; nombre: string; rol: string; imagen?: string; avatar?: string };

/** Figma: Cards › Card comunidad. */
export function CardComunidad({ cita, nombre, rol, imagen, avatar }: Props) {
  return (
    <figure className="flex w-full max-w-354 flex-col gap-8 rounded-8 bg-fondo-acento p-8 shadow-suave">
      <div className="aspect-[338/300] overflow-hidden rounded-2 bg-fondo-superficie-alta">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {imagen && <img src={imagen} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="flex flex-col gap-12 rounded-8 bg-fondo-inverso p-16 text-texto-inverso">
        <blockquote className="cuerpo-3">{cita}</blockquote>
        <figcaption className="flex items-center gap-12">
          <span className="size-40 shrink-0 overflow-hidden rounded-full bg-fondo-superficie-alta">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {avatar && <img src={avatar} alt="" className="h-full w-full object-cover" />}
          </span>
          <span className="flex flex-col">
            <span className="cuerpo-2">{nombre}</span>
            <span className="cuerpo-4">{rol}</span>
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

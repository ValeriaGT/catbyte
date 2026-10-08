type Props = { titulo: string; subtitulo?: string };

/** Figma: Secciones › Título de sección. El eco en contorno es decorativo (aria-hidden). */
export function TituloSeccion({ titulo, subtitulo }: Props) {
  return (
    <div className="relative flex flex-col items-center gap-16 overflow-hidden px-20 pt-20 text-center">
      <span
        aria-hidden="true"
        className="titulo-3 lg:titulo-1 pointer-events-none absolute top-0 whitespace-nowrap text-transparent opacity-25 [-webkit-text-stroke:1.5px_var(--color-borde-marca)]"
      >
        {titulo}
      </span>
      <h2 className="titulo-5 lg:titulo-3 relative text-texto-marca">{titulo}</h2>
      {subtitulo && <p className="cuerpo-3 lg:cuerpo-1 relative uppercase text-texto-principal">{subtitulo}</p>}
    </div>
  );
}

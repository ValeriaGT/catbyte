import Link from "next/link";
import { cx } from "@/lib/cx";
import { Icono } from "@/components/ui/Icono";

// Silueta exacta de Figma (Cards › Card categoría): esquina inferior derecha recortada para el botón.
const FORMA =
  "M382.23 312.94C385.42 312.94 388 310.365 388 307.183V9.17456C388 4.65928 384.332 1 379.807 1H9.19294C4.6675 1 1 4.65928 1 9.17456V383.825C1 388.341 4.6675 392 9.19294 392H298.847C303.837 392 307.885 387.962 307.885 382.983V326.238C307.885 318.893 313.851 312.934 321.219 312.934H382.237Z";

type Props = { href: string; titulo: string; descripcion: string; imagen?: string };

/** Toda la card es un enlace; el chevron es decorativo y replica el Botón ícono. */
export function CardCategoria({ href, titulo, descripcion, imagen }: Props) {
  const clip = `forma-${titulo.normalize("NFD").replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}`;
  return (
    <Link href={href} className="group relative block aspect-[389/393] w-full max-w-389 focus-visible:outline-none">
      <svg viewBox="0 0 389 393" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <clipPath id={clip}>
            <path d={FORMA} />
          </clipPath>
        </defs>
        <path d={FORMA} className="fill-fondo-superficie-alta" />
        {imagen && <image href={imagen} width="389" height="393" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${clip})`} opacity="0.35" />}
        <path
          d={FORMA}
          className={cx(
            "fill-none stroke-borde-default stroke-2 transition-all",
            "group-hover:stroke-borde-marca group-hover:stroke-4 group-focus-visible:stroke-borde-marca group-focus-visible:stroke-4",
          )}
        />
      </svg>
      <div className="absolute inset-x-24 top-[24%] flex flex-col items-center gap-8 text-center">
        <h3 className="titulo-5 text-texto-principal">{titulo}</h3>
        <p className="cuerpo-1 text-texto-principal">{descripcion}</p>
      </div>
      <span
        className={cx(
          "absolute right-[1.5%] bottom-[1.5%] flex aspect-square w-[16.5%] items-center justify-center rounded-8 border border-borde-marca bg-fondo-superficie text-accion-secundaria transition-colors",
          "group-hover:bg-accion-primaria group-hover:text-accion-sobre-primaria",
        )}
      >
        <Icono nombre="chevron-derecha" />
      </span>
    </Link>
  );
}

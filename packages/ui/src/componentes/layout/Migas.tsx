import Link from "next/link";
import { Icono } from "../ui/Icono";

type Props = { ruta: readonly { texto: string; href: string }[]; actual: string };

/** Figma: migas de pan ("‹ Inicio / Personaliza"). El chevron vuelve al primer nivel. */
export function Migas({ ruta, actual }: Props) {
  return (
    <nav aria-label="Ruta de navegación">
      <ol className="cuerpo-2 flex items-center text-texto-principal">
        {ruta.map((r, i) => (
          <li key={r.href} className="flex items-center">
            <Link href={r.href} className="flex items-center rounded-4 hover:text-texto-marca focus-visible:outline-2 focus-visible:outline-borde-marca">
              {i === 0 && <Icono nombre="chevron-izquierda" className="text-texto-marca" />}
              {r.texto}
            </Link>
            <span aria-hidden="true">&nbsp;/&nbsp;</span>
          </li>
        ))}
        <li aria-current="page" className="text-texto-marca">
          {actual}
        </li>
      </ol>
    </nav>
  );
}

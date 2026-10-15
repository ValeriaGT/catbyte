"use client";

import Link from "next/link";
import { useState } from "react";
import { clasesBoton, cx, ModalVideo } from "@catbyte/ui";

const RECURSOS = "/home/como-personalizar";

/** "¿Cómo personalizar?" abre el video tutorial; "Arma tu computador" va directo al configurador. */
export function AccionesPersonalizar() {
  const [abierto, setAbierto] = useState(false);
  const tamano = "md:titulo-6 md:px-24 md:py-12";
  return (
    <div className="flex flex-col items-center gap-16 px-20 sm:flex-row">
      <button type="button" onClick={() => setAbierto(true)} className={cx(clasesBoton("primario", "pequeno"), tamano)}>
        ¿Cómo personalizar?
      </button>
      <Link href="/personaliza" className={cx(clasesBoton("secundario", "pequeno"), tamano)}>
        Arma tu computador
      </Link>
      <ModalVideo
        abierto={abierto}
        onCerrar={() => setAbierto(false)}
        titulo="¿Cómo personalizar?"
        poster={`${RECURSOS}/video.png`}
        accion={{ texto: "Ir a personalizar", href: "/personaliza" }}
        decoracion={{ malla: `${RECURSOS}/malla.svg`, bordeClaro: `${RECURSOS}/borde-1.svg`, bordeMarca: `${RECURSOS}/borde-2.svg` }}
      />
    </div>
  );
}

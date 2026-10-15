import Image from "next/image";
import { Etiqueta } from "@catbyte/ui";
import { AccionesPersonalizar } from "./AccionesPersonalizar";

/** Bloque gráfico "Arma tu poder / Diseña tu estilo" sobre la textura de persiana. */
export function DisenaTuEstilo() {
  return (
    <section aria-labelledby="disena-titulo" className="relative overflow-hidden py-80">
      <Image src="/home/textura-persiana.png" alt="" fill sizes="100vw" className="object-cover opacity-20" />
      <Image src="/home/grafiti-numeral.png" alt="" width={236} height={246} className="absolute top-40 left-[15%] hidden w-[236px] opacity-80 lg:block" />
      <div className="relative flex flex-col items-center gap-32 px-20 text-center">
        <div className="flex flex-col items-center">
          <Etiqueta className="relative z-10 -mb-12 -rotate-2">Arma tu poder</Etiqueta>
          <h2 id="disena-titulo" className="grafico-2 md:grafico-1 text-texto-principal">
            Diseña tu estilo
          </h2>
        </div>
        <AccionesPersonalizar />
      </div>
    </section>
  );
}

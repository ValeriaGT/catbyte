import Image from "next/image";
import { Marquesina } from "@catbyte/ui";
import { FRASE_MARQUESINA, MARCAS } from "@/content/home";

/** Dos cintas inclinadas sobre el borde del hero y la franja de marcas aliadas en movimiento. */
export function Marcas() {
  return (
    <section aria-label="Marcas con las que trabajamos" className="relative z-10 overflow-hidden pt-24 pb-32 md:-mt-48 md:pt-0">
      <div className="-mx-20 -rotate-3">
        <Marquesina frase={FRASE_MARQUESINA} />
      </div>
      <div className="-mx-20 mt-24 -rotate-2">
        <Marquesina frase={FRASE_MARQUESINA} />
      </div>
      <div className="mt-40 overflow-hidden">
        <ul className="flex w-max items-center gap-80 motion-safe:animate-marquesina">
          {[...MARCAS, ...MARCAS].map((m, i) => (
            <li key={i} aria-hidden={i >= MARCAS.length || undefined}>
              <Image src={`/home/marcas/${m.archivo}`} alt={m.nombre} width={m.ancho} height={m.alto} className="h-48 w-auto" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

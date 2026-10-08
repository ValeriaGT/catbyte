import Image from "next/image";
import { FormularioContacto } from "@catbyte/ui";

/** Formulario de contacto acompañado de las ilustraciones de gatos. */
export function Contacto() {
  return (
    <section aria-label="Contacto" className="relative overflow-hidden px-20 py-80">
      <Image src="/home/textura-pizarra.png" alt="" fill sizes="100vw" className="object-cover opacity-15" />
      <Image src="/home/gato-capucha.png" alt="" width={275} height={255} className="pointer-events-none absolute top-0 -left-40 hidden w-[620px] max-w-none opacity-30 lg:block" />
      <Image src="/home/equis.png" alt="" width={274} height={252} className="pointer-events-none absolute bottom-16 left-0 hidden w-[200px] lg:block" />
      <div className="relative mx-auto flex max-w-[1100px] items-end justify-center gap-40 lg:justify-end">
        <FormularioContacto />
        <Image src="/home/gato-esqueleto.png" alt="" width={342} height={272} className="pointer-events-none hidden w-[300px] xl:block" />
      </div>
    </section>
  );
}

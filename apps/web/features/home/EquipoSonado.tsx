import Image from "next/image";
import Link from "next/link";
import { CardCategoria, clasesBoton, cx, TituloSeccion } from "@catbyte/ui";
import { CATEGORIAS } from "@/content/home";

/** "Tu equipo soñado": categorías de uso y CTA al armador. */
export function EquipoSonado() {
  return (
    <section aria-label="Tu equipo soñado" className="relative overflow-hidden py-80">
      <Image src="/home/red.png" alt="" width={1705} height={1818} className="pointer-events-none absolute top-0 -left-[40%] w-[90%] max-w-none opacity-30" />
      <Image src="/home/red.png" alt="" width={1705} height={1818} className="pointer-events-none absolute top-[30%] -right-[25%] w-[70%] max-w-none opacity-30" />
      <Image src="/home/gato-skater.png" alt="" width={608} height={936} className="pointer-events-none absolute bottom-80 -left-16 hidden w-[238px] xl:block" />
      <div className="relative flex flex-col items-center gap-48">
        <div className="w-full">
          <TituloSeccion titulo="TU EQUIPO SOÑADO" subtitulo="Lo encuentras con configuraciones optimizadas para cada usuario" />
        </div>
        <ul className="grid w-full max-w-[1228px] gap-32 px-20 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIAS.map((c) => (
            <li key={c.href} className="flex justify-center">
              <CardCategoria {...c} />
            </li>
          ))}
        </ul>
        <Link href="/armador" className={cx(clasesBoton("primario", "pequeno"), "mx-20 text-center md:titulo-6 md:px-24 md:py-12")}>
          Descubre tu computador ideal
        </Link>
      </div>
    </section>
  );
}

import { BannerSeccion, CardEstilo, CardProducto, TituloSeccion } from "@catbyte/ui";
import { ESTILOS, PRODUCTOS } from "@/content/home";

/** Panel oscuro con los estilos de setup y los productos recomendados. */
export function EstilosYProductos() {
  return (
    <section aria-label="Estilos de setup" className="relative py-40">
      <div aria-hidden="true" className="absolute inset-y-0 inset-x-20 rounded-16 bg-fondo-superficie lg:inset-x-48" />
      <div className="relative flex flex-col gap-64">
        <BannerSeccion titulo="HAZ QUE TU SET UP HABLE POR TI" subtitulo="Y refleja todo lo que eres" />
        <ul className="mx-auto grid w-full max-w-[1090px] grid-cols-2 gap-24 px-40 sm:grid-cols-3 lg:grid-cols-5 lg:gap-40">
          {ESTILOS.map((e) => (
            <li key={e.href}>
              <CardEstilo {...e} />
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-32 px-40 pb-80">
          <TituloSeccion titulo="PRODUCTOS RECOMENDADOS" />
          <ul className="grid w-full max-w-[1164px] justify-items-center gap-32 md:grid-cols-2 lg:grid-cols-3 lg:gap-48">
            {PRODUCTOS.map((p) => (
              <li key={p.href} className="w-full max-w-354">
                <CardProducto {...p} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

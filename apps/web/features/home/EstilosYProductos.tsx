import { BannerSeccion, CardEstilo, TituloSeccion } from "@catbyte/ui";
import { ESTILOS } from "@/content/home";

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
        <div className="flex flex-col items-center gap-24 pb-80">
          <TituloSeccion titulo="PRODUCTOS RECOMENDADOS" />
          {/* El diseño de esta sección aún no tiene contenido; queda el espacio reservado. */}
          <p className="cuerpo-1 px-40 text-center text-texto-secundario">Muy pronto: los equipos más pedidos por la comunidad.</p>
        </div>
      </div>
    </section>
  );
}

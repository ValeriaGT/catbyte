import type { Metadata } from "next";
import { BannerSeccion, Boton, BotonIcono, Campo, CardCategoria, CardComunidad, CardEstilo, Etiqueta, Footer, FormularioContacto, Header, Icono, Marquesina, NOMBRES_ICONO, TituloSeccion } from "@catbyte/ui";

export const metadata: Metadata = { title: "Sistema de diseño · CatByte" };

const SEMANTICOS = {
  fondo: ["pagina", "superficie", "superficie-alta", "hundido", "inverso", "marca", "destacado", "acento"],
  texto: ["principal", "secundario", "inverso", "marca", "error"],
  borde: ["sutil", "default", "fuerte", "marca", "error", "inverso"],
  accion: ["primaria", "primaria-hover", "sobre-primaria", "secundaria", "secundaria-hover"],
  estado: ["exito", "exito-fondo", "alerta", "alerta-fondo", "error", "error-fondo", "info", "info-fondo"],
  acento: ["morado", "verde", "azul", "naranja", "fucsia", "amarillo"],
};
const ICONOS = NOMBRES_ICONO;
const TEXTOS = ["titulo-1", "titulo-2", "titulo-3", "titulo-4", "titulo-5", "titulo-6", "titulo-7", "cuerpo-1", "cuerpo-2", "cuerpo-3", "cuerpo-4", "cuerpo-5", "grafico-2"];

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-24 px-20 lg:px-64">
      <h2 className="titulo-5 text-texto-principal">{titulo}</h2>
      {children}
    </section>
  );
}

export default function Sistema() {
  return (
    <>
      <Header rutaActual="/pcs" />
      <main className="flex flex-col gap-80 py-80">
        <div className="flex flex-col items-start gap-16 px-20 lg:px-64">
          <Etiqueta>Sistema de diseño · v1.0</Etiqueta>
          <h1 className="grafico-2 lg:grafico-1 text-texto-principal">Diseña tu estilo</h1>
          <p className="cuerpo-1 max-w-[60ch] text-texto-secundario">Espejo en código de Figma CatByte2.0. Mismos nombres de tokens, estilos y componentes.</p>
        </div>

        <Bloque titulo="Color semántico">
          {Object.entries(SEMANTICOS).map(([grupo, nombres]) => (
            <div key={grupo} className="flex flex-wrap gap-16">
              {nombres.map((n) => (
                <div key={n} className="flex w-160 flex-col gap-8">
                  <span className="h-56 rounded-8 border border-borde-sutil" style={{ background: `var(--color-${grupo}-${n})` }} />
                  <code className="cuerpo-4 text-texto-secundario">{`${grupo}-${n}`}</code>
                </div>
              ))}
            </div>
          ))}
        </Bloque>

        <Bloque titulo="Tipografía">
          {TEXTOS.map((t) => (
            <div key={t} className="flex items-baseline gap-24">
              <code className="cuerpo-4 w-96 shrink-0 text-texto-secundario">{t}</code>
              <span className={`${t} min-w-0 [overflow-wrap:anywhere]`}>Diseña tu estilo</span>
            </div>
          ))}
        </Bloque>

        <Bloque titulo="Íconos">
          <div className="flex flex-wrap gap-32">
            {ICONOS.map((i) => (
              <div key={i} className="flex flex-col items-center gap-8">
                <Icono nombre={i} />
                <code className="cuerpo-4 text-texto-secundario">{i}</code>
              </div>
            ))}
          </div>
        </Bloque>

        <Bloque titulo="Botones">
          <div className="flex flex-wrap items-center gap-16">
            <Boton>Descubre tu computador ideal</Boton>
            <Boton tamano="pequeno">¿Cómo personalizar?</Boton>
            <Boton tipo="secundario" iconoDerecho="flecha-derecha">Ver más</Boton>
            <Boton tipo="secundario" tamano="pequeno">Secundario</Boton>
            <Boton disabled>Deshabilitado</Boton>
            <BotonIcono aria-label="Siguiente" />
            <BotonIcono aria-label="Siguiente" disabled />
          </div>
        </Bloque>

        <Bloque titulo="Cards">
          <div className="grid gap-24 sm:grid-cols-2 lg:grid-cols-3">
            <CardCategoria href="#" titulo="Gaming" descripcion="Equipos de alto rendimiento para gaming competitivo" />
            <CardCategoria href="#" titulo="IA" descripcion="GPUs potentes para machine learning" />
            <CardCategoria href="#" titulo="Trabajo" descripcion="Eficiencia máxima para trabajo profesional" />
          </div>
          <div className="grid grid-cols-2 gap-24 sm:grid-cols-5">
            <CardEstilo href="#" etiqueta="Led" color="morado" />
            <CardEstilo href="#" etiqueta="Estilo propio" color="verde" />
            <CardEstilo href="#" etiqueta="Transform" color="azul" />
            <CardEstilo href="#" etiqueta="Cars" color="naranja" />
            <CardEstilo href="#" etiqueta="Mood City" color="fucsia" />
          </div>
          <CardComunidad cita="“Es todo lo que esperaba tener en mi trabajo y es muy rápido.”" nombre="Laura Martínez" rol="Diseñadora gráfica" />
        </Bloque>

        <Bloque titulo="Formularios">
          <div className="grid max-w-[900px] gap-32 sm:grid-cols-2">
            <Campo etiqueta="Nombre" placeholder="Escribe tu nombre" />
            <Campo etiqueta="Email" placeholder="Escribe tu email" defaultValue="valeria@" error="Escribe un email válido" />
          </div>
          <div className="flex flex-wrap gap-40">
            <FormularioContacto />
            <FormularioContacto acento="naranja" />
          </div>
        </Bloque>

        <section className="flex flex-col gap-48">
          <TituloSeccion titulo="TU EQUIPO SOÑADO" subtitulo="Lo encuentras con configuraciones optimizadas para cada usuario" />
          <BannerSeccion titulo="HAZ QUE TU SET UP HABLE POR TI" subtitulo="Y refleja todo lo que eres" />
          <BannerSeccion titulo="NUESTRA COMUNIDAD" color="oscuro" />
          <Marquesina frase="HAZ UN LEVEL UP A TU SET UP" />
        </section>
      </main>
      <Footer />
    </>
  );
}

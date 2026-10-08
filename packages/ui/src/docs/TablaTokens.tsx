import figma from "../../tokens/figma.json";

const slug = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[\s/.]+/g, "-").toLowerCase();
const semanticos = figma.variables.filter((v) => v.collection === "Semánticos");
const grupos = [...new Set(semanticos.map((v) => v.name.split("/")[0]))];

/** Tabla viva de colores semánticos: nombre en Figma, clase de Tailwind y primitivo al que apunta. */
export function TablaColores() {
  return (
    <div className="flex flex-col gap-32">
      {grupos.map((g) => (
        <div key={g} className="flex flex-wrap gap-16">
          {semanticos
            .filter((v) => v.name.startsWith(g + "/"))
            .map((v) => (
              <div key={v.name} className="flex w-176 flex-col gap-4">
                <span className="h-56 rounded-8 border border-borde-sutil" style={{ background: `var(--color-${slug(v.name)})` }} />
                <code className="cuerpo-3 text-texto-principal">{v.name}</code>
                <code className="cuerpo-4 text-texto-marca">{`*-${slug(v.name)}`}</code>
                <code className="cuerpo-4 text-texto-secundario">→ {"alias" in v ? v.alias : ""}</code>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

/** Estilos de texto con su utilidad de Tailwind. */
export function TablaTexto() {
  return (
    <div className="flex flex-col gap-16">
      {figma.textStyles.map((t) => {
        const clase = slug(t.name);
        return (
          <div key={t.name} className="flex flex-wrap items-baseline gap-24">
            <code className="cuerpo-4 w-160 shrink-0 text-texto-secundario">
              {clase} · {t.size}/{t.lineHeight}
            </code>
            <span className={`${clase} text-texto-principal`}>Diseña tu estilo</span>
          </div>
        );
      })}
    </div>
  );
}

// Genera src/styles/tokens.css a partir de tokens/figma.json (exportado del Figma de CatByte).
//
//   npm run tokens
//
// Mapeo Figma → código (los nombres se conservan 1:1):
//   Colección "Primitivos"   color/neon/verde   → --primitivo-neon-verde      (solo :root, sin clase Tailwind)
//   Colección "Semánticos"   fondo/pagina       → --color-fondo-pagina        → bg-fondo-pagina, text-…, border-…
//   Colección "Dimensiones"  espacio/16         → --spacing: 1px              → p-16, gap-16, m-16 = 16px
//                            radio/8            → --radius-8                  → rounded-8
//                            borde/2            → (nativo)                    → border-2 = 2px
//   Estilos de texto         Heading/H-1        → @utility heading-1
//   Estilos de efecto        Sombra/E2          → --shadow-e2                 → shadow-e2

import { readFileSync, writeFileSync } from "node:fs";

const ENTRADA = "tokens/figma.json";
const SALIDA = "src/styles/tokens.css";

const slug = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .replace(/[\s/.]+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();

const sinPrefijo = (nombre, prefijo) => (nombre.startsWith(prefijo + "/") ? nombre.slice(prefijo.length + 1) : nombre);

const { variables, textStyles, effectStyles } = JSON.parse(readFileSync(ENTRADA, "utf8"));
const porColeccion = (c) => variables.filter((v) => v.collection === c);

const primitivos = porColeccion("Primitivos");
const nombrePrimitivo = new Map(primitivos.map((v) => [v.name, `--primitivo-${slug(sinPrefijo(v.name, "color"))}`]));

const valorSemantico = (v) => {
  if (!v.alias) return v.value;
  const ref = nombrePrimitivo.get(v.alias);
  if (!ref) throw new Error(`"${v.name}" apunta a "${v.alias}", que no está en Primitivos`);
  return `var(${ref})`;
};

const dimensiones = porColeccion("Dimensiones");
const radios = dimensiones.filter((v) => v.name.startsWith("radio/"));
const fuentes = {
  "Eurostar Black Extended": '"Eurostar Black Extended", "Arial Black", sans-serif',
  "Anonymous Pro": 'var(--font-anonymous-pro), "Courier New", monospace',
  "Hey August": '"Hey August", "Brush Script MT", cursive',
};

const lineas = [
  "/* Generado por scripts/generar-tokens.mjs desde tokens/figma.json. NO EDITAR A MANO. */",
  "",
  ":root {",
  ...primitivos.map((v) => `  ${nombrePrimitivo.get(v.name)}: ${v.value};`),
  "}",
  "",
  "@theme {",
  "  --color-*: initial;",
  ...porColeccion("Semánticos").map((v) => `  --color-${slug(v.name)}: ${valorSemantico(v)};`),
  "",
  "  --spacing: 1px;",
  "",
  "  --radius-*: initial;",
  ...radios.map((v) => `  --radius-${slug(sinPrefijo(v.name, "radio"))}: ${v.value === 999 ? "9999px" : v.value + "px"};`),
  "",
  "  --shadow-*: initial;",
  ...effectStyles.map((e) => `  --shadow-${slug(e.name.split("/").pop())}: ${e.css};`),
  "",
  ...Object.entries(fuentes).map(([familia, pila]) => `  --font-${slug(familia)}: ${pila};`),
  "}",
  "",
  ...textStyles.flatMap((t) => {
    const [grupo, nivel] = t.name.split("/");
    const nombre = `${slug(grupo)}-${nivel.replace(/^[A-Za-z]+-/, "")}`;
    return [
      `@utility ${nombre} {`,
      `  font-family: var(--font-${slug(t.family)});`,
      `  font-size: ${t.size}px;`,
      `  font-weight: ${t.weight};`,
      `  line-height: ${t.lineHeight}px;`,
      ...(t.letterSpacing ? [`  letter-spacing: ${t.letterSpacing}px;`] : []),
      "}",
      "",
    ];
  }),
];

writeFileSync(SALIDA, lineas.join("\n"));
console.log(
  `${SALIDA}: ${primitivos.length} primitivos, ${porColeccion("Semánticos").length} semánticos, ` +
    `${radios.length} radios, ${effectStyles.length} sombras, ${textStyles.length} estilos de texto`,
);

// Genera src/tema.css a partir de tokens/figma.json (exportado del Figma CatByte2.0).
//
//   npm run tokens
//
// Mapeo Figma → código (los nombres se conservan 1:1):
//   Primitivos   color/neon/verde   → --primitivo-neon-verde   (solo :root, sin clase de Tailwind)
//   Semánticos   fondo/pagina       → --color-fondo-pagina     → bg-fondo-pagina, text-texto-principal, border-borde-marca
//   Dimensiones  espacio/16         → --spacing: 1px           → p-16, gap-24, mt-8 (1 unidad = 1px)
//                radio/8            → --radius-8               → rounded-8
//                grosor/2           → --grosor-2               → border-2 (nativo) o var(--grosor-2)
//   Tipografía   fuente/titulo      → --font-titulo            → font-titulo
//   Estilos de texto  Titulo/1     → @utility titulo-1
//   Estilos de efecto Sombra/dura-6 → --shadow-dura-6          → shadow-dura-6
//
// Las familias las carga la app (next/font) y expone --font-familia-<nombre>; ver README de @catbyte/ui.
// Si cambias una fuente en Figma, la app debe cargar la nueva familia.

import { readFileSync, writeFileSync } from "node:fs";

const ENTRADA = "tokens/figma.json";
const SALIDA = "src/tema.css";

const slug = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .replace(/[\s/.]+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();

const sinPrefijo = (nombre, prefijo) => (nombre.startsWith(prefijo + "/") ? nombre.slice(prefijo.length + 1) : nombre);

const RESPALDO = {
  titulo: '"Arial Black", sans-serif',
  cuerpo: '"Courier New", monospace',
  grafica: '"Brush Script MT", cursive',
};

const { variables, textStyles, effectStyles } = JSON.parse(readFileSync(ENTRADA, "utf8"));
const de = (coleccion, prefijo = "") =>
  variables.filter((v) => v.collection === coleccion && v.name.startsWith(prefijo));

const primitivos = de("Primitivos");
const nombrePrimitivo = new Map(primitivos.map((v) => [v.name, `--primitivo-${slug(sinPrefijo(v.name, "color"))}`]));

const valorSemantico = (v) => {
  if (!v.alias) return v.value;
  const ref = nombrePrimitivo.get(v.alias);
  if (!ref) throw new Error(`"${v.name}" apunta a "${v.alias}", que no está en Primitivos`);
  return `var(${ref})`;
};

const semanticos = de("Semánticos");
const radios = de("Dimensiones", "radio/");
const grosores = de("Dimensiones", "grosor/");
const fuentes = de("Tipografía", "fuente/");

const lineas = [
  "/* @catbyte/ui · tema. Generado por scripts/generar-tokens.mjs desde tokens/figma.json. NO EDITAR A MANO. */",
  "",
  "/* Tailwind escanea los componentes compilados de la librería para generar sus clases. */",
  '@source "./";',
  "",
  ":root {",
  ...primitivos.map((v) => `  ${nombrePrimitivo.get(v.name)}: ${v.value};`),
  ...grosores.map((v) => `  --grosor-${slug(sinPrefijo(v.name, "grosor"))}: ${v.value}px;`),
  "}",
  "",
  "@theme static {",
  "  --color-*: initial;",
  "  --color-transparent: transparent;",
  "  --color-current: currentColor;",
  ...semanticos.map((v) => `  --color-${slug(v.name)}: ${valorSemantico(v)};`),
  "",
  "  --spacing: 1px;",
  "",
  "  --radius-*: initial;",
  ...radios.map((v) => {
    const k = slug(sinPrefijo(v.name, "radio"));
    return `  --radius-${k}: ${k === "full" ? "9999px" : v.value + "px"};`;
  }),
  "",
  "  --shadow-*: initial;",
  ...effectStyles.map((e) => `  --shadow-${slug(e.name.split("/").pop())}: ${e.css};`),
  "",
  "  --animate-marquesina: marquesina 30s linear infinite;",
  "  @keyframes marquesina {",
  "    to {",
  "      transform: translateX(-50%);",
  "    }",
  "  }",
  "",
  "  --font-*: initial;",
  ...fuentes.map((v) => {
    const rol = slug(sinPrefijo(v.name, "fuente"));
    return `  --font-${rol}: var(--font-familia-${slug(v.value)}), ${RESPALDO[rol] ?? "sans-serif"};`;
  }),
  "}",
  "",
  ...textStyles.flatMap((t) => {
    const [grupo, nivel] = t.name.split("/");
    const familia = t.fontVar ? `var(--font-${slug(sinPrefijo(t.fontVar, "fuente"))})` : `"${t.family}"`;
    return [
      `@utility ${slug(grupo)}-${slug(nivel)} {`,
      `  font-family: ${familia};`,
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
  `${SALIDA}: ${primitivos.length} primitivos, ${semanticos.length} semánticos, ${radios.length} radios, ` +
    `${grosores.length} grosores, ${fuentes.length} fuentes, ${effectStyles.length} sombras, ${textStyles.length} estilos de texto`,
);

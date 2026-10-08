# CatByte · Web

Sitio de CatByte (PCs gamer personalizados) en **Next.js 16 + React 19 + TypeScript + Tailwind 4**.

- **Diseño fuente:** Figma [CatByte2.0](https://www.figma.com/design/ootKXCdsdW2a7Q9TiWXs2x/CatByte2.0) — sistema de diseño (variables, estilos, componentes).
- **Pantallas de referencia:** Figma original, página *Prototipo* (Home 1 = nodo `889:10333`).
- **Vitrina en vivo:** `/sistema` muestra todos los tokens y componentes, como espejo de Figma.

## Correr el proyecto

```bash
npm install
npm run dev        # http://localhost:3000  ·  /sistema para ver el sistema de diseño
npm run build
npm run lint
```

## Tokens: Figma → código

Los nombres son **los mismos** en Figma y en código. Nunca se escribe un color, espacio o radio suelto.

```bash
npm run tokens     # tokens/figma.json → src/styles/tokens.css (no editar tokens.css a mano)
```

| Figma | Código | Ejemplo de clase |
|---|---|---|
| Semánticos · `fondo/pagina` | `--color-fondo-pagina` | `bg-fondo-pagina` |
| Semánticos · `texto/marca` | `--color-texto-marca` | `text-texto-marca` |
| Semánticos · `borde/marca` | `--color-borde-marca` | `border-borde-marca` |
| Dimensiones · `espacio/16` | `--spacing: 1px` | `p-16`, `gap-24`, `mt-8` (= px exactos) |
| Dimensiones · `radio/8` | `--radius-8` | `rounded-8` |
| Dimensiones · `grosor/2` | `--grosor-2` | `border-2` |
| Tipografía · `fuente/titulo` | `--font-titulo` | `font-titulo` |
| Estilo de texto · `Titulo/1` | `@utility titulo-1` | `titulo-1`, `lg:titulo-1` |
| Estilo de efecto · `Sombra/dura-6` | `--shadow-dura-6` | `shadow-dura-6` |

- Los **primitivos** (`color/neon/verde` → `--primitivo-neon-verde`) existen pero **no generan clases**: en pantallas solo se usan semánticos.
- La paleta por defecto de Tailwind está desactivada (`--color-*: initial`); `bg-red-500` no existe a propósito.
- Para actualizar: exporta de nuevo las variables de Figma a `tokens/figma.json` y corre `npm run tokens`.

### Fuentes

Orbitron (títulos), Anonymous Pro (cuerpo) y Kaushan Script (gráfica), todas de Google Fonts con licencia libre, cargadas con `next/font` en `src/app/layout.tsx`. Si en Figma cambias la variable `fuente/…`, agrega allí la nueva familia (expone `--font-familia-<nombre>`).

## Estructura

```
src/
├── app/                    rutas (App Router)
│   ├── layout.tsx          fuentes + estilos globales
│   ├── page.tsx            inicio
│   └── sistema/page.tsx    vitrina del sistema de diseño
├── components/
│   ├── ui/                 piezas base: Boton, BotonIcono, Campo, Etiqueta, Icono, Logo
│   ├── cards/              CardCategoria, CardEstilo, CardComunidad
│   ├── layout/             Header (+ EnlaceMenu), Footer
│   └── secciones/          BannerSeccion, TituloSeccion, Marquesina, FormularioContacto
├── features/               lógica por funcionalidad (armador de PC, checkout…)
├── content/                textos y datos de ejemplo
├── lib/                    utilidades (cx)
└── styles/tokens.css       GENERADO desde Figma
tokens/figma.json           exportación de Figma
scripts/generar-tokens.mjs
public/marca/               logo e isotipo (SVG)
```

## Componentes

Cada componente indica en su comentario a qué componente de Figma corresponde.

| Figma | Código | Notas |
|---|---|---|
| Botón (Tipo × Tamaño × Estado) | `<Boton tipo tamano iconoIzquierdo iconoDerecho>` | `clasesBoton()` para un `<Link>` con aspecto de botón |
| Botón ícono | `<BotonIcono aria-label icono>` | `aria-label` obligatorio |
| Enlace de menú / Header | `<Header rutaActual>` | Activo con `aria-current="page"` |
| Footer | `<Footer>` | |
| Card categoría | `<CardCategoria href titulo descripcion imagen>` | Silueta exacta de Figma en SVG |
| Card estilo | `<CardEstilo href etiqueta color imagen>` | `color`: morado, verde, azul, naranja, fucsia |
| Card comunidad | `<CardComunidad cita nombre rol imagen avatar>` | |
| Campo | `<Campo etiqueta error …input>` | Error enlazado con `aria-describedby` |
| Formulario de contacto | `<FormularioContacto acento>` | |
| Etiqueta | `<Etiqueta color>` | |
| Banner de sección | `<BannerSeccion titulo subtitulo color>` | |
| Título de sección | `<TituloSeccion titulo subtitulo>` | Eco decorativo con `aria-hidden` |
| Marquesina | `<Marquesina frase>` | Respeta `prefers-reduced-motion` |

## Reglas

1. Solo tokens semánticos. Si falta uno, se crea primero en Figma (colección *Semánticos*) y luego se exporta.
2. Un componente nuevo nace en Figma con sus variantes y después se implementa aquí con el mismo nombre.
3. Todo debe funcionar en 400 px de ancho sin scroll horizontal.
4. Las imágenes del diseño son contenido: van como prop (`imagen`), no dentro del componente.

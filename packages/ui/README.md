# @catbyte/ui

Sistema de diseño de CatByte: **tokens + componentes React** sincronizados 1:1 con el Figma
[CatByte2.0](https://www.figma.com/design/ootKXCdsdW2a7Q9TiWXs2x/CatByte2.0).

- React 19 · Next.js 15+ · Tailwind CSS 4 · TypeScript (tipos incluidos)
- Documentación interactiva: Storybook (`npm run storybook` desde la raíz del repo → http://localhost:6006)

## Instalación

```bash
npm install @catbyte/ui
```

Requiere en la app: `react`, `react-dom`, `next` y `tailwindcss` 4.

### 1. Estilos

```css
/* app/globals.css */
@import "tailwindcss";
@import "@catbyte/ui/tema.css";
```

`tema.css` trae los tokens, las utilidades de texto (`titulo-1`…) y le indica a Tailwind que genere las clases que usan los componentes. No hace falta configurar nada más.

### 2. Fuentes

Las carga la app con `next/font`. Los nombres de variable deben ser exactamente estos:

```tsx
// app/layout.tsx
import { Anonymous_Pro, Kaushan_Script, Orbitron } from "next/font/google";

const orbitron = Orbitron({ variable: "--font-familia-orbitron", subsets: ["latin"], weight: "900" });
const anonymousPro = Anonymous_Pro({ variable: "--font-familia-anonymous-pro", subsets: ["latin"], weight: ["400", "700"] });
const kaushanScript = Kaushan_Script({ variable: "--font-familia-kaushan-script", subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${orbitron.variable} ${anonymousPro.variable} ${kaushanScript.variable}`}>
      <body className="bg-fondo-pagina text-texto-principal font-cuerpo">{children}</body>
    </html>
  );
}
```

### 3. Usar

```tsx
import { Boton, CardCategoria, Header } from "@catbyte/ui";

<Header rutaActual="/pcs" />
<Boton tipo="primario" tamano="grande" iconoDerecho="flecha-derecha">Descubre tu computador ideal</Boton>
<CardCategoria href="/pcs/gaming" titulo="Gaming" descripcion="Equipos de alto rendimiento" imagen="/fotos/gaming.jpg" />
```

## Componentes

| Figma | Componente | Props principales |
|---|---|---|
| Botón | `Boton` | `tipo` primario·secundario, `tamano` grande·pequeno, `iconoIzquierdo`, `iconoDerecho`, `disabled` |
| — | `clasesBoton(tipo, tamano)` | Clases para que un `<Link>` se vea como botón |
| Botón ícono | `BotonIcono` | `icono`, **`aria-label`** (obligatorio) |
| Campo | `Campo` | `etiqueta`, `error` + cualquier prop de `<input>` |
| Etiqueta | `Etiqueta` | `color` naranja·verde·morado |
| Icono/* | `Icono` | `nombre` (ver `NOMBRES_ICONO`), `tamano` |
| Logo | `Logo` | `tipo` completo·isotipo, `color` oscuro·claro |
| Header | `Header` | `rutaActual` |
| Footer | `Footer` | — |
| Card categoría | `CardCategoria` | `href`, `titulo`, `descripcion`, `imagen` |
| Card estilo | `CardEstilo` | `href`, `etiqueta`, `color` morado·verde·azul·naranja·fucsia, `imagen` |
| Card comunidad | `CardComunidad` | `cita`, `nombre`, `rol`, `imagen` (PC recortado), `avatar`, `className` |
| Banner de sección | `BannerSeccion` | `titulo`, `subtitulo`, `color` naranja·oscuro |
| Título de sección | `TituloSeccion` | `titulo`, `subtitulo` |
| Marquesina | `Marquesina` | `frase` |
| Formulario de contacto | `FormularioContacto` | `acento` verde·naranja |

## Tokens

Mismo nombre en Figma y en código. **Solo se usan tokens semánticos**: la paleta por defecto de Tailwind está desactivada.

| Figma | Clase |
|---|---|
| `fondo/pagina`, `texto/marca`, `borde/marca`… | `bg-fondo-pagina`, `text-texto-marca`, `border-borde-marca` |
| `espacio/16` | `p-16`, `gap-16`, `mt-16` (1 unidad = 1 px) |
| `radio/8` | `rounded-8` |
| `Titulo/1` … `Cuerpo/5`, `Grafico/1-2` | `titulo-1` … `cuerpo-5`, `grafico-1` (admiten `lg:titulo-1`) |
| `Sombra/dura-6` | `shadow-dura-6` |
| `fuente/titulo` | `font-titulo` |

Todas las variables también existen como CSS (`var(--color-fondo-pagina)`).

## Mantener la librería

```bash
npm run tokens -w @catbyte/ui    # tokens/figma.json → src/tema.css
npm run build -w @catbyte/ui     # tokens + compila a dist/
npm run storybook                # documentación (desde la raíz)
```

**Flujo de cambios:** cambio en Figma → exportar variables a `tokens/figma.json` → `npm run tokens` → ajustar componente → historia en Storybook → subir la versión en `package.json` y anotar en `CHANGELOG.md`.

Versionado semántico: **parche** (0.1.1) para arreglos visuales, **menor** (0.2.0) para componentes o props nuevos, **mayor** (1.0.0) si cambia o se elimina una prop existente.

## Publicar

El paquete está listo para publicarse (`npm pack` → 77 archivos, 32 kB). Opciones:

- **GitHub Packages** (privado, recomendado): crear el repo en GitHub, agregar `"publishConfig": { "registry": "https://npm.pkg.github.com" }` y publicar con `npm publish -w @catbyte/ui`.
- **npm público**: requiere crear la organización `@catbyte` en npmjs.com.
- **Sin registro**: `npm pack -w @catbyte/ui` genera `catbyte-ui-0.1.0.tgz`, que se instala con `npm install ./catbyte-ui-0.1.0.tgz`.

# CatByte

Monorepo de CatByte (PCs gamer personalizados): el **sistema de diseño** como librería y el **sitio** que la usa.

```
packages/ui/   @catbyte/ui — tokens + componentes React + Storybook   → ver packages/ui/README.md
apps/web/      sitio Next.js 16 que consume @catbyte/ui, igual que lo haría cualquier otro proyecto
```

- **Diseño:** Figma [CatByte2.0](https://www.figma.com/design/ootKXCdsdW2a7Q9TiWXs2x/CatByte2.0) (sistema de diseño) · Figma original, página *Prototipo* (pantallas).
- **Stack:** React 19, Next.js 16, Tailwind CSS 4, TypeScript, Storybook 10. npm workspaces.

## Empezar

```bash
npm install
npm run dev          # compila la librería y levanta el sitio → http://localhost:3000 (vitrina en /sistema)
npm run storybook    # documentación de componentes → http://localhost:6006
```

| Comando (desde la raíz) | Qué hace |
|---|---|
| `npm run dev` | Compila `@catbyte/ui` y arranca el sitio |
| `npm run build` | Build de producción de librería + sitio |
| `npm run storybook` | Storybook de la librería |
| `npm run tokens` | Regenera el tema desde `packages/ui/tokens/figma.json` |
| `npm run lint` | ESLint del sitio |

Mientras editas la librería, deja `npm run dev -w @catbyte/ui` en otra terminal: recompila al guardar y el sitio toma los cambios.

## Reglas

1. **Lo visual vive en la librería.** Si una pantalla necesita una pieza nueva, primero se diseña en Figma y se agrega a `@catbyte/ui` con su historia en Storybook.
2. **Solo tokens semánticos** (`bg-fondo-pagina`, `p-16`, `titulo-1`). La paleta por defecto de Tailwind está desactivada.
3. **Las pantallas componen**: `apps/web` arma páginas con componentes de la librería y datos; no redefine estilos.
4. Todo funciona a 400 px sin scroll horizontal y con teclado.

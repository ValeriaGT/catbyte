# Cambios de @catbyte/ui

## 0.2.0 — 2026-10-08

Ajustes al construir la Home real.

- **CardComunidad** rediseñada según la Home: marco morado con borde blanco, foto del PC sobre vitrina gris, avatar
  redondo de 96 px y cita en blanco. Nueva prop `className` para inclinarla desde la sección.
- Token nuevo `fondo/vitrina` (→ `color/neutro/400`), también en Figma.
- **CardCategoria**: la foto se ve al 30 % para que el texto se lea mejor.
- **Header**: capa `z-30` para quedar por encima del contenido al hacer scroll.

## 0.1.0 — 2026-10-08

Primera versión, construida desde el Figma CatByte2.0 (Home 1 como referencia).

- Tokens: 32 primitivos, 38 semánticos, espaciado/radios/grosores, 3 fuentes, 14 estilos de texto, 5 sombras.
- Componentes: Boton, BotonIcono, Campo, Etiqueta, Icono (9), Logo, Header, Footer, CardCategoria, CardEstilo,
  CardComunidad, BannerSeccion, TituloSeccion, Marquesina, FormularioContacto.
- Storybook con documentación de tokens y una historia por componente.

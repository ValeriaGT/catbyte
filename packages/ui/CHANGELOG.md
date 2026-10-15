# Cambios de @catbyte/ui

## 0.3.0 — 2026-10-14

Configurador de PC (pantallas "PC's Personalizado" y modal "Detalle") y productos recomendados de la Home.

- **CardProducto**: marco del color de acento, foto y panel blanco con "Ver más".
- Familia **Configurador**: `PasosConfigurador` (pendiente/completado/activo), `IconoCompra` (8 íconos de Figma),
  `VisorPC` (total, foto que gira y piezas elegidas), `CardOpcion`, `FilaOpcion`, `EtiquetaOpcion`,
  `CarruselOpciones` (horizontal y vertical, con la barra de avance del diseño), `BotonHerramienta`, `ChipFiltro`,
  `DetalleOpcion` (modal sobre `<dialog>`) y `Pestanas` (control segmentado del paso Diseño).
- `CardOpcion` y `FilaOpcion` muestran el ícono del paso cuando no hay foto; `CardOpcion apagada` para las opciones "Sin …".
- **Migas** de pan.
- **Footer** `variante="compacto"`: franja negra inclinada de los flujos de compra.
- **Icono**: `chevron-izquierda`, `play`, `filtro`, `ordenar`.
- Familia **Compra** (checkout): `CampoCompra` (campo con ícono, error y lista desplegable), `SeccionCompra`,
  `OpcionEnvio`, `OpcionPago`, `CasillaVerificacion`, `SeguimientoPedido` (etapas del pedido) y `TarjetaPedido`.
- **VisorPC** `vistas`: con varias fotos, el play las recorre como un giro 3D (Figma: Gif computador, variantes 1–4).
  Las etiquetas de piezas se agregan una tras otra con 16 px de separación.
- **Pestanas** `tamano="grande"` (títulos H-7).
- **ResumenCompra**: lista de piezas con casillas (Figma: Select) para sacarlas del total y enlace de vuelta a su paso.
- **Header** con submenús según el Sitemap de Figma: desplegable en escritorio (hover o clic, Esc y clic fuera
  cierran) y panel con secciones plegables en móvil (el botón hamburguesa ahora funciona).
- **ModalVideo**: modal "¿Cómo personalizar?" con video (o la maqueta del reproductor mientras no haya video) y CTA.
- **CarruselOpciones**: la barra de avance ahora desplaza la lista (arrastrar, pulsar, flechas) y la rueda del mouse
  mueve la fila horizontal.
- **CardCategoria**: la foto queda tenue (30 %) y con hover o foco se ve completa mientras el texto se oculta.
- **Marquesina** `estatica`: cinta quieta. Token nuevo `animate-marquesina-lenta` (70 s) para la franja de marcas.

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

// Pasos y opciones del configurador de PC. Los precios van en pesos colombianos, sin decimales.
import type { ColorEtiquetaOpcion, DetallePieza, NombreIconoCompra } from "@catbyte/ui";

export type Opcion = {
  id: string;
  nombre: string;
  precio: number;
  imagen?: string;
  etiqueta?: string;
  colorEtiqueta?: ColorEtiquetaOpcion;
  /** Nombre corto para la píldora bajo el visor; si falta se usa `nombre`. */
  resumen?: string;
  /** Fotos desde varios ángulos para el giro del visor (la primera es el frente). */
  vistas?: string[];
  /** Contenido del modal "Ver más". */
  detalle?: DetallePieza;
  /** Opción "Sin …" (precio 0): no cuenta como pieza elegida ni sale en el resumen. */
  ninguna?: boolean;
};

export type Paso = {
  id: string;
  etiqueta: string;
  icono: NombreIconoCompra;
  /** Pestañas dentro del paso (Diseño: Skins, RGB, Figuras 3D); cada una guarda su propia elección. */
  subpasos?: { id: string; etiqueta: string }[];
};

// Color de cada uso, igual en todos los pasos.
const USO: Record<string, ColorEtiquetaOpcion> = { Gamer: "naranja", Audiovisual: "morado", "3D": "azul", Oficina: "verde", Streaming: "fucsia" };
const uso = (etiqueta: string) => ({ etiqueta, colorEtiqueta: USO[etiqueta] });

const DETALLE_I7: DetallePieza = {
  descripcion: [
    "Este procesador es especial porque combina muchos ",
    { resaltado: "núcleos (16) y hilos (24) con una frecuencia muy alta" },
    ", lo que le da fuerza bruta y excelente capacidad para trabajar en paralelo. Es ideal para tareas pesadas como ",
    { resaltado: "edición y render de video, animación 3D, desarrollo de software, trabajo con máquinas virtuales, análisis de datos" },
    " y también para jugar mientras haces streaming o tienes muchas aplicaciones abiertas al mismo tiempo.",
  ],
  caracteristicas: [
    {
      titulo: "Cores e hilos",
      puntos: [
        ["16 cores significa ", { resaltado: "16 “cerebros”" }, " físicos dentro del procesador, capaces de trabajar en tareas distintas al mismo tiempo."],
        [{ resaltado: "24 hilos son como “subtareas” lógicas:" }, " permiten que esos 16 cores gestionen más procesos en paralelo y mejoren el multitasking."],
      ],
    },
    {
      titulo: "Frecuencias (clock)",
      puntos: [
        [{ resaltado: "Base clock 3,4 GHz es la velocidad mínima" }, " a la que trabaja normalmente el procesador."],
        [{ resaltado: "Boost clock 5,4 GHz es la velocidad máxima" }, " automática que puede alcanzar cuando necesita más rendimiento, por ejemplo en juegos o tareas muy pesadas."],
      ],
    },
    {
      titulo: "TDP",
      puntos: [
        [{ resaltado: "TDP 125 W indica el consumo y el calor" }, " aproximado que puede generar el procesador a plena carga."],
        ["Eso sirve para dimensionar bien la ", { resaltado: "refrigeración y la fuente de poder" }, " del PC."],
      ],
    },
  ],
};

// Provisional: el modal de Figma solo existe para el procesador; este sigue su misma estructura.
const DETALLE_RTX: DetallePieza = {
  descripcion: [
    "La tarjeta gráfica es la que dibuja cada imagen que ves. Con más ",
    { resaltado: "memoria de video (VRAM) y núcleos de gráficos" },
    " puedes jugar en alta resolución y acelerar tareas como ",
    { resaltado: "render 3D, edición de video e inteligencia artificial" },
    ".",
  ],
  caracteristicas: [
    {
      titulo: "VRAM",
      puntos: [
        [{ resaltado: "La VRAM guarda las texturas" }, " y los modelos que la gráfica usa en cada momento."],
        ["Para jugar en 1080p bastan ", { resaltado: "8 Gb" }, "; para 4K o render pesado conviene 12 Gb o más."],
      ],
    },
    {
      titulo: "Núcleos",
      puntos: [
        [{ resaltado: "Los núcleos CUDA o de cómputo" }, " trabajan en paralelo para dibujar y calcular."],
        ["Más núcleos significa ", { resaltado: "más cuadros por segundo" }, " y renders más rápidos."],
      ],
    },
    {
      titulo: "Consumo",
      puntos: [
        [{ resaltado: "El consumo en vatios" }, " define qué fuente de poder necesitas."],
        ["También influye en la ", { resaltado: "refrigeración" }, " que debe tener el case."],
      ],
    },
  ],
};

export const PASOS: Paso[] = [
  { id: "case", etiqueta: "Case", icono: "case" },
  { id: "almacenamiento", etiqueta: "Almacenamiento", icono: "almacenamiento" },
  { id: "procesador", etiqueta: "Procesador", icono: "procesador" },
  { id: "graficadora", etiqueta: "Graficadora", icono: "graficadora" },
  { id: "ram", etiqueta: "RAM", icono: "ram" },
  { id: "cpu", etiqueta: "CPU", icono: "cpu" },
  { id: "refrigeracion", etiqueta: "Refrigeración", icono: "refrigeracion" },
  {
    id: "diseno",
    etiqueta: "Diseño",
    icono: "diseno",
    subpasos: [
      { id: "skins", etiqueta: "Skins" },
      { id: "rgb", etiqueta: "RGB" },
      { id: "figuras", etiqueta: "Figuras 3D" },
    ],
  },
];

// Pasos cuyas opciones se muestran en filas (con "Ver más") en vez de cards: las piezas técnicas.
export const VISTA_FILAS = new Set(["procesador", "graficadora"]);

/** Clave de la elección: el paso, o "paso.subpaso" si tiene pestañas. */
export const clave = (paso: string, subpaso?: string) => (subpaso ? `${paso}.${subpaso}` : paso);

// Case, Procesador y Diseño vienen de Figma. Almacenamiento, Graficadora, RAM, CPU y Refrigeración
// son provisionales (sin diseño ni fotos): siguen los mismos patrones y muestran el ícono del paso.
export const OPCIONES: Record<string, Opcion[]> = {
  case: [
    { id: "reactor", nombre: "Case Reactor", precio: 200000, ...uso("Gamer"), imagen: "/personaliza/case/reactor.png" },
    { id: "vanguard", nombre: "Case Vanguard", precio: 200000, ...uso("Gamer"), imagen: "/personaliza/case/vanguard.png" },
    {
      id: "xpg",
      nombre: "Case XPG",
      precio: 280000,
      ...uso("Gamer"),
      imagen: "/personaliza/case/xpg.png",
      vistas: ["/personaliza/case/xpg.png", "/personaliza/case/xpg-2.png", "/personaliza/case/xpg-3.png", "/personaliza/case/xpg-4.png"],
    },
    { id: "neo", nombre: "Case Neo", precio: 200000, ...uso("Gamer"), imagen: "/personaliza/case/neo.png" },
    { id: "raptor", nombre: "Case Raptor", precio: 200000, ...uso("Gamer"), imagen: "/personaliza/case/raptor.png" },
    { id: "nexus", nombre: "Case Nexus", precio: 200000, ...uso("Gamer"), imagen: "/personaliza/case/nexus.png" },
    { id: "quantum", nombre: "Case Quantum", precio: 200000, ...uso("Gamer"), imagen: "/personaliza/case/quantum.png" },
    { id: "nova", nombre: "Case Nova", precio: 250000, ...uso("Gamer"), imagen: "/personaliza/case/nova.png" },
    { id: "nordic", nombre: "Case Nordic", precio: 300000, ...uso("Gamer"), imagen: "/personaliza/case/nordic.png" },
  ],
  procesador: [
    { id: "i7-gamer", nombre: "Intel core i7-13700kf (16 Core)", resumen: "IntelCore i7", precio: 250000, ...uso("Gamer"), imagen: "/personaliza/procesador/i7.png", detalle: DETALLE_I7 },
    { id: "i7-audiovisual", nombre: "Intel core i7-13700kf (16 Core)", resumen: "IntelCore i7", precio: 250000, ...uso("Audiovisual"), imagen: "/personaliza/procesador/i7.png", detalle: DETALLE_I7 },
    { id: "ryzen-3d", nombre: "Rayzen i7-13700kf (16 Core)", resumen: "Rayzen i7", precio: 250000, ...uso("3D"), imagen: "/personaliza/procesador/i7.png", detalle: DETALLE_I7 },
    { id: "i7-gamer-2", nombre: "Intel core i7-13700kf (16 Core)", resumen: "IntelCore i7", precio: 250000, ...uso("Gamer"), imagen: "/personaliza/procesador/i7.png", detalle: DETALLE_I7 },
  ],

  // —— Provisionales ——
  almacenamiento: [
    { id: "ssd-512", nombre: "SSD NVMe 512 Gb", resumen: "512 Gb", precio: 180000, ...uso("Oficina") },
    { id: "ssd-1tb", nombre: "SSD NVMe 1 Tera", resumen: "1 Tera", precio: 320000, ...uso("Gamer") },
    { id: "ssd-2tb", nombre: "SSD NVMe 2 Teras", resumen: "2 Teras", precio: 590000, ...uso("Audiovisual") },
    { id: "hdd-2tb", nombre: "Disco duro 2 Teras", resumen: "HDD 2 Teras", precio: 260000, ...uso("Streaming") },
  ],
  graficadora: [
    { id: "rtx-4060", nombre: "Nvidia RTX 4060 (8 Gb)", resumen: "Nvidia", precio: 1450000, ...uso("Gamer"), detalle: DETALLE_RTX },
    { id: "rtx-4070", nombre: "Nvidia RTX 4070 (12 Gb)", resumen: "Nvidia", precio: 2650000, ...uso("3D"), detalle: DETALLE_RTX },
    { id: "rx-7600", nombre: "AMD Radeon RX 7600 (8 Gb)", resumen: "Radeon", precio: 1250000, ...uso("Audiovisual"), detalle: DETALLE_RTX },
  ],
  ram: [
    { id: "ram-8", nombre: "RAM 8 Gb DDR5", resumen: "8 Gb", precio: 150000, ...uso("Oficina") },
    { id: "ram-16", nombre: "RAM 16 Gb DDR5", resumen: "16 Gb", precio: 280000, ...uso("Gamer") },
    { id: "ram-32", nombre: "RAM 32 Gb DDR5", resumen: "32 Gb", precio: 520000, ...uso("3D") },
    { id: "ram-64", nombre: "RAM 64 Gb DDR5", resumen: "64 Gb", precio: 980000, ...uso("Audiovisual") },
  ],
  // "CPU" se interpreta como la tarjeta madre (el procesador ya es su propio paso).
  cpu: [
    { id: "board-b760", nombre: "Board ASUS B760", resumen: "Board B760", precio: 650000, ...uso("Oficina") },
    { id: "board-z790", nombre: "Board MSI Z790", resumen: "Board Z790", precio: 1100000, ...uso("Gamer") },
    { id: "board-x670", nombre: "Board Gigabyte X670", resumen: "Board X670", precio: 1250000, ...uso("3D") },
  ],
  refrigeracion: [
    { id: "aire-basico", nombre: "Disipador por aire", resumen: "Disipador", precio: 120000, ...uso("Oficina") },
    { id: "cooler-master", nombre: "Coler master Hyper 212", resumen: "Coler master", precio: 210000, ...uso("Gamer") },
    { id: "liquida-240", nombre: "Líquida 240 mm", resumen: "Líquida 240", precio: 450000, ...uso("Streaming") },
    { id: "liquida-360", nombre: "Líquida 360 mm", resumen: "Líquida 360", precio: 650000, ...uso("3D") },
  ],

  // —— Diseño (Figma) ——
  "diseno.skins": [
    { id: "sin-skin", nombre: "Sin skin", precio: 0, ...uso("Gamer"), imagen: "/personaliza/diseno/skin-ninguna.png", ninguna: true },
    { id: "vintage", nombre: "Skin Vintage", resumen: "Skin vintage", precio: 200000, ...uso("Gamer"), imagen: "/personaliza/diseno/skin-vintage.png" },
    { id: "girly", nombre: "Skin Girly", resumen: "Skin girly", precio: 250000, ...uso("Gamer"), imagen: "/personaliza/diseno/skin-girly.png" },
    { id: "futurista", nombre: "Skin Futurista", resumen: "Skin futurista", precio: 300000, ...uso("Gamer"), imagen: "/personaliza/diseno/skin-futurista.png" },
  ],
  "diseno.rgb": [
    { id: "sin-rgb", nombre: "Sin RGB", precio: 0, ...uso("Gamer"), imagen: "/personaliza/diseno/rgb-ventilador.png", ninguna: true },
    { id: "cable-negro", nombre: "Cable RGB negro", precio: 200000, ...uso("Gamer"), imagen: "/personaliza/diseno/rgb-cable-negro.png" },
    { id: "cable-blanco", nombre: "Cable RGB blanco", precio: 250000, ...uso("Gamer"), imagen: "/personaliza/diseno/rgb-cable-blanco.png" },
    { id: "tiras", nombre: "Tiras RGB", precio: 300000, ...uso("Gamer"), imagen: "/personaliza/diseno/rgb-tiras.png" },
    { id: "ventilador", nombre: "RGB en ventilador", resumen: "RGB ventilador", precio: 280000, ...uso("Gamer"), imagen: "/personaliza/diseno/rgb-ventilador.png" },
  ],
  "diseno.figuras": [
    { id: "sin-figuras", nombre: "Sin figuras", precio: 0, ...uso("Gamer"), imagen: "/personaliza/diseno/figura-alien.png", ninguna: true },
    { id: "tiburoncin", nombre: "Tiburoncin", precio: 20000, ...uso("Gamer"), imagen: "/personaliza/diseno/figura-tiburon.png" },
    { id: "alien", nombre: "Alien amigo", precio: 25000, ...uso("Gamer"), imagen: "/personaliza/diseno/figura-alien.png" },
    { id: "bmo", nombre: "BMO", precio: 30000, ...uso("Gamer"), imagen: "/personaliza/diseno/figura-bmo.png" },
  ],
};

// Selección con la que abre el configurador (la del diseño): el case XPG y "Sin …" en cada pestaña de Diseño.
export const SELECCION_INICIAL: Record<string, string> = {
  case: "xpg",
  "diseno.skins": "sin-skin",
  "diseno.rgb": "sin-rgb",
  "diseno.figuras": "sin-figuras",
};

// Textos y datos de la Home. Se separan de las secciones para poder editarlos (o traerlos de un CMS) sin tocar la UI.

export const PROMO = {
  titulo: "¡No tires tu legado!",
  oferta: "Convierte tu PC en un descuento",
  detalle: ["Armamos tu equipo a medida,", "con toda la onda y la mejor potencia"],
};

export const FRASE_MARQUESINA = "HAZ UN LEVEL UP A TU SET UP";

export const MARCAS = [
  { nombre: "ThinkPad", archivo: "thinkpad.svg", ancho: 133, alto: 47 },
  { nombre: "Apple", archivo: "apple.svg", ancho: 50, alto: 62 },
  { nombre: "Kumori Systems", archivo: "kumori.svg", ancho: 234, alto: 59 },
  { nombre: "LG", archivo: "lg.svg", ancho: 118, alto: 72 },
  { nombre: "Razer", archivo: "razer.svg", ancho: 234, alto: 57 },
  { nombre: "Samsung", archivo: "samsung.svg", ancho: 234, alto: 37 },
  { nombre: "Acer", archivo: "acer.svg", ancho: 179, alto: 44 },
];

export const CATEGORIAS = [
  { titulo: "Gaming", descripcion: "Equipos de alto rendimiento para gaming competitivo", href: "/pcs/gaming", imagen: "/home/categorias/render-1.png" },
  { titulo: "Diseño Gráfico", descripcion: "Potencia para edición y renderizado profesional", href: "/pcs/diseno-grafico", imagen: "/home/categorias/render-2.png" },
  { titulo: "Edición de vídeo", descripcion: "Edición de video 4K/8K sin límites", href: "/pcs/edicion-de-video", imagen: "/home/categorias/render-3.png" },
  { titulo: "Desarrollo", descripcion: "Multitarea y compilación ultrarrápida", href: "/pcs/desarrollo", imagen: "/home/categorias/render-4.png" },
  { titulo: "IA", descripcion: "GPUs potentes para machine learning", href: "/pcs/ia", imagen: "/home/categorias/render-5.png" },
  { titulo: "Trabajo", descripcion: "Eficiencia máxima para trabajo profesional", href: "/pcs/trabajo", imagen: "/home/categorias/render-6.png" },
];

export const ESTILOS = [
  { etiqueta: "Led", color: "morado", imagen: "/home/estilos/led.png", href: "/estilos/led" },
  { etiqueta: "Estilo propio", color: "verde", imagen: "/home/estilos/estilo-propio.png", href: "/estilos/estilo-propio" },
  { etiqueta: "Transform", color: "azul", imagen: "/home/estilos/transform.png", href: "/estilos/transform" },
  { etiqueta: "Cars", color: "naranja", imagen: "/home/estilos/cars.png", href: "/estilos/cars" },
  { etiqueta: "Mood City", color: "fucsia", imagen: "/home/estilos/mood-city.png", href: "/estilos/mood-city" },
] as const;

export const TESTIMONIOS = [
  { cita: "“Es todo lo que esperaba: rinde en mi trabajo y es hermoso”", nombre: "Juana Martínez", rol: "Diseñadora", imagen: "/home/comunidad/pc-rosa.png", avatar: "/home/comunidad/avatar-juana.png" },
  { cita: "“Para mi trabajo y para juegos, simplemente perfecto”", nombre: "Felipe Vanegas", rol: "Desarrollador", imagen: "/home/comunidad/pc-verde.png", avatar: "/home/comunidad/avatar-felipe.png" },
  { cita: "“Esto es mi pasión y me ha servido para alcanzar mis metas”", nombre: "Juan González", rol: "Gamer profesional", imagen: "/home/comunidad/pc-blanco.png", avatar: "/home/comunidad/avatar-juan.png" },
  { cita: "“Me encanta su rendimiento a la hora de renderizar en 3D”", nombre: "Martín Gómez", rol: "Diseñador industrial", imagen: "/home/comunidad/pc-vhs.png", avatar: "/home/comunidad/avatar-martin.png" },
];

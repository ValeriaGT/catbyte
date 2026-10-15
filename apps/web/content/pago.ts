// Opciones del checkout. Precios en pesos colombianos; plazos en días hábiles.

export const ENVIOS = [
  { id: "estandar", nombre: "Envío estándar", precio: 12000, plazo: "5-7 días hábiles", dias: 7, icono: "/checkout/envio-estandar.svg" },
  { id: "express", nombre: "Envío Express", precio: 35000, plazo: "1-2 días hábiles", dias: 2, icono: "/checkout/envio-express.svg" },
  { id: "tienda", nombre: "Recoger en tienda", precio: 0, plazo: "Disponible en 24h", dias: 1, icono: "/checkout/envio-tienda.svg" },
] as const;

export const PAGOS = [
  { id: "tarjeta", nombre: "Tarjeta de crédito" },
  { id: "pse", nombre: "PSE - Tarjeta débito" },
  { id: "nequi", nombre: "NEQUI" },
] as const;

export const PAISES = [
  { valor: "CO", texto: "Colombia" },
  { valor: "EC", texto: "Ecuador" },
  { valor: "PE", texto: "Perú" },
  { valor: "MX", texto: "México" },
];

export const DOCUMENTOS = [
  { valor: "", texto: "Elige el tipo" },
  { valor: "CC", texto: "Cédula de ciudadanía" },
  { valor: "CE", texto: "Cédula de extranjería" },
  { valor: "NIT", texto: "NIT" },
  { valor: "PA", texto: "Pasaporte" },
];

/** Etapas del seguidor del pedido; la última cambia si se recoge en tienda. */
export const etapasPedido = (envio: string) => [
  "Pedido confirmado",
  "Armando tu PC",
  "Pruebas de calidad",
  envio === "tienda" ? "Listo para recoger" : "En camino",
  envio === "tienda" ? "Recogido" : "Entregado",
];

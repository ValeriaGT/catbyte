"use client";

import { useSyncExternalStore } from "react";
import { clave, OPCIONES, PASOS, SELECCION_INICIAL, type Opcion } from "@/content/personaliza";

// Formato de Figma: punto para miles y apóstrofo para millones ($3’045.000).
export const pesos = (n: number) => {
  const millones = Math.floor(n / 1_000_000);
  if (!millones) return `$${n.toLocaleString("es-CO")}`;
  const resto = String(n % 1_000_000).padStart(6, "0");
  return `$${millones}’${resto.slice(0, 3)}.${resto.slice(3)}`;
};

export type Elegida = Opcion & { paso: string; grupo: string };

/** Piezas elegidas, en el orden de los pasos y pestañas. Las "Sin …" no cuentan. */
export function piezasElegidas(seleccion: Record<string, string>): Elegida[] {
  const grupos = PASOS.flatMap((p) => (p.subpasos ? p.subpasos.map((s) => ({ paso: p.id, grupo: clave(p.id, s.id) })) : [{ paso: p.id, grupo: p.id }]));
  return grupos.flatMap((g) => (OPCIONES[g.grupo] ?? []).filter((o) => o.id === seleccion[g.grupo] && !o.ninguna).map((o) => ({ ...o, paso: g.paso, grupo: g.grupo })));
}

type Configuracion = { seleccion: Record<string, string>; indice: number };

const CLAVE = "catbyte:configuracion";
const INICIAL: Configuracion = { seleccion: SELECCION_INICIAL, indice: 0 };

// Almacén en la sesión del navegador; si no está disponible (modo privado, bloqueado) queda en memoria.
let enMemoria = "";
const oyentes = new Set<() => void>();

function leer() {
  try {
    return sessionStorage.getItem(CLAVE) ?? "";
  } catch {
    return enMemoria;
  }
}

function escribir(valor: string) {
  try {
    sessionStorage.setItem(CLAVE, valor);
  } catch {
    enMemoria = valor;
  }
  oyentes.forEach((avisar) => avisar());
}

// La instantánea se recalcula solo cuando cambia el texto guardado, para que React reciba siempre el mismo objeto.
let ultimoTexto: string | null = null;
let ultimaConfig = INICIAL;
function instantanea(): Configuracion {
  const texto = leer();
  if (texto !== ultimoTexto) {
    ultimoTexto = texto;
    try {
      ultimaConfig = texto ? { ...INICIAL, ...JSON.parse(texto) } : INICIAL;
    } catch {
      ultimaConfig = INICIAL;
    }
  }
  return ultimaConfig;
}

function suscribir(avisar: () => void) {
  oyentes.add(avisar);
  return () => oyentes.delete(avisar);
}

/**
 * Configuración en curso, guardada en la sesión del navegador para que el resumen la lea y sobreviva a una recarga.
 * En el servidor no hay sesión: `cargada` es false hasta que el navegador la lee.
 */
export function useConfiguracion() {
  const config = useSyncExternalStore(suscribir, instantanea, () => null);
  const actual = config ?? INICIAL;
  const guardar = (cambio: Partial<Configuracion>) => escribir(JSON.stringify({ ...instantanea(), ...cambio }));
  return {
    cargada: config !== null,
    seleccion: actual.seleccion,
    indice: actual.indice,
    setSeleccion: (cambiar: (s: Record<string, string>) => Record<string, string>) => guardar({ seleccion: cambiar(instantanea().seleccion) }),
    setIndice: (indice: number) => guardar({ indice }),
  };
}

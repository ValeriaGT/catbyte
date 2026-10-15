"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Boton,
  BotonHerramienta,
  CardOpcion,
  CarruselOpciones,
  ChipFiltro,
  clasesBoton,
  cx,
  DetalleOpcion,
  FilaOpcion,
  PasosConfigurador,
  Pestanas,
  VisorPC,
} from "@catbyte/ui";
import { clave, OPCIONES, PASOS, SELECCION_INICIAL, VISTA_FILAS, type Opcion } from "@/content/personaliza";

// Formato de Figma: punto para miles y apóstrofo para millones ($3’045.000).
const pesos = (n: number) => {
  const millones = Math.floor(n / 1_000_000);
  if (!millones) return `$${n.toLocaleString("es-CO")}`;
  const resto = String(n % 1_000_000).padStart(6, "0");
  return `$${millones}’${resto.slice(0, 3)}.${resto.slice(3)}`;
};

const DECORACION = {
  textura: "/personaliza/detalle/textura.png",
  trazo: "/personaliza/detalle/trazo.png",
  arriba: "/personaliza/detalle/cable-mano.png",
  izquierda: "/personaliza/detalle/mano-destornillador.png",
};

type Orden = "ninguno" | "menor" | "mayor";
const SIGUIENTE_ORDEN: Record<Orden, Orden> = { ninguno: "menor", menor: "mayor", mayor: "ninguno" };
const TEXTO_ORDEN: Record<Orden, string> = { ninguno: "Ordenar", menor: "Menor precio", mayor: "Mayor precio" };

/** Visor con el total a la izquierda; pasos, opciones del paso actual y navegación a la derecha. */
export function Configurador() {
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(SELECCION_INICIAL);
  const [filtro, setFiltro] = useState<string | null>(null);
  const [verFiltros, setVerFiltros] = useState(false);
  const [orden, setOrden] = useState<Orden>("ninguno");
  const [detalle, setDetalle] = useState<Opcion | null>(null);
  const [subpaso, setSubpaso] = useState<string | undefined>(undefined);

  const paso = PASOS[indice];
  const sub = paso.subpasos?.find((s) => s.id === subpaso) ?? paso.subpasos?.[0];
  const grupo = clave(paso.id, sub?.id);
  const enFilas = VISTA_FILAS.has(paso.id);
  const opciones = OPCIONES[grupo] ?? [];
  const ultimo = indice === PASOS.length - 1;
  const etiquetas = [...new Set(opciones.flatMap((o) => (o.etiqueta ? [o.etiqueta] : [])))];
  const visibles = (filtro ? opciones.filter((o) => o.etiqueta === filtro) : opciones).toSorted((a, b) =>
    orden === "ninguno" ? 0 : orden === "menor" ? a.precio - b.precio : b.precio - a.precio,
  );

  // Piezas elegidas, en el orden de los pasos y pestañas. Las "Sin …" no cuentan.
  const grupos = PASOS.flatMap((p) => (p.subpasos ? p.subpasos.map((s) => ({ paso: p.id, grupo: clave(p.id, s.id) })) : [{ paso: p.id, grupo: p.id }]));
  const elegidas = grupos.flatMap((g) => (OPCIONES[g.grupo] ?? []).filter((o) => o.id === seleccion[g.grupo] && !o.ninguna).map((o) => ({ ...o, paso: g.paso })));
  const total = elegidas.reduce((suma, o) => suma + o.precio, 0);
  const caseElegido = OPCIONES.case.find((o) => o.id === seleccion.case);

  const irA = (i: number) => {
    setIndice(i);
    setFiltro(null);
    setVerFiltros(false);
    setOrden("ninguno");
    setSubpaso(undefined);
  };
  const elegir = (id: string) => setSeleccion((s) => ({ ...s, [grupo]: id }));

  return (
    <div className="grid gap-40 lg:grid-cols-[minmax(0,456px)_minmax(0,1fr)] lg:gap-45">
      <VisorPC
        total={pesos(total)}
        imagen={caseElegido?.imagen}
        etiquetas={elegidas.map((o) => o.resumen ?? o.nombre)}
        className="mx-auto lg:mx-0"
      />

      <div className="flex min-w-0 flex-col">
        <PasosConfigurador
          pasos={PASOS}
          activo={paso.id}
          completados={elegidas.map((o) => o.paso)}
          onSeleccionar={(id) => irA(PASOS.findIndex((p) => p.id === id))}
        />

        {paso.subpasos && sub && (
          <Pestanas
            etiqueta={`Opciones de ${paso.etiqueta}`}
            pestanas={paso.subpasos}
            activa={sub.id}
            onCambiar={(id) => {
              setSubpaso(id);
              setFiltro(null);
              setVerFiltros(false);
            }}
            className="mt-24"
          />
        )}

        {opciones.length > 0 ? (
          <>
            <div className="mt-24 flex flex-wrap items-center justify-end gap-8">
              {verFiltros &&
                [null, ...etiquetas].map((e) => (
                  <ChipFiltro key={e ?? "todas"} activo={filtro === e} onClick={() => setFiltro(e)}>
                    {e ?? "Todas"}
                  </ChipFiltro>
                ))}
              {enFilas && (
                <BotonHerramienta icono="ordenar" aria-pressed={orden !== "ninguno"} onClick={() => setOrden(SIGUIENTE_ORDEN[orden])}>
                  {TEXTO_ORDEN[orden]}
                </BotonHerramienta>
              )}
              <BotonHerramienta icono="filtro" aria-expanded={verFiltros} onClick={() => setVerFiltros((v) => !v)}>
                Filtrar
              </BotonHerramienta>
            </div>
            <CarruselOpciones key={grupo} etiqueta={`Opciones de ${sub?.etiqueta ?? paso.etiqueta}`} direccion={enFilas ? "vertical" : "horizontal"} className={cx(enFilas ? "mt-24" : "mt-4")}>
              {visibles.map((o) => {
                const props = {
                  grupo,
                  valor: o.id,
                  nombre: o.nombre,
                  precio: pesos(o.precio),
                  etiqueta: o.etiqueta,
                  colorEtiqueta: o.colorEtiqueta,
                  imagen: o.imagen,
                  icono: paso.icono,
                  seleccionada: seleccion[grupo] === o.id,
                  onSeleccionar: elegir,
                };
                return enFilas ? (
                  <FilaOpcion key={o.id} {...props} onVerMas={o.detalle ? () => setDetalle(o) : undefined} />
                ) : (
                  <CardOpcion key={o.id} {...props} apagada={o.ninguna} />
                );
              })}
            </CarruselOpciones>
          </>
        ) : (
          <p className="cuerpo-1 mt-56 rounded-8 border border-dashed border-borde-default px-24 py-64 text-center text-texto-secundario">
            Muy pronto podrás elegir tu {paso.etiqueta.toLowerCase()} aquí.
          </p>
        )}

        <div className="mt-32 flex gap-16">
          {indice === 0 ? (
            <Link href="/" className={cx(clasesBoton("secundario"), "flex-1")}>
              Atrás
            </Link>
          ) : (
            <Boton tipo="secundario" className="flex-1" onClick={() => irA(indice - 1)}>
              Atrás
            </Boton>
          )}
          {/* "Ver resumen" queda desactivado hasta tener el diseño de la pantalla de resumen. */}
          <Boton className="flex-1" disabled={ultimo} title={ultimo ? "Pronto" : undefined} onClick={() => irA(indice + 1)}>
            {ultimo ? "Ver resumen" : "Siguiente"}
          </Boton>
        </div>
      </div>

      {detalle?.detalle && (
        <DetalleOpcion
          abierto
          onCerrar={() => setDetalle(null)}
          titulo={detalle.nombre}
          imagen={detalle.imagen}
          detalle={detalle.detalle}
          decoracion={DECORACION}
        />
      )}
    </div>
  );
}

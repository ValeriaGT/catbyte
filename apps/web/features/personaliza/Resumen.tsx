"use client";

import Link from "next/link";
import { useState } from "react";
import { Boton, clasesBoton, cx, ResumenCompra, VisorPC } from "@catbyte/ui";
import { OPCIONES } from "@/content/personaliza";
import { pesos, piezasElegidas, useConfiguracion } from "./estado";

/** Visor con el total y la lista de piezas; desmarcar una la saca del total. */
export function Resumen() {
  const { cargada, seleccion } = useConfiguracion();
  const [excluidas, setExcluidas] = useState<Set<string>>(new Set());

  const elegidas = piezasElegidas(seleccion);
  const total = elegidas.filter((o) => !excluidas.has(o.grupo)).reduce((suma, o) => suma + o.precio, 0);
  const caseElegido = OPCIONES.case.find((o) => o.id === seleccion.case);

  const alternar = (grupo: string) =>
    setExcluidas((actual) => {
      const nuevo = new Set(actual);
      if (!nuevo.delete(grupo)) nuevo.add(grupo);
      return nuevo;
    });

  // Hasta leer la sesión no se muestra nada, para no enseñar un resumen equivocado por un instante.
  if (!cargada) return <div className="min-h-429" />;

  return (
    <div className="grid items-center gap-40 lg:grid-cols-[minmax(0,456px)_minmax(0,1fr)] lg:gap-45">
      <VisorPC total={pesos(total)} imagen={caseElegido?.imagen} className="mx-auto lg:mx-0" />
      <ResumenCompra
        className="mx-auto"
        lineas={elegidas.map((o) => ({
          id: o.grupo,
          nombre: o.nombre,
          precio: pesos(o.precio),
          href: `/personaliza#paso-${o.paso}`,
          incluida: !excluidas.has(o.grupo),
        }))}
        total={pesos(total)}
        onAlternar={alternar}
        acciones={
          <>
            <Link href="/personaliza" className={cx(clasesBoton("secundario", "pequeno"), "flex-1")}>
              Atrás
            </Link>
            {/* "Ir a pagar" queda desactivado hasta tener el diseño del pago. */}
            <Boton tamano="pequeno" className="flex-1" disabled title="Disponible pronto">
              Ir a pagar
            </Boton>
          </>
        }
      />
    </div>
  );
}

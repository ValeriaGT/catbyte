"use client";

import Link from "next/link";
import { Boton, clasesBoton, cx, ResumenCompra, VisorPC } from "@catbyte/ui";
import { OPCIONES } from "@/content/personaliza";
import { pesos, piezasElegidas, useConfiguracion } from "./estado";

/** Visor con el total y la lista de piezas; desmarcar una la saca del total. */
export function Resumen() {
  const { cargada, seleccion, excluidas: lista, setExcluidas } = useConfiguracion();
  const excluidas = new Set(lista);

  const elegidas = piezasElegidas(seleccion);
  const total = elegidas.filter((o) => !excluidas.has(o.grupo)).reduce((suma, o) => suma + o.precio, 0);
  const caseElegido = OPCIONES.case.find((o) => o.id === seleccion.case);

  const alternar = (grupo: string) => setExcluidas(excluidas.has(grupo) ? lista.filter((g) => g !== grupo) : [...lista, grupo]);

  // Hasta leer la sesión no se muestra nada, para no enseñar un resumen equivocado por un instante.
  if (!cargada) return <div className="min-h-429" />;

  return (
    <div className="grid items-center gap-40 lg:grid-cols-[minmax(0,456px)_minmax(0,1fr)] lg:gap-45">
      <VisorPC total={pesos(total)} imagen={caseElegido?.imagen} vistas={caseElegido?.vistas} className="mx-auto lg:mx-0" />
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
            {total > 0 ? (
              <Link href="/personaliza/pago" className={cx(clasesBoton("primario", "pequeno"), "flex-1")}>
                Ir a pagar
              </Link>
            ) : (
              <Boton tamano="pequeno" className="flex-1" disabled>
                Ir a pagar
              </Boton>
            )}
          </>
        }
      />
    </div>
  );
}

"use client";

import Link from "next/link";
import { Boton, clasesBoton, cx, SeguimientoPedido, TarjetaPedido } from "@catbyte/ui";
import { ENVIOS, etapasPedido } from "@/content/pago";
import { pesos, useConfiguracion } from "./estado";

// Días hábiles a partir de una fecha (salta sábados y domingos).
function sumarDiasHabiles(desde: Date, dias: number) {
  const fecha = new Date(desde);
  while (dias > 0) {
    fecha.setDate(fecha.getDate() + 1);
    if (fecha.getDay() !== 0 && fecha.getDay() !== 6) dias--;
  }
  return fecha;
}

const fechaCorta = (f: Date) => f.toLocaleDateString("es-CO", { day: "numeric", month: "short" });

/** Compra exitosa: número de pedido, seguidor del pedido y resumen. "Descargar PDF" abre la impresión del navegador. */
export function CompraExitosa() {
  const { cargada, pedido } = useConfiguracion();

  if (!cargada) return <div className="min-h-[60vh]" />;
  if (!pedido) {
    return (
      <p className="cuerpo-1 text-center text-texto-principal">
        No encontramos un pedido reciente.{" "}
        <Link href="/personaliza" className="text-texto-marca underline">
          Arma tu computador
        </Link>
      </p>
    );
  }

  const envio = ENVIOS.find((e) => e.id === pedido.envio) ?? ENVIOS[0];
  const fecha = new Date(pedido.fecha);
  const entrega = sumarDiasHabiles(fecha, envio.dias);
  // Fechas estimadas de cada etapa, repartidas hasta la entrega.
  const etapas = etapasPedido(envio.id).map((titulo, i, todas) => ({
    titulo,
    detalle: fechaCorta(i === 0 ? fecha : sumarDiasHabiles(fecha, Math.max(1, Math.round((envio.dias * i) / (todas.length - 1))))),
  }));

  return (
    <div className="mx-auto flex w-full max-w-720 flex-col items-center gap-32 text-center">
      <div className="flex flex-col items-center gap-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/checkout/exito.svg" alt="" width={71} height={73} />
        <div className="flex flex-col gap-8">
          <h1 className="titulo-5 text-texto-principal">¡Compra exitosa!</h1>
          <p className="cuerpo-2 text-texto-principal">Gracias por tu compra. Tu PC está en camino</p>
        </div>
        <p className="cuerpo-2 rounded-8 border border-borde-default bg-fondo-vitrina/30 p-10 text-texto-principal">
          Pedido: <span className="text-texto-marca">{pedido.numero}</span>
        </p>
      </div>

      <section aria-labelledby="seguimiento" className="flex w-full flex-col gap-16 rounded-16 border border-borde-sutil bg-fondo-superficie/60 p-24">
        <div className="flex flex-col items-center gap-4">
          <h2 id="seguimiento" className="titulo-7 text-texto-principal">
            Sigue tu pedido
          </h2>
          <p className="cuerpo-3 text-texto-secundario">
            {envio.id === "tienda" ? "Listo para recoger" : "Entrega estimada"}: <span className="text-texto-marca">{entrega.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })}</span>
          </p>
        </div>
        <SeguimientoPedido etapas={etapas} actual={1} />
      </section>

      <section aria-labelledby="resumen-pedido" className="flex w-full max-w-580 flex-col gap-16">
        <h2 id="resumen-pedido" className="titulo-7 text-texto-principal">
          Resumen del pedido
        </h2>
        <TarjetaPedido nombre="CATBYTE XGP" piezas={pedido.piezas} total={pesos(pedido.total)} imagen={pedido.imagen} className="text-left" />
        <div className="flex flex-col gap-16 sm:flex-row print:hidden">
          <Link href="/" className={cx(clasesBoton("secundario", "pequeno"), "flex-1")}>
            Ir al home
          </Link>
          <Boton tamano="pequeno" className="flex-1" onClick={() => window.print()}>
            Descargar PDF
          </Boton>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  Boton,
  CampoCompra,
  CasillaVerificacion,
  clasesBoton,
  cx,
  OpcionEnvio,
  OpcionPago,
  Pestanas,
  SeccionCompra,
} from "@catbyte/ui";
import { DOCUMENTOS, ENVIOS, PAGOS, PAISES } from "@/content/pago";
import { OPCIONES } from "@/content/personaliza";
import { pesos, piezasElegidas, useConfiguracion } from "./estado";

const ICONO = (nombre: string, ancho = 22) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={`/checkout/${nombre}.svg`} alt="" width={ancho} className="h-auto max-w-none" />
);

const LOGO_PAGO: Record<string, React.ReactNode> = {
  tarjeta: ICONO("pago-tarjeta", 48),
  pse: (
    <span className="relative flex size-48">
      {ICONO("pago-pse", 48)}
      <span className="absolute inset-x-0 top-[40%] flex justify-center">{ICONO("pago-pse-texto", 40)}</span>
    </span>
  ),
  nequi: ICONO("pago-nequi", 48),
};

type Datos = Record<string, string>;

// Número de pedido con el formato de Figma: CAT-AAAA-NNNNNN.
const numeroPedido = () => `CAT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0")}`;

// Reglas de cada campo; devuelven el mensaje de error o nada.
const REGLAS: Record<string, (v: string, d: Datos) => string | undefined> = {
  nombre: (v) => (v.trim().length < 3 ? "Escribe tu nombre completo" : undefined),
  correo: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? undefined : "Escribe un correo válido"),
  telefono: (v) => (/^\d{10}$/.test(v.replace(/\s/g, "")) ? undefined : "El teléfono debe tener 10 dígitos"),
  ciudad: (v) => (v.trim() ? undefined : "Escribe tu ciudad"),
  postal: (v, d) => (d.envio === "tienda" || /^\d{6}$/.test(v) ? undefined : "Escribe tu código postal (6 dígitos)"),
  direccion: (v, d) => (d.envio === "tienda" || v.trim() ? undefined : "Escribe la dirección de entrega"),
  tipoDoc: (v) => (v ? undefined : "Elige el tipo de documento"),
  numeroDoc: (v) => (/^\d{5,12}$/.test(v) ? undefined : "Escribe un número de documento válido"),
  titular: (v, d) => (d.pago !== "tarjeta" || v.trim().length >= 3 ? undefined : "Escribe el nombre como aparece en la tarjeta"),
  tarjeta: (v, d) => (d.pago !== "tarjeta" || /^\d{16}$/.test(v.replace(/\s/g, "")) ? undefined : "La tarjeta debe tener 16 dígitos"),
  vencimiento: (v, d) => {
    if (d.pago !== "tarjeta") return;
    const [anio, mes] = v.split("-").map(Number);
    const hoy = new Date();
    return anio && mes && (anio > hoy.getFullYear() || (anio === hoy.getFullYear() && mes >= hoy.getMonth() + 1)) ? undefined : "La tarjeta está vencida o falta la fecha";
  },
  cvv: (v, d) => (d.pago !== "tarjeta" || /^\d{3,4}$/.test(v) ? undefined : "El CVV tiene 3 o 4 dígitos"),
  nequi: (v, d) => (d.pago !== "nequi" || /^3\d{9}$/.test(v) ? undefined : "Escribe el celular de tu cuenta Nequi"),
  terminos: (v) => (v === "si" ? undefined : "Debes aceptar los términos para continuar"),
};

/** Checkout: contacto, dirección, envío y pago. Al pagar guarda el pedido y lleva a la compra exitosa. */
export function Pago() {
  const router = useRouter();
  const { cargada, seleccion, excluidas, confirmarPedido } = useConfiguracion();
  const [datos, setDatos] = useState<Datos>({ pais: "CO", envio: "estandar", pago: "tarjeta", terminos: "" });
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [cuenta, setCuenta] = useState("invitado");

  const piezas = piezasElegidas(seleccion).filter((o) => !excluidas.includes(o.grupo));
  const subtotal = piezas.reduce((s, o) => s + o.precio, 0);
  const envio = ENVIOS.find((e) => e.id === datos.envio)!;
  const total = subtotal + envio.precio;

  const cambiar = (campo: string, valor: string) => {
    setDatos((d) => ({ ...d, [campo]: valor }));
    if (errores[campo]) setErrores((er) => Object.fromEntries(Object.entries(er).filter(([c]) => c !== campo)));
  };
  const campo = (nombre: string) => ({
    name: nombre,
    value: datos[nombre] ?? "",
    error: errores[nombre],
    onChange: (e: { target: { value: string } }) => cambiar(nombre, e.target.value),
    onBlur: () => {
      const error = REGLAS[nombre]?.(datos[nombre] ?? "", datos);
      if (error) setErrores((er) => ({ ...er, [nombre]: error }));
    },
  });

  const pagar = (e: FormEvent) => {
    e.preventDefault();
    const nuevos = Object.fromEntries(
      Object.entries(REGLAS).flatMap(([c, regla]) => {
        const error = regla(datos[c] ?? "", datos);
        return error ? [[c, error]] : [];
      }),
    );
    setErrores(nuevos);
    const primero = Object.keys(nuevos)[0];
    if (primero) {
      const selector = primero === "terminos" ? 'form input[type="checkbox"]' : `[name="${primero}"]`;
      document.querySelector<HTMLElement>(selector)?.focus();
      return;
    }
    const caseElegido = OPCIONES.case.find((o) => o.id === seleccion.case);
    confirmarPedido({
      numero: numeroPedido(),
      fecha: new Date().toISOString(),
      piezas: piezas.map((o) => o.resumen ?? o.nombre),
      total,
      envio: envio.id,
      imagen: caseElegido?.imagen,
    });
    router.push("/personaliza/compra-exitosa");
  };

  if (!cargada) return <div className="min-h-[60vh]" />;

  if (subtotal === 0) {
    return (
      <p className="cuerpo-1 text-texto-principal">
        Tu carrito está vacío.{" "}
        <Link href="/personaliza" className="text-texto-marca underline">
          Arma tu computador
        </Link>
      </p>
    );
  }

  return (
    <form noValidate onSubmit={pagar} className="mx-auto flex w-full max-w-1040 flex-col gap-24">
      <SeccionCompra titulo="Información de Contacto" icono={ICONO("gato")}>
        <Pestanas
          etiqueta="Cómo quieres comprar"
          tamano="grande"
          pestanas={[
            { id: "invitado", etiqueta: "Continuar como invitado" },
            { id: "sesion", etiqueta: "Iniciar sesión" },
          ]}
          activa={cuenta}
          onCambiar={setCuenta}
        />
        {cuenta === "sesion" && (
          <p className="cuerpo-3 text-center text-texto-secundario">El inicio de sesión llega pronto. Por ahora puedes comprar como invitado.</p>
        )}
        <div className="flex flex-col gap-16 lg:px-110">
          <CampoCompra etiqueta="Nombre completo*" icono={ICONO("gato")} placeholder="Juanito Pérez" autoComplete="name" {...campo("nombre")} />
          <CampoCompra etiqueta="Correo electrónico*" icono={ICONO("correo")} type="email" placeholder="juanito@gmail.com" autoComplete="email" {...campo("correo")} />
          <CampoCompra etiqueta="Teléfono*" icono={ICONO("celular", 18)} type="tel" inputMode="numeric" placeholder="3210987865" autoComplete="tel" {...campo("telefono")} />
        </div>
      </SeccionCompra>

      <SeccionCompra titulo="Dirección de Envío" icono={ICONO("ubicacion")}>
        <div className="grid gap-x-16 lg:grid-cols-2 lg:px-110">
          <CampoCompra etiqueta="País*" icono={ICONO("ubicacion")} opciones={PAISES} autoComplete="country" className="lg:col-span-2" {...campo("pais")} />
          <CampoCompra etiqueta="Ciudad*" icono={ICONO("ubicacion")} placeholder="Bogotá" autoComplete="address-level2" {...campo("ciudad")} />
          <CampoCompra etiqueta="Código Postal*" icono={<span className="titulo-6 text-texto-principal">#</span>} inputMode="numeric" placeholder="110110" autoComplete="postal-code" {...campo("postal")} />
          <CampoCompra etiqueta="Dirección*" icono={ICONO("ubicacion")} placeholder="Calle 123 #11-11" autoComplete="street-address" {...campo("direccion")} />
          <CampoCompra etiqueta="Información adicional" icono={ICONO("casa")} placeholder="Apto, barrio, oficina…" {...campo("adicional")} />
        </div>
      </SeccionCompra>

      <SeccionCompra titulo="Método de Envío" icono={ICONO("tienda-titulo")}>
        <div role="radiogroup" aria-label="Método de envío" className="flex flex-col gap-16 lg:px-110">
          {ENVIOS.map((e) => (
            <OpcionEnvio
              key={e.id}
              grupo="envio"
              valor={e.id}
              seleccionada={datos.envio === e.id}
              onSeleccionar={(v) => cambiar("envio", v)}
              icono={ICONO(e.icono.replace("/checkout/", "").replace(".svg", ""), 50)}
              nombre={e.nombre}
              precio={e.precio ? pesos(e.precio) : "GRATIS"}
              plazo={e.plazo}
            />
          ))}
        </div>
      </SeccionCompra>

      <SeccionCompra titulo="Método de Pago" icono={ICONO("gato")}>
        <div role="radiogroup" aria-label="Método de pago" className="grid gap-16 sm:grid-cols-3">
          {PAGOS.map((p) => (
            <OpcionPago
              key={p.id}
              grupo="pago"
              valor={p.id}
              seleccionada={datos.pago === p.id}
              onSeleccionar={(v) => cambiar("pago", v)}
              icono={LOGO_PAGO[p.id]}
              nombre={p.nombre}
            />
          ))}
        </div>
        <div className="grid gap-x-16 lg:grid-cols-2 lg:px-110">
          <CampoCompra etiqueta="Tipo de documento*" icono={ICONO("documento")} opciones={DOCUMENTOS} {...campo("tipoDoc")} />
          <CampoCompra etiqueta="Número de documento*" icono={<span className="titulo-6 text-texto-principal">#</span>} inputMode="numeric" placeholder="1028765467" {...campo("numeroDoc")} />
          {datos.pago === "tarjeta" && (
            <>
              <CampoCompra etiqueta="Nombre del titular*" icono={ICONO("gato")} placeholder="Pepe Pérez" autoComplete="cc-name" className="lg:col-span-2" {...campo("titular")} />
              <CampoCompra
                etiqueta="Número de la tarjeta*"
                icono={ICONO("tarjeta")}
                inputMode="numeric"
                placeholder="1098 8909 9876 8763"
                autoComplete="cc-number"
                className="lg:col-span-2"
                {...campo("tarjeta")}
                onChange={(e) => cambiar("tarjeta", e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 "))}
              />
              <CampoCompra etiqueta="Fecha de vencimiento*" icono={ICONO("calendario")} type="month" autoComplete="cc-exp" {...campo("vencimiento")} />
              <CampoCompra etiqueta="CVV*" icono={ICONO("clave")} inputMode="numeric" maxLength={4} placeholder="000" autoComplete="cc-csc" {...campo("cvv")} />
            </>
          )}
          {datos.pago === "pse" && (
            <p className="cuerpo-2 p-10 text-texto-secundario lg:col-span-2">Al pagar te llevaremos a PSE para que elijas tu banco y termines el pago.</p>
          )}
          {datos.pago === "nequi" && (
            <CampoCompra etiqueta="Celular de Nequi*" icono={ICONO("celular", 18)} inputMode="numeric" placeholder="3001234567" className="lg:col-span-2" {...campo("nequi")} />
          )}
        </div>
      </SeccionCompra>

      <div className="flex flex-col gap-8 rounded-8 px-4 text-texto-principal">
        <p className="cuerpo-2 flex justify-between">
          <span>Piezas</span>
          <span>{pesos(subtotal)}</span>
        </p>
        <p className="cuerpo-2 flex justify-between">
          <span>{envio.nombre}</span>
          <span>{envio.precio ? pesos(envio.precio) : "GRATIS"}</span>
        </p>
      </div>

      <CasillaVerificacion marcada={datos.terminos === "si"} onCambiar={(m) => cambiar("terminos", m ? "si" : "")} error={errores.terminos}>
        <span className="cuerpo-2 sm:cuerpo-1">Acepto Términos y Condiciones y la Política de Privacidad de CATBYTE.</span>
      </CasillaVerificacion>

      <div className="flex flex-col gap-16 sm:flex-row">
        <Link href="/personaliza/resumen" className={cx(clasesBoton("secundario", "pequeno"), "flex-1")}>
          Cancelar
        </Link>
        <Boton type="submit" tamano="pequeno" className="flex-1">
          Pagar {pesos(total)}
        </Boton>
      </div>
    </form>
  );
}

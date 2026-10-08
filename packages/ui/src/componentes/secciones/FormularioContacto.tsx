"use client";

import { cx } from "../../lib/cx";
import { Boton } from "../ui/Boton";
import { Campo } from "../ui/Campo";

const ESQUINA = { verde: "border-acento-verde", naranja: "border-acento-naranja" };
const POS = ["top-0 left-0 border-t-8 border-l-8", "top-0 right-0 border-t-8 border-r-8", "bottom-0 left-0 border-b-8 border-l-8", "bottom-0 right-0 border-b-8 border-r-8"];

/** Figma: Formularios › Formulario de contacto (Campo ×3 + Botón primario + esquinas de acento). */
export function FormularioContacto({ acento = "verde" }: { acento?: keyof typeof ESQUINA }) {
  return (
    <div className="relative w-full max-w-440 p-16">
      {POS.map((p) => (
        <span key={p} aria-hidden="true" className={cx("absolute size-56", p, ESQUINA[acento])} />
      ))}
      <form className="flex flex-col gap-24 rounded-8 bg-fondo-superficie-alta p-24" onSubmit={(e) => e.preventDefault()}>
        <h2 className="titulo-5 text-center text-texto-principal">Contáctanos</h2>
        <Campo etiqueta="Nombre" name="nombre" placeholder="Escribe tu nombre" autoComplete="name" required />
        <Campo etiqueta="Email" name="email" type="email" placeholder="Escribe tu email" autoComplete="email" required />
        <Campo etiqueta="Mensaje" name="mensaje" placeholder="Escribe tu mensaje..." required />
        <Boton type="submit" tamano="pequeno" className="w-full">
          Enviar
        </Boton>
      </form>
    </div>
  );
}

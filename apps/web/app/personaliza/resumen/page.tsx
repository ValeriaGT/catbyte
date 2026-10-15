import type { Metadata } from "next";
import Image from "next/image";
import { Footer, Header, Migas } from "@catbyte/ui";
import { BotonChat } from "@/features/comun/BotonChat";
import { Resumen } from "@/features/personaliza/Resumen";

export const metadata: Metadata = { title: "Resumen de tu compra · CatByte" };

/** Resumen de compra del configurador (Figma original › Prototipo › WireFrame PC's Personalizado, nodo 1053:3748). */
export default function ResumenCompraPagina() {
  return (
    <>
      <Header />
      <main className="relative flex-1 overflow-x-clip bg-fondo-superficie-alta">
        <Image src="/personaliza/fondo-nave.jpg" alt="" fill sizes="100vw" className="pointer-events-none object-cover object-right-top opacity-15" />
        <div className="relative mx-auto flex max-w-1330 flex-col gap-32 px-20 pt-24 pb-80">
          <Migas
            ruta={[
              { texto: "Inicio", href: "/" },
              { texto: "Personaliza", href: "/personaliza" },
            ]}
            actual="Resumen de compra"
          />
          <h1 className="titulo-5 text-texto-principal">Resumen de tu compra</h1>
          <Resumen />
        </div>
      </main>
      <Footer variante="compacto" />
      <BotonChat />
    </>
  );
}

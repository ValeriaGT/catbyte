import type { Metadata } from "next";
import Image from "next/image";
import { Footer, Header, Migas } from "@catbyte/ui";
import { BotonChat } from "@/features/comun/BotonChat";
import { CompraExitosa } from "@/features/personaliza/CompraExitosa";

export const metadata: Metadata = { title: "Compra exitosa · CatByte" };

/** Figma original › Prototipo › compra exitosa, nodo 1580:6788. */
export default function Pagina() {
  return (
    <>
      <Header />
      <main className="relative flex-1 overflow-x-clip bg-fondo-superficie-alta">
        <Image src="/checkout/textura.png" alt="" fill sizes="100vw" className="pointer-events-none object-cover opacity-10" />
        <div className="relative mx-auto flex max-w-1330 flex-col gap-32 px-20 pt-24 pb-80">
          <Migas
            ruta={[
              { texto: "Inicio", href: "/" },
              { texto: "Personaliza", href: "/personaliza" },
              { texto: "Resumen de compra", href: "/personaliza/resumen" },
            ]}
            actual="Compra exitosa"
          />
          
          <CompraExitosa />
        </div>
      </main>
      <Footer variante="compacto" />
      <BotonChat />
    </>
  );
}

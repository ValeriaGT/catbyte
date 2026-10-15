import type { Metadata } from "next";
import Image from "next/image";
import { Footer, Header, Migas } from "@catbyte/ui";
import { BotonChat } from "@/features/comun/BotonChat";
import { Configurador } from "@/features/personaliza/Configurador";

export const metadata: Metadata = { title: "Personaliza tu PC · CatByte" };

/** Configurador de PC (Figma original › Prototipo › WireFrame PC's Personalizado, nodo 1043:5104). */
export default function Personaliza() {
  return (
    <>
      <Header />
      <main className="relative flex-1 overflow-x-clip bg-fondo-superficie-alta">
        <Image src="/personaliza/fondo-nave.jpg" alt="" fill sizes="100vw" className="pointer-events-none object-cover object-right-top opacity-15" />
        <div className="relative mx-auto flex max-w-1330 flex-col gap-24 px-20 pt-24 pb-80">
          <Migas ruta={[{ texto: "Inicio", href: "/" }]} actual="Personaliza" />
          <h1 className="sr-only">Personaliza tu PC</h1>
          <Configurador />
        </div>
      </main>
      <Footer variante="compacto" />
      <BotonChat />
    </>
  );
}

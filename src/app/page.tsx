import Link from "next/link";
import { clasesBoton } from "@/components/ui/Boton";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Inicio() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-24 px-20 py-80 text-center">
        <h1 className="grafico-2 lg:grafico-1">Diseña tu estilo</h1>
        <p className="cuerpo-1 text-texto-secundario">La Home se construye en la siguiente fase.</p>
        <Link href="/sistema" className={clasesBoton()}>
          Ver el sistema de diseño
        </Link>
      </main>
      <Footer />
    </>
  );
}

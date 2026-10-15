import { Footer, Header } from "@catbyte/ui";
import { BotonChat } from "@/features/comun/BotonChat";
import { Cierre } from "@/features/home/Cierre";
import { Comunidad } from "@/features/home/Comunidad";
import { Contacto } from "@/features/home/Contacto";
import { DisenaTuEstilo } from "@/features/home/DisenaTuEstilo";
import { EquipoSonado } from "@/features/home/EquipoSonado";
import { EstilosYProductos } from "@/features/home/EstilosYProductos";
import { Hero } from "@/features/home/Hero";
import { Marcas } from "@/features/home/Marcas";

/** Home (Figma original › Prototipo › Home 1, nodo 889:10333). */
export default function Inicio() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <Marcas />
        <DisenaTuEstilo />
        <EquipoSonado />
        <EstilosYProductos />
        <Comunidad />
        <Contacto />
      </main>
      <Footer />
      <Cierre />
      <BotonChat />
    </>
  );
}

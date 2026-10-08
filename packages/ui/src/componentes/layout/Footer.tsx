import Link from "next/link";
import { Logo } from "../ui/Logo";

const COLUMNAS = {
  Productos: ["PC's personalizados", "PC's prearmados", "Laptops", "Componentes", "Periféricos"],
  Recursos: ["Tutoriales", "Soporte", "Garantía", "Envíos"],
  Empresa: ["Sobre nosotros", "Contacto", "Trabaja con nosotros", "Política de privacidad", "Términos y condiciones"],
};

/** Figma: Navegación › Footer. */
export function Footer() {
  return (
    <footer className="flex flex-col gap-32 bg-fondo-hundido px-20 py-48 lg:px-64">
      <div className="flex flex-col justify-between gap-48 lg:flex-row lg:gap-64">
        <div className="flex max-w-320 flex-col gap-16">
          <Logo color="claro" />
          <p className="cuerpo-4 text-texto-secundario">
            Personalización de computadores y periféricos. Tecnología sin límites para gamers, creadores y profesionales.
          </p>
          <address className="cuerpo-2 flex flex-col gap-4 not-italic text-texto-principal">
            <span>soporte@catbyte.com</span>
            <span>+57 321 456 7890</span>
            <span>Cra 12 #34-56</span>
          </address>
        </div>
        <div className="flex flex-wrap gap-48 lg:gap-64">
          {Object.entries(COLUMNAS).map(([titulo, items]) => (
            <nav key={titulo} aria-label={titulo} className="flex flex-col gap-12">
              <h2 className="cuerpo-2 uppercase text-texto-marca">{titulo}</h2>
              {items.map((i) => (
                <Link key={i} href="#" className="cuerpo-3 text-texto-secundario hover:text-texto-principal">
                  {i}
                </Link>
              ))}
            </nav>
          ))}
        </div>
      </div>
      <p className="cuerpo-4 border-t border-borde-sutil pt-24 text-texto-secundario">© 2026 CatByte. Todos los derechos reservados.</p>
    </footer>
  );
}

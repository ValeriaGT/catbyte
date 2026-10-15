import Link from "next/link";
import { Logo } from "../ui/Logo";

const COLUMNAS = {
  Productos: ["PC's personalizados", "PC's prearmados", "Laptops", "Componentes", "Periféricos"],
  Recursos: ["Tutoriales", "Soporte", "Garantía", "Envíos"],
  Empresa: ["Sobre nosotros", "Contacto", "Trabaja con nosotros", "Política de privacidad", "Términos y condiciones"],
};

const CONTACTO = ["soporte@catbyte.com", "+57 321 456 7890", "Cra 12 #34-56"];

/**
 * Figma: Navegación › Footer. `compacto` es la franja negra inclinada de los flujos de compra
 * (logo y datos de contacto en una línea).
 */
export function Footer({ variante = "completo" }: { variante?: "completo" | "compacto" }) {
  if (variante === "compacto") {
    return (
      <footer className="bg-fondo-hundido px-20 pt-56 pb-40 [clip-path:polygon(0_0,100%_28%,100%_100%,0_100%)] lg:px-64">
        <address className="cuerpo-2 mx-auto flex max-w-1092 flex-col items-center gap-16 not-italic text-texto-principal md:flex-row md:justify-between">
          <Logo color="claro" />
          {CONTACTO.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </address>
      </footer>
    );
  }
  return (
    <footer className="flex flex-col gap-32 bg-fondo-hundido px-20 py-48 lg:px-64">
      <div className="flex flex-col justify-between gap-48 lg:flex-row lg:gap-64">
        <div className="flex max-w-320 flex-col gap-16">
          <Logo color="claro" />
          <p className="cuerpo-4 text-texto-secundario">
            Personalización de computadores y periféricos. Tecnología sin límites para gamers, creadores y profesionales.
          </p>
          <address className="cuerpo-2 flex flex-col gap-4 not-italic text-texto-principal">
            {CONTACTO.map((c) => (
              <span key={c}>{c}</span>
            ))}
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

import Link from "next/link";
import { cx } from "@/lib/cx";
import { Icono } from "@/components/ui/Icono";
import { Logo } from "@/components/ui/Logo";

const ENLACES = [
  { href: "/pcs", texto: "PC's" },
  { href: "/laptops", texto: "Laptops" },
  { href: "/componentes", texto: "Componentes" },
  { href: "/perifericos", texto: "Periféricos" },
  { href: "/tutoriales", texto: "Tutoriales" },
  { href: "/descuentos", texto: "Descuentos" },
];

/** Figma: Navegación › Enlace de menú (Default / Hover / Activo). */
function EnlaceMenu({ href, activo, children }: { href: string; activo?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={activo ? "page" : undefined}
      className={cx(
        "cuerpo-1 border-b-2 px-12 py-8 text-texto-inverso transition-opacity",
        activo ? "border-b-4 border-borde-inverso" : "border-transparent hover:border-borde-inverso hover:opacity-75",
      )}
    >
      {children}
    </Link>
  );
}

const ACCION = "rounded-4 p-4 text-texto-inverso hover:opacity-75 focus-visible:outline-2 focus-visible:outline-borde-inverso";

/** Figma: Navegación › Header. Escritorio desde lg; en móvil se ve isotipo + menú hamburguesa. */
export function Header({ rutaActual }: { rutaActual?: string }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-fondo-marca px-20 py-12 lg:px-64 lg:py-16">
      <Link href="/" aria-label="CatByte, inicio">
        <Logo className="hidden lg:inline-block" />
        <Logo tipo="isotipo" className="lg:hidden" />
      </Link>
      <nav aria-label="Principal" className="hidden gap-8 lg:flex">
        {ENLACES.map((e) => (
          <EnlaceMenu key={e.href} href={e.href} activo={rutaActual === e.href}>
            {e.texto}
          </EnlaceMenu>
        ))}
      </nav>
      <div className="flex items-center gap-16">
        <button type="button" aria-label="Buscar" className={ACCION}><Icono nombre="buscar" /></button>
        <Link href="/carrito" aria-label="Carrito" className={ACCION}><Icono nombre="canasta" /></Link>
        <Link href="/cuenta" aria-label="Mi cuenta" className={cx(ACCION, "hidden lg:block")}><Icono nombre="usuario" /></Link>
        <button type="button" aria-label="Abrir menú" className={cx(ACCION, "lg:hidden")}><Icono nombre="menu" /></button>
      </div>
    </header>
  );
}

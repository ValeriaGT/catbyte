import Link from "next/link";
import { cx } from "../../lib/cx";
import { Icono } from "../ui/Icono";
import { Logo } from "../ui/Logo";

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
        "cuerpo-1 border-b-2 px-8 py-8 text-texto-inverso transition-opacity 2xl:px-12",
        activo ? "border-b-4 border-borde-inverso" : "border-transparent hover:border-borde-inverso hover:opacity-75",
      )}
    >
      {children}
    </Link>
  );
}

const ACCION = "rounded-4 p-4 text-texto-inverso hover:opacity-75 focus-visible:outline-2 focus-visible:outline-borde-inverso";

/** Figma: Navegación › Header. Escritorio desde 1280px (xl); por debajo, isotipo + menú hamburguesa. */
export function Header({ rutaActual }: { rutaActual?: string }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-24 bg-fondo-marca px-20 py-12 xl:px-32 xl:py-16 2xl:px-64">
      <Link href="/" aria-label="CatByte, inicio">
        <Logo className="hidden xl:inline-block" />
        <Logo tipo="isotipo" className="xl:hidden" />
      </Link>
      <nav aria-label="Principal" className="hidden xl:flex 2xl:gap-8">
        {ENLACES.map((e) => (
          <EnlaceMenu key={e.href} href={e.href} activo={rutaActual === e.href}>
            {e.texto}
          </EnlaceMenu>
        ))}
      </nav>
      <div className="flex items-center gap-16">
        <button type="button" aria-label="Buscar" className={ACCION}><Icono nombre="buscar" /></button>
        <Link href="/carrito" aria-label="Carrito" className={ACCION}><Icono nombre="canasta" /></Link>
        <Link href="/cuenta" aria-label="Mi cuenta" className={cx(ACCION, "hidden xl:block")}><Icono nombre="usuario" /></Link>
        <button type="button" aria-label="Abrir menú" className={cx(ACCION, "xl:hidden")}><Icono nombre="menu" /></button>
      </div>
    </header>
  );
}

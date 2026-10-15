"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cx } from "../../lib/cx";
import { Icono } from "../ui/Icono";
import { Logo } from "../ui/Logo";

type Enlace = { texto: string; href: string };
type Grupo = { titulo?: string; href?: string; enlaces: Enlace[] };
type ItemMenu = Enlace & { grupos?: Grupo[] };

const PREARMADOS = (base: string): Enlace[] => [
  { texto: "Gaming", href: `${base}/gaming` },
  { texto: "Diseño gráfico", href: `${base}/diseno-grafico` },
  { texto: "Audiovisual", href: `${base}/audiovisual` },
  { texto: "Desarrollo", href: `${base}/desarrollo` },
  { texto: "Arquitectura", href: `${base}/arquitectura` },
  { texto: "Inteligencia artificial", href: `${base}/ia` },
  { texto: "Todos", href: base },
];

// Opciones del Sitemap de Figma (página CatByte › Sitemap).
const MENU: ItemMenu[] = [
  {
    texto: "PC’S",
    href: "/pcs",
    grupos: [
      {
        titulo: "Personalizados",
        href: "/personaliza",
        enlaces: [
          { texto: "Arma tu computador", href: "/personaliza" },
          { texto: "Cases, skins, RGB y figuras 3D", href: "/personaliza" },
          { texto: "Procesador, gráfica, RAM y más", href: "/personaliza" },
        ],
      },
      { titulo: "Pre-armados", href: "/pcs", enlaces: PREARMADOS("/pcs") },
    ],
  },
  {
    texto: "Laptops",
    href: "/laptops",
    grupos: [
      {
        titulo: "Personaliza su diseño",
        enlaces: [
          { texto: "Skins", href: "/laptops/skins" },
          { texto: "Teclados", href: "/laptops/teclados" },
          { texto: "RGB", href: "/laptops/rgb" },
          { texto: "Keycaps", href: "/laptops/keycaps" },
        ],
      },
      {
        titulo: "Mejora sus componentes",
        enlaces: [
          { texto: "RAM", href: "/laptops/ram" },
          { texto: "Tarjeta gráfica", href: "/laptops/tarjeta-grafica" },
          { texto: "Almacenamiento", href: "/laptops/almacenamiento" },
        ],
      },
      { titulo: "Pre-armados", href: "/laptops", enlaces: PREARMADOS("/laptops") },
    ],
  },
  {
    texto: "Componentes",
    href: "/componentes",
    grupos: [
      {
        enlaces: [
          { texto: "Procesador", href: "/componentes/procesador" },
          { texto: "Tarjeta gráfica", href: "/componentes/tarjeta-grafica" },
          { texto: "RAM", href: "/componentes/ram" },
          { texto: "CPU", href: "/componentes/cpu" },
          { texto: "Sistema de refrigeración", href: "/componentes/refrigeracion" },
          { texto: "Almacenamiento", href: "/componentes/almacenamiento" },
          { texto: "Memorias", href: "/componentes/memorias" },
          { texto: "Todos", href: "/componentes" },
        ],
      },
    ],
  },
  {
    texto: "Periféricos",
    href: "/perifericos",
    grupos: [
      {
        enlaces: [
          { texto: "Teclado", href: "/perifericos/teclados" },
          { texto: "Mouse", href: "/perifericos/mouse" },
          { texto: "Pantalla", href: "/perifericos/pantallas" },
          { texto: "Todos", href: "/perifericos" },
        ],
      },
    ],
  },
  { texto: "Tutoriales", href: "/tutoriales" },
  { texto: "Descuentos", href: "/descuentos" },
];

// Figma (Menú): cada opción con 10 px de aire y 32 px entre opciones; entre 1280 y 1399 px se aprieta para que quepa.
const ITEM = "cuerpo-1 border-b-2 px-6 py-8 text-texto-inverso transition-opacity min-[1400px]:p-10";
const ACCION = "rounded-4 p-2 text-texto-inverso hover:opacity-75 focus-visible:outline-2 focus-visible:outline-borde-inverso";

/** Columnas de un submenú: título opcional (enlace) y su lista. */
function Grupos({ grupos, onElegir }: { grupos: Grupo[]; onElegir: () => void }) {
  return grupos.map((g, i) => (
    <div key={g.titulo ?? i} className="flex min-w-180 flex-col gap-12">
      {g.titulo &&
        (g.href ? (
          <Link href={g.href} onClick={onElegir} className="cuerpo-2 text-texto-marca uppercase hover:underline">
            {g.titulo}
          </Link>
        ) : (
          <p className="cuerpo-2 text-texto-marca uppercase">{g.titulo}</p>
        ))}
      <ul className={cx("flex flex-col gap-8", !g.titulo && g.enlaces.length > 5 && "sm:grid sm:grid-cols-2 sm:gap-x-48")}>
        {g.enlaces.map((e) => (
          <li key={e.texto}>
            <Link href={e.href} onClick={onElegir} className="cuerpo-3 text-texto-principal hover:text-texto-marca focus-visible:outline-2 focus-visible:outline-borde-marca">
              {e.texto}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ));
}

/**
 * Figma: Navegación › Header. Escritorio desde 1280px (xl): los ítems con submenú lo despliegan bajo el
 * header (al pasar el mouse o al pulsar). Por debajo, isotipo + menú hamburguesa con un panel completo.
 */
export function Header({ rutaActual }: { rutaActual?: string }) {
  const [abierto, setAbierto] = useState<string | null>(null);
  const [movil, setMovil] = useState(false);
  const cierre = useRef<ReturnType<typeof setTimeout>>(undefined);
  const raiz = useRef<HTMLElement>(null);

  // Esc cierra todo; un clic fuera del header cierra el submenú.
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(null);
        setMovil(false);
      }
    };
    const clic = (e: MouseEvent) => {
      if (!raiz.current?.contains(e.target as Node)) setAbierto(null);
    };
    document.addEventListener("keydown", tecla);
    document.addEventListener("mousedown", clic);
    return () => {
      document.removeEventListener("keydown", tecla);
      document.removeEventListener("mousedown", clic);
    };
  }, []);

  // Con el panel móvil abierto la página no se desplaza por detrás.
  useEffect(() => {
    document.body.style.overflow = movil ? "hidden" : "";
  }, [movil]);

  const abrir = (texto: string) => {
    clearTimeout(cierre.current);
    setAbierto(texto);
  };
  const cerrarLuego = () => {
    cierre.current = setTimeout(() => setAbierto(null), 150);
  };
  const cerrar = () => {
    setAbierto(null);
    setMovil(false);
  };
  const actual = MENU.find((m) => m.texto === abierto);

  return (
    <header ref={raiz} className="sticky top-0 z-30 bg-fondo-marca" onMouseLeave={cerrarLuego}>
      <div className="flex items-center justify-between gap-24 px-20 py-12 xl:px-32 xl:py-16 min-[1400px]:pr-68 min-[1400px]:pl-76">
        <Link href="/" aria-label="CatByte, inicio" onClick={cerrar}>
          <Logo className="hidden xl:inline-block" />
          <Logo tipo="isotipo" className="xl:hidden" />
        </Link>
        <nav aria-label="Principal" className="hidden gap-4 xl:flex min-[1400px]:gap-32">
          {MENU.map((m) => {
            const activo = rutaActual === m.href || rutaActual?.startsWith(`${m.href}/`);
            const estilo = cx(ITEM, activo ? "border-b-4 border-borde-inverso" : "border-transparent hover:border-borde-inverso hover:opacity-75");
            return m.grupos ? (
              <button
                key={m.texto}
                type="button"
                aria-expanded={abierto === m.texto}
                aria-controls="submenu"
                onClick={() => setAbierto(abierto === m.texto ? null : m.texto)}
                onMouseEnter={() => abrir(m.texto)}
                className={cx(estilo, abierto === m.texto && "border-borde-inverso")}
              >
                {m.texto}
              </button>
            ) : (
              <Link key={m.texto} href={m.href} aria-current={activo ? "page" : undefined} onMouseEnter={cerrarLuego} className={estilo}>
                {m.texto}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-8">
          <button type="button" aria-label="Buscar" className={ACCION}>
            <Icono nombre="buscar" />
          </button>
          <Link href="/carrito" aria-label="Carrito" className={ACCION}>
            <Icono nombre="canasta" />
          </Link>
          <Link href="/cuenta" aria-label="Mi cuenta" className={cx(ACCION, "hidden xl:block")}>
            <Icono nombre="usuario" />
          </Link>
          <button
            type="button"
            aria-label={movil ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={movil}
            aria-controls="menu-movil"
            onClick={() => setMovil((v) => !v)}
            className={cx(ACCION, "xl:hidden")}
          >
            <Icono nombre={movil ? "cerrar" : "menu"} tamano={movil ? 28 : 24} />
          </button>
        </div>
      </div>

      {/* Submenú de escritorio: franja bajo el header con las columnas del ítem abierto. */}
      {actual?.grupos && (
        <div
          id="submenu"
          onMouseEnter={() => abrir(actual.texto)}
          className="absolute inset-x-0 top-full hidden border-t-2 border-borde-inverso bg-fondo-superficie shadow-suave xl:block"
        >
          <div className="mx-auto flex max-w-1290 gap-64 px-32 py-32">
            <Grupos grupos={actual.grupos} onElegir={cerrar} />
            <Link href={actual.href} onClick={cerrar} className="cuerpo-3 ml-auto self-end text-texto-marca underline underline-offset-4 hover:no-underline">
              Ver todo en {actual.texto}
            </Link>
          </div>
        </div>
      )}

      {/* Menú móvil: panel a pantalla completa con cada sección plegable. */}
      {movil && (
        <nav id="menu-movil" aria-label="Principal" className="absolute inset-x-0 top-full h-[calc(100dvh-64px)] overflow-y-auto border-t-2 border-borde-inverso bg-fondo-superficie px-20 py-24 xl:hidden">
          <ul className="flex flex-col divide-y divide-borde-sutil">
            {MENU.map((m) => (
              <li key={m.texto} className="py-12">
                {m.grupos ? (
                  <details className="group">
                    <summary className="cuerpo-1 flex cursor-pointer list-none items-center justify-between text-texto-principal [&::-webkit-details-marker]:hidden">
                      {m.texto}
                      <Icono nombre="chevron-abajo" className="text-texto-marca transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="flex flex-col gap-24 pt-16 pb-8 pl-12">
                      <Grupos grupos={m.grupos} onElegir={cerrar} />
                    </div>
                  </details>
                ) : (
                  <Link href={m.href} onClick={cerrar} className="cuerpo-1 block text-texto-principal">
                    {m.texto}
                  </Link>
                )}
              </li>
            ))}
            <li className="py-12">
              <Link href="/cuenta" onClick={cerrar} className="cuerpo-1 flex items-center gap-12 text-texto-principal">
                <Icono nombre="usuario" className="text-texto-marca" />
                Mi cuenta
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

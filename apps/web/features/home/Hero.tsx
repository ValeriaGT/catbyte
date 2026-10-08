import Image from "next/image";
import { Logo } from "@catbyte/ui";
import { PROMO } from "@/content/home";

// Corte inferior inclinado, tomado de la máscara de Figma (Home 1 › Mask group 896:3356).
const CORTE = "polygon(0 0, 100% 0, 100% 90.8%, 71.6% 88%, 0 100%)";

function Promo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="font-grafica leading-none">{PROMO.titulo}</p>
      <p className="bg-fondo-hundido font-titulo text-texto-marca">{PROMO.oferta}</p>
      <p className="font-cuerpo font-bold">
        {PROMO.detalle[0]}
        <br />
        {PROMO.detalle[1]}
      </p>
    </div>
  );
}

/**
 * Ilustración de la ciudad con la promo dentro del monitor verde.
 * Desde md la promo se dibuja sobre el monitor y escala con el ancho (unidades cqw);
 * en móvil se muestra debajo, como bloque de marca.
 */
export function Hero() {
  return (
    <section aria-label="Promoción" className="relative">
      <div className="@container relative aspect-[1440/653] w-full overflow-hidden" style={{ clipPath: CORTE }}>
        <Image src="/home/hero-ciudad.png" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute top-[16.4%] left-[72%] hidden w-[9.96cqw] md:block">
          <Logo className="h-auto w-full" />
        </div>
        <Promo className="absolute top-[25%] left-[61.7%] hidden w-[30.5cqw] flex-col items-center gap-[0.8cqw] text-center text-texto-inverso md:flex [&>p:first-child]:text-[3.2cqw] [&>p:first-child]:whitespace-nowrap [&>p:nth-child(2)]:px-[2.2cqw] [&>p:nth-child(2)]:py-[0.55cqw] [&>p:nth-child(2)]:text-[1.3cqw] [&>p:last-child]:text-[1cqw] [&>p:last-child]:leading-[1.4]" />
      </div>
      <Promo className="flex flex-col items-center gap-12 bg-fondo-marca px-20 py-24 text-center text-texto-inverso md:hidden [&>p:first-child]:grafico-2 [&>p:nth-child(2)]:titulo-7 [&>p:nth-child(2)]:px-16 [&>p:nth-child(2)]:py-8 [&>p:last-child]:cuerpo-2" />
    </section>
  );
}

import { cx } from "@/lib/cx";

type Props = {
  tipo?: "completo" | "isotipo";
  /** oscuro: sobre fondos de marca o claros · claro: sobre fondos oscuros */
  color?: "oscuro" | "claro";
  className?: string;
};

const ARCHIVO = { completo: "/marca/logo.svg", isotipo: "/marca/isotipo.svg" };
const TAMANO = { completo: "w-144 h-46", isotipo: "w-45 h-46" };

/** Se pinta con máscara CSS para que tome el color del token sin duplicar el SVG. */
export function Logo({ tipo = "completo", color = "oscuro", className }: Props) {
  const url = `url(${ARCHIVO[tipo]})`;
  return (
    <span
      role="img"
      aria-label="CatByte"
      className={cx("inline-block shrink-0", TAMANO[tipo], color === "oscuro" ? "bg-texto-inverso" : "bg-texto-principal", className)}
      style={{ maskImage: url, WebkitMaskImage: url, maskRepeat: "no-repeat", maskSize: "contain" }}
    />
  );
}

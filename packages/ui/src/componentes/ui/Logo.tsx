import { cx } from "../../lib/cx";
import { RUTAS_LOGO } from "./logo-rutas";

type Props = {
  tipo?: "completo" | "isotipo";
  /** oscuro: sobre fondos de marca o claros · claro: sobre fondos oscuros */
  color?: "oscuro" | "claro";
  className?: string;
};

/** Figma: Iconos y marca › Logo (Tipo × Color). */
export function Logo({ tipo = "completo", color = "oscuro", className }: Props) {
  const completo = tipo === "completo";
  return (
    <svg
      role="img"
      aria-label="CatByte"
      viewBox={completo ? "0 0 144 46" : "0 0 45 46"}
      width={completo ? 144 : 45}
      height={46}
      fill="currentColor"
      className={cx("shrink-0", color === "oscuro" ? "text-texto-inverso" : "text-texto-principal", className)}
    >
      {(completo ? RUTAS_LOGO : RUTAS_LOGO.slice(0, 1)).map((d) => (
        <path key={d.slice(0, 24)} d={d} />
      ))}
    </svg>
  );
}

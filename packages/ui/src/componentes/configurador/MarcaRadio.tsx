import { cx } from "../../lib/cx";

/** Figma: Radio button. Solo dibuja el estado; el <input type="radio"> real va en la card. */
export function MarcaRadio({ seleccionada }: { seleccionada: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cx("flex size-24 shrink-0 items-center justify-center rounded-full border", seleccionada ? "border-borde-fuerte" : "border-borde-default")}
    >
      {seleccionada && <span className="size-16 rounded-full bg-fondo-marca" />}
    </span>
  );
}

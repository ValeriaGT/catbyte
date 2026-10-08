import type { SVGProps } from "react";

// Mismos íconos que la página "Iconos y marca" de Figma. Toman el color del texto (currentColor).
const RUTAS = {
  buscar: (
    <path fill="currentColor" d="M17.29 15.58h-.9l-.32-.31a7.43 7.43 0 1 0-.8.8l.31.32v.9L21.3 23 23 21.3l-5.71-5.72Zm-6.86 0a5.15 5.15 0 1 1 0-10.3 5.15 5.15 0 0 1 0 10.3Z" />
  ),
  canasta: (
    <g fill="currentColor">
      <path d="M19.2 23.71c-4.21.4-8.15.37-12.21.03-2-.17-3.57-1.49-3.96-3.49a71 71 0 0 1-1.01-7.2c-.17-1.72.98-3.03 2.83-3.08-.35-2.85 1.4-4.45 3.22-5.95.9-.74 1.18-1.95 2.68-1.97l3.96-.04c1.77-.02 2.2 1.07 3.25 1.98 1.84 1.58 3.52 3.24 3.24 6.05 1.93-.03 2.94 1.37 2.78 3.01-.24 2.59-.52 5.1-1.14 7.62-.4 1.66-1.88 2.88-3.64 3.04Zm-1.69-17.12c-.74.52-1.67 1.14-2.38 1.15l-3.97.03c-.94 0-1.95-.65-2.7-1.22-1.23.46-1.86 2.24-1.51 3.46l12.18-.03c.13-1.38-.38-3.12-1.62-3.39Zm1.52 15.1c.87-.08 1.73-.88 1.88-1.6.58-2.69.92-5.17 1.01-8.03l-17.89.03c.19 3.03.49 5.34 1.04 8.01.14.69 1.05 1.5 1.78 1.57 4.1.39 7.91.4 12.17.02Z" />
      <path d="M11.09 18c2.95 2.36 4.24-1.43 5.23.1.19.29.15 1.14-.1 1.42-1.74 1.95-4.87 1.62-6.48-.1-.23-.25-.21-1.09-.04-1.33.2-.3 1.08-.34 1.39-.09Zm5.55-3.15c-.05.7-.12 1.17-.3 1.37-.22.25-1.03.3-1.3.13-.28-.18-.47-.79-.51-1.3-.04-.6.43-1.29.94-1.36.5-.07 1.21.53 1.17 1.16Zm-5.3.04c-.04.6-.15 1.23-.37 1.42-.22.19-.88.18-1.2.07-.31-.1-.48-.74-.52-1.34-.03-.47.4-1.19.77-1.3.56-.16 1.38.29 1.32 1.15Z" />
    </g>
  ),
  usuario: (
    <g fill="currentColor">
      <path d="M12.6 21.19c-3.27-.62-5.23-3.11-5.54-6.3-.3-3.2.5-6.31 1.65-9.36.09-.23.36-.57.55-.66.18-.08.7.08.86.22l2.53 2.2c1.77-.37 3.24-.44 5.15-.3l1.56-2.6c1.3-2.18 4.21 5.34 4.54 6.08.55 1.25.42 2.26.52 3.59.2 2.61-.4 5.02-3.1 6.2-2.62 1.15-5.7 1.49-8.72.93Zm-2.27-9.3c.18-1.07.85-1.35 1.72-1.39 1.4-.06 3.06-.4 4.26.38.33.22.71.75 1.08.76 1.1.02-.07-1.38 4.68-1.3a14.6 14.6 0 0 0-1.96-4.06l-1.54 2.45a12.8 12.8 0 0 0-6.34.29L9.85 6.96c-.6 1.75-.9 3.09-1.24 4.84l1.72.09Zm2.32 7.7c3.05.68 10.19.3 10.14-3.81-1.21.05-2.37.1-3.48-.15-1.64-.36-.99-2.59-1.92-2.57-.3 0-.6.42-.63.75-.21 2.32-2.56 2.11-4.5 1.95-1.18-.1-1.71-1.03-1.87-2.12-.36-.29-1.32-.27-1.84-.07-.04 2.8 1.11 5.36 4.1 6.02Z" />
      <path d="M8.09 28a6.55 6.55 0 0 1 6.55-6.55h3.27a6.55 6.55 0 0 1 6.54 6.55H8.1Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </g>
  ),
  "chevron-derecha": <path fill="currentColor" d="M26.67 20c0-.67-.34-1.33-.67-1.67l-11-11a2.6 2.6 0 0 0-3.67 0 2.6 2.6 0 0 0 0 3.67l9 9-9 9a2.6 2.6 0 0 0 0 3.67 2.6 2.6 0 0 0 3.67 0L25.67 22c.66-.67 1-1.33 1-2Z" />,
  cerrar: <path d="M11.67 11.67 28.33 28.33M11.67 28.33 28.33 11.67" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />,
  "flecha-derecha": <path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  "chevron-abajo": <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  check: <path d="m5 12.5 5 5L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />,
} as const;

const VIEWBOX: Partial<Record<NombreIcono, string>> = {
  buscar: "0 0 26 25",
  canasta: "0 0 26 26",
  usuario: "0 0 32 32",
  "chevron-derecha": "0 0 40 40",
  cerrar: "0 0 40 40",
};

export type NombreIcono = keyof typeof RUTAS;

type Props = SVGProps<SVGSVGElement> & { nombre: NombreIcono; tamano?: number };

/** Decorativo por defecto (aria-hidden). Si el ícono es el único contenido de un control, pon aria-label en el control. */
export function Icono({ nombre, tamano = 24, ...props }: Props) {
  return (
    <svg width={tamano} height={tamano} viewBox={VIEWBOX[nombre] ?? "0 0 24 24"} fill="none" aria-hidden="true" {...props}>
      {RUTAS[nombre]}
    </svg>
  );
}

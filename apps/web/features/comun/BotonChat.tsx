import Image from "next/image";

/** Botón flotante de chat (Figma: Frame 114). */
export function BotonChat() {
  return (
    <button
      type="button"
      aria-label="Abrir chat de ayuda"
      className="fixed right-20 bottom-20 z-20 flex size-64 items-center justify-center rounded-full bg-accion-primaria shadow-dura-4 transition-colors hover:bg-accion-primaria-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-borde-marca lg:size-80"
    >
      <Image src="/home/icono-chat.svg" alt="" width={30} height={30} />
    </button>
  );
}

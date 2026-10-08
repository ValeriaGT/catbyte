import Image from "next/image";

/** Ilustración final del gato grafitero, a sangre después del footer. */
export function Cierre() {
  return (
    <div aria-hidden="true" className="relative aspect-[1450/835] w-full">
      <Image src="/home/cierre-gato-grafiti.png" alt="" fill sizes="100vw" className="object-cover" />
    </div>
  );
}

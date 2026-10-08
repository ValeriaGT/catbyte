// Copia el tema al paquete compilado: dist/tema.css queda junto a los .js que Tailwind debe escanear.
import { copyFileSync } from "node:fs";

copyFileSync("src/tema.css", "dist/tema.css");
console.log("dist/tema.css");

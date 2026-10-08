import type { Metadata } from "next";
import { Anonymous_Pro, Kaushan_Script, Orbitron } from "next/font/google";
import "./globals.css";

// Cada familia expone --font-familia-<nombre>; tokens.css las asigna a los roles
// titulo / cuerpo / grafica definidos en la colección "Tipografía" de Figma.
const orbitron = Orbitron({ variable: "--font-familia-orbitron", subsets: ["latin"], weight: "900" });
const anonymousPro = Anonymous_Pro({ variable: "--font-familia-anonymous-pro", subsets: ["latin"], weight: ["400", "700"] });
const kaushanScript = Kaushan_Script({ variable: "--font-familia-kaushan-script", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "CatByte",
  description: "PCs gamer personalizados",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${orbitron.variable} ${anonymousPro.variable} ${kaushanScript.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-fondo-pagina text-texto-principal font-cuerpo">{children}</body>
    </html>
  );
}

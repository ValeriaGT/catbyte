import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BannerSeccion } from "./BannerSeccion";
import { FormularioContacto } from "./FormularioContacto";
import { Marquesina } from "./Marquesina";
import { TituloSeccion } from "./TituloSeccion";

const meta = {
  title: "Secciones/Banner de sección",
  component: BannerSeccion,
  args: { titulo: "HAZ QUE TU SET UP HABLE POR TI", subtitulo: "Y refleja todo lo que eres", color: "naranja" },
  argTypes: { color: { control: "inline-radio", options: ["naranja", "oscuro"] } },
  parameters: { layout: "fullscreen", docs: { description: { component: "Figma: **Secciones**. Bloques de composición para separar y titular secciones." } } },
} satisfies Meta<typeof BannerSeccion>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Banner: Story = { name: "Banner de sección" };
export const BannerOscuro: Story = { name: "Banner oscuro", args: { titulo: "NUESTRA COMUNIDAD", subtitulo: undefined, color: "oscuro" } };
export const Titulo: Story = { name: "Título de sección", render: () => <div className="py-40"><TituloSeccion titulo="TU EQUIPO SOÑADO" subtitulo="Lo encuentras con configuraciones optimizadas para cada usuario" /></div> };
export const Cinta: Story = { name: "Marquesina", render: () => <Marquesina frase="HAZ UN LEVEL UP A TU SET UP" /> };
export const Contacto: Story = { name: "Formulario de contacto", render: () => <div className="flex flex-wrap gap-40 p-24"><FormularioContacto /><FormularioContacto acento="naranja" /></div> };

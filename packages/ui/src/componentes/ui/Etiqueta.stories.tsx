import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Etiqueta } from "./Etiqueta";

const meta = {
  title: "Secciones/Etiqueta",
  component: Etiqueta,
  args: { children: "Arma tu poder", color: "naranja" },
  argTypes: { color: { control: "inline-radio", options: ["naranja", "verde", "morado"] } },
  parameters: { docs: { description: { component: "Figma: **Secciones › Etiqueta**. Sin radio a propósito (estética de cinta)." } } },
} satisfies Meta<typeof Etiqueta>;
export default meta;
export const Naranja: StoryObj<typeof meta> = {};
export const Verde: StoryObj<typeof meta> = { args: { color: "verde" } };
export const Morado: StoryObj<typeof meta> = { args: { color: "morado" } };

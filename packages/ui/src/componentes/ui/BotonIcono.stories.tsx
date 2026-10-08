import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NOMBRES_ICONO } from "./Icono";
import { BotonIcono } from "./BotonIcono";

const meta = {
  title: "Base/Botón ícono",
  component: BotonIcono,
  args: { "aria-label": "Siguiente", icono: "chevron-derecha", disabled: false },
  argTypes: { icono: { control: "select", options: NOMBRES_ICONO } },
  parameters: { docs: { description: { component: "Figma: **Botones › Botón ícono**. `aria-label` es obligatorio porque no tiene texto visible." } } },
} satisfies Meta<typeof BotonIcono>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
export const Deshabilitado: StoryObj<typeof meta> = { args: { disabled: true } };

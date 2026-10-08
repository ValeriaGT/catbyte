import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Campo } from "./Campo";

const meta = {
  title: "Formularios/Campo",
  component: Campo,
  args: { etiqueta: "Nombre", placeholder: "Escribe tu nombre" },
  decorators: [(S) => <div className="max-w-360"><S /></div>],
  parameters: { docs: { description: { component: "Figma: **Formularios › Campo** (Default, Foco, Lleno, Error, Deshabilitado). El mensaje de error se anuncia con `aria-describedby`." } } },
} satisfies Meta<typeof Campo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Lleno: Story = { args: { defaultValue: "Valeria" } };
export const Error: Story = { args: { etiqueta: "Email", defaultValue: "valeria@", error: "Escribe un email válido" } };
export const Deshabilitado: Story = { args: { disabled: true } };

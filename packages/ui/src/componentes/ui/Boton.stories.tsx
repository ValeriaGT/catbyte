import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NOMBRES_ICONO } from "./Icono";
import { Boton } from "./Boton";

const meta = {
  title: "Base/Botón",
  component: Boton,
  args: { children: "Descubre tu computador ideal", tipo: "primario", tamano: "grande", disabled: false },
  argTypes: {
    iconoIzquierdo: { control: "select", options: [undefined, ...NOMBRES_ICONO] },
    iconoDerecho: { control: "select", options: [undefined, ...NOMBRES_ICONO] },
  },
  parameters: { docs: { description: { component: "Figma: **Botones › Botón** (Tipo × Tamaño × Estado). Máximo un primario por sección. Para un enlace con aspecto de botón usa `clasesBoton()` sobre `<Link>`." } } },
} satisfies Meta<typeof Boton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primario: Story = {};
export const Secundario: Story = { args: { tipo: "secundario", children: "Ver más", iconoDerecho: "flecha-derecha" } };
export const Pequeno: Story = { name: "Pequeño", args: { tamano: "pequeno", children: "¿Cómo personalizar?" } };
export const Deshabilitado: Story = { args: { disabled: true } };
export const Matriz: Story = {
  render: () => (
    <div className="grid grid-cols-[auto_auto_auto] items-center justify-start gap-24">
      {(["primario", "secundario"] as const).flatMap((tipo) =>
        (["grande", "pequeno"] as const).map((tamano) => (
          <div key={tipo + tamano} className="contents">
            <Boton tipo={tipo} tamano={tamano}>Botón</Boton>
            <Boton tipo={tipo} tamano={tamano} iconoDerecho="flecha-derecha">Botón</Boton>
            <Boton tipo={tipo} tamano={tamano} disabled>Botón</Boton>
          </div>
        )),
      )}
    </div>
  ),
};

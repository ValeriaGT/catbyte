import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CardCategoria } from "./CardCategoria";
import { CardComunidad } from "./CardComunidad";
import { CardEstilo } from "./CardEstilo";

const meta = {
  title: "Cards/Card categoría",
  component: CardCategoria,
  args: { href: "#", titulo: "Gaming", descripcion: "Equipos de alto rendimiento para gaming competitivo" },
  parameters: { docs: { description: { component: "Figma: **Cards › Card categoría**. Toda la card es un enlace; el chevron replica el Botón ícono. La foto va en `imagen`." } } },
} satisfies Meta<typeof CardCategoria>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Categoria: Story = { name: "Card categoría", decorators: [(S) => <div className="max-w-389"><S /></div>] };
export const Estilo: Story = {
  name: "Card estilo",
  render: () => (
    <div className="grid w-[960px] max-w-full grid-cols-5 gap-24">
      <CardEstilo href="#" etiqueta="Led" color="morado" />
      <CardEstilo href="#" etiqueta="Estilo propio" color="verde" />
      <CardEstilo href="#" etiqueta="Transform" color="azul" />
      <CardEstilo href="#" etiqueta="Cars" color="naranja" />
      <CardEstilo href="#" etiqueta="Mood City" color="fucsia" />
    </div>
  ),
};
export const Comunidad: Story = {
  name: "Card comunidad",
  render: () => <CardComunidad cita="“Es todo lo que esperaba tener en mi trabajo y es muy rápido.”" nombre="Laura Martínez" rol="Diseñadora gráfica" />,
};

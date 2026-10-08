import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icono, NOMBRES_ICONO } from "./Icono";
import { Logo } from "./Logo";

const meta = { title: "Base/Logo e íconos", component: Logo, parameters: { docs: { description: { component: "Figma: **Iconos y marca**. Logo (Tipo × Color) e íconos de 24 px que heredan el color del texto." } } } } satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const LogoClaro: Story = { args: { tipo: "completo", color: "claro" } };
export const LogoOscuro: Story = { args: { tipo: "completo", color: "oscuro" }, globals: { backgrounds: { value: "marca" } } };
export const Isotipo: Story = { args: { tipo: "isotipo", color: "claro" } };
export const Iconos: Story = {
  render: () => (
    <div className="flex flex-wrap gap-32 text-texto-principal">
      {NOMBRES_ICONO.map((n) => (
        <div key={n} className="flex flex-col items-center gap-8">
          <Icono nombre={n} />
          <code className="cuerpo-4 text-texto-secundario">{n}</code>
        </div>
      ))}
    </div>
  ),
};

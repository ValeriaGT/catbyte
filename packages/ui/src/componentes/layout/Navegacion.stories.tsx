import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "./Footer";
import { Header } from "./Header";

const meta = {
  title: "Navegación/Header",
  component: Header,
  args: { rutaActual: "/pcs" },
  parameters: { layout: "fullscreen", docs: { description: { component: "Figma: **Navegación › Header** (Escritorio desde 1280 px / Móvil). El enlace activo usa `aria-current=\"page\"`." } } },
} satisfies Meta<typeof Header>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Escritorio: Story = {};
export const Movil: Story = { name: "Móvil", globals: { viewport: { value: "mobile1" } } };
export const PieDePagina: Story = { name: "Footer", render: () => <Footer /> };

import type { Preview } from "@storybook/nextjs-vite";
import { themes } from "storybook/theming";
import "./storybook.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    backgrounds: {
      options: {
        pagina: { name: "fondo/pagina", value: "#181818" },
        marca: { name: "fondo/marca", value: "#9ffe00" },
        inverso: { name: "fondo/inverso", value: "#ffffff" },
      },
    },
    controls: { expanded: true },
    docs: { theme: themes.dark },
    a11y: { test: "todo" },
  },
  initialGlobals: { backgrounds: { value: "pagina" } },
  tags: ["autodocs"],
};

export default preview;

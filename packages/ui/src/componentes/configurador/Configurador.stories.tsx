import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { BotonHerramienta } from "./BotonHerramienta";
import { CardOpcion } from "./CardOpcion";
import { CarruselOpciones } from "./CarruselOpciones";
import { DetalleOpcion } from "./DetalleOpcion";
import { FilaOpcion } from "./FilaOpcion";
import { IconoCompra } from "./IconoCompra";
import { ICONOS_COMPRA, type NombreIconoCompra } from "./iconos-compra";
import { PasosConfigurador } from "./PasosConfigurador";
import { Pestanas } from "./Pestanas";
import { VisorPC } from "./VisorPC";

const meta = {
  title: "Configurador/Pasos",
  component: PasosConfigurador,
  parameters: { docs: { description: { component: "Figma: **Menu selección**. Estados pendiente, completado y activo." } } },
} satisfies Meta<typeof PasosConfigurador>;
export default meta;
type Story = StoryObj<typeof meta>;

const PASOS = (Object.keys(ICONOS_COMPRA) as NombreIconoCompra[]).map((id) => ({ id, etiqueta: id, icono: id }));

export const Pasos: Story = {
  args: { pasos: PASOS, activo: "procesador", completados: ["case", "almacenamiento"], onSeleccionar: () => {} },
  render: function Render(args) {
    const [activo, setActivo] = useState(args.activo);
    return <PasosConfigurador {...args} activo={activo} onSeleccionar={setActivo} />;
  },
};

export const Iconos: StoryObj = {
  name: "Iconos compra",
  render: () => (
    <div className="flex gap-24 text-texto-marca">
      {(Object.keys(ICONOS_COMPRA) as NombreIconoCompra[]).map((n) => (
        <IconoCompra key={n} nombre={n} className="size-56" />
      ))}
    </div>
  ),
};

export const Visor: StoryObj = {
  name: "Visor PC",
  render: () => <VisorPC total="$280.000" etiquetas={["Case XPG", "1 Tera", "IntelCore i7"]} />,
};

export const Opciones: StoryObj = {
  name: "Card y fila de opción",
  render: function Render() {
    const [elegida, setElegida] = useState("a");
    return (
      <div className="flex max-w-784 flex-col gap-24">
        <div className="flex justify-end gap-8">
          <BotonHerramienta icono="ordenar">Ordenar</BotonHerramienta>
          <BotonHerramienta icono="filtro">Filtrar</BotonHerramienta>
        </div>
        <CarruselOpciones etiqueta="Chasis">
          {["a", "b", "c", "d", "e", "f"].map((v) => (
            <CardOpcion key={v} grupo="case" valor={v} nombre={`Case ${v.toUpperCase()}`} precio="$200.000" etiqueta="Gamer" seleccionada={elegida === v} onSeleccionar={setElegida} />
          ))}
        </CarruselOpciones>
        <CarruselOpciones etiqueta="Procesador" direccion="vertical">
          {["Gamer", "Audiovisual", "3D"].map((e, i) => (
            <FilaOpcion
              key={e}
              grupo="cpu"
              valor={e}
              nombre="Intel core i7-13700kf (16 Core)"
              precio="$250.000"
              etiqueta={e}
              colorEtiqueta={(["naranja", "morado", "azul"] as const)[i]}
              seleccionada={elegida === e}
              onSeleccionar={setElegida}
              onVerMas={() => {}}
            />
          ))}
        </CarruselOpciones>
      </div>
    );
  },
};

export const Detalle: StoryObj = {
  name: "Detalle (modal Ver más)",
  render: function Render() {
    const [abierto, setAbierto] = useState(false);
    return (
      <>
        <BotonHerramienta icono="filtro" onClick={() => setAbierto(true)}>
          Abrir detalle
        </BotonHerramienta>
        <DetalleOpcion
          abierto={abierto}
          onCerrar={() => setAbierto(false)}
          titulo="Intel core i7-13700kf (16 Core)"
          detalle={{
            descripcion: ["Combina muchos ", { resaltado: "núcleos (16) y hilos (24)" }, " con una frecuencia muy alta."],
            caracteristicas: [
              { titulo: "Cores e hilos", puntos: [["16 cores significa ", { resaltado: "16 “cerebros”" }, " físicos."]] },
              { titulo: "TDP", puntos: [[{ resaltado: "TDP 125 W" }, " indica el consumo y el calor."]] },
            ],
          }}
        />
      </>
    );
  },
};

export const PestanasDiseno: StoryObj = {
  name: "Pestañas",
  render: function Render() {
    const [activa, setActiva] = useState("skins");
    const pestanas = [
      { id: "skins", etiqueta: "Skins" },
      { id: "rgb", etiqueta: "RGB" },
      { id: "figuras", etiqueta: "Figuras 3D" },
    ];
    return <Pestanas etiqueta="Diseño" pestanas={pestanas} activa={activa} onCambiar={setActiva} className="max-w-776" />;
  },
};

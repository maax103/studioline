import type { Project } from "../../types";
import { getRealPath } from "../../../utils/assets";

const project: Project = {
  id: "minimercado",
  state: "public",
  title: "Urban Minimarket",
  description: "Projeto de um minimercado urbano compacto, com apenas 12.5m², localizado em Brasília. O design moderno e funcional maximiza o uso do espaço, oferecendo uma experiência de compra eficiente e agradável. Ideal para áreas urbanas densas, este minimercado combina praticidade com estética contemporânea.",
  thumbnail: getRealPath("photos/urban-minimarket/01.webp"),
  highlight: true,
  images: [
    getRealPath("photos/urban-minimarket/01.webp"),
    getRealPath("photos/urban-minimarket/02.webp"),
    getRealPath("photos/urban-minimarket/03.webp"),
    getRealPath("photos/urban-minimarket/04.webp"),
    getRealPath("photos/urban-minimarket/05.webp"),
    getRealPath("photos/urban-minimarket/06.webp"),
    getRealPath("photos/urban-minimarket/P.B.webp"),
  ],
  category: "commercial",
  year: 2025,
  location: "Brasília, DF",
  area: "12.5m²",
  images360: [
    {
      id: "vista1",
      imageUrl: getRealPath("photos/urban-minimarket/360.webp"),
      name: "Minimercado 1",
      defaultCameraPosition: [Math.PI / 16, 0],
    },
  ],
  // specifications: {
  //   'Área construída': '12.5m²',
  // },
};

export default project;

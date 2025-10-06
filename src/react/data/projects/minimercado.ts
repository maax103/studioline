import type { Project } from "../../types";
import { getAssetPath } from "../../../utils/assets";

const project: Project = {
  id: "minimercado",
  title: "Urban Minimarket",
  description: "Projeto de um minimercado urbano compacto, com apenas 12.5m², localizado em Brasília. O design moderno e funcional maximiza o uso do espaço, oferecendo uma experiência de compra eficiente e agradável. Ideal para áreas urbanas densas, este minimercado combina praticidade com estética contemporânea.",
  thumbnail: getAssetPath("photos/urban-minimarket/V2_01.webp"),
  highlight: true,
  images: [
    getAssetPath("photos/urban-minimarket/V1_01.webp"),
    getAssetPath("photos/urban-minimarket/V1_02.webp"),
    getAssetPath("photos/urban-minimarket/V1_03.webp"),
    getAssetPath("photos/urban-minimarket/V1_04.webp"),
    getAssetPath("photos/urban-minimarket/V1_05.webp"),
    getAssetPath("photos/urban-minimarket/V1_06.webp"),
    getAssetPath("photos/urban-minimarket/V2_01.webp"),
    getAssetPath("photos/urban-minimarket/V2_02.webp"),
    getAssetPath("photos/urban-minimarket/V2_03.webp"),
    getAssetPath("photos/urban-minimarket/V2_04.webp"),
    getAssetPath("photos/urban-minimarket/V2_05.webp"),
    getAssetPath("photos/urban-minimarket/V2_06.webp"),
  ],
  category: "commercial",
  year: 2025,
  location: "Brasília, DF",
  area: "12.5m²",
  images360: [
    {
      id: "vista1",
      imageUrl: getAssetPath("photos/urban-minimarket/360_1.webp"),
      name: "Minimercado 1",
      defaultCameraPosition: [Math.PI / 16, 0],
      nodes: [
        {
          id: "vista1",
          label: "Versão 2",
          spherical: {
            theta: Math.PI * 2 - Math.PI / 32,
            phi: Math.PI / 2,
          },
          scale: 2,
          targetPhotoId: "vista2",
          cameraPosition: [Math.PI / 2, Math.PI / 2],
        },
      ],
    },
    {
      id: "vista2",
      imageUrl: getAssetPath("photos/urban-minimarket/360_2.webp"),
      name: "Minimercado 2",
      defaultCameraPosition: [Math.PI / 2, 0],
      nodes: [
        {
          id: "1",
          label: "Versão 1",
          spherical: {
            theta: Math.PI + Math.PI / 16,
            phi: Math.PI / 2,
          },
          scale: 2,
          targetPhotoId: "vista1",
          cameraPosition: [-Math.PI / 2, Math.PI / 2],
        },
      ],
    },
  ],
  // specifications: {
  //   'Área construída': '12.5m²',
  // },
};

export default project;

import type { Project } from "../../types";
import { getRealPath } from "../../../utils/assets";
import type { FC } from "react";
import { Stack, Text } from "@mantine/core";

const MiniMercadoShortDescription = () => {
  return (
    <Text size="sm" c="neutral.6" lineClamp={3} lh={1.5}>
      Este projeto de minimercado foi pensado
      para condomínios, unindo funcionalidade, estética e
      identidade de marca em um espaço compacto.
    </Text>
  );
};

const MiniMercadoLongDescription = () => {
  return (
    <Stack>
      <Text size="sm" c="neutral.6" lineClamp={3} lh={1.5}>
        Desenvolvido para a empresa Urban, este projeto de minimercado foi
        pensado para implantação em condomínios, unindo funcionalidade, estética
        e identidade de marca em um espaço compacto.
      </Text>
      <Text size="sm" c="neutral.6" lineClamp={3} lh={1.5}>
        O layout otimiza a circulação e a exposição dos produtos, proporcionando
        uma experiência de compra prática e agradável. Materiais como OSB,
        vegetação e iluminação linear reforçam o conceito contemporâneo,
        enquanto a paleta em tons de laranja, azul e verde transmite dinamismo e
        acolhimento — alinhando o ambiente à proposta urbana e moderna da marca.
      </Text>
    </Stack>
  );
};

const project: Project = {
  id: "minimercado",
  state: "public",
  title: "Urban Minimarket",
  shortDescription: MiniMercadoShortDescription,
  longDescription: MiniMercadoLongDescription,
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

import type { Project } from '../../types';

const project: Project = {
  id: 'renata2',
  title: 'Renata 2',
  description:
    'Residência contemporânea com design minimalista e integração com a natureza. Projeto desenvolvido com foco na sustentabilidade e conforto térmico.',
  thumbnail: '/photos/casa/01.webp',
  highlight: true,
  images: [
    '/photos/renata2/sala.webp',
  ],
  category: 'residential',
  year: 2023,
  location: 'Blumenau, SC',
  area: '80m²',
  images360: [
    {
      id: '1',
      imageUrl: '/photos/renata2/sala.webp',
      name: 'Banheiro',
      defaultCameraPosition: [Math.PI / 2, 0],
      nodes: [
        {
          id: 'salasemperda',
          label: 'Sala sem perda',
          spherical: {
            theta: Math.PI + Math.PI / 16,
            phi: Math.PI / 2,
          },
          scale: 2,
          targetPhotoId: '2',
          cameraPosition: [-Math.PI / 2, Math.PI / 1.75],
        },
      ],
    },
    {
      id: '2',
      imageUrl: '/photos/renata2/salaraw.webp',
      name: 'sala',
      defaultCameraPosition: [Math.PI / 2, 0],
      nodes: [
        {
          id: 'sala',
          label: 'sala 95',
          spherical: {
            theta: Math.PI + Math.PI / 16,
            phi: Math.PI / 2,
          },
          scale: 2,
          targetPhotoId: '1',
          cameraPosition: [-Math.PI / 2, Math.PI / 2],
        },
      ],
    },
  ],
  specifications: {
    'Área construída': '80m²',
    Quartos: '2',
    Garagem: '4 vagas',
    Estilo: 'Contemporâneo',
  },
};

export default project;

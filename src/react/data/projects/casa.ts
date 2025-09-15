import type { Project } from '../../types';

const project: Project = {
  id: 'casa',
  title: 'Casa',
  description:
    'Residência contemporânea com design minimalista e integração com a natureza. Projeto desenvolvido com foco na sustentabilidade e conforto térmico.',
  thumbnail: '/photos/casa/01.webp',
  highlight: true,
  images: [
    '/photos/casa/01.webp',
    '/photos/casa/02.webp',
    '/photos/casa/03.webp',
  ],
  category: 'residential',
  year: 2023,
  location: 'Blumenau, SC',
  area: '80m²',
  images360: [
    {
      id: '1',
      imageUrl: '/photos/casa/01.webp',
      name: 'Banheiro',
      defaultCameraPosition: [Math.PI / 2, 0],
      nodes: [
        {
          id: 'Porta',
          label: 'Interior da varanda',
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
      imageUrl: '/photos/casa/02.webp',
      name: 'Banheiro',
      defaultCameraPosition: [Math.PI / 2, 0],
      nodes: [
        {
          id: 'convivencia',
          label: 'Entrada da varanda',
          spherical: {
            theta: Math.PI + Math.PI / 16,
            phi: Math.PI / 2,
          },
          scale: 2,
          targetPhotoId: '1',
          cameraPosition: [-Math.PI / 2, Math.PI / 2],
        },
        {
          id: 'servico',
          label: 'Área de serviço',
          spherical: {
            theta: Math.PI + Math.PI,
            phi: Math.PI / 2,
          },
          scale: 3,
          targetPhotoId: '3',
          cameraPosition: [0, Math.PI / 2],
        },
      ],
    },
    {
      id: '3',
      imageUrl: '/photos/casa/03.webp',
      name: 'Área de serviço',
      defaultCameraPosition: [Math.PI / 2, 0],
      nodes: [
        {
          id: 'varanda',
          label: 'Varanda',
          spherical: {
            theta: Math.PI / 2.5,
            phi: Math.PI / 2,
          },
          scale: 3,
          targetPhotoId: '2',
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

import type { Project } from '../../types';

const project: Project = {
  id: 'ex-casa-renata',
  title: 'Ex casa da Renata',
  description:
    'Residência contemporânea com design minimalista e integração com a natureza. Projeto desenvolvido com foco na sustentabilidade e conforto térmico.',
  thumbnail: '/photos/renata/09.png',
  highlight: true,
  images: [
    '/photos/renata/01.png',
    '/photos/renata/02.png',
    '/photos/renata/03.png',
    '/photos/renata/04.png',
    '/photos/renata/05.png',
    '/photos/renata/06.png',
    '/photos/renata/07.png',
    '/photos/renata/08.png',
    '/photos/renata/09.png',
    '/photos/renata/10.png',
    '/photos/renata/11.png',
    '/photos/renata/12.png',
    '/photos/renata/13.png',
    '/photos/renata/14.png',
    '/photos/renata/15.png',
    '/photos/renata/16.png',
  ],
  category: 'residential',
  year: 2023,
  location: 'Blumenau, SC',
  area: '80m²',
  images360: [
    {
      id: '1',
      imageUrl: '/photos/varanda/varanda.png',
      name: 'Banheiro',
      defaultCameraPosition: [Math.PI / 2, 0],
      nodes: [
        {
          id: 'Porta',
          label: 'Área de serviço',
          spherical: {
            theta: Math.PI + Math.PI / 16, // frente
            phi: Math.PI / 2, // horizontal
          },
          scale: 3,
          targetPhotoId: '2',
          cameraPosition: [-Math.PI / 2, Math.PI / 2],
        },
      ],
    },
    {
      id: '2',
      imageUrl: '/photos/varanda/lavacao.png',
      name: 'Banheiro 2',
      defaultCameraPosition: [Math.PI / 2, Math.PI],
      nodes: [
        {
          id: 'Porta2',
          label: 'Varanda',
          spherical: {
            theta: Math.PI - Math.PI / 16, // atrás
            phi: Math.PI / 2, // horizontal
          },
          scale: 2.5,
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

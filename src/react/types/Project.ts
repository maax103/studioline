export interface Project {
  id: string; // identificador do projeto (nome unico)
  title: string;
  description: string;
  highlight: boolean; // indica se a imagem 360 aparece na home page
  thumbnail: string; // thumbail da galeria
  images: string[]; // imagens
  images360?: Photo360[]; // imagens do tour 360
  category: 'residential' | 'commercial';
  year?: number;
  location?: string;
  area?: string;
  specifications?: Record<string, string>;
}

export interface ProjectCard {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  year: number;
}

export interface HotspotNode {
  id: string;
  label: string;
  spherical: {
    theta: number; // ângulo horizontal (radianos)
    phi: number;   // ângulo vertical (radianos)
  };
  scale?: number; // escala do hotspot (padrão: 1)
  targetPhotoId: string;
  cameraPosition?: [theta:number, phi:number];
}

export interface Photo360 {
  id: string;
  name: string;
  imageUrl: string;
  defaultCameraPosition?: [theta: number, phi: number];
  nodes?: HotspotNode[];
}
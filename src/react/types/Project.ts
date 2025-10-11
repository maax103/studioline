import type { ComponentType } from "react";

export interface GalleryImage {
  section: string;
  path: string;
  description: string;
}

export interface Project {
  id: string;
  state: 'private' | 'public';
  title: string;
  shortDescription: ComponentType;
  longDescription: ComponentType;
  highlight: boolean;
  thumbnail: string;
  gallery: GalleryImage[];
  images360?: Photo360[];
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
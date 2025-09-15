import { OrbitHotspot } from './OrbitHotspot';
import type { HotspotNode } from '../../types/Project';

interface OrbitHotspotRendererProps {
  nodes: HotspotNode[];
  onNavigate: (targetPhotoId: string, cameraPosition?: [number, number]) => void;
  setCursorStyle: (style: string) => void;
}

export function OrbitHotspotRenderer({ nodes, onNavigate, setCursorStyle }: OrbitHotspotRendererProps) {
  return (
    <>
      {nodes.map((node) => (
        <OrbitHotspot 
          key={node.id} 
          node={node} 
          onNavigate={onNavigate}
          setCursorStyle={setCursorStyle}
        />
      ))}
    </>
  );
}

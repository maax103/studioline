import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import type { Mesh } from 'three';

interface InteractiveHotspotProps {
  position: [number, number, number];
  label: string;
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
  color?: string;
  hoverColor?: string;
}

export function InteractiveHotspot({
  position,
  label,
  onClick,
  onHover,
  color = '#abc6ab',
  hoverColor = '#eaa5a0',
}: InteractiveHotspotProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.scale.setScalar(
        hovered ? 1.2 : clicked ? 0.9 : 1
      );
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          setClicked(true);
          setTimeout(() => setClicked(false), 150);
          onClick?.();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover?.(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          onHover?.(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={hovered ? hoverColor : color}
          emissive={hovered ? hoverColor : color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {hovered && (
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
}

import { useRef, useState } from 'react';
import { Text, Billboard } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import type { HotspotNode } from '../../types/Project';
import type { ThreeEvent } from '@react-three/fiber';

interface OrbitHotspotProps {
  node: HotspotNode;
  onNavigate: (
    targetPhotoId: string,
    cameraPosition?: [number, number]
  ) => void;
  setCursorStyle: (style: string) => void;
}

function sphericalToCartesian(
  theta: number,
  phi: number,
  radius: number = 490,
  scale = 1
): [number, number, number] {
  const offsetRadius = radius - scale * 20;
  const x = offsetRadius * Math.sin(phi) * Math.cos(theta);
  const y = offsetRadius * Math.cos(phi);
  const z = offsetRadius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

function getTextPosition(
  theta: number,
  phi: number,
  scale: number
): [number, number, number] {
  const textRadius = 480 - scale * 20;
  const offsetPhi = phi - 0.06 * scale;
  const x = textRadius * Math.sin(offsetPhi) * Math.cos(theta);
  const y = textRadius * Math.cos(offsetPhi);
  const z = textRadius * Math.sin(offsetPhi) * Math.sin(theta);
  return [x, y, z];
}

export function OrbitHotspot({
  node,
  onNavigate,
  setCursorStyle,
}: OrbitHotspotProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const scale = node.scale || 1;
  const position = sphericalToCartesian(
    node.spherical.theta,
    node.spherical.phi
  );
  const textPosition = getTextPosition(
    node.spherical.theta,
    node.spherical.phi,
    scale
  );

  const { hotspotScale, opacity, ringScale } = useSpring({
    hotspotScale: hovered ? 1.3 : pressed ? 0.9 : 1,
    opacity: hovered ? 1 : 0.8,
    ringScale: hovered ? 1.6 : 0,
    config: { tension: 200, friction: 25 },
  });

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setPressed(true);
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (pressed) {
      onNavigate(node.targetPhotoId, node.cameraPosition);
    }
    setPressed(false);
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    setCursorStyle('pointer');
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    setPressed(false);
    setCursorStyle('grab');
  };

  return (
    <>
      <Billboard position={position}>
        <animated.mesh scale={ringScale}>
          <ringGeometry args={[10 * scale, 12 * scale, 32]} />
          <meshBasicMaterial
            color="#abc6ab"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
            depthTest={false}
          />
        </animated.mesh>

        <animated.mesh
          ref={meshRef}
          scale={hotspotScale}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <circleGeometry args={[8 * scale, 32]} />
          <animated.meshBasicMaterial
            color="#eaa5a0"
            transparent
            opacity={opacity}
            side={THREE.DoubleSide}
          />
        </animated.mesh>

        <animated.mesh scale={hotspotScale}>
          <ringGeometry args={[7.5 * scale, 8.5 * scale, 32]} />
          <meshBasicMaterial
            color="#abc6ab"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </animated.mesh>
      </Billboard>

      <Billboard visible={hovered} position={textPosition}>
        <Text
          fontSize={8 * scale}
          fontStyle="italic"
          color="#000000"
          fillOpacity={0.6}
          anchorX="center"
          anchorY="middle"
          outlineWidth={1}
          outlineColor={'#abc6ab'}
        >
          {node.label}
        </Text>
      </Billboard>
    </>
  );
}

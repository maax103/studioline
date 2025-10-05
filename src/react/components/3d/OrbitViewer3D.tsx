import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Box } from '@mantine/core';
import * as THREE from 'three';
import { OrbitHotspotRenderer } from './OrbitHotspotRenderer';
import type { Photo360 } from '../../types/Project';
import { OrbitControls as OrbitControlsType } from 'three-stdlib';

interface OrbitViewer3DProps {
  photo360: Photo360;
  photos360?: Photo360[];
  height?: string | number;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  minDistance?: number;
  maxDistance?: number;
  style?: React.CSSProperties;
}

function Photo360Sphere({
  imageUrl,
  setCursorStyle,
}: {
  imageUrl: string;
  setCursorStyle: (style: string) => void;
}) {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  const meshRef = useRef<THREE.Mesh>(null);

  // Optimize texture to prevent rerender
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;

  return (
    <mesh
      onPointerDown={() => setCursorStyle('grabbing')}
      onPointerUp={() => setCursorStyle('grab')}
      ref={meshRef}
      scale={[-1, 1, 1]}
    >
      <sphereGeometry args={[500, 64, 32]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

function FovZoom({
  minFov,
  maxFov,
  controlsRef,
}: {
  minFov: number;
  maxFov: number;
  controlsRef: React.RefObject<OrbitControlsType | null>;
}) {
  const { camera, gl } = useThree();
  const ZOOM_SENSITIVITY = 0.05;
  const lastTouchDistance = useRef<number | null>(null);

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) {
      console.warn('FovZoom component only works with a PerspectiveCamera.');
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY * ZOOM_SENSITIVITY;
      let newFov = camera.fov + delta;
      newFov = Math.max(minFov, Math.min(newFov, maxFov));
      camera.fov = newFov;
      camera.updateProjectionMatrix();
    };

    const getTouchDistance = (touches: TouchList) => {
      if (touches.length < 2) return null;
      const touch1 = touches[0];
      const touch2 = touches[1];
      return Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
      );
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        event.preventDefault();
        event.stopPropagation();

        if (controlsRef.current) {
          controlsRef.current.enabled = false;
        }

        const currentDistance = getTouchDistance(event.touches);

        if (currentDistance && lastTouchDistance.current) {
          const delta = (lastTouchDistance.current - currentDistance) * 0.3;
          let newFov = camera.fov + delta;
          newFov = Math.max(minFov, Math.min(newFov, maxFov));
          camera.fov = newFov;
          camera.updateProjectionMatrix();
        }

        lastTouchDistance.current = currentDistance;
      } else if (event.touches.length === 1 && lastTouchDistance.current) {
        // Still in zoom mode, prevent single touch from moving camera
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        event.preventDefault();
        event.stopPropagation();

        if (controlsRef.current) {
          controlsRef.current.enabled = false;
        }

        lastTouchDistance.current = getTouchDistance(event.touches);
      } else if (event.touches.length === 1 && lastTouchDistance.current) {
        // Prevent single touch during zoom
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (event.touches.length === 0) {
        lastTouchDistance.current = null;
        setTimeout(() => {
          if (controlsRef.current) {
            controlsRef.current.enabled = true;
          }
        }, 100); // Reduced delay
      }
    };

    const domElement = gl.domElement;
    domElement.addEventListener('wheel', handleWheel, { passive: false });
    domElement.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });
    domElement.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });
    domElement.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      domElement.removeEventListener('wheel', handleWheel);
      domElement.removeEventListener('touchstart', handleTouchStart);
      domElement.removeEventListener('touchmove', handleTouchMove);
      domElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [camera, gl.domElement, minFov, maxFov, controlsRef]);

  return null;
}

export function OrbitViewer3D({
  photo360,
  photos360 = [],
  height = '500px',
  enableZoom = true,
  enablePan = false,
  enableRotate = true,
  minDistance = 1,
  maxDistance = 10,
  style,
}: OrbitViewer3DProps) {
  const [currentPhoto, setCurrentPhoto] = useState(photo360);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const controlsRef = useRef<OrbitControlsType>(null);
  const [cursorStyle, setCursorStyle] = useState<string>('grab');

  useEffect(() => {
    useLoader.preload(THREE.TextureLoader, currentPhoto.imageUrl);
  }, [currentPhoto.imageUrl]);

  const handleNavigate = (targetPhotoId: string, cameraPosition?: [number, number]) => {
    const targetPhoto = photos360.find((photo) => photo.id === targetPhotoId);
    if (targetPhoto && targetPhoto.id !== currentPhoto.id) {
      setIsTransitioning(true);
      setTimeout(() => {
        if (cameraPosition && controlsRef.current) {
          const [theta, phi] = cameraPosition;
          controlsRef.current.setAzimuthalAngle(theta);
          controlsRef.current.setPolarAngle(phi);
          if (controlsRef.current.object instanceof THREE.PerspectiveCamera) {
            controlsRef.current.object.fov = 75;
            controlsRef.current.object.updateProjectionMatrix();
          }
        }
      }, 300)
      setTimeout(() => {
        setCurrentPhoto(targetPhoto);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 400);
    }
  };

  return (
    <Box
      style={{
        height,
        width: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--mantine-color-neutral-2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        position: 'relative',
        // cursor: 'grab',
        ...style,
      }}
    >
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'black',
          opacity: isTransitioning ? 0.9 : 0,
          transition: 'opacity 0.3s ease-in-out',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      <Canvas
        camera={{
          position: [0, 0, 0],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        style={{
          background: 'transparent',
          cursor: cursorStyle,
          opacity: isTransitioning ? 0.2 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            ref={controlsRef}
            target={[-1, 0, -1]}
            enableZoom={false}
            zoomSpeed={2}
            enablePan={enablePan}
            enableRotate={enableRotate}
            minDistance={minDistance}
            maxDistance={maxDistance}
            makeDefault
            reverseOrbit={true}
            rotateSpeed={0.25}
          />

          <Photo360Sphere setCursorStyle={setCursorStyle} imageUrl={currentPhoto.imageUrl} />

          {currentPhoto.nodes && (
            <OrbitHotspotRenderer
              nodes={currentPhoto.nodes}
              onNavigate={handleNavigate}
              setCursorStyle={setCursorStyle}
            />
          )}
          {enableZoom && (
            <FovZoom
              maxFov={maxDistance}
              minFov={minDistance}
              controlsRef={controlsRef}
            />
          )}
        </Suspense>
      </Canvas>
    </Box>
  );
}

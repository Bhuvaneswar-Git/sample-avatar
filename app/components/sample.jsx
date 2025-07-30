'use client';
import { useEffect } from 'react';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ToneMappingMode, ToneMapping } from 'postprocessing';

function Model() {
  const { scene } = useGLTF('/models/avatar.glb');
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child.material) {
        child.material.envMapIntensity = 1;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

export default function Viewer() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      
      {/* Environment */}
      <Environment preset="studio" />
      
      {/* Model */}
      <Model />
      <OrbitControls />
      
      {/* Effects */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} />
        <ToneMapping 
          mode={ToneMappingMode.ACES_FILMIC}
          resolution={256}
        />
      </EffectComposer>
    </Canvas>
  );
}
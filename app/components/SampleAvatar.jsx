import { useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/models/avatar.glb');
  
  // Traverse and enhance materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child.material) {
        child.material.metalness = 0.5;
        child.material.roughness = 0.3;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}
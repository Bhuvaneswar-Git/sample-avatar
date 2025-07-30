'use client';
import { useGLTF, OrbitControls, Bounds, useFBX, useAnimations, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {useEffect} from 'react';

function AvatarModel() {
  
  // const { scene, animations } = useGLTF('/models/avatar_5.glb');
  // const {actions } = useAnimations(animations, scene)
  // console.log('scene', scene)
  
  const fxb = useFBX('/models/avatar_3.fbx')
  const {animations} = fxb
  const {actions} = useAnimations(animations, fxb)

  console.log('fxb model', fxb)
  console.log('animations', animations)

  useEffect( ()=>{

    if (actions && Object.keys(actions).length > 0){
      actions[Object.keys(actions)[0]].play()
    }

  }, [actions])

  return <primitive object={fxb} scale={[1,1,1]} rotation={[0,0,0]} />;
  // return <primitive object={scene} scale={[1,1,1]} position={[0,0,0]} />;
}

export default function AvatarViewer() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={ { position: [0,1.6,3], fov:75 } }  shadows >  
        <ambientLight intensity={0.5} /> 
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.5} 
          castShadow
        />
        <hemisphereLight 
          groundColor="blue" 
          intensity={0.5} 
        />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        {/* <Environment preset='park' background/> */}
        <Bounds fit margin={1.2}  observe >
          <AvatarModel />
        </Bounds>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
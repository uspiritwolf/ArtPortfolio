import React from 'react';
import { Canvas } from '@react-three/fiber'

import { Loader, Environment, OrbitControls, PerspectiveCamera, Lightformer, SoftShadows } from '@react-three/drei'
import { EffectComposer, DepthOfField, Noise } from '@react-three/postprocessing'

import { state } from './State'
import { useSnapshot } from 'valtio'

function Env()
{
  const useCustomEnv = false;
  if(useCustomEnv)
  {
    return (
      <Environment resolution={512}>
      {/* Ceiling */}
      <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
      <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
      <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
      <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
      <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
      <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
      <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
      {/* Sides */}
      <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} />
      <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
      {/* Key */}
      <Lightformer form="ring" color="red" intensity={10} scale={2} position={[10, 5, 10]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
    </Environment>
    )
  }
  else
  {
    return (
      <Environment preset='dawn' background={true} blur={1.0}/>
    )
  }
}

function App()
{
  const snap = useSnapshot(state)
  const page = state.pages[snap.currentPage]
  return (
    <>
      <Canvas shadows dpr={[1, 2]} >
        <color attach="background" args={['#ffffff']} />
        <fog attach="fog" args={['#fff0ff', 1, 100]} />
        <spotLight position={[5, 9, 5]} angle={1.0} penumbra={0.6} intensity={5} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.001}/>
        <OrbitControls 
          autoRotate 
          autoRotateSpeed={0.05}
          enableZoom={true} 
          enablePan={false}
          makeDefault 
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          maxDistance={40.0}
          minDistance={5.0}
          />
        <PerspectiveCamera makeDefault fov={65} position={[5, 5, 5]}></PerspectiveCamera>
        {page}
        <group  position={[0, -0.4, 0]}>
          <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, 0.001, 0]}>
            <planeGeometry args={[500, 500]} />
            <shadowMaterial transparent color="black" opacity={0.4} />
          </mesh>
        </group>
        <Env/>
        <EffectComposer>
          <DepthOfField target={[0, 0, -2.5]} focusRange={0.1} bokehScale={10} />
          <Noise premultiply/>
        </EffectComposer>
        <SoftShadows />
      </Canvas>
      <Loader />
    </>
  );
}

export default App;

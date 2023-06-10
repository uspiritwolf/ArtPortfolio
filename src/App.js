import React from 'react';
import { Canvas } from '@react-three/fiber'

import { Stats, Loader, Environment, OrbitControls, PerspectiveCamera, Lightformer, SoftShadows } from '@react-three/drei'
import { EffectComposer, Noise } from '@react-three/postprocessing'

import { state } from './State'
import { useSnapshot } from 'valtio'

import { Leva, useControls } from 'leva'

function Postprocessing()
{
  const { usePostprocessing, softShadow } = useControls({usePostprocessing: true, softShadow: false})
  return (
    <>
    { usePostprocessing && 
    <EffectComposer disableNormalPass>
      <Noise premultiply/>
    </EffectComposer> }
    { softShadow && <SoftShadows/>}
    </>
  )
}

function Env()
{
  const { usePresetEnvironment } = useControls({usePresetEnvironment: true})
  if(usePresetEnvironment)
  {
    return (
      <Environment path={process.env.PUBLIC_URL+'/hdri/'} files="kiara_1_dawn_1k.hdr" background={true} blur={1.0}/>
    )
  }
  else
  {
    return (
      <Environment resolution={1024}>
        {/* Ceiling */}
        <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
        <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
        <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
        <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
        <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
        <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
        <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
        {/* Sides */}
        <Lightformer intensity={1} rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} />
        <Lightformer intensity={1} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
        {/* Key */}
        <Lightformer form="ring" color="red" intensity={10} scale={2} position={[10, 5, 10]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
    </Environment>
    )
  }
}

function App()
{
  const snap = useSnapshot(state)
  const page = state.pages[snap.currentPage]
  const { debugStats } = useControls({ debugStats: false })
  return (
    <>
      { debugStats && <Stats /> }
      <Leva oneLineLabels collapsed />
      <Canvas shadows dpr={[1, 2]} className='fadecanvas'>
        <color attach="background" args={['#ffffff']} />
        <fog attach="fog" args={['#fff0ff', 1, 100]} />
        <spotLight position={[5, 9, 5]} angle={1.0} penumbra={0.6} intensity={1} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.001}/>
        <OrbitControls 
          target={[0, 1.5, 0]}
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
        <Postprocessing/>
      </Canvas>
      <Loader/>
    </>
  );
}

export default App;

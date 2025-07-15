// src/components/DoctorModel.jsx

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';

function Doctor() {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/doctor.glb');
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    actions['YourAnimationName']?.play(); // <-- animation ka naam daalna!
  }, [actions]);

  return (
    <group ref={group}>
      {/* Increase scale for larger model */}
      <primitive object={scene} scale={2.2} />
    </group>
  );
}

export default function DoctorModel() {
  return (
    <Canvas style={{ height: '500px', width: '100%' }}>
      {/* Brighter ambient and directional lights for more color/brightness */}
      <ambientLight intensity={1.2} color={0xffffff} />
      <directionalLight intensity={1.5} color={0xffffff} position={[5, 10, 7]} />
      <pointLight intensity={1.2} color={0xffffff} position={[-10, 10, 10]} />
      <Doctor />
      <OrbitControls />
    </Canvas>
  );
}

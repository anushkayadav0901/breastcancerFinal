import { useGLTF, useAnimations } from '@react-three/drei'

export function BreastModel() {
  const { scene, animations } = useGLTF('/models/breast_model.glb')
  const { actions } = useAnimations(animations, scene)

  React.useEffect(() => {
    actions['MyAnimation']?.play()
  }, [actions])

  return (
    <Canvas>
      <primitive object={scene} scale={1.5} />
    </Canvas>
  )
}

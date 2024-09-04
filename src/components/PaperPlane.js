import { useLoader, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useRef, useEffect, useState } from 'react'

export default function PaperPlane({onClick, position = [0, 0, 0]}) {
  const gltf = useLoader(GLTFLoader, '/paper_plane.glb')
  const planeRef = useRef()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(() => {
    if (planeRef.current) {
      const t = scrollY * 0.035 // Adjust this multiplier to control the speed of the spiral
      const x = Math.sin(t) * 3 + position[0]
      const y = -t * 0.7 // Adjust this multiplier to control the downward speed
      const z = Math.cos(t) * 2
      const rotationY = Math.PI/2 + t

      planeRef.current.position.set(x, y , z)
      planeRef.current.rotation.set(Math.PI/20, rotationY, 0)
    }
  })

  const addCursor = () => {
      document.body.style.cursor = 'pointer'
  }

  const removeCursor = () => {
    document.body.style.cursor = 'default'
  }

  return <primitive ref={planeRef} object={gltf.scene} onClick={onClick} onPointerEnter={addCursor} onPointerLeave={removeCursor}/>
}
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import PaperPlane from './components/PaperPlane'
import { OrbitControls  } from '@react-three/drei'
import CloudScene from './components/Clouds'
import GlassText from './components/GlassText'

import useDevice from './components/useDevice'

function CameraController() {
  const { camera } = useThree()
  const yPosition = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      yPosition.current = -window.scrollY * 0.01 // Adjust this multiplier to control scroll sensitivity
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(() => {
    camera.position.y = yPosition.current
  })

  return null
}


export default function Portfolio() {
  const {isMobile} = useDevice();

  const onContact = () => {
    window.open(
      'https://www.linkedin.com/in/hiren-savalia-26791870/',
      '_blank'
    );
  }

  return (
    <div style={{ width: '100vw', height: '150vh' }}> {/* Increased height to allow scrolling */}
      <Canvas camera={{ position: [0, 0, 10] }} style={{ position: 'fixed', top: 0, left: 0, background: 'linear-gradient(#1e4877, #4584b4)' }}>
        <ambientLight intensity={Math.PI} />
        <pointLight position={[-10, 10, 10]} intensity={2000} />
        <PaperPlane onClick={onContact} position={isMobile ? [0, 0, 0] : [-6, 0, 0]}/>
        {/* <OrbitControls/> */}
        <CameraController />
        {isMobile ? null : <GlassText text='HIREN' position={[0, -5, -10]} />}
        <CloudScene />
      </Canvas>
    </div>
  )
}
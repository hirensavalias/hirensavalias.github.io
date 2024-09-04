import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import * as THREE from 'three'
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

extend({ BufferGeometryUtils })

const cloudShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    uniform sampler2D map;
    uniform vec3 fogColor;
    uniform float fogNear;
    uniform float fogFar;
    varying vec2 vUv;

    void main() {
      float depth = gl_FragCoord.z / gl_FragCoord.w;
      float fogFactor = smoothstep( fogNear, fogFar, depth );

      gl_FragColor = texture2D( map, vUv );
      gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
      gl_FragColor = mix( gl_FragColor, vec4( fogColor , gl_FragColor.w ), fogFactor );
    }
  `
}

const CloudScene = () => {
  const [cloudTexture, setCloudTexture] = useState(null)

  useEffect(() => {
    new THREE.TextureLoader().load('./cloud10.png', (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      setCloudTexture(texture)
    })
  }, [])

  return (
      <Clouds texture={cloudTexture} />
  )
}

const depth = 500;

const Clouds = ({ texture }) => {
  const { scene, camera } = useThree()
  const cloudsRef = useRef()
  const startTime = useRef(Date.now())
//   const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const fog = new THREE.Fog(0x4584b4, -100, 3000)
    scene.fog = fog

    // const handleMouseMove = (event) => {
    //   mouseRef.current = {
    //     x: (event.clientX - window.innerWidth / 2) * 0.25,
    //     y: (event.clientY - window.innerHeight / 2) * 0.15
    //   }
    // }

    // window.addEventListener('mousemove', handleMouseMove)
    // return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [scene])

  const material = useMemo(() => {
    if (!texture) return null
    
    texture.magFilter = THREE.LinearMipMapLinearFilter
    texture.minFilter = THREE.LinearMipMapLinearFilter

    return new THREE.ShaderMaterial({
      uniforms: {
        map: { type: 't', value: texture },
        fogColor: { type: 'c', value: scene.fog.color },
        fogNear: { type: 'f', value: scene.fog.near },
        fogFar: { type: 'f', value: scene.fog.far }
      },
      vertexShader: cloudShader.vertexShader,
      fragmentShader: cloudShader.fragmentShader,
      depthWrite: false,
      depthTest: false,
      transparent: true
    })
  }, [texture, scene.fog])

  const geometry = useMemo(() => {
    if (!material) return null

    const planeGeo = new THREE.PlaneGeometry(150, 150)
    const geometries = []

    for (let i = 0; i < depth; i++) {
      const planeObj = new THREE.Object3D()
      planeObj.position.x = Math.random() * 2000
      planeObj.position.y = -Math.random() * Math.random() * 200 - 15 + 400
      planeObj.position.z = i
    //   planeObj.rotation.z = Math.random() * Math.PI
      planeObj.scale.x = planeObj.scale.y = Math.random() * Math.random() * 1.5 + 0.5
      planeObj.updateMatrix()
      
      const clonedPlaneGeo = planeGeo.clone()
      clonedPlaneGeo.applyMatrix4(planeObj.matrix)
      geometries.push(clonedPlaneGeo)
    }
    
    return BufferGeometryUtils.mergeGeometries(geometries)
  }, [material])

  useFrame(() => {
    if (!cloudsRef.current) return

    const position = ((Date.now() - startTime.current) * 0.03) % 8000

    // camera.position.x += (mouseRef.current.x - camera.position.x) * 0.01
    // camera.position.y += (-mouseRef.current.y - camera.position.y) * 0.01
    // camera.position.z = -position + 8000

    cloudsRef.current.position.x += 0.03
  })

  if (!geometry || !material) return null

  return (
    <>
      {/* <mesh geometry={geometry} material={material} renderOrder={2} /> */}
      <mesh ref={cloudsRef} geometry={geometry} material={material} position={[-1500, 0, -1 * depth]} rotation={[0.0, 0, 0]} />
    </>
  )
}

export default CloudScene
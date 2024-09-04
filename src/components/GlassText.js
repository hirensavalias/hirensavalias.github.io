import * as THREE from 'three'
import { extend, useFrame, useLoader } from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { useEffect, useState } from 'react'

extend({ TextGeometry })

export default function GlassText({text = '', position = [0, 0, 0]}) {
    const [cloudTexture, setCloudTexture] = useState(null)
	const font = useLoader(FontLoader, '/fonts/Open_Sans_Regular.json')

	useEffect(() => {
        new THREE.TextureLoader().load('./cloud10.png', (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace
          texture.wrapS = THREE.RepeatWrapping; 
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set( 0.1, 0.1);
          texture.rotation = Math.PI / 4;
          setCloudTexture(texture)
        })
      }, [])

  useFrame(() => {
    if (cloudTexture) {
        cloudTexture.rotation += 0.0001
    }
  });

	if (!font) return null

	return (
		<mesh position={position} >
			<textGeometry args={[text, { font, size: 7, height: 0.1, depth: 1 }]} />
			<meshBasicMaterial  transparent map={cloudTexture}  />
		</mesh>
	)
}
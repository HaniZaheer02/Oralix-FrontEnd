import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingMascotProps {
  position?: [number, number, number];
  scale?: number;
  isListening?: boolean;
}

export function FloatingMascot({ 
  position = [0, 0, 0], 
  scale = 1,
  isListening = false 
}: FloatingMascotProps) {
  const groupRef = useRef<THREE.Group>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }

    // Eye tracking (follows mouse slightly)
    if (eyeLeftRef.current && eyeRightRef.current) {
      const targetX = (state.mouse.x * 0.1);
      const targetY = (state.mouse.y * 0.05);
      eyeLeftRef.current.position.x = -0.25 + targetX;
      eyeLeftRef.current.position.y = 0.15 + targetY;
      eyeRightRef.current.position.x = 0.25 + targetX;
      eyeRightRef.current.position.y = 0.15 + targetY;
    }

    // Mouth animation when listening
    if (mouthRef.current && isListening) {
      mouthRef.current.scale.y = 0.8 + Math.sin(state.clock.elapsedTime * 8) * 0.4;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group ref={groupRef} position={position} scale={scale}>
        {/* Main body - speech bubble shape */}
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#14b8a6"
            attach="material"
            distort={isListening ? 0.4 : 0.2}
            speed={isListening ? 4 : 2}
            roughness={0.2}
            metalness={0.1}
          />
        </Sphere>

        {/* Gradient overlay sphere */}
        <Sphere args={[1.02, 32, 32]}>
          <meshStandardMaterial
            color="#0d9488"
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Left eye */}
        <group position={[-0.25, 0.15, 0.85]}>
          <Sphere ref={eyeLeftRef} args={[0.18, 32, 32]}>
            <meshStandardMaterial color="white" />
          </Sphere>
          <Sphere args={[0.1, 32, 32]} position={[0, 0, 0.1]}>
            <meshStandardMaterial color="#1e293b" />
          </Sphere>
          {/* Eye shine */}
          <Sphere args={[0.04, 16, 16]} position={[0.03, 0.03, 0.15]}>
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
          </Sphere>
        </group>

        {/* Right eye */}
        <group position={[0.25, 0.15, 0.85]}>
          <Sphere ref={eyeRightRef} args={[0.18, 32, 32]}>
            <meshStandardMaterial color="white" />
          </Sphere>
          <Sphere args={[0.1, 32, 32]} position={[0, 0, 0.1]}>
            <meshStandardMaterial color="#1e293b" />
          </Sphere>
          {/* Eye shine */}
          <Sphere args={[0.04, 16, 16]} position={[0.03, 0.03, 0.15]}>
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
          </Sphere>
        </group>

        {/* Mouth */}
        <mesh ref={mouthRef} position={[0, -0.25, 0.9]}>
          <capsuleGeometry args={[0.08, 0.2, 16, 16]} />
          <meshStandardMaterial color="#0f766e" />
        </mesh>

        {/* Cheek blush left */}
        <Sphere args={[0.12, 16, 16]} position={[-0.5, -0.05, 0.7]}>
          <meshStandardMaterial color="#f472b6" transparent opacity={0.4} />
        </Sphere>

        {/* Cheek blush right */}
        <Sphere args={[0.12, 16, 16]} position={[0.5, -0.05, 0.7]}>
          <meshStandardMaterial color="#f472b6" transparent opacity={0.4} />
        </Sphere>

        {/* Speech bubble tail */}
        <mesh position={[-0.7, -0.8, 0]} rotation={[0, 0, Math.PI / 4]}>
          <coneGeometry args={[0.3, 0.5, 3]} />
          <meshStandardMaterial color="#14b8a6" />
        </mesh>

        {/* Headphone left */}
        <mesh position={[-1.05, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Headphone right */}
        <mesh position={[1.05, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Headband */}
        <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.05, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

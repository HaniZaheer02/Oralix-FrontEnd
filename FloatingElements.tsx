import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingWordProps {
  text: string;
  position: [number, number, number];
  color?: string;
  delay?: number;
}

export function FloatingWord({ text, position, color = "#14b8a6", delay = 0 }: FloatingWordProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + delay) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Center position={position}>
        <mesh ref={meshRef}>
          <RoundedBox args={[text.length * 0.4 + 0.5, 0.6, 0.2]} radius={0.1} smoothness={4}>
            <meshStandardMaterial color={color} />
          </RoundedBox>
        </mesh>
      </Center>
    </Float>
  );
}

interface FloatingBubbleProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
}

export function FloatingBubble({ position, scale = 1, color = "#14b8a6" }: FloatingBubbleProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
    </Float>
  );
}

interface FloatingStarProps {
  position: [number, number, number];
  scale?: number;
}

export function FloatingStar({ position, scale = 1 }: FloatingStarProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  const starShape = new THREE.Shape();
  const outerRadius = 0.3;
  const innerRadius = 0.15;
  const points = 5;

  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) starShape.moveTo(x, y);
    else starShape.lineTo(x, y);
  }
  starShape.closePath();

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <extrudeGeometry args={[starShape, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02 }]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} />
      </mesh>
    </Float>
  );
}

interface FloatingBookProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export function FloatingBook({ position, rotation = [0, 0, 0] }: FloatingBookProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={position} rotation={rotation}>
        {/* Book cover */}
        <RoundedBox args={[0.6, 0.8, 0.1]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#0d9488" />
        </RoundedBox>
        {/* Pages */}
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[0.55, 0.75, 0.08]} />
          <meshStandardMaterial color="#fef3c7" />
        </mesh>
        {/* Spine */}
        <mesh position={[-0.32, 0, 0]}>
          <boxGeometry args={[0.05, 0.8, 0.12]} />
          <meshStandardMaterial color="#0f766e" />
        </mesh>
      </group>
    </Float>
  );
}

interface SoundWaveProps {
  position: [number, number, number];
  isActive?: boolean;
}

export function SoundWave({ position, isActive = true }: SoundWaveProps) {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringsRef.current && isActive) {
      ringsRef.current.children.forEach((ring, i) => {
        const mesh = ring as THREE.Mesh;
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.3;
        mesh.scale.set(scale, scale, 1);
        (mesh.material as THREE.MeshStandardMaterial).opacity = 
          0.5 - (Math.sin(state.clock.elapsedTime * 2 + i * 0.5) + 1) * 0.2;
      });
    }
  });

  return (
    <group ref={ringsRef} position={position}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0, i * 0.1]}>
          <ringGeometry args={[0.3 + i * 0.2, 0.35 + i * 0.2, 32]} />
          <meshStandardMaterial 
            color="#14b8a6" 
            transparent 
            opacity={0.5 - i * 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

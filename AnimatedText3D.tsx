import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedText3DProps {
  text: string;
  position?: [number, number, number];
  fontSize?: number;
  color?: string;
  animationType?: 'wave' | 'bounce' | 'pulse' | 'typewriter';
}

export function AnimatedText3D({ 
  text, 
  position = [0, 0, 0],
  fontSize = 0.5,
  color = "#14b8a6",
  animationType = 'wave'
}: AnimatedText3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [displayedText, setDisplayedText] = useState(animationType === 'typewriter' ? '' : text);

  useEffect(() => {
    if (animationType === 'typewriter') {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index >= text.length) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [text, animationType]);

  useFrame((state) => {
    if (groupRef.current) {
      switch (animationType) {
        case 'wave':
          groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
          break;
        case 'bounce':
          groupRef.current.position.y = position[1] + Math.abs(Math.sin(state.clock.elapsedTime * 3)) * 0.2;
          break;
        case 'pulse':
          const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
          groupRef.current.scale.set(scale, scale, scale);
          break;
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={position}>
        <Text
          fontSize={fontSize}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          {displayedText}
          <meshStandardMaterial 
            color={color} 
            emissive={color}
            emissiveIntensity={0.2}
          />
        </Text>
      </group>
    </Float>
  );
}

interface LetterByLetterProps {
  text: string;
  position?: [number, number, number];
  fontSize?: number;
  color?: string;
  spacing?: number;
}

export function LetterByLetter({ 
  text, 
  position = [0, 0, 0],
  fontSize = 0.5,
  color = "#14b8a6",
  spacing = 0.35
}: LetterByLetterProps) {
  const letters = text.split('');
  const startX = -((letters.length - 1) * spacing) / 2;

  return (
    <group position={position}>
      {letters.map((letter, i) => (
        <Float 
          key={i} 
          speed={2} 
          rotationIntensity={0.2} 
          floatIntensity={0.5}
          floatingRange={[-0.1, 0.1]}
        >
          <Text
            position={[startX + i * spacing, Math.sin(i * 0.5) * 0.1, 0]}
            fontSize={fontSize}
            color={color}
            anchorX="center"
            anchorY="middle"
          >
            {letter}
            <meshStandardMaterial 
              color={color}
              emissive={color}
              emissiveIntensity={0.3}
            />
          </Text>
        </Float>
      ))}
    </group>
  );
}

import { Canvas } from '@react-three/fiber';
import { Environment, Stars, OrbitControls } from '@react-three/drei';
import { Suspense, ReactNode } from 'react';

interface Scene3DProps {
  children: ReactNode;
  className?: string;
  enableControls?: boolean;
  showStars?: boolean;
  cameraPosition?: [number, number, number];
}

export function Scene3D({ 
  children, 
  className = '',
  enableControls = false,
  showStars = true,
  cameraPosition = [0, 0, 5]
}: Scene3DProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#14b8a6" />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#14b8a6" />
          
          {/* Environment for reflections */}
          <Environment preset="city" />
          
          {/* Optional stars background */}
          {showStars && (
            <Stars 
              radius={100} 
              depth={50} 
              count={2000} 
              factor={4} 
              saturation={0.5} 
              fade 
              speed={1}
            />
          )}
          
          {/* Scene content */}
          {children}
          
          {/* Optional orbit controls for debugging */}
          {enableControls && (
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

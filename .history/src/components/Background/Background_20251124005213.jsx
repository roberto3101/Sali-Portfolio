import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import styles from './Background.module.css';

function FloatingStars({ isMobile }) {
  const groupRef = useRef();
  const count = isMobile ? 12 : 20;

  const stars = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
      ],
      scale: Math.random() * 0.3 + 0.15,
      speed: Math.random() * 0.015 + 0.008,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.children.forEach((star, i) => {
      const wobble = Math.sin(time * stars[i].speed + stars[i].phase) * 0.001;
      star.position.y += wobble;
      star.rotation.z = time * stars[i].speed * 0.5;
      // Efecto de parpadeo suave
      const opacity = 0.6 + Math.sin(time * stars[i].speed * 2 + stars[i].phase) * 0.3;
      star.material.opacity = opacity;
    });
    groupRef.current.rotation.y = time * 0.015;
  });

  // Geometría de estrella optimizada (2D sprite para mejor rendimiento)
  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 1;
    const innerRadius = 0.4;
    const points = 5;
    
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }, []);

  return (
    <group ref={groupRef}>
      {stars.map((star, i) => (
        <mesh
          key={i}
          position={star.position}
          scale={star.scale}
        >
          <shapeGeometry args={[starShape]} />
          <meshBasicMaterial
            color="#ff69b4"
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function StarField({ isMobile }) {
  const pointsRef = useRef();
  const count = isMobile ? 400 : 1000;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribución esférica
      const radius = Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Colores rosados y morados
      const intensity = Math.random();
      colors[i * 3] = 0.8 + intensity * 0.2;     // R
      colors[i * 3 + 1] = 0.3 + intensity * 0.3; // G
      colors[i * 3 + 2] = 0.6 + intensity * 0.3; // B
    }

    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function CentralSphere({ isMobile }) {
  const meshRef = useRef();
  const segments = isMobile ? 32 : 64;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.08;
    meshRef.current.rotation.y = time * 0.12;
    const scale = 1 + Math.sin(time * 0.5) * 0.08;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Sphere ref={meshRef} args={[2.5, segments, segments]} position={[0, 0, -5]}>
      <meshStandardMaterial
        color="#ff69b4"
        wireframe
        transparent
        opacity={0.2}
        emissive="#ff1493"
        emissiveIntensity={0.4}
      />
    </Sphere>
  );
}

function OrbitalRings({ isMobile }) {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -time * 0.2;
    if (ring3Ref.current) ring3Ref.current.rotation.z = time * 0.15;
  });

  const segments = isMobile ? 32 : 64;

  return (
    <group position={[0, 0, -5]}>
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.02, 16, segments]} />
        <meshBasicMaterial color="#ff69b4" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[4.5, 0.015, 16, segments]} />
        <meshBasicMaterial color="#ff1493" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[5, 0.01, 16, segments]} />
        <meshBasicMaterial color="#ff85c1" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function GridPlane({ isMobile }) {
  const meshRef = useRef();
  const segments = isMobile ? 15 : 30;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.z = (time * 1.5) % 20 - 10;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
      <planeGeometry args={[100, 100, segments, segments]} />
      <meshBasicMaterial
        color="#ff69b4"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

const Background = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
                     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={styles.background}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        gl={{ 
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance'
        }}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#1a0a14']} />
        <fog attach="fog" args={['#1a0a14', 15, 45]} />
        
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={1.2} color="#ff1493" distance={35} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#ff69b4" />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#ff85c1" />
        
        <StarField isMobile={isMobile} />
        <FloatingStars isMobile={isMobile} />
        <CentralSphere isMobile={isMobile} />
        <OrbitalRings isMobile={isMobile} />
        <GridPlane isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default Background;
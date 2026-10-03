import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

export interface PhoneModelProps {
  bodyColor?: string;
  screenColor?: string;
  explode?: number; // 0 - 1
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  scrollProgress?: MotionValue<number>;
  brandLabel?: string;
  float?: boolean;
  scale?: number;
}

const LAYER_GAP = 0.34;

export default function PhoneModel({
  bodyColor = "#2b2b2c",
  screenColor = "#0a0a12",
  explode = 0,
  autoRotate = true,
  autoRotateSpeed = 0.35,
  scrollProgress,
  brandLabel,
  float = true,
  scale = 1,
}: PhoneModelProps) {
  const group = useRef<THREE.Group>(null);
  const screenLayer = useRef<THREE.Group>(null);
  const cameraLayer = useRef<THREE.Group>(null);
  const batteryLayer = useRef<THREE.Group>(null);
  const boardLayer = useRef<THREE.Group>(null);
  const backLayer = useRef<THREE.Group>(null);
  const t = useRef(0);

  const bodyMaterialProps = useMemo(
    () => ({
      color: bodyColor,
      metalness: 0.75,
      roughness: 0.28,
      envMapIntensity: 1.1,
    }),
    [bodyColor]
  );

  useFrame((_, delta) => {
    t.current += delta;

    if (group.current) {
      if (scrollProgress) {
        const p = scrollProgress.get();
        group.current.rotation.y = p * Math.PI * 2.2;
        group.current.rotation.x = Math.sin(p * Math.PI) * 0.15;
        group.current.position.y = Math.sin(p * Math.PI) * 0.4 - p * 0.3;
      } else if (autoRotate) {
        group.current.rotation.y += delta * autoRotateSpeed;
      }
      if (float && !scrollProgress) {
        group.current.position.y = Math.sin(t.current * 0.9) * 0.08;
      }
    }

    const targets: [React.RefObject<THREE.Group | null>, number][] = [
      [backLayer, -explode * LAYER_GAP * 2],
      [boardLayer, -explode * LAYER_GAP],
      [batteryLayer, 0],
      [cameraLayer, explode * LAYER_GAP],
      [screenLayer, explode * LAYER_GAP * 2.2],
    ];
    targets.forEach(([ref, z]) => {
      if (ref.current) {
        ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, z, 0.12);
      }
    });
  });

  return (
    <group ref={group} scale={scale}>
      {/* Back panel */}
      <group ref={backLayer}>
        <RoundedBox args={[1.5, 3.1, 0.12]} radius={0.18} smoothness={6} position={[0, 0, -0.1]}>
          <meshStandardMaterial {...bodyMaterialProps} />
        </RoundedBox>
        {/* camera bump cluster */}
        <group position={[-0.42, 1.0, -0.02]}>
          <RoundedBox args={[0.78, 0.78, 0.07]} radius={0.14} smoothness={4} position={[0, 0, 0]}>
            <meshStandardMaterial color={bodyColor} metalness={0.9} roughness={0.2} />
          </RoundedBox>
          {[[-0.18, 0.18], [0.18, 0.18], [-0.18, -0.18]].map(([x, y], i) => (
            <mesh key={i} position={[x, y, 0.05]}>
              <cylinderGeometry args={[0.13, 0.13, 0.05, 32]} rotation-x={Math.PI / 2} />
              <meshStandardMaterial color="#0b0b0e" metalness={0.6} roughness={0.15} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Motherboard layer */}
      <group ref={boardLayer}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.1, 1.6, 0.03]} />
          <meshStandardMaterial color="#1f6f3f" metalness={0.3} roughness={0.6} />
        </mesh>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[-0.4 + (i % 3) * 0.4, 0.75 - Math.floor(i / 3) * 0.6, 0.03]}>
            <boxGeometry args={[0.18, 0.18, 0.05]} />
            <meshStandardMaterial color="#111318" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* Battery layer */}
      <group ref={batteryLayer}>
        <RoundedBox args={[1.05, 1.7, 0.06]} radius={0.05} position={[0, -0.6, 0]}>
          <meshStandardMaterial color="#c7c9cc" metalness={0.4} roughness={0.4} />
        </RoundedBox>
      </group>

      {/* Camera module layer (front facing elements / mid frame) */}
      <group ref={cameraLayer}>
        <RoundedBox args={[1.42, 3.0, 0.04]} radius={0.17} smoothness={6} position={[0, 0, 0]}>
          <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.35} />
        </RoundedBox>
      </group>

      {/* Screen layer */}
      <group ref={screenLayer}>
        <RoundedBox args={[1.44, 3.05, 0.03]} radius={0.17} smoothness={6} position={[0, 0, 0.04]}>
          <meshStandardMaterial color="#050506" metalness={0.2} roughness={0.1} />
        </RoundedBox>
        <mesh position={[0, 0, 0.065]}>
          <planeGeometry args={[1.32, 2.86]} />
          <meshStandardMaterial
            color={screenColor}
            emissive={screenColor}
            emissiveIntensity={0.55}
            roughness={0.15}
            metalness={0.1}
          />
        </mesh>
        <mesh position={[0, 1.33, 0.07]}>
          <circleGeometry args={[0.045, 24]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {brandLabel && (
          <Text
            position={[0, -1.15, 0.07]}
            fontSize={0.13}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.85}
          >
            {brandLabel}
          </Text>
        )}
      </group>

      {/* side buttons */}
      <mesh position={[0.76, 0.55, -0.02]}>
        <boxGeometry args={[0.03, 0.35, 0.1]} />
        <meshStandardMaterial color={bodyColor} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.76, 0.1, -0.02]}>
        <boxGeometry args={[0.03, 0.2, 0.1]} />
        <meshStandardMaterial color={bodyColor} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

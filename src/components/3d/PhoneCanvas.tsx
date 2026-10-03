import { Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls, AdaptiveDpr } from "@react-three/drei";
import CanvasLoader from "./CanvasLoader";

interface PhoneCanvasProps {
  children: ReactNode;
  enableControls?: boolean;
  autoRotateControls?: boolean;
  cameraPosition?: [number, number, number];
  minDistance?: number;
  maxDistance?: number;
  showShadow?: boolean;
  className?: string;
}

export default function PhoneCanvas({
  children,
  enableControls = false,
  autoRotateControls = false,
  cameraPosition = [0, 0, 4.6],
  minDistance = 2.6,
  maxDistance = 7,
  showShadow = true,
  className,
}: PhoneCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: cameraPosition, fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[4, 6, 5]}
          angle={0.35}
          penumbra={0.8}
          intensity={2.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-4, -2, -3]} intensity={0.6} color="#6366f1" />
        <pointLight position={[3, -3, 2]} intensity={0.5} color="#22d3ee" />
        <Suspense fallback={<CanvasLoader />}>
          {children}
          <Environment preset="city" />
          {showShadow && (
            <ContactShadows position={[0, -1.75, 0]} opacity={0.55} scale={10} blur={2.4} far={3} />
          )}
        </Suspense>
        <AdaptiveDpr pixelated={false} />
        {enableControls && (
          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={minDistance}
            maxDistance={maxDistance}
            autoRotate={autoRotateControls}
            autoRotateSpeed={1.2}
            makeDefault
          />
        )}
      </Canvas>
    </div>
  );
}

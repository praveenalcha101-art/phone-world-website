import { Html, useProgress } from "@react-three/drei";

export default function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-indigo-400" />
        <span className="text-xs font-medium tracking-wide text-white/70">{Math.round(progress)}%</span>
      </div>
    </Html>
  );
}

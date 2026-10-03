import { cn } from "@/utils/cn";

export default function PhoneSilhouette({
  bodyColor,
  screenColor,
  className,
  glow = true,
}: {
  bodyColor: string;
  screenColor: string;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {glow && (
        <div
          className="absolute h-2/3 w-2/3 rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: bodyColor }}
        />
      )}
      <div
        className="relative h-full w-[46%] rounded-[22%] border-[3px] shadow-2xl"
        style={{
          backgroundColor: bodyColor,
          borderColor: "rgba(255,255,255,0.15)",
          boxShadow: `0 20px 60px -15px ${bodyColor}99`,
        }}
      >
        <div
          className="absolute inset-[6%] rounded-[16%] border border-white/10"
          style={{ backgroundColor: screenColor }}
        >
          <div className="absolute left-1/2 top-[6%] h-[3%] w-[26%] -translate-x-1/2 rounded-full bg-black/40" />
          <div
            className="absolute inset-[10%] rounded-md opacity-60"
            style={{
              background: `linear-gradient(135deg, ${bodyColor}55, transparent 60%)`,
            }}
          />
        </div>
        <div className="absolute right-[-3px] top-[18%] h-[10%] w-[3px] rounded-l bg-white/20" />
        <div className="absolute right-[-3px] top-[32%] h-[6%] w-[3px] rounded-l bg-white/20" />
      </div>
    </div>
  );
}

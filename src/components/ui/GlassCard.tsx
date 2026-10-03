import { type HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export default function GlassCard({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20 backdrop-blur-xl",
        "dark:border-white/10 dark:bg-white/[0.04]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

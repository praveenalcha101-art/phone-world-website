import { Star } from "./icons";

export default function Rating({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={size} fill={value >= i - 0.3} />
        ))}
      </div>
      <span className="text-xs font-medium text-white/60">{value.toFixed(1)}</span>
    </div>
  );
}

import { Link } from "react-router-dom";
import { brands, brandCount } from "@/data/usePhones";

export default function BrandCarousel() {
  const loop = [...brands, ...brands];
  return (
    <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-[scroll_38s_linear_infinite] gap-4 hover:[animation-play-state:paused]">
        {loop.map((b, i) => (
          <Link
            to={`/brands/${b.id}`}
            key={`${b.id}-${i}`}
            className="flex min-w-[170px] flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-md transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08]"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black text-white"
              style={{ backgroundColor: `${b.color}33`, color: b.color, border: `1px solid ${b.color}66` }}
            >
              {b.name.slice(0, 2).toUpperCase()}
            </span>
            <div className="text-center">
              <p className="text-sm font-semibold text-white">{b.name}</p>
              <p className="text-[11px] text-white/40">{brandCount(b.name)} models</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

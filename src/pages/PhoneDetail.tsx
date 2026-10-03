import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageTransition from "@/components/layout/PageTransition";
import PhoneCanvas from "@/components/3d/PhoneCanvas";
import PhoneModel from "@/components/3d/PhoneModel";
import PhoneCard from "@/components/PhoneCard";
import Button from "@/components/ui/Button";
import Rating from "@/components/ui/Rating";
import { getPhoneById, getSimilarPhones } from "@/data/usePhones";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import {
  Battery,
  Camera,
  Check,
  Cpu,
  Heart,
  Layers,
  RotateCw,
  Scale,
  X,
  Zap,
} from "@/components/ui/icons";
import { cn } from "@/utils/cn";

export default function PhoneDetail() {
  const { phoneId } = useParams();
  const phone = getPhoneById(phoneId);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isComparing, toggleCompare, maxReached } = useCompare();

  const [colorIndex, setColorIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [explode, setExplode] = useState(0);
  const [selectedRam, setSelectedRam] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);

  const similar = useMemo(() => (phone ? getSimilarPhones(phone) : []), [phone]);

  if (!phone) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-3xl px-5 pb-24 pt-40 text-center">
          <h1 className="text-3xl font-bold text-white">Phone not found</h1>
          <Link to="/phones" className="mt-4 inline-block text-indigo-300 hover:text-indigo-200">
            ← Back to all phones
          </Link>
        </div>
      </PageTransition>
    );
  }

  const activeColor = phone.colors[colorIndex] ?? phone.colors[0];
  const wished = isWishlisted(phone.id);
  const comparing = isComparing(phone.id);

  const specRows: [string, string, typeof Cpu][] = [
    ["Display", phone.display, Layers],
    ["Chipset", phone.chipset, Cpu],
    ["Camera", phone.camera, Camera],
    ["Battery", phone.battery, Battery],
    ["Charging", phone.charging, Zap],
  ];

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 lg:px-10">
        <nav className="mb-6 text-xs text-white/40">
          <Link to="/phones" className="hover:text-white">Phones</Link>
          <span className="mx-1.5">/</span>
          <Link to={`/brands/${phone.brand.toLowerCase()}`} className="hover:text-white">{phone.brand}</Link>
          <span className="mx-1.5">/</span>
          <span className="text-white/70">{phone.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* 3D VIEWER */}
          <div>
            <div className="relative h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent sm:h-[520px]">
              <div
                className="absolute inset-0 opacity-30 blur-3xl"
                style={{ background: `radial-gradient(circle at 50% 40%, ${activeColor.hex}55, transparent 65%)` }}
              />
              <PhoneCanvas
                className="h-full w-full"
                enableControls
                autoRotateControls={autoRotate}
                cameraPosition={[0, 0, 4.8]}
              >
                <PhoneModel
                  bodyColor={activeColor.hex}
                  screenColor={phone.screenColor}
                  explode={explode}
                  autoRotate={false}
                  brandLabel={phone.brand}
                />
              </PhoneCanvas>

              <div className="absolute left-4 top-4 flex flex-col gap-2">
                <button
                  onClick={() => setAutoRotate((a) => !a)}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition",
                    autoRotate ? "border-indigo-400/50 bg-indigo-400/20 text-indigo-200" : "border-white/10 bg-black/30 text-white/60"
                  )}
                  aria-label="Toggle auto-rotate"
                  title="Toggle auto-rotate"
                >
                  <RotateCw size={16} />
                </button>
              </div>

              <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] text-white/50 backdrop-blur-md">
                Drag to rotate · Scroll to zoom
              </div>
            </div>

            {/* Exploded view control */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Layers size={16} className="text-indigo-300" /> Exploded View
                </h3>
                <span className="text-xs text-white/40">{Math.round(explode * 100)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={explode}
                onChange={(e) => setExplode(Number(e.target.value))}
                className="w-full accent-indigo-400"
              />
              <div className="mt-2 flex justify-between text-[11px] text-white/35">
                <span>Assembled</span>
                <span>Screen · Camera · Battery · Board · Back panel</span>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => setExplode(0)}>
                  Assembled
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setExplode(1)}>
                  Fully Exploded
                </Button>
              </div>
            </div>
          </div>

          {/* INFO */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">{phone.brand}</span>
            <h1 className="mt-1 text-3xl font-extrabold text-white sm:text-4xl">{phone.name}</h1>
            <div className="mt-3 flex items-center gap-4">
              <Rating value={phone.rating} size={16} />
              <span className="text-xs text-white/40">{phone.releaseYear} release</span>
              {phone.is5G && (
                <span className="rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                  5G
                </span>
              )}
            </div>

            <p className="mt-5 text-3xl font-bold text-white">${phone.price.toLocaleString()}</p>

            {/* Color selector */}
            <div className="mt-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                Color — {activeColor.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {phone.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColorIndex(i)}
                    aria-label={c.name}
                    className={cn(
                      "h-10 w-10 rounded-full border-2 transition",
                      i === colorIndex ? "scale-110 border-white" : "border-white/20 hover:border-white/50"
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* RAM / Storage selector */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">RAM</h3>
                <div className="flex flex-wrap gap-2">
                  {phone.ram.map((r, i) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRam(i)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                        i === selectedRam
                          ? "border-indigo-400/60 bg-indigo-400/15 text-white"
                          : "border-white/10 text-white/60 hover:border-white/30"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">Storage</h3>
                <div className="flex flex-wrap gap-2">
                  {phone.storage.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => setSelectedStorage(i)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                        i === selectedStorage
                          ? "border-cyan-400/60 bg-cyan-400/15 text-white"
                          : "border-white/10 text-white/60 hover:border-white/30"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" icon={<Heart size={17} filled={wished} />} onClick={() => toggleWishlist(phone.id)}>
                {wished ? "Wishlisted" : "Add to Wishlist"}
              </Button>
              <Button
                size="lg"
                variant="secondary"
                icon={<Scale size={17} />}
                disabled={!comparing && maxReached}
                onClick={() => toggleCompare(phone.id)}
              >
                {comparing ? "Remove from Compare" : "Add to Compare"}
              </Button>
            </div>

            {/* Quick specs */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {specRows.map(([label, value, Icon]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <Icon size={16} className="mb-2 text-indigo-300" />
                  <p className="text-[11px] uppercase tracking-wide text-white/35">{label}</p>
                  <p className="mt-0.5 text-sm font-medium text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Specs Table */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <h2 className="border-b border-white/10 px-6 py-5 text-lg font-semibold text-white">Full Specifications</h2>
            <dl className="divide-y divide-white/5">
              {[
                ["Display", phone.display],
                ["Chipset", phone.chipset],
                ["RAM Options", phone.ram.join(", ")],
                ["Storage Options", phone.storage.join(", ")],
                ["Rear Camera", phone.camera],
                ["Battery", phone.battery],
                ["Charging", phone.charging],
                ["Operating System", phone.os],
                ["5G Support", phone.is5G ? "Yes" : "No"],
                ["Release Year", String(phone.releaseYear)],
                ["Price", `$${phone.price.toLocaleString()}`],
                ["Colors", phone.colors.map((c) => c.name).join(", ")],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 px-6 py-3.5 text-sm">
                  <dt className="text-white/40">{label}</dt>
                  <dd className="text-right font-medium text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.04] p-6">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-emerald-300">
                <Check size={16} /> Pros
              </h3>
              <ul className="space-y-2 text-sm text-white/70">
                {phone.pros.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0 text-emerald-400" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-rose-400/20 bg-rose-400/[0.04] p-6">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-rose-300">
                <X size={16} /> Cons
              </h3>
              <ul className="space-y-2 text-sm text-white/70">
                {phone.cons.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <X size={14} className="mt-0.5 shrink-0 text-rose-400" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Similar phones */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-white">Similar Phones</h2>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {similar.map((p) => (
                <PhoneCard key={p.id} phone={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

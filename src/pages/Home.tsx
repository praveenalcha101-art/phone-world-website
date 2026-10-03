import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import PhoneCanvas from "@/components/3d/PhoneCanvas";
import PhoneModel from "@/components/3d/PhoneModel";
import BrandCarousel from "@/components/BrandCarousel";
import PhoneCard from "@/components/PhoneCard";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { ArrowRight, Camera, Layers, Scale, Sparkles as SparklesIcon } from "@/components/ui/icons";
import { brands, getTrendingPhones, phones } from "@/data/usePhones";

const features = [
  {
    icon: Layers,
    title: "Exploded 3D Views",
    desc: "Peel back the layers — screen, battery, board and camera module — in real time.",
  },
  {
    icon: Scale,
    title: "Side-by-side Compare",
    desc: "Stack up to 3 phones and compare every spec that matters.",
  },
  {
    icon: Camera,
    title: "Live Color Variants",
    desc: "Switch colorways and watch the 3D model update instantly.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] });
  const textOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const trending = getTrendingPhones();

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative h-[190vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#06060a]">
          <div className="bg-grid absolute inset-0 opacity-60" />
          <div className="absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[140px]" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

          <PhoneCanvas className="absolute inset-0 h-full w-full" cameraPosition={[0, 0, 5.2]}>
            <PhoneModel bodyColor="#8a8679" screenColor="#101522" scrollProgress={scrollYProgress} float={false} />
          </PhoneCanvas>

          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-md">
              <SparklesIcon size={14} className="text-indigo-300" /> 30+ phones · 14 brands · 100% interactive
            </span>
            <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white glow-text sm:text-6xl md:text-7xl">
              Every phone. <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                One 3D universe.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-white/60 sm:text-lg">
              Rotate, zoom and explode real-time 3D smartphone models from Apple, Samsung, Google and more — then
              compare specs side by side.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link to="/phones">
                <Button size="lg" icon={<ArrowRight size={18} />}>
                  Explore Phones
                </Button>
              </Link>
              <Link to="/brands">
                <Button size="lg" variant="secondary">
                  Browse Brands
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-xs text-white/40">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="mx-auto mb-2 h-8 w-5 rounded-full border border-white/20 p-1"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
            </motion.div>
            Scroll to rotate
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Shop by Brand</h2>
            <p className="mt-1 text-sm text-white/50">{brands.length} major manufacturers, one destination.</p>
          </div>
          <Link to="/brands" className="hidden text-sm font-semibold text-indigo-300 hover:text-indigo-200 sm:block">
            View all →
          </Link>
        </div>
        <BrandCarousel />
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-10">
        <div className="grid gap-5 sm:grid-cols-3">
          {features.map((f) => (
            <GlassCard key={f.title} className="p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 text-indigo-300">
                <f.icon size={22} />
              </div>
              <h3 className="mb-1.5 text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-white/50">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Trending Phones</h2>
            <p className="mt-1 text-sm text-white/50">The most searched devices this month.</p>
          </div>
          <Link to="/phones" className="hidden text-sm font-semibold text-indigo-300 hover:text-indigo-200 sm:block">
            See all {phones.length} phones →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {trending.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-10">
        <GlassCard className="relative overflow-hidden px-8 py-14 text-center sm:px-16">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to find your next phone?</h2>
            <p className="mx-auto mt-3 max-w-lg text-white/60">
              Filter by budget, specs and brand — or jump straight into comparing your shortlist in full 3D.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/phones">
                <Button size="lg">Start Exploring</Button>
              </Link>
              <Link to="/compare">
                <Button size="lg" variant="outline" className="text-white">
                  Compare Phones
                </Button>
              </Link>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

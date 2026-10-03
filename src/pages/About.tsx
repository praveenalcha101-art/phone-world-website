import { useState } from "react";
import PageTransition from "@/components/layout/PageTransition";
import PhoneCanvas from "@/components/3d/PhoneCanvas";
import PhoneModel from "@/components/3d/PhoneModel";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import { brands, phones } from "@/data/usePhones";
import { Camera, Layers, Mail, MapPin, Phone as PhoneIcon, Scale } from "@/components/ui/icons";

const stats = [
  { label: "Phones catalogued", value: `${phones.length}+` },
  { label: "Brands represented", value: `${brands.length}` },
  { label: "3D interactions", value: "∞" },
  { label: "Avg. rating", value: "4.5★" },
];

const team = [
  { name: "Ava Chen", role: "Founder & Product", color: "#6366f1" },
  { name: "Noah Patel", role: "3D / WebGL Engineer", color: "#22d3ee" },
  { name: "Liam Osei", role: "Design Lead", color: "#f472b6" },
];

export default function About() {
  const [sent, setSent] = useState(false);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">About Phone World</span>
            <h1 className="mt-2 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              We turned spec sheets into something you can actually touch.
            </h1>
            <p className="mt-5 text-white/60">
              Phone World is a passion project built for people who love phones as much as we do. Using real-time 3D
              rendering, we let you rotate, explode and compare devices the way product pages never do — all before
              you ever pick one up in a store.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="mt-1 text-[11px] text-white/40">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-80 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-cyan-400/10 sm:h-96">
            <PhoneCanvas className="h-full w-full" cameraPosition={[0, 0, 4.8]}>
              <PhoneModel bodyColor="#6a5a9e" screenColor="#0b0b14" autoRotate autoRotateSpeed={0.5} />
            </PhoneCanvas>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">What makes us different</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: Layers, title: "True exploded views", desc: "See every layer of a phone's internals interactively." },
              { icon: Camera, title: "Live color swapping", desc: "Switch colorways on the fly, rendered in real time." },
              { icon: Scale, title: "Real spec comparisons", desc: "Stack up to three phones with zero guesswork." },
            ].map((f) => (
              <GlassCard key={f.title} className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 text-indigo-300">
                  <f.icon size={22} />
                </div>
                <h3 className="mb-1.5 font-semibold text-white">{f.title}</h3>
                <p className="text-sm text-white/50">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">The team</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {team.map((m) => (
              <div key={m.name} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white"
                  style={{ backgroundColor: `${m.color}33`, border: `1px solid ${m.color}66`, color: m.color }}
                >
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-semibold text-white">{m.name}</h3>
                <p className="text-xs text-white/40">{m.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <div className="mt-24 grid gap-10 lg:grid-cols-2" id="contact">
          <div>
            <h2 className="text-3xl font-bold text-white">Get in touch</h2>
            <p className="mt-3 text-white/60">
              Questions, partnership ideas, or found a spec that needs fixing? We'd love to hear from you.
            </p>
            <div className="mt-8 space-y-4 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5"><Mail size={16} /></span>
                hello@phoneworld.app
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5"><PhoneIcon size={16} /></span>
                +1 (555) 012-3456
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5"><MapPin size={16} /></span>
                San Francisco, CA
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
          >
            {sent ? (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
                <p className="text-lg font-semibold text-white">Thanks for reaching out! 🎉</p>
                <p className="mt-2 text-sm text-white/50">We'll get back to you within 1-2 business days.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder="Your name" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-indigo-400/50 focus:outline-none" />
                  <input required type="email" placeholder="Email address" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-indigo-400/50 focus:outline-none" />
                </div>
                <textarea required rows={5} placeholder="Your message" className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-indigo-400/50 focus:outline-none" />
                <Button type="submit" className="w-full" size="lg">
                  Send Message
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </PageTransition>
  );
}

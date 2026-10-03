import { useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/layout/PageTransition";
import PhoneCanvas from "@/components/3d/PhoneCanvas";
import PhoneModel from "@/components/3d/PhoneModel";
import PhoneSilhouette from "@/components/PhoneSilhouette";
import Rating from "@/components/ui/Rating";
import { useCompare } from "@/context/CompareContext";
import { getPhoneById, phones } from "@/data/usePhones";
import { Scale, Search, X } from "@/components/ui/icons";

export default function Compare() {
  const { compareList, removeFromCompare, addToCompare, maxReached } = useCompare();
  const [picker, setPicker] = useState(false);
  const [search, setSearch] = useState("");

  const selected = compareList.map((id) => getPhoneById(id)).filter(Boolean) as NonNullable<ReturnType<typeof getPhoneById>>[];

  const filteredOptions = phones
    .filter((p) => !compareList.includes(p.id))
    .filter((p) => `${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 30);

  const rows: { label: string; render: (p: (typeof selected)[number]) => string }[] = [
    { label: "Price", render: (p) => `$${p.price.toLocaleString()}` },
    { label: "Release Year", render: (p) => String(p.releaseYear) },
    { label: "Display", render: (p) => p.display },
    { label: "Chipset", render: (p) => p.chipset },
    { label: "RAM", render: (p) => p.ram.join(", ") },
    { label: "Storage", render: (p) => p.storage.join(", ") },
    { label: "Camera", render: (p) => p.camera },
    { label: "Battery", render: (p) => p.battery },
    { label: "Charging", render: (p) => p.charging },
    { label: "OS", render: (p) => p.os },
    { label: "5G", render: (p) => (p.is5G ? "Yes" : "No") },
    { label: "Rating", render: (p) => `${p.rating.toFixed(1)} / 5` },
  ];

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-10">
        <div className="mb-10 text-center">
          <h1 className="flex items-center justify-center gap-3 text-4xl font-extrabold text-white">
            <Scale size={30} className="text-indigo-300" /> Compare Phones
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-white/50">
            Pick up to 3 phones to compare their 3D models and full specifications side by side.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[0, 1, 2].map((slot) => {
            const phone = selected[slot];
            return (
              <div
                key={slot}
                className="relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-4"
              >
                {phone ? (
                  <>
                    <button
                      onClick={() => removeFromCompare(phone.id)}
                      className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 hover:text-white"
                      aria-label="Remove"
                    >
                      <X size={14} />
                    </button>
                    <PhoneCanvas className="h-48 w-full" cameraPosition={[0, 0, 4.6]}>
                      <PhoneModel bodyColor={phone.bodyColor} screenColor={phone.screenColor} autoRotate />
                    </PhoneCanvas>
                    <Link to={`/phones/${phone.id}`} className="mt-3 text-center font-semibold text-white hover:text-indigo-300">
                      {phone.name}
                    </Link>
                    <span className="text-xs text-white/40">{phone.brand}</span>
                  </>
                ) : (
                  <button
                    onClick={() => setPicker(true)}
                    disabled={maxReached}
                    className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/15 py-16 text-white/40 transition hover:border-indigo-400/40 hover:text-white disabled:opacity-40"
                  >
                    <PhoneSilhouette bodyColor="#2b2b2c" screenColor="#111" className="h-20 w-20 opacity-40" glow={false} />
                    <span className="text-sm font-medium">Add a phone</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {selected.length >= 2 ? (
          <div className="mt-12 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.03]">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-white/40">
                  <th className="px-6 py-4 font-medium">Specification</th>
                  {selected.map((p) => (
                    <th key={p.id} className="px-6 py-4 font-semibold text-white">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td className="px-6 py-3.5 text-white/40">{row.label}</td>
                    {selected.map((p) => (
                      <td key={p.id} className="px-6 py-3.5 font-medium text-white">
                        {row.render(p)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="px-6 py-3.5 text-white/40">Rating</td>
                  {selected.map((p) => (
                    <td key={p.id} className="px-6 py-3.5">
                      <Rating value={p.rating} />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-10 text-center text-white/40">Add at least 2 phones to see a full spec comparison.</p>
        )}
      </div>

      {picker && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm" onClick={() => setPicker(false)}>
          <div
            className="flex max-h-[80vh] w-full max-w-lg flex-col rounded-3xl border border-white/10 bg-[#0a0a12] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Select a phone</h3>
              <button onClick={() => setPicker(false)} className="text-white/50 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="relative mb-4">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search phones..."
                className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto">
              {filteredOptions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    addToCompare(p.id);
                    setPicker(false);
                    setSearch("");
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-white hover:border-indigo-400/40 hover:bg-white/[0.06]"
                >
                  <span>
                    {p.name} <span className="text-white/40">· {p.brand}</span>
                  </span>
                  <span className="text-white/50">${p.price.toLocaleString()}</span>
                </button>
              ))}
              {filteredOptions.length === 0 && <p className="py-6 text-center text-sm text-white/40">No phones found.</p>}
            </div>
          </div>
        </div>
      )}

    </PageTransition>
  );
}
